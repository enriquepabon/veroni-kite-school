import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import WhatsAppWidget from '@/components/public/WhatsAppWidget';
import { getLocalBusinessSchema, getCourseSchema } from '@/lib/seo/structured-data';
import { getLocale } from 'next-intl/server';

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const businessSchema = getLocalBusinessSchema(locale);
    const courseSchema = getCourseSchema(locale);

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
            <WhatsAppWidget />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
            />
        </>
    );
}
