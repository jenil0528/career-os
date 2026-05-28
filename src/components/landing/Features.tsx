"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { 
  BrainCircuit, 
  CheckCircle2, 
  ArrowRight, 
  Mic, 
  Route, 
  FileText, 
  TrendingUp, 
  Sparkles 
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  // Real-time cadence scanner simulator for Card 3
  const [cadenceStatus, setCadenceStatus] = useState("Analyzing cadence...");
  
  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden bg-surface-container-low text-on-surface">
      {/* Dynamic Background dots */}
      <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
      
      {/* Subtle orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-container px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <Sparkles className="w-3.5 h-3.5" /> AI Engine Core
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight font-[family-name:var(--font-hanken-grotesk)] sm:text-4xl lg:text-5xl">
            Elevate Your Career with <span className="text-primary">AI Infrastructure</span>
          </h2>
          <p className="mt-4 text-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            The definitive platform for C-Suite transitions, algorithmic resume optimization, and mock interview coaching.
          </p>
        </motion.div>

        {/* ==========================================
            BENTO GRID LAYOUT
           ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: ATS Optimization (Spans 1 column) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="space-y-4">
              {/* Icon Container */}
              <div className="w-12 h-12 bg-primary-container border border-primary/20 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-on-surface font-[family-name:var(--font-hanken-grotesk)]">
                  ATS Optimization
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  Algorithmic resume parsing aligns your profile with target leadership roles, ensuring maximum visibility to C-suite recruitment crawlers.
                </p>
              </div>
            </div>

            {/* Simulated Live ATS Meter */}
            <div className="border-t border-outline-variant pt-4 mt-6">
              <div className="flex justify-between items-center mb-1 text-[11px]">
                <span className="text-on-surface-variant font-semibold uppercase">Profile Match Score</span>
                <span className="text-primary font-bold font-mono">92%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={inView ? { width: "92%" } : {}}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Dynamic Skill Roadmaps (Spans 2 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col md:flex-row gap-6 justify-between hover:border-primary/30 transition-all duration-300 shadow-sm relative overflow-hidden"
          >
            {/* Conceptual overlay dot grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none grid-pattern" />

            {/* Left side details */}
            <div className="flex-1 flex flex-col justify-between relative z-10">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary-container border border-primary/20 rounded-xl flex items-center justify-center text-primary">
                  <Route className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-on-surface font-[family-name:var(--font-hanken-grotesk)]">
                    Dynamic Skill Roadmaps
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Identify structural competency gaps for transition milestones. Our AI models analyze your trajectory against real-time demands to forge a precise path.
                  </p>
                </div>
              </div>

              <Link 
                href="/sign-up" 
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider"
              >
                Explore Pathways <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Right side Graph Representation */}
            <div className="w-full md:w-1/2 bg-surface-container-low border border-outline-variant rounded-xl p-4 flex items-end gap-3 justify-between h-40 relative z-10">
              
              {/* Target Indicator error Badge */}
              <div className="absolute top-2.5 right-2.5 bg-red-500/20 border border-red-500/30 text-red-400 text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                GAP DETECTED
              </div>

              {/* Bar 1 */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={inView ? { height: "25%" } : {}}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="w-full bg-slate-800 rounded-t-md hover:bg-slate-700 transition-colors"
                />
                <span className="text-[8px] font-semibold text-slate-600 font-mono">STA</span>
              </div>

              {/* Bar 2 */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={inView ? { height: "50%" } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="w-full bg-slate-800 rounded-t-md hover:bg-slate-700 transition-colors"
                />
                <span className="text-[8px] font-semibold text-slate-600 font-mono">MID</span>
              </div>

              {/* Bar 3 */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={inView ? { height: "70%" } : {}}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="w-full bg-cyan-500/20 border border-cyan-500/30 rounded-t-md hover:bg-cyan-500/30 transition-colors"
                />
                <span className="text-[8px] font-semibold text-cyan-500/80 font-mono">SEN</span>
              </div>

              {/* Bar 4 */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={inView ? { height: "82%" } : {}}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="w-full bg-blue-500/20 border border-blue-500/30 rounded-t-md hover:bg-blue-500/30 transition-colors"
                />
                <span className="text-[8px] font-semibold text-blue-400 font-mono">DIR</span>
              </div>

              {/* Bar 5 (Highest VP Bar) */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full h-full flex flex-col justify-end relative">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={inView ? { height: "95%" } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-md shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  />
                  {/* Floating target point */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 shadow-md animate-ping" />
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 shadow-md" />
                </div>
                <span className="text-[8px] font-semibold text-purple-400 font-mono font-bold">EXEC</span>
              </div>

            </div>
          </motion.div>

          {/* Card 3: High-Stakes Interview Coaching (Spans all 3 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3 bg-surface-container border border-outline-variant rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center justify-between hover:border-primary/30 transition-all duration-300 shadow-sm relative"
          >
            {/* Left side detail */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-container border border-primary/20 rounded-lg mb-4 text-primary">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-bold text-[9px] uppercase tracking-widest font-mono">BETA FEATURE</span>
              </div>
              <h3 className="font-semibold text-2xl text-on-surface font-[family-name:var(--font-hanken-grotesk)]">
                High-Stakes Interview Coaching
              </h3>
              <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
                Simulate intense panel boardrooms with our advanced AI recruiter. Receive immediate feedback on speech cadence, postural confidence, and structural answer delivery.
              </p>
            </div>

            {/* Right side Voice Cadence scanning HUD widget */}
            <div className="flex flex-col gap-4 min-w-[280px] w-full md:w-auto">
              
              {/* Interactive Widget Box */}
              <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center gap-4 shadow-sm relative overflow-hidden group">
                {/* Active scan line */}
                <div className="absolute inset-x-0 top-0 h-px bg-primary/50 shadow-[0_0_8px_var(--color-primary)] animate-[bounce_3s_infinite]" />
                
                {/* Animated Mic Indicator */}
                <button 
                  onClick={() => setCadenceStatus(cadenceStatus === "Analyzing cadence..." ? "Optimal (135 words/min)" : "Analyzing cadence...")}
                  className="w-10 h-10 rounded-full bg-primary-container border border-primary/30 flex items-center justify-center text-primary group-hover:scale-105 transition-transform"
                >
                  <Mic className="w-5 h-5 animate-pulse" />
                </button>
                
                <div>
                  <div className="text-xs font-bold text-on-surface">Communication Clarity</div>
                  <div className="text-[10px] font-semibold text-on-surface-variant font-mono mt-0.5 animate-pulse uppercase tracking-wider">
                    {cadenceStatus}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link 
                href="/dashboard/interview"
                className="w-full bg-primary hover:bg-primary/90 text-on-primary font-semibold py-3 px-6 rounded-xl text-center text-xs shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Initialize Practice Session
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
