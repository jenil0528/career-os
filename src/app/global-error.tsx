"use client";

import ErrorBoundary from "@/components/shared/ErrorBoundary";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <ErrorBoundary>
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-strong rounded-2xl p-8 max-w-md text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Application Error
              </h2>
              <p className="text-slate-400 text-sm mb-2">
                {error.message || "An unexpected error occurred."}
              </p>
              {error.digest && (
                <p className="text-slate-600 text-xs mb-6 font-mono">
                  Error ID: {error.digest}
                </p>
              )}
              <button
                onClick={reset}
                className="px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
              >
                Try Again
              </button>
            </div>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
