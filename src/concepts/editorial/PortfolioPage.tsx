"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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

  const categories = ["All", "Hotels & Restaurants", "Entertainment", "Cruises & Airlines", "Real Estate", "Transportation", "Fintech"];
  const searchParams = useSearchParams();
  const [active, setActive] = useState("All");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categories.includes(cat)) {
      setActive(cat);
    }
  }, [searchParams]);

  const companies = [
    { name: "Canary Technologies", slug: "canary-technologies", w: 220, url: "https://www.canarytechnologies.com", img: "/images/carousel/canary.webp", category: "Hotels & Restaurants", desc: "Modern hospitality technology platform powering guest management and hotel operations." },
    { name: "Mews", slug: "mews", w: 200, url: "https://www.mews.com", img: "/images/carousel/mews.webp", category: "Hotels & Restaurants", desc: "Cloud-native property management system for modern hospitality businesses worldwide." },
    { name: "MarginEdge", slug: "marginedge", w: 220, url: "https://www.marginedge.com", img: "/images/carousel/marginedge.webp", category: "Hotels & Restaurants", desc: "Restaurant management platform automating back-office operations and financial insights." },
    { name: "Nuit\u00e9e", slug: "nuitee", w: 160, url: "https://nuitee.com", img: "/images/carousel/nuitee.webp", category: "Hotels & Restaurants", desc: "B2B hotel distribution platform connecting travel companies to global accommodation inventory." },
    { name: "Cardless", slug: "cardless", w: 200, url: "https://www.cardless.com", img: "/images/carousel/cardless.webp", category: "Fintech", desc: "Modern credit card platform enabling brands to launch and manage co-branded card programs." },
    { name: "Rain", slug: "rain", w: 160, url: "https://www.rain.xyz", img: "/images/carousel/rain.webp", category: "Fintech", desc: "Earned wage access platform helping employers offer on-demand pay to their workforce." },
    { name: "Super", slug: "super", w: 190, url: "https://www.super.com", img: "/images/carousel/super.webp", category: "Entertainment", desc: "Next-generation travel and experiences platform for the modern traveler." },
  ];

  const filtered = active === "All" ? companies : companies.filter((co) => co.category === active);

  const metaStats = [
    { value: "$2.8B+", label: "Portfolio Value" },
    { value: "7", label: "Active Companies" },
    { value: "6", label: "Sectors" },
    { value: "3", label: "Funds" },
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

      {/* ── Portfolio Grid (01) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Active Investments" number="01" />
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="text-[0.7rem] uppercase tracking-[0.16em] px-5 py-2 border transition-all duration-300 hover:bg-[rgba(196,154,69,0.1)]"
                style={{
                  borderColor: active === cat ? c.accent : c.rule,
                  color: active === cat ? c.accent : c.muted,
                  backgroundColor: active === cat ? "rgba(196,154,69,0.1)" : undefined,
                  fontWeight: c.sansWeight,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {filtered.map((co, i) => (
              <div key={i} id={co.slug} className="group scroll-mt-24">
                <a href={co.url} target="_blank" rel="noopener noreferrer" className="aspect-[4/3] border mb-5 flex items-center justify-center px-10 cursor-pointer block relative overflow-hidden" style={{ backgroundColor: c.surface, borderColor: c.rule }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-all duration-700 ease-out bg-cover" style={{ backgroundImage: `url('${co.img}')`, backgroundPosition: "right center" }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
                  <img src={`/logos/portfolio/${co.slug}-${light ? "light" : "dark"}.svg`} alt={co.name} className="object-contain relative z-10 group-hover:hidden" style={{ width: co.w, maxWidth: "80%" }} />
                  <img src={`/logos/portfolio/${co.slug}-dark.svg`} alt={co.name} className="object-contain relative z-10 hidden group-hover:block group-hover:scale-125 transition-transform duration-700 ease-out" style={{ width: co.w, maxWidth: "80%" }} />
                </a>
                <span className="text-[0.78rem] uppercase tracking-[0.2em] block mb-2" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>{co.category}</span>
                <a href={co.url} target="_blank" rel="noopener noreferrer">
                  <h3 className="text-[1.8rem] font-light italic mb-3 group-hover:text-[#C49A45] transition-colors" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{co.name}</h3>
                </a>
                <p className="text-[1rem] leading-[1.7]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{co.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
