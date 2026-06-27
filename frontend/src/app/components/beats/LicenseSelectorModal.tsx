"use client";

import React from "react";
import { X, Check, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Track } from "../../services/beatService";

interface LicenseSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  beat: Track | null;
}

export default function LicenseSelectorModal({ isOpen, onClose, beat }: LicenseSelectorModalProps) {
  const { addToCart } = useCart();

  if (!isOpen || !beat) return null;

  // Tiered license details structure
  const licenseTiers = [
    {
      id: "mp3_basic",
      name: "MP3 Lease",
      price: beat.price || 29.99, // Fallback to service price if available
      features: ["High-quality MP3 file", "Used for 1 commercial project", "Up to 100k streams", "100% Royalty-Free"],
    },
    {
      id: "wav_premium",
      name: "WAV Premium",
      price: (beat.price || 29.99) * 2, // Scaled premium rate
      features: ["24-bit WAV + MP3 files", "Used for 3 commercial projects", "Up to 500k streams", "100% Royalty-Free"],
      popular: true,
    },
    {
      id: "unlimited_trackout",
      name: "Unlimited Stems",
      price: (beat.price || 29.99) * 5, // Exclusive/stems package pricing
      features: ["Full Trackout/Stems + WAV", "Unlimited commercial projects", "Unlimited streams & video views", "100% Royalty-Free"],
    },
  ];

  const handleSelectLicense = (tierName: string, tierPrice: number) => {
    addToCart(beat, tierName, tierPrice);
    onClose(); // Automatically close the modal after adding to cart
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop blur overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container Canvas */}
      <div className="relative w-full max-w-4xl bg-background border border-surface/80 rounded-2xl p-6 md:p-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto scrollbar-none">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white p-2 rounded-lg bg-accent/30 hover:bg-accent border border-surface/50 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Top Meta Information Display */}
        <div className="mb-8 text-center sm:text-left">
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase bg-primary/10 px-2.5 py-1 rounded-full">
            Select Licensing Rights
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-3 uppercase tracking-tight">
            {beat.title}
          </h2>
          <p className="text-zinc-400 text-xs font-semibold mt-1">
            Produced by <span className="text-zinc-200">{beat.producer}</span> &bull; {beat.bpm} BPM &bull; Key: {beat.key}
          </p>
        </div>

        {/* License Pricing Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {licenseTiers.map((tier) => (
            <div 
              key={tier.id}
              className={`relative flex flex-col justify-between p-6 rounded-xl border transition-all ${
                tier.popular 
                  ? "bg-primary/[0.03] border-primary shadow-lg shadow-primary/5" 
                  : "bg-accent/20 border-surface/60 hover:border-zinc-700"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-background font-black text-[9px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-base font-bold text-white mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl font-black text-white">${tier.price.toFixed(2)}</span>
                  <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">USD</span>
                </div>

                <div className="h-px bg-surface/50 my-4" />

                {/* Features List */}
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-zinc-400 text-xs font-medium leading-tight">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Trigger Button */}
              <button
                onClick={() => handleSelectLicense(tier.name, tier.price)}
                className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                  tier.popular
                    ? "bg-primary text-background hover:bg-primary-hover shadow-md"
                    : "bg-accent border border-surface text-white hover:bg-surface"
                }`}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}