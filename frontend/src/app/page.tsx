"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAudio } from "./context/AudioContext"; 
import { Search, SlidersHorizontal } from "lucide-react";
import BeatCatalogTable from "./components/beats/BeatCatalogTable";
import SearchFilters from "./components/beats/SearchFilters";

export default function HomePage() {
  const { changeActivePlaylist } = useAudio();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const mockBeats = useMemo(() => [
    { 
      id: "1", 
      title: "Oil In My Head", 
      producer: "KWACI", 
      bpm: "140", 
      key: "A Min", 
      genre: "Afrobeat",
      tags: ["Melodic", "Banger", "Guitar"],
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
    },
    { 
      id: "2", 
      title: "Asante Culture Jam", 
      producer: "KWACI", 
      bpm: "112", 
      key: "F Maj", 
      genre: "Asakaa / Drill",
      tags: ["Hard", "Cultural", "Brass"],
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
    },
    { 
      id: "3", 
      title: "Trap Anthem 2027", 
      producer: "KWACI", 
      bpm: "160", 
      key: "C# Min", 
      genre: "Trap",
      tags: ["Dark", "808 Heavy", "Aggressive"],
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" 
    }
  ], []);

  // Dual filtration engine tracking query input AND filter chip triggers
  const filteredBeats = useMemo(() => {
    return mockBeats.filter(beat => {
      const matchesSearch = 
        beat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beat.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesGenre = selectedGenre === "All" || beat.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre, mockBeats]);

  const beatsSignature = JSON.stringify(filteredBeats);

  useEffect(() => {
    changeActivePlaylist(filteredBeats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beatsSignature, changeActivePlaylist]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 flex-1 w-full mb-24">
      
      <section className="mb-16 text-center py-12 md:py-20 rounded-2xl bg-gradient-to-b from-accent/50 to-transparent border border-surface/30">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white">
          DISCOVER PREMIUM <span className="text-primary font-serif italic">SONIC ASSETS</span>
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base font-medium">
          License high-fidelity production tracks created globally by KWACI. Ready for immediate commercial streaming use.
        </p>
      </section>

      {/* Input Search Controls Layout */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input 
            type="text"
            placeholder="Search beat titles or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-accent pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 border border-surface/50 focus:border-primary focus:outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 rounded-lg bg-accent border border-surface text-sm font-semibold text-zinc-300 hover:text-white hover:bg-surface transition w-full md:w-auto justify-center">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Advanced Filters</span>
        </button>
      </div>

      {/* Instant Action Filter Chips */}
      <SearchFilters activeGenre={selectedGenre} onGenreChange={setSelectedGenre} />

      {/* The Beats Display Catalog */}
      <BeatCatalogTable beats={filteredBeats} />

    </main>
  );
}