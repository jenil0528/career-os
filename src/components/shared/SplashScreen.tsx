"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let hasSeenSplash: string | null = null;
    try {
      hasSeenSplash = sessionStorage.getItem("careeros-splash-seen");
    } catch {
      hasSeenSplash = null;
    }
    
    if (hasSeenSplash) {
      const hideSplash = window.setTimeout(() => setShow(false), 0);
      return () => window.clearTimeout(hideSplash);
    }

    document.body.style.overflow = "hidden";

    const duration = 1500; 
    const intervalTime = 15;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setShow(false);
          document.body.style.overflow = "";
          try {
            sessionStorage.setItem("careeros-splash-seen", "true");
          } catch {}
        }, 800);
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
          }}
          className="fixed inset-0 z-[9999] bg-surface-container-lowest text-on-surface flex flex-col items-center justify-center overflow-hidden font-body-md"
        >
          {/* Executive Terminal Background */}
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
          
          <div className="absolute inset-0 pointer-events-none font-mono-label text-[10px] text-outline opacity-20 overflow-hidden">
            <div className="absolute top-10 left-10 telemetry-flicker" style={{ animationDuration: "1.2s" }}>SYS_BOOT::0x4F92A</div>
            <div className="absolute bottom-1/4 left-1/4 telemetry-flicker" style={{ animationDuration: "2.1s" }}>HANDSHAKE::SECURE</div>
            <div className="absolute top-1/4 right-20 telemetry-flicker" style={{ animationDuration: "0.8s" }}>LOADING_ASSETS</div>
          </div>

          <div className="relative z-10 w-full max-w-md px-8 text-center flex flex-col items-center">
            {/* Logo / Header */}
            <div className="mb-10 flex items-center justify-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center border-2 border-primary bg-surface relative">
                <div className="absolute top-1 left-1 w-full h-full bg-outline-variant -z-10 translate-x-1 translate-y-1"></div>
                <span className="material-symbols-outlined text-[28px] text-primary">terminal</span>
              </div>
            </div>
            
            <div className="mb-6">
              <span className="font-loading font-extrabold text-5xl tracking-tighter text-primary">
                CareerOS
              </span>
              <div className="mt-4 flex items-center justify-center">
                <div className="inline-flex items-center gap-2 px-density-regular py-density-compact bg-surface-container-highest border border-outline-variant">
                  <span className="w-2 h-2 bg-[#10b981] animate-pulse"></span>
                  <span className="font-mono-label text-[10px] tracking-[0.2em] text-on-surface-variant uppercase">
                    System V2.4 Initializing...
                  </span>
                </div>
              </div>
            </div>

            {/* Brutalist Progress Bar */}
            <div className="w-full mt-6">
              <div className="h-2 w-full bg-surface-container-highest border border-outline-variant relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-primary transition-all duration-[25ms] ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="mt-4 flex justify-between items-center font-mono-label text-[10px] text-outline uppercase tracking-wider">
                <span>Loading Core Modules</span>
                <span className="text-primary font-bold">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
