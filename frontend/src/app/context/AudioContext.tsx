"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

interface Track {
  id: string;
  title: string;
  producer: string;
  audioUrl: string;
  coverUrl?: string;
}

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
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
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Core Event Functions (Declared early so useEffect hooks can read them seamlessly)
  const playTrack = useCallback((track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const changeVolume = useCallback((val: number) => {
    setVolume(Math.max(0, Math.min(1, val)));
  }, []);

  const seekTrack = useCallback((val: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  }, []);

  const changeActivePlaylist = useCallback((list: Track[]) => {
    setPlaylist(list);
  }, []);

  const nextTrack = useCallback(() => {
    if (playlist.length === 0 || !currentTrack) return;
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playTrack(playlist[nextIndex]);
  }, [playlist, currentTrack, playTrack]);

  const prevTrack = useCallback(() => {
    if (playlist.length === 0 || !currentTrack) return;
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    playTrack(playlist[prevIndex]);
  }, [playlist, currentTrack, playTrack]);

  // 2. Audio Engine Lifecycle Instantiation
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => nextTrack();

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [nextTrack, volume]);

  // Volume Hardware Watcher
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Source Audio File Stream Core Handler
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    
    const audio = audioRef.current;
    const basicUrlUpdateNeeded = audio.src !== currentTrack.audioUrl;

    if (basicUrlUpdateNeeded) {
      audio.src = currentTrack.audioUrl;
      audio.load();
    }

    if (isPlaying) {
      audio.play().catch((err) => console.log("Playback interrupted safely:", err));
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  return (
    <AudioContext.Provider 
      value={{ 
        currentTrack, isPlaying, volume, currentTime, duration, 
        playTrack, togglePlay, changeVolume, seekTrack, nextTrack, prevTrack, changeActivePlaylist 
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used inside an AudioProvider");
  return context;
}