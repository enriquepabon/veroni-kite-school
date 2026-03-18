'use client';

import { useTranslations } from 'next-intl';

const PROTOCOLS = [
    {
        titleKey: 'protocol1Title',
        textKey: 'protocol1Text',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ),
    },
    {
        titleKey: 'protocol2Title',
        textKey: 'protocol2Text',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.06a.75.75 0 010-1.28l5.1-3.06a.75.75 0 011.08.57v6.26a.75.75 0 01-1.08.57zM20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m16.5 0H3.75m16.5 0L18.375 5.25A2.25 2.25 0 0016.172 3.75H7.828a2.25 2.25 0 00-2.203 1.5L3.75 7.5" />
            </svg>
        ),
    },
    {
        titleKey: 'protocol3Title',
        textKey: 'protocol3Text',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        titleKey: 'protocol4Title',
        textKey: 'protocol4Text',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
            </svg>
        ),
    },
];

export default function SafetyProtocols() {
    const t = useTranslations('trust');

    return (
        <section className="py-16 md:py-24 bg-gradient-dark">
            <div className="container-main">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">{t('safetyTitle')}</h2>
                    <p className="text-caribbean-aqua text-lg">{t('safetySubtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PROTOCOLS.map((p) => (
                        <div
                            key={p.titleKey}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                        >
                            <div className="text-ocean-teal mb-4">{p.icon}</div>
                            <h3 className="text-white font-semibold mb-2">{t(p.titleKey)}</h3>
                            <p className="text-white/60 text-sm leading-relaxed">{t(p.textKey)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
