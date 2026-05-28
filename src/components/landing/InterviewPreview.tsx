"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import {
  Mic,
  Bot,
  User,
  Sparkles,
  Shield,
  Code,
  Rocket,
  Volume2,
} from "lucide-react";

const modes = [
  { icon: Shield, label: "HR Round", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", glow: "#3b82f6" },
  { icon: Code, label: "Technical", color: "bg-purple-500/10 text-purple-400 border-purple-500/20", glow: "#a855f7" },
  { icon: Rocket, label: "Startup", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", glow: "#06b6d4" },
];

const chatMessages = [
  { role: "ai" as const, text: "Tell me about a challenging project you've worked on and how you handled it." },
  { role: "user" as const, text: "I led the migration of our monolith to microservices, handling 2M daily requests..." },
  { role: "ai" as const, text: "Great answer! Your use of specific metrics shows impact. Let me follow up on the technical decisions..." },
];

const feedbackItems = [
  { label: "Communication", score: 92, color: "from-green-500 to-emerald-500" },
  { label: "Technical Depth", score: 88, color: "from-blue-500 to-cyan-500" },
  { label: "Confidence", score: 85, color: "from-purple-500 to-pink-500" },
];

export default function InterviewPreview() {
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
    <section id="interview" className="relative py-24 sm:py-32">
      {/* Background orb */}
      <div className="orb orb-purple h-[500px] w-[500px] -right-48 top-1/2 -translate-y-1/2" />

      {/* Accent line */}
      <div className="accent-line mx-auto max-w-xs mb-16" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: 3D Interview UI Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: 10 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] as const }}
            className="relative order-2 lg:order-1 perspective-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-500/15 to-cyan-500/15 blur-2xl" />

            <div
              ref={cardRef}
              className="glass-3d relative overflow-hidden rounded-2xl p-6 light-sweep"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              {/* Holographic */}
              <div className="absolute inset-0 holographic rounded-2xl pointer-events-none z-10 opacity-20" />

              {/* Top bar */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Mock Interview — HR Round</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-1.5 border border-red-500/20">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
                  <span className="text-xs text-red-400 font-medium">Recording</span>
                </div>
              </div>

              {/* AI Avatar — enhanced */}
              <div className="mb-6 flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-500/25">
                    <Bot className="h-7 w-7 text-white" />
                  </div>
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 opacity-30 blur-md animate-pulse" />
                  {/* Speaking indicator */}
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 ring-2 ring-slate-800">
                    <div className="flex items-end gap-[2px]">
                      <div className="waveform-bar" style={{ animationDelay: "0ms", height: "8px" }} />
                      <div className="waveform-bar" style={{ animationDelay: "200ms", height: "12px" }} />
                      <div className="waveform-bar" style={{ animationDelay: "400ms", height: "6px" }} />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white">AI Interviewer</h4>
                  <div className="flex items-center gap-1.5">
                    <Volume2 className="h-3 w-3 text-green-400 icon-glow" />
                    <span className="text-xs text-slate-500">Speaking...</span>
                  </div>
                </div>
              </div>

              {/* Chat Bubbles — 3D depth */}
              <div className="mb-6 space-y-4">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.2, ease: [0.33, 1, 0.68, 1] as const }}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${msg.role === "ai" ? "bg-purple-500/10 ring-1 ring-purple-500/20" : "bg-blue-500/10 ring-1 ring-blue-500/20"}`}>
                      {msg.role === "ai" ? (
                        <Sparkles className="h-4 w-4 text-purple-400" />
                      ) : (
                        <User className="h-4 w-4 text-blue-400" />
                      )}
                    </div>
                    <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm border ${msg.role === "ai" ? "bg-white/[0.03] text-slate-300 border-white/[0.05]" : "bg-blue-500/10 text-blue-100 border-blue-500/15"}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mic Button — 3D */}
              <div className="flex justify-center">
                <button className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:scale-110">
                  <Mic className="h-6 w-6 text-white" />
                  <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20" />
                </button>
              </div>

              {/* Live Feedback */}
              <div className="mt-6 space-y-3">
                {feedbackItems.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-slate-500 font-medium">{item.score}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${item.score}%` } : {}}
                        transition={{ duration: 1.2, delay: 1, ease: [0.33, 1, 0.68, 1] as const }}
                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.33, 1, 0.68, 1] as const }}
            className="order-1 lg:order-2"
          >
            <div className="mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />

            <span className="mb-4 inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-400">
              Mock Interviewer
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] sm:text-4xl lg:text-5xl">
              Practice with AI, Perform in{" "}
              <span className="gradient-text">Real Interviews</span>
            </h2>

            <p className="mt-4 text-lg text-slate-400 leading-relaxed">
              Our AI interviewer adapts to your responses in real-time, providing
              the most realistic interview preparation experience available.
            </p>

            {/* Mode Badges — with hover effects */}
            <div className="mt-8 flex flex-wrap gap-3">
              {modes.map((mode) => (
                <div
                  key={mode.label}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 ${mode.color} transition-all hover:scale-105 magnetic-hover`}
                  style={{ boxShadow: `0 0 20px ${mode.glow}10` }}
                >
                  <mode.icon className="h-4 w-4 icon-glow" />
                  <span className="text-sm font-medium">{mode.label}</span>
                </div>
              ))}
            </div>

            {/* Feature list */}
            <div className="mt-8 space-y-4">
              {[
                "Real-time AI feedback on your answers",
                "Voice-based or text-based interview modes",
                "Detailed post-interview performance report",
                "Industry-specific question banks",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.33, 1, 0.68, 1] as const }}
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 ring-1 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all">
                    <Sparkles className="h-3.5 w-3.5 text-purple-400 icon-glow" />
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
