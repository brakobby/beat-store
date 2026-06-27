"use client";

import React from "react";
import { useCurrency } from "../../context/CurrencyContext";
import { Play, Pause, ShoppingCart, Download } from "lucide-react";

// This structure matches what your database or admin portal will eventually output
interface Track {
  id: string;
  title: string;
  genre: string;
  bpm: number;
  scale: string;
  basePriceUSD: number; // Base rate stored in USD
  isFreeDownload?: boolean;
}

interface TrackRowProps {
  track: Track;
  isPlaying?: boolean;
  onPlayToggle?: () => void;
}

export default function TrackRow({ track, isPlaying = false, onPlayToggle }: TrackRowProps) {
  // Extract currency code, dynamic fetched conversion rates, and global state loader flag
  const { currency, rates, isLoadingRates } = useCurrency();

  // Mapping configuration for layout symbols and locale formatting parameters
  const currencyConfigs: Record<string, { symbol: string; locale: string }> = {
    USD: { symbol: "$", locale: "en-US" },
    EUR: { symbol: "€", locale: "de-DE" },
    GBP: { symbol: "£", locale: "en-GB" },
    GHS: { symbol: "GH₵", locale: "en-GH" },
    NGN: { symbol: "₦", locale: "en-NG" },
    ZAR: { symbol: "R", locale: "en-ZA" },
    KES: { symbol: "KSh", locale: "en-KE" },
    CAD: { symbol: "C$", locale: "en-CA" },
    AUD: { symbol: "A$", locale: "en-AU" },
  };

  const currentConfig = currencyConfigs[currency] || { symbol: "$", locale: "en-US" };

  // 1. Calculate dynamic converted exchange calculation safely
  const activeRate = rates && rates[currency] ? rates[currency] : 1;
  const targetConvertedPrice = track.basePriceUSD * activeRate;

  // 2. High-fidelity browser localization formatting engine
  const displayPrice = isLoadingRates 
    ? "..." 
    : new Intl.NumberFormat(currentConfig.locale, {
        style: "currency",
        currency: currency,
        currencyDisplay: "symbol",
        minimumFractionDigits: 2
      }).format(targetConvertedPrice);

  return (
    <div className="w-full bg-zinc-950/40 hover:bg-zinc-900/40 border border-zinc-900/60 rounded-xl px-4 py-3 flex items-center justify-between gap-4 transition-all duration-200 group select-none">
      
      {/* PLAY/PAUSE TRIGGER MECHANISM */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onPlayToggle}
          className="h-9 w-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary/40 transition-all focus:outline-none shrink-0"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 fill-current text-primary" />
          ) : (
            <Play className="h-4 w-4 fill-current ml-0.5" />
          )}
        </button>

        {/* METADATA BLOCK FRAME */}
        <div className="min-w-0">
          <h4 className="text-white font-bold text-xs truncate group-hover:text-primary transition-colors">
            {track.title}
          </h4>
          <div className="flex items-center gap-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mt-0.5">
            <span>{track.genre}</span>
            <span>•</span>
            <span>{track.bpm} BPM</span>
            <span>•</span>
            <span>{track.scale}</span>
          </div>
        </div>
      </div>

      {/* PRICE & INTERACTION INTERFACE BINDING */}
      <div className="flex items-center gap-4 shrink-0">
        
        {/* DYNAMIC CONVERTED PRICING TARGET BLOCK */}
        <div className="text-right">
          <span className="text-white font-black text-xs block tabular-nums">
            {displayPrice}
          </span>
          <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest block mt-0.5">
            {currency} Licensing
          </span>
        </div>

        {/* UTILITY ACTION TRIPPERS */}
        <div className="flex items-center gap-2">
          {track.isFreeDownload && (
            <button className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-900 text-zinc-400 hover:text-white transition-colors" title="Download Free Tagged Version">
              <Download className="h-3.5 w-3.5" />
            </button>
          )}
          
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-background font-bold text-[11px] transition-transform active:scale-95">
            <ShoppingCart className="h-3 w-3 fill-current" />
            <span>Buy</span>
          </button>
        </div>

      </div>

    </div>
  );
}