"use client";

import React from "react";
import Image from "next/image";
import { useAudio } from "../../context/AudioContext";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Disc } from "lucide-react";

export default function FooterAudioPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    volume, 
    currentTime, 
    duration, 
    togglePlay, 
    changeVolume,
    seekTrack 
  } = useAudio();

  if (!currentTrack) return null;

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full border-t border-surface bg-accent/95 backdrop-blur-md px-6 py-4 animate-in slide-in-from-bottom duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* LEFT COLUMN: Track Info */}
        <div className="flex items-center gap-4 w-1/4">
          <div className="h-14 w-14 rounded bg-surface border border-zinc-800 flex items-center justify-center text-primary relative overflow-hidden group">
            {currentTrack.coverUrl ? (
              <Image 
                src={currentTrack.coverUrl} 
                alt={currentTrack.title} 
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <Disc className={`h-6 w-6 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            )}
          </div>
          <div className="truncate">
            <h4 className="text-sm font-semibold text-white truncate hover:text-primary cursor-pointer">{currentTrack.title}</h4>
            <p className="text-xs text-zinc-400 truncate">{currentTrack.producer}</p>
          </div>
        </div>

        {/* MIDDLE COLUMN: Controls and Timeline Progress Slider */}
        <div className="flex flex-col items-center gap-2 w-2/4 max-w-xl">
          <div className="flex items-center gap-6">
            <button className="text-zinc-400 hover:text-white transition transform active:scale-95">
              <SkipBack className="h-5 w-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-background font-bold hover:scale-105 transition transform active:scale-95 shadow-lg"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current text-background" />
              ) : (
                <Play className="h-5 w-5 fill-current text-background ml-0.5" />
              )}
            </button>
            <button className="text-zinc-400 hover:text-white transition transform active:scale-95">
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
          
          {/* Timeline Seek Bar Container */}
          <div className="flex w-full items-center gap-3 text-xs text-zinc-500 font-mono select-none">
            <span>{formatTime(currentTime)}</span>
            <div className="relative flex-1 group flex items-center">
              <input 
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={(e) => seekTrack(parseFloat(e.target.value))}
                className="w-full h-1 bg-surface rounded-full appearance-none cursor-pointer outline-none relative z-10 accent-transparent"
              />
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full pointer-events-none" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Volume */}
        <div className="flex items-center justify-end gap-3 w-1/4">
          <button 
            onClick={() => changeVolume(volume === 0 ? 0.8 : 0)}
            className="text-zinc-400 hover:text-white transition"
          >
            {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="w-20 h-1 bg-surface rounded-full appearance-none cursor-pointer accent-white hover:accent-primary transition-all"
          />
        </div>

      </div>
    </footer>
  );
}