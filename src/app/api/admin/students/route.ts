import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = ['kikep008@gmail.com'];

export async function GET() {
    const supabase = await createClient();

    // Step 1: Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user || authError) {
        return NextResponse.json({
            error: 'Unauthorized',
            debug: {
                step: 'auth',
                hasUser: !!user,
                authError: authError?.message || null,
            }
        }, { status: 401 });
    }

    // Step 2: Check admin role via profile OR email whitelist
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    const isAdminByEmail = ADMIN_EMAILS.includes(user.email || '');
    const isAdminByRole = profile?.role === 'admin';

    if (!isAdminByRole && !isAdminByEmail) {
        return NextResponse.json({
            error: 'Unauthorized',
            debug: {
                step: 'role_check',
                email: user.email,
                profileRole: profile?.role || null,
                profileError: profileError?.message || null,
                isAdminByEmail,
                isAdminByRole,
            }
        }, { status: 401 });
    }

    // Step 3: Use admin client to bypass RLS and see all profiles
    const adminDb = createAdminClient();
    const db = adminDb || supabase;

    const { data: students, error } = await db
        .from('profiles')
        .select('*, instructor_assignments!instructor_assignments_student_id_fkey(id, instructor_id, is_active, instructor:instructor_id(id, full_name))')
        .eq('role', 'student')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({
            error: error.message,
            debug: { step: 'query', hasAdminClient: !!adminDb }
        }, { status: 500 });
    }

    // Also fetch all instructors for the assignment dropdown
    const { data: instructors } = await db
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'instructor')
        .order('full_name');

    return NextResponse.json({ students: students || [], instructors: instructors || [] });
}
