"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ATSScoreCardProps {
  score: number;
  grade: string;
}

export default function ATSScoreCard({ score, grade }: ATSScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getScoreColor = (s: number) => {
    if (s >= 80) return { stroke: "#22c55e", text: "text-green-400", glow: "glow-green", bg: "from-green-500/20" };
    if (s >= 60) return { stroke: "#eab308", text: "text-yellow-400", glow: "glow-blue", bg: "from-yellow-500/20" };
    if (s >= 40) return { stroke: "#f97316", text: "text-orange-400", glow: "", bg: "from-orange-500/20" };
    return { stroke: "#ef4444", text: "text-red-400", glow: "", bg: "from-red-500/20" };
  };

  const colors = getScoreColor(score);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, duration / steps);
    return () => {
      clearInterval(timer);
    };
  }, [score]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className={cn(
        "glass rounded-2xl p-8 flex flex-col items-center gap-4",
        colors.glow
      )}
    >
      <h3 className="text-lg font-semibold text-slate-300">ATS Score</h3>

      {/* Circular Progress */}
      <div className="relative w-52 h-52">
        <svg
          className="circular-progress w-full h-full"
          viewBox="0 0 200 200"
          role="img"
          aria-label={`ATS Score: ${score} out of 100`}
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="12"
          />
          {/* Glow filter */}
          <defs>
            <filter id="scoreGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            filter="url(#scoreGlow)"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Score number in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={cn("text-5xl font-bold", colors.text)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            aria-live="polite"
          >
            {animatedScore}
          </motion.span>
          <span className="text-slate-400 text-sm mt-1">out of 100</span>
        </div>
      </div>

      {/* Grade */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={cn(
          "px-4 py-1.5 rounded-full text-lg font-bold",
          "bg-gradient-to-r",
          colors.bg,
          "to-transparent",
          colors.text
        )}
      >
        Grade: {grade}
      </motion.div>
    </motion.div>
  );
}
