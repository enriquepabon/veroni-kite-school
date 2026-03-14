# Student Platform Improvements — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the student platform from mock-data static UI into a fully functional system with real Supabase data, admin approval flow, instructor-linked booking, profile management, and booking notifications.

**Architecture:** 5 independent work chunks that build on the existing Next.js App Router + Supabase stack. Each chunk adds a vertical slice of functionality. Chunks 1-2 are foundational (profile + admin approval), chunks 3-4 add booking intelligence, chunk 5 adds notifications.

**Tech Stack:** Next.js 14 (App Router), Supabase (Auth + DB + RLS), Tailwind CSS + Framer Motion, Resend (email), Twilio WhatsApp API.

---

## Chunk 1: Profile — Real Data + Editable Fields

**Problem:** Profile page uses hardcoded mock data (`Student Demo`, `student@veroni.co`). DashboardLayout sidebar also hardcodes `S` avatar and `Student` name. Users can't save changes.

### Task 1.1: Add `is_approved` column to profiles + instructor_assignments table

**Files:**
- Create: `supabase/migrations/20260314_user_approval_and_assignments.sql`
- Modify: `src/types/index.ts`

- [ ] **Step 1: Write the migration SQL**

```sql
-- Add approval field to profiles
alter table public.profiles
  add column if not exists is_approved boolean default false;

-- Instructor-student assignment table
create table if not exists public.instructor_assignments (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) on delete cascade not null,
  instructor_id uuid references public.profiles(id) on delete cascade not null,
  assigned_by uuid references public.profiles(id),
  assigned_at timestamptz default now(),
  is_active boolean default true,
  unique(student_id, instructor_id)
);

-- RLS for instructor_assignments
alter table public.instructor_assignments enable row level security;

create policy "Students can view own assignments"
  on public.instructor_assignments for select
  using (auth.uid() = student_id);

create policy "Instructors can view their assignments"
  on public.instructor_assignments for select
  using (auth.uid() = instructor_id);

create policy "Admins can manage assignments"
  on public.instructor_assignments for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Update handle_new_user to set is_approved = false
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role, avatar_url, is_approved)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'student',
    new.raw_user_meta_data->>'avatar_url',
    false
  );
  return new;
end;
$$ language plpgsql security definer;
```

- [ ] **Step 2: Run migration in Supabase Dashboard**

Go to Supabase → SQL Editor → paste and execute the migration.

- [ ] **Step 3: Update TypeScript types**

Add to `src/types/index.ts`:

```typescript
// Add to Profile interface:
export interface Profile {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string | null;
    phone: string | null;
    weight_kg: number | null;
    language_preference: string;
    role: UserRole;
    is_approved: boolean;
    current_level: number;
    created_at: string;
    updated_at: string;
}

// New interface:
export interface InstructorAssignment {
    id: string;
    student_id: string;
    instructor_id: string;
    assigned_by: string | null;
    assigned_at: string;
    is_active: boolean;
    instructor?: Profile; // joined
}
```

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/20260314_user_approval_and_assignments.sql src/types/index.ts
git commit -m "feat: add is_approved to profiles + instructor_assignments table"
```

---

### Task 1.2: Create profile API route for fetching and updating profile

**Files:**
- Create: `src/app/api/profile/route.ts`

- [ ] **Step 1: Create GET + PATCH API route**

```typescript
// src/app/api/profile/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
        ...profile,
        email: user.email
    });
}

export async function PATCH(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const allowedFields = ['full_name', 'phone', 'weight_kg', 'language_preference'];
    const updates: Record<string, unknown> = {};

    for (const field of allowedFields) {
        if (body[field] !== undefined) {
            updates[field] = body[field];
        }
    }
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
```

- [ ] **Step 2: Test with curl or browser**

```bash
# After logging in, test the endpoint
curl http://localhost:3000/api/profile -H "Cookie: <session-cookie>"
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/profile/route.ts
git commit -m "feat: add profile GET/PATCH API route"
```

---

### Task 1.3: Rewrite profile page to use real Supabase data

**Files:**
- Modify: `src/app/[locale]/(dashboard)/profile/page.tsx`

- [ ] **Step 1: Replace mock data with Supabase fetch + save**

Rewrite the profile page to:
1. Fetch profile from `/api/profile` on mount
2. Populate form with real data (name from auth metadata or profile table)
3. Allow editing full_name, phone, weight_kg, language_preference
4. Save changes via `PATCH /api/profile`
5. Show success/error toast feedback
6. Email field remains readonly (from auth)

Key changes:
- Replace `useState` mock with `useEffect` fetch from `/api/profile`
- Add `handleSave` function that calls `PATCH /api/profile`
- Add loading skeleton while fetching
- Add success/error state after save
- Name defaults to email prefix if `full_name` is empty

- [ ] **Step 2: Test manually — change name, save, reload**

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/(dashboard)/profile/page.tsx
git commit -m "feat: profile page with real Supabase data + editable fields"
```

---

### Task 1.4: Update DashboardLayout to show real user info

**Files:**
- Modify: `src/components/dashboard/DashboardLayout.tsx`
- Modify: `src/app/[locale]/(dashboard)/layout.tsx`

- [ ] **Step 1: Pass user data from server layout to client layout**

In `layout.tsx` (server component), fetch the profile and pass it as a prop:

```typescript
// In layout.tsx, after getting user:
const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role, avatar_url, is_approved')
    .eq('id', user.id)
    .single();
```

Pass `profile` and `user.email` as props to `DashboardLayoutClient`.

- [ ] **Step 2: Update DashboardLayout to display real name + avatar initial**

Replace hardcoded `S` and `Student` with:
- Avatar: first letter of `full_name` (or email if no name)
- Name: `full_name` or email prefix
- Email: actual user email

- [ ] **Step 3: Update dashboard greeting**

In `dashboard/page.tsx`, the greeting says `Student`. Change it to display the user's actual first name. This requires passing the name from the layout or fetching it client-side.

- [ ] **Step 4: Commit**

```bash
git add src/components/dashboard/DashboardLayout.tsx src/app/[locale]/(dashboard)/layout.tsx src/app/[locale]/(dashboard)/dashboard/page.tsx
git commit -m "feat: show real user name and email across dashboard"
```

---

## Chunk 2: Admin Approval Flow

**Problem:** Currently any user who registers gets full access. The admin should approve students before they can use the platform.

### Task 2.1: Create pending approval page for unapproved users

**Files:**
- Create: `src/app/[locale]/(dashboard)/pending-approval/page.tsx`
- Modify: `src/app/[locale]/(dashboard)/layout.tsx`

- [ ] **Step 1: Create the pending approval page**

A clean, centered page that tells the user their account is pending admin approval. Shows:
- A clock/hourglass icon with animation
- "Tu cuenta está pendiente de aprobación" message
- "Un administrador revisará tu registro pronto" subtitle
- Sign out button
- Uses the existing dark theme + MagicCard components

- [ ] **Step 2: Add approval gate in dashboard layout**

In `layout.tsx`, after fetching the profile, if `is_approved === false` AND `role === 'student'`, redirect to `/pending-approval`. The pending-approval page itself should NOT redirect (avoid loop).

```typescript
if (profile && !profile.is_approved && profile.role === 'student') {
    const path = request.pathname; // or use headers
    if (!path.includes('pending-approval')) {
        redirect(`/${locale}/pending-approval`);
    }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/(dashboard)/pending-approval/page.tsx src/app/[locale]/(dashboard)/layout.tsx
git commit -m "feat: gate unapproved students to pending-approval page"
```

---

### Task 2.2: Admin student management — approve users + assign instructors

**Files:**
- Modify: `src/app/[locale]/(dashboard)/admin/students/page.tsx`
- Create: `src/app/api/admin/students/route.ts`
- Create: `src/app/api/admin/students/[id]/approve/route.ts`
- Create: `src/app/api/admin/students/[id]/assign-instructor/route.ts`

- [ ] **Step 1: Create admin API routes**

**GET /api/admin/students** — list all students with approval status:
```typescript
// Fetch all profiles where role='student', include instructor_assignments
const { data } = await supabase
    .from('profiles')
    .select('*, instructor_assignments(*, instructor:instructor_id(id, full_name))')
    .eq('role', 'student')
    .order('created_at', { ascending: false });
```

**POST /api/admin/students/[id]/approve** — toggle `is_approved`:
```typescript
const { data } = await supabase
    .from('profiles')
    .update({ is_approved: true, updated_at: new Date().toISOString() })
    .eq('id', studentId)
    .select()
    .single();
```

**POST /api/admin/students/[id]/assign-instructor** — assign instructor:
```typescript
const { instructor_id } = await request.json();
const { data } = await supabase
    .from('instructor_assignments')
    .upsert({
        student_id: studentId,
        instructor_id,
        assigned_by: adminUser.id
    })
    .select();
```

All routes must verify the caller is an admin.

- [ ] **Step 2: Rewrite admin students page**

Replace mock data with real Supabase data. The page should show:
- Table/list of all students
- Status badge: "Pending" (yellow) or "Approved" (green)
- Approve button for pending students
- Instructor assignment dropdown (fetch instructors from profiles where role='instructor')
- Currently assigned instructors shown as tags

- [ ] **Step 3: Fetch real instructors list**

Create helper API or inline query:
```typescript
const { data: instructors } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('role', 'instructor');
```

- [ ] **Step 4: Test flow end-to-end**

1. Register new user → appears as pending in admin
2. Admin approves → student can access dashboard
3. Admin assigns instructor → appears in student's booking options

- [ ] **Step 5: Commit**

```bash
git add src/app/api/admin/ src/app/[locale]/(dashboard)/admin/students/page.tsx
git commit -m "feat: admin student approval + instructor assignment"
```

---

## Chunk 3: Instructor-Linked Booking Calendar

**Problem:** The booking calendar shows random mock slots. It should show real slots from Supabase, filtered to instructors assigned to the student.

### Task 3.1: Fetch real slots from Supabase

**Files:**
- Modify: `src/components/booking/BookingCalendar.tsx`
- Create: `src/app/api/slots/route.ts`

- [ ] **Step 1: Create slots API route**

```typescript
// GET /api/slots?instructor_id=xxx&month=2026-03
// Returns slots for the given month, optionally filtered by instructor
import { createClient } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const instructorId = searchParams.get('instructor_id');
    const month = searchParams.get('month'); // YYYY-MM

    let query = supabase
        .from('slots')
        .select('*, course:course_id(id, title_es, title_en, price_cop, level_required), instructor:instructor_id(id, full_name)')
        .eq('is_cancelled', false)
        .gte('start_time', `${month}-01T00:00:00`)
        .lt('start_time', getNextMonth(month));

    if (instructorId) {
        query = query.eq('instructor_id', instructorId);
    }

    const { data, error } = await query.order('start_time');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
}
```

- [ ] **Step 2: Create API to get student's assigned instructors**

```typescript
// GET /api/my-instructors
// Returns the instructors assigned to the current student
export async function GET() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabase
        .from('instructor_assignments')
        .select('instructor:instructor_id(id, full_name, avatar_url)')
        .eq('student_id', user.id)
        .eq('is_active', true);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data?.map(a => a.instructor) ?? []);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/slots/route.ts src/app/api/my-instructors/route.ts
git commit -m "feat: API routes for slots and student instructor assignments"
```

---

### Task 3.2: Rewrite BookingCalendar to use real data + instructor filter

**Files:**
- Modify: `src/components/booking/BookingCalendar.tsx`
- Modify: `src/app/[locale]/(dashboard)/booking/page.tsx`

- [ ] **Step 1: Add instructor selector to booking page**

Above the calendar, show an instructor picker:
- Fetch assigned instructors from `/api/my-instructors`
- Show instructor cards/tabs the student can select
- Selected instructor filters the calendar slots
- If only one instructor assigned, auto-select

- [ ] **Step 2: Replace mock slot generation with API fetch**

In BookingCalendar:
- Remove `generateMockSlots()` entirely
- Add `useEffect` that fetches `/api/slots?instructor_id=X&month=YYYY-MM`
- Re-fetch when month changes or instructor changes
- Transform API response to the existing `TimeSlot` interface
- Show loading skeleton while fetching

- [ ] **Step 3: Handle empty state**

If no instructors assigned: show message "No tienes instructores asignados. Contacta a la administración."
If no slots: show "No hay horarios disponibles para este mes."

- [ ] **Step 4: Connect booking creation to real API**

In `booking/page.tsx`, replace the fake `handleProceedPayment`:
- Call `POST /api/bookings` with the real slot ID and user ID
- Handle the response (redirect to payment or confirmation)

- [ ] **Step 5: Commit**

```bash
git add src/components/booking/BookingCalendar.tsx src/app/[locale]/(dashboard)/booking/page.tsx
git commit -m "feat: real booking calendar with instructor filter + Supabase slots"
```

---

## Chunk 4: Admin Creates Slots Linked to Instructors

**Problem:** Admin calendar management currently uses mock data. Needs to create real slots in Supabase linked to specific instructors.

### Task 4.1: Create admin slot management API

**Files:**
- Create: `src/app/api/admin/slots/route.ts`

- [ ] **Step 1: Create CRUD API for slots**

```typescript
// POST /api/admin/slots — create new slot
// GET /api/admin/slots — list all slots with filters
// PATCH /api/admin/slots/[id] — update/cancel slot
```

POST body:
```json
{
    "instructor_id": "uuid",
    "course_id": "uuid",
    "start_time": "2026-03-20T07:00:00-05:00",
    "end_time": "2026-03-20T09:30:00-05:00",
    "capacity": 2,
    "location": "Salinas del Rey"
}
```

Validate: admin role, no overlapping slots for same instructor, future dates only.

- [ ] **Step 2: Commit**

```bash
git add src/app/api/admin/slots/route.ts
git commit -m "feat: admin slot CRUD API"
```

---

### Task 4.2: Rewrite admin calendar page with real data

**Files:**
- Modify: `src/app/[locale]/(dashboard)/admin/calendar/page.tsx`

- [ ] **Step 1: Connect to real Supabase data**

- Fetch instructors and courses for dropdowns
- Create slot form → calls `POST /api/admin/slots`
- List existing slots from Supabase with instructor name, course, time, capacity
- Cancel button → calls `PATCH` to set `is_cancelled = true`
- Filter by instructor, date range

- [ ] **Step 2: Commit**

```bash
git add src/app/[locale]/(dashboard)/admin/calendar/page.tsx
git commit -m "feat: admin calendar with real slot management"
```

---

## Chunk 5: Booking Notifications via n8n Webhook

**Problem:** No notifications are sent when a booking is created. Instructors should receive an alert via email and WhatsApp. Using n8n for automation keeps notification logic decoupled from the app code.

**Architecture:** The app fires a single webhook to n8n after each booking. n8n handles the routing (email, WhatsApp, Telegram, etc.) — zero notification libraries in the codebase.

### Task 5.1: Create n8n webhook utility

**Files:**
- Create: `src/lib/notifications.ts`
- Modify: `.env.local` (add N8N_WEBHOOK_BOOKING_URL)

- [ ] **Step 1: Add env variable**

Add to `.env.local`:
```
N8N_WEBHOOK_BOOKING_URL=https://your-n8n-instance.com/webhook/booking-created
```

- [ ] **Step 2: Create notification utility**

```typescript
// src/lib/notifications.ts

interface BookingNotificationPayload {
    event: 'booking.created' | 'booking.cancelled' | 'booking.updated';
    booking_id: string;
    student: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
    };
    instructor: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
    };
    course: {
        name: string;
        price_cop: number;
    };
    slot: {
        date: string;       // "2026-03-20"
        start_time: string;  // "07:00"
        end_time: string;    // "09:30"
        location: string;
    };
    created_at: string;
}

export async function notifyBookingEvent(payload: BookingNotificationPayload): Promise<void> {
    const webhookUrl = process.env.N8N_WEBHOOK_BOOKING_URL;
    if (!webhookUrl) {
        console.warn('N8N_WEBHOOK_BOOKING_URL not configured, skipping notification');
        return;
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error(`n8n webhook failed: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('n8n webhook error:', error);
    }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/notifications.ts
git commit -m "feat: n8n webhook utility for booking notifications"
```

---

### Task 5.2: Integrate webhook into booking flow

**Files:**
- Modify: `src/app/api/bookings/route.ts`

- [ ] **Step 1: Fire webhook after successful booking creation**

After a booking is successfully created in `POST /api/bookings`:

```typescript
import { notifyBookingEvent } from '@/lib/notifications';

// After booking insert succeeds, fetch full details for the webhook
const { data: slot } = await supabase
    .from('slots')
    .select(`
        start_time, end_time, location,
        instructor:instructor_id(id, full_name, phone),
        course:course_id(title_es, price_cop)
    `)
    .eq('id', slotId)
    .single();

const { data: studentProfile } = await supabase
    .from('profiles')
    .select('id, full_name, phone')
    .eq('id', user.id)
    .single();

// Fire-and-forget — don't block the booking response
notifyBookingEvent({
    event: 'booking.created',
    booking_id: booking.id,
    student: {
        id: user.id,
        name: studentProfile.full_name,
        email: user.email!,
        phone: studentProfile.phone,
    },
    instructor: {
        id: slot.instructor.id,
        name: slot.instructor.full_name,
        email: '', // fetched in n8n if needed
        phone: slot.instructor.phone,
    },
    course: {
        name: slot.course.title_es,
        price_cop: slot.course.price_cop,
    },
    slot: {
        date: new Date(slot.start_time).toISOString().split('T')[0],
        start_time: new Date(slot.start_time).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        end_time: new Date(slot.end_time).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        location: slot.location,
    },
    created_at: new Date().toISOString(),
}).catch(console.error);
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/bookings/route.ts
git commit -m "feat: fire n8n webhook on booking creation"
```

---

### Task 5.3: Configure n8n workflow (external — not in codebase)

This task is done in n8n, not in the app code.

- [ ] **Step 1: Create n8n workflow "Booking Created"**

Workflow nodes:
1. **Webhook trigger** — receives POST from app
2. **Send Email node** — sends booking confirmation to instructor
   - To: `{{ $json.instructor.phone }}` (lookup email from Supabase or hardcode)
   - Subject: `Nueva reserva: {{ $json.student.name }} — {{ $json.course.name }}`
   - Body: formatted HTML with booking details
3. **WhatsApp node** (via WhatsApp Business API, Twilio, or WhatsApp Cloud API)
   - To: `{{ $json.instructor.phone }}`
   - Message: booking summary with student name, course, date, time
4. (Optional) **Admin notification** — notify admin of new booking too

- [ ] **Step 2: Test webhook with n8n test mode**

Use n8n's "Test workflow" to send a sample payload and verify email + WhatsApp arrive.

- [ ] **Step 3: Activate workflow in production**

---

## Summary — Execution Order

| Order | Chunk | Dependencies | Estimated Steps |
|-------|-------|-------------|-----------------|
| 1 | Chunk 1: Profile real data | None | 12 steps |
| 2 | Chunk 2: Admin approval flow | Chunk 1 (is_approved column) | 8 steps |
| 3 | Chunk 3: Instructor booking | Chunk 2 (assignments) | 10 steps |
| 4 | Chunk 4: Admin slot management | None (parallel with 2-3) | 4 steps |
| 5 | Chunk 5: n8n Notifications | Chunk 3 (booking flow) | 5 steps |

**External setup required before Chunk 5:**
- n8n instance (self-hosted or n8n.cloud)
- Email provider configured in n8n (Gmail, SMTP, etc.)
- WhatsApp Business API or Twilio configured as n8n node
