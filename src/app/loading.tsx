"use client";

import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="min-h-[100svh] bg-background flex flex-col items-center justify-center px-4">
       {/* Premium Minimalist Loader */}
       <div className="w-full max-w-[280px] flex flex-col">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-1 mb-8"
          >
             <span className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-tight text-on-background">CAREER</span>
             <span className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-tight text-primary">OS</span>
          </motion.div>

          {/* Ultra-thin loading line */}
          <div className="h-[2px] w-full bg-outline-variant/30 overflow-hidden relative rounded-full">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-outline font-bold tracking-widest uppercase">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Loading Assets
            </motion.span>
            <motion.span
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
            >
              Wait
            </motion.span>
          </div>
       </div>
    </div>
  );
}
