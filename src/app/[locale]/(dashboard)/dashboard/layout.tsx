import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-salt-white">
            {/* Dashboard sidebar and header will be built in Task 5.0 */}
            <main className="p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}
