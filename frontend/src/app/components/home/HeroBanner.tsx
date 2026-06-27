"use client";

import React from "react";
import { Play, ShieldCheck, Flame, Disc } from "lucide-react";

export default function HeroBanner() {
  const handleScrollToCatalog = () => {
    // Smoothly shifts focus onto your main beats search filter module anchor point
    const catalogElement = document.getElementById("catalog-section");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full relative py-20 md:py-28 overflow-hidden select-none animate-fade-in border-b border-zinc-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-background to-background">
      
      {/* Visual Ambient Background Node Enhancements */}
      <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-orange-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10 flex flex-col items-center gap-6">
        
        {/* Sub-header Brand Badge Node */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">
          <Flame className="h-3.5 w-3.5 fill-current" />
          <span>Premium West African Sonic Engines</span>
        </div>

        {/* Master Heading Block Accent Title */}
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95] max-w-2xl">
          Elevate Your Sound. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-yellow-500">
            Own Your Masters.
          </span>
        </h1>

        {/* Descriptive Pitch Layout Text Subtitle */}
        <p className="text-sm md:text-base text-zinc-400 font-medium max-w-xl leading-relaxed">
          High-fidelity, industry-standard untagged instrumentals crafted for artists who refuse to compromise. Stream instantly, convert currency dynamically, and secure licensing rights under bulletproof contract frameworks.
        </p>

        {/* Core Direct Action Trigger Panel */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleScrollToCatalog}
            className="w-full sm:w-auto px-8 py-4 bg-primary text-background font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/10"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Explore Instrumentals</span>
          </button>

          <a
            href="/licensing-info"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-zinc-300 border border-zinc-800 font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <Disc className="h-4 w-4" />
            <span>View Rights Info</span>
          </a>
        </div>

        {/* Micro Credential Trust Matrix Footer */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-8 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-t border-zinc-900/60 w-full max-w-lg mt-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>Instant Digital Audio Release</span>
          </div>
          <span className="hidden sm:inline text-zinc-800">•</span>
          <div>100% Royalty-Free Options</div>
          <span className="hidden sm:inline text-zinc-800">•</span>
          <div>Secure Paystack Gateways</div>
        </div>

      </div>
    </section>
  );
}