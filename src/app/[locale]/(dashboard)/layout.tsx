import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { redirect } from 'next/navigation';
import DashboardLayoutClient from '@/components/dashboard/DashboardLayout';

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

    // Fetch profile data for sidebar and approval gating
    let { data: profile } = await supabase
        .from('profiles')
        .select('full_name, role, avatar_url, is_approved')
        .eq('id', user.id)
        .single();

    const isAdmin = ADMIN_EMAILS.includes(user.email || '');

    // Use admin client (bypasses RLS) for profile creation/promotion
    if (!profile || (isAdmin && (profile.role !== 'admin' || !profile.is_approved))) {
        const adminDb = createAdminClient();
        const { data: fixed } = await adminDb
            .from('profiles')
            .upsert({
                id: user.id,
                full_name: profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || '',
                avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url || null,
                role: isAdmin ? 'admin' : 'student',
                is_approved: isAdmin,
            })
            .select('full_name, role, avatar_url, is_approved')
            .single();
        profile = fixed;
    }

    const userData = {
        email: user.email || '',
        fullName: profile?.full_name || user.email?.split('@')[0] || '',
        avatarUrl: profile?.avatar_url || null,
        role: (profile?.role as string) || 'student',
        isApproved: profile?.is_approved ?? false,
    };

    // Gate: only block unapproved students
    if (profile?.role === 'student' && !profile?.is_approved) {
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
