"use client";

import { motion } from "motion/react";
import { Users, Code, Rocket, ArrowRight, Target, TrendingUp, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InterviewMode } from "@/types";

interface InterviewSetupProps {
  selectedMode: InterviewMode | null;
  onSelectMode: (mode: InterviewMode) => void;
  onStart: () => void;
}

const modes = [
  {
    id: "hr" as InterviewMode,
    icon: Users,
    title: "HR Interview",
    description:
      "Behavioral questions about teamwork, leadership, and career goals. Practice the STAR method.",
    difficulty: "Beginner",
    difficultyColor: "text-green-700 bg-green-500/10 border-green-500/20",
    gradient: "bg-surface-container-low",
  },
  {
    id: "technical" as InterviewMode,
    icon: Code,
    title: "Technical Interview",
    description:
      "Data structures, algorithms, system design, and problem-solving questions for engineering roles.",
    difficulty: "Intermediate",
    difficultyColor: "text-yellow-700 bg-yellow-500/10 border-yellow-500/20",
    gradient: "bg-surface-container-low",
  },
  {
    id: "startup" as InterviewMode,
    icon: Rocket,
    title: "Startup Founder",
    description:
      "Fast-paced questions about vision, resourcefulness, risk tolerance, and culture fit.",
    difficulty: "Advanced",
    difficultyColor: "text-red-700 bg-red-500/10 border-red-500/20",
    gradient: "bg-surface-container-low",
  },
  {
    id: "product" as InterviewMode,
    icon: Target,
    title: "Product Manager",
    description:
      "Questions about product strategy, user empathy, metrics, and prioritizing roadmaps.",
    difficulty: "Advanced",
    difficultyColor: "text-emerald-700 bg-emerald-500/10 border-emerald-500/20",
    gradient: "bg-surface-container-low",
  },
  {
    id: "sales" as InterviewMode,
    icon: TrendingUp,
    title: "Sales Executive",
    description:
      "Pitching, objection handling, pipeline management, and client relationship scenarios.",
    difficulty: "Intermediate",
    difficultyColor: "text-cyan-700 bg-cyan-500/10 border-cyan-500/20",
    gradient: "bg-surface-container-low",
  },
  {
    id: "marketing" as InterviewMode,
    icon: Megaphone,
    title: "Marketing Director",
    description:
      "Growth strategies, brand positioning, campaign ROI, and market analysis questions.",
    difficulty: "Advanced",
    difficultyColor: "text-pink-700 bg-pink-500/10 border-pink-500/20",
    gradient: "bg-surface-container-low",
  },
];

export default function InterviewSetup({
  selectedMode,
  onSelectMode,
  onStart,
}: InterviewSetupProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modes.map((mode, index) => {
          const isSelected = selectedMode === mode.id;
          const Icon = mode.icon;

          return (
            <motion.button
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectMode(mode.id)}
              className={cn(
                "relative text-left rounded-2xl p-6 transition-all duration-300",
                mode.gradient,
                isSelected
                  ? "border-2 border-primary shadow-sm bg-primary/5"
                  : "border border-outline-variant hover:border-primary/40 hover:bg-surface-container"
              )}
            >
              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  layoutId="selectedMode"
                  className="absolute inset-0 rounded-2xl border-2 border-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                  isSelected ? "bg-primary-container" : "bg-surface-variant"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-colors",
                    isSelected ? "text-primary" : "text-on-surface-variant"
                  )}
                />
              </div>

              <h3 className="text-lg font-semibold text-on-surface mb-2">
                {mode.title}
              </h3>
              <p className="text-sm text-on-surface-variant mb-4">{mode.description}</p>

              <span
                className={cn(
                  "inline-flex px-2.5 py-1 rounded-full text-xs font-medium border",
                  mode.difficultyColor
                )}
              >
                {mode.difficulty}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Start Button */}
      {selectedMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <button
            onClick={onStart}
            className="btn-primary flex items-center gap-2 px-8 py-3 rounded-xl text-base font-semibold"
          >
            Start Interview
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
