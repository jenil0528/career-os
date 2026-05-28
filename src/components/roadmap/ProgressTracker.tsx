"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { CareerRoadmap } from "@/types";

interface ProgressTrackerProps {
  roadmap: CareerRoadmap;
}

export default function ProgressTracker({ roadmap }: ProgressTrackerProps) {
  const { phases } = roadmap;
  const completedPhases = phases.filter((p) => p.isCompleted).length;
  const currentPhaseIndex = completedPhases;
  const progressPercent = Math.round((completedPhases / phases.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-200">
          Overall Progress
        </h3>
        <span className="text-sm text-blue-400 font-semibold">
          {progressPercent}% complete
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-4">
        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>

        {/* Phase Markers */}
        <div className="flex justify-between mt-2">
          {phases.map((phase, index) => {
            const isCompleted = phase.isCompleted;
            const isCurrent = index === currentPhaseIndex;

            return (
              <div
                key={phase.id}
                className="flex flex-col items-center"
                style={{ width: `${100 / phases.length}%` }}
              >
                <div
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    isCompleted
                      ? "bg-green-400"
                      : isCurrent
                      ? "bg-blue-400 ring-2 ring-blue-400/30"
                      : "bg-white/20"
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] mt-1 text-center leading-tight hidden sm:block",
                    isCompleted
                      ? "text-green-400"
                      : isCurrent
                      ? "text-blue-400"
                      : "text-slate-500"
                  )}
                >
                  Phase {index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-400">
        {completedPhases} of {phases.length} phases completed ·{" "}
        {roadmap.estimatedDuration} estimated total
      </p>
    </motion.div>
  );
}
