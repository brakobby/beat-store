"use client";

import React, { useState } from "react";
import { Calendar, Clock, Sliders, CheckCircle2, ArrowRight } from "lucide-react";

export default function BookSessionPage() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const services = [
    { id: "s1", name: "Studio Recording Block", duration: "2 Hours", price: "$60.00" },
    { id: "s2", name: "Mixing & Mastering Review", duration: "Per Track", price: "$120.00" },
    { id: "s3", name: "1-on-1 Production Consultation", duration: "1 Hour", price: "$45.00" },
  ];

  const availableTimes = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService && selectedDate && selectedTime) {
      setIsBooked(true);
    }
  };

  if (isBooked) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center animate-fade-in">
        <div className="bg-accent/20 border border-surface/80 rounded-2xl p-8 flex flex-col items-center gap-4">
          <CheckCircle2 className="h-14 w-14 text-primary animate-bounce" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Session Reserved!</h2>
          <p className="text-zinc-400 text-xs font-medium max-w-sm leading-relaxed">
            Your booking details have been sent. When the administrator approves the date block, confirmation steps will reach your email dashboard.
          </p>
          <button 
            onClick={() => { setIsBooked(false); setSelectedService(""); setSelectedDate(""); setSelectedTime(""); }}
            className="mt-4 px-6 py-2.5 bg-surface text-white hover:bg-zinc-800 font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
          >
            Book Another Block
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 flex-1 w-full mb-24 animate-fade-in select-none">
      
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 flex items-center gap-2 w-fit mx-auto">
          <Calendar className="h-3.5 w-3.5" /> Synchronized Booking
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-4 mb-4 uppercase">
          Book Studio Session
        </h1>
        <p className="text-zinc-400 text-sm md:text-base font-medium">
          Lock in dedicated time blocks for recording, professional track multi-stem mixing, or private beat arrangements.
        </p>
      </section>

      {/* Booking Dashboard Frame */}
      <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Step 1: Service Selection Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-accent/10 border border-surface/40 rounded-xl p-6">
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-primary" /> 1. Select Service Type
            </h3>
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.name)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedService === service.name
                      ? "bg-primary/5 border-primary shadow-md shadow-primary/5"
                      : "bg-background border-surface/60 hover:border-zinc-700"
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-white">{service.name}</h4>
                    <p className="text-zinc-500 text-[11px] font-semibold mt-0.5 uppercase tracking-wide">Duration: {service.duration}</p>
                  </div>
                  <span className="text-sm font-black text-white">{service.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Date & Time Selectors */}
          <div className="bg-accent/10 border border-surface/40 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" /> 2. Pick Date
              </h3>
              <input
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-background border border-surface/80 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary font-mono"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> 3. Available Window
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 rounded-lg border text-xs font-bold transition-all ${
                      selectedTime === time
                        ? "bg-primary text-background border-primary"
                        : "bg-background border-surface/60 text-zinc-400 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Summary Sidebar Card Checkout */}
        <div className="bg-accent/30 border border-surface rounded-xl p-6 space-y-6 sticky top-28">
          <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-surface/60 pb-3">
            Reservation Summary
          </h3>

          <div className="space-y-4 text-xs font-medium">
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500">Selected Utility:</span>
              <span className="text-white font-bold">{selectedService || "None Selected"}</span>
            </div>
            <div className="flex justify-between items-center border-t border-surface/40 pt-3">
              <span className="text-zinc-500">Date Bracket:</span>
              <span className="text-white font-mono font-bold">{selectedDate || "Not Set"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Target Hour:</span>
              <span className="text-white font-mono font-bold">{selectedTime || "Not Set"}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!selectedService || !selectedDate || !selectedTime}
            className="w-full bg-primary text-background font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
          >
            <span>Confirm Booking Block</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </form>
    </main>
  );
}