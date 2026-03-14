import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const error_description = searchParams.get('error_description');
    const next = searchParams.get('next') ?? '/es/dashboard';

    // Handle OAuth error returned by provider
    if (error_description) {
        console.error('OAuth error:', error_description);
        return NextResponse.redirect(
            `${origin}/es/login?error=auth&message=${encodeURIComponent(error_description)}`
        );
    }

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            const forwardedHost = request.headers.get('x-forwarded-host');
            const isLocalEnv = process.env.NODE_ENV === 'development';

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`);
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`);
            } else {
                return NextResponse.redirect(`${origin}${next}`);
            }
        }

        console.error('Auth code exchange error:', error.message);
    }

    // Auth error — redirect to login with error
    return NextResponse.redirect(`${origin}/es/login?error=auth`);
}
