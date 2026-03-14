'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { MagicCard } from '@/components/ui/magic-card';
import { ShineBorder } from '@/components/ui/shine-border';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function PendingApprovalPage() {
    const locale = useLocale();
    const isEn = locale === 'en';
    const router = useRouter();

    async function handleSignOut() {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push(`/${locale}/login`);
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full"
            >
                <MagicCard className="dark-card p-8 text-center relative overflow-hidden">
                    <ShineBorder shineColor={['#E9C46A', '#2A9D8F']} duration={10} />

                    {/* Animated hourglass icon */}
                    <motion.div
                        className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-sand-gold/20 to-ocean-teal/20 flex items-center justify-center"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    >
                        <svg className="w-10 h-10 text-sand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </motion.div>

                    <h1 className="text-2xl font-heading font-bold text-salt-white mb-3">
                        {isEn ? 'Account Pending Approval' : 'Cuenta Pendiente de Aprobación'}
                    </h1>

                    <p className="text-caribbean-aqua/60 text-sm mb-2">
                        {isEn
                            ? 'Your registration has been received successfully.'
                            : 'Tu registro ha sido recibido exitosamente.'}
                    </p>
                    <p className="text-caribbean-aqua/60 text-sm mb-8">
                        {isEn
                            ? 'An administrator will review and approve your account shortly. You will be able to access the platform once approved.'
                            : 'Un administrador revisará y aprobará tu cuenta pronto. Podrás acceder a la plataforma una vez aprobado.'}
                    </p>

                    {/* Status indicator */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-8">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
                        <span className="text-sm font-medium text-yellow-400">
                            {isEn ? 'Pending Review' : 'En Revisión'}
                        </span>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-ocean-teal to-caribbean-aqua text-white font-bold hover:shadow-glow-ocean-teal transition-all"
                        >
                            {isEn ? 'Check Status' : 'Verificar Estado'}
                        </button>
                        <button
                            onClick={handleSignOut}
                            className="w-full py-3 rounded-xl border border-white/10 text-caribbean-aqua/60 font-medium hover:bg-white/5 transition-colors"
                        >
                            {isEn ? 'Sign Out' : 'Cerrar Sesión'}
                        </button>
                    </div>
                </MagicCard>
            </motion.div>
        </div>
    );
}
