"use client";

import React from "react";
import { Check, X, Shield, FileText, Radio, HelpCircle } from "lucide-react";

export default function LicensingPage() {
  const licenseTiers = [
    {
      name: "Basic Lease",
      price: "$29.99",
      description: "Perfect for upcoming artists starting out on SoundCloud and YouTube.",
      fileTypes: "MP3 Only",
      distribution: "Up to 10,000 Streams",
      radioRotations: "No Radio Airplay",
      musicVideos: "No Music Videos",
      exclusive: false,
    },
    {
      name: "Premium Lease",
      price: "$49.99",
      description: "The industry standard for commercial streaming releases and local distribution.",
      fileTypes: "WAV + MP3",
      distribution: "Up to 50,000 Streams",
      radioRotations: "2 Radio Stations Allowed",
      musicVideos: "1 Music Video Placement",
      exclusive: false,
      popular: true, // Visually pop this card
    },
    {
      name: "Exclusive Ownership",
      price: "$299.99",
      description: "Complete creative control. The track is fully yours and removed from the store.",
      fileTypes: "WAV + MP3 + Track Stems (Stems)",
      distribution: "Unlimited Streams",
      radioRotations: "Unlimited Airplay",
      musicVideos: "Unlimited Videos",
      exclusive: true,
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 flex-1 w-full mb-24 animate-fade-in">
      
      {/* Page Hero Header */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
          Transparent Terms
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-4 mb-4">
          LICENSING & usage rights
        </h1>
        <p className="text-zinc-400 text-sm md:text-base font-medium">
          Select the right tier to securely distribute your song. All licenses are issued instantly with clear, artist-first contracts.
        </p>
      </section>

      {/* Modern Card Matrices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
        {licenseTiers.map((tier, index) => (
          <div 
            key={index}
            className={`relative flex flex-col justify-between rounded-2xl p-6 md:p-8 transition-all border ${
              tier.popular 
                ? "bg-surface/30 border-primary shadow-2xl shadow-primary/5 scale-100 md:scale-[1.03]" 
                : "bg-accent/30 border-surface/80"
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase font-black bg-primary text-background px-3 py-1 rounded-full tracking-wider">
                Most Popular Choice
              </span>
            )}

            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wide mb-1">{tier.name}</h2>
              <p className="text-zinc-500 text-xs leading-relaxed mb-6 font-medium">{tier.description}</p>
              
              <div className="text-4xl font-black text-white mb-8 flex items-baseline gap-1">
                {tier.price}
                <span className="text-xs font-medium text-zinc-500 lowercase">/ flat fee</span>
              </div>

              {/* Rights Details Checklist */}
              <div className="space-y-4 border-t border-surface/60 pt-6 mb-8">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-zinc-500">Audio File Formats:</span>
                  <span className="text-white font-semibold">{tier.fileTypes}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-zinc-500">Commercial Audio Streams:</span>
                  <span className="text-white font-semibold">{tier.distribution}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-zinc-500">Radio Broadcasting:</span>
                  <span className="text-white font-semibold">{tier.radioRotations}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-zinc-500">Music Video Monetization:</span>
                  <span className="text-white font-semibold">{tier.musicVideos}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-zinc-500">100% Exclusive Ownership:</span>
                  <span>
                    {tier.exclusive ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <X className="h-4 w-4 text-zinc-600" />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <button className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              tier.popular 
                ? "bg-primary text-background hover:bg-primary-hover shadow-lg" 
                : "bg-surface text-white hover:bg-zinc-800"
            }`}>
              View Sample Contract
            </button>
          </div>
        ))}
      </div>

      {/* Short FAQ Section for Quick Trust Building */}
      <section className="max-w-4xl mx-auto rounded-2xl bg-accent/20 border border-surface p-6 md:p-10">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" /> Licensing Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
          <div>
            <h4 className="font-bold text-zinc-200 mb-1.5">What are Track Stems?</h4>
            <p className="text-zinc-400">Stems are individual audio channels exported separately (drums, bass, melodies, vocals). This gives your mix engineer absolute freedom to restructure the beat during studio sessions.</p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-200 mb-1.5">Can I publish onto Spotify/Apple Music with a lease?</h4>
            <p className="text-zinc-400">Yes! Non-exclusive leasing gives you the valid structural right to distribute streaming platforms via services like DistroKid or TuneCore up to your tier limits.</p>
          </div>
        </div>
      </section>

    </main>
  );
}