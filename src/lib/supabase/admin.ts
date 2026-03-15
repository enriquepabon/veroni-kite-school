import { createClient } from '@supabase/supabase-js';

// Admin client that bypasses RLS — only use in server-side code
// Returns null if SUPABASE_SERVICE_ROLE_KEY is not configured
export function createAdminClient() {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) return null;
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceRoleKey
    );
}
