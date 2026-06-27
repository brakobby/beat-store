"use client";

import React, { useState } from "react";
import BeatRowItem from "./BeatRowItem";
import LicenseSelectorModal from "./LicenseSelectorModal";
import { Track } from "../../services/beatService";
import { Music4 } from "lucide-react";

interface BeatCatalogTableProps {
  beats: Track[];
}

export default function BeatCatalogTable({ beats }: BeatCatalogTableProps) {
  const [selectedBeat, setSelectedBeat] = useState<Track | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenLicenseModal = (beat: Track) => {
    setSelectedBeat(beat);
    setIsModalOpen(true);
  };

  const handleCloseLicenseModal = () => {
    setIsModalOpen(false);
    setSelectedBeat(null);
  };

  // Zero-state handling: Fallback view when a user's search query returns nothing
  if (beats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-accent/10 border border-surface/40 rounded-xl text-center px-4 animate-fade-in">
        <div className="h-12 w-12 bg-surface/80 rounded-full flex items-center justify-center text-zinc-500 mb-4">
          <Music4 className="h-5 w-5" />
        </div>
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">No matching assets found</h3>
        <p className="text-zinc-500 text-xs font-medium mt-1 max-w-xs leading-relaxed">
          Try relaxing your BPM range constraints or selecting a different genre signature chip.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-background border border-surface/40 rounded-xl overflow-hidden shadow-xl animate-fade-in">
      
      {/* Desktop Column Labels Panel Header */}
      <div className="hidden md:flex items-center px-6 py-3.5 bg-accent/30 border-b border-surface text-[10px] font-black text-zinc-500 uppercase tracking-widest select-none">
        <div className="w-12 text-center">#</div>
        <div className="flex-1 pl-4">Track Title</div>
        <div className="w-32">Tempo</div>
        <div className="w-28">Key</div>
        <div className="w-36">Genre</div>
        <div className="w-48 text-right pr-4">Purchase Options</div>
      </div>

      {/* Synchronized Row Element Iteration Loop */}
      <div className="divide-y divide-surface/40 bg-background">
        {beats.map((beat, index) => (
          <BeatRowItem
            key={beat.id}
            beat={beat}
            index={index}
            onOpenLicense={() => handleOpenLicenseModal(beat)}
          />
        ))}
      </div>

      {/* Global Embedded Licensing Procurement Portal overlay */}
      <LicenseSelectorModal
        isOpen={isModalOpen}
        onClose={handleCloseLicenseModal}
        beat={selectedBeat}
      />
    </div>
  );
}