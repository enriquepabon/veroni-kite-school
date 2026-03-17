import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { syncBookingRequest } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, course, date, message } = body;

        // Validate required fields
        if (!name || !email || !phone || !course) {
            return NextResponse.json(
                { error: 'Missing required fields: name, email, phone, course' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Use admin client to bypass RLS for public booking inserts
        const supabase = createAdminClient();
        if (!supabase) {
            console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const { error } = await supabase.from('booking_requests').insert({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            course: course.trim(),
            preferred_date: date || null,
            message: message?.trim() || null,
        });

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json(
                { error: 'Failed to save booking request' },
                { status: 500 }
            );
        }

        // Sync to Google Sheets CRM (fire-and-forget, non-blocking)
        syncBookingRequest({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            course: course.trim(),
            preferred_date: date || null,
            message: message?.trim() || null,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Booking API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
