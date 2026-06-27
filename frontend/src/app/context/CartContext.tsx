"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Track } from "../services/beatService";

export interface CartItem {
  beat: Track;
  licenseType: string;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (beat: Track, licenseType: string, price: number) => void;
  removeFromCart: (beatId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Safe Hydration: Load initial cart from localStorage only after component mounts on client
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("kwaci_cart_cache");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to restore cart backup from local cache storage:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // 2. Automated Safe Saving: Write to localStorage whenever the cart state changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("kwaci_cart_cache", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to commit cart update to localized storage state:", error);
    }
  }, [cart, isHydrated]);

  const addToCart = (beat: Track, licenseType: string, price: number) => {
    setCart((prev) => {
      // Production Guard: Prevent adding the exact same beat item to the catalog twice
      if (prev.some((item) => item.beat.id === beat.id)) return prev;
      return [...prev, { beat, licenseType, price }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (beatId: string) => {
    setCart((prev) => prev.filter((item) => item.beat.id !== beatId));
  };

  const clearCart = () => {
    setCart([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("kwaci_cart_cache");
    }
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("CRITICAL FAILURE: useCart custom hook invoked completely outside an active CartProvider node tree.");
  }
  return context;
}