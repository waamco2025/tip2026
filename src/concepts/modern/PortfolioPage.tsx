"use client";

import { useState } from "react";
import { ModernNav, ModernFooter } from "./AboutPage";

const filters = ["ALL", "HOSPITALITY", "AVIATION", "GROUND TRANSPORT", "FEATURED"];
const companyNames = Array(16).fill("Portfolio Company");

function LogoPlaceholder() {
  return (
    <div className="w-24 h-14 border border-[#CCC] rounded flex items-center justify-center">
      <span className="text-[#CCC] text-[10px] font-medium tracking-wider">LOGO</span>
    </div>
  );
}

export default function ModernPortfolio() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ModernNav active="Portfolio" />

      {/* Split Hero */}
      <section className="flex flex-col md:flex-row h-auto md:h-[560px]">
        <div className="flex flex-col justify-center gap-6 bg-[#0D2818] px-6 md:px-14 py-12 md:py-20 w-full md:w-[660px] min-h-[400px] md:min-h-0">
          <span className="text-[#C9A962] font-semibold text-xs tracking-[2px]">PORTFOLIO</span>
          <h1 className="font-playfair text-[32px] md:text-[48px] italic text-white leading-[1.2] max-w-[570px]">We back visionary companies that are changing the way we travel.</h1>
          <p className="text-white/60 text-[15px] leading-relaxed max-w-[480px]">Our portfolio spans hospitality, aviation, ground transportation, and travel services across 20+ countries.</p>
        </div>
        <div className="h-[300px] md:h-auto flex-1 bg-cover bg-center" style={{ backgroundImage: "url('/images/modern-portfolio-hero.png')" }} />
      </section>

      {/* Intro + Grid */}
      <section className="bg-white px-6 md:px-14 pt-16 pb-4 flex flex-col gap-12">
        <p className="text-[#333] text-base leading-[1.7] max-w-[750px]">
          Thayer invests in category-leading companies redefining global travel. We focus on opportunities at the intersection of Travel, Technology, and Services — including best-in-class enterprise software, scalable operating businesses, and technology-enabled platforms.
        </p>
        {/* Filter Tabs */}
        <div className="flex flex-wrap border-b border-[#E5E5E5]">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-3 text-xs tracking-[1px] font-medium ${
                activeFilter === f
                  ? f === "FEATURED" ? "text-[#00D776] border-b-2 border-[#00D776]" : "text-[#0D2818] font-semibold border-b-2 border-[#0D2818]"
                  : "text-[#999]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        {/* Grid */}
        <div className="flex flex-col">
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="grid grid-cols-1 md:grid-cols-4">
              {companyNames.slice(row * 4, row * 4 + 4).map((name, i) => (
                <div key={i} className={`flex flex-col items-center justify-center gap-3 h-40 border-b border-[#E5E5E5] ${i < 3 ? "md:border-r" : ""}`}>
                  <LogoPlaceholder />
                  <span className="text-[#1A2E23] text-sm font-medium">{name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 md:px-14 py-12 border-t border-[#E5E5E5]">
        <p className="text-[#999] text-xs leading-relaxed max-w-[750px]">
          The portfolio companies described above may not be representative of all investments in funds managed by Thayer Investment Partners. A complete list of investments is available upon request.
        </p>
      </section>

      <ModernFooter />
    </div>
  );
}
