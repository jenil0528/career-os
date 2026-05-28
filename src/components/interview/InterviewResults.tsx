"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { InterviewResult } from "@/types";

interface InterviewResultsProps {
  result: InterviewResult;
  onRetry: () => void;
}

function ScoreCircle({
  score,
  label,
  size = "sm",
  delay = 0,
}: {
  score: number;
  label: string;
  size?: "sm" | "lg";
  delay?: number;
}) {
  const radius = size === "lg" ? 70 : 40;
  const viewBox = size === "lg" ? 160 : 100;
  const center = viewBox / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const strokeWidth = size === "lg" ? 10 : 6;

  const getColor = (s: number) => {
    if (s >= 80) return "#22c55e";
    if (s >= 60) return "#eab308";
    if (s >= 40) return "#f97316";
    return "#ef4444";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative">
        <svg
          className="circular-progress"
          width={viewBox}
          height={viewBox}
          viewBox={`0 0 ${viewBox} ${viewBox}`}
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(0,0,0,0.05)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={getColor(score)}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, delay: delay + 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              "font-bold",
              size === "lg" ? "text-3xl" : "text-lg",
              score >= 80
                ? "text-green-400"
                : score >= 60
                ? "text-yellow-400"
                : score >= 40
                ? "text-orange-400"
                : "text-red-400"
            )}
          >
            {score}
          </span>
        </div>
      </div>
      <span
        className={cn(
          "font-medium text-on-surface-variant",
          size === "lg" ? "text-base" : "text-xs"
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default function InterviewResults({
  result,
  onRetry,
}: InterviewResultsProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-container border border-outline-variant rounded-2xl p-8 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-center text-on-surface mb-6">
          Interview Performance
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <ScoreCircle
            score={result.overallScore}
            label="Overall Score"
            size="lg"
          />
          <div className="flex gap-6">
            <ScoreCircle
              score={result.communicationScore}
              label="Communication"
              delay={0.1}
            />
            <ScoreCircle
              score={result.confidenceScore}
              label="Confidence"
              delay={0.2}
            />
            <ScoreCircle
              score={result.technicalScore}
              label="Technical"
              delay={0.3}
            />
          </div>
        </div>
      </motion.div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-sm"
        >
          <h4 className="text-base font-semibold text-green-600 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Strengths
          </h4>
          <ul className="space-y-3">
            {result.strengths.map((strength, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-2 text-sm text-on-surface"
              >
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                {strength}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-sm"
        >
          <h4 className="text-base font-semibold text-orange-600 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Areas for Improvement
          </h4>
          <ul className="space-y-3">
            {result.improvements.map((improvement, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-2 text-sm text-on-surface"
              >
                <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
                {improvement}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Detailed Feedback */}
      {result.detailedFeedback.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <h4 className="text-base font-semibold text-on-surface mb-4">
            Question-by-Question Feedback
          </h4>
          {result.detailedFeedback.map((feedback, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() =>
                  setExpandedQuestion(
                    expandedQuestion === index ? null : index
                  )
                }
                className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-variant transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span
                    className={cn(
                      "text-sm font-bold shrink-0",
                      feedback.score >= 80
                        ? "text-green-400"
                        : feedback.score >= 60
                        ? "text-yellow-400"
                        : "text-orange-400"
                    )}
                  >
                    {feedback.score}
                  </span>
                  <span className="text-sm text-on-surface truncate">
                    {feedback.question}
                  </span>
                </div>
                {expandedQuestion === index ? (
                  <ChevronUp className="w-4 h-4 text-on-surface-variant shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-on-surface-variant shrink-0" />
                )}
              </button>

              {expandedQuestion === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-outline-variant p-4 space-y-3 bg-surface-container-low"
                >
                  <div>
                    <span className="text-xs font-bold text-outline uppercase tracking-wider">
                      Your Answer
                    </span>
                    <p className="text-sm text-on-surface mt-1">
                      {feedback.answer}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-outline uppercase tracking-wider">
                      Feedback
                    </span>
                    <p className="text-sm text-on-surface mt-1">
                      {feedback.feedback}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Try Again */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center pt-4"
      >
        <button
          onClick={onRetry}
          className="btn-primary flex items-center gap-2 px-8 py-3 rounded-xl text-base font-semibold"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
      </motion.div>
    </div>
  );
}
