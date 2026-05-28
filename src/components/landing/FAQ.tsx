"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is CareerOS and how does it work?",
    answer:
      "CareerOS is an AI-powered placement platform that helps students and job seekers ace interviews, optimize resumes, and build career roadmaps. Our AI analyzes your profile, provides personalized feedback, and simulates real interview scenarios to maximize your placement chances.",
  },
  {
    question: "Is CareerOS free to use?",
    answer:
      "CareerOS offers a generous free tier that includes basic resume analysis, limited mock interviews, and a starter skill roadmap. Premium plans unlock unlimited AI interviews, advanced ATS scoring, priority support, and detailed analytics for serious job seekers.",
  },
  {
    question: "How accurate is the AI Mock Interviewer?",
    answer:
      "Our AI interviewer is trained on thousands of real interview transcripts from top companies like Google, Amazon, and Microsoft. It adapts to your role, experience level, and target company, providing questions and feedback that closely mirror actual interview experiences.",
  },
  {
    question: "What ATS systems does the Resume Analyzer support?",
    answer:
      "Our resume analyzer is compatible with all major ATS platforms including Workday, Greenhouse, Lever, iCIMS, and Taleo. We continuously update our algorithms to match the latest ATS parsing requirements and scoring criteria.",
  },
  {
    question: "Can I use CareerOS for different job roles?",
    answer:
      "Absolutely! CareerOS supports a wide range of roles including software engineering, data science, product management, design, marketing, and more. The AI tailors its feedback, interview questions, and roadmaps based on your specific target role and industry.",
  },
  {
    question: "How is my data and resume information protected?",
    answer:
      "We take data privacy very seriously. All resumes and personal data are encrypted at rest and in transit using AES-256 encryption. We never share your data with third parties, and you can delete your account and all associated data at any time.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-white"
      >
        <span
          className={`text-sm font-medium sm:text-base ${
            isOpen ? "text-white" : "text-slate-300"
          }`}
        >
          {faq.question}
        </span>
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all ${
            isOpen
              ? "bg-blue-500/20 text-blue-400"
              : "bg-white/5 text-slate-500"
          }`}
        >
          {isOpen ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-12 text-sm leading-relaxed text-slate-400">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-400">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] sm:text-4xl">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Everything you need to know about CareerOS.
          </p>
        </motion.div>

        {/* FAQ Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong mt-12 overflow-hidden rounded-2xl px-6 sm:px-8"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
