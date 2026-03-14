import { createClient } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

function getNextMonth(month: string): string {
    const [y, m] = month.split('-').map(Number);
    const next = m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, '0')}`;
    return `${next}-01T00:00:00`;
}

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const instructorId = searchParams.get('instructor_id');
    const month = searchParams.get('month'); // YYYY-MM

    if (!month) {
        return NextResponse.json({ error: 'month parameter required (YYYY-MM)' }, { status: 400 });
    }

    let query = supabase
        .from('slots')
        .select('*, course:course_id(id, title_es, title_en, price_cop, level_required), instructor:instructor_id(id, full_name)')
        .eq('is_cancelled', false)
        .gte('start_time', `${month}-01T00:00:00`)
        .lt('start_time', getNextMonth(month));

    if (instructorId) {
        query = query.eq('instructor_id', instructorId);
    }

    const { data, error } = await query.order('start_time');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
