import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    // 1. Fetch real jobs from Remotive API (Software Development category)
    const remotiveRes = await fetch("https://remotive.com/api/remote-jobs?category=software-dev&limit=15", {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    let realJobs: any[] = [];
    if (remotiveRes.ok) {
      const data = await remotiveRes.json();
      if (data && data.jobs) {
        realJobs = data.jobs.map((job: any) => ({
          id: job.id.toString(),
          company: job.company_name,
          role: job.title,
          url: job.url,
          location: job.candidate_required_location || "Remote",
          work_mode: job.job_type === "full_time" ? "Full Time" : (job.job_type || "Remote"),
          salary_range: job.salary || "Competitive",
          // Strip HTML from description but keep more of it for the requirements view
          description: job.description?.replace(/<[^>]*>?/gm, '').trim(),
          required_skills: job.tags?.slice(0, 4) || ["Software Dev", "Engineering"]
        }));
      }
    }

    // 2. Fetch any saved/seeded jobs from Supabase
    let supabaseJobs: any[] = [];
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false }).limit(10);
      if (!error && data) {
        supabaseJobs = data;
      }
    }

    // 3. Combine them, prioritizing real jobs from the API
    const allJobs = [...realJobs, ...supabaseJobs];

    // If both failed, return empty array to avoid breaking the UI
    return NextResponse.json({ jobs: allJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ jobs: [] });
  }
}
