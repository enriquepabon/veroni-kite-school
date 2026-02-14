import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/wompi/webhook — Receive Wompi transaction events.
 * Validates integrity signature and updates booking payment status.
 * @see https://docs.wompi.co/docs/colombia/eventos/
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { event, data, signature } = body;

        if (!event || !data?.transaction) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        const transaction = data.transaction;
        const eventsSecret = process.env.WOMPI_EVENTS_SECRET;

        // Validate signature if events secret is configured
        if (eventsSecret && signature) {
            const properties = signature.properties as string[];
            const checksum = signature.checksum as string;

            // Build the validation string from the transaction data
            const values = properties.map((prop: string) => {
                const keys = prop.split('.');
                let value: Record<string, unknown> = data;
                for (const key of keys) {
                    value = value?.[key] as Record<string, unknown>;
                }
                return value;
            });

            const concatenated = values.join('') + transaction.id + eventsSecret;

            // Compute SHA256
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(concatenated);
            const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

            if (hashHex !== checksum) {
                return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
            }
        }

        const supabase = await createClient();
        const reference = transaction.reference as string;
        const status = transaction.status as string;

        // Map Wompi status to our payment status
        const paymentStatusMap: Record<string, string> = {
            APPROVED: 'approved',
            DECLINED: 'declined',
            VOIDED: 'voided',
            ERROR: 'error',
        };

        const paymentStatus = paymentStatusMap[status] ?? 'pending';

        // Update the booking's payment status
        const { error: updateError } = await supabase
            .from('bookings')
            .update({
                payment_status: paymentStatus,
                status: paymentStatus === 'approved' ? 'confirmed' : 'pending',
                updated_at: new Date().toISOString(),
            })
            .eq('payment_reference', reference);

        if (updateError) {
            console.error('Failed to update booking:', updateError);
            return NextResponse.json({ error: 'Update failed' }, { status: 500 });
        }

        // If DECLINED or VOIDED, release the slot
        if (paymentStatus === 'declined' || paymentStatus === 'voided') {
            const { data: booking } = await supabase
                .from('bookings')
                .select('slot_id')
                .eq('payment_reference', reference)
                .single();

            if (booking?.slot_id) {
                const { data: slot } = await supabase
                    .from('time_slots')
                    .select('booked_count')
                    .eq('id', booking.slot_id)
                    .single();

                if (slot && slot.booked_count > 0) {
                    await supabase
                        .from('time_slots')
                        .update({ booked_count: slot.booked_count - 1 })
                        .eq('id', booking.slot_id);
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Wompi webhook error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
