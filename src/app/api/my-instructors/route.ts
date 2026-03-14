import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
        .from('instructor_assignments')
        .select('instructor:instructor_id(id, full_name, avatar_url)')
        .eq('student_id', user.id)
        .eq('is_active', true);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Flatten: extract instructor from each assignment
    const instructors = (data || [])
        .map((a: Record<string, unknown>) => a.instructor)
        .filter(Boolean);

    return NextResponse.json(instructors);
}
