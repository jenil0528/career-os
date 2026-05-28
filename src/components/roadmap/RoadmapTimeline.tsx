"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  Clock,
  Circle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Video,
  FileText,
  Globe,
  GraduationCap,
  Award,
  Hammer,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { RoadmapPhase, RoadmapResource } from "@/types";

interface RoadmapTimelineProps {
  phases: RoadmapPhase[];
}

const resourceIcons: Record<RoadmapResource["type"], React.ReactNode> = {
  course: <GraduationCap className="w-3.5 h-3.5" />,
  book: <BookOpen className="w-3.5 h-3.5" />,
  tutorial: <FileText className="w-3.5 h-3.5" />,
  documentation: <Globe className="w-3.5 h-3.5" />,
  video: <Video className="w-3.5 h-3.5" />,
};

const levelColors: Record<string, string> = {
  beginner: "text-green-400 bg-green-500/10 border-green-500/30",
  intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  advanced: "text-red-400 bg-red-500/10 border-red-500/30",
};

const difficultyColors: Record<string, string> = {
  easy: "text-green-400 bg-green-500/10 border-green-500/30",
  medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  hard: "text-red-400 bg-red-500/10 border-red-500/30",
};

export default function RoadmapTimeline({ phases }: RoadmapTimelineProps) {
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(
    new Set([phases.find((p) => !p.isCompleted)?.id || phases[0]?.id || ""])
  );

  const togglePhase = (id: string) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const completedCount = phases.filter((p) => p.isCompleted).length;
  const currentIndex = completedCount;

  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/40 via-purple-500/30 to-white/5" />

      <div className="space-y-6">
        {phases.map((phase, index) => {
          const isCompleted = phase.isCompleted;
          const isCurrent = index === currentIndex;
          const isExpanded = expandedPhases.has(phase.id);

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16"
            >
              {/* Marker */}
              <div className="absolute left-0 top-0 flex items-center">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center relative z-10",
                    isCompleted
                      ? "bg-green-500/20 border-2 border-green-400/60"
                      : isCurrent
                      ? "bg-blue-500/20 border-2 border-blue-400/60"
                      : "bg-white/5 border-2 border-white/20"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Clock className="w-5 h-5 text-blue-400" />
                    </motion.div>
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600" />
                  )}
                </div>
              </div>

              {/* Phase Card */}
              <div
                className={cn(
                  "rounded-2xl transition-all duration-300 overflow-hidden",
                  isCompleted
                    ? "bg-green-500/5 border border-green-500/20"
                    : isCurrent
                    ? "glass border border-blue-500/30 glow-blue"
                    : "glass"
                )}
              >
                {/* Header */}
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3
                        className={cn(
                          "text-lg font-semibold",
                          isCompleted
                            ? "text-green-400"
                            : isCurrent
                            ? "text-blue-400"
                            : "text-slate-300"
                        )}
                      >
                        {phase.title}
                      </h3>
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-slate-400">
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                      {phase.description}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0 ml-3" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-3" />
                  )}
                </button>

                {/* Expandable Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-5 border-t border-white/5 pt-4">
                        {/* Skills */}
                        <div>
                          <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            Skills to Learn
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {phase.skills.map((skill) => (
                              <span
                                key={skill.name}
                                className={cn(
                                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
                                  levelColors[skill.level]
                                )}
                              >
                                {skill.isCompleted && (
                                  <Check className="w-3 h-3" />
                                )}
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Projects */}
                        <div>
                          <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                            <Hammer className="w-4 h-4 text-blue-400" />
                            Projects
                          </h4>
                          <div className="space-y-3">
                            {phase.projects.map((project) => (
                              <div
                                key={project.title}
                                className="bg-white/5 rounded-xl p-4"
                              >
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="text-sm font-medium text-slate-200">
                                    {project.title}
                                  </span>
                                  <span
                                    className={cn(
                                      "px-2 py-0.5 rounded-full text-[10px] font-medium border",
                                      difficultyColors[project.difficulty]
                                    )}
                                  >
                                    {project.difficulty}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 mb-2">
                                  {project.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {project.techStack.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-400 border border-white/5"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Certifications */}
                        {phase.certifications.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                              <Award className="w-4 h-4 text-green-400" />
                              Certifications
                            </h4>
                            <ul className="space-y-2">
                              {phase.certifications.map((cert) => (
                                <li
                                  key={cert}
                                  className="flex items-center gap-2 text-sm text-slate-400"
                                >
                                  <Award className="w-3.5 h-3.5 text-green-400 shrink-0" />
                                  {cert}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Resources */}
                        {phase.resources.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-purple-400" />
                              Resources
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {phase.resources.map((resource) => (
                                <div
                                  key={resource.title}
                                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-slate-400 shrink-0">
                                    {resourceIcons[resource.type]}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-medium text-slate-300 truncate">
                                      {resource.title}
                                    </p>
                                    {resource.platform && (
                                      <p className="text-[10px] text-slate-500">
                                        {resource.platform}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
