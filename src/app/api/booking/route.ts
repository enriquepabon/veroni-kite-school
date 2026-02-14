import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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

        const supabase = await createClient();

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

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Booking API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
