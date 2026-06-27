import type { Metadata } from "next";
import { Inter } from "next/font/google";

// State Management Context Layer Engines
import { CurrencyProvider } from "./context/CurrencyContext"; // CRITICAL: REQUIRED FOR PRODUCTION PRICING
import { AudioProvider } from "./context/AudioContext";
import { CartProvider } from "./context/CartContext";

// Global Persistent Interface Layout Components
import Navbar from "./components/layout/Navbar"; 
import Footer from "./components/navigation/Footer"; // ADDED BACK: REQUIRED BRAND ANCHOR
import FooterAudioPlayer from "./components/audio/FooterAudioPlayer";
import CartSidebar from "./components/cart/CartSidebar";

// System Configuration Resources
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Consolidated, high-impact marketing metadata configuration matrices
export const metadata: Metadata = {
  title: "KWACI BEATS - Premium Audio Marketplace (Accra, GH)",
  description: "Browse, stream, and secure licensing rights for high-fidelity untagged instrumentals. Multi-currency and Paystack mobile money support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-white antialiased min-h-screen flex flex-col`}>
        
        {/* Wrap everything in our global, hydrated state machines */}
        {/* We initialize Currency Context FIRST so the Cart and Audio engines can consume rates if needed */}
        <CurrencyProvider>
          <AudioProvider>
            <CartProvider>
              
              {/* GLOBAL NAVIGATION LAYER */}
              <Navbar />

              {/* SLIDE-OUT ASYNC CART DRAWER */}
              <CartSidebar />

              {/* DYNAMIC CANVAS BODY AREA */}
              {/* The flex-1 allows this container to push the footer down if content is sparse */}
              <div className="flex-1 pb-32">
                {children}
              </div>

              {/* GLOBAL FOOTER NODE BLOCK (New Module) */}
              <Footer />

              {/* PERSISTENT AUDIO EXECUTION HARDWARE NODE (Fixed Anchor) */}
              <FooterAudioPlayer />

            </CartProvider>
          </AudioProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}