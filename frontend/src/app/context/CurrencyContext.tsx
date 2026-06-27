"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CurrencyCode = "USD" | "GHS" | "EUR" | "GBP" | "NGN" | "ZAR" | "KES" | "CAD" | "AUD";

interface CurrencyContextType {
  currency: CurrencyCode;
  currencySymbol: string;
  setCurrency: (code: CurrencyCode) => void;
  convertPrice: (priceInUSD: number) => string;
  isLoadingRates: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Absolute safety fallback metrics if the live API handshake fails
const FALLBACK_RATES: Record<CurrencyCode, number> = {
  USD: 1.0,
  GHS: 15.20,
  EUR: 0.92,
  GBP: 0.79,
  NGN: 1500.00,
  ZAR: 18.30,
  KES: 130.00,
  CAD: 1.37,
  AUD: 1.51,
};

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  GHS: "GH₵ ",
  EUR: "€",
  GBP: "£",
  NGN: "₦",
  ZAR: "R",
  KES: "KSh",
  CAD: "C$",
  AUD: "A$",
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("GHS");
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(FALLBACK_RATES);
  const [isLoadingRates, setIsLoadingRates] = useState(true);

  // 1. Initial configuration load and Live API Fetching Lifecycle
  useEffect(() => {
    // Restore user currency layout choices from local storage cache if available
    const savedCurrency = localStorage.getItem("kwaci_currency_pref") as CurrencyCode;
    if (savedCurrency && CURRENCY_SYMBOLS[savedCurrency]) {
      setCurrencyState(savedCurrency);
    }

    async function fetchLiveRates() {
      try {
        setIsLoadingRates(true);
        // Using a reliable free open exchange endpoint (Base asset is USD)
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!res.ok) throw new Error("API server response error");
        
        const data = await res.json();
        
        if (data && data.rates) {
          // Extract and verify only the specific currency keys we support
          const updatedRates: Partial<Record<CurrencyCode, number>> = {};
          (Object.keys(FALLBACK_RATES) as CurrencyCode[]).forEach((code) => {
            updatedRates[code] = data.rates[code] || FALLBACK_RATES[code];
          });
          
          setRates(updatedRates as Record<CurrencyCode, number>);
          console.log("Live exchange currency matrices synchronized successfully:", data.rates);
        }
      } catch (error) {
        console.warn("Unable to fetch live rates. Reverting engine securely to hard fallback layers:", error);
        // Rates default stays at FALLBACK_RATES state
      } finally {
        setIsLoadingRates(false);
      }
    }

    fetchLiveRates();
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem("kwaci_currency_pref", code);
  };

  // 2. Real-time runtime rendering math converter
  const convertPrice = (priceInUSD: number): string => {
    const rate = rates[currency] || FALLBACK_RATES[currency];
    const converted = priceInUSD * rate;
    
    return `${CURRENCY_SYMBOLS[currency]}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencySymbol: CURRENCY_SYMBOLS[currency],
        setCurrency,
        convertPrice,
        isLoadingRates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("CRITICAL FAILURE: useCurrency out of scope alignment.");
  }
  return context;
}