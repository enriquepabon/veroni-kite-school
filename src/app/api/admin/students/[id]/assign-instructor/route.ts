import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

const ADMIN_EMAILS = ['kikep008@gmail.com'];

async function verifyAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    const isAdmin = profile?.role === 'admin' || ADMIN_EMAILS.includes(user.email || '');
    if (!isAdmin) return null;
    return user;
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: studentId } = await params;
    const supabase = await createClient();
    const admin = await verifyAdmin(supabase);

    if (!admin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminDb = createAdminClient();
    if (!adminDb) {
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const { instructor_id } = await request.json();

    if (!instructor_id) {
        return NextResponse.json({ error: 'instructor_id is required' }, { status: 400 });
    }

    const { data, error } = await adminDb
        .from('instructor_assignments')
        .upsert(
            {
                student_id: studentId,
                instructor_id,
                assigned_by: admin.id,
                is_active: true,
            },
            { onConflict: 'student_id,instructor_id' }
        )
        .select('*, instructor:instructor_id(id, full_name)')
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: studentId } = await params;
    const supabase = await createClient();
    const admin = await verifyAdmin(supabase);

    if (!admin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminDb = createAdminClient();
    if (!adminDb) {
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const { instructor_id } = await request.json();

    const { error } = await adminDb
        .from('instructor_assignments')
        .delete()
        .eq('student_id', studentId)
        .eq('instructor_id', instructor_id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
