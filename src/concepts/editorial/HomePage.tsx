"use client";

import React, { useState } from "react";
import Link from "next/link";

/* ─── Shared Nav ─── */
export function EditorialNav({ active = "home" }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "About", href: "/concepts/editorial/about", key: "about" },
    { label: "Portfolio", href: "/concepts/editorial/portfolio", key: "portfolio" },
    { label: "Insights", href: "/concepts/editorial/insights", key: "insights" },
    { label: "Investor Relations", href: "/concepts/editorial/investor-relations", key: "ir" },
  ];
  const linkCls = (k: string) =>
    `transition-colors duration-300 ${active === k ? "text-[#EAE5DB]" : "text-[#7A7568] hover:text-[#EAE5DB]"}`;

  return (
    <nav className="sticky top-0 z-50 bg-[#0C0C0A] px-6 md:px-12 py-5 md:py-6 flex items-center justify-between border-b border-white/[0.07]">
      <Link href="/concepts/editorial">
        <img src="/logotype.svg" alt="Thayer" className="h-8" />
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8" style={{ fontFamily: "'Syne', sans-serif" }}>
        {links.map((l) => (
          <Link key={l.key} href={l.href} className={`text-[0.68rem] uppercase tracking-[0.14em] ${linkCls(l.key)}`}>
            {l.label}
          </Link>
        ))}
      </div>

      {/* Hamburger */}
      <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-[5px] w-6" aria-label="Menu">
        <span className={`block h-px bg-[#EAE5DB] transition-all duration-300 ${open ? "rotate-45 translate-y-[3px]" : ""}`} />
        <span className={`block h-px bg-[#EAE5DB] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`block h-px bg-[#EAE5DB] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[3px]" : ""}`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-[#0C0C0A] border-b border-white/[0.07] flex flex-col gap-6 px-6 py-8 md:hidden" style={{ fontFamily: "'Syne', sans-serif" }}>
          {links.map((l) => (
            <Link key={l.key} href={l.href} className={`text-[0.72rem] uppercase tracking-[0.14em] ${linkCls(l.key)}`} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Shared Footer ─── */
export function EditorialFooter() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#0C0C0A] px-6 md:px-12 py-12 md:py-16" style={{ fontFamily: "'Syne', sans-serif" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <span className="text-[0.68rem] uppercase tracking-[0.18em] text-[#7A7568]">Thayer Investment Partners</span>
        <div className="flex flex-wrap gap-6">
          {["About", "Portfolio", "Insights", "Investor Relations", "Privacy", "Terms"].map((t) => (
            <span key={t} className="text-[0.62rem] uppercase tracking-[0.14em] text-[#7A7568] hover:text-[#EAE5DB] transition-colors cursor-pointer">{t}</span>
          ))}
        </div>
        <span className="text-[0.6rem] uppercase tracking-[0.1em] text-[#7A7568]/60">&copy; 2026 Thayer Investment Partners. All rights reserved.</span>
      </div>
    </footer>
  );
}

/* ─── Section Header ─── */
function SectionHeader({ label, number }: { label: string; number: string }) {
  return (
    <div className="flex items-center gap-6 mb-16 md:mb-20">
      <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#C49A45] shrink-0" style={{ fontFamily: "'Syne', sans-serif" }}>{label}</span>
      <div className="flex-1 h-px bg-white/[0.07]" />
      <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#7A7568] shrink-0" style={{ fontFamily: "'Syne', sans-serif" }}>{number}</span>
    </div>
  );
}

/* ─── Marquee CSS ─── */
const marqueeCSS = `
@keyframes editorial-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

/* ─── Home Page ─── */
export default function EditorialHomePage() {
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };

  const tickerItems = [
    "Travel Technology Venture Capital",
    "$15 Trillion Global Industry",
    "Pioneers Since 2008",
    "Hotels & Hospitality",
    "Airlines & Mobility",
    "Experiences & Entertainment",
    "$2.1T Travel Tech Market by 2030",
  ];

  const stats = [
    { value: "$15T", label: "Global Travel Industry", sub: "Annual economic impact of travel and tourism worldwide" },
    { value: "1.4B", label: "International Arrivals", sub: "Annual cross-border travelers driving demand for innovation" },
    { value: "$2.1T", label: "Travel Tech Market by 2030", sub: "Projected technology spend across the travel ecosystem" },
  ];

  const focuses = [
    { num: "01", title: "Hotels & Hospitality Technology", desc: "Cloud-based property management, guest experience platforms, and revenue optimization systems." },
    { num: "02", title: "Airlines & Mobility Platforms", desc: "Next-generation booking engines, loyalty infrastructure, and operational intelligence tools." },
    { num: "03", title: "Experiences & Entertainment", desc: "Marketplace platforms connecting travelers with curated local experiences and activities." },
    { num: "04", title: "Real Estate & Development Tech", desc: "PropTech solutions for hospitality real estate, asset management, and smart building systems." },
    { num: "05", title: "Transportation & Logistics", desc: "Ground transportation platforms, fleet management, and last-mile travel connectivity." },
  ];

  const testimonials = [
    { quote: "Thayer doesn\u2019t just write checks\u2014they build companies. Their operational expertise in travel technology is unmatched in the venture landscape.", author: "CEO, Portfolio Company", role: "Hotels & Hospitality" },
    { quote: "The depth of industry knowledge and network that Thayer brings has been transformative for our growth trajectory across international markets.", author: "Founder, Portfolio Company", role: "Airlines & Mobility" },
    { quote: "Working with Thayer has given us access to partnerships and insights that would have taken years to develop independently. They are true partners.", author: "CTO, Portfolio Company", role: "Travel Technology" },
  ];

  const headlines = [
    { date: "Mar 2026", title: "Thayer Leads $45M Series B in TravelAI Platform" },
    { date: "Feb 2026", title: "Portfolio Company CloudHotel Expands to 42 Countries" },
    { date: "Jan 2026", title: "Thayer Fund III Announces Final Close at $150M" },
  ];

  return (
    <div className="bg-[#0C0C0A] text-[#EAE5DB] min-h-screen">
      <style>{marqueeCSS}</style>
      <EditorialNav active="home" />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 py-24 md:py-0">
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#C49A45] block mb-8" style={sans}>
            Pioneers in Travel Technology &middot; Est. 2008
          </span>
          <h1
            className="text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.08] font-light italic mb-8 max-w-4xl"
            style={serif}
          >
            Investing in the Future of Global Travel.
          </h1>
          <p className="text-[1.1rem] leading-[1.85] font-light max-w-xl mb-10" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
            Thayer Investment Partners is a venture capital firm exclusively focused on travel technology.
            We partner with visionary founders building the platforms that will define the next era of global travel.
          </p>
          <Link
            href="/concepts/editorial/portfolio"
            className="inline-block border border-white/[0.15] px-8 py-3 text-[0.68rem] uppercase tracking-[0.18em] text-[#EAE5DB] hover:border-[#C49A45] hover:text-[#C49A45] transition-all duration-500"
            style={sans}
          >
            Explore Portfolio &rarr;
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute right-6 md:right-12 bottom-12 flex flex-col items-center gap-3">
          <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[#7A7568] [writing-mode:vertical-lr]" style={sans}>Scroll</span>
          <div className="w-px h-12 bg-white/[0.12]" />
        </div>
      </section>

      {/* ── Ticker ── */}
      <section className="border-y border-white/[0.07] overflow-hidden py-5">
        <div className="flex whitespace-nowrap" style={{ animation: "editorial-marquee 35s linear infinite" }}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-[0.62rem] uppercase tracking-[0.2em] text-[#7A7568] mx-6 shrink-0" style={sans}>
              {item} <span className="text-[#C49A45] mx-4">&#9670;</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── Our Mission (01) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Mission" number="01" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <h2 className="text-[clamp(1.8rem,3.5vw,3.2rem)] leading-[1.15] font-light italic" style={serif}>
              Where capital meets exploration.
            </h2>
            <div>
              <p className="text-[1.1rem] leading-[1.85] font-light mb-6" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
                At Thayer Investment Partners, we believe that travel is one of the most powerful forces in the global economy.
                It connects cultures, drives innovation, and creates opportunities that ripple across industries and borders.
                Our mission is to identify and invest in the technology companies that are reshaping how the world moves.
              </p>
              <p className="text-[1.1rem] leading-[1.85] font-light mb-8" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
                We bring more than capital\u2014we bring decades of operating experience across hotels, airlines, entertainment,
                and real estate. Our partners have built and scaled businesses across the travel ecosystem,
                giving us a unique vantage point on where the industry is heading.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-[#C49A45]" />
                <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#C49A45]" style={sans}>Since 2008</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Opportunity (02) ── */}
      <section className="bg-[#141410] px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="The Opportunity" number="02" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((s, i) => (
              <div key={i} className="border border-white/[0.07] p-8 md:p-10">
                <span className="text-[clamp(2.2rem,4vw,3.6rem)] font-light text-[#C49A45] block mb-3" style={serif}>{s.value}</span>
                <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#EAE5DB] block mb-4" style={sans}>{s.label}</span>
                <p className="text-[0.92rem] leading-[1.7] font-light" style={{ ...serif, color: "rgba(234,229,219,0.55)" }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Investment Focus (03) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Investment Focus" number="03" />
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {focuses.map((f) => (
              <div key={f.num} className="border-t border-white/[0.07] pt-8">
                <span className="text-[0.58rem] uppercase tracking-[0.22em] text-[#C49A45] block mb-3" style={sans}>{f.num}</span>
                <h3 className="text-[1.5rem] font-light italic mb-3" style={serif}>{f.title}</h3>
                <p className="text-[0.82rem] leading-[1.75] text-[#7A7568]" style={sans}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Partners Say (04) ── */}
      <section className="bg-[#141410] px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="What Partners Say" number="04" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="border border-white/[0.07] p-8 md:p-10 flex flex-col">
                <span className="text-[2.5rem] leading-none text-[#C49A45] mb-4" style={serif}>&ldquo;</span>
                <p className="text-[1.05rem] leading-[1.8] font-light italic flex-1 mb-8" style={{ ...serif, color: "rgba(234,229,219,0.78)" }}>
                  {t.quote}
                </p>
                <div className="text-right">
                  <span className="text-[0.62rem] uppercase tracking-[0.18em] text-[#EAE5DB] block" style={sans}>{t.author}</span>
                  <span className="text-[0.58rem] uppercase tracking-[0.14em] text-[#7A7568]" style={sans}>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Headlines (05) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Recent Headlines" number="05" />
          <div className="flex flex-col">
            {headlines.map((h, i) => (
              <Link
                key={i}
                href="/concepts/editorial/insights"
                className="group flex items-center gap-6 md:gap-10 py-6 border-b border-white/[0.07] hover:border-[#C49A45]/30 transition-colors"
              >
                <span className="text-[0.62rem] uppercase tracking-[0.18em] text-[#7A7568] shrink-0 w-20" style={sans}>{h.date}</span>
                <span className="text-[1.15rem] md:text-[1.35rem] font-light italic flex-1 group-hover:text-[#C49A45] transition-colors" style={serif}>{h.title}</span>
                <span className="text-[#7A7568] group-hover:text-[#C49A45] transition-colors shrink-0">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
