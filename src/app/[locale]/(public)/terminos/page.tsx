import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'terms' });
    return {
        title: t('title') + ' — Veroni Kite',
        description: t('metaDescription'),
    };
}

export default async function TerminosPage() {
    const t = await getTranslations('terms');

    return (
        <div className="section-padding bg-salt-white min-h-screen">
            <div className="container-main max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-night-tide mb-8">
                    {t('title')}
                </h1>
                <p className="text-sm text-deep-marine-600 mb-8">
                    {t('lastUpdated')}
                </p>

                <div className="prose prose-lg max-w-none text-deep-marine-700 space-y-8">
                    {/* 1. Descripción del Servicio */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section1Title')}
                        </h2>
                        <p>{t('section1Content')}</p>
                    </section>

                    {/* 2. Requisitos del Estudiante */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section2Title')}
                        </h2>
                        <p>{t('section2Intro')}</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>{t('section2Item1')}</li>
                            <li>{t('section2Item2')}</li>
                            <li>{t('section2Item3')}</li>
                        </ul>
                    </section>

                    {/* 3. Reservas y Pagos */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section3Title')}
                        </h2>
                        <p>{t('section3Content')}</p>
                    </section>

                    {/* 4. Cancelaciones y Reprogramaciones */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section4Title')}
                        </h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>{t('section4Item1')}</li>
                            <li>{t('section4Item2')}</li>
                            <li>{t('section4Item3')}</li>
                            <li>{t('section4Item4')}</li>
                        </ul>
                    </section>

                    {/* 5. Seguridad y Responsabilidad */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section5Title')}
                        </h2>
                        <p>{t('section5Content')}</p>
                    </section>

                    {/* 6. Limitación de Responsabilidad */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section6Title')}
                        </h2>
                        <p>{t('section6Content')}</p>
                    </section>

                    {/* 7. Propiedad Intelectual */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section7Title')}
                        </h2>
                        <p>{t('section7Content')}</p>
                    </section>

                    {/* 8. Ley Aplicable */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section8Title')}
                        </h2>
                        <p>{t('section8Content')}</p>
                    </section>

                    {/* 9. Contacto */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section9Title')}
                        </h2>
                        <p className="whitespace-pre-line">{t('section9Content')}</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
