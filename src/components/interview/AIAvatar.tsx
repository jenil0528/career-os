"use client";

import { motion } from "motion/react";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

type AIAvatarStatus = "idle" | "listening" | "speaking";

interface AIAvatarProps {
  status: AIAvatarStatus;
}

const easeInOut = [0.42, 0, 0.58, 1] as const;

export default function AIAvatar({ status }: AIAvatarProps) {
  const statusText: Record<AIAvatarStatus, string> = {
    idle: "Ready",
    listening: "Listening...",
    speaking: "Thinking...",
  };

  const statusColor: Record<AIAvatarStatus, string> = {
    idle: "text-slate-400",
    listening: "text-green-400",
    speaking: "text-blue-400",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {/* Pulsing rings */}
        {status === "speaking" && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400/30"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: easeInOut }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400/20"
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: easeInOut,
                delay: 0.3,
              }}
            />
          </>
        )}
        {status === "listening" && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-400/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: easeInOut }}
          />
        )}

        {/* Avatar Circle */}
        <motion.div
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center relative z-10",
            "bg-gradient-to-br from-blue-500/30 to-purple-500/30",
            "border-2",
            status === "speaking"
              ? "border-blue-400/60"
              : status === "listening"
              ? "border-green-400/60"
              : "border-white/20"
          )}
          animate={
            status === "speaking"
              ? { scale: [1, 1.05, 1] }
              : {}
          }
          transition={
            status === "speaking"
              ? { duration: 1, repeat: Infinity, ease: easeInOut }
              : {}
          }
        >
          <Bot
            className={cn(
              "w-9 h-9",
              status === "speaking"
                ? "text-blue-400"
                : status === "listening"
                ? "text-green-400"
                : "text-slate-400"
            )}
          />
        </motion.div>
      </div>

      {/* Status Text */}
      <motion.span
        key={status}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("text-sm font-medium", statusColor[status])}
      >
        {statusText[status]}
      </motion.span>
    </div>
  );
}
