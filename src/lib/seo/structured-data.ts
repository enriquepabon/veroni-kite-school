/**
 * JSON-LD Structured Data for Veronikites Academy.
 * Implements LocalBusiness + SportsActivityLocation + Course + AggregateRating + FAQPage.
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://veronikites.com';

export function getLocalBusinessSchema(locale: string) {
    const isEn = locale === 'en';

    return {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'SportsActivityLocation'],
        name: 'VERONIKITES Kite School',
        alternateName: 'Veronikites Academy',
        description: isEn
            ? 'Premium kitesurf academy in Salinas del Rey, Colombia. IKO-certified instructors, guaranteed progression.'
            : 'Academia de kitesurf premium en Salinas del Rey, Colombia. Instructores certificados IKO, progresión garantizada.',
        url: `${BASE_URL}/${locale}`,
        telephone: '+57-301-746-4927',
        email: 'info@veronikites.com',
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
            'https://www.instagram.com/veronikiteschool',
            'https://www.facebook.com/veronikites',
            'https://www.youtube.com/@veronikites',
            'https://www.tiktok.com/@veronikites',
            'https://twitter.com/veronikites',
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

export function getFAQSchema(locale: string) {
    const isEn = locale === 'en';

    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: isEn ? 'Do I need to know how to swim?' : '¿Necesito saber nadar para hacer kitesurf?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: isEn
                        ? 'Yes, you need to be a confident swimmer. You don\'t need to be an Olympic swimmer, but you should feel comfortable in the water.'
                        : 'Sí, es necesario saber nadar con confianza. No necesitas ser un nadador olímpico, pero debes sentirte cómodo en el agua.',
                },
            },
            {
                '@type': 'Question',
                name: isEn ? 'How long does it take to learn kitesurfing?' : '¿Cuánto tiempo toma aprender kitesurf?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: isEn
                        ? 'With 6-12 hours of lessons (3-4 days), most students achieve their first waterstart. For independent riding, we recommend at least 20 hours of practice.'
                        : 'Con 6-12 horas de clases (3-4 días), la mayoría de estudiantes logran su primer waterstart. Para navegar de forma independiente, recomendamos al menos 20 horas de práctica.',
                },
            },
            {
                '@type': 'Question',
                name: isEn ? 'Is kitesurfing dangerous?' : '¿Es peligroso el kitesurf?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: isEn
                        ? 'Like any extreme sport, it has risks. But with professional instruction and respect for weather conditions, it\'s a safe sport. Our IKO-certified instructors prioritize your safety.'
                        : 'Como todo deporte extremo, tiene riesgos. Pero con instrucción profesional y respeto por las condiciones meteorológicas, es un deporte seguro. Nuestros instructores certificados IKO priorizan tu seguridad.',
                },
            },
            {
                '@type': 'Question',
                name: isEn ? 'What equipment do I need?' : '¿Qué equipo necesito?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: isEn
                        ? 'For lessons, we provide everything: kite, board, harness, helmet and life vest. You just need sunscreen, sunglasses with a strap, and comfortable clothing.'
                        : 'Para las clases, nosotros proporcionamos todo: kite, tabla, arnés, casco y chaleco. Solo necesitas traer protector solar, gafas de sol con cinta, y ropa cómoda.',
                },
            },
            {
                '@type': 'Question',
                name: isEn ? 'What is the best season for kitesurfing in Salinas del Rey?' : '¿Cuál es la mejor temporada para hacer kitesurf en Salinas del Rey?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: isEn
                        ? 'The main season runs from December to April, with consistent 15-25 knot winds. However, there are also good conditions from June to August.'
                        : 'La temporada principal va de diciembre a abril, con vientos constantes de 15-25 nudos. Sin embargo, también hay buenas condiciones de junio a agosto.',
                },
            },
        ],
    };
}
