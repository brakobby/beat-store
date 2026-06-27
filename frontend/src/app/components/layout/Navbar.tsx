"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, User, Music, FileText, Calendar, Award } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [imgError, setImgError] = useState(false);

  const navLinks = [
    { name: "Beats", href: "/", icon: Music },
    { name: "Licensing", href: "/licensing", icon: FileText },
    { name: "Placements", href: "/placements", icon: Award },
    { name: "Book Session", href: "/book-session", icon: Calendar },
    { name: "Blog", href: "/blog", icon: FileText },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-surface bg-background/80 backdrop-blur-md px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          {/* Logo Icon Container */}
          {!imgError && (
            <div className="relative h-8 w-8 transition-transform duration-200 group-hover:scale-105">
              <Image 
                src="/kwaci-logo1.jpg" 
                alt="KWACI BEATZ Logo" 
                fill
                className="object-contain rounded"
                priority
                onError={() => setImgError(true)}
              />
            </div>
          )}
          
          {/* Brand Typography Text */}
          <span className="text-xl font-black tracking-wider text-white uppercase whitespace-nowrap select-none">
            KWACI <span className="text-primary font-serif italic lowercase">beatz</span>
          </span>
        </Link>

        {/* RIGHT COLUMN: Nav Links, Expanding Search & Portal Actions */}
        <div className="flex items-center gap-3 lg:gap-4 ml-auto">
          
          {/* EXPANDING SEARCH BAR */}
          <div className="relative flex items-center group/search focus-within:w-48 md:focus-within:w-64 w-9 h-9 transition-all duration-300 ease-in-out bg-accent rounded-full border border-surface/40 overflow-hidden">
            <div className="absolute left-2.5 pointer-events-none flex items-center justify-center">
              <Search className="h-4 w-4 text-zinc-400 group-hover/search:text-primary transition-colors" />
            </div>
            <input 
              type="text"
              placeholder="Search beats, genres..."
              className="w-full h-full bg-transparent pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 rounded-full focus:outline-none opacity-0 focus:opacity-100 group-hover/search:opacity-100 transition-opacity duration-300"
            />
          </div>

          {/* Main Route Directories */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isActive 
                      ? "bg-accent text-primary" 
                      : "text-zinc-400 hover:text-white hover:bg-accent/40"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="h-4 w-px bg-surface hidden lg:block" />

          {/* User Portal Access */}
          <Link 
            href="/login"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-accent/50 transition-colors"
            title="Account Portal"
          >
            <User className="h-4 w-4" />
          </Link>

          {/* Cart Icon CTA */}
          <Link 
            href="/cart"
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-primary text-background font-bold text-xs hover:scale-105 active:scale-95 transition"
          >
            <ShoppingCart className="h-3.5 w-3.5 fill-current" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-background/10 px-1.5 py-0.5 rounded-full text-[10px]">0</span>
          </Link>

        </div>
      </div>
    </nav>
  );
}