"use client";

import React, { useState } from "react";
import { EditorialNav, EditorialFooter } from "./HomePage";

function SectionHeader({ label, number }: { label: string; number: string }) {
  return (
    <div className="flex items-center gap-6 mb-16 md:mb-20">
      <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#C49A45] shrink-0" style={{ fontFamily: "'Syne', sans-serif" }}>{label}</span>
      <div className="flex-1 h-px bg-white/[0.07]" />
      <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#7A7568] shrink-0" style={{ fontFamily: "'Syne', sans-serif" }}>{number}</span>
    </div>
  );
}

export default function EditorialPortfolioPage() {
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };

  const categories = ["All", "Hotels & Restaurants", "Entertainment", "Cruises & Airlines", "Real Estate", "Transportation"];
  const [active, setActive] = useState("All");

  const companies = [
    { name: "CloudHotel", category: "Hotels & Restaurants", desc: "AI-powered property management and guest experience platform for independent hotels." },
    { name: "StaySync", category: "Hotels & Restaurants", desc: "Revenue optimization and dynamic pricing engine for boutique hospitality brands." },
    { name: "GuestPath", category: "Hotels & Restaurants", desc: "Contactless check-in and digital concierge platform for modern hotel operations." },
    { name: "SkyBridge", category: "Cruises & Airlines", desc: "Next-generation airline distribution and booking infrastructure platform." },
    { name: "AeroFlow", category: "Cruises & Airlines", desc: "Operational intelligence and crew management system for commercial aviation." },
    { name: "VoyageAI", category: "Cruises & Airlines", desc: "AI-powered cruise itinerary planning and onboard experience personalization." },
    { name: "ExperienceHub", category: "Entertainment", desc: "Marketplace connecting travelers with curated local tours and activities worldwide." },
    { name: "LiveVenue", category: "Entertainment", desc: "Event discovery and ticketing platform for travel destinations and entertainment districts." },
    { name: "RealtyView", category: "Real Estate", desc: "PropTech platform for hospitality real estate asset management and analytics." },
    { name: "SpaceHQ", category: "Real Estate", desc: "Smart building and workspace management technology for mixed-use hospitality properties." },
    { name: "TransitLink", category: "Transportation", desc: "Ground transportation aggregation and last-mile connectivity for travel ecosystems." },
    { name: "FleetPulse", category: "Transportation", desc: "Fleet management and predictive maintenance platform for hospitality shuttle services." },
  ];

  const filtered = active === "All" ? companies : companies.filter((c) => c.category === active);

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
    <div className="bg-[#0C0C0A] text-[#EAE5DB] min-h-screen">
      <EditorialNav active="portfolio" />

      {/* ── Hero ── */}
      <section className="px-6 md:px-12 py-24 md:py-40">
        <div className="max-w-7xl mx-auto">
          <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#C49A45] block mb-8" style={sans}>Portfolio</span>
          <h1 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.08] font-light italic mb-12 max-w-4xl" style={serif}>
            Investing in companies shaping the future of global travel.
          </h1>
          <div className="flex flex-wrap gap-8 md:gap-16">
            {metaStats.map((s, i) => (
              <div key={i}>
                <span className="text-[1.6rem] font-light text-[#C49A45] block mb-1" style={serif}>{s.value}</span>
                <span className="text-[0.58rem] uppercase tracking-[0.18em] text-[#7A7568]" style={sans}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <section className="px-6 md:px-12 border-y border-white/[0.07]">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 py-5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`text-[0.6rem] uppercase tracking-[0.16em] px-5 py-2 border transition-all duration-300 ${
                active === c
                  ? "border-[#C49A45] text-[#C49A45]"
                  : "border-white/[0.07] text-[#7A7568] hover:text-[#EAE5DB] hover:border-white/[0.15]"
              }`}
              style={sans}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* ── Portfolio Grid (01) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Active Investments" number="01" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {filtered.map((c, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-[#141410] border border-white/[0.07] mb-5 flex items-end p-5 group-hover:border-[#C49A45]/30 transition-colors">
                  <span className="text-[0.5rem] uppercase tracking-[0.15em] text-[#7A7568]/40" style={sans}>Company Image</span>
                </div>
                <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[#C49A45] block mb-2" style={sans}>{c.category}</span>
                <h3 className="text-[1.3rem] font-light italic mb-2 group-hover:text-[#C49A45] transition-colors" style={serif}>{c.name}</h3>
                <p className="text-[0.82rem] leading-[1.7] text-[#7A7568]" style={sans}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Deal ── */}
      <section className="bg-[#141410] px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Featured Deal" number="02" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.15] font-light italic mb-6" style={serif}>
                CloudHotel: Advancing AI-Powered Hospitality at Scale
              </h2>
              <p className="text-[1.1rem] leading-[1.85] font-light mb-8" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
                CloudHotel represents the next generation of hospitality technology\u2014an AI-powered platform that enables independent
                hotels to compete with major chains through intelligent property management, dynamic pricing, and personalized guest experiences.
                Thayer led the company&rsquo;s $200M Series C, accelerating expansion into 42 countries.
              </p>
              <span className="text-[0.62rem] uppercase tracking-[0.18em] text-[#C49A45] cursor-pointer hover:text-[#EAE5DB] transition-colors" style={sans}>
                Read Case Study &rarr;
              </span>
            </div>
            <div className="flex flex-col gap-6">
              {featuredStats.map((s, i) => (
                <div key={i} className="border border-white/[0.07] p-6 flex items-center justify-between">
                  <span className="text-[2rem] font-light text-[#C49A45]" style={serif}>{s.value}</span>
                  <span className="text-[0.6rem] uppercase tracking-[0.18em] text-[#7A7568]" style={sans}>{s.label}</span>
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
