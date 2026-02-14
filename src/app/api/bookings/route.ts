import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// POST /api/bookings — Create a new booking
export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { data: null, error: 'Unauthorized', status: 401 },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { slot_id, course_id, amount_cop } = body;

        if (!slot_id || !course_id || !amount_cop) {
            return NextResponse.json(
                { data: null, error: 'Missing required fields', status: 400 },
                { status: 400 }
            );
        }

        // Check slot availability
        const { data: slot, error: slotError } = await supabase
            .from('time_slots')
            .select('*')
            .eq('id', slot_id)
            .single();

        if (slotError || !slot) {
            return NextResponse.json(
                { data: null, error: 'Slot not found', status: 404 },
                { status: 404 }
            );
        }

        if (slot.booked_count >= slot.max_students) {
            return NextResponse.json(
                { data: null, error: 'Slot is full', status: 409 },
                { status: 409 }
            );
        }

        // Create booking
        const bookingRef = `BOOK-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .insert({
                student_id: user.id,
                slot_id,
                course_id,
                status: 'pending',
                payment_status: 'pending',
                payment_reference: bookingRef,
                amount_cop,
            })
            .select()
            .single();

        if (bookingError) {
            return NextResponse.json(
                { data: null, error: bookingError.message, status: 500 },
                { status: 500 }
            );
        }

        // Increment booked_count on the slot
        await supabase
            .from('time_slots')
            .update({ booked_count: slot.booked_count + 1 })
            .eq('id', slot_id);

        return NextResponse.json({
            data: booking,
            error: null,
            status: 201,
        });
    } catch {
        return NextResponse.json(
            { data: null, error: 'Internal server error', status: 500 },
            { status: 500 }
        );
    }
}

// GET /api/bookings — Get bookings for authenticated user
export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { data: null, error: 'Unauthorized', status: 401 },
                { status: 401 }
            );
        }

        const { data: bookings, error } = await supabase
            .from('bookings')
            .select(`
                *,
                time_slots (
                    date,
                    start_time,
                    end_time,
                    courses (
                        name_es,
                        name_en
                    )
                )
            `)
            .eq('student_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json(
                { data: null, error: error.message, status: 500 },
                { status: 500 }
            );
        }

        return NextResponse.json({
            data: bookings,
            error: null,
            status: 200,
        });
    } catch {
        return NextResponse.json(
            { data: null, error: 'Internal server error', status: 500 },
            { status: 500 }
        );
    }
}
