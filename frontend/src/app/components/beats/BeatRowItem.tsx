"use client";

import React, { useState } from "react";
import { Play, Pause, ShoppingCart, Heart, MessageSquare } from "lucide-react";
import { useAudio } from "../../context/AudioContext";

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

interface BeatRowItemProps {
  beat: Track;
  index: number;
  onOpenLicense: () => void;
}

export default function BeatRowItem({ beat, index, onOpenLicense }: BeatRowItemProps) {
  const { playTrack, currentTrack, isPlaying, togglePlay } = useAudio();
  const isCurrentTrack = currentTrack?.id === beat.id;
  
  // Local interaction states for a responsive UI feel
  const [isLiked, setIsLiked] = useState(false);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(beat);
    }
  };

  return (
    <div 
      className={`flex flex-col md:flex-row md:items-center px-6 py-4 transition-all duration-150 group cursor-pointer ${
        isCurrentTrack ? "bg-surface/40 border-l-4 border-primary md:pl-5" : "hover:bg-accent/80"
      }`}
      onClick={() => playTrack(beat)}
    >
      {/* Play/Pause Number Index */}
      <div className="hidden md:flex w-12 items-center justify-center text-sm font-semibold text-zinc-500 select-none">
        <button 
          onClick={handlePlayClick}
          className="text-zinc-400 hover:text-primary transition-colors focus:outline-none"
        >
          {isCurrentTrack && isPlaying ? (
            <Pause className="h-4 w-4 fill-current text-primary" />
          ) : isCurrentTrack ? (
            <Play className="h-4 w-4 fill-current text-primary" />
          ) : (
            <>
              <span className="group-hover:hidden">{String(index + 1).padStart(2, "0")}</span>
              <Play className="h-4 w-4 fill-current hidden group-hover:block text-primary" />
            </>
          )}
        </button>
      </div>

      {/* Track Info Block */}
      <div className="flex-1 flex items-center gap-4 min-w-0 mb-3 md:mb-0">
        {/* Cleaned up icon: outline/borders completely removed */}
        <div className="h-12 w-12 rounded bg-surface/60 flex items-center justify-center font-bold text-primary text-xs shrink-0 relative overflow-hidden select-none">
          🎵
        </div>
        
        {/* Inline Typography Flex Flow */}
        <div className="flex items-center gap-3 min-w-0 flex-wrap sm:flex-nowrap">
          <h3 className={`text-sm md:text-base font-bold truncate transition-colors ${isCurrentTrack ? "text-primary" : "text-white group-hover:text-primary"}`}>
            {beat.title}
          </h3>
          <span className="text-xs text-zinc-500 font-medium select-none shrink-0">
            by {beat.producer}
          </span>
          <div className="flex items-center gap-1.5 select-none overflow-hidden">
            {beat.tags.map((tag, tIdx) => (
              <span key={tIdx} className="text-[10px] font-semibold bg-surface/60 text-zinc-400 px-2 py-0.5 rounded border border-surface/40 whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* BPM Display */}
      <div className="w-32 text-xs md:text-sm font-medium text-zinc-400 mb-1 md:mb-0 flex md:block items-center gap-2">
        <span className="md:hidden text-[10px] font-bold text-zinc-600 uppercase w-16">BPM:</span>
        {beat.bpm} BPM
      </div>

      {/* Key Signature */}
      <div className="w-28 text-xs md:text-sm font-mono text-zinc-400 mb-1 md:mb-0 flex md:block items-center gap-2">
        <span className="md:hidden text-[10px] font-bold text-zinc-600 uppercase w-16">Key:</span>
        {beat.key}
      </div>

      {/* Musical Genre */}
      <div className="w-36 mb-4 md:mb-0 flex md:block items-center gap-2">
        <span className="md:hidden text-[10px] font-bold text-zinc-600 uppercase w-16">Genre:</span>
        <span className="text-xs font-semibold bg-surface text-primary/90 px-2.5 py-1 rounded-full border border-primary/10">
          {beat.genre}
        </span>
      </div>

      {/* Right-Side Actions Block: Likes, Comments, and Cart */}
      <div className="w-full md:w-48 flex items-center justify-between md:justify-end gap-4 shrink-0">
        
        {/* Social Utility Buttons Layout */}
        <div className="flex items-center gap-3.5 text-zinc-500">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`p-1 rounded transition-colors focus:outline-none ${
              isLiked ? "text-primary animate-heart-pop" : "hover:text-white"
            }`}
            title="Like Track"
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              alert("Comments coming soon in full production release!");
            }}
            className="p-1 rounded hover:text-white transition-colors focus:outline-none"
            title="View Comments"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
        </div>

        {/* Purchase Action CTA Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onOpenLicense();
          }}
          className="flex items-center justify-center gap-2 w-full md:w-auto bg-primary text-background text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg hover:scale-[1.03] active:scale-[0.98] hover:bg-primary-hover transition-all shadow-lg"
        >
          <ShoppingCart className="h-3.5 w-3.5 fill-current" />
          <span>$29.99</span>
        </button>
      </div>

    </div>
  );
}