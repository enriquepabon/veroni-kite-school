interface BookingNotificationPayload {
    event: 'booking.created' | 'booking.cancelled' | 'booking.updated';
    booking_id: string;
    student: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
    };
    instructor: {
        id: string;
        name: string;
        phone: string | null;
    };
    course: {
        name: string;
        price_cop: number;
    };
    slot: {
        date: string;
        start_time: string;
        end_time: string;
        location: string;
    };
    created_at: string;
}

export async function notifyBookingEvent(payload: BookingNotificationPayload): Promise<void> {
    const webhookUrl = process.env.N8N_WEBHOOK_BOOKING_URL;
    if (!webhookUrl) {
        console.warn('N8N_WEBHOOK_BOOKING_URL not configured, skipping notification');
        return;
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error(`n8n webhook failed: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('n8n webhook error:', error);
    }
}
