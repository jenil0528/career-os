"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  ArrowLeft,
  Briefcase,
  Sparkles,
  Upload,
  Target,
  TrendingUp,
  Award,
  Lightbulb,
  Star,
  MapPin,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Flame,
  GraduationCap,
  Code2,
  Shield,
  Zap,
  ArrowUpRight,
  Filter,
  FileText,
  CheckCircle2,
  XCircle,
  BookOpen,
  Trophy,
  Rocket,
  Search,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { JobMatchResult, MatchedJob } from "@/types";

// ===== ROLE ICON MAP =====
const roleIcons: Record<string, any> = {
  "Frontend Developer": Code2,
  "Full Stack Developer": Zap,
  "Backend Developer": Shield,
  "AI Engineer": Sparkles,
  "Data Scientist": TrendingUp,
  "DevOps Engineer": Rocket,
  "Cybersecurity Analyst": Shield,
};

const roleColors: Record<string, { gradient: string; border: string; text: string; bg: string }> = {
  "Frontend Developer": { gradient: "from-blue-500 to-cyan-400", border: "border-blue-500/30", text: "text-blue-400", bg: "bg-blue-500/15" },
  "Full Stack Developer": { gradient: "from-purple-500 to-pink-400", border: "border-purple-500/30", text: "text-purple-400", bg: "bg-purple-500/15" },
  "Backend Developer": { gradient: "from-green-500 to-emerald-400", border: "border-green-500/30", text: "text-green-400", bg: "bg-green-500/15" },
  "AI Engineer": { gradient: "from-amber-500 to-orange-400", border: "border-amber-500/30", text: "text-amber-400", bg: "bg-amber-500/15" },
  "Data Scientist": { gradient: "from-teal-500 to-cyan-400", border: "border-teal-500/30", text: "text-teal-400", bg: "bg-teal-500/15" },
  "DevOps Engineer": { gradient: "from-red-500 to-rose-400", border: "border-red-500/30", text: "text-red-400", bg: "bg-red-500/15" },
  "Cybersecurity Analyst": { gradient: "from-indigo-500 to-violet-400", border: "border-indigo-500/30", text: "text-indigo-400", bg: "bg-indigo-500/15" },
};

const defaultColor = { gradient: "from-blue-500 to-purple-500", border: "border-blue-500/30", text: "text-blue-400", bg: "bg-blue-500/15" };

function getMatchColor(pct: number) {
  if (pct >= 80) return "text-green-400";
  if (pct >= 60) return "text-yellow-400";
  if (pct >= 40) return "text-orange-400";
  return "text-red-400";
}

function getMatchRingColor(pct: number) {
  if (pct >= 80) return "stroke-green-400";
  if (pct >= 60) return "stroke-yellow-400";
  if (pct >= 40) return "stroke-orange-400";
  return "stroke-red-400";
}

// ===== CIRCULAR SCORE =====
function CircularScore({ score, size = 80 }: { score: number; size?: number }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <svg width={size} height={size} className="circular-progress -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        className={getMatchRingColor(score)}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
      />
    </svg>
  );
}

// ===== JOB CARD =====
function JobCard({ job, index }: { job: MatchedJob | any; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const colors = roleColors[job.role] || defaultColor;
  const Icon = roleIcons[job.role] || Briefcase;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={cn(
        "bg-surface-container border border-outline-variant rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 hover:border-primary/50 hover:shadow-sm",
        colors.border
      )}
    >
      {/* Holographic shimmer */}
      <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg", colors.gradient)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-on-surface text-lg">{job.role}</h3>
            <p className="text-sm text-on-surface-variant flex items-center gap-1.5">
              {job.company}
              <span className="mx-1 opacity-40">•</span>
              <MapPin className="h-3 w-3" />
              <span className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full border",
                job.workMode === "Remote" ? "text-green-400 border-green-500/30 bg-green-500/10" :
                job.workMode === "Hybrid" ? "text-blue-400 border-blue-500/30 bg-blue-500/10" :
                "text-orange-400 border-orange-500/30 bg-orange-500/10"
              )}>
                {job.workMode}
              </span>
            </p>
          </div>
        </div>
        {/* Match Score Circle */}
        <div className="relative shrink-0 flex flex-col items-end gap-2">
          {job.matchPercentage ? (
            <>
              <CircularScore score={job.matchPercentage} />
              <div className="absolute inset-0 top-0 h-[80px] flex items-center justify-center rotate-90">
                <span className={cn("text-lg font-bold", getMatchColor(job.matchPercentage))}>{job.matchPercentage}%</span>
              </div>
              {job.url && (
                <a 
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 px-3 py-1 text-xs font-bold rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors inline-flex items-center gap-1"
                >
                  Apply <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </>
          ) : (
            job.url && (
              <a 
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-bold rounded-xl bg-primary text-on-primary hover:bg-primary/90 transition-colors mt-2 inline-flex items-center gap-2"
              >
                Apply Now <ExternalLink className="h-4 w-4" />
              </a>
            )
          )}
        </div>
      </div>

      {/* Why Match */}
      {job.whyMatch ? (
        <p className="text-sm text-on-surface-variant mb-4 leading-relaxed relative z-10">{job.whyMatch}</p>
      ) : (
        <div className="relative z-10 mb-4">
          <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3 mb-2">{job.description}</p>
          <button onClick={() => setExpanded(!expanded)} className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
            {expanded ? "Show Less" : "Read Full Description"}
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-3 pt-3 border-t border-outline-variant">
                <p className="text-sm text-on-surface whitespace-pre-wrap">{job.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Skill Tags */}
      {job.strongSkills && (
        <div className="relative z-10 space-y-3 mb-4">
        <div>
          <p className="text-xs font-semibold text-outline uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-green-400" /> Strong Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {job.strongSkills.map((s: string) => (
              <span key={s} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-outline uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <XCircle className="h-3 w-3 text-red-400" /> Missing Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {job.missingSkills.map((s: string) => (
              <span key={s} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">{s}</span>
            ))}
          </div>
        </div>
        </div>
      )}
      {!job.strongSkills && job.required_skills && (
        <div className="relative z-10 space-y-3 mb-4">
          <p className="text-xs font-semibold text-outline uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-primary" /> Required Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {job.required_skills.map((s: string) => (
              <span key={s} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-surface-variant text-on-surface-variant border border-outline-variant">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="relative z-10 grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-xl bg-surface-variant border border-outline-variant p-3 text-center">
          <DollarSign className="h-4 w-4 text-green-400 mx-auto mb-1" />
          <p className="text-xs text-on-surface-variant">Salary</p>
          <p className="text-sm font-bold text-on-surface">{job.salaryRange || job.salary_range}</p>
        </div>
        <div className="rounded-xl bg-surface-variant border border-outline-variant p-3 text-center">
          <TrendingUp className="h-4 w-4 text-purple-400 mx-auto mb-1" />
          <p className="text-xs text-on-surface-variant">Growth</p>
          <div className="flex justify-center gap-0.5 mt-1">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} className={cn("h-3.5 w-3.5", i < (job.careerGrowth || 4) ? "text-amber-400 fill-amber-400" : "text-slate-700")} />
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-surface-variant border border-outline-variant p-3 text-center">
          <Target className="h-4 w-4 text-blue-400 mx-auto mb-1" />
          <p className="text-xs text-on-surface-variant">Interview</p>
          <p className={cn("text-sm font-bold", getMatchColor(job.interviewReadiness || 80))}>{job.interviewReadiness || 80}%</p>
        </div>
      </div>

      {/* Expand */}
      {job.recommendedLearning && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="relative z-10 w-full flex items-center justify-center gap-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors py-2 cursor-pointer"
          >
            {expanded ? "Hide" : "View"} Recommended Learning
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden relative z-10"
              >
                <div className="pt-3 border-t border-outline-variant space-y-2">
                  {job.recommendedLearning.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-on-surface">
                      <Lightbulb className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

// ===== MAIN PAGE =====
export default function JobMatchPage() {
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [availableJobs, setAvailableJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState("matches");
  const [filterWorkMode, setFilterWorkMode] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"match" | "salary" | "readiness">("match");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/jobs")
      .then(res => res.json())
      .then(data => setAvailableJobs(data.jobs || []))
      .catch(console.error);
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      let customHeaders: Record<string, string> = {};
      try {
        const settings = JSON.parse(localStorage.getItem("careeros_settings") || "{}");
        if (settings.apiKey) customHeaders["x-user-api-key"] = settings.apiKey;
      } catch (e) { /* ignore */ }

      const res = await fetch("/api/job-match", { method: "POST", body: formData, headers: customHeaders });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to analyze");
      }
      const data: JobMatchResult = await res.json();
      setResult(data);
      setActiveTab("matches");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".pdf"))) {
      handleUpload(file);
    } else {
      setError("Please upload a PDF file");
    }
  }, [handleUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  // Filter and sort jobs
  const filteredJobs = result?.matchedJobs
    .filter(j => filterWorkMode === "all" || j.workMode === filterWorkMode)
    .filter(j => 
      searchQuery === "" || 
      j.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
      j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ((j.requiredSkills && j.requiredSkills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))) ||
       (j.required_skills && j.required_skills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))))
    )
    .sort((a, b) => {
      if (sortBy === "match") return b.matchPercentage - a.matchPercentage;
      if (sortBy === "readiness") return b.interviewReadiness - a.interviewReadiness;
      return 0;
    }) || [];

  const filteredAvailableJobs = availableJobs
    .filter(j => filterWorkMode === "all" || j.workMode === filterWorkMode || j.work_mode === filterWorkMode)
    .filter(j => 
      searchQuery === "" || 
      (j.role && j.role.toLowerCase().includes(searchQuery.toLowerCase())) || 
      (j.company && j.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ((j.required_skills && j.required_skills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))) ||
       (j.requiredSkills && j.requiredSkills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))))
    );

  // Radar chart data
  const radarData = result?.skillGaps.map(sg => ({
    skill: sg.skill,
    current: sg.currentLevel,
    target: sg.targetLevel,
  })) || [];

  const tabs = [
    { id: "matches", label: "Job Matches", icon: Briefcase },
    { id: "radar", label: "Skill Radar", icon: Target },
    { id: "gaps", label: "Skill Gaps", icon: TrendingUp },
    { id: "recommendations", label: "AI Recommendations", icon: Sparkles },
    { id: "trending", label: "Trending Jobs", icon: Flame },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-on-surface font-[family-name:var(--font-space-grotesk)]">
              AI Job Match Engine
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-on-surface-variant max-w-2xl">
            Upload your resume and discover your best-fit career paths. Get match scores, skill gap analysis, and personalized AI recommendations.
          </motion.p>
        </div>

        {/* Upload or Results */}
        <AnimatePresence mode="wait">
          {!result && !isLoading && (
            <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                
                {/* Left: AI Upload Option */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={cn(
                    "bg-surface-container border border-outline-variant rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer group flex flex-col h-full",
                    isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "hover:border-primary/50"
                  )}
                  onClick={() => document.getElementById("job-resume-input")?.click()}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 mx-auto mb-6 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2 font-[family-name:var(--font-space-grotesk)]">
                    Upload Your Resume
                  </h3>
                  <p className="text-on-surface-variant text-sm mb-6 flex-1">
                    Let our AI analyze your skills and match you with the best career opportunities automatically.
                  </p>
                  <div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/40 hover:bg-primary hover:text-on-primary hover:border-primary rounded-xl px-6 py-3 text-sm font-semibold transition-colors duration-300 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)] hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <FileText className="h-4 w-4 relative z-10" />
                      <span className="relative z-10">Choose PDF File</span>
                    </motion.div>
                  </div>
                  <input
                    id="job-resume-input"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center mt-4">
                      {error}
                    </motion.p>
                  )}
                </div>

                {/* Right: Simple Search Option */}
                <div className="bg-surface-container border border-outline-variant rounded-2xl p-10 text-center transition-all duration-300 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 mx-auto mb-6 flex items-center justify-center border border-green-500/20">
                    <Search className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2 font-[family-name:var(--font-space-grotesk)]">
                    Or Simply Search
                  </h3>
                  <p className="text-on-surface-variant text-sm mb-6 flex-1">
                    Don't want to use AI matching? Browse open roles directly by title, company, or required skills.
                  </p>
                  
                  <div className="relative flex items-center w-full h-12 rounded-xl focus-within:shadow-md bg-surface border border-outline-variant overflow-hidden transition-shadow mb-4">
                    <div className="grid place-items-center h-full w-12 text-on-surface-variant">
                      <Search className="h-5 w-5" />
                    </div>
                    <input
                      className="peer h-full w-full outline-none text-sm text-on-surface bg-transparent pr-4"
                      type="text"
                      placeholder="Try 'Frontend', 'React', or 'Remote'..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Frontend", "Backend", "AI", "Remote"].map(tag => (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-surface-variant text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-all duration-300 shadow-sm hover:shadow-md border border-transparent hover:border-outline-variant"
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Job Board section */}
              {availableJobs.length > 0 && (
                <div className="border-t border-outline-variant pt-12">
                  <div className="flex items-center gap-3 mb-8">
                    <Briefcase className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-on-surface font-[family-name:var(--font-space-grotesk)]">Latest Tech Jobs</h2>
                  </div>
                  
                  {/* Filters and Search */}
                  <div className="flex flex-col gap-4 mb-6 sticky top-[80px] z-30 p-4 bg-background/80 backdrop-blur-md rounded-2xl border border-outline-variant shadow-sm">
                    {/* Search Bar */}
                    <div className="relative flex items-center w-full h-12 rounded-xl focus-within:shadow-md bg-surface border border-outline-variant overflow-hidden transition-shadow">
                      <div className="grid place-items-center h-full w-12 text-on-surface-variant">
                        <Search className="h-5 w-5" />
                      </div>
                      <input
                        className="peer h-full w-full outline-none text-sm text-on-surface bg-transparent pr-4"
                        type="text"
                        placeholder="Search jobs by title, company, or skill..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    {/* Work Mode */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                        <Filter className="h-4 w-4" /> Filter:
                      </div>
                      {["all", "Remote", "Hybrid", "Onsite"].map((mode) => (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          key={mode}
                          onClick={() => setFilterWorkMode(mode)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer border",
                            filterWorkMode === mode
                              ? "bg-primary text-on-primary border-primary shadow-md"
                              : "bg-surface-variant text-on-surface-variant border-transparent hover:bg-surface-container-highest hover:text-on-surface hover:border-outline-variant shadow-sm hover:shadow-md"
                          )}
                        >
                          {mode === "all" ? "All Modes" : mode}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {filteredAvailableJobs.length === 0 ? (
                    <div className="text-center py-12 text-on-surface-variant">
                      <Search className="h-10 w-10 mx-auto mb-3 opacity-20" />
                      <p>No jobs found matching your search.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {filteredAvailableJobs.map((job, i) => (
                        <JobCard key={job.id} job={job} index={i} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {isLoading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }} className="max-w-2xl mx-auto text-center py-16 relative">
              
              {/* Document Scanning Animation */}
              <div className="relative w-24 h-32 mx-auto mb-12 perspective-1000">
                {/* Document Base */}
                <motion.div 
                  className="absolute inset-0 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] shadow-blue-500/20"
                  initial={{ rotateY: 90, scale: 0.8 }}
                  animate={{ rotateY: 0, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring", damping: 15 }}
                >
                  {/* Mock text lines inside document */}
                  <div className="p-4 space-y-3 opacity-30">
                    <div className="h-2 bg-on-surface-variant rounded-full w-3/4"></div>
                    <div className="h-2 bg-on-surface-variant rounded-full w-full"></div>
                    <div className="h-2 bg-on-surface-variant rounded-full w-5/6"></div>
                    <div className="h-2 bg-on-surface-variant rounded-full w-full mt-6"></div>
                    <div className="h-2 bg-on-surface-variant rounded-full w-2/3"></div>
                  </div>

                  {/* Scanning Laser */}
                  <motion.div
                    className="absolute left-0 right-0 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] z-10"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Laser trailing glow */}
                  <motion.div
                    className="absolute left-0 right-0 h-16 bg-gradient-to-b from-blue-500/30 to-transparent z-0 pointer-events-none"
                    animate={{ top: ["-16%", "100%", "-16%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
                
                {/* Floating particles (AI processing bits) */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full blur-[1px]"
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 120],
                      y: [0, -60 - Math.random() * 60],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    style={{ left: "50%", top: "50%" }}
                  />
                ))}
              </div>

              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 font-[family-name:var(--font-space-grotesk)] drop-shadow-sm">
                Initializing Career Matrix...
              </h3>
              <p className="text-on-surface-variant text-xs mb-12 uppercase tracking-widest font-mono-label opacity-80">
                Extracting topology <span className="text-primary mx-2">•</span> Synthesizing matrices
              </p>
              
              {/* Sequential Steps Timeline */}
              <div className="space-y-0 max-w-[320px] mx-auto text-left relative">
                {["Deconstructing PDF vectors", "Extracting skill typologies", "Correlating with live market data", "Calculating trajectory gaps", "Generating strategic recommendations"].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0.4, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.6 }}
                    className="flex items-start gap-4 relative pb-6 last:pb-0"
                  >
                    {/* Connecting line (except last) */}
                    {i !== 4 && (
                      <div className="absolute left-[15px] top-[30px] bottom-0 w-[2px] bg-outline-variant overflow-hidden z-0">
                        <motion.div
                          className="w-full bg-blue-500"
                          initial={{ height: "0%" }}
                          animate={{ height: "100%" }}
                          transition={{ delay: i * 0.6 + 0.4, duration: 0.6, ease: "linear" }}
                        />
                      </div>
                    )}
                    
                    {/* Icon Container */}
                    <motion.div
                      initial={{ backgroundColor: "var(--surface-container)", borderColor: "var(--outline-variant)", boxShadow: "0 0 0 rgba(59,130,246,0)" }}
                      animate={{ backgroundColor: "rgba(59, 130, 246, 0.1)", borderColor: "rgba(59, 130, 246, 0.4)", boxShadow: "0 0 15px rgba(59,130,246,0.2)" }}
                      transition={{ delay: i * 0.6 + 0.3 }}
                      className="w-8 h-8 rounded-full border border-outline-variant bg-surface-container flex items-center justify-center shrink-0 relative z-10 transition-colors duration-500"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.6 + 0.4, type: "spring" }}
                      >
                        <CheckCircle2 className="h-4 w-4 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      </motion.div>
                    </motion.div>
                    
                    {/* Text Label */}
                    <div className="pt-1.5">
                      <motion.span
                        initial={{ color: "var(--on-surface-variant)" }}
                        animate={{ color: "var(--on-surface)" }}
                        transition={{ delay: i * 0.6 + 0.3 }}
                        className="text-sm font-semibold"
                      >
                        {step}
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {result && !isLoading && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Personalized Message Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface-container border border-outline-variant rounded-2xl p-6 mb-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary/5" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface text-lg mb-1 font-[family-name:var(--font-space-grotesk)]">AI Career Insight</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{result.recommendations.personalizedMessage}</p>
                  </div>
                </div>
              </motion.div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {tabs.map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md",
                        activeTab === tab.id
                          ? "bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]"
                          : "bg-surface-variant text-on-surface-variant border border-transparent hover:border-outline-variant hover:bg-surface-container hover:text-on-surface"
                      )}
                    >
                      <TabIcon className="h-4 w-4" />
                      {tab.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {/* ===== JOB MATCHES TAB ===== */}
                {activeTab === "matches" && (
                  <motion.div key="matches" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    {/* Filters and Search */}
                    <div className="flex flex-col gap-4 mb-6">
                      {/* Search Bar */}
                      <div className="relative flex items-center w-full h-12 rounded-2xl focus-within:shadow-lg bg-surface-container border border-outline-variant overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-on-surface-variant">
                          <Search className="h-5 w-5" />
                        </div>
                        <input
                          className="peer h-full w-full outline-none text-sm text-on-surface bg-transparent pr-4"
                          type="text"
                          placeholder="Search jobs by title, company, or skill..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      
                      {/* Work Mode & Sort */}
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                          <Filter className="h-4 w-4" /> Filter:
                        </div>
                      {["all", "Remote", "Hybrid", "Onsite"].map((mode) => (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          key={mode}
                          onClick={() => setFilterWorkMode(mode)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer border",
                            filterWorkMode === mode
                              ? "bg-primary text-on-primary border-primary shadow-md"
                              : "bg-surface-variant text-on-surface-variant border-transparent hover:bg-surface-container-highest hover:text-on-surface hover:border-outline-variant shadow-sm hover:shadow-md"
                          )}
                        >
                          {mode === "all" ? "All Modes" : mode}
                        </motion.button>
                      ))}
                      <div className="ml-auto flex items-center gap-2 text-sm text-on-surface-variant">
                        Sort:
                        {(["match", "readiness"] as const).map((s) => (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            key={s}
                            onClick={() => setSortBy(s)}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer capitalize border",
                              sortBy === s
                                ? "bg-primary text-on-primary border-primary shadow-md"
                                : "bg-surface-variant text-on-surface-variant border-transparent hover:bg-surface-container-highest hover:text-on-surface hover:border-outline-variant shadow-sm hover:shadow-md"
                            )}
                          >
                            {s === "match" ? "Match %" : "Interview Ready"}
                          </motion.button>
                        ))}
                      </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {filteredJobs.map((job, i) => (
                        <JobCard key={job.id} job={job} index={i} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ===== RADAR CHART TAB ===== */}
                {activeTab === "radar" && (
                  <motion.div key="radar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                          <Target className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-on-surface font-[family-name:var(--font-space-grotesk)]">Skill Radar</h2>
                          <p className="text-sm text-on-surface-variant">Your current skills vs. target role requirements</p>
                        </div>
                      </div>
                      <div className="w-full h-[500px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="80%">
                            <PolarGrid stroke="rgba(148,163,184,0.1)" />
                            <PolarAngleAxis dataKey="skill" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 10 }} />
                            <Radar name="Current Level" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
                            <Radar name="Target Level" dataKey="target" stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgba(15,23,42,0.9)",
                                border: "1px solid rgba(148,163,184,0.2)",
                                borderRadius: "12px",
                                padding: "12px",
                                color: "#e2e8f0",
                              }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center gap-8 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span className="text-on-surface-variant">Your Level</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full bg-purple-500 border border-dashed border-purple-400" />
                          <span className="text-on-surface-variant">Target Level</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ===== SKILL GAPS TAB ===== */}
                {activeTab === "gaps" && (
                  <motion.div key="gaps" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-on-surface font-[family-name:var(--font-space-grotesk)]">Skill Gap Analysis</h2>
                          <p className="text-sm text-on-surface-variant">Where you stand vs. where you need to be</p>
                        </div>
                      </div>
                      <div className="space-y-5">
                        {result.skillGaps.map((sg, i) => {
                          const gap = sg.targetLevel - sg.currentLevel;
                          return (
                            <motion.div
                              key={sg.skill}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="group"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">{sg.skill}</span>
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-surface-variant text-on-surface-variant border border-outline-variant">{sg.category}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs">
                                  <span className="text-blue-500 font-semibold">{sg.currentLevel}%</span>
                                  <span className="text-outline">→</span>
                                  <span className="text-purple-500 font-semibold">{sg.targetLevel}%</span>
                                  <span className={cn(
                                    "font-bold px-2 py-0.5 rounded-full",
                                    gap <= 10 ? "text-green-400 bg-green-500/10" :
                                    gap <= 25 ? "text-yellow-400 bg-yellow-500/10" :
                                    "text-red-400 bg-red-500/10"
                                  )}>
                                    -{gap}
                                  </span>
                                </div>
                              </div>
                              <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                                {/* Target (ghost bar) */}
                                <div
                                  className="absolute inset-y-0 left-0 rounded-full bg-purple-500/15 border-r border-purple-500/30"
                                  style={{ width: `${sg.targetLevel}%` }}
                                />
                                {/* Current */}
                                <motion.div
                                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${sg.currentLevel}%` }}
                                  transition={{ duration: 1, delay: i * 0.05 + 0.3, ease: [0.33, 1, 0.68, 1] }}
                                />
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ===== AI RECOMMENDATIONS TAB ===== */}
                {activeTab === "recommendations" && (
                  <motion.div key="recommendations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                    {/* Best Career Paths */}
                    <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-amber-500" />
                        </div>
                        <h2 className="text-xl font-bold text-on-surface font-[family-name:var(--font-space-grotesk)]">Best Career Paths</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.recommendations.bestPaths.map((path, i) => (
                          <motion.div
                            key={path.role}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="rounded-xl bg-surface-container-low border border-outline-variant p-5 hover:bg-surface-variant transition-all group shadow-sm"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-bold text-on-surface">{path.role}</h3>
                              <span className={cn("text-2xl font-bold font-[family-name:var(--font-space-grotesk)]", getMatchColor(path.readiness))}>
                                {path.readiness}%
                              </span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-3">
                              <motion.div
                                className={cn("h-full rounded-full bg-gradient-to-r",
                                  path.readiness >= 80 ? "from-green-500 to-emerald-400" :
                                  path.readiness >= 60 ? "from-yellow-500 to-amber-400" :
                                  "from-orange-500 to-red-400"
                                )}
                                initial={{ width: 0 }}
                                animate={{ width: `${path.readiness}%` }}
                                transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                              />
                            </div>
                            <p className="text-sm text-on-surface-variant leading-relaxed">{path.message}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Next Skills */}
                    <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                          <Flame className="w-5 h-5 text-red-500" />
                        </div>
                        <h2 className="text-xl font-bold text-on-surface font-[family-name:var(--font-space-grotesk)]">Priority Skills to Learn</h2>
                      </div>
                      <div className="space-y-3">
                        {result.recommendations.nextSkills.map((skill, i) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-start gap-4 rounded-xl bg-surface-container-low border border-outline-variant p-4 hover:bg-surface-variant transition-colors"
                          >
                            <span className={cn(
                              "px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 mt-0.5",
                              skill.priority === "high" ? "bg-red-500/10 text-red-600 border border-red-500/20" :
                              skill.priority === "medium" ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20" :
                              "bg-green-500/10 text-green-600 border border-green-500/20"
                            )}>
                              {skill.priority}
                            </span>
                            <div>
                              <h4 className="font-semibold text-on-surface text-sm">{skill.name}</h4>
                              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{skill.reason}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications & Projects in 2 columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Certifications */}
                      <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-9 h-9 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <Award className="w-4.5 h-4.5 text-green-500" />
                          </div>
                          <h3 className="text-lg font-bold text-on-surface font-[family-name:var(--font-space-grotesk)]">Certifications</h3>
                        </div>
                        <div className="space-y-3">
                          {result.recommendations.certifications.map((cert, i) => (
                            <div key={cert.name} className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant hover:bg-surface-variant transition-colors">
                              <GraduationCap className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-semibold text-on-surface">{cert.name}</p>
                                <p className="text-xs text-outline">{cert.provider}</p>
                                <p className="text-xs text-on-surface-variant mt-1">{cert.relevance}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Portfolio Projects */}
                      <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center">
                            <Code2 className="w-4.5 h-4.5 text-purple-500" />
                          </div>
                          <h3 className="text-lg font-bold text-on-surface font-[family-name:var(--font-space-grotesk)]">Portfolio Projects</h3>
                        </div>
                        <div className="space-y-3">
                          {result.recommendations.portfolioProjects.map((proj, i) => (
                            <div key={proj.title} className="p-3 rounded-xl bg-surface-container-low border border-outline-variant hover:bg-surface-variant transition-colors">
                              <p className="text-sm font-semibold text-on-surface mb-1">{proj.title}</p>
                              <p className="text-xs text-on-surface-variant mb-2 leading-relaxed">{proj.description}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {proj.techStack.map((t) => (
                                  <span key={t} className="px-2 py-0.5 text-xs rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">{t}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Hackathon Suggestions */}
                    <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-sm mt-6">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                          <Rocket className="w-4.5 h-4.5 text-cyan-500" />
                        </div>
                        <h3 className="text-lg font-bold text-on-surface font-[family-name:var(--font-space-grotesk)]">Hackathon Suggestions</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {result.recommendations.hackathonSuggestions.map((h, i) => (
                          <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low border border-outline-variant hover:bg-surface-variant transition-colors">
                            <Trophy className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-on-surface">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ===== TRENDING JOBS TAB ===== */}
                {activeTab === "trending" && (
                  <motion.div key="trending" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                          <Flame className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-on-surface font-[family-name:var(--font-space-grotesk)]">Trending Jobs in Tech</h2>
                          <p className="text-sm text-on-surface-variant">Market demand and salary insights for 2025</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.trendingJobs.map((tj, i) => (
                          <motion.div
                            key={tj.role}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="rounded-xl bg-surface-container-low border border-outline-variant p-5 hover:bg-surface-variant transition-all group shadow-sm"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-bold text-on-surface text-base">{tj.role}</h3>
                              <span className="flex items-center gap-1 text-green-500 text-sm font-bold">
                                <ArrowUpRight className="h-4 w-4" />
                                {tj.growth}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              <span className={cn(
                                "px-2.5 py-1 rounded-lg text-xs font-semibold border",
                                tj.demand === "Very High" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                tj.demand === "High" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                                "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              )}>
                                {tj.demand} Demand
                              </span>
                              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                                {tj.avgSalary} avg
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Analyze Another */}
              <div className="flex justify-center pt-8">
                <button
                  onClick={() => { setResult(null); setActiveTab("matches"); }}
                  className="btn-secondary cursor-pointer"
                >
                  Analyze Another Resume
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
