-- CareerOS Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the necessary tables and RLS policies.

-- =========================================================================
-- 1. Helper Function for Clerk Authentication Integration
-- =========================================================================
-- Since CareerOS uses Clerk for authentication, user IDs are strings (e.g., 'user_2b...').
-- We extract the Clerk user ID (the 'sub' claim) from the JWT sent by Clerk.
CREATE OR REPLACE FUNCTION auth.jwt_sub()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    nullif(current_setting('request.jwt.claims', true)::jsonb ->> 'sub', '')
  )::text;
$$;

-- =========================================================================
-- 2. Create Tables
-- =========================================================================

-- Roadmaps Table
CREATE TABLE IF NOT EXISTS public.roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL, -- Clerk User ID
    target_role TEXT NOT NULL,
    current_level TEXT DEFAULT 'Entry Level',
    phases_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Resumes Table
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL, -- Clerk User ID
    file_name TEXT NOT NULL,
    ats_score INTEGER NOT NULL,
    feedback_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Interviews Table
CREATE TABLE IF NOT EXISTS public.interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL, -- Clerk User ID
    company TEXT DEFAULT 'Target Company',
    role TEXT NOT NULL,
    stage TEXT DEFAULT 'Practice Mock',
    overall_score INTEGER NOT NULL,
    confidence_score INTEGER NOT NULL,
    technical_score INTEGER NOT NULL,
    communication_score INTEGER NOT NULL,
    feedback_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Jobs Table
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    location TEXT NOT NULL,
    work_mode TEXT NOT NULL,
    salary_range TEXT NOT NULL,
    description TEXT,
    required_skills JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL, -- Clerk User ID
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'Applied',
    ai_cover_letter TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- 3. Enable Row Level Security (RLS)
-- =========================================================================
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- =========================================================================
-- 4. Set RLS Policies (Allows users to manage only their own data)
-- =========================================================================

-- Roadmaps Policies
CREATE POLICY "Users can create their own roadmaps" ON public.roadmaps
    FOR INSERT WITH CHECK (user_id = auth.jwt_sub());

CREATE POLICY "Users can view their own roadmaps" ON public.roadmaps
    FOR SELECT USING (user_id = auth.jwt_sub());

CREATE POLICY "Users can update their own roadmaps" ON public.roadmaps
    FOR UPDATE USING (user_id = auth.jwt_sub());

CREATE POLICY "Users can delete their own roadmaps" ON public.roadmaps
    FOR DELETE USING (user_id = auth.jwt_sub());

-- Resumes Policies
CREATE POLICY "Users can upload their own resumes" ON public.resumes
    FOR INSERT WITH CHECK (user_id = auth.jwt_sub());

CREATE POLICY "Users can view their own resumes" ON public.resumes
    FOR SELECT USING (user_id = auth.jwt_sub());

CREATE POLICY "Users can delete their own resumes" ON public.resumes
    FOR DELETE USING (user_id = auth.jwt_sub());

-- Interviews Policies
CREATE POLICY "Users can save their own interviews" ON public.interviews
    FOR INSERT WITH CHECK (user_id = auth.jwt_sub());

CREATE POLICY "Users can view their own interviews" ON public.interviews
    FOR SELECT USING (user_id = auth.jwt_sub());

CREATE POLICY "Users can delete their own interviews" ON public.interviews
    FOR DELETE USING (user_id = auth.jwt_sub());

-- Jobs Policies (Everyone can view, only admins/system can insert - for hackathon, we allow select)
CREATE POLICY "Anyone can view jobs" ON public.jobs
    FOR SELECT USING (true);

-- Applications Policies
CREATE POLICY "Users can create their own applications" ON public.applications
    FOR INSERT WITH CHECK (user_id = auth.jwt_sub());

CREATE POLICY "Users can view their own applications" ON public.applications
    FOR SELECT USING (user_id = auth.jwt_sub());

-- =========================================================================
-- 5. Indexes for Performance Optimization
-- =========================================================================
CREATE INDEX IF NOT EXISTS roadmaps_user_id_idx ON public.roadmaps(user_id);
CREATE INDEX IF NOT EXISTS resumes_user_id_idx ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS interviews_user_id_idx ON public.interviews(user_id);
CREATE INDEX IF NOT EXISTS applications_user_id_idx ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS applications_job_id_idx ON public.applications(job_id);
