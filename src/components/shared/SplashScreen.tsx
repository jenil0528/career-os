"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Brain, Cpu, ShieldCheck, Zap } from "lucide-react";

const ENGINE_PHASES = [
  { text: "Initializing CareerOS Engine...", icon: Brain, color: "text-blue-400", glow: "shadow-blue-500/20", barColor: "from-blue-600 via-cyan-500 to-blue-400" },
  { text: "Synchronizing Neural Placement Networks...", icon: Cpu, color: "text-purple-400", glow: "shadow-purple-500/20", barColor: "from-purple-600 via-pink-500 to-purple-400" },
  { text: "Hardening Simulated Local Sandbox...", icon: ShieldCheck, color: "text-emerald-400", glow: "shadow-emerald-500/20", barColor: "from-emerald-600 via-teal-500 to-emerald-400" },
  { text: "Cognitive Engine Optimized. Launching!", icon: Zap, color: "text-amber-400", glow: "shadow-amber-500/20", barColor: "from-amber-500 via-orange-500 to-amber-300" }
];

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    // Check if we've already shown the splash screen in this session
    let hasSeenSplash: string | null = null;
    try {
      hasSeenSplash = sessionStorage.getItem("careeros-splash-seen");
    } catch {
      hasSeenSplash = null;
    }
    
    if (hasSeenSplash) {
      const hideSplash = window.setTimeout(() => setShow(false), 0);
      return () => window.clearTimeout(hideSplash);
    }

    // Lock body scroll while splash is showing
    document.body.style.overflow = "hidden";

    const duration = 2800; // Cinematic duration to fully immerse the user
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      
      setProgress(newProgress);

      if (newProgress < 28) {
        setPhaseIndex(0);
      } else if (newProgress < 58) {
        setPhaseIndex(1);
      } else if (newProgress < 85) {
        setPhaseIndex(2);
      } else {
        setPhaseIndex(3);
      }

      if (currentStep >= steps) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setShow(false);
          document.body.style.overflow = "";
          try {
            sessionStorage.setItem("careeros-splash-seen", "true");
          } catch {
            // ignore
          }
        }, 600);
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  const ActiveIcon = ENGINE_PHASES[phaseIndex].icon;
  const currentPhase = ENGINE_PHASES[phaseIndex];

  // Letter animations for CareerOS text
  const titleText = "CareerOS";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 * i },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 150,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 0.96,
            filter: "blur(20px)",
            y: -10
          }}
          transition={{ 
            duration: 0.85, 
            ease: [0.34, 1.56, 0.64, 1] 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030307] overflow-hidden"
        >
          {/* Cyber Dot-Matrix Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "24px 24px"
            }}
          />

          {/* Ambient Breathing Aurora Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 0.95, 1],
                rotate: [0, 90, 180, 360],
                opacity: [0.18, 0.32, 0.22, 0.18]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-transparent blur-[140px] rounded-full" 
            />
            <motion.div 
              animate={{ 
                scale: [1.1, 0.9, 1.15, 1.1],
                rotate: [360, 270, 90, 0],
                opacity: [0.1, 0.22, 0.14, 0.1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-600/20 via-pink-600/10 to-transparent blur-[120px] rounded-full" 
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Centerpiece Logo & Rotating Quantum Rings */}
            <div className="relative w-44 h-44 mb-10 flex items-center justify-center">
              
              {/* Outer Counter-Clockwise Neon Pulse Ring */}
              <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-white/[0.03]"
                  strokeWidth="1"
                  fill="none"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-blue-500/40"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="283"
                  animate={{ strokeDashoffset: [283, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>

              {/* Middle Particle Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border border-dashed border-purple-500/20 scale-95"
              />

              {/* Inner Clockwise Orbit Ring with Floating Node */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 rounded-full border border-cyan-500/10 scale-90"
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee,0_0_30px_#22d3ee]" />
              </motion.div>

              {/* Glassmorphic Logo Shield */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, type: "spring", stiffness: 120, damping: 10 }}
                className="relative w-26 h-26 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.18)]"
              >
                {/* Logo pulse scale */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-12 h-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 filter drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]" />
                </motion.div>
                
                {/* Neon particle dots */}
                <div className="absolute inset-0 pointer-events-none">
                  <span className="absolute top-2 left-3 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-70" />
                  <span className="absolute bottom-3 right-4 w-1 h-1 rounded-full bg-purple-400 animate-ping opacity-60 delay-500" />
                </div>
              </motion.div>
            </div>

            {/* Premium Staggered Letter Reveal Title */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-8 flex flex-col items-center"
            >
              <h1 className="text-5xl font-black tracking-tight font-[family-name:var(--font-space-grotesk)] flex justify-center mb-2">
                {titleText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={childVariants}
                    className="inline-block bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-400 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
              <motion.p 
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 0.5, letterSpacing: "0.45em" }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="text-[9px] text-slate-400 uppercase font-bold tracking-[0.45em] ml-[0.45em]"
              >
                Your AI Placement Agent
              </motion.p>
            </motion.div>

            {/* Interactive Progress Command Panel */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, type: "spring", stiffness: 90 }}
              className="w-84 max-w-full glass border border-white/5 rounded-2xl p-5 shadow-2xl relative overflow-hidden bg-black/40 backdrop-blur-xl"
            >
              {/* Inner ambient glow line mirroring the loading color */}
              <div className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transition-all duration-500`} />
              
              {/* Color-Shifting Neon Progress Bar */}
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative mb-4">
                <motion.div 
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${currentPhase.barColor} rounded-full transition-all duration-300`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Command status text and numeric percentage */}
              <div className="flex items-center gap-3 min-h-[24px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={phaseIndex}
                    initial={{ opacity: 0, x: -8, filter: "blur(3px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0)" }}
                    exit={{ opacity: 0, x: 8, filter: "blur(3px)" }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-3 w-full"
                  >
                    <div className="relative">
                      <ActiveIcon className={`w-4 h-4 ${currentPhase.color} shrink-0 animate-[pulse_1.2s_infinite]`} />
                      <div className={`absolute inset-0 ${currentPhase.color} blur-[6px] opacity-50 scale-125`} />
                    </div>
                    <span className="text-[11px] text-slate-300 font-semibold tracking-wide truncate">
                      {currentPhase.text}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <motion.span 
                  animate={{ scale: [1, 1.05, 1] }}
                  className="ml-auto text-xs text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 font-mono font-bold"
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
