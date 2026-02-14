'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

const localeLabels: Record<string, { flag: string; label: string }> = {
    es: { flag: '🇪🇸', label: 'ES' },
    en: { flag: '🇺🇸', label: 'EN' },
};

export default function LanguageToggle() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const targetLocale = locale === 'es' ? 'en' : 'es';
    const target = localeLabels[targetLocale];

    const handleSwitch = () => {
        router.replace(pathname, { locale: targetLocale });
    };

    return (
        <button
            onClick={handleSwitch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-salt-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
            aria-label={`Switch to ${targetLocale}`}
        >
            <span className="text-base">{target.flag}</span>
            <span>{target.label}</span>
        </button>
    );
}
