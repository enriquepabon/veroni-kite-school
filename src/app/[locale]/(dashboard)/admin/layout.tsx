import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // TODO: Check admin role from profile table
    // const { data: profile } = await supabase
    //   .from('profiles')
    //   .select('role')
    //   .eq('id', user.id)
    //   .single();
    //
    // if (profile?.role !== 'admin' && profile?.role !== 'instructor') {
    //   redirect('/dashboard');
    // }

    return (
        <div className="min-h-screen bg-deep-marine-900 text-white">
            {/* Admin sidebar and header will be built in Task 6.0 */}
            <main className="p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}
