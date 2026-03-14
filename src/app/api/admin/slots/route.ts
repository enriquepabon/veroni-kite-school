import { createClient } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

async function verifyAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
    if (profile?.role !== 'admin') return null;
    return user;
}

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const admin = await verifyAdmin(supabase);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const instructorId = searchParams.get('instructor_id');

    let query = supabase
        .from('slots')
        .select('*, course:course_id(id, title_es, title_en), instructor:instructor_id(id, full_name)')
        .order('start_time', { ascending: false })
        .limit(100);

    if (instructorId) {
        query = query.eq('instructor_id', instructorId);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const admin = await verifyAdmin(supabase);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { instructor_id, course_id, start_time, end_time, capacity, location } = body;

    if (!instructor_id || !course_id || !start_time || !end_time) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate future date
    if (new Date(start_time) < new Date()) {
        return NextResponse.json({ error: 'Cannot create slots in the past' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('slots')
        .insert({
            instructor_id,
            course_id,
            start_time,
            end_time,
            capacity: capacity || 2,
            location: location || 'Salinas del Rey',
        })
        .select('*, course:course_id(id, title_es, title_en), instructor:instructor_id(id, full_name)')
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data, { status: 201 });
}

export async function PATCH(request: NextRequest) {
    const supabase = await createClient();
    const admin = await verifyAdmin(supabase);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { id, is_cancelled } = body;

    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const { data, error } = await supabase
        .from('slots')
        .update({ is_cancelled: is_cancelled ?? true })
        .eq('id', id)
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
}
