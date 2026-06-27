"use client";

import React, { useState } from "react";
import { Trash2, ShieldCheck, ArrowRight, Music, FileText } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext"; // IMPORT THE LIVE CURRENCY HOOK
import PaystackButton from "./PaystackButton";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, cartTotal, clearCart } = useCart();
  const { convertPrice, currency } = useCurrency(); // CONSUME THE SYNC METHODS
  const [email, setEmail] = useState("");
  const [artistName, setArtistName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const serviceFee = cart.length > 0 ? 2.50 : 0.00;
  const finalTotalUSD = cartTotal + serviceFee;

  if (isSuccess) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center animate-fade-in">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold animate-bounce">
            ✓
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Order Confirmed!</h2>
          <p className="text-zinc-400 text-xs font-medium max-w-sm leading-relaxed">
            Thank you for purchasing from KWACI BEATS. High-fidelity audio files and license agreements have been dispatched to <span className="text-zinc-200 font-semibold">{email}</span>.
          </p>
          <Link 
            href="/"
            className="mt-4 px-6 py-3 bg-primary text-background font-bold text-xs uppercase tracking-wider rounded-lg hover:scale-105 active:scale-95 transition"
          >
            Return to Catalog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 flex-1 w-full mb-24 animate-fade-in select-none">
      <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-8">
        Review Your Basket
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center bg-zinc-900/20 border border-zinc-800/40 rounded-xl">
          <span className="text-4xl">🛒</span>
          <p className="text-zinc-400 text-sm font-semibold">Your shopping cart is completely empty.</p>
          <Link href="/" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">
            Browse Beats
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: Item Catalog List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div 
                key={item.beat.id}
                className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800/60 rounded-xl gap-4 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-12 w-12 bg-zinc-800 rounded flex items-center justify-center text-lg text-primary shrink-0">
                    <Music className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{item.beat.title}</h3>
                    <p className="text-xs text-zinc-500 font-medium flex items-center gap-1.5 mt-0.5">
                      <FileText className="h-3 w-3 text-primary" /> {item.licenseType} Rights
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {/* DYNAMIC CONVERTED ITEM PRICE */}
                  <span className="text-sm font-black text-white">{convertPrice(item.price)}</span>
                  <button 
                    onClick={() => removeFromCart(item.beat.id)}
                    className="p-2 text-zinc-500 hover:text-red-400 transition-colors rounded-lg"
                    title="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Transaction Breakdown Summary Card */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 space-y-6 sticky top-28">
            <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
              Order Breakdown
            </h3>

            <div className="space-y-3 text-xs font-medium border-b border-zinc-800 pb-4">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal Items:</span>
                {/* DYNAMIC SUB-TOTAL PRICE */}
                <span className="text-white font-mono">{convertPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Distribution Fee:</span>
                {/* DYNAMIC FEE */}
                <span className="text-white font-mono">{convertPrice(serviceFee)}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-sm pt-2">
                <span>Total Amount ({currency}):</span>
                {/* DYNAMIC FINAL TOTAL PRICE */}
                <span className="text-primary font-mono">{convertPrice(finalTotalUSD)}</span>
              </div>
            </div>

            {/* Simulated Payment Credentials Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Artist / Company Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Young Producer" 
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Delivery Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@studio.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              {/* The Paystack trigger automatically handles the conversion rate totals */}
              <div className="pt-2">
                <PaystackButton
                  email={email}
                  amount={finalTotalUSD} // Pass down base USD, PaystackButton converts to target currency code metrics internally
                  artistName={artistName}
                  onSuccess={() => {
                    setIsSuccess(true);
                    clearCart();
                  }}
                  onClose={() => {
                    alert("Payment window closed. Items remain safely in your cart.");
                  }}
                />
              </div>
            </form>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>SSL 256-Bit Verification Active</span>
            </div>
          </div>

        </div>
      )}
    </main>
  );
}