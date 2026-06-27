"use client";

import React from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { useAudio } from "../../context/AudioContext";

export default function FooterAudioPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    volume, 
    currentTime, 
    duration, 
    togglePlay, 
    seekTrack, 
    changeVolume, 
    nextTrack, 
    prevTrack 
  } = useAudio();

  if (!currentTrack) return null;

  // Utility function to format timestamps into readable MM:SS arrays
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekTrack(parseFloat(e.target.value));
  };

  const handleVolumeBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeVolume(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-0 inset-x-0 bg-background/95 backdrop-blur-md border-t border-surface px-6 py-4 z-50 flex items-center justify-between select-none animate-slide-up">
      
      {/* LEFT BLOCK: Track Metadata Layout */}
      <div className="flex items-center gap-3 w-1/4 min-w-0">
        <div className="h-10 w-10 bg-accent rounded flex items-center justify-center text-lg shadow-inner shrink-0">
          🎵
        </div>
        <div className="min-w-0 hidden sm:block">
          <h4 className="text-sm font-bold text-white truncate">{currentTrack.title}</h4>
          <p className="text-xs text-zinc-400 truncate">by {currentTrack.producer}</p>
        </div>
      </div>

      {/* CENTER BLOCK: Playback Controls & Interactive Timeline Scrubber */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-xl px-4">
        {/* Navigation Action Panel */}
        <div className="flex items-center gap-6">
          <button 
            onClick={prevTrack}
            className="text-zinc-400 hover:text-white transition-colors focus:outline-none"
            title="Previous Track"
          >
            <SkipBack className="h-4 w-4 fill-current" />
          </button>

          <button 
            onClick={togglePlay}
            className="p-3 bg-white text-background rounded-full hover:scale-105 active:scale-95 transition shadow-lg focus:outline-none"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 fill-current" />
            ) : (
              <Play className="h-4 w-4 fill-current ml-0.5" />
            )}
          </button>

          <button 
            onClick={nextTrack}
            className="text-zinc-400 hover:text-white transition-colors focus:outline-none"
            title="Next Track"
          >
            <SkipForward className="h-4 w-4 fill-current" />
          </button>
        </div>

        {/* Real-time Timeline Timeline Range Track Slider */}
        <div className="w-full flex items-center gap-3 text-[10px] font-mono text-zinc-400 font-semibold">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleProgressBarChange}
            className="w-full h-1 bg-surface rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT BLOCK: Hardware Volume Node Controller */}
      <div className="flex items-center justify-end gap-2 w-1/4 text-zinc-400 hidden md:flex">
        <Volume2 className="h-4 w-4 shrink-0" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeBarChange}
          className="w-20 h-1 bg-surface rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
        />
      </div>

    </div>
  );
}