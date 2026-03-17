import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { redirect } from 'next/navigation';
import DashboardLayoutClient from '@/components/dashboard/DashboardLayout';

// Force dynamic rendering — profile/approval status must always be fresh
export const dynamic = 'force-dynamic';

// Admin emails that bypass approval and get admin role automatically
const ADMIN_EMAILS = ['kikep008@gmail.com'];

export default async function DashboardGroupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const isAdminByEmail = ADMIN_EMAILS.includes(user.email || '');

    // Use admin client (bypasses RLS) for ALL profile operations.
    // The profiles table has a recursive RLS policy that breaks anon-key queries.
    const adminDb = createAdminClient();
    const db = adminDb || supabase;

    let { data: profile } = await db
        .from('profiles')
        .select('full_name, role, avatar_url, is_approved')
        .eq('id', user.id)
        .single();

    if (!profile && adminDb) {
        // Profile doesn't exist yet — create it
        const { data: created } = await adminDb
            .from('profiles')
            .insert({
                id: user.id,
                full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
                avatar_url: user.user_metadata?.avatar_url || null,
                role: isAdminByEmail ? 'admin' : 'student',
                is_approved: isAdminByEmail,
            })
            .select('full_name, role, avatar_url, is_approved')
            .single();
        profile = created;
    } else if (profile && isAdminByEmail && (profile.role !== 'admin' || !profile.is_approved) && adminDb) {
        // Admin email needs promotion
        const { data: promoted } = await adminDb
            .from('profiles')
            .update({ role: 'admin', is_approved: true })
            .eq('id', user.id)
            .select('full_name, role, avatar_url, is_approved')
            .single();
        if (promoted) profile = promoted;
    }

    const effectiveRole = isAdminByEmail ? 'admin' : ((profile?.role as string) || 'student');
    const effectiveApproved = isAdminByEmail ? true : (profile?.is_approved ?? false);

    const userData = {
        email: user.email || '',
        fullName: profile?.full_name || user.email?.split('@')[0] || '',
        avatarUrl: profile?.avatar_url || null,
        role: effectiveRole,
        isApproved: effectiveApproved,
    };

    // Gate: admin email users ALWAYS pass; everyone else needs approval
    if (!isAdminByEmail && effectiveRole !== 'admin' && !effectiveApproved) {
        const PendingPage = (await import('./pending-approval/page')).default;
        return (
            <DashboardLayoutClient user={userData}>
                <PendingPage />
            </DashboardLayoutClient>
        );
    }

    return (
        <DashboardLayoutClient user={userData}>
            {children}
        </DashboardLayoutClient>
    );
}
