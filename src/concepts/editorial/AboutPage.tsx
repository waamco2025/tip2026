"use client";

import React from "react";
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

export default function EditorialAboutPage() {
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
    { title: "Conviction", desc: "We invest with deep conviction in founders who are building category-defining companies in travel technology. Our thesis-driven approach means we understand the landscape before we deploy capital." },
    { title: "Network", desc: "Our partners bring decades of operating experience and relationships across hotels, airlines, entertainment, and real estate\u2014giving our portfolio companies unmatched access to customers and distribution." },
    { title: "Partnership", desc: "We are long-term partners, not passive investors. We work alongside founders through every stage of growth, from product-market fit to international expansion and beyond." },
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
    <div className="bg-[#0C0C0A] text-[#EAE5DB] min-h-screen">
      <EditorialNav active="about" />

      {/* ── Hero ── */}
      <section className="px-6 md:px-12 py-24 md:py-40">
        <div className="max-w-7xl mx-auto">
          <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#C49A45] block mb-8" style={sans}>About the Firm</span>
          <h1 className="text-[clamp(2.2rem,5.5vw,5rem)] leading-[1.08] font-light italic mb-8 max-w-4xl" style={serif}>
            A History of Innovation in Travel.
          </h1>
          <p className="text-[1.1rem] leading-[1.85] font-light max-w-2xl" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
            Since 2008, Thayer Investment Partners has been at the forefront of travel technology investing,
            partnering with visionary founders to build companies that reshape how the world moves, stays, and experiences new places.
          </p>
        </div>
      </section>

      {/* ── Timeline (01) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Journey" number="01" />
          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => (
              <div key={i} className="grid md:grid-cols-[120px_1fr] gap-4 md:gap-12 py-10 border-b border-white/[0.07]">
                <span className="text-[1.8rem] font-light text-[#C49A45]" style={serif}>{m.year}</span>
                <div>
                  <h3 className="text-[1.3rem] font-light italic mb-3" style={serif}>{m.title}</h3>
                  <p className="text-[1.1rem] leading-[1.85] font-light" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy (02) ── */}
      <section className="bg-[#141410] px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Philosophy" number="02" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {philosophies.map((p, i) => (
              <div key={i} className="border border-white/[0.07] p-8 md:p-10">
                <span className="text-[0.58rem] uppercase tracking-[0.22em] text-[#C49A45] block mb-4" style={sans}>0{i + 1}</span>
                <h3 className="text-[1.5rem] font-light italic mb-4" style={serif}>{p.title}</h3>
                <p className="text-[0.92rem] leading-[1.8]" style={{ ...serif, color: "rgba(234,229,219,0.65)" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team (03) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="The Team" number="03" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {team.map((t, i) => (
              <div key={i} className="group">
                <div className="aspect-[3/4] bg-[#141410] border border-white/[0.07] mb-5 flex items-end p-6">
                  <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[#7A7568]" style={sans}>Portrait</span>
                </div>
                <h3 className="text-[1.25rem] font-light italic mb-1" style={serif}>{t.name}</h3>
                <span className="text-[0.6rem] uppercase tracking-[0.18em] text-[#C49A45] block mb-3" style={sans}>{t.role}</span>
                <p className="text-[0.88rem] leading-[1.75] line-clamp-3" style={{ ...serif, color: "rgba(234,229,219,0.6)" }}>{t.bio}</p>
                <span className="text-[0.58rem] uppercase tracking-[0.18em] text-[#7A7568] mt-3 inline-block cursor-pointer hover:text-[#C49A45] transition-colors" style={sans}>Read More</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Network (04) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Network" number="04" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.15] font-light italic mb-6" style={serif}>
                A global network built over decades.
              </h2>
              <p className="text-[1.1rem] leading-[1.85] font-light" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
                Our portfolio companies benefit from Thayer&rsquo;s extensive network of industry leaders, corporate partners,
                and advisors spanning every segment of the travel ecosystem. From hotel chains and airline groups to
                technology platforms and government tourism boards, we connect our founders with the relationships that matter.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-[3/2] bg-[#141410] border border-white/[0.07] flex items-center justify-center">
                  <span className="text-[0.5rem] uppercase tracking-[0.15em] text-[#7A7568]/40" style={sans}>Logo</span>
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
