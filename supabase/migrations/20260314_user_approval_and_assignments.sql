-- ============================================
-- Migration: User Approval + Instructor Assignments
-- Date: 2026-03-14
-- ============================================

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

-- Update handle_new_user to set is_approved = false and default name from email
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role, avatar_url, is_approved)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'full_name', ''), split_part(new.email, '@', 1)),
    'student',
    new.raw_user_meta_data->>'avatar_url',
    false
  );
  return new;
end;
$$ language plpgsql security definer;
