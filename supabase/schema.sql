-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ROLES & ENUMS
create type user_role as enum ('student', 'instructor', 'admin');
create type booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed');
create type content_type as enum ('blog', 'news', 'video');
create type skill_status as enum ('locked', 'in-progress', 'completed');

-- PROFILES (Extends auth.users)
-- This table stores additional user data like role and phone
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  role user_role default 'student',
  phone text,
  weight_kg numeric,
  language_preference text default 'es',
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- COURSES (Kitesurf lessons offered)
create table public.courses (
  id uuid default uuid_generate_v4() primary key,
  title_es text not null,
  title_en text not null,
  description_es text,
  description_en text,
  level_required int default 1,
  duration_hours int not null,
  price_cop numeric not null,
  image_url text,
  active boolean default true,
  created_at timestamptz default now()
);

-- SLOTS (Calendar Availability for lessons)
create table public.slots (
  id uuid default uuid_generate_v4() primary key,
  start_time timestamptz not null,
  end_time timestamptz not null,
  instructor_id uuid references public.profiles(id),
  course_id uuid references public.courses(id),
  capacity int default 2,
  booked_count int default 0,
  is_cancelled boolean default false,
  location text default 'Salinas del Rey',
  created_at timestamptz default now()
);

-- BOOKINGS (Student reservations for slots)
create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  slot_id uuid references public.slots(id) not null,
  status booking_status default 'pending',
  payment_id text, -- Wompi Transaction ID
  amount_paid numeric,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- STUDENT PROGRESS (Tracking skills on the roadmap)
create table public.student_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  level int not null, -- 1 to 6
  skill_id text not null, -- matches roadmap-data.ts ID
  status skill_status default 'locked',
  instructor_notes text,
  instructor_id uuid references public.profiles(id), -- Who validated this
  last_updated timestamptz default now()
);

-- CONTENT (Blog, News, Resources)
create table public.content (
  id uuid default uuid_generate_v4() primary key,
  title_es text not null,
  title_en text not null,
  slug text unique,
  type content_type not null,
  url text, -- for external videos/links
  content_html_es text, -- rich text content
  content_html_en text,
  thumbnail_url text,
  author_id uuid references public.profiles(id),
  is_public boolean default false,
  published_at timestamptz,
  created_at timestamptz default now()
);

-- SECURITY POLICIES (RLS)

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.slots enable row level security;
alter table public.bookings enable row level security;
alter table public.student_progress enable row level security;
alter table public.content enable row level security;

-- PROFILES Policies
create policy "Public profiles are viewable by everyone" 
  on public.profiles for select using (true);

create policy "Users can update own profile" 
  on public.profiles for update using (auth.uid() = id);

-- COURSES Policies
create policy "Courses are viewable by everyone" 
  on public.courses for select using (true);

create policy "Admins can manage courses" 
  on public.courses for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- SLOTS Policies
create policy "Slots are viewable by everyone" 
  on public.slots for select using (true);

create policy "Instructors and Admins can manage slots" 
  on public.slots for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'instructor'))
  );

-- BOOKINGS Policies
create policy "Users can view own bookings" 
  on public.bookings for select using (auth.uid() = user_id);

create policy "Instructors and Admins can view all bookings" 
  on public.bookings for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'instructor'))
  );

create policy "Users can create bookings" 
  on public.bookings for insert with check (auth.uid() = user_id);

create policy "Admins can update bookings" 
  on public.bookings for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- PROGRESS Policies
create policy "Users can view own progress" 
  on public.student_progress for select using (auth.uid() = user_id);

create policy "Instructors and Admins can manage progress" 
  on public.student_progress for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'instructor'))
  );

-- CONTENT Policies
create policy "Public content is viewable by everyone" 
  on public.content for select using (is_public = true);

create policy "Admins can manage content" 
  on public.content for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- TRIGGERS

-- Function to handle new user signup automatically
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', 'student', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger creates profile on signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
