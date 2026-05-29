"use client";

import { useState } from "react";
import NextLink from "next/link";
import { useUserCompat as useUser } from "@/lib/auth-shim";
import { Loader2, Upload, Link, Play } from "lucide-react";
import type { ResumeAnalysis } from "@/types";

export default function ResumePage() {
  const { isLoaded } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!file && !githubUrl) {
      setError("Please provide a PDF resume or a GitHub URL.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      if (file) formData.append("resume", file);
      if (githubUrl) formData.append("githubUrl", githubUrl);

      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to analyze");
      setAnalysis(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  if (!isLoaded) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  // Setup View
  if (!analysis) {
    return (
      <div className="flex flex-1 items-center justify-center bg-surface-container w-full h-full p-8">
        <div className="bg-surface border border-outline-variant max-w-2xl w-full p-12 flex flex-col gap-8 shadow-sm">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight border-b border-outline-variant pb-4">
              Initialize Analysis
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4">
              Upload your resume or provide your GitHub profile for the AI to analyze your professional positioning.
            </p>
          </div>

          {error && (
            <div className="bg-error-container/20 border border-error p-4 text-error font-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {error}
            </div>
          )}

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
                Upload PDF Resume
              </label>
              <div className={`border border-dashed p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer relative ${file ? "border-primary bg-primary/5" : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low"}`}>
                <input 
                  type="file" 
                  accept=".pdf" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const selected = e.target.files?.[0];
                    if (selected) {
                      setFile(selected);
                      setIsUploadingFile(true);
                      setUploadProgress(0);
                      let progress = 0;
                      const interval = setInterval(() => {
                        progress += Math.random() * 25 + 10;
                        if (progress >= 100) {
                          progress = 100;
                          clearInterval(interval);
                          setTimeout(() => {
                            setIsUploadingFile(false);
                          }, 500);
                        }
                        setUploadProgress(Math.min(progress, 100));
                      }, 200);
                    } else {
                      setFile(null);
                    }
                  }}
                />
                {file ? (
                  isUploadingFile ? (
                    <div className="w-full flex flex-col items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-4 border-outline-variant border-t-primary animate-spin mb-1"></div>
                      <span className="font-label-lg text-primary tracking-wide">UPLOADING... {Math.round(uploadProgress)}%</span>
                      <div className="w-2/3 bg-surface-container h-1.5 mt-1 overflow-hidden border border-outline-variant rounded-full">
                        <div className="bg-primary h-full transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                        <span className="material-symbols-outlined text-primary text-[24px]">check_circle</span>
                      </div>
                      <span className="font-label-lg text-primary tracking-wide">PDF SUCCESSFULLY UPLOADED</span>
                      <span className="font-mono-label text-on-surface-variant">{file.name}</span>
                    </>
                  )
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-primary" />
                    <span className="font-mono-label text-mono-label text-on-surface-variant">
                      DRAG & DROP OR CLICK TO UPLOAD (PDF MAX 10MB)
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-outline-variant"></div>
              <span className="font-mono-label text-[10px] text-outline uppercase tracking-wider">AND / OR</span>
              <div className="flex-1 h-[1px] bg-outline-variant"></div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
                GitHub Profile URL
              </label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                <input 
                  type="text"
                  placeholder="https://github.com/username"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant py-3 pl-10 pr-4 font-mono-label text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isLoading || (!file && !githubUrl)}
            className="mt-4 bg-primary text-on-primary py-4 px-6 font-label-lg uppercase tracking-widest hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                ANALYZING COGNITIVE PATTERNS...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                EXECUTE ANALYSIS
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Analysis View
  return (
    <div className="flex flex-1 overflow-hidden bg-surface-container w-full h-full relative print:overflow-visible print:bg-white print:block">
      {/* Center Canvas: Document Viewer */}
      <section className="flex-1 overflow-y-auto flex justify-center p-8 relative print:overflow-visible print:p-0 print:block">
        <div className="absolute top-8 right-8 flex z-10 bg-surface border border-outline-variant p-1 shadow-sm print:hidden">
          <button onClick={() => setAnalysis(null)} className="px-3 py-2 flex items-center gap-2 text-label-md font-label-md text-primary hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[16px]">sync</span> Reprocess
          </button>
          <div className="w-[1px] bg-outline-variant my-1"></div>
          <button onClick={handleDownload} className="px-3 py-2 flex items-center gap-2 text-label-md font-label-md text-primary hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span> Download PDF
          </button>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant w-full max-w-4xl p-12 min-h-full flex flex-col gap-6 relative shadow-none rounded-none print:border-none print:p-0 print:max-w-none print:block">
          {/* Document Header */}
          <div className="border-b-2 border-primary pb-6 mb-2">
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">AI Executive Brief</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 flex gap-4">
              <span>Overall Grade: {analysis.overallGrade}</span>
              <span>|</span>
              <span>Source: {file ? file.name : (githubUrl || "Unknown")}</span>
            </p>
          </div>

          {/* AI Roast / Feedback */}
          <div className="relative group bg-secondary-container/10 border border-secondary p-6">
            <h2 className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-3 border-b border-secondary/30 pb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">local_fire_department</span> Recruiter's Brutal Truth
            </h2>
            <p className="font-body-md text-body-md text-on-surface leading-relaxed text-justify">
              {analysis.roastFeedback || analysis.recruiterFeedback}
            </p>
          </div>

          {/* Strengths & Weaknesses Grid */}
          <div className="grid grid-cols-2 gap-8 mt-4">
            <div>
              <h2 className="font-label-md text-label-md text-primary uppercase tracking-widest mb-3 border-b border-outline-variant pb-1">Core Competencies</h2>
              <ul className="list-none space-y-3 font-body-md text-body-md text-on-surface pl-0">
                {analysis.strengths?.map((s, i) => (
                  <li key={i} className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-label-md text-label-md text-error uppercase tracking-widest mb-3 border-b border-error/30 pb-1">Operational Liabilities</h2>
              <ul className="list-none space-y-3 font-body-md text-body-md text-on-surface pl-0">
                {analysis.weaknesses?.map((w, i) => (
                  <li key={i} className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-error">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Section Breakdown */}
          {analysis.sections && (
            <div className="mt-6">
              <h2 className="font-label-md text-label-md text-primary uppercase tracking-widest mb-4 border-b border-outline-variant pb-1">Section Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(analysis.sections).map(([key, data]) => (
                  <div key={key} className="border border-outline-variant p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-label-md text-primary uppercase tracking-widest">{key}</span>
                      <span className="font-mono-label bg-surface-container px-2 py-0.5 border border-outline-variant">{data.score}/100</span>
                    </div>
                    <p className="font-body-sm text-on-surface-variant leading-relaxed">{data.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Right Sidebar: Analysis Panels */}
      <aside className="w-80 bg-surface border-l border-outline-variant flex flex-col h-full shrink-0 overflow-y-auto print:hidden">
        <div className="p-container-margin border-b border-outline-variant bg-surface-container-lowest sticky top-0 z-10">
          <h2 className="font-label-md text-label-md text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">document_scanner</span>
            Strategic Review
          </h2>
          <div className="font-mono-label text-mono-label text-on-surface-variant mt-1">LATEST PASS: {new Date().toISOString().split('T')[1].slice(0, 5)} UTC</div>
        </div>

        {/* Strength Index */}
        <div className="p-container-margin border-b border-outline-variant flex flex-col gap-2">
          <div className="font-mono-label text-mono-label text-on-surface-variant tracking-wider uppercase">Strength Index</div>
          <div className="flex items-end gap-3">
            <div className="font-headline-lg text-headline-lg text-primary leading-none">{analysis.atsScore}<span className="text-headline-sm text-on-surface-variant">/100</span></div>
            <div className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2 py-0.5 flex items-center gap-1 border border-secondary mb-1">
              <span className="material-symbols-outlined text-[12px]">trending_up</span> Top {100 - (analysis.atsScore || 0)}%
            </div>
          </div>
          <div className="w-full bg-surface-container h-1.5 mt-2 overflow-hidden border border-outline-variant">
            <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${analysis.atsScore}%` }}></div>
          </div>
        </div>

        {/* Strategic Vocabulary */}
        <div className="p-container-margin border-b border-outline-variant">
          <div className="font-mono-label text-mono-label text-on-surface-variant tracking-wider uppercase mb-4 flex justify-between items-center">
            Strategic Vocabulary
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="font-label-sm text-label-sm text-secondary mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span> VERIFIED ANCHORS
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.foundKeywords?.slice(0, 10).map((kw, i) => (
                  <span key={i} className="border border-outline-variant bg-surface-container text-on-surface font-label-md text-label-md px-2 py-1">{kw}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-error mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span> CRITICAL GAPS
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords?.slice(0, 8).map((kw, i) => (
                  <span key={i} className="border border-error-container bg-error-container/20 text-error font-label-md text-label-md px-2 py-1 line-through opacity-70">{kw}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Structural Directives */}
        <div className="p-container-margin">
          <div className="font-mono-label text-mono-label text-on-surface-variant tracking-wider uppercase mb-4">Structural Directives</div>
          <div className="flex flex-col gap-3">
            {analysis.suggestions?.map((s, i) => (
              <div key={i} className="border border-outline-variant p-3 bg-surface-container-lowest hover:border-primary transition-colors cursor-pointer group flex items-start gap-2">
                <div className="w-4 h-4 border border-outline-variant mt-0.5 group-hover:border-primary shrink-0"></div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-tight">{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps Action Plan */}
        <div className="p-container-margin border-t border-outline-variant mt-auto bg-surface-container-lowest">
          <div className="font-mono-label text-mono-label text-primary tracking-wider uppercase mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">explore</span> Action Plan
          </div>
          <div className="flex flex-col gap-3">
            <NextLink href="/dashboard/interview" className="border border-outline-variant p-3 bg-surface hover:bg-primary/5 hover:border-primary transition-all cursor-pointer flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-[20px]">mic</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-primary uppercase">Mock Interview</span>
                <span className="font-body-sm text-on-surface-variant">Practice with AI</span>
              </div>
            </NextLink>
            <NextLink href="/dashboard/jobs" className="border border-outline-variant p-3 bg-surface hover:bg-primary/5 hover:border-primary transition-all cursor-pointer flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-[20px]">work</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-primary uppercase">Job Match</span>
                <span className="font-body-sm text-on-surface-variant">Find relevant roles</span>
              </div>
            </NextLink>
            <NextLink href="/dashboard/roadmap" className="border border-outline-variant p-3 bg-surface hover:bg-primary/5 hover:border-primary transition-all cursor-pointer flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-[20px]">map</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-primary uppercase">Career Roadmap</span>
                <span className="font-body-sm text-on-surface-variant">Plan your growth</span>
              </div>
            </NextLink>
          </div>
        </div>
      </aside>
    </div>
  );
}
