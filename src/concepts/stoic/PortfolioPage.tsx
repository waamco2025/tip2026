"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const filters = [
  "All",
  "Hotels & Restaurants",
  "Entertainment",
  "Cruises & Airlines",
  "Real Estate",
  "Transportation",
];

const companies = [
  { name: "TravelAI", category: "Entertainment" },
  { name: "Voyager Hotels", category: "Hotels & Restaurants" },
  { name: "CruiseLink", category: "Cruises & Airlines" },
  { name: "SkyBridge Aviation", category: "Cruises & Airlines" },
  { name: "Nomad Experiences", category: "Entertainment" },
  { name: "GroundFleet", category: "Transportation" },
  { name: "Meridian Resorts", category: "Hotels & Restaurants" },
  { name: "Embark", category: "Entertainment" },
  { name: "Atlas Property Group", category: "Real Estate" },
  { name: "Zenith Dining", category: "Hotels & Restaurants" },
  { name: "WanderPass", category: "Entertainment" },
  { name: "Horizon Rail", category: "Transportation" },
];

export default function StoicPortfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? companies
      : companies.filter((c) => c.category === activeFilter);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="flex flex-col items-center gap-4 px-6 md:px-14 py-12 md:py-20">
        <h1 className="font-playfair text-[32px] md:text-[52px]">Our Portfolio</h1>
        <p className="text-thayer-text-secondary text-lg text-center">
          Investing in the companies shaping the future of global travel
        </p>
        <div className="w-[60px] h-0.5 bg-thayer-gold" />
      </section>

      {/* Filters */}
      <div className="flex justify-center px-6 md:px-14 h-auto md:h-16 items-center py-4 md:py-0">
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 text-[13px] transition-colors ${
                activeFilter === f
                  ? "bg-thayer-gold text-thayer-bg font-semibold"
                  : "border border-thayer-border text-thayer-text-secondary hover:border-thayer-gold hover:text-thayer-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="px-6 md:px-14 pt-5 pb-12 md:pb-20 flex flex-col gap-4 md:gap-6">
        {Array.from({ length: Math.ceil(filtered.length / 3) }).map(
          (_, rowIdx) => (
            <div key={rowIdx} className="flex flex-col md:flex-row gap-4 md:gap-6">
              {filtered.slice(rowIdx * 3, rowIdx * 3 + 3).map((company, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center justify-center gap-4 h-[220px] bg-thayer-surface border border-thayer-border"
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <div className="w-11 h-11 border-2 border-thayer-gold rotate-45 opacity-60" />
                  </div>
                  <span className="text-sm font-medium">{company.name}</span>
                </div>
              ))}
              {/* Fill empty spots in last row */}
              {rowIdx === Math.ceil(filtered.length / 3) - 1 &&
                filtered.length % 3 !== 0 &&
                Array.from({ length: 3 - (filtered.length % 3) }).map(
                  (_, i) => <div key={`empty-${i}`} className="flex-1" />
                )}
            </div>
          )
        )}
      </section>

      {/* CTA */}
      <section className="bg-thayer-surface px-6 md:px-14 py-12 md:py-20 flex flex-col items-center gap-6">
        <h2 className="font-playfair text-2xl md:text-4xl text-center">
          Building the Future of Travel
        </h2>
        <p className="text-thayer-text-secondary text-base leading-relaxed text-center max-w-[640px]">
          Our portfolio companies are transforming how the world travels, from
          AI-powered booking platforms to sustainable aviation technology.
        </p>
        <div className="flex flex-col md:flex-row gap-8 md:gap-20 pt-8">
          {[
            { val: "$2.8B+", label: "Portfolio Value" },
            { val: "12", label: "Active Companies" },
            { val: "5", label: "Sectors Covered" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="font-playfair text-[40px] text-thayer-gold">
                {s.val}
              </span>
              <span className="text-thayer-text-secondary text-[13px]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
