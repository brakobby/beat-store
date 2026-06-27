"use client";

import React from "react";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop blur overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-background border-l border-surface/80 flex flex-col shadow-2xl animate-slide-in">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-surface/60 flex items-center justify-between">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" /> YOUR CART ({cart.length})
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-zinc-400 hover:text-white p-1 rounded transition-colors focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-none">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 gap-2">
                <span className="text-3xl">🛒</span>
                <p className="text-sm font-medium">Your shopping cart is currently empty.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.beat.id} 
                  className="flex items-center justify-between p-4 bg-accent/30 border border-surface/40 rounded-xl gap-4 group"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors">
                      {item.beat.title}
                    </h4>
                    <p className="text-[11px] font-semibold text-primary/80 mt-0.5 uppercase tracking-wider">
                      {item.licenseType}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-sm font-black text-white">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.beat.id)}
                      className="text-zinc-500 hover:text-red-500 transition-colors p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Layout */}
          {cart.length > 0 && (
            <div className="border-t border-surface/60 px-6 py-6 bg-accent/10 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-400">Subtotal Amount:</span>
                <span className="text-xl font-black text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-zinc-500 font-medium leading-normal">
                Local and international conversion options will apply securely at checkout destination points.
              </p>
              <button 
                onClick={() => alert("Forwarding user to localized checkout processor routes...")}
                className="w-full bg-primary text-background font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover transition-all active:scale-[0.99] shadow-lg shadow-primary/5"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}