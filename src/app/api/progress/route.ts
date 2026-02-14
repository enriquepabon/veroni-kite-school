import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * PATCH /api/progress — Update a student's skill progress (instructor/admin only)
 */
export async function PATCH(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if user is instructor or admin
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (!profile || !['admin', 'instructor'].includes(profile.role)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const { studentId, skillId, completed, note } = body;

        if (!studentId || !skillId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Upsert the progress record
        const { data, error } = await supabase
            .from('student_progress')
            .upsert({
                student_id: studentId,
                skill_id: skillId,
                completed: completed ?? false,
                completed_at: completed ? new Date().toISOString() : null,
                instructor_id: user.id,
                note: note ?? null,
                updated_at: new Date().toISOString(),
            }, {
                onConflict: 'student_id,skill_id',
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
