'use client';

import { Link } from '@/i18n/routing';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex relative overflow-hidden">
            {/* Left side — branding + ocean image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-deep-marine-900 items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-deep-marine-800 via-deep-marine-900 to-night-tide" />
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-ocean-teal-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-deep-marine-500 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 text-center px-12">
                    <Link href="/" className="inline-block mb-8">
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-4xl">🪁</span>
                            <span className="text-3xl font-heading font-bold text-white">Veroni Kite</span>
                        </div>
                    </Link>
                    <p className="text-salt-white/80 text-lg max-w-sm mx-auto leading-relaxed">
                        Tu aventura en el kitesurf comienza aquí. Salinas del Rey, Colombia.
                    </p>
                    <div className="mt-12 flex items-center justify-center gap-8 text-caribbean-aqua text-sm">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-ocean-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Instructores IKO
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-ocean-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            6 niveles
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side — form */}
            <div className="flex-1 flex items-center justify-center bg-salt-white px-4 py-12 sm:px-8">
                {/* Mobile logo */}
                <div className="w-full max-w-md">
                    <div className="lg:hidden text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <span className="text-3xl">🪁</span>
                            <span className="text-2xl font-heading font-bold text-deep-marine-800">Veroni Kite</span>
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
