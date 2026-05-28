"use client";

import { useUserCompat as useUser } from "@/lib/auth-shim";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-container-margin flex flex-col gap-container-margin flex-1 overflow-y-auto h-full">
      <section className="flex flex-col gap-unit">
        <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
          Welcome back, {user?.firstName || "Executive"}.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Your executive trajectory is aligned. Select a module to begin.
        </p>
      </section>

      {/* High-Density Bento Grid for Launchpad */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        
        {/* Module 1: Resume Analyzer */}
        <div className="col-span-1 border border-outline-variant bg-surface p-8 flex flex-col justify-between group hover:bg-surface-container-low transition-all duration-300">
          <div className="flex justify-between items-start mb-8">
            <span className="font-headline-md text-headline-md tracking-wider">Resume Analyzer</span>
            <span className="material-symbols-outlined text-[32px] text-secondary transition-colors">document_scanner</span>
          </div>
          <div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Upload your PDF or enter your GitHub profile to receive an AI-powered Executive Brief on your career positioning.
            </p>
            <Link href="/dashboard/resume" className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-widest text-on-primary bg-primary px-4 py-2 hover:opacity-90 transition-opacity">
              Launch Module <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Module 2: Skill Roadmap */}
        <div className="col-span-1 border border-outline-variant bg-surface p-8 flex flex-col justify-between group hover:bg-surface-container-low transition-all duration-300">
          <div className="flex justify-between items-start mb-8">
            <span className="font-headline-md text-headline-md tracking-wider">Skill Roadmap</span>
            <span className="material-symbols-outlined text-[32px] text-secondary transition-colors">map</span>
          </div>
          <div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Input your target executive role and generate a personalized, multi-phase trajectory timeline with learning modules.
            </p>
            <Link href="/dashboard/roadmap" className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-widest text-on-primary bg-primary px-4 py-2 hover:opacity-90 transition-opacity">
              Launch Module <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Module 3: Mock Interview */}
        <div className="col-span-1 border border-outline-variant bg-surface p-8 flex flex-col justify-between group hover:bg-surface-container-low transition-all duration-300">
          <div className="flex justify-between items-start mb-8">
            <span className="font-headline-md text-headline-md tracking-wider">Mock Interview</span>
            <span className="material-symbols-outlined text-[32px] text-secondary transition-colors">mic</span>
          </div>
          <div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Engage in a live, camera-enabled conversational interview. Receive real-time cognitive evaluation and feedback.
            </p>
            <Link href="/dashboard/interview" className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-widest text-on-primary bg-primary px-4 py-2 hover:opacity-90 transition-opacity">
              Launch Module <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Module 4: Job Match Engine */}
        <div className="col-span-1 border border-outline-variant bg-surface p-8 flex flex-col justify-between group hover:bg-surface-container-low transition-all duration-300">
          <div className="flex justify-between items-start mb-8">
            <span className="font-headline-md text-headline-md tracking-wider">Job Match Engine</span>
            <span className="material-symbols-outlined text-[32px] text-secondary transition-colors">work</span>
          </div>
          <div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Upload your resume and discover best-fit career paths, skill gaps, and AI recommendations.
            </p>
            <Link href="/dashboard/jobs" className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-widest text-on-primary bg-primary px-4 py-2 hover:opacity-90 transition-opacity">
              Launch Module <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
