"use client";

import React from "react";
import { X, Check, ShoppingCart, ShieldCheck } from "lucide-react";

interface Track {
  id: string;
  title: string;
  producer: string;
  bpm: string;
  key: string;
  genre: string;
  tags: string[];
  audioUrl: string;
}

interface LicenseSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  beat: Track | null;
}

export default function LicenseSelectorModal({ isOpen, onClose, beat }: LicenseSelectorModalProps) {
  if (!isOpen || !beat) return null;

  const tiers = [
    {
      name: "Basic Lease",
      price: 29.99,
      features: ["MP3 file format", "10,000 Audio Streams", "Non-Exclusive rights", "DistroKid distribution allowed"],
      highlight: false,
    },
    {
      name: "Premium Lease",
      price: 49.99,
      features: ["WAV + MP3 file formats", "50,000 Audio Streams", "Non-Exclusive rights", "1 Music Video placement"],
      highlight: true, // Visually highlight the recommended choice
    },
    {
      name: "Exclusive Ownership",
      price: 299.99,
      features: ["Full Track Stems / Stems", "Unlimited Audio Streams", "100% Exclusive ownership rights", "Profitable commercial usage"],
      highlight: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop Click Dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card Layout */}
      <div className="relative w-full max-w-4xl bg-accent/90 border border-surface/80 rounded-2xl p-6 md:p-8 shadow-2xl z-10 flex flex-col max-h-[90vh] overflow-y-auto">
        
        {/* Header Block */}
        <div className="flex items-start justify-between mb-6 border-b border-surface pb-4">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Select License Type
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white truncate">
              {beat.title} <span className="text-zinc-500 font-normal text-sm">by {beat.producer}</span>
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-surface/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tiers Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          {tiers.map((tier, idx) => (
            <div 
              key={idx}
              className={`flex flex-col justify-between rounded-xl p-5 border transition-all ${
                tier.highlight 
                  ? "bg-surface/40 border-primary shadow-xl shadow-primary/5 scale-100 md:scale-[1.02]" 
                  : "bg-accent/40 border-surface hover:border-zinc-700"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">{tier.name}</h3>
                  {tier.highlight && (
                    <span className="text-[10px] uppercase font-black bg-primary text-background px-2 py-0.5 rounded-full">
                      Best Value
                    </span>
                  )}
                </div>
                <div className="text-2xl font-black text-white mb-4">
                  <span className="text-sm font-semibold text-primary">$</span>{tier.price}
                </div>
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => alert(`Added ${beat.title} (${tier.name}) to cart!`)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                  tier.highlight
                    ? "bg-primary text-background hover:bg-primary-hover hover:scale-[1.02]"
                    : "bg-surface text-white hover:bg-zinc-800"
                }`}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>Select License</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}