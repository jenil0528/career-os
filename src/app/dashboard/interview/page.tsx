"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, ArrowLeft } from "lucide-react";
import type { InterviewMode, InterviewMessage, AnswerAnalysis, InterviewResult } from "@/types";
import { DEMO_INTERVIEW_RESULT } from "@/lib/demo-data";
import InterviewSetup from "@/components/interview/InterviewSetup";
import InterviewSession from "@/components/interview/InterviewSession";
import InterviewResults from "@/components/interview/InterviewResults";
import Link from "next/link";
import { useAuthCompat as useAuth } from "@/lib/auth-shim";
import { getAuthenticatedSupabaseClient } from "@/lib/supabase";

type PageState = "setup" | "session" | "results";

export default function InterviewPage() {
  const { getToken, userId } = useAuth();
  const [pageState, setPageState] = useState<PageState>("setup");
  const [selectedMode, setSelectedMode] = useState<InterviewMode | null>(null);
  const [result, setResult] = useState<InterviewResult | null>(null);

  const handleStartInterview = () => {
    if (!selectedMode) return;
    setPageState("session");
  };

  const handleInterviewComplete = (
    messages: InterviewMessage[],
    analyses: AnswerAnalysis[]
  ) => {
    // Compute result from analyses
    const avgConfidence =
      analyses.length > 0
        ? Math.round(
            analyses.reduce((sum, a) => sum + a.confidenceScore, 0) /
              analyses.length
          )
        : DEMO_INTERVIEW_RESULT.confidenceScore;

    const avgCommunication =
      analyses.length > 0
        ? Math.round(
            analyses.reduce((sum, a) => sum + a.communicationScore, 0) /
              analyses.length
          )
        : DEMO_INTERVIEW_RESULT.communicationScore;

    const avgTechnical =
      analyses.length > 0
        ? Math.round(
            analyses.reduce((sum, a) => sum + a.technicalScore, 0) /
              analyses.length
          )
        : DEMO_INTERVIEW_RESULT.technicalScore;

    const overallScore = Math.round(
      (avgConfidence + avgCommunication + avgTechnical) / 3
    );

    // Build detailed feedback from messages
    const aiMessages = messages.filter((m) => m.role === "ai");
    const userMessages = messages.filter((m) => m.role === "user");

    const detailedFeedback = aiMessages
      .slice(0, -1) // exclude final "preparing results" message
      .map((aiMsg, i) => ({
        question: aiMsg.content,
        answer: userMessages[i]?.content || "No answer provided",
        score: analyses[i]
          ? Math.round(
              (analyses[i].confidenceScore +
                analyses[i].communicationScore +
                analyses[i].technicalScore) /
                3
            )
          : 70,
        feedback: analyses[i]?.feedback || "Good response.",
      }))
      .filter((f) => f.answer !== "No answer provided");

    const computedResult: InterviewResult = {
      overallScore,
      communicationScore: avgCommunication,
      confidenceScore: avgConfidence,
      technicalScore: avgTechnical,
      totalQuestions: detailedFeedback.length,
      duration: Math.round(
        (Date.now() -
          (messages[0]?.timestamp
            ? new Date(messages[0].timestamp).getTime()
            : Date.now())) /
          1000
      ),
      strengths:
        analyses.length > 0
          ? [
              avgCommunication >= 75
                ? "Strong communication skills"
                : "Clear articulation of thoughts",
              avgConfidence >= 75
                ? "Confident delivery"
                : "Good composure under pressure",
              avgTechnical >= 75
                ? "Solid technical knowledge"
                : "Demonstrates learning mindset",
              "Professional tone throughout",
            ]
          : DEMO_INTERVIEW_RESULT.strengths,
      improvements:
        analyses.length > 0
          ? [
              avgCommunication < 80
                ? "Elaborate more with specific examples"
                : "Keep up the strong communication",
              avgConfidence < 80
                ? "Reduce filler words and speak with more conviction"
                : "Maintain your confident delivery",
              avgTechnical < 80
                ? "Provide more technical depth in answers"
                : "Continue demonstrating technical expertise",
              "Ask more questions about the role and company",
            ]
          : DEMO_INTERVIEW_RESULT.improvements,
      detailedFeedback:
        detailedFeedback.length > 0
          ? detailedFeedback
          : DEMO_INTERVIEW_RESULT.detailedFeedback,
    };

    setResult(computedResult);
    setPageState("results");

    // Save to database
    if (userId) {
      getToken({ template: "supabase" }).then(async (token) => {
        if (!token) return;
        try {
          const supabase = getAuthenticatedSupabaseClient(token);
          await supabase.from("interviews").insert({
            user_id: userId,
            company: "Target Company",
            role: selectedMode,
            stage: "Practice Mock",
            overall_score: overallScore,
            confidence_score: avgConfidence,
            technical_score: avgTechnical,
            communication_score: avgCommunication,
            feedback_json: { detailedFeedback },
          });
        } catch (error) {
          console.error("Failed to save interview:", error);
        }
      });
    }
  };

  const handleReset = () => {
    setPageState("setup");
    setSelectedMode(null);
    setResult(null);
  };

  return (
    <div className="min-h-full flex-1 flex flex-col w-full relative overflow-hidden">

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-3"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-on-surface">
              AI Mock Interviewer
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-on-surface-variant max-w-2xl"
          >
            Practice with realistic AI interviews tailored to your target role.
            Get real-time feedback on communication, confidence, and technical depth.
          </motion.p>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Setup State */}
          {pageState === "setup" && (
            <motion.div
              key="setup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InterviewSetup
                selectedMode={selectedMode}
                onSelectMode={setSelectedMode}
                onStart={handleStartInterview}
              />
            </motion.div>
          )}

          {/* Session State */}
          {pageState === "session" && selectedMode && (
            <motion.div
              key="session"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm"
            >
              <InterviewSession
                mode={selectedMode}
                onComplete={handleInterviewComplete}
              />
            </motion.div>
          )}

          {/* Results State */}
          {pageState === "results" && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InterviewResults result={result} onRetry={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
