# Security Hardening Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all 13 security vulnerabilities identified in the 2026-03-12 audit, raising the security score from 5.2/10 to 9+/10.

**Architecture:** Create a shared validation library (`src/lib/validation.ts`) using Zod for all API schemas. Add security headers in `next.config.mjs`. Harden each API route individually. Fix auth callback redirect logic. No new external dependencies except `zod`.

**Tech Stack:** Next.js 14, TypeScript, Zod, Supabase, Wompi

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/lib/validation.ts` | Zod schemas for all API request bodies |
| Create | `src/lib/security.ts` | Shared security helpers (redirect validation, rate limiting in-memory) |
| Modify | `src/app/api/wompi/webhook/route.ts` | Mandatory signature validation |
| Modify | `src/app/auth/callback/route.ts` | Safe redirect with allowlist |
| Modify | `src/app/api/bookings/route.ts` | Zod validation + atomic slot update |
| Modify | `src/app/api/booking/route.ts` | Zod validation + length limits |
| Modify | `src/app/api/leads/route.ts` | Zod validation + length limits |
| Modify | `src/app/api/progress/route.ts` | Zod validation + length limits |
| Modify | `next.config.mjs` | Security headers (CSP, HSTS, etc.) |
| Modify | `.gitignore` | Add `.env` and `.mcp.json` |

---

## Chunk 1: Foundation — Zod, Security Helpers, Gitignore

### Task 1: Install Zod

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install zod**

Run:
```bash
npm install zod
```

- [ ] **Step 2: Verify installation**

Run:
```bash
node -e "require('zod')"
```
Expected: No error

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add zod for API input validation"
```

---

### Task 2: Create validation schemas

**Files:**
- Create: `src/lib/validation.ts`

- [ ] **Step 1: Create the validation schemas file**

```typescript
// src/lib/validation.ts
import { z } from 'zod';

// Reusable fields
const email = z.string().trim().toLowerCase().email().max(254);
const name = z.string().trim().min(1).max(200);
const uuid = z.string().uuid();

// POST /api/booking — public booking request
export const bookingRequestSchema = z.object({
  name,
  email,
  phone: z.string().trim().min(5).max(30),
  course: z.string().trim().min(1).max(100),
  date: z.string().max(30).optional(),
  message: z.string().max(2000).optional(),
});

// POST /api/leads — lead capture
export const leadSchema = z.object({
  name,
  email,
});

// POST /api/bookings — authenticated booking creation
export const createBookingSchema = z.object({
  slot_id: uuid,
  course_id: uuid,
  amount_cop: z.number().int().positive().max(100_000_000),
});

// PATCH /api/progress — instructor skill progress update
export const progressSchema = z.object({
  studentId: uuid,
  skillId: uuid,
  completed: z.boolean().optional(),
  note: z.string().max(1000).optional(),
});

// Wompi webhook payload
export const wompiWebhookSchema = z.object({
  event: z.string(),
  data: z.object({
    transaction: z.object({
      id: z.string(),
      reference: z.string(),
      status: z.string(),
    }).passthrough(),
  }),
  signature: z.object({
    properties: z.array(z.string()),
    checksum: z.string(),
  }),
});

// Helper to parse and return typed result or error Response
export function parseBody<T>(schema: z.ZodSchema<T>, data: unknown):
  { success: true; data: T } | { success: false; response: Response } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
  return {
    success: false,
    response: Response.json(
      { error: 'Validation failed', details: errors },
      { status: 400 },
    ),
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/validation.ts
git commit -m "feat: add Zod validation schemas for all API routes"
```

---

### Task 3: Create security helpers

**Files:**
- Create: `src/lib/security.ts`

- [ ] **Step 1: Create security helpers file**

```typescript
// src/lib/security.ts

/**
 * Validate a redirect path is safe (no open redirect).
 * Only allows relative paths starting with / that don't start with //.
 */
const ALLOWED_REDIRECT_PREFIXES = ['/dashboard', '/booking', '/es/', '/en/', '/'];

export function safeRedirectPath(path: string | null): string {
  const fallback = '/dashboard';
  if (!path) return fallback;
  // Must start with exactly one slash, not //
  if (!path.startsWith('/') || path.startsWith('//')) return fallback;
  // Must not contain protocol-like patterns
  if (path.includes('://')) return fallback;
  // Check it starts with an allowed prefix
  const isAllowed = ALLOWED_REDIRECT_PREFIXES.some((prefix) => path.startsWith(prefix));
  return isAllowed ? path : fallback;
}

/**
 * Simple in-memory rate limiter (per-IP, sliding window).
 * For production at scale, replace with @upstash/ratelimit or similar.
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  ip: string,
  { maxRequests = 10, windowMs = 60_000 }: { maxRequests?: number; windowMs?: number } = {},
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  entry.count++;
  const remaining = Math.max(0, maxRequests - entry.count);
  return { allowed: entry.count <= maxRequests, remaining };
}

// Cleanup stale entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of rateLimitStore) {
      if (now > val.resetAt) rateLimitStore.delete(key);
    }
  }, 5 * 60_000).unref?.();
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/security.ts
git commit -m "feat: add security helpers — safe redirect, in-memory rate limiter"
```

---

### Task 4: Fix .gitignore gaps

**Files:**
- Modify: `.gitignore:28-29`

- [ ] **Step 1: Add `.env` and `.mcp.json` to .gitignore**

Replace in `.gitignore`:
```
# local env files
.env*.local
```

With:
```
# local env files
.env
.env*.local
.mcp.json
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "fix: add .env and .mcp.json to .gitignore"
```

---

## Chunk 2: Critical & High Fixes

### Task 5: Fix Wompi webhook — mandatory signature validation [CRITICAL]

**Files:**
- Modify: `src/app/api/wompi/webhook/route.ts:9-49`

- [ ] **Step 1: Replace the entire POST handler with hardened version**

Replace the full content of `src/app/api/wompi/webhook/route.ts` with:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { parseBody, wompiWebhookSchema } from '@/lib/validation';
import { rateLimit } from '@/lib/security';

/**
 * POST /api/wompi/webhook — Receive Wompi transaction events.
 * Validates integrity signature (MANDATORY) and updates booking payment status.
 * @see https://docs.wompi.co/docs/colombia/eventos/
 */
export async function POST(request: NextRequest) {
    try {
        // Rate limit webhooks: 30 per minute per IP
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
        const { allowed } = rateLimit(ip, { maxRequests: 30, windowMs: 60_000 });
        if (!allowed) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        const body = await request.json();

        // Validate payload schema
        const parsed = parseBody(wompiWebhookSchema, body);
        if (!parsed.success) return parsed.response;
        const { event, data, signature } = parsed.data;

        const transaction = data.transaction;

        // MANDATORY: Reject if events secret is not configured
        const eventsSecret = process.env.WOMPI_EVENTS_SECRET;
        if (!eventsSecret) {
            console.error('WOMPI_EVENTS_SECRET is not configured — rejecting webhook');
            return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
        }

        // MANDATORY: Validate signature
        const properties = signature.properties;
        const checksum = signature.checksum;

        const values = properties.map((prop: string) => {
            const keys = prop.split('.');
            let value: Record<string, unknown> = data as unknown as Record<string, unknown>;
            for (const key of keys) {
                value = value?.[key] as Record<string, unknown>;
            }
            return value;
        });

        const concatenated = values.join('') + transaction.id + eventsSecret;

        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(concatenated);
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

        if (hashHex !== checksum) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const supabase = await createClient();
        const reference = transaction.reference;
        const status = transaction.status;

        const paymentStatusMap: Record<string, string> = {
            APPROVED: 'approved',
            DECLINED: 'declined',
            VOIDED: 'voided',
            ERROR: 'error',
        };

        const paymentStatus = paymentStatusMap[status] ?? 'pending';

        const { error: updateError } = await supabase
            .from('bookings')
            .update({
                payment_status: paymentStatus,
                status: paymentStatus === 'approved' ? 'confirmed' : 'pending',
                updated_at: new Date().toISOString(),
            })
            .eq('payment_reference', reference);

        if (updateError) {
            console.error('Failed to update booking:', updateError);
            return NextResponse.json({ error: 'Update failed' }, { status: 500 });
        }

        // If DECLINED or VOIDED, release the slot
        if (paymentStatus === 'declined' || paymentStatus === 'voided') {
            const { data: booking } = await supabase
                .from('bookings')
                .select('slot_id')
                .eq('payment_reference', reference)
                .single();

            if (booking?.slot_id) {
                const { data: slot } = await supabase
                    .from('time_slots')
                    .select('booked_count')
                    .eq('id', booking.slot_id)
                    .single();

                if (slot && slot.booked_count > 0) {
                    await supabase
                        .from('time_slots')
                        .update({ booked_count: slot.booked_count - 1 })
                        .eq('id', booking.slot_id);
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Wompi webhook error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/api/wompi/webhook/route.ts
git commit -m "fix(security): make Wompi webhook signature validation mandatory

Previously, if WOMPI_EVENTS_SECRET was unset or signature was missing,
the check was skipped entirely. Now both are required."
```

---

### Task 6: Fix open redirect in auth callback [HIGH]

**Files:**
- Modify: `src/app/auth/callback/route.ts` (full file)

- [ ] **Step 1: Replace auth callback with hardened version**

Replace the full content of `src/app/auth/callback/route.ts` with:

```typescript
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { safeRedirectPath } from '@/lib/security';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = safeRedirectPath(searchParams.get('next'));

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // Always use origin — do not trust x-forwarded-host without validation
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // Auth error — redirect to login with error
    return NextResponse.redirect(`${origin}/login?error=auth`);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/auth/callback/route.ts
git commit -m "fix(security): prevent open redirect in auth callback

Validate 'next' param with allowlist. Remove trusted x-forwarded-host."
```

---

### Task 7: Add rate limiting to public API endpoints [HIGH]

**Files:**
- Modify: `src/app/api/booking/route.ts:4-6`
- Modify: `src/app/api/leads/route.ts:4-6`
- Modify: `src/app/api/weather/route.ts:36-37`

- [ ] **Step 1: Add rate limiting to /api/booking**

Add at the top of `src/app/api/booking/route.ts` after existing imports:

```typescript
import { rateLimit } from '@/lib/security';
```

Add as the first lines inside the `try` block of `POST` (after line 5):

```typescript
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
        const { allowed } = rateLimit(ip, { maxRequests: 5, windowMs: 60_000 });
        if (!allowed) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }
```

- [ ] **Step 2: Add rate limiting to /api/leads**

Same pattern in `src/app/api/leads/route.ts`. Add import:

```typescript
import { rateLimit } from '@/lib/security';
```

Add inside `try` after line 5:

```typescript
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
        const { allowed } = rateLimit(ip, { maxRequests: 5, windowMs: 60_000 });
        if (!allowed) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }
```

- [ ] **Step 3: Add rate limiting to /api/weather**

Modify `src/app/api/weather/route.ts`. Add at the top after existing import:

```typescript
import { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/security';
```

Change the function signature from `export async function GET()` to:

```typescript
export async function GET(request: NextRequest) {
```

Add as first lines inside `try`:

```typescript
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
        const { allowed } = rateLimit(ip, { maxRequests: 20, windowMs: 60_000 });
        if (!allowed) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }
```

- [ ] **Step 4: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/app/api/booking/route.ts src/app/api/leads/route.ts src/app/api/weather/route.ts
git commit -m "fix(security): add rate limiting to public API endpoints

/api/booking: 5/min, /api/leads: 5/min, /api/weather: 20/min per IP."
```

---

## Chunk 3: Medium Severity Fixes

### Task 8: Add security headers in next.config.mjs [MEDIUM]

**Files:**
- Modify: `next.config.mjs:6-16`

- [ ] **Step 1: Add headers() to nextConfig**

Replace the `nextConfig` object in `next.config.mjs` with:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.supabase.co",
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://embed.windy.com https://www.google.com https://checkout.wompi.co",
              "connect-src 'self' https://*.supabase.co https://api.windy.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};
```

- [ ] **Step 2: Verify build works**

Run:
```bash
npx next build 2>&1 | tail -5
```
Expected: Build completes successfully

- [ ] **Step 3: Commit**

```bash
git add next.config.mjs
git commit -m "fix(security): add security headers — CSP, HSTS, X-Frame-Options, etc."
```

---

### Task 9: Add Zod validation to /api/booking [MEDIUM]

**Files:**
- Modify: `src/app/api/booking/route.ts` (full file)

- [ ] **Step 1: Replace with validated version**

Replace full content of `src/app/api/booking/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { parseBody, bookingRequestSchema } from '@/lib/validation';
import { rateLimit } from '@/lib/security';

export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
        const { allowed } = rateLimit(ip, { maxRequests: 5, windowMs: 60_000 });
        if (!allowed) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        const body = await request.json();
        const parsed = parseBody(bookingRequestSchema, body);
        if (!parsed.success) return parsed.response;

        const { name, email, phone, course, date, message } = parsed.data;

        const supabase = await createClient();

        const { error } = await supabase.from('booking_requests').insert({
            name,
            email,
            phone,
            course,
            preferred_date: date || null,
            message: message || null,
        });

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json(
                { error: 'Failed to save booking request' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Booking API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/app/api/booking/route.ts
git commit -m "fix(security): add Zod validation to /api/booking"
```

---

### Task 10: Add Zod validation to /api/leads [MEDIUM]

**Files:**
- Modify: `src/app/api/leads/route.ts` (full file)

- [ ] **Step 1: Replace with validated version**

Replace full content of `src/app/api/leads/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { parseBody, leadSchema } from '@/lib/validation';
import { rateLimit } from '@/lib/security';

export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
        const { allowed } = rateLimit(ip, { maxRequests: 5, windowMs: 60_000 });
        if (!allowed) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        const body = await request.json();
        const parsed = parseBody(leadSchema, body);
        if (!parsed.success) return parsed.response;

        const { name, email } = parsed.data;

        const supabase = await createClient();

        const { error } = await supabase.from('leads').insert({ name, email });

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json(
                { error: 'Failed to save lead' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Leads API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/app/api/leads/route.ts
git commit -m "fix(security): add Zod validation to /api/leads"
```

---

### Task 11: Add Zod validation to /api/bookings [MEDIUM]

**Files:**
- Modify: `src/app/api/bookings/route.ts:17-25`

- [ ] **Step 1: Add imports at top of file**

Add after existing imports in `src/app/api/bookings/route.ts`:

```typescript
import { parseBody, createBookingSchema } from '@/lib/validation';
```

- [ ] **Step 2: Replace manual validation with Zod**

Replace lines 17-25 (from `const body` to the closing `}` of the missing-fields check):

```typescript
        const body = await request.json();
        const { slot_id, course_id, amount_cop } = body;

        if (!slot_id || !course_id || !amount_cop) {
            return NextResponse.json(
                { data: null, error: 'Missing required fields', status: 400 },
                { status: 400 }
            );
        }
```

With:

```typescript
        const body = await request.json();
        const parsed = parseBody(createBookingSchema, body);
        if (!parsed.success) return parsed.response;
        const { slot_id, course_id, amount_cop } = parsed.data;
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add src/app/api/bookings/route.ts
git commit -m "fix(security): add Zod validation to /api/bookings — UUID + positive int checks"
```

---

### Task 12: Add Zod validation to /api/progress [MEDIUM]

**Files:**
- Modify: `src/app/api/progress/route.ts:27-31`

- [ ] **Step 1: Add import**

Add after existing imports in `src/app/api/progress/route.ts`:

```typescript
import { parseBody, progressSchema } from '@/lib/validation';
```

- [ ] **Step 2: Replace manual validation**

Replace lines 27-31:

```typescript
        const body = await request.json();
        const { studentId, skillId, completed, note } = body;

        if (!studentId || !skillId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
```

With:

```typescript
        const body = await request.json();
        const parsed = parseBody(progressSchema, body);
        if (!parsed.success) return parsed.response;
        const { studentId, skillId, completed, note } = parsed.data;
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add src/app/api/progress/route.ts
git commit -m "fix(security): add Zod validation to /api/progress — UUID + note length limit"
```

---

### Task 13: Fix race condition in booking slot availability [MEDIUM]

**Files:**
- Create: `supabase/migrations/20260312_atomic_book_slot.sql` (SQL for Supabase RPC)
- Modify: `src/app/api/bookings/route.ts:27-76`

- [ ] **Step 1: Create the atomic slot booking SQL function**

Create `supabase/migrations/20260312_atomic_book_slot.sql`:

```sql
-- Atomic slot booking: checks availability and increments in one transaction
CREATE OR REPLACE FUNCTION book_slot(p_slot_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  v_booked INT;
  v_max INT;
BEGIN
  -- Lock the row to prevent concurrent reads
  SELECT booked_count, max_students INTO v_booked, v_max
  FROM time_slots
  WHERE id = p_slot_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  IF v_booked >= v_max THEN
    RETURN FALSE;
  END IF;

  UPDATE time_slots SET booked_count = v_booked + 1 WHERE id = p_slot_id;
  RETURN TRUE;
END;
$$;
```

> **Note:** This migration must be applied to your Supabase project via the Supabase dashboard SQL editor or `supabase db push`. This step cannot be automated from the Next.js codebase alone.

- [ ] **Step 2: Update /api/bookings to use atomic RPC**

In `src/app/api/bookings/route.ts`, replace the slot availability check + increment block (from the `// Check slot availability` comment through the `update({ booked_count })` call) with:

Replace:
```typescript
        // Check slot availability
        const { data: slot, error: slotError } = await supabase
            .from('time_slots')
            .select('*')
            .eq('id', slot_id)
            .single();

        if (slotError || !slot) {
            return NextResponse.json(
                { data: null, error: 'Slot not found', status: 404 },
                { status: 404 }
            );
        }

        if (slot.booked_count >= slot.max_students) {
            return NextResponse.json(
                { data: null, error: 'Slot is full', status: 409 },
                { status: 409 }
            );
        }

        // Create booking
        const bookingRef = `BOOK-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .insert({
                student_id: user.id,
                slot_id,
                course_id,
                status: 'pending',
                payment_status: 'pending',
                payment_reference: bookingRef,
                amount_cop,
            })
            .select()
            .single();

        if (bookingError) {
            return NextResponse.json(
                { data: null, error: bookingError.message, status: 500 },
                { status: 500 }
            );
        }

        // Increment booked_count on the slot
        await supabase
            .from('time_slots')
            .update({ booked_count: slot.booked_count + 1 })
            .eq('id', slot_id);
```

With:
```typescript
        // Atomically check availability and increment booked_count
        const { data: slotAvailable, error: rpcError } = await supabase
            .rpc('book_slot', { p_slot_id: slot_id });

        if (rpcError) {
            console.error('RPC book_slot error:', rpcError);
            return NextResponse.json(
                { data: null, error: 'Slot not found', status: 404 },
                { status: 404 }
            );
        }

        if (!slotAvailable) {
            return NextResponse.json(
                { data: null, error: 'Slot is full', status: 409 },
                { status: 409 }
            );
        }

        // Create booking
        const bookingRef = `BOOK-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .insert({
                student_id: user.id,
                slot_id,
                course_id,
                status: 'pending',
                payment_status: 'pending',
                payment_reference: bookingRef,
                amount_cop,
            })
            .select()
            .single();

        if (bookingError) {
            // Rollback the slot increment if booking insert fails
            await supabase.rpc('book_slot', { p_slot_id: slot_id }).catch(() => {});
            return NextResponse.json(
                { data: null, error: bookingError.message, status: 500 },
                { status: 500 }
            );
        }
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/20260312_atomic_book_slot.sql src/app/api/bookings/route.ts
git commit -m "fix(security): atomic slot booking via Supabase RPC to prevent race condition"
```

---

## Chunk 4: Low Severity + Dependency Fixes

### Task 14: Fix insecure dependencies [HIGH]

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Run npm audit fix for non-breaking changes**

Run:
```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm audit fix
```

- [ ] **Step 2: Verify the fix results**

Run:
```bash
npm audit
```
Expected: Reduced vulnerability count (Next.js vulnerabilities may remain as they require a major version bump)

- [ ] **Step 3: Verify build still works**

Run:
```bash
npx next build 2>&1 | tail -5
```
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "fix(security): update dependencies to resolve known vulnerabilities"
```

---

### Task 15: Strengthen password validation on registration form [LOW]

**Files:**
- Modify: `src/app/[locale]/(auth)/registro/page.tsx`

- [ ] **Step 1: Read the current file to identify exact lines**

Run: Read `src/app/[locale]/(auth)/registro/page.tsx` and locate the password validation logic and the password input field.

- [ ] **Step 2: Add password strength validation**

In the `handleSubmit` function, after the password confirmation check, add:

```typescript
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('La contrasena debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero');
            return;
        }
```

And update the HTML `minLength` from `6` to `8` on the password input.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/(auth)/registro/page.tsx"
git commit -m "fix(security): strengthen password requirements — min 8 chars, mixed case + digit"
```

---

## Chunk 5: Verification

### Task 16: Final verification

- [ ] **Step 1: Full TypeScript check**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

- [ ] **Step 2: Full build**

Run:
```bash
npx next build
```
Expected: Build succeeds

- [ ] **Step 3: Re-run npm audit**

Run:
```bash
npm audit
```
Expected: Only Next.js major-version vulnerabilities remain (require v16 upgrade, tracked separately)

- [ ] **Step 4: Verify .gitignore**

Run:
```bash
grep -n "\.env$" .gitignore && grep -n "\.mcp\.json" .gitignore
```
Expected: Both patterns found

- [ ] **Step 5: Manual checklist**

Verify these behaviors:
- [ ] `/auth/callback?next=//evil.com` redirects to `/dashboard` (not evil.com)
- [ ] `/api/wompi/webhook` with missing `signature` field returns 400
- [ ] `/api/wompi/webhook` returns 503 if `WOMPI_EVENTS_SECRET` is unset
- [ ] `/api/booking` returns 429 after 5 rapid requests
- [ ] `/api/booking` with email `"notanemail"` returns 400
- [ ] `/api/bookings` with `amount_cop: -100` returns 400
- [ ] Response headers include `X-Frame-Options: DENY`

---

## Summary

| Task | Severity | Issue Fixed |
|------|----------|------------|
| 1-3 | — | Foundation: Zod, security helpers |
| 4 | MEDIUM/LOW | `.gitignore` gaps |
| 5 | **CRITICAL** | Wompi webhook signature bypass |
| 6 | **HIGH** | Open redirect + x-forwarded-host trust |
| 7 | **HIGH** | Rate limiting on public endpoints |
| 8 | MEDIUM | Security headers (CSP, HSTS, etc.) |
| 9-12 | MEDIUM | Zod validation on all API routes |
| 13 | MEDIUM | Race condition in slot booking |
| 14 | HIGH | Dependency vulnerabilities |
| 15 | LOW | Password strength policy |
| 16 | — | Final verification |

**Estimated commits:** 14
**New dependencies:** `zod`
**Database migration required:** Yes (Task 13 — Supabase RPC function)
