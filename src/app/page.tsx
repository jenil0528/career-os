"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserCompat } from "@/lib/auth-shim";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  BrainCircuit,
  Menu,
  X,
} from "lucide-react";
import { useScroll, useSpring } from "motion/react";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import LatestJobs from "@/components/landing/LatestJobs";
import ResumePreview from "@/components/landing/ResumePreview";
import InterviewPreview from "@/components/landing/InterviewPreview";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

/* ===== FLOATING NAVBAR ===== */
function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Jobs", href: "#latest-jobs" },
    { label: "Resume", href: "#resume" },
    { label: "Interview", href: "#interview" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3"
          : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled
              ? "glass-nav shadow-2xl shadow-black/20"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 transition-transform group-hover:scale-110">
              <BrainCircuit className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-bold font-[family-name:var(--font-space-grotesk)] tracking-tight">
              <span className="gradient-text-nav">Career</span>
              <span className="text-white">OS</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-3/4 group-hover:left-[12.5%]" />
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/sign-in"
              className="hidden sm:block text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:scale-105"
            >
              Start Free
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 glass-nav rounded-2xl p-4 shadow-2xl shadow-black/30"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 border-t border-white/10 pt-3">
                <Link
                  href="/sign-in"
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

/* ===== CTA SECTION ===== */
function CTASection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            Ready to Start?
          </div>

          <h2 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] sm:text-4xl lg:text-6xl">
            <span className="text-white">Your Dream Career</span>
            <br />
            <span className="gradient-text-nav">Starts Here</span>
          </h2>

          <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Join thousands of students who&apos;ve already transformed their careers
            with AI-powered preparation. Get started in 30 seconds — no credit card required.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="group btn-primary inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold shadow-xl shadow-blue-500/20 transition-all hover:shadow-blue-500/30 hover:scale-105"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
            <Link
              href="#features"
              className="glass inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5"
            >
              Explore Features
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CinematicSplash({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Disable scroll while splashing
    document.body.style.overflow = "hidden";
    
    // Stage 1: Reveal the text slowly (0ms)
    const t1 = setTimeout(() => setStage(1), 100);
    // Stage 2: Zoom through text and fade out background (1800ms)
    const t2 = setTimeout(() => setStage(2), 2000);
    // Stage 3: Unmount entirely (2800ms)
    const t3 = setTimeout(() => {
      document.body.style.overflow = ""; // Restore scroll
      onComplete();
    }, 2800); 

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1, backgroundColor: "#020617" }}
      animate={{ 
        opacity: stage >= 2 ? 0 : 1,
        backgroundColor: stage >= 2 ? "rgba(2, 6, 23, 0)" : "rgba(2, 6, 23, 1)"
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none overflow-hidden"
    >
       {/* Background Grid Pattern */}
       <motion.div 
         animate={{ opacity: stage >= 2 ? 0 : 0.15 }} 
         transition={{ duration: 0.5 }}
         className="absolute inset-0 grid-pattern pointer-events-none" 
       />

       {/* The Massive Zoom-Through Typography */}
       <motion.div
         initial={{ scale: 0.3, opacity: 0, filter: "blur(20px)" }}
         animate={{ 
           scale: stage >= 2 ? 50 : 1, 
           opacity: stage >= 2 ? 0 : 1, 
           filter: stage >= 2 ? "blur(10px)" : "blur(0px)" 
         }}
         transition={{ 
           duration: stage >= 2 ? 1.0 : 1.8, 
           ease: stage >= 2 ? [0.64, 0, 0.78, 0] : [0.16, 1, 0.3, 1]
         }}
         className="relative z-10 flex flex-col items-center justify-center origin-center"
         style={{ transformOrigin: "55% 50%" }} // Aim the zoom roughly through the 'O'
       >
         <h1 className="text-6xl sm:text-[8rem] md:text-[12rem] lg:text-[15rem] font-black font-[family-name:var(--font-space-grotesk)] tracking-tighter leading-none flex items-center text-white select-none whitespace-nowrap">
           <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400 drop-shadow-2xl">
             CAREER
           </span>
           <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-600 drop-shadow-[0_0_40px_rgba(59,130,246,0.6)] ml-2 sm:ml-4">
             OS
           </span>
         </h1>
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: stage >= 2 ? 0 : (stage >= 1 ? 1 : 0), y: stage >= 2 ? 20 : 0 }}
           transition={{ duration: 0.8, delay: 0.5 }}
           className="absolute -bottom-16 text-sm font-mono text-blue-400/80 tracking-[0.3em] uppercase"
         >
           Initializing System
         </motion.div>
       </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const { isSignedIn, isLoaded } = useUserCompat();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // If user is logged in, don't show splash and immediately redirect to dashboard
    if (isLoaded && isSignedIn) {
      setShowSplash(false);
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Cinematic Reveal Splash */}
      {showSplash && <CinematicSplash onComplete={() => setShowSplash(false)} />}

      {/* Main Content wrapper - animates in after splash */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showSplash ? 0 : 1, y: showSplash ? 20 : 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-[100]"
          style={{ scaleX }}
        />
        <FloatingNav />
        <Hero />
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <Features />
        </motion.div>
        <LatestJobs />
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <ResumePreview />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <InterviewPreview />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <Testimonials />
        </motion.div>
        <CTASection />
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <FAQ />
        </motion.div>
        <Footer />
      </motion.div>
    </main>
  );
}
