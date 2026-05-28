"use client";

import Link from "next/link";
import { SignUpCompat as SignUp } from "@/lib/auth-shim";
import { BrainCircuit, CheckCircle2, TrendingUp } from "lucide-react";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden border-r border-white/10 bg-slate-950 px-10 py-10 lg:flex lg:flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30" />
          
          <Link href="/" className="relative z-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] text-white">CareerOS</span>
          </Link>

          <div className="relative z-10 flex flex-1 flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-400">
              Join CareerOS
            </p>
            <h1 className="mt-4 max-w-xl text-5xl font-bold tracking-tight text-white font-[family-name:var(--font-space-grotesk)]">
              Your AI-powered path to the perfect role.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">
              Stop guessing what recruiters want. Let our AI tailor your resume, simulate interviews, and build your custom roadmap.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "AI resume optimization for ATS matching",
                "Real-time voice mock interviews with feedback",
                "Personalized step-by-step career roadmaps",
                "Application and progress tracking",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20">
                    <CheckCircle2 className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-sm text-slate-300 pt-0.5">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8 relative bg-[#0a0a0f]">
          <div className="absolute inset-0 aurora-bg opacity-30" />
          
          <div className="w-full max-w-md relative z-10 flex flex-col items-center">
            <Link href="/" className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">CareerOS</span>
            </Link>

            <SignUp 
              path="/sign-up"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl w-full max-w-full",
                  headerTitle: "text-white font-[family-name:var(--font-space-grotesk)] text-2xl",
                  headerSubtitle: "text-slate-400",
                  socialButtonsBlockButton: "border border-white/10 hover:bg-white/5 text-slate-200 transition-colors",
                  socialButtonsBlockButtonText: "font-semibold",
                  dividerLine: "bg-white/10",
                  dividerText: "text-slate-500",
                  formFieldLabel: "text-slate-300",
                  formFieldInput: "bg-black/50 border border-white/10 text-white rounded-lg focus:border-blue-500 transition-colors",
                  formButtonPrimary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none shadow-lg shadow-blue-500/20",
                  footerActionText: "text-slate-400",
                  footerActionLink: "text-purple-400 hover:text-purple-300",
                  identityPreviewText: "text-slate-200",
                  identityPreviewEditButton: "text-purple-400 hover:text-purple-300",
                }
              }}
            />

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              Join 10,000+ students landing jobs faster
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
