"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { EditorialNav, EditorialFooter, EditorialHeadlines } from "./HomePage";
import { useEditorialMode, ec } from "./EditorialModeContext";

function SectionHeader({ label, number }: { label: string; number: string }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  return (
    <div className="flex items-center gap-6 mb-16 md:mb-20">
      <span className="text-[0.72rem] uppercase tracking-[0.22em] shrink-0" style={{ fontFamily: "'Syne', sans-serif", color: c.accentText, fontWeight: c.sansWeight }}>{label}</span>
      <div className="flex-1 h-px" style={{ backgroundColor: c.rule }} />
      <span className="text-[0.72rem] uppercase tracking-[0.22em] shrink-0" style={{ fontFamily: "'Syne', sans-serif", color: c.muted, fontWeight: c.sansWeight }}>{number}</span>
    </div>
  );
}

const companies = [
  { name: "Canary Technologies", slug: "canary-technologies", w: 220, url: "https://www.canarytechnologies.com", img: "/images/carousel/canary.webp", bgPos: "85% center", category: "Hospitality Technology" },
  { name: "Mews", slug: "mews", w: 200, url: "https://www.mews.com", img: "/images/carousel/mews.webp", bgPos: "85% center", category: "Hospitality Technology" },
  { name: "Jetstream", slug: "jetstream", w: 180, url: "https://jetstream.security", img: "/images/carousel/jetstream.webp", bgPos: "55% center", category: "Cybersecurity & Privacy" },
  { name: "Cloaked", slug: "cloaked", w: 160, url: "https://cloaked.com", img: "/images/carousel/cloaked.webp", bgPos: "70% center", category: "Cybersecurity & Privacy" },
  { name: "MarginEdge", slug: "marginedge", w: 220, url: "https://www.marginedge.com", img: "/images/carousel/marginedge.webp", bgPos: "85% center", category: "Restaurant Technology" },
  { name: "Nuit\u00e9e", slug: "nuitee", w: 160, url: "https://nuitee.com", img: "/images/carousel/nuitee.webp", bgPos: "85% center", category: "Travel Distribution" },
  { name: "Cardless", slug: "cardless", w: 200, url: "https://www.cardless.com", img: "/images/carousel/cardless.webp", bgPos: "85% center", category: "Payments & Loyalty" },
  { name: "Rain", slug: "rain", w: 160, url: "https://www.rain.xyz", img: "/images/carousel/rain.webp", bgPos: "85% center", category: "Consumer Finance" },
  { name: "Super", slug: "super", w: 190, url: "https://www.super.com", img: "/images/carousel/super.webp", bgPos: "85% center", category: "Consumer Finance" },
];

export default function EditorialPortfolioPage() {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };

  const categoryList = ["All", "Hospitality Technology", "Restaurant Technology", "Travel Distribution", "Payments & Loyalty", "Consumer Finance", "Cybersecurity & Privacy"];
  const searchParams = useSearchParams();
  const [active, setActive] = useState("All");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categoryList.includes(cat)) {
      setActive(cat);
    }
  }, [searchParams]);

  const filtered = active === "All" ? companies : companies.filter((co) => co.category === active);

  const metaStats = [
    { value: "$2.8B+", label: "Portfolio Value" },
    { value: "9", label: "Active Companies" },
    { value: "6", label: "Sectors" },
    { value: "3", label: "Funds" },
  ];

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <EditorialNav active="portfolio" />

      {/* ── Hero ── */}
      <section className="px-6 md:px-12 py-24 md:py-40">
        <div className="max-w-7xl mx-auto">
          <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>Portfolio</span>
          <h1 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.08] font-light italic mb-10 max-w-4xl" style={{ ...serif, color: c.text }}>
            Investing in companies shaping the future of global travel.
          </h1>
          <p className="text-[1.15rem] leading-[1.7] max-w-3xl mb-12" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
            Travel isn&rsquo;t just a vertical. Our portfolio encompasses all companies who can or will sell to and partner with the global travel industry. Thayer invests on behalf of the travel industry to make travel operations and consumption &mdash; safer, easier, and fundamentally more intelligent.
          </p>
          <div className="flex flex-wrap gap-8 md:gap-16">
            {metaStats.map((s, i) => (
              <div key={i}>
                <span className="text-[2.2rem] font-light block mb-1" style={{ ...serif, color: c.accent, fontWeight: c.statWeight }}>{s.value}</span>
                <span className="text-[0.72rem] uppercase tracking-[0.18em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Active Investments (01) ── */}
      <section id="active-investments" className="px-6 md:px-12 pt-16 md:pt-24 pb-24 md:pb-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Active Investments" number="01" />
          <div className="flex flex-wrap gap-2 mb-12">
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="text-[0.7rem] uppercase tracking-[0.16em] px-2 py-2 border transition-all duration-300 hover:bg-[rgba(196,154,69,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: active === cat ? c.accent : c.rule,
                  color: active === cat ? c.accentText : c.muted,
                  backgroundColor: active === cat ? "rgba(196,154,69,0.1)" : undefined,
                  fontWeight: c.sansWeight,
                  outlineColor: c.accent,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((co) => (
              <a
                key={co.slug}
                href={co.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${co.name}`}
                className="group aspect-[4/3] border flex items-center justify-center px-6 md:px-10 relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: c.surface, borderColor: c.rule, outlineColor: c.accent }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-all duration-700 ease-out bg-cover" style={{ backgroundImage: `url('${co.img}')`, backgroundPosition: co.bgPos }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
                <img src={`/logos/portfolio/${co.slug}-${light ? "light" : "dark"}.svg`} alt={`${co.name} logo`} className="object-contain relative z-10 group-hover:hidden" style={{ width: co.w, maxWidth: "80%" }} />
                <img src={`/logos/portfolio/${co.slug}-dark.svg`} alt={`${co.name} logo`} className="object-contain relative z-10 hidden group-hover:block group-hover:scale-110 transition-transform duration-700 ease-out" style={{ width: co.w, maxWidth: "80%" }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <EditorialHeadlines number="02" />

      <EditorialFooter />
    </div>
  );
}
