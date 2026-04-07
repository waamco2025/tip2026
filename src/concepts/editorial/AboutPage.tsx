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
    { name: "Chris Hemmeter", role: "Managing Partner", bio: "Co-founded Thayer Ventures to invest in travel and mobility technology. Previously founded iCare Marketing (acquired by Sysco) and Dynamic Payment Ventures (acquired by Elavon). Also served as CEO of CriticalArc Technologies. Cornell University graduate." },
    { name: "Tyler Carrico", role: "Managing Partner", bio: "Co-founded Derive Ventures in 2021. Spent four years at Thayer Ventures managing $50 million across 12 portfolio companies. Previously worked in tech investment banking at Bank of America Merrill Lynch. University of Virginia graduate." },
    { name: "Mike Scott", role: "Managing Partner", bio: "Co-founded Derive Ventures in 2021. Previously spent three years at KSL Capital Partners with over $4 billion in transaction experience across hospitality and gaming. Former real estate investment banker at J.P. Morgan. University of Michigan graduate." },
    { name: "Lee Pillsbury", role: "Co-Founder & Partner", bio: "Spent 19 years at Marriott, rising to Executive Vice President of Lodging Strategy. Founded Thayer Lodging Group, achieving a 26.2% IRR over 25 years. Formed Thayer China in partnership with Jin Jiang Group. Cornell Hotel School graduate." },
    { name: "Mark Farrell", role: "Venture Partner", bio: "Co-founded Thayer Ventures in 2009 and served as Managing Director overseeing all aspects of firm growth. Co-CEO and CFO of Thayer Ventures Acquisition Corporation (NASDAQ: TVAC). Former San Francisco supervisor and mayor." },
    { name: "Jeff Jackson", role: "Venture Partner", bio: "Spent 14 years at American Airlines and served as EVP and CFO of Sabre, overseeing $8 billion in M&A activity and the company\u2019s IPO. Former board member of Travelocity, Rent-A-Center, and Getty Images. Dartmouth graduate with Northwestern Kellogg MBA." },
    { name: "David Brem", role: "Venture Partner", bio: "Previously worked at an early-stage venture firm focused on transportation and advanced air mobility. Served as Managing Director of Michigan\u2019s flagship investment fund and in Commercial Strategy at American Airlines. Marine Corps Intelligence background. University of Michigan MBA." },
    { name: "Cara Whitehill", role: "Venture Partner", bio: "Long-time operating executive and startup advisor in travel technology. Former leader at Expedia, Travelocity, Deem, and Traxo. Active angel investor in B2B startups. Frequent speaker at PhocusWright and co-host of Travel Tech Insider podcast." },
    { name: "Chelsea Salamone", role: "Vice President", bio: "Over a decade of hospitality expertise. Spent five years at Standard International supporting global expansion of Standard and Bunkhouse hotels. Held business development roles at Kimpton Hotels and Pyramid Hotel Group. Boston University graduate." },
  ];
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <EditorialNav active="about" />

      {/* ── Hero ── */}
      <section className="relative px-6 md:px-12 py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/about.webp')" }} />
        <div className="absolute inset-0 hidden md:block" style={{ background: light
          ? "linear-gradient(to right, rgba(237,233,226,0.92) 0px, rgba(237,233,226,0.92) 500px, rgba(237,233,226,0.3) 100%)"
          : "linear-gradient(to right, rgba(18,18,18,0.92) 0px, rgba(18,18,18,0.92) 500px, rgba(18,18,18,0.2) 100%)"
        }} />
        <div className="absolute inset-0 md:hidden" style={{ backgroundColor: light
          ? "rgba(237,233,226,0.85)"
          : "rgba(18,18,18,0.82)"
        }} />
        <div className="absolute inset-x-0 bottom-0 h-[40%] hidden md:block" style={{ background: light
          ? "linear-gradient(to top, rgba(237,233,226,0.8) 0%, rgba(237,233,226,0) 100%)"
          : "linear-gradient(to top, rgba(18,18,18,0.8) 0%, rgba(18,18,18,0) 100%)"
        }} />
        <div className="relative max-w-7xl mx-auto z-10">
          <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>About the Firm</span>
          <h1 className="text-[clamp(2.2rem,5.5vw,5rem)] leading-[1.08] font-light italic mb-8 max-w-4xl" style={{ ...serif, color: c.text }}>
            A History of Innovation in Travel.
          </h1>
          <p className="text-[1.5rem] leading-[1.7] max-w-2xl" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
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
                <p className="text-[1.5rem] leading-[1.7]" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>{p.desc}</p>
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
                  <h3 className="text-[1.5rem] font-light italic mb-3" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{m.title}</h3>
                  <p className="text-[1.5rem] leading-[1.7]" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>{m.desc}</p>
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
          <h2 className="text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.15] font-light italic mb-6" style={{ ...serif, color: c.text }}>
            Decades of specialized investment and operating experience.
          </h2>
          <p className="text-[1.5rem] leading-[1.7] mb-12" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
            We work with a select group of corporate leaders who appreciate the value of long term partnership
            and share our belief that progress is centered around travel.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { slug: "capital-one", name: "Capital One", w: 140 },
              { slug: "enterprise", name: "Enterprise", w: 140 },
              { slug: "hilton", name: "Hilton", w: 110 },
              { slug: "host", name: "Host", w: 100 },
              { slug: "hyatt", name: "Hyatt", w: 110 },
              { slug: "ksl", name: "KSL", w: 100 },
              { slug: "lincoln", name: "Lincoln", w: 120 },
              { slug: "marriott", name: "Marriott", w: 130 },
            ].map((co, i) => (
              <div key={i} className="group aspect-[3/2] border flex items-center justify-center px-6 relative overflow-hidden" style={{ borderColor: c.rule }}>
                <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full transition-all duration-200 ease-out" style={{ backgroundColor: "rgb(196,154,69)" }} />
                <img src={`/logos/network/${co.slug}-${light ? "light" : "dark"}.svg`} alt={co.name} className="object-contain relative z-10 group-hover:hidden" style={{ width: co.w, maxWidth: "80%" }} />
                <img src={`/logos/network/${co.slug}-dark.svg`} alt={co.name} className="object-contain relative z-10 hidden group-hover:block group-hover:scale-125 transition-transform duration-700 ease-out" style={{ width: co.w, maxWidth: "80%" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team (04) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="The Team" number="04" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {team.map((t, i) => {
              const expanded = expandedMember === i;
              return (
                <div key={i} className="group">
                  <div className="aspect-[3/4] border mb-5 flex items-end p-6 transition-colors duration-500" style={{ backgroundColor: c.surface, borderColor: c.rule }}>
                    <span className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>Portrait</span>
                  </div>
                  <h3 className="text-[1.5rem] font-light italic mb-1" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{t.name}</h3>
                  <span className="text-[0.7rem] uppercase tracking-[0.18em] block mb-3" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>{t.role}</span>
                  <div className={`overflow-hidden transition-all duration-500 ${expanded ? "max-h-[500px]" : "max-h-0"}`}>
                    <p className="text-[1.5rem] leading-[1.7] mb-3" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>{t.bio}</p>
                  </div>
                  <button
                    onClick={() => setExpandedMember(expanded ? null : i)}
                    className="text-[0.68rem] uppercase tracking-[0.18em] mt-3 inline-block cursor-pointer hover:opacity-80 transition-colors"
                    style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}
                  >
                    {expanded ? "Read Less" : "Read More"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
