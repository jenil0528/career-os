"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserCompat } from "@/lib/auth-shim";
import { motion } from "motion/react";

export default function Home() {
  const { isLoaded, user } = useUserCompat();
  const router = useRouter();

  useEffect(() => {
    // Redirect if logged in
    if (isLoaded && user) {
      router.push("/dashboard");
    }
  }, [isLoaded, user, router]);

  // Premium Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const barAnim = {
    hidden: { scaleY: 0, originY: 1 },
    visible: { scaleY: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const barAnimH = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { scaleX: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <div className="antialiased min-h-screen flex flex-col font-body-md overflow-hidden relative bg-surface text-on-surface">
      <div className="flex flex-col flex-grow">
        {/* TopNavBar */}
        <nav className="w-full h-16 bg-surface/90 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-container-margin sticky top-0 z-50">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex items-center gap-density-spacious">
            <motion.span variants={fadeUp} className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
              CareerOS
            </motion.span>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex items-center gap-density-regular">
            <motion.div variants={fadeUp}>
              <Link href="/sign-in" className="hidden md:flex items-center justify-center px-density-spacious py-density-regular bg-transparent border border-outline-variant text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors">
                Sign In
              </Link>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link href="/sign-up" className="shimmer-btn flex items-center justify-center px-density-spacious py-density-regular bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity">
                Sign Up
              </Link>
            </motion.div>
          </motion.div>
        </nav>

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative pt-32 pb-24 px-container-margin md:px-32 border-b border-outline-variant overflow-hidden">
            <div className="absolute inset-0 grid-bg pointer-events-none"></div>
            
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={staggerContainer} 
              className="max-w-4xl relative z-10"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-density-regular py-density-compact bg-surface-container-highest border border-outline-variant mb-gutter">
                <span className="w-2 h-2 bg-[#10b981] animate-pulse"></span>
                <span className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider">
                  System v2.4 Active
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-headline-lg text-headline-lg text-primary mb-gutter max-w-3xl leading-tight">
                Executive Career Infrastructure.
              </motion.h1>
              <motion.p variants={fadeUp} className="font-body-lg text-body-lg text-on-surface-variant mb-container-margin max-w-2xl">
                Deploy AI-driven institutional precision to navigate executive transitions. CareerOS provides deterministic analysis, deep ATS integration, and strategic mapping for leadership ascension.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-density-spacious">
                <Link href="/sign-up" className="shimmer-btn flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity">
                  Initialize Profile
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
                <a href="#modules" className="flex items-center gap-2 px-6 py-3 bg-transparent border border-outline-variant text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors">
                  View System Specs
                </a>
              </motion.div>
            </motion.div>

            {/* Abstract Data Visualizer */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="mt-24 border border-outline-variant bg-surface-container-lowest p-density-regular flex flex-col md:flex-row gap-gutter"
            >
              <div className="flex-1 border border-outline-variant bg-surface p-density-spacious">
                <div className="flex justify-between items-center mb-density-spacious border-b border-outline-variant pb-density-compact">
                  <span className="font-mono-label text-mono-label text-on-surface-variant">MARKET_TRAJECTORY</span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">show_chart</span>
                </div>
                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={staggerContainer}
                  className="h-32 flex items-end gap-1 overflow-hidden"
                >
                  <motion.div variants={barAnim} className="w-full bg-surface-container-highest h-[20%]"></motion.div>
                  <motion.div variants={barAnim} className="w-full bg-surface-container-highest h-[35%]"></motion.div>
                  <motion.div variants={barAnim} className="w-full bg-surface-container-highest h-[50%]"></motion.div>
                  <motion.div variants={barAnim} className="w-full bg-surface-container-highest h-[45%]"></motion.div>
                  <motion.div variants={barAnim} className="w-full bg-primary h-[85%]"></motion.div>
                  <motion.div variants={barAnim} className="w-full bg-[#10b981] h-[100%]"></motion.div>
                </motion.div>
              </div>
              <div className="w-full md:w-64 border border-outline-variant bg-surface p-density-spacious flex flex-col justify-between telemetry-pulse">
                <div>
                  <span className="font-mono-label text-mono-label text-on-surface-variant block mb-1">PROBABILITY_SCORE</span>
                  <span className="font-headline-lg text-headline-lg text-primary">94.2%</span>
                </div>
                <div className="mt-density-spacious pt-density-spacious border-t border-outline-variant">
                  <span className="font-label-sm text-label-sm text-[#10b981] uppercase tracking-widest flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Optimized
                  </span>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Core Modules */}
          <section id="modules" className="py-24 px-container-margin md:px-32 border-b border-outline-variant bg-surface-container-lowest">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16">
              <h2 className="font-headline-md text-headline-md text-primary mb-2">Core Modules</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">Architectural components designed for deterministic career outcomes.</p>
            </motion.div>
            
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-outline-variant"
            >
              {/* Module 1 */}
              <motion.div variants={fadeUp} className="p-density-spacious border-b md:border-b-0 md:border-r border-outline-variant hover:bg-surface-container-low transition-all duration-300 transform group">
                <div className="w-10 h-10 bg-primary text-on-primary flex items-center justify-center mb-density-spacious transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined">document_scanner</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Deep ATS Analysis</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-density-spacious">Cryptographic extraction of keyword topologies from target job descriptions, ensuring baseline compliance with enterprise filtering systems.</p>
                <Link href="/dashboard/resume" className="font-label-md text-label-md text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                  Analyze Now <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </motion.div>
              {/* Module 2 */}
              <motion.div variants={fadeUp} className="p-density-spacious border-b md:border-b-0 md:border-r border-outline-variant hover:bg-surface-container-low transition-all duration-300 transform group">
                <div className="w-10 h-10 bg-surface-container-highest text-primary flex items-center justify-center mb-density-spacious transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined">model_training</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-2">High-Stakes Mocks</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-density-spacious">Simulated interrogation environments utilizing specialized LLMs trained on actual technical and behavioral executive interview transcripts.</p>
                <Link href="/dashboard/interview" className="font-label-md text-label-md text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                  Deploy Simulation <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </motion.div>
              {/* Module 3 */}
              <motion.div variants={fadeUp} className="p-density-spacious hover:bg-surface-container-low transition-all duration-300 transform group">
                <div className="w-10 h-10 bg-surface-container-highest text-primary flex items-center justify-center mb-density-spacious transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined">account_tree</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Dynamic Roadmaps</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-density-spacious">Algorithmic mapping of skill adjacencies required for vertical transition, prioritizing immediate actionable capability acquisition.</p>
                <Link href="/dashboard/roadmap" className="font-label-md text-label-md text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                  View Topology <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </motion.div>
            </motion.div>
          </section>

          {/* Executive Career Intelligence Dashboard */}
          <section className="py-24 px-container-margin md:px-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-12">
              <h2 className="font-headline-md text-headline-md text-primary mb-2">Executive Career Intelligence</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Real-time telemetry and deterministic career mapping for ID: USR-8942-X</p>
            </motion.div>

            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-12 gap-gutter"
            >
              {/* Left Panel */}
              <motion.div variants={fadeUp} className="lg:col-span-4 border border-outline-variant bg-surface flex flex-col">
                <div className="border-b border-outline-variant p-density-regular bg-surface-container flex justify-between items-center">
                  <span className="font-label-md text-label-md text-primary uppercase tracking-wider">Market Alignment</span>
                  <span className="font-mono-label text-mono-label text-on-surface-variant">RADAR_01</span>
                </div>
                <div className="p-density-spacious flex-grow flex items-center justify-center relative min-h-[300px]">
                  <div className="absolute inset-0 radar-grid opacity-20"></div>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative w-48 h-48 border border-outline-variant rounded-full flex items-center justify-center"
                  >
                    <div className="absolute w-32 h-32 border border-outline-variant rounded-full"></div>
                    <div className="absolute w-16 h-16 border border-outline-variant rounded-full"></div>
                    <div className="absolute w-full h-[1px] bg-outline-variant"></div>
                    <div className="absolute w-[1px] h-full bg-outline-variant"></div>
                    <svg className="absolute inset-0 w-full h-full transform rotate-45 scale-75 opacity-80" viewBox="0 0 100 100">
                      <motion.polygon 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        fill="#10b981" fillOpacity="0.2" points="50,10 90,50 50,90 10,50" stroke="#10b981" strokeWidth="2"
                      />
                      <circle cx="50" cy="10" fill="#10b981" r="2"></circle>
                      <circle cx="90" cy="50" fill="#10b981" r="2"></circle>
                      <circle cx="50" cy="90" fill="#10b981" r="2"></circle>
                      <circle cx="10" cy="50" fill="#10b981" r="2"></circle>
                    </svg>
                    <div className="absolute inset-0 border-2 border-[#10b981]/20 rounded-full animate-ping"></div>
                  </motion.div>
                  <div className="absolute bottom-4 left-4">
                    <span className="font-mono-label text-[10px] text-on-surface-variant block">COHORT_MEAN: 72.4</span>
                    <span className="font-mono-label text-[10px] text-[#10b981] block">CURRENT_SCORE: 88.1</span>
                  </div>
                </div>
                <div className="p-density-spacious border-t border-outline-variant bg-surface-container-lowest">
                  <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">Capability Delta</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant italic">Subject is 12.4% above median for Tier-1 CTO roles.</p>
                </div>
              </motion.div>

              {/* Right Panel */}
              <motion.div variants={fadeUp} className="lg:col-span-8 border border-outline-variant bg-surface-container-lowest flex flex-col">
                <div className="border-b border-outline-variant bg-surface p-density-regular flex justify-between items-center">
                  <span className="font-label-md text-label-md text-primary">Competency Matrix Telemetry</span>
                  <div className="flex gap-1 items-center">
                    <span className="font-mono-label text-[10px] text-on-surface-variant mr-2">LIVE_FEED</span>
                    <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="p-density-spacious">
                  <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-container-margin"
                  >
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-mono-label text-mono-label text-primary">STRATEGIC_PLAN</span>
                          <span className="font-mono-label text-mono-label">92%</span>
                        </div>
                        <div className="h-2 bg-surface-container-highest">
                          <motion.div variants={barAnimH} className="h-full bg-primary w-[92%]"></motion.div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-mono-label text-mono-label text-primary">TECH_OVERSIGHT</span>
                          <span className="font-mono-label text-mono-label">78%</span>
                        </div>
                        <div className="h-2 bg-surface-container-highest">
                          <motion.div variants={barAnimH} className="h-full bg-primary w-[78%]"></motion.div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-mono-label text-mono-label text-primary">P&amp;L_MGMT</span>
                          <span className="font-mono-label text-mono-label">88%</span>
                        </div>
                        <div className="h-2 bg-surface-container-highest">
                          <motion.div variants={barAnimH} className="h-full bg-primary w-[88%]"></motion.div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-mono-label text-mono-label text-primary">AI_INTEGRATION</span>
                          <span className="font-mono-label text-mono-label text-[#10b981]">64%</span>
                        </div>
                        <div className="h-2 bg-surface-container-highest">
                          <motion.div variants={barAnimH} className="h-full bg-[#10b981] w-[64%]"></motion.div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-mono-label text-mono-label text-primary">ORG_DYNAMICS</span>
                          <span className="font-mono-label text-mono-label">82%</span>
                        </div>
                        <div className="h-2 bg-surface-container-highest">
                          <motion.div variants={barAnimH} className="h-full bg-primary w-[82%]"></motion.div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-mono-label text-mono-label text-primary">VULNERABILITY_INDEX</span>
                          <span className="font-mono-label text-mono-label text-error">12%</span>
                        </div>
                        <div className="h-2 bg-surface-container-highest">
                          <motion.div variants={barAnimH} className="h-full bg-error w-[12%]"></motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <div className="mt-12 pt-density-spacious border-t border-outline-variant grid grid-cols-1 md:grid-cols-2 gap-gutter">
                    <motion.div variants={fadeUp}>
                      <h4 className="font-label-md text-label-md text-primary mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">psychology</span>
                        Cognitive Bias Audit
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                          <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></div>
                          Confirmation Bias: Low (v0.2)
                        </li>
                        <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                          <div className="w-1.5 h-1.5 bg-outline-variant rounded-full"></div>
                          Sunk Cost Fallacy: Trace detected
                        </li>
                      </ul>
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <h4 className="font-label-md text-label-md text-primary mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">bolt</span>
                        System Recommendations
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 font-body-sm text-body-sm text-on-surface-variant hover:translate-x-1 transition-transform cursor-default">
                          <span className="material-symbols-outlined text-[14px] text-primary mt-0.5">chevron_right</span>
                          Synthesize AI initiatives into narrative summary.
                        </li>
                        <li className="flex items-start gap-2 font-body-sm text-body-sm text-on-surface-variant hover:translate-x-1 transition-transform cursor-default">
                          <span className="material-symbols-outlined text-[14px] text-[#10b981] mt-0.5 animate-pulse">bolt</span>
                          Initiate high-stakes simulation for VP roles.
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </section>
        </main>

        <footer className="border-t border-outline-variant bg-surface py-12 px-container-margin text-center">
          <span className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-widest">CareerOS Systems © 2026</span>
        </footer>
      </div>
    </div>
  );
}
