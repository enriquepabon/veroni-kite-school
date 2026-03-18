import { getTranslations } from 'next-intl/server';
import Hero from '@/components/public/Hero';
import SocialProof from '@/components/public/SocialProof';
import ValueProposition from '@/components/public/ValueProposition';
import SafetyProtocols from '@/components/public/SafetyProtocols';
import CoursePreview from '@/components/public/CoursePreview';
import OurHistory from '@/components/public/OurHistory';
import PhotoGallery from '@/components/public/PhotoGallery';
import InstructorTeam from '@/components/public/InstructorTeam';
import TestimonialCarousel from '@/components/public/TestimonialCarousel';
import UpcomingEvents from '@/components/public/UpcomingEvents';
import CTABanner from '@/components/public/CTABanner';
import LeadCaptureForm from '@/components/public/LeadCaptureForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            locale: locale === 'es' ? 'es_CO' : 'en_US',
        },
    };
}

export default function HomePage() {
    return (
        <>
            <Hero />
            <SocialProof />
            <ValueProposition />
            <SafetyProtocols />
            <CoursePreview />
            <OurHistory />
            <PhotoGallery />
            <InstructorTeam />
            <TestimonialCarousel />
            <UpcomingEvents />
            <CTABanner />
            <LeadCaptureForm />
        </>
    );
}
