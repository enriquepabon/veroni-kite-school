export interface SiteEvent {
    id: string;
    nameEs: string;
    nameEn: string;
    descriptionEs: string;
    descriptionEn: string;
    date: string;
    endDate?: string;
    image: string;
    status: 'upcoming' | 'active' | 'past';
}

export const siteEvents: SiteEvent[] = [
    {
        id: 'salinas-fest-2026',
        nameEs: 'Salinas Fest 2026',
        nameEn: 'Salinas Fest 2026',
        descriptionEs: 'El festival de kitesurf más grande del Caribe colombiano. Competencias, música y la mejor vibra.',
        descriptionEn: 'The biggest kitesurf festival in the Colombian Caribbean. Competitions, music, and the best vibes.',
        date: '2026-03-20',
        endDate: '2026-03-22',
        image: '/images/events/salinas-fest.webp',
        status: 'upcoming',
    },
];
