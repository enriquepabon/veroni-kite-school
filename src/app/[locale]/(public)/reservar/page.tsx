import { getTranslations } from 'next-intl/server';
import BookingForm from '@/components/public/BookingForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'bookingForm' });
    return {
        title: t('pageTitle') + ' — Veroni Kite',
        description: t('pageSubtitle'),
    };
}

export default async function ReservarPage({
    searchParams,
}: {
    searchParams: { curso?: string };
}) {
    const t = await getTranslations('bookingForm');

    return (
        <div className="section-padding bg-salt-white min-h-screen">
            <div className="container-main max-w-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl lg:text-display-sm font-heading font-bold text-night-tide mb-3">
                        {t('pageTitle')}
                    </h1>
                    <p className="text-lg text-deep-marine-600 max-w-md mx-auto">
                        {t('pageSubtitle')}
                    </p>
                </div>

                <div className="bg-white rounded-[16px] shadow-card p-6 md:p-8">
                    <BookingForm preselectedCourse={searchParams?.curso} />
                </div>
            </div>
        </div>
    );
}
