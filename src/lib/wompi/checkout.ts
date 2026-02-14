import { generateWompiIntegrity } from '@/lib/utils';

interface WompiCheckoutConfig {
    publicKey: string;
    amountInCents: number;
    currency: 'COP';
    reference: string;
    redirectUrl: string;
    customerEmail?: string;
    customerFullName?: string;
}

/**
 * Generate the Wompi checkout redirect URL for Web Checkout flow.
 * @see https://docs.wompi.co/docs/colombia/widget-checkout-web/
 */
export function getWompiCheckoutUrl(config: WompiCheckoutConfig): string {
    const baseUrl = process.env.NEXT_PUBLIC_WOMPI_ENVIRONMENT === 'production'
        ? 'https://checkout.wompi.co/p/'
        : 'https://checkout.wompi.co/p/'; // Same URL — Wompi uses publicKey to determine environment

    const params = new URLSearchParams({
        'public-key': config.publicKey,
        'currency': config.currency,
        'amount-in-cents': config.amountInCents.toString(),
        'reference': config.reference,
        'redirect-url': config.redirectUrl,
    });

    if (config.customerEmail) {
        params.set('customer-data:email', config.customerEmail);
    }
    if (config.customerFullName) {
        params.set('customer-data:full-name', config.customerFullName);
    }

    return `${baseUrl}?${params.toString()}`;
}

/**
 * Initialize Wompi payment for a booking.
 * Returns the checkout URL to redirect the user.
 */
export async function initializeWompiPayment({
    bookingId,
    amountCop,
    customerEmail,
    customerFullName,
    locale = 'es',
}: {
    bookingId: string;
    amountCop: number;
    customerEmail?: string;
    customerFullName?: string;
    locale?: string;
}): Promise<{ checkoutUrl: string; reference: string; integrityHash: string }> {
    const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY ?? '';

    const reference = `VERONI-${bookingId}-${Date.now()}`;
    const amountInCents = amountCop * 100;
    const currency = 'COP';

    // Generate integrity signature (reads WOMPI_INTEGRITY_SECRET from env internally)
    const integrityHash = await generateWompiIntegrity(
        reference,
        amountInCents,
        currency
    );

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const redirectUrl = `${baseUrl}/${locale}/booking/confirmation`;

    const checkoutUrl = getWompiCheckoutUrl({
        publicKey,
        amountInCents,
        currency,
        reference,
        redirectUrl,
        customerEmail,
        customerFullName,
    });

    return { checkoutUrl, reference, integrityHash };
}
