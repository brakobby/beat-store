"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the exact internal exception signature straight to your monitoring dashboards (Sentry, LogRocket, etc.)
    console.error("PRODUCTION RUNTIME EXCEPTION CAPTURED BY ROOT BOUNDARY:", error);
  }, [error]);

  return (
    <main className="mx-auto max-w-xl px-6 py-32 text-center animate-fade-in">
      <div className="bg-red-500/[0.03] border border-red-500/20 rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl shadow-red-500/[0.02]">
        
        <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
          <AlertCircle className="h-6 w-6" />
        </div>

        <h2 className="text-xl font-black text-white uppercase tracking-tight">
          Application Interface Disrupted
        </h2>
        
        <p className="text-zinc-400 text-xs font-medium max-w-sm leading-relaxed">
          A secure streaming pipeline node or state engine encountered an unexpected error context. No card tokens or basket inventories have been modified.
        </p>

        <button
          onClick={() => reset()}
          className="mt-2 px-5 py-2.5 bg-white text-background hover:bg-zinc-200 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all active:scale-95"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reload Application Node</span>
        </button>

      </div>
    </main>
  );
}