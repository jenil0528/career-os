"use client";

import Link from "next/link";
import { SignUpCompat as SignUp } from "@/lib/auth-shim";
import { dark } from "@clerk/themes";
import { motion } from "motion/react";

export default function SignUpPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface flex flex-col items-center justify-center relative overflow-hidden font-body-md py-12">
      {/* Background Grid & Telemetry */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      
      <div className="absolute inset-0 pointer-events-none font-mono-label text-[10px] text-outline opacity-20 overflow-hidden">
        <div className="absolute top-10 left-10 telemetry-flicker" style={{ animationDuration: "1.2s" }}>AUTH_GATEWAY::0x4F92A</div>
        <div className="absolute bottom-1/4 left-1/4 telemetry-flicker" style={{ animationDuration: "2.1s" }}>HANDSHAKE::SECURE</div>
        <div className="absolute top-1/4 right-20 telemetry-flicker" style={{ animationDuration: "0.8s" }}>VERIFYING_CREDENTIALS</div>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md px-6 flex flex-col items-center"
      >
        {/* Logo / Header */}
        <motion.div variants={fadeUp} className="w-full">
          <Link href="/" className="mb-8 flex flex-col items-center justify-center gap-4 group">
            <div className="flex h-16 w-16 items-center justify-center border-4 border-primary bg-surface shadow-[6px_6px_0px_0px_#10b981] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[4px_4px_0px_0px_#10b981] transition-all">
              <span className="material-symbols-outlined text-[32px] text-primary">terminal</span>
            </div>
            <span className="text-4xl font-black font-headline-md tracking-tight text-primary">CareerOS</span>
          </Link>
        </motion.div>
        
        <motion.div variants={fadeUp} className="w-full mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border-2 border-outline-variant shadow-[4px_4px_0px_0px_#10b981]">
            <span className="w-2 h-2 bg-[#10b981] animate-pulse"></span>
            <span className="font-mono-label text-mono-label text-primary uppercase tracking-widest">
              Profile Initialization
            </span>
          </div>
        </motion.div>

        {/* Clerk Sign Up component styled to match */}
        <motion.div variants={fadeUp} className="w-full">
          <div className="p-1 bg-surface border-2 border-outline-variant shadow-[8px_8px_0px_0px_#10b981]">
            <SignUp 
              path="/sign-up"
              appearance={{
                baseTheme: dark,
                variables: {
                  colorPrimary: "#10b981",
                  colorBackground: "transparent",
                  colorText: "#ffffff",
                  colorTextSecondary: "#94a3b8",
                  colorInputBackground: "transparent",
                  colorInputText: "#ffffff",
                },
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent border-none shadow-none w-full max-w-full p-8",
                  headerTitle: "font-headline-md text-white text-2xl font-bold uppercase tracking-wide",
                  headerSubtitle: "font-body-sm text-on-surface-variant mt-2",
                  socialButtonsBlockButton: "border-2 border-outline-variant hover:bg-surface-container bg-surface-container-lowest text-white rounded-none transition-all hover:-translate-y-0.5",
                  socialButtonsBlockButtonText: "font-label-md text-white font-bold",
                  dividerLine: "bg-outline-variant",
                  dividerText: "font-mono-label text-on-surface-variant px-4 bg-transparent",
                  formFieldLabel: "font-label-sm text-on-surface-variant uppercase tracking-wider mb-2",
                  formFieldInput: "bg-surface-container-lowest border-2 border-outline-variant text-white rounded-none focus:border-primary focus:ring-0 transition-colors p-3 font-mono-label h-12",
                  formButtonPrimary: "bg-primary hover:bg-primary/90 text-on-primary font-label-md font-bold uppercase tracking-wider rounded-none border-none py-3 mt-4 h-12 transition-all hover:-translate-y-0.5",
                  footerActionText: "font-body-sm text-on-surface-variant",
                  footerActionLink: "font-label-md text-primary font-bold hover:underline",
                  identityPreviewText: "font-mono-label text-white",
                  identityPreviewEditButton: "text-primary hover:text-white",
                  formFieldInputShowPasswordButton: "text-on-surface-variant hover:text-white",
                }
              }}
            />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-12 pt-6 border-t border-outline-variant w-full text-center">
          <span className="font-mono-label text-[10px] text-on-surface-variant uppercase tracking-widest">
            CareerOS Systems © 2026
          </span>
        </motion.div>
      </motion.div>
    </main>
  );
}
