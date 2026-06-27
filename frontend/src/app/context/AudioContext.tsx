"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { Track } from "../services/beatService";

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  activePlaylist: Track[];
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  changeVolume: (val: number) => void;
  seekTrack: (val: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  changeActivePlaylist: (list: Track[]) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [activePlaylist, setActivePlaylist] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Core Playback State Modifiers
  const playTrack = useCallback((track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    if (!currentTrack) return;
    setIsPlaying((prev) => !prev);
  }, [currentTrack]);

  const changeVolume = useCallback((val: number) => {
    const boundedVolume = Math.max(0, Math.min(1, val));
    setVolume(boundedVolume);
    if (audioRef.current) {
      audioRef.current.volume = boundedVolume;
    }
  }, []);

  const seekTrack = useCallback((val: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  }, []);

  const changeActivePlaylist = useCallback((list: Track[]) => {
    if (!list) return;
    setActivePlaylist(list);
  }, []);

  const nextTrack = useCallback(() => {
    if (activePlaylist.length === 0 || !currentTrack) return;
    const currentIndex = activePlaylist.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % activePlaylist.length;
    playTrack(activePlaylist[nextIndex]);
  }, [activePlaylist, currentTrack, playTrack]);

  const prevTrack = useCallback(() => {
    if (activePlaylist.length === 0 || !currentTrack) return;
    const currentIndex = activePlaylist.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? activePlaylist.length - 1 : currentIndex - 1;
    playTrack(activePlaylist[prevIndex]);
  }, [activePlaylist, currentTrack, playTrack]);

  // 1. Singleton Audio Core Instantiation Lifecycle
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  // 2. Dynamic Event Listener Binding Layer for Auto-Advance
  // Separated to guarantee that the ended listener always has access to the freshest track index references
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("ended", nextTrack);
    return () => {
      audio.removeEventListener("ended", nextTrack);
    };
  }, [nextTrack]);

  // 3. Audio Streaming Sync Effect
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    
    const audio = audioRef.current;
    const isNewUrl = audio.src !== currentTrack.audioUrl;

    if (isNewUrl) {
      audio.src = currentTrack.audioUrl;
      audio.load();
    }

    if (isPlaying) {
      audio.play().catch((err) => console.warn("Audio Context safe playback intercept:", err));
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  return (
    <AudioContext.Provider 
      value={{ 
        currentTrack, isPlaying, volume, currentTime, duration, activePlaylist,
        playTrack, togglePlay, changeVolume, seekTrack, nextTrack, prevTrack, changeActivePlaylist 
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("CRITICAL CONTEXT BREAK: useAudio must be invoked strictly inside a configured AudioProvider node.");
  }
  return context;
}