import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { notifyBookingEvent } from '@/lib/notifications';
import { syncBooking } from '@/lib/google-sheets';

// POST /api/bookings — Create a new booking
export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { slot_id } = body;

        if (!slot_id) {
            return NextResponse.json({ error: 'slot_id is required' }, { status: 400 });
        }

        // Fetch slot with course and instructor details
        const { data: slot, error: slotError } = await supabase
            .from('slots')
            .select(`
                *,
                course:course_id(id, title_es, title_en, price_cop),
                instructor:instructor_id(id, full_name, phone)
            `)
            .eq('id', slot_id)
            .single();

        if (slotError || !slot) {
            return NextResponse.json({ error: 'Slot not found' }, { status: 404 });
        }

        if (slot.is_cancelled) {
            return NextResponse.json({ error: 'Slot has been cancelled' }, { status: 409 });
        }

        if (slot.booked_count >= slot.capacity) {
            return NextResponse.json({ error: 'Slot is full' }, { status: 409 });
        }

        // Create booking
        const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .insert({
                user_id: user.id,
                slot_id,
                status: 'confirmed',
                amount_paid: slot.course.price_cop,
            })
            .select()
            .single();

        if (bookingError) {
            return NextResponse.json({ error: bookingError.message }, { status: 500 });
        }

        // Increment booked_count on the slot
        await supabase
            .from('slots')
            .update({ booked_count: slot.booked_count + 1 })
            .eq('id', slot_id);

        // Sync to Google Sheets CRM (fire-and-forget, non-blocking)
        syncBooking({
            student_id: user.id,
            course_id: slot.course.id,
            slot_id,
            amount_cop: slot.course.price_cop,
            payment_status: 'confirmed',
            payment_reference: booking.id,
            status: 'confirmed',
        });

        // Fetch student profile for notification
        const { data: studentProfile } = await supabase
            .from('profiles')
            .select('full_name, phone')
            .eq('id', user.id)
            .single();

        // Fire n8n webhook (fire-and-forget)
        notifyBookingEvent({
            event: 'booking.created',
            booking_id: booking.id,
            student: {
                id: user.id,
                name: studentProfile?.full_name || user.email?.split('@')[0] || '',
                email: user.email || '',
                phone: studentProfile?.phone || null,
            },
            instructor: {
                id: slot.instructor.id,
                name: slot.instructor.full_name,
                phone: slot.instructor.phone || null,
            },
            course: {
                name: slot.course.title_es,
                price_cop: slot.course.price_cop,
            },
            slot: {
                date: new Date(slot.start_time).toISOString().split('T')[0],
                start_time: new Date(slot.start_time).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
                end_time: new Date(slot.end_time).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
                location: slot.location || 'Salinas del Rey',
            },
            created_at: new Date().toISOString(),
        }).catch(console.error);

        return NextResponse.json({
            data: booking,
            error: null,
            status: 201,
        });
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// GET /api/bookings — Get bookings for authenticated user
export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data: bookings, error } = await supabase
            .from('bookings')
            .select(`
                *,
                slot:slot_id(
                    start_time,
                    end_time,
                    location,
                    course:course_id(title_es, title_en, price_cop),
                    instructor:instructor_id(full_name)
                )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            data: bookings,
            error: null,
            status: 200,
        });
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
