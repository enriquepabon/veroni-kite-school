import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { syncLead, syncBookingRequest, syncBooking } from '@/lib/google-sheets';

export async function POST() {
  try {
    const supabase = await createClient();

    // Verify admin role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const results = { leads: 0, bookingRequests: 0, bookings: 0 };

    // Sync all leads
    const { data: leads } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: true });

    if (leads) {
      for (const lead of leads) {
        await syncLead({ name: lead.name, email: lead.email });
        results.leads++;
      }
    }

    // Sync all booking requests
    const { data: requests } = await supabase
      .from('booking_requests')
      .select('*')
      .order('created_at', { ascending: true });

    if (requests) {
      for (const req of requests) {
        await syncBookingRequest({
          name: req.name,
          email: req.email,
          phone: req.phone,
          course: req.course,
          preferred_date: req.preferred_date,
          message: req.message,
        });
        results.bookingRequests++;
      }
    }

    // Sync all bookings
    const { data: bookings } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: true });

    if (bookings) {
      for (const b of bookings) {
        await syncBooking({
          student_id: b.user_id,
          course_id: b.course_id || '',
          slot_id: b.slot_id,
          amount_cop: b.amount_paid || 0,
          payment_status: b.payment_status || 'unknown',
          payment_reference: b.payment_reference || b.id,
          status: b.status,
        });
        results.bookings++;
      }
    }

    return NextResponse.json({
      success: true,
      synced: results,
    });
  } catch (error) {
    console.error('CRM sync error:', error);
    return NextResponse.json(
      { error: 'Sync failed' },
      { status: 500 }
    );
  }
}
