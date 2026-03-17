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

    // Admin email whitelist is the ultimate authority — survives DB failures
    const isAdminByEmail = ADMIN_EMAILS.includes(user.email || '');

    // ===== DEBUG: Step 1 — Raw profile query =====
    // eslint-disable-next-line prefer-const
    let { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, role, avatar_url, is_approved')
        .eq('id', user.id)
        .single();

    console.log('[DASHBOARD DEBUG] Step 1 — Profile query:', {
        email: user.email,
        userId: user.id,
        profile: profile ? { role: profile.role, is_approved: profile.is_approved } : null,
        profileError: profileError?.message || null,
        isAdminByEmail,
    });

    // If query failed (e.g. is_approved column missing), retry without it
    if (profileError && !profile) {
        const { data: fallback, error: fallbackError } = await supabase
            .from('profiles')
            .select('full_name, role, avatar_url')
            .eq('id', user.id)
            .single();

        console.log('[DASHBOARD DEBUG] Step 1b — Fallback query:', {
            fallback: fallback ? { role: fallback.role } : null,
            fallbackError: fallbackError?.message || null,
        });

        if (fallback) {
            profile = { ...fallback, is_approved: isAdminByEmail ? true : false };
        }
    }

    // Use admin client (bypasses RLS) for profile creation/promotion
    const adminDb = createAdminClient();

    console.log('[DASHBOARD DEBUG] Step 2 — Admin client:', {
        hasAdminDb: !!adminDb,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    });

    if (!profile && adminDb) {
        const { data: created, error: createError } = await adminDb
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

        console.log('[DASHBOARD DEBUG] Step 2a — Profile INSERT:', {
            created: created ? { role: created.role, is_approved: created.is_approved } : null,
            createError: createError?.message || null,
        });

        profile = created;
    } else if (profile && isAdminByEmail && (profile.role !== 'admin' || !profile.is_approved) && adminDb) {
        const { data: promoted, error: promoteError } = await adminDb
            .from('profiles')
            .update({ role: 'admin', is_approved: true })
            .eq('id', user.id)
            .select('full_name, role, avatar_url, is_approved')
            .single();

        console.log('[DASHBOARD DEBUG] Step 2b — Admin PROMOTE:', {
            promoted: promoted ? { role: promoted.role, is_approved: promoted.is_approved } : null,
            promoteError: promoteError?.message || null,
        });

        if (promoted) profile = promoted;
    }

    // For admin email users, force admin role in userData regardless of DB state
    const effectiveRole = isAdminByEmail ? 'admin' : ((profile?.role as string) || 'student');
    const effectiveApproved = isAdminByEmail ? true : (profile?.is_approved ?? false);

    const userData = {
        email: user.email || '',
        fullName: profile?.full_name || user.email?.split('@')[0] || '',
        avatarUrl: profile?.avatar_url || null,
        role: effectiveRole,
        isApproved: effectiveApproved,
    };

    // ===== DEBUG: Step 3 — Gate decision =====
    const gateBlocked = !isAdminByEmail && effectiveRole !== 'admin' && !effectiveApproved;
    console.log('[DASHBOARD DEBUG] Step 3 — Gate decision:', {
        isAdminByEmail,
        effectiveRole,
        effectiveApproved,
        gateBlocked,
        finalUserData: { role: userData.role, isApproved: userData.isApproved },
    });

    if (gateBlocked) {
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
