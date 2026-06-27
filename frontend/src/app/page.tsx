"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAudio } from "./context/AudioContext"; 
import { Search, SlidersHorizontal, Loader2, RotateCcw } from "lucide-react";
import BeatCatalogTable from "./components/beats/BeatCatalogTable";
import SearchFilters from "./components/beats/SearchFilters";
import StudioHeroCanvas from "./components/home/StudioHeroCanvas"; // IMPORT THE NEW CINEMATIC CANVAS
import { fetchBeatsFromBackend, Track } from "./services/beatService";

export default function HomePage() {
  const { changeActivePlaylist } = useAudio();
  const [beats, setBeats] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  
  // Advanced Filter States
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedKey, setSelectedKey] = useState("All");
  const [maxBpm, setMaxBpm] = useState(180);

  // Fetch the data from the decoupled service layer
  useEffect(() => {
    async function loadCatalog() {
      try {
        setIsLoading(true);
        const data = await fetchBeatsFromBackend();
        setBeats(data);
      } catch (error) {
        console.error("Failed to pull dynamic catalog data from backend server:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCatalog();
  }, []);

  // Multi-tier filtration engine tracking text query, genre chips, keys, and BPM
  const filteredBeats = useMemo(() => {
    return beats.filter(beat => {
      const matchesSearch = 
        beat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beat.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesGenre = selectedGenre === "All" || beat.genre === selectedGenre;
      const matchesKey = selectedKey === "All" || beat.key.toLowerCase().includes(selectedKey.toLowerCase());
      const matchesBpm = parseInt(beat.bpm) <= maxBpm;

      return matchesSearch && matchesGenre && matchesKey && matchesBpm;
    });
  }, [searchQuery, selectedGenre, selectedKey, maxBpm, beats]);

  const beatsSignature = JSON.stringify(filteredBeats);

  useEffect(() => {
    if (filteredBeats.length > 0) {
      changeActivePlaylist(filteredBeats);
    }
  }, [beatsSignature, changeActivePlaylist, filteredBeats]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
    setSelectedKey("All");
    setMaxBpm(180);
  };

  return (
    <div className="w-full bg-background min-h-screen flex flex-col">
      
      {/* Flagship Cinematic Background Shuffler and Slow-Mo Video Module Layer */}
      <StudioHeroCanvas />

      {/* Main Content Container Section with Anchor Point ID Hook */}
      <main 
        id="catalog-section" 
        className="mx-auto max-w-7xl px-6 py-16 flex-1 w-full mb-24 select-none scroll-mt-20"
      >
        
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
          
          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-semibold transition w-full md:w-auto justify-center ${
              showAdvanced 
                ? "bg-primary/10 border-primary text-primary" 
                : "bg-accent border-surface text-zinc-300 hover:text-white hover:bg-surface"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Advanced Filters</span>
          </button>
        </div>

        {/* Collapsible Expandable Advanced Filter Drawer Area */}
        {showAdvanced && (
          <div className="p-6 mb-6 rounded-xl bg-accent/30 border border-surface/60 grid grid-cols-1 md:grid-cols-3 gap-6 items-end animate-fade-in">
            {/* Key Selection Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Musical Key</label>
              <select 
                value={selectedKey} 
                onChange={(e) => setSelectedKey(e.target.value)}
                className="w-full bg-background border border-surface/80 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-primary"
              >
                <option value="All">Any Key Signature</option>
                <option value="Min">Minor Keys Only</option>
                <option value="Maj">Major Keys Only</option>
              </select>
            </div>

            {/* BPM Slider Control */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
                <span>Maximum tempo</span>
                <span className="text-primary font-mono">{maxBpm} BPM</span>
              </div>
              <input 
                type="range" 
                min="60" 
                max="180" 
                value={maxBpm}
                onChange={(e) => setMaxBpm(parseInt(e.target.value))}
                className="w-full accent-primary bg-background h-2 rounded-lg cursor-pointer" 
              />
            </div>

            {/* Reset Action Area */}
            <button 
              onClick={resetFilters}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface hover:bg-zinc-800 text-xs font-bold text-zinc-300 hover:text-white transition w-full"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Criteria</span>
            </button>
          </div>
        )}

        {/* Instant Action Filter Chips */}
        <SearchFilters activeGenre={selectedGenre} onGenreChange={setSelectedGenre} />

        {/* Conditional Rendering State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-zinc-500 text-sm bg-accent/10 border border-surface/40 rounded-xl">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="font-medium tracking-wide text-zinc-400">Syncing live catalog with server items...</span>
          </div>
        ) : (
          <BeatCatalogTable beats={filteredBeats} />
        )}

      </main>
    </div>
  );
}