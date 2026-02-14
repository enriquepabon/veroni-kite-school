'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BookingConfirmationPage() {
    const t = useTranslations('booking');
    const locale = useLocale();
    const isEn = locale === 'en';
    const searchParams = useSearchParams();

    const reference = searchParams.get('ref') ?? searchParams.get('id') ?? 'N/A';
    const status = searchParams.get('status') ?? 'PENDING';

    const isSuccess = status === 'APPROVED';

    return (
        <div className="min-h-screen bg-salt-white pt-24 pb-16 flex items-center justify-center">
            <motion.div
                className="bg-white rounded-2xl shadow-card p-8 md:p-12 text-center max-w-md w-full"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 20, delay: 0.1 }}
            >
                {/* Icon */}
                <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: isSuccess ? '#D1FAE5' : '#FEE2E2' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, delay: 0.3 }}
                >
                    <span className="text-4xl">
                        {isSuccess ? '✅' : '❌'}
                    </span>
                </motion.div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-night-tide mb-3">
                    {isSuccess ? t('paymentSuccess') : t('paymentFailed')}
                </h1>

                {/* Message */}
                <p className="text-deep-marine-600 mb-2">
                    {isSuccess
                        ? t('bookingConfirmed')
                        : isEn
                            ? 'Your payment could not be processed. Please try again or contact us.'
                            : 'No se pudo procesar tu pago. Intenta de nuevo o contáctanos.'}
                </p>

                {/* Reference */}
                <p className="text-xs text-caribbean-aqua mb-8">
                    Ref: <span className="font-mono">{reference}</span>
                </p>

                {/* CTA */}
                <div className="flex flex-col gap-3">
                    <Link
                        href={`/${locale}/dashboard`}
                        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-deep-marine-500 to-ocean-teal text-white font-bold text-center hover:shadow-lg transition-all"
                    >
                        {t('backToDashboard')}
                    </Link>
                    {!isSuccess && (
                        <Link
                            href={`/${locale}/booking`}
                            className="w-full py-3 px-6 rounded-xl border border-caribbean-aqua text-deep-marine-600 font-medium text-center hover:bg-salt-white transition-colors"
                        >
                            {isEn ? 'Try Again' : 'Intentar de Nuevo'}
                        </Link>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
