import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { syncLead } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email } = body;

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Missing required fields: name, email' },
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

        const { error } = await supabase.from('leads').insert({
            name: name.trim(),
            email: email.trim().toLowerCase(),
        });

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json(
                { error: 'Failed to save lead' },
                { status: 500 }
            );
        }

        // Sync to Google Sheets CRM (fire-and-forget, non-blocking)
        syncLead({ name: name.trim(), email: email.trim().toLowerCase() });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Leads API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
