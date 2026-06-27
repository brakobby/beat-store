"use client";

import React from "react";
import { Check, X, FileText, Star, Zap, Crown } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";

interface LicenseTier {
  id: string;
  name: string;
  icon: React.ReactNode;
  priceUSD: number;
  popular: boolean;
  features: { text: string; included: boolean }[];
}

export default function LicenseTermsGrid() {
  const { convertPrice } = useCurrency();

  const tiers: LicenseTier[] = [
    {
      id: "basic",
      name: "Basic MP3 Lease",
      icon: <Zap className="h-5 w-5 text-zinc-400" />,
      priceUSD: 29.99,
      popular: false,
      features: [
        { text: "High-Quality Tag-Free MP3", included: true },
        { text: "Distribute to Spotify & Apple Music", included: true },
        { text: "Up to 10,000 Commercial Streams", included: true },
        { text: "Music Video Rights Included", included: true },
        { text: "Trackout Audio Stems (WAV)", included: false },
        { text: "Full Exclusive Ownership", included: false },
      ],
    },
    {
      id: "premium",
      name: "Premium WAV + Stems",
      icon: <Star className="h-5 w-5 text-primary" />,
      priceUSD: 49.99,
      popular: true,
      features: [
        { text: "High-Quality Tag-Free MP3 + WAV", included: true },
        { text: "Distribute to Spotify & Apple Music", included: true },
        { text: "Up to 100,000 Commercial Streams", included: true },
        { text: "Music Video Rights Included", included: true },
        { text: "Trackout Audio Stems (WAV)", included: true },
        { text: "Full Exclusive Ownership", included: false },
      ],
    },
    {
      id: "exclusive",
      name: "Exclusive Ownership",
      icon: <Crown className="h-5 w-5 text-yellow-500" />,
      priceUSD: 399.99,
      popular: false,
      features: [
        { text: "All Master Files + Stems Included", included: true },
        { text: "Distribute to Spotify & Apple Music", included: true },
        { text: "Unlimited Commercial Streams", included: true },
        { text: "Music Video Rights Included", included: true },
        { text: "Trackout Audio Stems (WAV)", included: true },
        { text: "Full Exclusive Ownership (Beat Removed From Store)", included: true },
      ],
    },
  ];

  return (
    <section className="w-full py-12 select-none animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center justify-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Licensing Rights Options
        </h2>
        <p className="text-xs text-zinc-500 font-medium mt-1">
          Select the license that fits your current release and promotional budget.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative rounded-2xl p-6 flex flex-col justify-between border transition-all duration-200 ${
              tier.popular
                ? "bg-zinc-900/40 border-primary/50 shadow-xl shadow-primary/[0.02]"
                : "bg-zinc-950/20 border-zinc-800/80"
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-background text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                Most Popular Choice
              </span>
            )}

            <div>
              {/* Header block */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  {tier.name}
                </h3>
                {tier.icon}
              </div>

              {/* Converted Dynamic Price */}
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-black text-white tracking-tight">
                  {convertPrice(tier.priceUSD)}
                </span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  / single release
                </span>
              </div>

              {/* Features loop list */}
              <ul className="space-y-3 border-t border-zinc-900 pt-5 mb-8">
                {tier.features.map((feat, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs font-medium">
                    {feat.included ? (
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-3.5 w-3.5 text-zinc-600 shrink-0 mt-0.5" />
                    )}
                    <span className={feat.included ? "text-zinc-300" : "text-zinc-600 dynamic-cross"}>
                      {feat.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}