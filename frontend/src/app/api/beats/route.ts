import { NextResponse } from "next/server";

// Fallback to local Django development port if environment variable isn't set yet
const DJANGO_BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// =======================================================
// FORWARD FETCH REQUEST TO CARLA'S DJANGO ENGINE
// =======================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Forward the payload data directly into the Django API endpoint map
    const response = await fetch(`${DJANGO_BACKEND_URL}/api/beats/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Eventually, Carla will give you an Admin Token to add here:
        // "Authorization": "Bearer YOUR_ADMIN_TOKEN"
      },
      body: JSON.stringify({
        title: body.title,
        bpm: body.bpm,
        key_signature: body.key, // Adjust to match whatever fields Carla named in her serializer
        price: body.basePriceUSD, 
        genre_name: body.genre,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to communicate with Python backend" }, { status: 500 });
  }
}