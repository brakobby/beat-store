import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AudioProvider } from "./context/AudioContext";
import Navbar from "./components/layout/Navbar"; // Bring in our real component file
import FooterAudioPlayer from "./components/audio/FooterAudioPlayer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KWACI BEATS - Premium Audio Marketplace",
  description: "Buy and license high-quality production tracks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-white antialiased min-h-screen flex flex-col`}>
        {/* Wrap everything in our global Audio Engine Provider */}
        <AudioProvider>
          
          {/* PERSISTENT HEADER NAVBAR */}
          <Navbar />

          {/* DYNAMIC CONTENT CANVAS AREA */}
          <div className="flex-1 pb-28">
            {children}
          </div>

          {/* PERSISTENT FIXED BOTTOM PLAYER INTERFACE CONTAINER */}
          <FooterAudioPlayer />

        </AudioProvider>
      </body>
    </html>
  );
}