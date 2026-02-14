-- Migration: Create booking_requests and leads tables for public forms
-- Date: 2026-02-13

-- ============================================
-- Table: booking_requests
-- Public booking form submissions (no auth required)
-- ============================================
CREATE TABLE IF NOT EXISTS booking_requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    course text NOT NULL,
    preferred_date date,
    message text,
    status text NOT NULL DEFAULT 'pending',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================
-- Table: leads
-- Email capture form submissions (no auth required)
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================
-- RLS Policies: Allow public inserts only
-- ============================================
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert booking requests (public form)
CREATE POLICY "Allow public insert on booking_requests"
    ON booking_requests
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow anyone to insert leads (public form)
CREATE POLICY "Allow public insert on leads"
    ON leads
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Only authenticated service role can read/update/delete
CREATE POLICY "Service role full access on booking_requests"
    ON booking_requests
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role full access on leads"
    ON leads
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX idx_booking_requests_created_at ON booking_requests (created_at DESC);
CREATE INDEX idx_booking_requests_status ON booking_requests (status);
CREATE INDEX idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX idx_leads_email ON leads (email);
