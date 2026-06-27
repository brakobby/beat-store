"use client";

import React from "react";

interface SearchFiltersProps {
  activeGenre: string;
  onGenreChange: (genre: string) => void;
}

export default function SearchFilters({ activeGenre, onGenreChange }: SearchFiltersProps) {
  // Production focus categories matching your specialized sonic assets
  const genres = ["All", "Afrobeat", "Amapiano", "Trap", "Asakaa / Drill", "Dancehall"];

  return (
    <div className="w-full flex flex-wrap items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
      {genres.map((genre) => {
        const isActive = activeGenre === genre;
        return (
          <button
            key={genre}
            onClick={() => onGenreChange(genre)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide border transition-all duration-200 select-none whitespace-nowrap ${
              isActive
                ? "bg-primary text-background border-primary shadow-lg shadow-primary/10 scale-105"
                : "bg-accent/40 border-surface/80 text-zinc-400 hover:text-white hover:border-zinc-600"
            }`}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}