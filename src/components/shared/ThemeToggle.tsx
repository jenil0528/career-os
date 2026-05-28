"use client";

import { useTheme } from "./ThemeProvider";
import { motion } from "motion/react";
import { Sparkles, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isCyber = theme === "cyber";

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center p-1 rounded-lg cursor-pointer transition-colors duration-500 shadow-inner",
        isCyber ? "bg-[#020617] border border-blue-500/30" : "bg-slate-200 border border-slate-300",
        className
      )}
      style={{ width: "180px", height: "36px" }}
      aria-label="Toggle theme mode"
    >
      {/* Sliding Thumb */}
      <motion.div
        className={cn(
          "absolute top-1 bottom-1 w-[85px] rounded-md shadow-sm",
          isCyber ? "bg-slate-800" : "bg-white"
        )}
        initial={false}
        animate={{
          x: isCyber ? 87 : 0,
          boxShadow: isCyber 
            ? "0 0 15px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)" 
            : "0 2px 8px rgba(0,0,0,0.1)"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 35,
          mass: 0.8
        }}
      />
      
      {/* Exec Option */}
      <div className="relative z-10 flex flex-1 items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap">
         <span className={cn(
           "transition-colors duration-300", 
           !isCyber ? "text-slate-800" : "text-slate-500"
         )}>
           <Briefcase className="w-3.5 h-3.5" />
         </span>
         <span className={cn(
           "transition-colors duration-300 mt-[1px]", 
           !isCyber ? "text-slate-800" : "text-slate-500"
         )}>
           Exec
         </span>
      </div>

      {/* Cyber Option */}
      <div className="relative z-10 flex flex-1 items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap">
         <span className={cn(
           "transition-colors duration-300", 
           isCyber ? "text-blue-400" : "text-slate-500"
         )}>
           <Sparkles className={cn("w-3.5 h-3.5", isCyber && "animate-pulse")} />
         </span>
         <span className={cn(
           "transition-colors duration-300 mt-[1px]", 
           isCyber ? "text-blue-400" : "text-slate-500"
         )}>
           Cyber
         </span>
      </div>
    </button>
  );
}
