"use client";

import React from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin,
  ArrowUpRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-zinc-900 text-zinc-400 text-xs select-none mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* LEFT BLOCK: Brand Anchor Matrix (Takes 5 out of 12 columns) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <h3 className="text-white font-black uppercase tracking-widest text-base">
                KWACI BEATS
              </h3>
            </div>
            <p className="text-zinc-500 font-medium leading-relaxed max-w-sm text-[13px]">
              An elite, decoupled digital sound catalog serving recording artists, creators, and supervisors globally. Built in West Africa, optimized for the world stage.
            </p>
          </div>

          {/* Social Row with True-Color Borders on Hover */}
          <div className="flex items-center gap-2.5 pt-4">
            {[
              { 
                name: "Instagram",
                hoverClass: "hover:border-pink-500 hover:text-pink-500 hover:bg-pink-500/5",
                icon: (
                  <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" w="20" h="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                ), 
                href: "#" 
              },
              { 
                name: "YouTube",
                hoverClass: "hover:border-red-600 hover:text-red-600 hover:bg-red-600/5",
                icon: (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                ), 
                href: "#" 
              },
              { 
                name: "TikTok",
                hoverClass: "hover:border-teal-400 hover:text-teal-400 hover:bg-teal-400/5",
                icon: (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.05 1.62 4.2 1.22 1.39 2.98 2.21 4.82 2.44v3.82c-1.78-.13-3.51-.77-4.95-1.86-.19-.15-.39-.31-.56-.49v5.86c.02 2.46-.85 4.93-2.52 6.74C13.2 22.47 10.42 23.2 7.74 22.6c-3.15-.65-5.85-3.32-6.42-6.47-.68-3.41 1-7.01 4.14-8.4 1.1-.51 2.31-.7 3.51-.57v3.9c-.83-.16-1.72-.03-2.47.38-1.42.72-2.19 2.39-1.83 3.95.34 1.65 1.83 2.87 3.53 2.89 1.95.06 3.66-1.39 3.88-3.32.04-.32.03-.64.03-.96V0z"/>
                  </svg>
                ), 
                href: "#" 
              },
              { 
                name: "X",
                hoverClass: "hover:border-zinc-200 hover:text-white hover:bg-white/5",
                icon: (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                ), 
                href: "#" 
              },
              { 
                name: "Facebook",
                hoverClass: "hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5",
                icon: (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                ), 
                href: "#" 
              }
            ].map((soc, i) => (
              <a
                key={i}
                href={soc.href}
                title={soc.name}
                className={`h-9 w-9 rounded-lg bg-zinc-950 border border-zinc-900 text-zinc-600 flex items-center justify-center transition-all duration-300 ${soc.hoverClass}`}
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT BLOCK: Links Grid Nav Nodes (Takes 7 out of 12 columns) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:pl-12">
          
          {/* NAVIGATION SECT 1: Catalog Sections */}
          <div className="space-y-4">
            <p className="text-white font-bold tracking-widest text-[10px] uppercase border-b border-zinc-900 pb-2">
              Browse Sound
            </p>
            <ul className="space-y-2.5 font-medium text-zinc-400">
              {["All Beats", "Afrobeats", "Amapiano", "Dancehall", "Trap", "Asakaa", "Afro Drill"].map((genre) => (
                <li key={genre}>
                  <Link href="/" className="hover:text-primary transition-colors flex items-center justify-between group">
                    <span>{genre}</span>
                    <ArrowUpRight className="h-3 w-3 text-zinc-700 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NAVIGATION SECT 2: Portal Pages */}
          <div className="space-y-4">
            <p className="text-white font-bold tracking-widest text-[10px] uppercase border-b border-zinc-900 pb-2">
              Licensing & Info
            </p>
            <ul className="space-y-2.5 font-medium text-zinc-400">
              {[
                { label: "License Packages", path: "/licensing-info" },
                { label: "Our Placements", path: "/placements" },
                { label: "Book Production", path: "#" },
                { label: "Latest Articles", path: "#" }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.path} className="hover:text-primary transition-colors flex items-center justify-between group">
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 text-zinc-700 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NAVIGATION SECT 3: Direct Contact Links */}
          <div className="space-y-4">
            <p className="text-white font-bold tracking-widest text-[10px] uppercase border-b border-zinc-900 pb-2">
              Get in Touch
            </p>
            <ul className="space-y-3 font-semibold text-zinc-400">
              <li className="flex items-start gap-2.5 hover:text-white transition-colors cursor-pointer group">
                <Mail className="h-3.5 w-3.5 text-primary mt-0.5" />
                <span className="break-all text-[11px]">kwacibeatz@gmail.com</span>
              </li>
              <li className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>+233245393457</span>
              </li>
              <li className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                <MessageSquare className="h-3.5 w-3.5 text-primary fill-current" />
                <span>WhatsApp Line: +233554657448</span>
              </li>
              <li className="flex items-center gap-2.5 text-zinc-600">
                <MapPin className="h-3.5 w-3.5 text-zinc-800" />
                <span>Tema, Ghana</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* FOOTER STRIP */}
      <div className="w-full bg-zinc-950 border-t border-zinc-900/50 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span>© {currentYear} KWACI BEATS.</span>
            <span className="text-zinc-800">|</span>
            <span>All Master Rights Reserved.</span>
          </div>
          <div className="text-zinc-700 font-medium">
            Secured checkout backed by Paystack currency layers
          </div>
        </div>
      </div>
    </footer>
  );
}