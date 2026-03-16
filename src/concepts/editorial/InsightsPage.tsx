"use client";

import React from "react";
import Link from "next/link";
import { EditorialNav, EditorialFooter } from "./HomePage";
import { useEditorialMode, ec } from "./EditorialModeContext";

function SectionHeader({ label, number }: { label: string; number: string }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  return (
    <div className="flex items-center gap-6 mb-16 md:mb-20">
      <span className="text-[0.62rem] uppercase tracking-[0.22em] shrink-0" style={{ fontFamily: "'Syne', sans-serif", color: c.accent }}>{label}</span>
      <div className="flex-1 h-px" style={{ backgroundColor: c.rule }} />
      <span className="text-[0.62rem] uppercase tracking-[0.22em] shrink-0" style={{ fontFamily: "'Syne', sans-serif", color: c.muted }}>{number}</span>
    </div>
  );
}

export default function EditorialInsightsPage() {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };

  const articles = [
    { date: "Feb 18, 2026", tag: "Investment", title: "Portfolio Company StaySync Closes $28M Series A", excerpt: "StaySync\u2019s dynamic pricing platform for boutique hotels has demonstrated exceptional product-market fit, growing revenue 340% year-over-year." },
    { date: "Feb 04, 2026", tag: "Industry", title: "The Rise of AI-Powered Travel Planning", excerpt: "How artificial intelligence is fundamentally reshaping the way travelers discover, plan, and book their journeys across global markets." },
    { date: "Jan 22, 2026", tag: "Fund News", title: "Thayer Fund III Announces Final Close at $150M", excerpt: "The firm\u2019s third fund exceeded its target, reflecting strong LP demand for dedicated travel technology venture capital strategies." },
    { date: "Jan 10, 2026", tag: "Research", title: "2026 Travel Technology Outlook: Five Themes to Watch", excerpt: "From generative AI concierges to sustainable aviation technology, the trends that will define the next wave of travel innovation." },
    { date: "Dec 15, 2025", tag: "Portfolio", title: "ExperienceHub Reaches 10 Million Active Users", excerpt: "The experiences marketplace has achieved significant scale, with travelers booking over $500M in tours and activities annually." },
    { date: "Nov 28, 2025", tag: "Opinion", title: "Why Travel Technology Remains Underfunded", excerpt: "Despite representing a $15 trillion global industry, travel technology receives a fraction of the venture capital flowing into other sectors." },
    { date: "Nov 12, 2025", tag: "Industry", title: "Sustainability and the Future of Hospitality", excerpt: "How technology is enabling hotels and travel companies to reduce their environmental footprint while improving guest experiences." },
  ];

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <EditorialNav active="insights" />

      {/* ── Hero ── */}
      <section className="px-6 md:px-12 py-24 md:py-40">
        <div className="max-w-7xl mx-auto">
          <span className="text-[0.62rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accent }}>Insights</span>
          <h1 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.08] font-light italic max-w-4xl" style={{ ...serif, color: c.text }}>
            Perspectives on the future of travel &amp; technology.
          </h1>
        </div>
      </section>

      {/* ── Featured Article (01) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-t" style={{ borderColor: c.rule }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Featured" number="01" />
          <Link href="/news/thayer-travelai-series-b" className="group grid md:grid-cols-2 gap-8 md:gap-16">
            <div className="aspect-[4/3] border flex items-end p-6 group-hover:border-[#C49A45]/30 transition-colors" style={{ backgroundColor: c.surface, borderColor: c.rule }}>
              <span className="text-[0.55rem] uppercase tracking-[0.2em]" style={{ ...sans, color: c.muted }}>Featured Image</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[0.55rem] uppercase tracking-[0.2em] block mb-4" style={{ ...sans, color: c.accent }}>Mar 05, 2026 &middot; Investment</span>
              <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.15] font-light italic mb-6 group-hover:text-[#C49A45] transition-colors" style={{ ...serif, color: c.text }}>
                Thayer Leads $45M Series B in TravelAI Platform
              </h2>
              <p className="text-[1.1rem] leading-[1.85] font-light mb-8" style={{ ...serif, color: c.bodyText }}>
                TravelAI&rsquo;s generative AI platform is transforming how travel companies personalize experiences at scale.
                The Series B will fund expansion into 14 new markets and accelerate enterprise partnerships with major hotel chains.
              </p>
              <span className="text-[0.62rem] uppercase tracking-[0.18em] group-hover:text-[#C49A45] transition-colors" style={{ ...sans, color: c.muted }}>
                Read Article &rarr;
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Recent Articles (02) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Recent Articles" number="02" />
          <div className="flex flex-col">
            {articles.map((a, i) => (
              <Link
                key={i}
                href="/news/thayer-travelai-series-b"
                className="group grid md:grid-cols-[140px_1fr] gap-4 md:gap-10 py-8 border-b transition-colors"
                style={{ borderColor: c.rule }}
              >
                <span className="text-[0.6rem] uppercase tracking-[0.16em] pt-1" style={{ ...sans, color: c.muted }}>{a.date}</span>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[0.55rem] uppercase tracking-[0.2em]" style={{ ...sans, color: c.accent }}>{a.tag}</span>
                  </div>
                  <h3 className="text-[1.3rem] md:text-[1.5rem] font-light italic mb-3 group-hover:text-[#C49A45] transition-colors" style={{ ...serif, color: c.text }}>
                    {a.title}
                  </h3>
                  <p className="text-[0.92rem] leading-[1.75]" style={{ ...serif, color: c.bodyText }}>{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
