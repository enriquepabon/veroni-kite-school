import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0891b2", // cyan-600 - kitesurf ocean vibe
};

export const metadata: Metadata = {
  metadataBase: new URL("https://veronikiteschool.com"),
  title: "Veroni Kite School | Escuela de Kitesurf en Salinas del Rey, Colombia",
  description:
    "Aprende kitesurf en Salinas del Rey, Colombia con instructores certificados IKO. Clases de kitesurf para principiantes y avanzados. La mejor escuela de kitesurf en la costa colombiana.",
  keywords: [
    "kitesurf Colombia",
    "Salinas del Rey",
    "escuela kitesurf",
    "clases kitesurf Colombia",
    "kitesurf Cartagena",
    "aprender kitesurf",
    "IKO certificado",
    "deportes acuáticos Colombia",
    "Veroni Kite School",
  ],
  authors: [{ name: "Veroni Kite School" }],
  creator: "Veroni Kite School",
  publisher: "Veroni Kite School",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://veronikiteschool.com",
    siteName: "Veroni Kite School",
    title: "Veroni Kite School | Escuela de Kitesurf en Salinas del Rey, Colombia",
    description:
      "Aprende kitesurf en Salinas del Rey, Colombia con instructores certificados IKO. La mejor escuela de kitesurf en la costa colombiana.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Veroni Kite School - Kitesurf en Salinas del Rey, Colombia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veroni Kite School | Escuela de Kitesurf en Salinas del Rey, Colombia",
    description:
      "Aprende kitesurf en Salinas del Rey, Colombia con instructores certificados IKO.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://veronikiteschool.com",
  },
};

// JSON-LD Structured Data for LocalBusiness
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Veroni Kite School",
  "description": "Escuela de kitesurf certificada IKO en Salinas del Rey, Colombia. Clases para principiantes y avanzados.",
  "url": "https://veronikiteschool.com",
  "telephone": "+57-300-123-4567",
  "email": "info@veronikiteschool.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Salinas del Rey",
    "addressRegion": "Bolívar",
    "addressCountry": "CO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "10.4333",
    "longitude": "-75.3000"
  },
  "priceRange": "$$",
  "openingHours": ["Mo-Su 08:00-18:00"],
  "paymentAccepted": "Efectivo, Transferencia",
  "currenciesAccepted": "COP",
  "areaServed": "Salinas del Rey, Colombia",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Clases de Kitesurf",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Clase por Hora",
          "description": "Clase individual de kitesurf por hora"
        },
        "price": "50000",
        "priceCurrency": "COP"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Curso Básico de Kitesurf",
          "description": "Curso básico de kitesurf con certificación IKO"
        },
        "price": "500000",
        "priceCurrency": "COP"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Curso Completo de Kitesurf",
          "description": "Curso completo de kitesurf con certificación IKO"
        },
        "price": "500000",
        "priceCurrency": "COP"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "100"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
