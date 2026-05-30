"use client";

import { useTheme } from "./ThemeProvider";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "cyber";

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center p-1 rounded-full cursor-pointer transition-colors duration-500 shadow-inner overflow-hidden",
        isDark ? "bg-slate-800 border border-slate-700" : "bg-slate-200 border border-slate-300",
        className
      )}
      style={{ width: "64px", height: "32px" }}
      aria-label="Toggle theme mode"
    >
      {/* Sliding Thumb */}
      <motion.div
        className={cn(
          "absolute top-[3px] bottom-[3px] w-[24px] rounded-full shadow-md z-10 flex items-center justify-center",
          isDark ? "bg-blue-500" : "bg-white"
        )}
        initial={false}
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          mass: 1
        }}
      >
        {/* Icon inside thumb */}
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 360 : 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-white" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500" />
          )}
        </motion.div>
      </motion.div>
      
      {/* Background Icons (visible when thumb slides away) */}
      <div className="relative z-0 flex w-full justify-between px-2">
         <Sun className={cn("w-3.5 h-3.5 transition-opacity duration-300", isDark ? "opacity-50 text-slate-400" : "opacity-0")} />
         <Moon className={cn("w-3.5 h-3.5 transition-opacity duration-300", !isDark ? "opacity-50 text-slate-500" : "opacity-0")} />
      </div>
    </button>
  );
}
