"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import {
  ArrowRight,
  Play,
  Users,
  TrendingUp,
  Building2,
  FileText,
  MessageSquare,
  Map,
  BarChart3,
  CheckCircle2,
  Brain,
  Code,
  Rocket,
  Zap,
  Shield,
} from "lucide-react";

/* ===== ANIMATED COUNTER ===== */
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ===== STAR FIELD — Pre-computed for render purity ===== */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${seededRandom(i * 3 + 1) * 100}%`,
  top: `${seededRandom(i * 3 + 2) * 100}%`,
  duration: `${2 + seededRandom(i * 3 + 3) * 4}s`,
  delay: `${seededRandom(i * 3 + 4) * 5}s`,
  opacity: 0.3 + seededRandom(i * 3 + 5) * 0.5,
  size: seededRandom(i * 3 + 6) > 0.8 ? "star-lg" : "",
}));

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {STARS.map((star) => (
        <div
          key={star.id}
          className={`star ${star.size}`}
          style={{
            left: star.left,
            top: star.top,
            "--star-duration": star.duration,
            "--star-delay": star.delay,
            "--star-opacity": star.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}


/* ===== FLOATING 3D ICON ===== */
function FloatingIcon({
  icon: Icon,
  color,
  size = 20,
  className = "",
  delay = 0,
}: {
  icon: React.ElementType;
  color: string;
  size?: number;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 + delay, duration: 0.6, type: "spring" }}
      className={`absolute animate-float-3d ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="glass rounded-xl p-2.5 shadow-lg"
        style={{ boxShadow: `0 0 20px ${color}22, 0 8px 32px rgba(0,0,0,0.3)` }}
      >
        <Icon
          style={{ width: size, height: size, color }}
          className="icon-glow"
        />
      </div>
    </motion.div>
  );
}

/* ===== DATA ===== */
const stats = [
  { icon: Users, value: 10000, suffix: "+", label: "Students", color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5" },
  { icon: TrendingUp, value: 95, suffix: "%", label: "Placement Rate", color: "text-green-400", bg: "from-green-500/10 to-green-500/5" },
  { icon: Building2, value: 50, suffix: "+", label: "Companies", color: "text-purple-400", bg: "from-purple-500/10 to-purple-500/5" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] as const },
  },
};

/* ===== HERO ===== */
export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-bg" />
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Star field */}
      <StarField />

      {/* Floating Orbs — enhanced */}
      <div className="orb orb-blue h-[600px] w-[600px] -top-40 -left-40 animate-float" />
      <div className="orb orb-purple h-[500px] w-[500px] top-1/3 -right-32 animate-float-slow" />
      <div className="orb orb-cyan h-[350px] w-[350px] bottom-20 left-1/4 animate-float-delayed" />

      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px accent-line" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center perspective-container"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm backdrop-blur-md light-sweep">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-slate-300 font-medium">
                AI-Powered Career Platform
              </span>
            </div>
          </motion.div>

          {/* Heading — with text glow */}
          <motion.h1
            variants={itemVariants}
            className="max-w-5xl text-4xl font-bold leading-tight tracking-tight font-[family-name:var(--font-space-grotesk)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="text-white">Your </span>
            <span className="gradient-text text-glow">AI Placement</span>
            <br />
            <span className="text-white">Agent</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl leading-relaxed"
          >
            Ace interviews, optimize resumes, and build your career with AI.
            <span className="text-slate-300 font-medium">
              {" "}The all-in-one platform that gets you placed faster.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/sign-up"
              className="group btn-primary inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold"
            >
              <span>Start Free</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
            <Link
              href="#interview"
              className="glass inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 light-sweep"
            >
              <Play className="h-4 w-4 text-blue-400 icon-glow" />
              <span>Try Mock Interview</span>
            </Link>
          </motion.div>

          {/* Stats — 3D cards */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid w-full max-w-xl grid-cols-3 gap-4 sm:gap-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`glass rounded-2xl p-4 card-hover light-sweep bg-gradient-to-b ${stat.bg}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color} mb-2 mx-auto icon-glow`} />
                <span className="block text-2xl font-bold text-white sm:text-3xl font-[family-name:var(--font-space-grotesk)]">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="block text-xs text-slate-500 sm:text-sm mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* ========== Dashboard Preview — 3D Parallax ========== */}
          <motion.div
            variants={itemVariants}
            className="relative mt-20 w-full max-w-5xl perspective-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 -m-6 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl opacity-60" />

            <div
              ref={previewRef}
              className="glass-3d relative overflow-hidden rounded-2xl p-1 transition-transform duration-300"
              style={{
                transform: `rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg) translateZ(10px)`,
              }}
            >
              {/* Holographic overlay */}
              <div className="absolute inset-0 holographic rounded-2xl pointer-events-none z-10 opacity-30" />

              <div className="rounded-xl bg-slate-950/80 p-4 sm:p-6 relative">
                {/* Top Bar */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500/80" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                      <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      CareerOS Dashboard
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 border border-white/5">
                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-slate-400">AI Active</span>
                  </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {/* ATS Score */}
                  <div className="glass rounded-xl p-4 light-sweep">
                    <div className="mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-400 icon-glow" />
                      <span className="text-sm font-medium text-slate-300">ATS Score</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold text-green-400 font-[family-name:var(--font-space-grotesk)] text-glow-sm">85</span>
                      <span className="mb-1 text-sm text-slate-500">/ 100</span>
                    </div>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ delay: 1.5, duration: 1.2, ease: [0.33, 1, 0.68, 1] as const }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                      />
                    </div>
                  </div>

                  {/* Interview Prep */}
                  <div className="glass rounded-xl p-4 light-sweep">
                    <div className="mb-3 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-purple-400 icon-glow" />
                      <span className="text-sm font-medium text-slate-300">Interview Prep</span>
                    </div>
                    <div className="space-y-2">
                      {["HR Round", "Technical", "System Design"].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                          <span className="text-sm text-slate-400">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="glass rounded-xl p-4 light-sweep">
                    <div className="mb-3 flex items-center gap-2">
                      <Map className="h-4 w-4 text-cyan-400 icon-glow" />
                      <span className="text-sm font-medium text-slate-300">Skill Progress</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "React", pct: 90, color: "from-cyan-500 to-blue-500" },
                        { name: "Node.js", pct: 75, color: "from-green-500 to-emerald-500" },
                        { name: "System Design", pct: 60, color: "from-purple-500 to-pink-500" },
                      ].map((skill) => (
                        <div key={skill.name}>
                          <div className="mb-1 flex justify-between text-xs">
                            <span className="text-slate-400">{skill.name}</span>
                            <span className="text-slate-500">{skill.pct}%</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.pct}%` }}
                              transition={{ delay: 1.8, duration: 1, ease: [0.33, 1, 0.68, 1] as const }}
                              className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-6 rounded-xl bg-white/[0.02] p-3 border border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-blue-400" />
                    <span className="text-xs text-slate-400">12 Applications Tracked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-purple-400" />
                    <span className="text-xs text-slate-400">8 Mock Interviews Done</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-xs text-slate-400">Profile Strength: High</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
