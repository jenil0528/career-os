"use client";

import { motion } from "motion/react";

interface KeywordAnalysisProps {
  foundKeywords: string[];
  missingKeywords: string[];
}

export default function KeywordAnalysis({
  foundKeywords,
  missingKeywords,
}: KeywordAnalysisProps) {
  const totalKeywords = foundKeywords.length + missingKeywords.length;
  const matchRatio = totalKeywords > 0
    ? Math.round((foundKeywords.length / totalKeywords) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-200">
          Keyword Analysis
        </h3>
        <span className="text-sm text-slate-400">
          {foundKeywords.length} of {totalKeywords} keywords found (
          <span
            className={
              matchRatio >= 70
                ? "text-green-400"
                : matchRatio >= 50
                ? "text-yellow-400"
                : "text-red-400"
            }
          >
            {matchRatio}% match
          </span>
          )
        </span>
      </div>

      {/* Found Keywords */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-green-400 mb-3">
          ✓ Found Keywords
        </h4>
        <div className="flex flex-wrap gap-2">
          {foundKeywords.map((keyword, index) => (
            <motion.span
              key={keyword}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-green-500/30 bg-green-500/10 text-green-300"
            >
              {keyword}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Missing Keywords */}
      <div>
        <h4 className="text-sm font-medium text-red-400 mb-3">
          ✗ Missing Keywords
        </h4>
        <div className="flex flex-wrap gap-2">
          {missingKeywords.map((keyword, index) => (
            <motion.span
              key={keyword}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 + 0.3 }}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-red-500/30 bg-red-500/10 text-red-300"
            >
              {keyword}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
