"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCurrency, CurrencyCode } from "../../context/CurrencyContext";
import { ChevronDown, Loader2 } from "lucide-react";

interface CurrencyOption {
  code: CurrencyCode;
  name: string;
  symbol: string;
}

export default function CurrencyDropdown() {
  const { currency, setCurrency, isLoadingRates } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Complete array configuration matching the layout from your inspiration reference
  const options: CurrencyOption[] = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "GHS", name: "Ghanaian Cedi", symbol: "GH₵" },
    { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
    { code: "ZAR", name: "South African Rand", symbol: "R" },
    { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  ];

  // Auto-close menu overlay when clicking outside component margins
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeOption = options.find((opt) => opt.code === currency) || options[3];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      
      {/* Target Interaction Toggle Button Handle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white transition-all select-none focus:outline-none"
      >
        <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded uppercase font-black tracking-wide">
          {activeOption.code}
        </span>
        <span className="text-zinc-300 font-medium">{activeOption.code}</span>
        {isLoadingRates ? (
          <Loader2 className="h-3 w-3 animate-spin text-primary" />
        ) : (
          <ChevronDown 
            className="h-3 w-3 text-zinc-500 transition-transform duration-200" 
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} 
          />
        )}
      </button>

      {/* Dropdown Menu Container Frame */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl bg-black border border-zinc-800 shadow-2xl z-50 overflow-hidden animate-fade-in max-h-80 overflow-y-auto scrollbar-thin">
          <div className="p-2 bg-zinc-950/80 text-[10px] font-black text-zinc-500 uppercase tracking-wider border-b border-zinc-900 px-4 py-2">
            Select Currency
          </div>
          
          <div className="py-1 divide-y divide-zinc-900/50">
            {options.map((opt) => {
              const isSelected = currency === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => {
                    setCurrency(opt.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors font-medium text-xs ${
                    isSelected
                      ? "bg-zinc-900 text-primary"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-zinc-500 font-bold w-6">
                      {opt.code}
                    </span>
                    <span className={isSelected ? "text-primary font-bold" : "text-zinc-300"}>
                      {opt.name}
                    </span>
                  </div>
                  <span className={`font-mono text-xs ${isSelected ? "text-primary font-black" : "text-zinc-500"}`}>
                    {opt.symbol}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}