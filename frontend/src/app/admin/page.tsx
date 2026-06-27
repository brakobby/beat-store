"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle, Music, Disc, Activity, Key, DollarSign, Loader2, Edit2, Trash2 } from "lucide-react";
import { fetchBeatsFromBackend, Track } from "../services/beatService"; // Ensure correct relative import path

export default function AdminDashboard() {
  const [beats, setBeats] = useState<Track[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    genre: "Afrobeats",
    bpm: "",
    key: "A Minor",
    basePriceUSD: "29.99",
    tags: "",
  });

  const genres = ["Afrobeats", "Asakaa", "Amapiano", "Dancehall", "Trap", "Afro Drill"];
  const keys = [
    "A Minor", "A Major", "A# Minor", "A# Major", "B Minor", "B Major",
    "C Minor", "C Major", "C# Minor", "C# Major", "D Minor", "D Major",
    "D# Minor", "D# Major", "E Minor", "E Major", "F Minor", "F Major",
    "F# Minor", "F# Major", "G Minor", "G Major", "G# Minor", "G# Major"
  ];

  const loadCatalog = async () => {
    try {
      setIsLoadingCatalog(true);
      const data = await fetchBeatsFromBackend();
      setBeats(data);
    } catch (error) {
      console.error("Failed to load catalog for editing feed:", error);
    } finally {
      setIsLoadingCatalog(false);
    }
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  const startEdit = (track: Track) => {
    setEditingId(track.id);
    setFormData({
      title: track.title,
      genre: track.genre,
      bpm: track.bpm.toString(),
      key: track.key,
      basePriceUSD: track.basePriceUSD?.toString() || "29.99",
      tags: track.tags ? track.tags.join(", ") : "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", genre: "Afrobeats", bpm: "", key: "A Minor", basePriceUSD: "29.99", tags: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      
      const cleanedTags = formData.tags
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter((t) => t.length > 0);

      const payload = {
        ...formData,
        bpm: parseInt(formData.bpm) || 120,
        basePriceUSD: parseFloat(formData.basePriceUSD) || 29.99,
        tags: cleanedTags,
      };

      // UPDATED ENDPOINTS: Clean semantic REST architecture paths
      const url = editingId ? `/api/beats/${editingId}` : "/api/beats";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(editingId ? "✏️ Beat modified and updated live!" : "💥 Beat deployed to live user feed!");
        cancelEdit();
        loadCatalog(); 
      } else {
        alert("Server communication error. Check network routes.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you completely sure you want to scrub this instrumental permanently from the repository?")) return;
    
    try {
      // UPDATED ENDPOINT: Targets the precise standard dynamic parameter path
      const response = await fetch(`/api/beats/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("🗑️ Beat permanently deleted.");
        loadCatalog();
      } else {
        alert("Deletion failed.");
      }
    } catch (error) {
      console.error("Delete operation failure:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-primary selection:text-black">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER BRAND BLOCK */}
        <div className="border-b border-zinc-900 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-wider">HQ Engine Control</h1>
            <p className="text-zinc-500 text-xs mt-1">Centralized configuration controls for live inventory</p>
          </div>
          <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20 font-black uppercase tracking-widest">
            Root Admin Portal
          </span>
        </div>

        {/* DASHBOARD LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: DEPLOYMENT/EDIT FORM CONTAINER */}
          <form onSubmit={handleSubmit} className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-5 sticky top-28">
            <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
              <PlusCircle className="h-3.5 w-3.5 text-primary" /> 
              {editingId ? "Modify Existing Instrumental Ledger" : "Manifest New Instrumental"}
            </h3>

            {/* TRACK TITLE */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5"><Music className="h-3 w-3" /> Track Title</label>
              <input
                type="text"
                required
                placeholder="e.g., Kumasi Heavyweight"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-black border border-zinc-900 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary transition-colors font-medium"
              />
            </div>

            {/* GENRE */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5"><Disc className="h-3 w-3" /> Sonic Genre Engine</label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full bg-black border border-zinc-900 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary transition-colors font-semibold"
              >
                {genres.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            {/* BPM & KEY */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5"><Activity className="h-3 w-3" /> Tempo (BPM)</label>
                <input
                  type="number"
                  required
                  placeholder="140"
                  value={formData.bpm}
                  onChange={(e) => setFormData({ ...formData, bpm: e.target.value })}
                  className="w-full bg-black border border-zinc-900 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary transition-colors font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5"><Key className="h-3 w-3" /> Scale / Key</label>
                <select
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  className="w-full bg-black border border-zinc-900 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary transition-colors font-semibold"
                >
                  {keys.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
            </div>

            {/* BASE PRICE SYSTEM */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5"><DollarSign className="h-3 w-3 text-primary" /> Base Evaluation rate (USD)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-zinc-600">$</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.basePriceUSD}
                  onChange={(e) => setFormData({ ...formData, basePriceUSD: e.target.value })}
                  className="w-full bg-black border border-zinc-900 rounded-lg pl-8 pr-4 p-3 text-xs text-white focus:outline-none focus:border-primary transition-colors font-mono font-bold"
                />
              </div>
            </div>

            {/* SEARCH TAGS */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Search Tag Identifiers</label>
              <input
                type="text"
                placeholder="drill, hard, aggressive (comma separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full bg-black border border-zinc-900 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary transition-colors font-medium"
              />
            </div>

            {/* ACTION BUTTON LAYOUT */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-black font-black uppercase text-xs tracking-wider py-3.5 rounded-lg transition-transform active:scale-98 disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <span>{editingId ? "Apply Configuration Fixes" : "Publish Beat Live"}</span>}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-bold uppercase text-[10px] tracking-widest py-2 rounded-lg transition-colors"
                >
                  Cancel Edit Operations
                </button>
              )}
            </div>
          </form>

          {/* RIGHT: LIVE INTERACTIVE INVENTORY */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-4">
            <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">
              Live Active Catalog Repositories ({beats.length})
            </h3>

            {isLoadingCatalog ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-zinc-500 text-xs">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span>Buffering inventory list from master engine...</span>
              </div>
            ) : beats.length === 0 ? (
              <div className="border border-dashed border-zinc-900 rounded-xl p-8 text-center text-zinc-600 text-xs font-medium">
                No inventory files detected. Manifest items using the dashboard control module.
              </div>
            ) : (
              <div className="space-y-2.5 overflow-y-auto max-h-[600px] pr-1 scrollbar-thin">
                {beats.map((track) => (
                  <div 
                    key={track.id} 
                    className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                      editingId === track.id 
                        ? "bg-primary/5 border-primary/50" 
                        : "bg-black border-zinc-900 hover:border-zinc-800"
                    }`}
                  >
                    <div className="min-w-0">
                      <h4 className="text-white font-bold text-xs truncate">{track.title}</h4>
                      <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mt-0.5">
                        {track.genre} • {track.bpm} BPM • {track.key}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-xs font-black text-primary">
                        ${track.basePriceUSD?.toFixed(2) || "29.99"}
                      </span>
                      
                      <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-900 rounded-lg p-1">
                        <button
                          onClick={() => startEdit(track)}
                          className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(track.id)}
                          className="p-1.5 rounded text-zinc-600 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}