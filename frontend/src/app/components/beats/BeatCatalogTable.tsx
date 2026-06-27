"use client";

import React, { useState } from "react";
import BeatRowItem from "./BeatRowItem";
import LicenseSelectorModal from "../cart/LicenseSelectorModal";

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

interface BeatCatalogTableProps {
  beats: Track[];
}

export default function BeatCatalogTable({ beats }: BeatCatalogTableProps) {
  // Track which beat is currently selected for license purchasing
  const [selectedBeat, setSelectedBeat] = useState<Track | null>(null);

  return (
    <div className="bg-accent/30 rounded-xl border border-surface overflow-hidden shadow-2xl">
      {/* Desktop Column Header Headers Row */}
      <div className="hidden md:flex items-center px-6 py-4 border-b border-surface text-xs font-bold uppercase tracking-wider text-zinc-500 select-none">
        <div className="w-12 text-center">#</div>
        <div className="flex-1">Title</div>
        <div className="w-32">Time / BPM</div>
        <div className="w-28">Key</div>
        <div className="w-40">Genre</div>
        <div className="w-32 text-right">Action</div>
      </div>

      {/* Rows Container mapping child atoms */}
      <div className="divide-y divide-surface/60">
        {beats.length > 0 ? (
          beats.map((beat, index) => (
            <BeatRowItem 
              key={beat.id} 
              beat={beat} 
              index={index} 
              onOpenLicense={() => setSelectedBeat(beat)} 
            />
          ))
        ) : (
          <div className="text-center py-12 px-4 text-zinc-500 text-sm">
            No matching production track templates found in KWACI&apos;s catalog.
          </div>
        )}
      </div>

      {/* Global License Selector Portal Overlay */}
      <LicenseSelectorModal 
        isOpen={selectedBeat !== null} 
        onClose={() => setSelectedBeat(null)} 
        beat={selectedBeat} 
      />
    </div>
  );
}