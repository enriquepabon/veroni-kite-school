import type { Metadata } from 'next';
import { Inter, Montserrat, Caveat } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://veronikiteschool.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Veroni Kite — Academia de Kitesurf en Salinas del Rey',
    template: '%s | Veroni Kite',
  },
  description:
    'Aprende kitesurf con instructores certificados IKO en Salinas del Rey, Caribe Colombiano. Donde el viento te encuentra.',
  keywords: [
    'kitesurf Colombia',
    'academia kitesurf Salinas del Rey',
    'clases kitesurf Barranquilla',
    'kitesurf certificación IKO',
    'aprender kitesurf caribe',
    'kiteboarding Colombia',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'VERONIKITES Kite School',
    locale: 'es_CO',
    alternateLocale: 'en_US',
    title: 'VERONIKITES Kite School — Ride the Caribbean Soul',
    description: 'Aprende kitesurf con instructores certificados IKO en Salinas del Rey, Caribe Colombiano. Donde el viento te encuentra.',
    url: BASE_URL,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VERONIKITES Kite School — Ride the Caribbean Soul',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veroni Kite — Academia de Kitesurf en Salinas del Rey',
    description: 'Aprende kitesurf con instructores certificados IKO en el Caribe Colombiano.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} ${caveat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
