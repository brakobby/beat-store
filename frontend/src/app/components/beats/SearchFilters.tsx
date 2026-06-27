"use client";

import React from "react";

interface SearchFiltersProps {
  activeGenre: string;
  onGenreChange: (genre: string) => void;
}

export default function SearchFilters({ activeGenre, onGenreChange }: SearchFiltersProps) {
  // Production chip categories matching the keys in your seed beatService layer
  const genres = ["All", "Afrobeats", "Asakaa / Drill", "Amapiano", "Highlife", "Trap"];

  return (
    <div className="w-full mb-8">
      {/* Horizontal Scroll Wrapper with hidden scrollbar styling */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x">
        {genres.map((genre) => {
          const isActive = activeGenre === genre;
          return (
            <button
              key={genre}
              type="button"
              onClick={() => onGenreChange(genre)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-150 snap-誠 focus:outline-none whitespace-nowrap active:scale-[0.97] border ${
                isActive
                  ? "bg-primary text-background border-primary shadow-md shadow-primary/10"
                  : "bg-accent/40 text-zinc-400 border-surface/60 hover:text-white hover:bg-surface hover:border-zinc-700"
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
}