"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Sun, Moon, Building2, Sparkles, Ship, Landmark, Car, CreditCard, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEditorialMode, ec } from "./EditorialModeContext";

/* ─── Shared Nav ─── */
export function EditorialNav({ active = "home" }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const { light, toggle } = useEditorialMode();
  const c = ec(light);
  const links = [
    { label: "Home", href: "/", key: "home" },
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
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Insights", href: "/news" },
            { label: "Investor Relations", href: "/investor-relations" },
          ].map((t) => (
            <Link key={t.label} href={t.href} className="text-[0.6rem] uppercase tracking-[0.14em] hover:opacity-80 transition-colors whitespace-nowrap" style={{ color: c.muted, fontWeight: c.sansWeight }}>{t.label}</Link>
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
@keyframes carousel-timer {
  0% { width: 0%; }
  100% { width: 100%; }
}
.hero-bg { background-position: calc(50% - 320px) center; }
@media(min-width:768px) { .hero-bg { background-position: center center; } }
`;

/* ─── Carousel Data ─── */
const carouselSlides = [
  {
    company: "Mews", slug: "mews", label: "Mews",
    image: "/images/carousel/mews.webp",
    founders: [{ name: "Richard Valtr", title: "Founder, Mews" }],
    story: "Mews reimagined the hotel operating system from the ground up. We backed their vision to replace legacy property management with a cloud-native platform now powering hospitality worldwide.",
  },
  {
    company: "Canary Technologies", slug: "canary-technologies", label: "Canary",
    image: "/images/carousel/canary.webp",
    founders: [
      { name: "Harman Singh Narula", title: "Co-Founder & CEO, Canary Technologies" },
      { name: "SJ Sawhney", title: "Co-Founder & President, Canary Technologies" },
    ],
    story: "Canary Technologies is modernizing the hotel guest experience. We invested in their mission to digitize check-in, payments, and upselling across thousands of properties worldwide.",
  },
  {
    company: "MarginEdge", slug: "marginedge", label: "MarginEdge",
    image: "/images/carousel/marginedge.webp",
    founders: [{ name: "Bo Davis", title: "Co-Founder & CEO, MarginEdge" }],
    story: "MarginEdge is eliminating the back-office burden for restaurants. We backed their platform to automate invoicing, inventory, and financial insights for operators everywhere.",
  },
  {
    company: "Nuitée", slug: "nuitee", label: "Nuitée",
    image: "/images/carousel/nuitee.webp",
    founders: [{ name: "Med Benmansour", title: "Founder & CEO, Nuitée" }],
    story: "Nuitée is building the infrastructure layer for global hotel distribution. We backed their API-first platform connecting travel companies to accommodation inventory worldwide.",
  },
  {
    company: "Cardless", slug: "cardless", label: "Cardless",
    image: "/images/carousel/cardless.webp",
    founders: [
      { name: "Scott Kazmierowicz", title: "Co-Founder & CEO, Cardless" },
      { name: "Michael Spelfogel", title: "Co-Founder & President, Cardless" },
    ],
    story: "Cardless is reinventing co-branded credit cards for the modern era. We invested in their platform enabling travel and lifestyle brands to launch card programs effortlessly.",
  },
  {
    company: "Rain", slug: "rain", label: "Rain",
    image: "/images/carousel/rain.webp",
    founders: [
      { name: "Farooq Malik", title: "Co-Founder & CEO, Rain" },
      { name: "Charles Yoo-Naut", title: "Co-Founder, Rain" },
    ],
    story: "Rain is transforming how workers get paid. We backed their earned wage access platform, helping hospitality and travel employers offer on-demand pay to their teams.",
  },
  {
    company: "Super.com", slug: "super", label: "Super",
    image: "/images/carousel/super.webp",
    founders: [{ name: "Hussein Fazal", title: "Co-Founder & CEO, Super.com" }],
    story: "Super.com is building the everyday super app for savings. We invested in their vision to help millions save on travel, finances, and daily spending through one powerful platform.",
  },
];

/* ─── Home Page ─── */
export default function EditorialHomePage() {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = carouselSlides[activeSlide];
  const [hoveredCat, setHoveredCat] = useState<number | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [navPaused, setNavPaused] = useState(false);
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const paused = userPaused || navPaused;

  const goTo = useCallback((idx: number) => {
    setActiveSlide(idx);
    setNavPaused(true);
  }, []);

  const goNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    setNavPaused(true);
  }, []);

  const goPrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    setNavPaused(true);
  }, []);

  useEffect(() => {
    if (navPaused && !userPaused) {
      const resume = setTimeout(() => setNavPaused(false), 10000);
      return () => clearTimeout(resume);
    }
  }, [navPaused, userPaused]);

  useEffect(() => {
    if (paused) {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
      return;
    }
    autoAdvanceRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => { if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current); };
  }, [paused]);

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
    { icon: Building2, name: "Hotels & Restaurants", desc: "Hospitality tech platforms transforming guest experiences" },
    { icon: Sparkles, name: "Entertainment & Experiences", desc: "Immersive technologies redefining leisure and discovery" },
    { icon: Ship, name: "Cruises & Airlines", desc: "Next-generation solutions for air and sea transportation" },
    { icon: Landmark, name: "Real Estate", desc: "PropTech innovations in hospitality real estate" },
    { icon: Car, name: "Ground Transportation", desc: "Mobility platforms connecting travelers seamlessly" },
    { icon: CreditCard, name: "Financial Technology", desc: "Payments, earned wage access, and co-branded card platforms" },
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

      {/* ── Hero + Ticker wrapper ── */}
      <div className="flex flex-col" style={{ height: "calc(100vh - 73px)" }}>
        {/* Hero */}
        <section className="relative flex-1 flex items-center px-6 md:px-12 overflow-hidden">
          {/* Background images — cross-fade */}
          {carouselSlides.map((s, i) => (
            s.image ? (
              <div key={i} className="absolute inset-0 bg-cover bg-center md:bg-center hero-bg transition-opacity duration-1000 ease-in-out" style={{ backgroundImage: `url('${s.image}')`, opacity: i === activeSlide ? 1 : 0 }} />
            ) : (
              <div key={i} className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ backgroundColor: light ? "#d8d4cc" : "#1a1a1a", opacity: i === activeSlide ? 1 : 0 }} />
            )
          ))}
          {/* Overlay — left-to-right on desktop, bottom-to-top on mobile */}
          <div className="absolute inset-0 hidden md:block" style={{ background: light
            ? "linear-gradient(to right, rgba(237,233,226,0.92) 0px, rgba(237,233,226,0.92) 500px, rgba(237,233,226,0) 100%)"
            : "linear-gradient(to right, rgba(18,18,18,0.92) 0px, rgba(18,18,18,0.92) 500px, rgba(18,18,18,0.2) 100%)"
          }} />
          {/* Bottom gradient for caption readability on desktop */}
          <div className="absolute inset-x-0 bottom-0 h-[40%] hidden md:block" style={{ background: light
            ? "linear-gradient(to top, rgba(237,233,226,0.8) 0%, rgba(237,233,226,0) 100%)"
            : "linear-gradient(to top, rgba(18,18,18,0.8) 0%, rgba(18,18,18,0) 100%)"
          }} />
          <div className="absolute inset-0 md:hidden" style={{ background: light
            ? "linear-gradient(to top, rgba(237,233,226,0.95) 0%, rgba(237,233,226,0.85) 40%, rgba(237,233,226,0.2) 70%)"
            : "linear-gradient(to top, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0.85) 40%, rgba(18,18,18,0.2) 70%)"
          }} />

          <div className="relative max-w-7xl mx-auto w-full z-10 flex flex-col h-full px-6 md:px-0">
            {/* Top: headline */}
            <div className="flex flex-col justify-end md:justify-center flex-1 pb-64 md:pb-0">
              <span className="hidden md:block text-[0.72rem] uppercase tracking-[0.22em] mb-8" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>
                Pioneers in Travel Technology &middot; Est. 2008
              </span>
              <h1
                className="text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.08] font-light italic"
                style={{ ...serif, color: c.text, maxWidth: 600 }}
              >
                Investing in the Technology Powering the Global Travel Industry.
              </h1>
            </div>

            {/* Bottom: logo, story, attribution, cards — anchored to bottom */}
            <div className="hidden md:flex flex-col pb-8 shrink-0">
              {/* Company logo — cross-fade */}
              <div className="relative mb-10" style={{ height: 40 }}>
                {carouselSlides.map((s, idx) => (
                  <img key={idx} src={`/logos/portfolio/${s.slug}-${light ? "light" : "dark"}.svg`} alt={s.company} className="absolute left-0 top-0 object-contain transition-opacity duration-700 ease-in-out" style={{ height: 40, opacity: idx === activeSlide ? 1 : 0 }} />
                ))}
              </div>

              {/* Story + attribution — cross-fade */}
              <div className="flex flex-row items-end justify-between w-full gap-6 relative mb-10" style={{ minHeight: "9rem" }}>
                {carouselSlides.map((s, idx) => (
                  <div key={idx} className="absolute inset-0 flex flex-row items-end justify-between gap-6 transition-opacity duration-700 ease-in-out" style={{ opacity: idx === activeSlide ? 1 : 0, pointerEvents: idx === activeSlide ? "auto" : "none" }}>
                    <div className="flex flex-col items-start">
                      <p className="text-[1.5rem] leading-[1.7] max-w-lg mb-0" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
                        {s.story}
                      </p>
                    </div>
                    <div className="flex flex-col items-end shrink-0 gap-1">
                      {s.founders.map((f, i) => (
                        <div key={i} className="flex flex-col items-end">
                          <span className="text-[1.5rem] md:text-[2rem] font-light italic whitespace-nowrap" style={{ ...serif, color: light ? c.text : "#fff" }}>{f.name}</span>
                          <span className="text-[0.78rem] uppercase tracking-[0.22em] whitespace-nowrap" style={{ ...sans, color: light ? c.muted : "rgba(255,255,255,0.7)", fontWeight: c.sansWeight }}>{f.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel cards + arrows */}
              <div className="flex gap-2 items-center relative z-20">
                <button onClick={goPrev} className="w-[52px] h-[52px] flex items-center justify-center border transition-colors duration-300 hover:bg-[rgba(196,154,69,0.2)] shrink-0" style={{ borderColor: c.accent, color: c.accent }}>
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {carouselSlides.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { if (i === activeSlide) { setUserPaused(!userPaused); setNavPaused(false); } else { goTo(i); } }}
                    className="group/card w-[52px] h-[52px] flex items-center justify-center cursor-pointer relative overflow-hidden shrink-0"
                    style={{
                      border: i === activeSlide ? "2px solid #fff" : "1px solid rgb(196,154,69)",
                      backgroundImage: s.image ? `url('${s.image}')` : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "right center",
                      backgroundColor: !s.image ? (light ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)") : undefined,
                    }}
                  >
                    {/* Timer fill — sweeps left to right on active slide */}
                    {i === activeSlide && (
                      <div
                        key={`timer-${activeSlide}-${paused}`}
                        className="absolute inset-y-0 left-0"
                        style={{
                          backgroundColor: "rgba(196,154,69,0.6)",
                          animation: paused ? "none" : "carousel-timer 6s linear forwards",
                          width: paused ? "100%" : undefined,
                        }}
                      />
                    )}
                    {/* Pause/Play icon on hover */}
                    {i === activeSlide && userPaused ? (
                      <Play className="w-4 h-4 text-white relative z-10 opacity-0 group-hover/card:opacity-80 transition-opacity duration-200" />
                    ) : (
                      <Pause className="w-4 h-4 text-white relative z-10 opacity-0 group-hover/card:opacity-80 transition-opacity duration-200" />
                    )}
                  </button>
                ))}
                <button onClick={goNext} className="w-[52px] h-[52px] flex items-center justify-center border transition-colors duration-300 hover:bg-[rgba(196,154,69,0.2)] shrink-0" style={{ borderColor: c.accent, color: c.accent }}>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile attribution + arrows */}
            <div className="absolute bottom-14 left-6 right-6 md:hidden">
              <div className="flex items-end justify-between gap-4">
                <div className="flex flex-col items-start gap-3">
                  {slide.founders.map((f, i) => (
                    <div key={i} className="flex flex-col items-start">
                      <span className="text-[1.5rem] font-light italic" style={{ ...serif, color: light ? c.text : "#fff" }}>{f.name}</span>
                      <span className="text-[0.78rem] uppercase tracking-[0.22em]" style={{ ...sans, color: light ? c.muted : "rgba(255,255,255,0.7)", fontWeight: c.sansWeight }}>{f.title}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={goPrev} className="w-10 h-10 flex items-center justify-center border" style={{ borderColor: c.accent, color: c.accent }}>
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={goNext} className="w-10 h-10 flex items-center justify-center border" style={{ borderColor: c.accent, color: c.accent }}>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ticker */}
        <div className="border-y overflow-hidden py-5 shrink-0" style={{ borderColor: c.rule }}>
          <div className="flex whitespace-nowrap" style={{ animation: "editorial-marquee 35s linear infinite" }}>
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="text-[0.72rem] uppercase tracking-[0.2em] mx-6 shrink-0" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>
                {item} <span style={{ color: c.accent }} className="mx-4">&#9670;</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Our Mission (01) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Mission" number="01" />
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-12">
            <h2 className="text-[clamp(1.8rem,3.5vw,3.2rem)] leading-[1.15] font-light italic" style={{ ...serif, color: c.text }}>
              Invest in Travel.
            </h2>
            <div>
              <p className="text-[1.5rem] leading-[1.7] mb-6" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
                Travel grows at the intersection of global commerce, infrastructure, and human connection
                – it is the connective tissue of a globalized world. It breaks down barriers and brings people,
                cultures, and ideas together. Our mission is to build a better world by identifying and investing
                in the technology companies reshaping how people move, connect, and experience the world.
              </p>
              <p className="text-[1.5rem] leading-[1.7] mb-8" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
                Thayer Investment Partners is a strategic venture capital firm focused on helping entrepreneurs navigate the dynamic,
                complex world of travel. Our investors are global corporations, executives, operators and accomplished
                entrepreneurs who share our belief that travel builds a better world.
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
                <p className="text-[1.5rem] leading-[1.7]" style={{ ...serif, color: c.muted, fontWeight: c.bodyWeight }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Investment Focus (03) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Investment Focus" number="03" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => {
              const hovered = hoveredCat === i;
              return (
                <Link key={i} href={`/portfolio?category=${encodeURIComponent(cat.name)}`} className="flex flex-col items-center gap-4 border p-6 md:p-8 relative overflow-hidden cursor-pointer" style={{ borderColor: c.rule }}
                  onMouseEnter={() => setHoveredCat(i)} onMouseLeave={() => setHoveredCat(null)}>
                  <div className="absolute inset-0 transition-opacity duration-500" style={{ backgroundColor: "rgb(196,154,69)", opacity: hovered ? 1 : 0 }} />
                  <cat.icon className="w-8 h-8 relative z-10 transition-colors duration-500" style={{ color: hovered ? c.bg : c.accent }} />
                  <h3 className="text-[1.5rem] leading-[1.3] text-center font-light italic relative z-10 transition-colors duration-500" style={{ ...serif, color: hovered ? "#fff" : c.text, fontWeight: c.headingWeight }}>{cat.name}</h3>
                  <p className="text-[0.9rem] leading-[1.6] text-center relative z-10 transition-colors duration-500" style={{ ...sans, color: hovered ? "rgba(255,255,255,0.8)" : c.muted, fontWeight: c.sansWeight }}>{cat.desc}</p>
                </Link>
              );
            })}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { slug: "canary-technologies", name: "Canary Technologies", w: 160, url: "https://www.canarytechnologies.com", img: "/images/carousel/canary.webp", tag: "Hotel Guest Experience" },
              { slug: "mews", name: "Mews", w: 140, url: "https://www.mews.com", img: "/images/carousel/mews.webp", tag: "Cloud Hospitality Platform" },
              { slug: "marginedge", name: "MarginEdge", w: 160, url: "https://www.marginedge.com", img: "/images/carousel/marginedge.webp", tag: "Restaurant Management" },
              { slug: "nuitee", name: "Nuit\u00e9e", w: 120, url: "https://nuitee.com", img: "/images/carousel/nuitee.webp", tag: "Hotel Distribution API" },
              { slug: "cardless", name: "Cardless", w: 160, url: "https://www.cardless.com", img: "/images/carousel/cardless.webp", tag: "Co-Branded Credit Cards" },
              { slug: "rain", name: "Rain", w: 120, url: "https://www.rain.xyz", img: "/images/carousel/rain.webp", tag: "Earned Wage Access" },
              { slug: "super", name: "Super", w: 140, url: "https://www.super.com", img: "/images/carousel/super.webp", tag: "Travel & Savings App" },
            ].map((co, i) => (
              <Link key={i} href={`/portfolio#${co.slug}`} className="group aspect-[3/2] border flex items-center justify-center px-4 relative overflow-hidden" style={{ borderColor: c.rule }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-all duration-700 ease-out bg-cover" style={{ backgroundImage: `url('${co.img}')`, backgroundPosition: "right center" }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
                <img src={`/logos/portfolio/${co.slug}-${light ? "light" : "dark"}.svg`} alt={co.name} className="object-contain relative z-10 group-hover:hidden" style={{ width: co.w, maxWidth: "80%" }} />
                <img src={`/logos/portfolio/${co.slug}-dark.svg`} alt={co.name} className="object-contain relative z-10 hidden group-hover:block group-hover:scale-125 transition-transform duration-700 ease-out" style={{ width: co.w, maxWidth: "80%" }} />
                <span className="absolute bottom-3 left-0 right-0 text-center text-[0.75rem] uppercase tracking-[0.14em] text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-10" style={{ ...sans }}>{co.tag}</span>
              </Link>
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
                <p className="text-[1.5rem] leading-[1.7] font-light italic flex-1 mb-8" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
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
          <SectionHeader label="Our Club" number="06" />
          <h2 className="text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.15] font-light italic mb-12" style={{ ...serif, color: c.text }}>
            We are backed by visionary corporations from every corner of the travel world.
          </h2>
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
                <span className="text-[1.5rem] md:text-[1.5rem] font-light italic flex-1 group-hover:text-[#C49A45] transition-colors" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{h.title}</span>
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
