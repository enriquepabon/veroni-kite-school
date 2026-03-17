import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

const ADMIN_EMAILS = ['kikep008@gmail.com'];

export async function POST(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: studentId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify admin role OR email whitelist
    const { data: adminProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    const isAdmin = adminProfile?.role === 'admin' || ADMIN_EMAILS.includes(user.email || '');

    if (!isAdmin) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Use admin client to bypass RLS
    const adminDb = createAdminClient();
    if (!adminDb) {
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const { data, error } = await adminDb
        .from('profiles')
        .update({ is_approved: true, updated_at: new Date().toISOString() })
        .eq('id', studentId)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
