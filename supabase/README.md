# Supabase Setup for Veroni Kite

Follow these steps to set up your Supabase project backend.

## 1. Create Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Enter Name: `Veroni Kite`
4. Set a safe password
5. Choose a region close to Colombia users if possible (e.g., US East)

## 2. SQL Setup
1. In the sidebar, go to **SQL Editor**
2. Click "New Query"
3. Copy the contents of `supabase/schema.sql`
4. Paste into the editor and click **Run**
   - This creates all tables (profiles, courses, bookings, etc.)
   - It sets up Security Policies (RLS)
   - It sets up Triggers (e.g., auto-create profile on signup)

## 3. Seed Initial Data
1. In the SQL Editor, create another "New Query"
2. Copy the contents of `supabase/seeds.sql`
3. Paste and click **Run**
   - This populates the database with the 3 main courses (Discovery, Kite Control, Waterstart)

## 4. Connect to Next.js
1. Go to **Project Settings** (gear icon) -> **API**
2. Copy `Project URL` and `anon public` key
3. Update your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 5. Enable Auth Providers (Optional)
1. Go to **Authentication** -> **Providers**
2. Enable **Google** if you want social login (requires Google Cloud Console setup)
3. Email/Password is enabled by default

## 6. Storage Setup (For Content Images)
1. Go to **Storage** in sidebar
2. Create a new bucket named `content`
3. Make it **Public**
4. Create another bucket named `avatars`
5. Make it **Public**

You are now ready to go!
