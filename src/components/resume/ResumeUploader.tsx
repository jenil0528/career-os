"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, FileText, X, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ResumeAnalysis } from "@/types";

interface ResumeUploaderProps {
  onUpload: (analysis: ResumeAnalysis, fileName: string) => void;
  onLoading: (loading: boolean) => void;
}

export default function ResumeUploader({
  onUpload,
  onLoading,
}: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      setError("Please upload a PDF file");
    }
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const selectedFile = e.target.files?.[0];
      if (selectedFile && selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        setError("Please upload a PDF file");
      }
    },
    []
  );

  const handleRemoveFile = useCallback(() => {
    setFile(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);
    onLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      let customHeaders: Record<string, string> = {};
      try {
        const settings = JSON.parse(localStorage.getItem("careeros_settings") || "{}");
        if (settings.apiKey) customHeaders["x-user-api-key"] = settings.apiKey;
      } catch (e) { /* ignore */ }

      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
        headers: customHeaders,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Analysis failed");
      }

      const analysis: ResumeAnalysis = await response.json();
      onUpload(analysis, file.name);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to analyze resume"
      );
      onLoading(false);
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && inputRef.current?.click()}
        className={cn(
          "relative rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 cursor-pointer",
          isDragging
            ? "border-blue-400 bg-blue-500/10 scale-[1.02]"
            : file
            ? "border-green-500/50 bg-green-500/5"
            : "border-white/20 bg-white/5 hover:border-blue-400/50 hover:bg-blue-500/5"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center",
                  isDragging ? "bg-blue-500/20" : "bg-white/10"
                )}
              >
                <Upload
                  className={cn(
                    "w-8 h-8 transition-colors",
                    isDragging ? "text-blue-400" : "text-slate-400"
                  )}
                />
              </motion.div>
              <div>
                <p className="text-lg font-medium text-slate-200">
                  {isDragging
                    ? "Drop your resume here"
                    : "Drag & drop your resume"}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  or click to browse · PDF files only
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="file-info"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center justify-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-200 truncate max-w-[200px]">
                  {file.name}
                </p>
                <p className="text-xs text-slate-400">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-red-500/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-slate-400 hover:text-red-400" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-400 text-sm text-center mt-3"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Upload Button */}
      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 flex justify-center"
          >
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={cn(
                "btn-primary flex items-center gap-2 px-8 py-3 rounded-xl text-base font-semibold transition-all",
                isUploading && "opacity-80 cursor-not-allowed"
              )}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Analyze Resume
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
