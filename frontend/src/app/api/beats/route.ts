import { NextResponse } from "next/server";

// Dynamic simulation layer representing database operations.
// Replace this mock implementation with actual adapter connectors (e.g., prisma.beat, db.collection, etc.)
let mockDatabaseStore = [
  {
    id: "BT-001",
    title: "Asakaa Anthem",
    genre: "Asakaa",
    bpm: 142,
    key: "F Minor",
    basePriceUSD: 29.99,
    tags: ["drill", "ghana", "hard"],
  },
  {
    id: "BT-002",
    title: "Accra Summer",
    genre: "Afrobeats",
    bpm: 105,
    key: "G Major",
    basePriceUSD: 39.99,
    tags: ["vibe", "summer", "sunny"],
  }
];

// =======================================================
// 1. GET: FETCH COMPLETE CATALOG DIRECTORY
// =======================================================
export async function GET() {
  try {
    return NextResponse.json(mockDatabaseStore, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read database records" }, { status: 500 });
  }
}

// =======================================================
// 2. POST: MANIFEST NEW PRODUCTION INSTRUMENTAL
// =======================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, genre, bpm, key, basePriceUSD, tags } = body;

    // Validation barrier
    if (!title || !genre) {
      return NextResponse.json({ error: "Missing required tracking parameters" }, { status: 400 });
    }

    const newBeat = {
      id: `BT-${Math.floor(1000 + Math.random() * 9000)}`, // Generate unique ID key string
      title,
      genre,
      bpm: Number(bpm) || 120,
      key,
      basePriceUSD: Number(basePriceUSD) || 29.99,
      tags: Array.isArray(tags) ? tags : [],
    };

    // Replace with: await db.insert(newBeat)
    mockDatabaseStore.unshift(newBeat);

    return NextResponse.json(newBeat, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Data serialization exception structural mismatch" }, { status: 500 });
  }
}