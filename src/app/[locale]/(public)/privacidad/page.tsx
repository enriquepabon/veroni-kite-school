import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'privacy' });
    return {
        title: t('title') + ' — Veroni Kite',
        description: t('metaDescription'),
    };
}

export default async function PrivacidadPage() {
    const t = await getTranslations('privacy');

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
                    {/* 1. Responsable del Tratamiento */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section1Title')}
                        </h2>
                        <p className="whitespace-pre-line">{t('section1Content')}</p>
                    </section>

                    {/* 2. Datos Recopilados */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section2Title')}
                        </h2>
                        <p>{t('section2Intro')}</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>{t('section2Item1')}</li>
                            <li>{t('section2Item2')}</li>
                            <li>{t('section2Item3')}</li>
                            <li>{t('section2Item4')}</li>
                        </ul>
                    </section>

                    {/* 3. Finalidad del Tratamiento */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section3Title')}
                        </h2>
                        <p>{t('section3Intro')}</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>{t('section3Item1')}</li>
                            <li>{t('section3Item2')}</li>
                            <li>{t('section3Item3')}</li>
                            <li>{t('section3Item4')}</li>
                        </ul>
                    </section>

                    {/* 4. Derechos ARCO */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section4Title')}
                        </h2>
                        <p>{t('section4Intro')}</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>{t('section4Item1')}</li>
                            <li>{t('section4Item2')}</li>
                            <li>{t('section4Item3')}</li>
                            <li>{t('section4Item4')}</li>
                        </ul>
                    </section>

                    {/* 5. Procedimiento */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section5Title')}
                        </h2>
                        <p className="whitespace-pre-line">{t('section5Content')}</p>
                    </section>

                    {/* 6. Seguridad */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section6Title')}
                        </h2>
                        <p>{t('section6Content')}</p>
                    </section>

                    {/* 7. Vigencia */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-night-tide mb-3">
                            {t('section7Title')}
                        </h2>
                        <p>{t('section7Content')}</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
