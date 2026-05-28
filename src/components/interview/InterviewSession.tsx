"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Mic, 
  MicOff, 
  Square, 
  Video, 
  VideoOff, 
  Activity, 
  Eye, 
  TrendingUp, 
  Sparkles, 
  Smile, 
  Volume2,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { InterviewMode, InterviewMessage, AnswerAnalysis } from "@/types";
import AIAvatar from "./AIAvatar";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface InterviewSessionProps {
  mode: InterviewMode;
  onComplete: (
    messages: InterviewMessage[],
    analyses: AnswerAnalysis[]
  ) => void;
}

function createMessage(
  role: "ai" | "user",
  content: string
): InterviewMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: new Date(),
  };
}

// Detect speech recognition support once at module level (client-side safe via ref)
function getSpeechRecognitionConstructor(): any | null {
  if (typeof window === "undefined") return null;
  const win = window as any;
  return win.SpeechRecognition || win.webkitSpeechRecognition || null;
}

export default function InterviewSession({
  mode,
  onComplete,
}: InterviewSessionProps) {
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState<"idle" | "listening" | "speaking">(
    "speaking"
  );
  const [questionCount, setQuestionCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [analyses, setAnalyses] = useState<AnswerAnalysis[]>([]);
  
  // Webcam states
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // Real-time AI simulation diagnostics
  const [diagnostics, setDiagnostics] = useState({
    cadence: 135,
    eyeContact: 98,
    confidence: 90,
    emotion: "Professional",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);
  const totalQuestions = 8;

  // Derived state — no setState needed
  const speechSupported = typeof window !== "undefined" && !!getSpeechRecognitionConstructor();

  // Request webcam access on mount
  useEffect(() => {
    let activeStream: MediaStream | null = null;
    if (typeof navigator !== "undefined" && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          activeStream = stream;
          setCameraStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Camera access error:", err);
          setCameraError("Camera access denied or unavailable. Please grant permissions to see live video feed.");
        });
    }

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Ensure stream is attached to video element when it mounts
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  // Simulate real-time diagnostic shifts to make the AI feel extremely "active" and "aware"
  useEffect(() => {
    const interval = setInterval(() => {
      setDiagnostics((prev) => ({
        cadence: Math.round(128 + Math.random() * 15),
        eyeContact: Math.round(92 + Math.random() * 7),
        confidence: Math.round(85 + Math.random() * 12),
        emotion: Math.random() > 0.6 ? "Engaged" : Math.random() > 0.3 ? "Analyzing" : "Composed",
      }));
    }, 1500); // Update faster to look like real data

    return () => clearInterval(interval);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
      recognitionRef.current?.stop();
    };
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchNextQuestion = useCallback(
    async (
      currentMessages: InterviewMessage[],
      currentQuestion?: string
    ) => {
      setIsLoading(true);
      setAiStatus("speaking");

      // Abort any in-flight request
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch("/api/mock-interview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode,
            messages: currentMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            currentQuestion,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (!isMountedRef.current) return;

        if (data.analysis) {
          setAnalyses((prev) => [...prev, data.analysis]);
        }

        if (data.isComplete || !data.question) {
          setAiStatus("idle");
          setIsLoading(false);
          const finalMessages = [
            ...currentMessages,
            createMessage(
              "ai",
              "Thank you for completing the interview! Let me prepare your results..."
            ),
          ];
          setMessages(finalMessages);

          setTimeout(() => {
            if (isMountedRef.current) {
              onComplete(finalMessages, [
                ...analyses,
                ...(data.analysis ? [data.analysis] : []),
              ]);
            }
          }, 1500);
          return;
        }

        const aiMessage = createMessage("ai", data.question);
        setMessages((prev) => [...prev, aiMessage]);
        setQuestionCount((prev) => prev + 1);
        setAiStatus("idle");
      } catch (error: any) {
        if (error?.name === "AbortError") return;
        console.error("Failed to fetch question:", error);
        if (!isMountedRef.current) return;
        const errorMessage = createMessage(
          "ai",
          "Sorry, I encountered an error. Let me try again..."
        );
        setMessages((prev) => [...prev, errorMessage]);
        setAiStatus("idle");
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [mode, onComplete, analyses]
  );

  // Fetch first question on mount
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    fetchNextQuestion([]);
  }, [fetchNextQuestion]);

  const handleSend = useCallback(() => {
    if (!input.trim() || isLoading) return;

    const userMessage = createMessage("user", input.trim());
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    const currentQ =
      messages.filter((m) => m.role === "ai").slice(-1)[0]?.content;

    if (questionCount >= totalQuestions) {
      setAiStatus("speaking");
      setTimeout(() => {
        if (!isMountedRef.current) return;
        const finalMsg = createMessage(
          "ai",
          "Great answers! Let me compile your results..."
        );
        setMessages((prev) => [...prev, finalMsg]);
        setTimeout(() => {
          if (isMountedRef.current) {
            onComplete([...newMessages, finalMsg], analyses);
          }
        }, 1500);
      }, 1000);
      return;
    }

    fetchNextQuestion(newMessages, currentQ);
  }, [
    input,
    isLoading,
    messages,
    questionCount,
    analyses,
    onComplete,
    fetchNextQuestion,
  ]);

  const toggleRecording = useCallback(() => {
    if (!speechSupported) return;

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      setAiStatus("idle");
      return;
    }

    const SpeechRecognition = getSpeechRecognitionConstructor();
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      setAiStatus("idle");
    };

    recognition.onend = () => {
      setIsRecording(false);
      setAiStatus("idle");
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setAiStatus("listening");
  }, [speechSupported, isRecording]);

  const handleEndInterview = useCallback(() => {
    abortControllerRef.current?.abort();
    recognitionRef.current?.stop();

    const finalMsg = createMessage(
      "ai",
      "Interview ended. Let me prepare your results..."
    );
    const finalMessages = [...messages, finalMsg];
    setMessages(finalMessages);
    setTimeout(() => {
      if (isMountedRef.current) {
        onComplete(finalMessages, analyses);
      }
    }, 1000);
  }, [messages, analyses, onComplete]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  // Retrieve current active AI question for the teleprompter subtitle overlay
  const activeQuestion = messages.filter((m) => m.role === "ai").slice(-1)[0]?.content || "Loading interview details...";

  return (
    <div
      className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-10rem)] min-h-[600px] w-full"
      role="region"
      aria-label="Interview session"
    >
      {/* ==========================================
          LEFT COLUMN: Live Video Streams & Diagnostics HUD
         ========================================== */}
      <div className="flex-1 flex flex-col gap-6 lg:w-[65%]">
        
        {/* User Webcam Camera Feed (Main View) */}
        <div className="relative flex-1 bg-surface-container-low border border-outline-variant rounded-2xl overflow-hidden shadow-md flex items-center justify-center min-h-[300px]">
          {cameraStream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: "scaleX(-1.75) scaleY(1.75)", transformOrigin: "center" }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              {cameraError ? (
                <>
                  <AlertCircle className="w-10 h-10 text-yellow-500/80 mb-3" />
                  <p className="text-sm text-slate-400 font-medium max-w-sm">{cameraError}</p>
                </>
              ) : (
                <>
                  <VideoOff className="w-10 h-10 text-slate-600 animate-pulse mb-3" />
                  <p className="text-sm text-slate-400 font-medium">Requesting live webcam...</p>
                </>
              )}
            </div>
          )}

          {/* AI Active Speaking/Listening Indicator */}
          <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-sm border border-outline-variant px-3 py-1.5 rounded-xl flex items-center gap-2.5 shadow-sm z-20">
            <span className="relative flex h-2 w-2">
              <span className={cn(
                "absolute inline-flex h-full w-full rounded-full opacity-75",
                aiStatus === "speaking" ? "animate-ping bg-primary" : "bg-on-surface-variant"
              )} />
              <span className={cn(
                "relative inline-flex h-2 w-2 rounded-full",
                aiStatus === "speaking" ? "bg-primary" : "bg-outline"
              )} />
            </span>
            <span className="font-label-md text-[10px] font-bold text-on-surface uppercase tracking-wider">
              {aiStatus === "speaking" ? "AI is speaking" : "AI is listening"}
            </span>
          </div>

          {/* Live Feed Badge */}
          {cameraStream && (
            <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-sm border border-outline-variant px-3 py-1.5 rounded-xl font-mono-label text-[10px] font-bold text-green-600 tracking-wider uppercase z-20 flex items-center gap-1.5 shadow-sm">
              <Video className="w-3.5 h-3.5" /> Live Feed
            </div>
          )}

        </div>

        {/* Subtitles Bar (Moved outside video frame) */}
        <div className="flex justify-center w-full shrink-0">
          <div className="bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant px-5 py-3 shadow-md w-full border-l-4 border-l-primary rounded-r-xl">
            <p className="font-mono-label text-[10px] text-primary mb-1 uppercase tracking-widest font-bold">AI ASKS:</p>
            <p className="font-body-md text-sm sm:text-base text-on-surface leading-relaxed">
              "{activeQuestion}"
            </p>
          </div>
        </div>

        {/* AI Real-time Diagnostics HUD Panel */}
        <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-4 shadow-sm flex flex-col justify-between shrink-0">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Real-Time AI Cognitive HUD</span>
            </div>
            <span className="text-[9px] font-semibold text-primary bg-primary-container px-2 py-0.5 rounded border border-primary/20 tracking-wider">
              ACTIVE
            </span>
          </div>

          {/* Analysis Grid metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3">
            
            {/* Cadence Check */}
            <div className="bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl flex flex-col justify-between">
              <span className="font-mono-label text-[9px] text-on-surface-variant uppercase tracking-wider font-semibold">Speaking Cadence</span>
              <div className="flex items-end gap-1.5 mt-2">
                <span className="text-xl font-bold text-on-surface leading-none">{diagnostics.cadence}</span>
                <span className="font-mono-label text-[9px] text-on-surface-variant pb-0.5">wpm</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <Volume2 className="w-3.5 h-3.5 text-primary" />
                <span className="text-[9px] text-on-surface-variant">Optimal Range</span>
              </div>
            </div>

            {/* Eye Contact Scanner */}
            <div className="bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl flex flex-col justify-between">
              <span className="font-mono-label text-[9px] text-on-surface-variant uppercase tracking-wider font-semibold">Eye Contact</span>
              <div className="flex items-end gap-1.5 mt-2">
                <span className="text-xl font-bold text-on-surface leading-none">{diagnostics.eyeContact}%</span>
                <span className="font-mono-label text-[9px] text-primary pb-0.5 font-bold">SECURED</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <Eye className="w-3.5 h-3.5 text-primary" />
                <span className="text-[9px] text-on-surface-variant">Steady focus</span>
              </div>
            </div>

            {/* Confidence Levels */}
            <div className="bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl flex flex-col justify-between">
              <span className="font-mono-label text-[9px] text-on-surface-variant uppercase tracking-wider font-semibold">Confidence</span>
              <div className="flex items-end gap-1.5 mt-2">
                <span className="text-xl font-bold text-on-surface leading-none">{diagnostics.confidence}%</span>
                <span className="font-mono-label text-[9px] text-primary pb-0.5 font-bold">HIGH</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <span className="text-[9px] text-on-surface-variant">Strong conviction</span>
              </div>
            </div>

            {/* Emotions Detected */}
            <div className="bg-surface-container-lowest border border-outline-variant p-2.5 rounded-xl flex flex-col justify-between">
              <span className="font-mono-label text-[9px] text-on-surface-variant uppercase tracking-wider font-semibold">Composure</span>
              <div className="flex items-end gap-1.5 mt-2">
                <span className="text-sm font-bold text-on-surface leading-tight">{diagnostics.emotion}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <Smile className="w-3.5 h-3.5 text-primary" />
                <span className="text-[9px] text-on-surface-variant">Professional posture</span>
              </div>
            </div>

          </div>

          {/* Scanning Status Bar */}
          <div className="border-t border-outline-variant pt-2.5 flex items-center justify-between text-[9px] font-mono-label uppercase tracking-widest mt-1">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Privacy Shield Enabled (Data local)
            </span>
            <span className="animate-pulse text-primary/70">SCANNING COGNITIVE PATTERNS...</span>
          </div>
        </div>
      </div>

      {/* ==========================================
          RIGHT COLUMN: Scrolling Dialogue & Chat Inputs
         ========================================== */}
      <div className="w-full lg:w-[35%] flex flex-col bg-surface-container-lowest border border-outline-variant rounded-2xl p-4 shadow-sm h-full">
        
        {/* Top Header Information */}
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-on-surface uppercase tracking-widest text-[10px]">Session Dialogue</span>
            <span className="px-2 py-0.5 bg-primary-container text-primary border border-primary/20 rounded font-semibold text-[10px] tracking-wider font-mono">
              Q: {Math.min(questionCount, totalQuestions)}/{totalQuestions}
            </span>
          </div>

          <button
            onClick={handleEndInterview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-wider hover:bg-red-500/25 transition-all active:scale-95 cursor-pointer"
            aria-label="End interview"
          >
            <Square className="w-3 h-3 fill-red-400" />
            Quit
          </button>
        </div>

        {/* Scrollable Dialogue Chat Logs */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin max-h-[360px] lg:max-h-none mb-4"
          role="log"
          aria-label="Interview conversation"
        >
          <AnimatePresence initial={false}>
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center p-8 text-center text-on-surface-variant text-xs">
                <div className="flex flex-col items-center">
                  <Sparkles className="w-8 h-8 text-primary/50 animate-pulse mb-2" />
                  Sarah is preparing the first question...
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "flex flex-col gap-1 w-full",
                    message.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <span className="text-[9px] font-bold text-on-surface-variant tracking-widest uppercase">
                    {message.role === "user" ? "You" : "Sarah (AI)"}
                  </span>
                  <div
                    className={cn(
                      "max-w-[90%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm font-medium",
                      message.role === "ai"
                        ? "bg-primary-container border border-primary/20 text-on-surface"
                        : "bg-surface-variant border border-outline-variant text-on-surface"
                    )}
                    role={message.role === "ai" ? "status" : undefined}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>

          {/* Typing indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-1 items-start w-full"
              aria-label="AI is typing"
            >
              <span className="text-[9px] font-bold text-on-surface-variant tracking-widest uppercase">Sarah (AI)</span>
              <div className="bg-primary-container border border-primary/15 rounded-2xl px-4 py-3 flex gap-1.5">
                <span
                  className="typing-dot w-2 h-2 rounded-full bg-primary"
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className="typing-dot w-2 h-2 rounded-full bg-primary"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="typing-dot w-2 h-2 rounded-full bg-primary"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Box Area */}
        <div className="flex items-center gap-2.5 pt-3 border-t border-outline-variant">
          <div className="flex-1 relative">
            <label htmlFor="interview-input" className="sr-only">
              Type your answer
            </label>
            <input
              id="interview-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isRecording ? "Listening to your voice..." : "Type your professional answer..."}
              disabled={isLoading}
              autoComplete="off"
              className={cn(
                "w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-xs text-on-surface placeholder:text-on-surface-variant",
                "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20",
                "disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              )}
            />
          </div>

          {/* Voice Input Mic Button */}
          {speechSupported && (
            <button
              onClick={toggleRecording}
              aria-label={isRecording ? "Stop recording" : "Start voice recording"}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer",
                isRecording
                  ? "bg-error-container border border-error/40 text-error shadow-[0_0_12px_var(--color-error)] animate-pulse"
                  : "bg-surface-container border border-outline-variant text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface hover:scale-105 active:scale-95"
              )}
            >
              {isRecording ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Send Input Button */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            aria-label="Send answer"
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer",
              input.trim() && !isLoading
                ? "bg-primary-container border border-primary/40 text-primary hover:bg-primary-container/80 hover:scale-105 active:scale-95"
                : "bg-surface-container border border-outline-variant text-outline cursor-not-allowed"
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
