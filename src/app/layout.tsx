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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
