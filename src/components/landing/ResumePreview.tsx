"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import {
  FileText,
  CheckCircle2,
  Star,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";

const features = [
  { icon: Target, text: "ATS compatibility scoring with detailed breakdown" },
  { icon: Zap, text: "Instant keyword optimization suggestions" },
  { icon: Star, text: "Section-by-section strength analysis" },
  { icon: TrendingUp, text: "Industry-specific resume benchmarking" },
];

const strengths = [
  { label: "Contact Info", pass: true },
  { label: "Work Experience", pass: true },
  { label: "Skills Section", pass: true },
  { label: "Education", pass: true },
  { label: "Action Verbs", pass: false },
];

const keywords = [
  "React", "TypeScript", "Node.js", "AWS",
  "REST API", "Git", "Agile", "CI/CD",
];

function AnimatedScore({ target }: { target: number }) {
  const [score, setScore] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setScore(target);
        clearInterval(timer);
      } else {
        setScore(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      {/* Glow behind circle */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-green-500/20 blur-xl" />
      <svg className="circular-progress h-32 w-32" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle
          cx="60" cy="60" r="52" fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-white font-[family-name:var(--font-space-grotesk)] text-glow-sm">
          {score}
        </span>
        <span className="text-xs text-slate-500">/ 100</span>
      </div>
    </div>
  );
}

export default function ResumePreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <section id="resume" className="relative py-24 sm:py-32">
      {/* Background orb */}
      <div className="orb orb-blue h-[400px] w-[400px] -left-48 top-1/2 -translate-y-1/2" />

      {/* Accent line top */}
      <div className="accent-line mx-auto max-w-xs mb-16" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] as const }}
          >
            <div className="mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />

            <span className="mb-4 inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
              Resume Analyzer
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] sm:text-4xl lg:text-5xl">
              Optimize Your Resume for{" "}
              <span className="gradient-text">Maximum Impact</span>
            </h2>

            <p className="mt-4 text-lg text-slate-400 leading-relaxed">
              Our AI scans your resume against real ATS systems and provides
              actionable feedback to help you stand out from the competition.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.33, 1, 0.68, 1] as const }}
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all">
                    <feature.icon className="h-3.5 w-3.5 text-blue-400 icon-glow" />
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -10 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] as const }}
            className="relative perspective-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Card glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/15 to-purple-500/15 blur-2xl" />

            <div
              ref={cardRef}
              className="glass-3d relative overflow-hidden rounded-2xl p-6 light-sweep"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              {/* Holographic overlay */}
              <div className="absolute inset-0 holographic rounded-2xl pointer-events-none z-10 opacity-20" />

              {/* Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20">
                  <FileText className="h-5 w-5 text-blue-400 icon-glow" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Resume Analysis</h3>
                  <p className="text-xs text-slate-500">john_doe_resume.pdf</p>
                </div>
              </div>

              {/* Score */}
              <div className="mb-6 flex justify-center">
                <AnimatedScore target={85} />
              </div>

              {/* Grade Badge */}
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 border border-green-500/20">
                  <span className="text-sm font-semibold text-green-400 text-glow-sm">Grade: A</span>
                  <span className="text-xs text-slate-500">— Excellent</span>
                </div>
              </div>

              {/* Strengths Checklist */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-medium text-slate-300">Section Analysis</h4>
                <div className="space-y-2">
                  {strengths.map((s) => (
                    <div key={s.label} className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2 border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                      <span className="text-sm text-slate-400">{s.label}</span>
                      <CheckCircle2 className={`h-4 w-4 ${s.pass ? "text-green-400" : "text-yellow-400"}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div>
                <h4 className="mb-3 text-sm font-medium text-slate-300">Matched Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300 hover:bg-blue-500/20 hover:border-blue-500/30 transition-colors"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
