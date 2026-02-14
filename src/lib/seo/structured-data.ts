/**
 * JSON-LD Structured Data for Veroni Kite Academy.
 * Implements LocalBusiness + SportsActivityLocation + Course + AggregateRating.
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://veronikiteschool.com';

export function getLocalBusinessSchema(locale: string) {
    const isEn = locale === 'en';

    return {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'SportsActivityLocation'],
        name: 'VERONIKITES Kite School',
        alternateName: 'Veroni Kite Academy',
        description: isEn
            ? 'Premium kitesurf academy in Salinas del Rey, Colombia. IKO-certified instructors, guaranteed progression.'
            : 'Academia de kitesurf premium en Salinas del Rey, Colombia. Instructores certificados IKO, progresión garantizada.',
        url: `${BASE_URL}/${locale}`,
        telephone: '+57-300-000-0000',
        email: 'info@veronikite.com',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Salinas del Rey',
            addressRegion: 'Bolívar',
            addressCountry: 'CO',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 10.78,
            longitude: -75.08,
        },
        image: `${BASE_URL}/og-image.jpg`,
        priceRange: '$$',
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '06:00',
            closes: '18:00',
        },
        sameAs: [
            'https://www.instagram.com/veronikite',
            'https://www.facebook.com/veronikite',
        ],
        sport: 'Kitesurfing',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '47',
            bestRating: '5',
            worstRating: '1',
        },
    };
}

export function getCourseSchema(locale: string) {
    const isEn = locale === 'en';

    return [
        {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: isEn ? 'Discovery Kite Course' : 'Curso Descubrimiento Kite',
            description: isEn
                ? 'First steps in kitesurfing: wind theory, safety, kite handling on land and body drag. Equipment included.'
                : 'Primeros pasos en kitesurf: teoría de viento, seguridad, manejo del kite en tierra y body drag. Equipo incluido.',
            provider: {
                '@type': 'Organization',
                name: 'VERONIKITES Kite School',
                url: BASE_URL,
            },
            offers: {
                '@type': 'Offer',
                price: '350000',
                priceCurrency: 'COP',
                availability: 'https://schema.org/InStock',
            },
            hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'onsite',
                duration: 'PT3H',
                inLanguage: [locale],
                location: {
                    '@type': 'Place',
                    name: 'Salinas del Rey',
                    address: {
                        '@type': 'PostalAddress',
                        addressCountry: 'CO',
                        addressRegion: 'Bolívar',
                    },
                },
            },
            educationalLevel: isEn ? 'Beginner' : 'Principiante',
        },
        {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: isEn ? 'Kite Control Course' : 'Curso Control de Kite',
            description: isEn
                ? 'Master the power zone, upwind body drag, board introduction and kite relaunch. Equipment included.'
                : 'Dominio del power zone, body drag upwind, introducción a la tabla y relanzamiento del kite. Equipo incluido.',
            provider: {
                '@type': 'Organization',
                name: 'VERONIKITES Kite School',
                url: BASE_URL,
            },
            offers: {
                '@type': 'Offer',
                price: '650000',
                priceCurrency: 'COP',
                availability: 'https://schema.org/InStock',
            },
            hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'onsite',
                duration: 'PT6H',
                inLanguage: [locale],
                location: {
                    '@type': 'Place',
                    name: 'Salinas del Rey',
                    address: {
                        '@type': 'PostalAddress',
                        addressCountry: 'CO',
                        addressRegion: 'Bolívar',
                    },
                },
            },
            educationalLevel: isEn ? 'Beginner-Intermediate' : 'Principiante-Intermedio',
        },
        {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: isEn ? 'Waterstart Course' : 'Curso Waterstart',
            description: isEn
                ? 'Waterstart technique, first rides, speed control and upwind navigation. Video of your session included.'
                : 'Técnica de waterstart, primeras navegaciones, control de velocidad y navegación upwind. Video de tu sesión incluido.',
            provider: {
                '@type': 'Organization',
                name: 'VERONIKITES Kite School',
                url: BASE_URL,
            },
            offers: {
                '@type': 'Offer',
                price: '900000',
                priceCurrency: 'COP',
                availability: 'https://schema.org/InStock',
            },
            hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'onsite',
                duration: 'PT9H',
                inLanguage: [locale],
                location: {
                    '@type': 'Place',
                    name: 'Salinas del Rey',
                    address: {
                        '@type': 'PostalAddress',
                        addressCountry: 'CO',
                        addressRegion: 'Bolívar',
                    },
                },
            },
            educationalLevel: isEn ? 'Intermediate' : 'Intermedio',
        },
    ];
}
