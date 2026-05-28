"use client";

import { motion } from "motion/react";
import {
  Brain,
  Monitor,
  Server,
  BarChart3,
  Shield,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleSelectorProps {
  selectedRole: string | null;
  onSelectRole: (role: string) => void;
  onGenerate: () => void;
}

const roles = [
  {
    id: "AI Engineer",
    icon: Brain,
    title: "AI Engineer",
    description:
      "Build intelligent systems with machine learning, deep learning, and LLMs.",
    duration: "6-9 months",
    gradient: "from-purple-500/20 to-blue-500/10",
  },
  {
    id: "Frontend Developer",
    icon: Monitor,
    title: "Frontend Developer",
    description:
      "Create beautiful, responsive UIs with React, Next.js, and modern frameworks.",
    duration: "4-6 months",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "Backend Developer",
    icon: Server,
    title: "Backend Developer",
    description:
      "Design scalable APIs, databases, and server-side architecture.",
    duration: "5-7 months",
    gradient: "from-green-500/20 to-emerald-500/10",
  },
  {
    id: "Data Scientist",
    icon: BarChart3,
    title: "Data Scientist",
    description:
      "Extract insights from data using statistics, ML, and visualization.",
    duration: "5-8 months",
    gradient: "from-orange-500/20 to-yellow-500/10",
  },
  {
    id: "Cybersecurity Engineer",
    icon: Shield,
    title: "Cybersecurity Engineer",
    description:
      "Protect systems and networks from threats with ethical hacking and defense.",
    duration: "6-10 months",
    gradient: "from-red-500/20 to-pink-500/10",
  },
];

export default function RoleSelector({
  selectedRole,
  onSelectRole,
  onGenerate,
}: RoleSelectorProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {roles.map((role, index) => {
          const isSelected = selectedRole === role.id;
          const Icon = role.icon;

          return (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectRole(role.id)}
              className={cn(
                "relative text-left rounded-2xl p-6 transition-all duration-300",
                "bg-gradient-to-br",
                role.gradient,
                isSelected
                  ? "border-2 border-blue-400/60 shadow-lg shadow-blue-500/20"
                  : "border border-white/10 hover:border-white/20"
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                  isSelected ? "bg-blue-500/30" : "bg-white/10"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-colors",
                    isSelected ? "text-blue-400" : "text-slate-400"
                  )}
                />
              </div>

              <h3 className="text-base font-semibold text-slate-200 mb-1.5">
                {role.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                {role.description}
              </p>

              <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-slate-300">
                ⏱ {role.duration}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Generate Button */}
      {selectedRole && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <button
            onClick={onGenerate}
            className="btn-primary flex items-center gap-2 px-8 py-3 rounded-xl text-base font-semibold"
          >
            Generate Roadmap
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
