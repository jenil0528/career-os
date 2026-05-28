"use client";

import { motion } from "motion/react";
import { CheckCircle, XCircle } from "lucide-react";

interface StrengthsWeaknessesProps {
  strengths: string[];
  weaknesses: string[];
}

export default function StrengthsWeaknesses({
  strengths,
  weaknesses,
}: StrengthsWeaknessesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Strengths */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Strengths
        </h3>
        <ul className="space-y-3">
          {strengths.map((strength, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="flex items-start gap-3"
            >
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-300">{strength}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Weaknesses */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
          <XCircle className="w-5 h-5" />
          Weaknesses
        </h3>
        <ul className="space-y-3">
          {weaknesses.map((weakness, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="flex items-start gap-3"
            >
              <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-300">{weakness}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
