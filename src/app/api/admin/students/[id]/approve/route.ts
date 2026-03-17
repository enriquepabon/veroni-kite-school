import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = ['kikep008@gmail.com'];

export async function POST(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: studentId } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({
            error: 'Unauthorized',
            debug: { step: 'auth', authError: authError?.message }
        }, { status: 401 });
    }

    // Verify admin role OR email whitelist
    const { data: adminProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    const isAdmin = adminProfile?.role === 'admin' || ADMIN_EMAILS.includes(user.email || '');

    if (!isAdmin) {
        return NextResponse.json({
            error: 'Forbidden',
            debug: { step: 'role', email: user.email, role: adminProfile?.role }
        }, { status: 403 });
    }

    // Use admin client to bypass RLS
    const adminDb = createAdminClient();
    if (!adminDb) {
        return NextResponse.json({
            error: 'Server configuration error',
            debug: { step: 'admin_client', hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY }
        }, { status: 500 });
    }

    const { data, error } = await adminDb
        .from('profiles')
        .update({ is_approved: true, updated_at: new Date().toISOString() })
        .eq('id', studentId)
        .select()
        .single();

    if (error) {
        return NextResponse.json({
            error: error.message,
            debug: { step: 'update', studentId }
        }, { status: 500 });
    }

    return NextResponse.json(data);
}
