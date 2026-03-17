import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = ['kikep008@gmail.com'];

/**
 * GET /api/progress?studentId=xxx — Fetch a student's progress
 */
export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const studentId = request.nextUrl.searchParams.get('studentId') || user.id;

    // Students can only see their own progress; admin/instructors can see anyone's
    if (studentId !== user.id) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
        const isAdmin = profile?.role === 'admin' || profile?.role === 'instructor' || ADMIN_EMAILS.includes(user.email || '');
        if (!isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
    }

    const adminDb = createAdminClient();
    const db = adminDb || supabase;

    const { data: progress, error } = await db
        .from('student_progress')
        .select('*, instructor:instructor_id(full_name)')
        .eq('user_id', studentId);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ progress: progress || [] });
}

/**
 * PATCH /api/progress — Update a student's skill progress (instructor/admin only)
 */
export async function PATCH(request: NextRequest) {
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

    const isAdmin = profile?.role === 'admin' || profile?.role === 'instructor' || ADMIN_EMAILS.includes(user.email || '');
    if (!isAdmin) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { studentId, skillId, level, status, notes } = body;

    if (!studentId || !skillId || !level) {
        return NextResponse.json({ error: 'Missing required fields: studentId, skillId, level' }, { status: 400 });
    }

    const adminDb = createAdminClient();
    if (!adminDb) {
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Check if record exists
    const { data: existing } = await adminDb
        .from('student_progress')
        .select('id')
        .eq('user_id', studentId)
        .eq('skill_id', skillId)
        .single();

    const record = {
        user_id: studentId,
        skill_id: skillId,
        level,
        status: status || 'completed',
        instructor_id: user.id,
        instructor_notes: notes || null,
        last_updated: new Date().toISOString(),
    };

    let data, error;
    if (existing) {
        // Update existing
        ({ data, error } = await adminDb
            .from('student_progress')
            .update(record)
            .eq('id', existing.id)
            .select()
            .single());
    } else {
        // Insert new
        ({ data, error } = await adminDb
            .from('student_progress')
            .insert(record)
            .select()
            .single());
    }

    if (error) {
        return NextResponse.json({ error: error.message, debug: { record } }, { status: 500 });
    }

    return NextResponse.json({ data });
}
