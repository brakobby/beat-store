"use client";

import React from "react";
import { useCurrency } from "../../context/CurrencyContext";

interface Beat {
  id: string;
  title: string;
  genre: string;
  basePriceUSD: number; // Base your prices in USD in the DB
}

export default function BeatCard({ beat }: { beat: Beat }) {
  // Pull currency code, active conversion rates object, and loading state
  const { currency, rates, isLoadingRates } = useCurrency();

  // 1. Get currency format options matching your dropdown definitions
  const currencyFormats: Record<string, { symbol: string; locale: string }> = {
    USD: { symbol: "$", locale: "en-US" },
    EUR: { symbol: "€", locale: "de-DE" },
    GBP: { symbol: "£", locale: "en-GB" },
    GHS: { symbol: "GH₵", locale: "en-GH" },
    NGN: { symbol: "₦", locale: "en-NG" },
    ZAR: { symbol: "R", locale: "en-ZA" },
    KES: { symbol: "KSh", locale: "en-KE" },
    CAD: { symbol: "C$", locale: "en-CA" },
    AUD: { symbol: "A$", locale: "en-AU" },
  };

  const formatConfig = currencyFormats[currency] || { symbol: "$", locale: "en-US" };

  // 2. Safely calculate the converted amount using the fetched rate layers
  const exchangeRate = rates && rates[currency] ? rates[currency] : 1;
  const convertedPrice = beat.basePriceUSD * exchangeRate;

  // 3. Clean local number currency formatting
  const formattedPrice = isLoadingRates 
    ? "..." 
    : new Intl.NumberFormat(formatConfig.locale, {
        style: "currency",
        currency: currency,
        currencyDisplay: "symbol"
      }).format(convertedPrice);

  return (
    <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl flex items-center justify-between">
      <div>
        <h4 className="text-white font-bold">{beat.title}</h4>
        <p className="text-zinc-500 text-xs">{beat.genre}</p>
      </div>
      
      {/* Dynamic price switches instantly when state updates */}
      <span className="text-primary font-black text-sm">
        {formattedPrice}
      </span>
    </div>
  );
}