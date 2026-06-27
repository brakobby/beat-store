"use client";

import React from "react";
import { Award, Play, ExternalLink, Headphones, Flame } from "lucide-react";

export default function PlacementsPage() {
  const placements = [
    {
      id: "p1",
      trackTitle: "Gold Digging",
      artist: "Kofi Drill",
      streams: "1.2M+ Streams",
      type: "Official Single",
      imageUrl: "🎵",
      link: "#",
      trending: true,
    },
    {
      id: "p2",
      trackTitle: "Midnight Vibes",
      artist: "Ama Ama",
      streams: "450K Streams",
      type: "EP Track",
      imageUrl: "🎹",
      link: "#",
    },
    {
      id: "p3",
      trackTitle: "Asante Warrior",
      artist: "Street Anthem Crew",
      streams: "800K+ Views",
      type: "Music Video",
      imageUrl: "🔥",
      link: "#",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 flex-1 w-full mb-24 animate-fade-in select-none">
      
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 flex items-center gap-2 w-fit mx-auto">
          <Award className="h-3.5 w-3.5" /> Industry Track Record
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-4 mb-4 uppercase">
          Artist Placements
        </h1>
        <p className="text-zinc-400 text-sm md:text-base font-medium">
          Hear how artists and creators worldwide are scaling charts and digital platforms using KWACI production blueprints.
        </p>
      </section>

      {/* Grid Portfolio Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {placements.map((placement) => (
          <div 
            key={placement.id}
            className="group relative rounded-2xl bg-accent/20 border border-surface/60 overflow-hidden hover:border-primary/50 transition-all flex flex-col justify-between"
          >
            {placement.trending && (
              <span className="absolute top-4 left-4 z-10 flex items-center gap-1 text-[10px] uppercase font-black bg-primary text-background px-2.5 py-1 rounded-full tracking-wider shadow-md">
                <Flame className="h-3 w-3 fill-current" /> Trending
              </span>
            )}

            {/* Simulated Artwork Container */}
            <div className="h-48 bg-gradient-to-br from-surface to-accent/40 flex items-center justify-center text-4xl relative group">
              <span className="transition-transform group-hover:scale-110 duration-300">{placement.imageUrl}</span>
              
              {/* Hover Overlay Action */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="p-3 bg-primary text-background rounded-full transform translate-y-2 group-hover:translate-y-0 transition-all shadow-xl">
                  <Play className="h-5 w-5 fill-current" />
                </button>
              </div>
            </div>

            {/* Metadata Text Details */}
            <div className="p-6">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                {placement.type}
              </span>
              <h3 className="text-lg font-black text-white mt-1 group-hover:text-primary transition-colors truncate">
                {placement.trackTitle}
              </h3>
              <p className="text-sm font-medium text-zinc-400 mt-0.5">
                by {placement.artist}
              </p>

              <div className="h-px bg-surface/50 my-4" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
                  <Headphones className="h-3.5 w-3.5 text-primary" />
                  <span>{placement.streams}</span>
                </div>
                
                <a 
                  href={placement.link}
                  className="flex items-center gap-1 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Listen</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}