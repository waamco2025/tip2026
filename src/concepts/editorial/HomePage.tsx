"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sun, Moon, Building2, Sparkles, Ship, Landmark, Car } from "lucide-react";
import { useEditorialMode, ec } from "./EditorialModeContext";

/* ─── Shared Nav ─── */
export function EditorialNav({ active = "home" }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const { light, toggle } = useEditorialMode();
  const c = ec(light);
  const links = [
    { label: "About", href: "/about", key: "about" },
    { label: "Portfolio", href: "/portfolio", key: "portfolio" },
    { label: "Insights", href: "/news", key: "insights" },
    { label: "Investor Relations", href: "/investor-relations", key: "ir" },
  ];
  const linkCls = (k: string) =>
    `transition-colors duration-300 ${active === k ? "" : "hover:opacity-80"}`;

  return (
    <nav
      className="sticky top-0 z-50 px-6 md:px-12 py-5 md:py-6 flex items-center justify-between border-b transition-colors duration-500"
      style={{ backgroundColor: c.bg, borderColor: c.rule }}
    >
      <Link href="/">
        <img src={c.logo} alt="Thayer" className="h-8" />
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8" style={{ fontFamily: "'Syne', sans-serif" }}>
        {links.map((l) => (
          <Link
            key={l.key}
            href={l.href}
            className={`text-[0.78rem] uppercase tracking-[0.14em] ${linkCls(l.key)}`}
            style={{ color: active === l.key ? c.text : c.muted, fontWeight: c.sansWeight }}
          >
            {l.label}
          </Link>
        ))}
        <button onClick={toggle} className="hover:opacity-70 transition-opacity" style={{ color: c.muted }}>
          {light ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile toggle + hamburger */}
      <div className="flex md:hidden items-center gap-4">
        <button onClick={toggle} className="hover:opacity-70 transition-opacity" style={{ color: c.muted }}>
          {light ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
        <button onClick={() => setOpen(!open)} className="flex flex-col gap-[5px] w-6" aria-label="Menu">
          <span className="block h-px transition-all duration-300" style={{ backgroundColor: c.hamburger, transform: open ? "rotate(45deg) translateY(3px)" : "none", opacity: 1 }} />
          <span className="block h-px transition-all duration-300" style={{ backgroundColor: c.hamburger, opacity: open ? 0 : 1 }} />
          <span className="block h-px transition-all duration-300" style={{ backgroundColor: c.hamburger, transform: open ? "rotate(-45deg) translateY(-3px)" : "none", opacity: 1 }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-full left-0 w-full border-b flex flex-col gap-6 px-6 py-8 md:hidden transition-colors duration-500"
          style={{ backgroundColor: c.bg, borderColor: c.rule, fontFamily: "'Syne', sans-serif" }}
        >
          {links.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className={`text-[0.72rem] uppercase tracking-[0.14em] ${linkCls(l.key)}`}
              style={{ color: active === l.key ? c.text : c.muted, fontWeight: c.sansWeight }}
              onClick={() => setOpen(false)}
            >
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
  const { light } = useEditorialMode();
  const c = ec(light);
  return (
    <footer
      className="border-t px-6 md:px-12 py-12 md:py-16 transition-colors duration-500"
      style={{ borderColor: c.rule, backgroundColor: c.bg, fontFamily: "'Syne', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] whitespace-nowrap shrink-0" style={{ color: c.muted, fontWeight: c.sansWeight }}>Thayer Investment Partners</span>
        <div className="flex flex-wrap gap-5">
          {["About", "Portfolio", "Insights", "Investor Relations", "Privacy", "Terms"].map((t) => (
            <span key={t} className="text-[0.6rem] uppercase tracking-[0.14em] hover:opacity-80 transition-colors cursor-pointer whitespace-nowrap" style={{ color: c.muted, fontWeight: c.sansWeight }}>{t}</span>
          ))}
        </div>
        <span className="text-[0.58rem] uppercase tracking-[0.1em] whitespace-nowrap shrink-0" style={{ color: c.muted, opacity: 0.6 }}>&copy; 2026 Thayer Investment Partners. All rights reserved.</span>
      </div>
    </footer>
  );
}

/* ─── Section Header ─── */
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

/* ─── Marquee CSS ─── */
const marqueeCSS = `
@keyframes editorial-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

/* ─── Home Page ─── */
export default function EditorialHomePage() {
  const { light } = useEditorialMode();
  const c = ec(light);
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

  const categories = [
    { icon: Building2, name: "Hotels &\nRestaurants", desc: "Hospitality tech platforms transforming guest experiences" },
    { icon: Sparkles, name: "Entertainment &\nExperiences", desc: "Immersive technologies redefining leisure and discovery" },
    { icon: Ship, name: "Cruises &\nAirlines", desc: "Next-generation solutions for air and sea transportation" },
    { icon: Landmark, name: "Real\nEstate", desc: "PropTech innovations in hospitality real estate" },
    { icon: Car, name: "Ground\nTransportation", desc: "Mobility platforms connecting travelers seamlessly" },
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
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <style>{marqueeCSS}</style>
      <EditorialNav active="home" />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 py-24 md:py-0">
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>
            Pioneers in Travel Technology &middot; Est. 2008
          </span>
          <h1
            className="text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.08] font-light italic mb-8 max-w-4xl"
            style={{ ...serif, color: c.text }}
          >
            Investing in the Technology Powering the Global Travel Industry.
          </h1>
          <p className="text-[1.25rem] leading-[1.85] max-w-xl mb-10" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
            Thayer Investment Partners is a strategic venture capital firm focused on helping entrepreneurs navigate the dynamic, complex world of travel.
            Our investors are global corporations, executives, operators and accomplished entrepreneurs who share our belief that travel builds a better world.
          </p>
          <Link
            href="/portfolio"
            className="inline-block border px-8 py-3 text-[0.78rem] uppercase tracking-[0.18em] transition-all duration-500"
            style={{ ...sans, borderColor: c.rule, color: c.text, fontWeight: c.sansWeight }}
          >
            Explore Portfolio &rarr;
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute right-6 md:right-12 bottom-12 flex flex-col items-center gap-3">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] [writing-mode:vertical-lr]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>Scroll</span>
          <div className="w-px h-12" style={{ backgroundColor: c.rule }} />
        </div>
      </section>

      {/* ── Ticker ── */}
      <section className="border-y overflow-hidden py-5" style={{ borderColor: c.rule }}>
        <div className="flex whitespace-nowrap" style={{ animation: "editorial-marquee 35s linear infinite" }}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-[0.72rem] uppercase tracking-[0.2em] mx-6 shrink-0" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>
              {item} <span style={{ color: c.accent }} className="mx-4">&#9670;</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── Our Mission (01) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Mission" number="01" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <h2 className="text-[clamp(1.8rem,3.5vw,3.2rem)] leading-[1.15] font-light italic" style={{ ...serif, color: c.text }}>
              Invest in Travel.
            </h2>
            <div>
              <p className="text-[1.25rem] leading-[1.85] mb-8" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
                Travel grows at the intersection of global commerce, infrastructure, and human connection
                – it is the connective tissue of a globalized world. It breaks down barriers and brings people,
                cultures, and ideas together. Our mission is to build a better world by identifying and investing
                in the technology companies reshaping how people move, connect, and experience the world.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-px" style={{ backgroundColor: c.accent }} />
                <span className="text-[0.72rem] uppercase tracking-[0.22em]" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>Since 2008</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Opportunity (02) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500" style={{ backgroundColor: c.surface }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="The Opportunity" number="02" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((s, i) => (
              <div key={i} className="border p-8 md:p-10" style={{ borderColor: c.rule }}>
                <span className="text-[clamp(2.2rem,4vw,3.6rem)] font-light block mb-3" style={{ ...serif, color: c.accent, fontWeight: c.statWeight }}>{s.value}</span>
                <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-4" style={{ ...sans, color: c.text, fontWeight: c.sansWeight }}>{s.label}</span>
                <p className="text-[1.05rem] leading-[1.7]" style={{ ...serif, color: c.muted, fontWeight: c.bodyWeight }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Investment Focus (03) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Investment Focus" number="03" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-4 border p-6 md:p-8 transition-colors duration-500" style={{ borderColor: c.rule }}>
                <cat.icon className="w-7 h-7" style={{ color: c.accent }} />
                <h3 className="text-[1.1rem] leading-[1.3] text-center font-light italic whitespace-pre-line" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{cat.name}</h3>
                <p className="text-[0.75rem] leading-[1.6] text-center" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio (04) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500" style={{ backgroundColor: c.surface }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Portfolio" number="04" />
          <h2 className="text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.15] font-light italic mb-12" style={{ ...serif, color: c.text }}>
            We help the world&rsquo;s largest travel companies solve big problems and unlock new opportunities.
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[3/2] border flex items-center justify-center transition-colors duration-500" style={{ borderColor: c.rule }}>
                <span className="text-[0.6rem] uppercase tracking-[0.15em]" style={{ ...sans, color: c.muted, opacity: 0.4 }}>Logo</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link
              href="/portfolio"
              className="text-[0.72rem] uppercase tracking-[0.18em] hover:opacity-80 transition-colors"
              style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}
            >
              View Full Portfolio &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── What Partners Say (05) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="What Partners Say" number="05" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="border p-8 md:p-10 flex flex-col" style={{ borderColor: c.rule }}>
                <span className="text-[2.5rem] leading-none mb-4" style={{ ...serif, color: c.accent }}>&ldquo;</span>
                <p className="text-[1.15rem] leading-[1.8] font-light italic flex-1 mb-8" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
                  {t.quote}
                </p>
                <div className="text-right">
                  <span className="text-[0.72rem] uppercase tracking-[0.18em] block" style={{ ...sans, color: c.text, fontWeight: c.sansWeight }}>{t.author}</span>
                  <span className="text-[0.78rem] uppercase tracking-[0.14em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Network (06) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500" style={{ backgroundColor: c.surface }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Network" number="06" />
          <h2 className="text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.15] font-light italic mb-12" style={{ ...serif, color: c.text }}>
            We are backed by visionary corporations from every corner of the travel world.
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/2] border flex items-center justify-center transition-colors duration-500" style={{ borderColor: c.rule }}>
                <span className="text-[0.6rem] uppercase tracking-[0.15em]" style={{ ...sans, color: c.muted, opacity: 0.4 }}>Logo</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Headlines (07) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Recent Headlines" number="07" />
          <div className="flex flex-col">
            {headlines.map((h, i) => (
              <Link
                key={i}
                href="/news"
                className="group flex items-center gap-6 md:gap-10 py-6 border-b transition-colors"
                style={{ borderColor: c.rule }}
              >
                <span className="text-[0.72rem] uppercase tracking-[0.18em] shrink-0 w-20" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{h.date}</span>
                <span className="text-[1.15rem] md:text-[1.35rem] font-light italic flex-1 group-hover:text-[#C49A45] transition-colors" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{h.title}</span>
                <span className="group-hover:text-[#C49A45] transition-colors shrink-0" style={{ color: c.muted }}>&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
