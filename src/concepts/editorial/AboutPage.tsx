"use client";

import React from "react";
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

export default function EditorialAboutPage() {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };

  const milestones = [
    { year: "2008", title: "Foundation", desc: "Thayer Investment Partners founded by hospitality industry veterans with a vision to invest exclusively in travel technology." },
    { year: "2012", title: "Fund I Fully Deployed", desc: "First fund of $48M fully deployed across early-stage travel technology companies, establishing the firm\u2019s track record." },
    { year: "2018", title: "Expansion & Fund II", desc: "Launched Fund II at $82M, expanding into airlines, mobility platforms, and entertainment technology." },
    { year: "2022", title: "Portfolio Milestones", desc: "Portfolio companies surpass $2.8B in combined valuation. Multiple successful exits validate the travel-focused thesis." },
    { year: "2025", title: "Fund III Launch", desc: "Announced Fund III at $150M to capitalize on post-pandemic travel technology acceleration and AI-driven innovation." },
  ];

  const philosophies = [
    { title: "Conviction", desc: "We believe all businesses can be travel companies. All organizations sell to, partner with, or consume travel. Travel is more than airlines and accommodations \u2013 it is how and why people leave home and what shapes where and how they choose to live." },
    { title: "Network", desc: "We connect dots and open doors across the largest and most dynamic industry in the world: hotels, transportation, airlines, cruise, agencies, restaurants, events, sports, entertainment, and experiences." },
    { title: "Partnership", desc: "We invest on behalf of the travel industry. From horizontal platforms\u2014payments, cybersecurity, and workforce management\u2014to vertical solutions across loyalty, distribution, and critical operating systems, we back both industry outsiders and seasoned operators." },
  ];

  const team = [
    { name: "Chris Hemmeter", role: "Managing Partner", bio: "Pioneering travel technology investor with three decades of experience building and scaling hospitality companies across global markets." },
    { name: "Tyler Carrico", role: "Managing Partner", bio: "Former hotel technology executive who led digital transformation initiatives at major hospitality brands before joining Thayer." },
    { name: "Mike Scott", role: "Managing Partner", bio: "Seasoned venture investor with deep expertise in enterprise SaaS and marketplace platforms serving the travel industry." },
    { name: "Lee Pillsbury", role: "Co-Founder & Partner", bio: "Legendary hospitality industry figure who co-founded Thayer and brings unparalleled relationships across the global travel ecosystem." },
    { name: "Mark Farrell", role: "Venture Partner", bio: "Former airline technology executive specializing in distribution systems, loyalty platforms, and aviation data infrastructure." },
    { name: "Jeff Jackson", role: "Venture Partner", bio: "Real estate and PropTech expert with experience developing and managing hospitality assets across North America and Europe." },
    { name: "David Brem", role: "Venture Partner", bio: "Entertainment and experiences industry veteran who has built multiple successful platforms in the tours and activities space." },
    { name: "Cara Whitehill", role: "Venture Partner", bio: "Former management consultant specializing in travel and transportation strategy at leading global advisory firms." },
    { name: "Chelsea Salamone", role: "Vice President", bio: "Investment professional focused on deal sourcing, due diligence, and portfolio company support across Thayer\u2019s active investments." },
  ];

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <EditorialNav active="about" />

      {/* ── Hero ── */}
      <section className="px-6 md:px-12 py-24 md:py-40">
        <div className="max-w-7xl mx-auto">
          <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>About the Firm</span>
          <h1 className="text-[clamp(2.2rem,5.5vw,5rem)] leading-[1.08] font-light italic mb-8 max-w-4xl" style={{ ...serif, color: c.text }}>
            A History of Innovation in Travel.
          </h1>
          <p className="text-[1.25rem] leading-[1.85] max-w-2xl" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
            Since 2008, Thayer Investment Partners has been at the forefront of travel technology investing,
            partnering with visionary founders to build companies that reshape how the world moves, stays, and experiences new places.
          </p>
        </div>
      </section>

      {/* ── Philosophy (01) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500" style={{ backgroundColor: c.surface }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Philosophy" number="01" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {philosophies.map((p, i) => (
              <div key={i} className="border p-8 md:p-10" style={{ borderColor: c.rule }}>
                <span className="text-[0.68rem] uppercase tracking-[0.22em] block mb-4" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>0{i + 1}</span>
                <h3 className="text-[1.5rem] font-light italic mb-4" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{p.title}</h3>
                <p className="text-[1.05rem] leading-[1.8]" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline (02) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Journey" number="02" />
          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => (
              <div key={i} className="grid md:grid-cols-[120px_1fr] gap-4 md:gap-12 py-10 border-b" style={{ borderColor: c.rule }}>
                <span className="text-[1.8rem] font-light" style={{ ...serif, color: c.accent, fontWeight: c.statWeight }}>{m.year}</span>
                <div>
                  <h3 className="text-[1.3rem] font-light italic mb-3" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{m.title}</h3>
                  <p className="text-[1.25rem] leading-[1.85]" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Club (03) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500" style={{ backgroundColor: c.surface }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Club" number="03" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.15] font-light italic mb-6" style={{ ...serif, color: c.text }}>
                Decades of specialized investment and operating experience.
              </h2>
              <p className="text-[1.25rem] leading-[1.85]" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
                We work with a select group of corporate leaders who appreciate the value of long term partnership
                and share our belief that progress is centered around travel.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/2] border flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: c.surface, borderColor: c.rule }}>
                  <span className="text-[0.6rem] uppercase tracking-[0.15em]" style={{ ...sans, color: c.muted, opacity: 0.4 }}>Logo</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team (04) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="The Team" number="04" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {team.map((t, i) => (
              <div key={i} className="group">
                <div className="aspect-[3/4] border mb-5 flex items-end p-6 transition-colors duration-500" style={{ backgroundColor: c.surface, borderColor: c.rule }}>
                  <span className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>Portrait</span>
                </div>
                <h3 className="text-[1.25rem] font-light italic mb-1" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{t.name}</h3>
                <span className="text-[0.7rem] uppercase tracking-[0.18em] block mb-3" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>{t.role}</span>
                <p className="text-[0.88rem] leading-[1.75] line-clamp-3" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>{t.bio}</p>
                <span className="text-[0.68rem] uppercase tracking-[0.18em] mt-3 inline-block cursor-pointer hover:opacity-80 transition-colors" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>Read More</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
