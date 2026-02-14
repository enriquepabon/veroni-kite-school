import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with conflict resolution.
 * Uses clsx for conditional classes + tailwind-merge for deduplication.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formats a number as Colombian Pesos (COP).
 */
export function formatCOP(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Formats a date string for display.
 */
export function formatDate(date: string, locale: string = 'es-CO'): string {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
}

/**
 * Converts degrees to compass direction.
 */
export function degreesToDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}

/**
 * Determines kite conditions based on wind speed in knots.
 */
export function getKiteCondition(knots: number): 'optimal' | 'moderate' | 'not_recommended' {
    if (knots >= 15 && knots <= 35) return 'optimal';
    if (knots >= 10 && knots < 15 || knots > 35 && knots <= 40) return 'moderate';
    return 'not_recommended';
}

/**
 * Generates a Wompi integrity hash.
 * NOTE: This should only be used server-side.
 */
export async function generateWompiIntegrity(
    reference: string,
    amountInCents: number,
    currency: string = 'COP'
): Promise<string> {
    const secret = process.env.WOMPI_INTEGRITY_SECRET!;
    const payload = `${reference}${amountInCents}${currency}${secret}`;

    const encoder = new TextEncoder();
    const data = encoder.encode(payload);
    const hash = await crypto.subtle.digest('SHA-256', data);

    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
