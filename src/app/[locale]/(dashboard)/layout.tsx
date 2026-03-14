import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardLayoutClient from '@/components/dashboard/DashboardLayout';

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
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, role, avatar_url, is_approved')
        .eq('id', user.id)
        .single();

    const userData = {
        email: user.email || '',
        fullName: profile?.full_name || user.email?.split('@')[0] || '',
        avatarUrl: profile?.avatar_url || null,
        role: (profile?.role as string) || 'student',
        isApproved: profile?.is_approved ?? false,
    };

    // Gate: block if no profile exists OR if student is not approved
    const isUnapprovedStudent = !profile || (!profile.is_approved && profile.role === 'student');
    if (isUnapprovedStudent) {
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
