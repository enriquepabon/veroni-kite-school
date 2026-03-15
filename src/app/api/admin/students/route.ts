import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

async function verifyAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') return null;
    return user;
}

export async function GET() {
    const supabase = await createClient();
    const admin = await verifyAdmin(supabase);

    if (!admin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use admin client to bypass RLS and see all profiles
    const adminDb = createAdminClient();
    const db = adminDb || supabase;

    const { data: students, error } = await db
        .from('profiles')
        .select('*, instructor_assignments(id, instructor_id, is_active, instructor:instructor_id(id, full_name))')
        .eq('role', 'student')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Also fetch all instructors for the assignment dropdown
    const { data: instructors } = await db
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'instructor')
        .order('full_name');

    return NextResponse.json({ students: students || [], instructors: instructors || [] });
}
