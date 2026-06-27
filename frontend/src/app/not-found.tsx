"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowLeft } from "lucide-react";

export default function GlobalNotFoundRoute() {
  return (
    <main className="mx-auto max-w-xl px-6 py-32 text-center animate-fade-in">
      <div className="bg-accent/20 border border-surface rounded-2xl p-8 flex flex-col items-center gap-4">
        
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <HelpCircle className="h-6 w-6" />
        </div>

        <h2 className="text-xl font-black text-white uppercase tracking-tight">
          404 - Route Unresolved
        </h2>
        
        <p className="text-zinc-400 text-xs font-medium max-w-sm leading-relaxed">
          The sonic directory endpoint you are attempting to query doesn't exist or has been securely migrated to a different server domain link.
        </p>

        <Link
          href="/"
          className="mt-2 px-5 py-2.5 bg-surface text-white hover:bg-zinc-800 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all active:scale-95 border border-surface/80"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-primary" />
          <span>Back to Main Catalog</span>
        </Link>

      </div>
    </main>
  );
}