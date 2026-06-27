"use client";

// Strict TypeScript declaration matching all interface bindings in rows, modals, and player
export interface Track {
  id: string;
  title: string;
  producer: string;
  bpm: string;
  key: string;
  genre: string;
  tags: string[];
  audioUrl: string;
  price: number;
}

// Hardened production mock dataset featuring distinct sub-genres, tag structures, and pricing
const MOCK_BEAT_CATALOG: Track[] = [
  {
    id: "kb-001",
    title: "Gold Digging",
    producer: "KWACI",
    bpm: "145",
    key: "A Minor",
    genre: "Asakaa / Drill",
    tags: ["Hard", "Kofi Drill", "Chop", "Aggressive"],
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    price: 29.99
  },
  {
    id: "kb-002",
    title: "Midnight Vibes",
    producer: "KWACI",
    bpm: "112",
    key: "F# Major",
    genre: "Afrobeats",
    tags: ["Smooth", "Groove", "Summer", "Chilled"],
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    price: 34.99
  },
  {
    id: "kb-003",
    title: "Asante Warrior",
    producer: "KWACI",
    bpm: "125",
    key: "C Minor",
    genre: "Amapiano",
    tags: ["Log Drum", "Club", "Dance", "Heavy"],
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    price: 29.99
  },
  {
    id: "kb-004",
    title: "Highlife Horizon",
    producer: "KWACI",
    bpm: "95",
    key: "G Major",
    genre: "Highlife",
    tags: ["Guitar", "Heritage", "Traditional", "Bounce"],
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    price: 39.99
  },
  {
    id: "kb-005",
    title: "Desert Mirage",
    producer: "KWACI",
    bpm: "130",
    key: "D Minor",
    genre: "Trap",
    tags: ["Dark", "Hypnotic", "808", "Atmospheric"],
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    price: 24.99
  }
];

/**
 * Simulates an asynchronous database read operation over a network socket link.
 * Used to test load balancing, spinners, and runtime hydration sequences.
 */
export async function fetchBeatsFromBackend(): Promise<Track[]> {
  return new Promise((resolve) => {
    // 800ms network emulation buffer
    setTimeout(() => {
      resolve([...MOCK_BEAT_CATALOG]);
    }, 800);
  });
}

/**
 * Queries a single track item directly by its unique string identifier.
 */
export async function fetchBeatById(id: string): Promise<Track | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const track = MOCK_BEAT_CATALOG.find((b) => b.id === id);
      resolve(track);
    }, 300);
  });
}