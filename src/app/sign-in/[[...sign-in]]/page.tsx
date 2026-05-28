"use client";

import Link from "next/link";
import { SignInCompat as SignIn } from "@/lib/auth-shim";
import { BrainCircuit, CheckCircle2, BarChart3 } from "lucide-react";

export default function SignInPage() {
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Welcome back
            </p>
            <h1 className="mt-4 max-w-xl text-5xl font-bold tracking-tight text-white font-[family-name:var(--font-space-grotesk)]">
              Pick up your preparation where you left off.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">
              Return to your resume score, upcoming interview plan, and active roadmap
              without digging through scattered notes.
            </p>

            <div className="mt-10 rounded-2xl border border-white/10 glass p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <BarChart3 className="h-4 w-4 text-blue-400" />
                  Weekly progress
                </div>
                <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-400 border border-green-500/20">
                  +18%
                </span>
              </div>
              <div className="space-y-4">
                {[
                  ["Resume match", "78%", "w-[78%]"],
                  ["Mock score", "84%", "w-[84%]"],
                  ["Roadmap", "64%", "w-[64%]"],
                ].map(([label, value, width]) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between text-xs font-medium text-slate-400">
                      <span>{label}</span>
                      <span className="text-white">{value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5">
                      <div className={`h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 ${width}`} />
                    </div>
                  </div>
                ))}
              </div>
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

            <SignIn 
              path="/sign-in"
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
                  footerActionLink: "text-blue-400 hover:text-blue-300",
                  identityPreviewText: "text-slate-200",
                  identityPreviewEditButton: "text-blue-400 hover:text-blue-300",
                }
              }}
            />

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              Resume, interviews, and roadmap in one dashboard
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
