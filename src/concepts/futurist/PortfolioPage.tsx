"use client";

import { useState } from "react";
import Link from "next/link";
import { FuturistNav, FuturistFooter } from "./HomePage";

const filters = ["All", "Hotels", "Travel Advisors", "Fintech", "Real Estate", "Transportation"];
const companies = Array(16).fill(null).map((_, i) => ({
  name: "Portfolio Company",
  category: ["Hotels", "Travel Advisors", "Fintech", "Hotels", "Transportation", "Real Estate", "Hotels", "Travel Advisors", "Fintech", "Transportation", "Hotels", "Real Estate", "Travel Advisors", "Hotels", "Fintech", "Transportation"][i],
}));

export default function FuturistPortfolio() {
  const [active, setActive] = useState("All");

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120]">
      <FuturistNav active="Portfolio" />

      {/* Header - two column */}
      <section className="flex gap-12 px-12 py-20">
        <div className="flex flex-col justify-center gap-4 w-[540px] shrink-0">
          <span className="text-[#00D776] font-semibold text-[11px] tracking-[2px] font-[Inter]">INVESTMENTS</span>
          <h1 className="text-[56px] font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>Our Portfolio</h1>
        </div>
        <div className="flex items-center flex-1">
          <p className="text-[#94A3B8] text-lg leading-relaxed font-[Inter]">We invest in transformative travel and transportation technology companies. Our portfolio spans hotels, travel advisors, fintech, real estate technology, and transportation — backing founders who are reshaping a $15 trillion global industry.</p>
        </div>
      </section>

      <div className="h-px bg-[#1E293B]" />

      {/* Filters */}
      <div className="flex gap-6 px-12 py-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-5 py-2.5 rounded-full text-[13px] font-medium transition-colors font-[Inter] ${
              active === f
                ? "bg-[#00D776] text-[#0B1120] font-semibold"
                : "bg-[#131B2E] border border-[#1E293B] text-[#94A3B8] hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className="px-12 py-8 flex flex-col gap-6">
        {[0, 1, 2, 3].map((row) => (
          <div key={row} className="flex gap-6">
            {companies.slice(row * 4, row * 4 + 4).map((c, i) => (
              <div key={i} className="flex-1 bg-[#131B2E] border border-[#1E293B] rounded-xl p-4 flex flex-col gap-3">
                <div className="h-[140px] bg-[#1E293B] rounded-lg" />
                <span className="text-white text-sm font-semibold font-[Inter]">{c.name}</span>
                <span className="text-[#00D776] text-[11px] font-medium tracking-[1px] font-[Inter]">{c.category}</span>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Banner */}
      <div className="relative h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1759961831334-f47eab63c0f4?w=1080&q=80')" }}><div className="absolute inset-0 bg-[#00D776]/25" /></div>

      {/* CTA - two column */}
      <section className="flex gap-12 px-12 py-20">
        <div className="flex flex-col justify-center gap-4 w-[540px] shrink-0">
          <span className="text-[#00D776] font-semibold text-[11px] tracking-[2px] font-[Inter]">IMPACT</span>
          <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>Building the Future of Travel</h2>
        </div>
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex gap-6">
            {[{ val: "110+", label: "Portfolio Companies", color: "#00D776" }, { val: "$15T", label: "Industry Size", color: "#00B4D8" }, { val: "20+", label: "Years Experience", color: "#7C3AED" }].map((s, i) => (
              <div key={i} className="flex-1 bg-[#131B2E] border border-[#1E293B] rounded-xl p-6 flex flex-col items-center gap-2">
                <span className="text-[40px] font-bold" style={{ fontFamily: "Space Grotesk", color: s.color }}>{s.val}</span>
                <span className="text-[#94A3B8] text-xs font-medium font-[Inter]">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="text-[#94A3B8] text-base leading-relaxed font-[Inter]">For nearly two decades, Thayer has been at the forefront of travel and transportation technology investing. Our deep industry expertise, extensive network, and hands-on approach have helped over 110 companies transform the way the world travels.</p>
        </div>
      </section>

      <FuturistFooter />
    </div>
  );
}
