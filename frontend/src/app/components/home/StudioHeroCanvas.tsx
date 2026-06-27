"use client";

import React, { useState, useEffect } from "react";
import { Play, ShieldCheck, Flame, Disc } from "lucide-react";

export default function StudioHeroCanvas() {
  // Array of high-quality studio images to shuffle slowly in the background
  const studioPhotos = [
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop", // Studio console
    "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=1200&auto=format&fit=crop", // Studio monitors
    "https://images.unsplash.com/photo-1559732277-7453b141e3a1?q=80&w=1200&auto=format&fit=crop"  // Recording booth
  ];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Slow shuffling engine (changes photo every 7 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % studioPhotos.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [studioPhotos.length]);

  const handleScrollToCatalog = () => {
    const catalogElement = document.getElementById("catalog-section");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full relative min-h-[70vh] flex items-center justify-center overflow-hidden select-none border-b border-zinc-900 bg-black">
      
      {/* LAYER 1: Deep Background Image Slow Shuffler */}
      <div className="absolute inset-0 z-0">
        {studioPhotos.map((photo, index) => (
          <div
            key={photo}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2500ms] ease-in-out scale-105 motion-safe:animate-[pulse_20s_infinite]"
            style={{
              backgroundImage: `url(${photo})`,
              opacity: index === currentPhotoIndex ? 0.25 : 0,
            }}
          />
        ))}
      </div>

      {/* LAYER 2: Slow Motion Ambient Video Overlay */}
      {/* Replace the src with your own downloaded slow-mo MP4 file */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none mix-blend-screen"
        style={{ playbackRate: 0.5 }} // Forces slow motion playback safely
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-recording-studio-mixer-close-up-42241-large.mp4" type="video/mp4" />
      </video>

      {/* LAYER 3: Dark Vignette & Color Grading Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />

      {/* LAYER 4: Interactive Content Foreground */}
      <div className="max-w-4xl mx-auto text-center px-6 relative z-20 flex flex-col items-center gap-6 pt-12">
        
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/90 border border-zinc-800/80 text-[10px] font-black text-primary uppercase tracking-widest backdrop-blur-sm">
          <Flame className="h-3.5 w-3.5 fill-current animate-pulse" />
          <span>Premium West African Sonic Engines</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95] max-w-2xl drop-shadow-md">
          Elevate Your Sound. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-yellow-500">
            Own Your Masters.
          </span>
        </h1>

        <p className="text-sm md:text-base text-zinc-300 font-medium max-w-xl leading-relaxed drop-shadow">
          High-fidelity untagged instrumentals crafted for artists who refuse to compromise. Stream instantly, convert currency dynamically, and lock down secure distribution rights.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleScrollToCatalog}
            className="w-full sm:w-auto px-8 py-4 bg-primary text-background font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Explore Instrumentals</span>
          </button>

          <a
            href="/licensing-info"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900/80 text-zinc-300 border border-zinc-800 font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 hover:text-white backdrop-blur-sm transition-all"
          >
            <Disc className="h-4 w-4" />
            <span>View Rights Info</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-8 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-t border-zinc-900/60 w-full max-w-lg mt-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>Instant Digital Release</span>
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