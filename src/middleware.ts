import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';
import { type NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    // Refresh Supabase session on every request
    const { supabaseResponse } = await updateSession(request);

    // Run i18n middleware for locale routing
    const intlResponse = intlMiddleware(request);

    // Merge Supabase cookies into the i18n response
    if (intlResponse) {
        supabaseResponse.cookies.getAll().forEach((cookie) => {
            intlResponse.cookies.set(cookie.name, cookie.value);
        });
        return intlResponse;
    }

    return supabaseResponse;
}

export const config = {
    // Match all pathnames except for:
    // - API routes (/api/*)
    // - Auth callback (/auth/*)
    // - Next.js internals (_next/*)
    // - Static files (favicon, images, etc.)
    matcher: [
        '/((?!api|auth|_next|_vercel|.*\\..*).*)',
    ],
};
