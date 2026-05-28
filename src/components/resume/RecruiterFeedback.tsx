"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecruiterFeedbackProps {
  recruiterFeedback: string;
  roastFeedback: string;
}

export default function RecruiterFeedback({
  recruiterFeedback,
  roastFeedback,
}: RecruiterFeedbackProps) {
  const [isRoastMode, setIsRoastMode] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Toggle */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            !isRoastMode ? "text-blue-400" : "text-slate-500"
          )}
        >
          <MessageSquare className="w-4 h-4 inline mr-1" />
          Professional
        </span>

        <button
          onClick={() => setIsRoastMode(!isRoastMode)}
          className={cn(
            "relative w-14 h-7 rounded-full transition-colors duration-300",
            isRoastMode
              ? "bg-gradient-to-r from-red-500 to-orange-500"
              : "bg-white/10"
          )}
        >
          <motion.div
            className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-lg"
            animate={{ left: isRoastMode ? "calc(100% - 1.625rem)" : "0.125rem" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>

        <span
          className={cn(
            "text-sm font-medium transition-colors",
            isRoastMode ? "text-orange-400" : "text-slate-500"
          )}
        >
          <Flame className="w-4 h-4 inline mr-1" />
          Roast Mode
        </span>
      </div>

      {/* Feedback Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isRoastMode ? "roast" : "professional"}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "rounded-2xl p-6 relative overflow-hidden",
            isRoastMode
              ? "bg-gradient-to-br from-red-500/10 via-orange-500/5 to-transparent border border-red-500/30"
              : "glass"
          )}
        >
          {/* Decorative glow for roast mode */}
          {isRoastMode && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          )}

          <div className="flex items-center gap-2 mb-4">
            {isRoastMode ? (
              <Flame className="w-5 h-5 text-orange-400" />
            ) : (
              <MessageSquare className="w-5 h-5 text-blue-400" />
            )}
            <h3
              className={cn(
                "text-lg font-semibold",
                isRoastMode ? "text-orange-400" : "text-blue-400"
              )}
            >
              {isRoastMode ? "🔥 Roast Mode" : "Recruiter Feedback"}
            </h3>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed relative z-10">
            {isRoastMode ? roastFeedback : recruiterFeedback}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
