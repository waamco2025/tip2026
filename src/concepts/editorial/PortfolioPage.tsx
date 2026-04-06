"use client";

import React, { useState } from "react";
import { EditorialNav, EditorialFooter } from "./HomePage";
import { useEditorialMode, ec } from "./EditorialModeContext";

function SectionHeader({ label, number }: { label: string; number: string }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  return (
    <div className="flex items-center gap-6 mb-16 md:mb-20">
      <span className="text-[0.72rem] uppercase tracking-[0.22em] shrink-0" style={{ fontFamily: "'Syne', sans-serif", color: c.accent, fontWeight: c.sansWeight }}>{label}</span>
      <div className="flex-1 h-px" style={{ backgroundColor: c.rule }} />
      <span className="text-[0.72rem] uppercase tracking-[0.22em] shrink-0" style={{ fontFamily: "'Syne', sans-serif", color: c.muted, fontWeight: c.sansWeight }}>{number}</span>
    </div>
  );
}

export default function EditorialPortfolioPage() {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };

  const categories = ["All", "Hotels & Restaurants", "Entertainment", "Cruises & Airlines", "Real Estate", "Transportation"];
  const [active, setActive] = useState("All");

  const companies = [
    { name: "Canary Technologies", slug: "canary-technologies", w: 220, url: "https://www.canarytechnologies.com", category: "Hotels & Restaurants", desc: "Modern hospitality technology platform powering guest management and hotel operations." },
    { name: "Mews", slug: "mews", w: 200, url: "https://www.mews.com", category: "Hotels & Restaurants", desc: "Cloud-native property management system for modern hospitality businesses worldwide." },
    { name: "MarginEdge", slug: "marginedge", w: 220, url: "https://www.marginedge.com", category: "Hotels & Restaurants", desc: "Restaurant management platform automating back-office operations and financial insights." },
    { name: "Nuit\u00e9e", slug: "nuitee", w: 160, url: "https://nuitee.com", category: "Hotels & Restaurants", desc: "B2B hotel distribution platform connecting travel companies to global accommodation inventory." },
    { name: "Cardless", slug: "cardless", w: 200, url: "https://www.cardless.com", category: "Entertainment", desc: "Modern credit card platform enabling brands to launch and manage co-branded card programs." },
    { name: "Rain", slug: "rain", w: 160, url: "https://www.rain.xyz", category: "Transportation", desc: "Earned wage access platform helping employers offer on-demand pay to their workforce." },
    { name: "Super", slug: "super", w: 190, url: "https://www.super.com", category: "Entertainment", desc: "Next-generation travel and experiences platform for the modern traveler." },
  ];

  const filtered = active === "All" ? companies : companies.filter((co) => co.category === active);

  const metaStats = [
    { value: "$2.8B+", label: "Portfolio Value" },
    { value: "12", label: "Active Companies" },
    { value: "5", label: "Sectors" },
    { value: "3", label: "Funds" },
  ];

  const featuredStats = [
    { value: "$200M", label: "Series C" },
    { value: "10,000+", label: "Hotels" },
    { value: "42", label: "Countries" },
  ];

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <EditorialNav active="portfolio" />

      {/* ── Hero ── */}
      <section className="px-6 md:px-12 py-24 md:py-40">
        <div className="max-w-7xl mx-auto">
          <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>Portfolio</span>
          <h1 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.08] font-light italic mb-12 max-w-4xl" style={{ ...serif, color: c.text }}>
            Investing in companies shaping the future of global travel.
          </h1>
          <div className="flex flex-wrap gap-8 md:gap-16">
            {metaStats.map((s, i) => (
              <div key={i}>
                <span className="text-[1.6rem] font-light block mb-1" style={{ ...serif, color: c.accent, fontWeight: c.statWeight }}>{s.value}</span>
                <span className="text-[0.68rem] uppercase tracking-[0.18em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <section className="px-6 md:px-12 border-y" style={{ borderColor: c.rule }}>
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 py-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="text-[0.7rem] uppercase tracking-[0.16em] px-5 py-2 border transition-all duration-300"
              style={{
                borderColor: active === cat ? c.accent : c.rule,
                color: active === cat ? c.accent : c.muted,
                fontWeight: c.sansWeight,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Portfolio Grid (01) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Active Investments" number="01" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {filtered.map((co, i) => (
              <div key={i} className="group">
                <a href={co.url} target="_blank" rel="noopener noreferrer" className="aspect-[4/3] border mb-5 flex items-center justify-center px-10 group-hover:border-[#C49A45]/30 transition-colors cursor-pointer block" style={{ backgroundColor: c.surface, borderColor: c.rule }}>
                  <img src={`/logos/portfolio/${co.slug}-${light ? "light" : "dark"}.svg`} alt={co.name} className="object-contain" style={{ width: co.w, maxWidth: "80%" }} />
                </a>
                <span className="text-[0.65rem] uppercase tracking-[0.2em] block mb-2" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>{co.category}</span>
                <a href={co.url} target="_blank" rel="noopener noreferrer">
                  <h3 className="text-[1.3rem] font-light italic mb-2 group-hover:text-[#C49A45] transition-colors" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{co.name}</h3>
                </a>
                <p className="text-[0.82rem] leading-[1.7]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{co.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Deal ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500" style={{ backgroundColor: c.surface }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Featured Deal" number="02" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.15] font-light italic mb-6" style={{ ...serif, color: c.text }}>
                CloudHotel: Advancing AI-Powered Hospitality at Scale
              </h2>
              <p className="text-[1.25rem] leading-[1.85] mb-8" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
                CloudHotel represents the next generation of hospitality technology—an AI-powered platform that enables independent
                hotels to compete with major chains through intelligent property management, dynamic pricing, and personalized guest experiences.
                Thayer led the company&rsquo;s $200M Series C, accelerating expansion into 42 countries.
              </p>
              <span className="text-[0.72rem] uppercase tracking-[0.18em] cursor-pointer hover:opacity-80 transition-colors" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>
                Read Case Study &rarr;
              </span>
            </div>
            <div className="flex flex-col gap-6">
              {featuredStats.map((s, i) => (
                <div key={i} className="border p-6 flex items-center justify-between" style={{ borderColor: c.rule }}>
                  <span className="text-[2rem] font-light" style={{ ...serif, color: c.accent, fontWeight: c.statWeight }}>{s.value}</span>
                  <span className="text-[0.7rem] uppercase tracking-[0.18em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
