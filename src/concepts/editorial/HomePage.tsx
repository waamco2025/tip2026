"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Sun, Moon, Building2, UtensilsCrossed, Globe, CreditCard, Wallet, ShieldCheck, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
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
            className={`text-[0.78rem] uppercase tracking-[0.14em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${linkCls(l.key)}`}
            style={{ color: active === l.key ? c.text : c.muted, fontWeight: c.sansWeight, outlineColor: c.accent }}
          >
            {l.label}
          </Link>
        ))}
        <button onClick={toggle} aria-label={light ? "Switch to dark mode" : "Switch to light mode"} className="hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" style={{ color: c.muted, outlineColor: c.accent }}>
          {light ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile toggle + hamburger */}
      <div className="flex md:hidden items-center gap-4">
        <button onClick={toggle} aria-label={light ? "Switch to dark mode" : "Switch to light mode"} className="hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" style={{ color: c.muted, outlineColor: c.accent }}>
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
              className={`text-[0.72rem] uppercase tracking-[0.14em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${linkCls(l.key)}`}
              style={{ color: active === l.key ? c.text : c.muted, fontWeight: c.sansWeight, outlineColor: c.accent }}
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
@media(min-width:768px) { .hero-slide { background-position: center center !important; } }
`;

/* ─── Carousel Data ─── */
const carouselSlides = [
  {
    company: "Mews", slug: "mews", label: "Mews",
    image: "/images/carousel/mews.webp", mobileBgPos: "calc(50% - 248px) center",
    founders: [{ name: "Richard Valtr", title: "Founder, Mews" }],
    story: "Mews reimagined the hotel operating system from the ground up. We backed their vision to replace legacy property management with a cloud-native platform now powering hospitality worldwide.",
  },
  {
    company: "Jetstream", slug: "jetstream", label: "Jetstream",
    image: "/images/carousel/jetstream.webp", mobileBgPos: "calc(50% - 140px) center",
    founders: [
      { name: "Raj Rajamani", title: "Founder & CEO, Jetstream" },
      { name: "Jared Phipps", title: "Founder & COO, Jetstream" },
    ],
    story: "Jetstream is building the trust layer for enterprise AI. We invested because as every company deploys autonomous systems, governance isn\u2019t optional \u2014 it\u2019s the unlock that lets AI scale safely across teams and vendors.",
  },
  {
    company: "Cloaked", slug: "cloaked", label: "Cloaked",
    image: "/images/carousel/cloaked.webp", mobileBgPos: "calc(50% - 74px) center",
    founders: [
      { name: "Arjun Bhatnagar", title: "Co-Founder & CEO, Cloaked" },
      { name: "Abhijay Bhatnagar", title: "Co-Founder & CTO, Cloaked" },
    ],
    story: "Cloaked is making privacy infrastructure for the AI era. We invested because as AI-powered scams weaponize personal data, Cloaked gives consumers and enterprises the tools to take back control of their digital identities.",
  },
  {
    company: "Canary Technologies", slug: "canary-technologies", label: "Canary",
    image: "/images/carousel/canary.webp", mobileBgPos: "calc(50% - 214px) center",
    founders: [
      { name: "Harman Singh Narula", title: "Co-Founder & CEO, Canary Technologies" },
      { name: "SJ Sawhney", title: "Co-Founder & President, Canary Technologies" },
    ],
    story: "Canary Technologies is modernizing the hotel guest experience. We invested in their mission to digitize check-in, payments, and upselling across thousands of properties worldwide.",
  },
  {
    company: "MarginEdge", slug: "marginedge", label: "MarginEdge",
    image: "/images/carousel/marginedge.webp", mobileBgPos: "calc(50% - 248px) center",
    founders: [{ name: "Bo Davis", title: "Co-Founder & CEO, MarginEdge" }],
    story: "MarginEdge is eliminating the back-office burden for restaurants. We backed their platform to automate invoicing, inventory, and financial insights for operators everywhere.",
  },
  {
    company: "Nuitée", slug: "nuitee", label: "Nuitée",
    image: "/images/carousel/nuitee.webp", mobileBgPos: "calc(50% - 248px) center",
    founders: [{ name: "Med Benmansour", title: "Founder & CEO, Nuitée" }],
    story: "Nuitée is building the infrastructure layer for global hotel distribution. We backed their API-first platform connecting travel companies to accommodation inventory worldwide.",
  },
  {
    company: "Cardless", slug: "cardless", label: "Cardless",
    image: "/images/carousel/cardless.webp", mobileBgPos: "calc(50% - 200px) center",
    founders: [
      { name: "Scott Kazmierowicz", title: "Co-Founder & CEO, Cardless" },
      { name: "Michael Spelfogel", title: "Co-Founder & President, Cardless" },
    ],
    story: "Cardless is reinventing co-branded credit cards for the modern era. We invested in their platform enabling travel and lifestyle brands to launch card programs effortlessly.",
  },
  {
    company: "Rain", slug: "rain", label: "Rain",
    image: "/images/carousel/rain.webp", mobileBgPos: "calc(50% - 248px) center",
    founders: [
      { name: "Farooq Malik", title: "Co-Founder & CEO, Rain" },
      { name: "Charles Yoo-Naut", title: "Co-Founder, Rain" },
    ],
    story: "Rain is transforming how workers get paid. We backed their earned wage access platform, helping hospitality and travel employers offer on-demand pay to their teams.",
  },
  {
    company: "Super.com", slug: "super", label: "Super",
    image: "/images/carousel/super.webp", mobileBgPos: "calc(50% - 248px) center",
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
    { icon: Building2, name: "Hospitality Technology", desc: "Cloud platforms powering modern hotel operations and guest experiences" },
    { icon: UtensilsCrossed, name: "Restaurant Technology", desc: "Back-office automation and financial intelligence for restaurant operators" },
    { icon: Globe, name: "Travel Distribution", desc: "Infrastructure connecting travel platforms to global accommodation inventory" },
    { icon: CreditCard, name: "Payments & Loyalty", desc: "Co-branded card programs and loyalty platforms for travel brands" },
    { icon: Wallet, name: "Consumer Finance", desc: "Earned wage access and savings platforms for the modern workforce" },
    { icon: ShieldCheck, name: "Cybersecurity & Privacy", desc: "AI governance, identity protection, and enterprise security infrastructure" },
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
      <div className="flex flex-col md:flex-row" style={{ height: "calc(100vh - 73px)" }}>
        {/* Left panel — 40% — text content */}
        <div className="relative flex flex-col justify-center w-full md:w-[40%] px-6 md:px-12 py-12 md:py-0 z-10 shrink-0" style={{ backgroundColor: c.bg }}>
          <span className="hidden md:block text-[0.72rem] uppercase tracking-[0.22em] mb-8" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>
            Pioneers in Travel Technology &middot; Est. 2008
          </span>
          <h1
            className="text-[clamp(2.6rem,5vw,4rem)] leading-[1.08] font-light italic mb-6"
            style={{ ...serif, color: c.text }}
          >
            Investing in the Technology Powering the Global Travel Industry.
          </h1>
          <p className="hidden md:block text-[1.15rem] leading-[1.7] mb-8" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
            Thayer Investment Partners is a strategic venture capital firm focused on helping entrepreneurs navigate the dynamic, complex world of travel. Our investors are global corporations, executives, operators and accomplished entrepreneurs who share our belief that travel builds a better world.
          </p>

        </div>

        {/* Right panel — 60% — photo carousel */}
        <section className="relative flex-1 min-h-[400px] md:min-h-0 overflow-hidden">
          {/* Photo images — cross-fade, per-slide bg-position */}
          {carouselSlides.map((s, i) => (
            s.image ? (
              <React.Fragment key={i}>
                <div className="absolute inset-0 bg-cover hidden md:block transition-opacity duration-1000 ease-in-out" style={{ backgroundImage: `url('${s.image}')`, backgroundPosition: "right center", opacity: i === activeSlide ? 1 : 0 }} />
                <div className="absolute inset-0 bg-cover md:hidden transition-opacity duration-1000 ease-in-out" style={{ backgroundImage: `url('${s.image}')`, backgroundPosition: s.mobileBgPos || "right center", opacity: i === activeSlide ? 1 : 0 }} />
              </React.Fragment>
            ) : (
              <div key={i} className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ backgroundColor: light ? "#d8d4cc" : "#1a1a1a", opacity: i === activeSlide ? 1 : 0 }} />
            )
          ))}
          {/* Bottom-up gradient for readability */}
          <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70%)" }} />
          {/* Mobile overlay */}
          <div className="absolute inset-0 md:hidden" style={{ background: light
            ? "linear-gradient(to top, rgba(237,233,226,0.95) 0%, rgba(237,233,226,0.85) 40%, rgba(237,233,226,0.2) 70%)"
            : "linear-gradient(to top, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0.85) 40%, rgba(18,18,18,0.2) 70%)"
          }} />

          {/* Desktop: logo, attribution, carousel, link — bottom right */}
          <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-end z-10 gap-7">
            {/* Company logo — cross-fade */}
            <div className="relative" style={{ height: 52, width: 260 }}>
              {carouselSlides.map((s, idx) => (
                <img key={idx} src={`/logos/portfolio/${s.slug}-dark.svg`} alt={s.company} className="absolute right-0 top-0 object-contain transition-opacity duration-700 ease-in-out" style={{ height: 52, opacity: idx === activeSlide ? 1 : 0 }} />
              ))}
            </div>

            {/* Attribution — cross-fade */}
            <div className="relative w-full" style={{ minHeight: "7.5rem" }}>
              {carouselSlides.map((s, idx) => (
                <div key={idx} className="absolute right-0 top-0 w-max flex flex-col items-end gap-4 transition-opacity duration-700 ease-in-out" style={{ opacity: idx === activeSlide ? 1 : 0, pointerEvents: idx === activeSlide ? "auto" : "none" }}>
                  {s.founders.map((f, i) => (
                    <div key={i} className="flex flex-col items-end">
                      <span className="text-[1.75rem] leading-[1.15] font-light italic whitespace-nowrap" style={{ ...serif, color: "#fff" }}>{f.name}</span>
                      <span className="text-[0.68rem] uppercase tracking-[0.18em] whitespace-nowrap" style={{ ...sans, color: "rgba(255,255,255,0.7)", fontWeight: c.sansWeight }}>{f.title}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Carousel dashes + arrows */}
            <div className="flex gap-1.5 items-center">
              <button onClick={goPrev} aria-label="Previous slide" className="w-[20px] h-[20px] flex items-center justify-center transition-colors duration-300 hover:opacity-70 shrink-0 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" style={{ outlineColor: c.accent }}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              {carouselSlides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { if (i === activeSlide) { setUserPaused(!userPaused); setNavPaused(false); } else { goTo(i); } }}
                  aria-label={i === activeSlide ? (userPaused ? "Play carousel" : "Pause carousel") : `Go to slide ${i + 1} — ${s.company}`}
                  className="group/card w-[24px] h-[4px] flex items-center justify-center cursor-pointer relative shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                  style={{ backgroundColor: i === activeSlide ? "rgb(196,154,69)" : "rgba(255,255,255,0.3)", outlineColor: c.accent }}
                >
                  {i === activeSlide && (
                    <div key={`timer-${activeSlide}-${paused}`} className="absolute inset-y-0 left-0" style={{ backgroundColor: "rgba(255,255,255,0.4)", animation: paused ? "none" : "carousel-timer 6s linear forwards", width: paused ? "100%" : undefined }} />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 z-10" style={{ backgroundColor: "rgb(196,154,69)", height: 20, top: -8 }}>
                    {i === activeSlide && userPaused ? <Play className="w-3 h-3 text-white" /> : <Pause className="w-3 h-3 text-white" />}
                  </div>
                </button>
              ))}
              <button onClick={goNext} aria-label="Next slide" className="w-[20px] h-[20px] flex items-center justify-center transition-colors duration-300 hover:opacity-70 shrink-0 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" style={{ outlineColor: c.accent }}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link href="/portfolio" className="text-[0.72rem] uppercase tracking-[0.18em] hover:opacity-80 transition-colors" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>
              View Portfolio &rarr;
            </Link>
          </div>

          {/* Mobile attribution + arrows */}
          <div className="absolute bottom-14 left-6 right-6 md:hidden z-10">
            {/* Mobile logo — cross-fade, above attribution */}
            <div className="relative mb-5" style={{ height: 36, width: 180 }}>
              {carouselSlides.map((s, idx) => (
                <img key={idx} src={`/logos/portfolio/${s.slug}-${light ? "light" : "dark"}.svg`} alt={s.company} className="absolute left-0 top-0 object-contain transition-opacity duration-700 ease-in-out" style={{ height: 36, opacity: idx === activeSlide ? 1 : 0 }} />
              ))}
            </div>
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
        </section>
      </div>

      {/* ── What Partners Say (01) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="What Partners Say" number="01" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="border p-8 md:p-10 flex flex-col" style={{ borderColor: c.rule }}>
                <span className="text-[2.5rem] leading-none mb-4" style={{ ...serif, color: c.accent }}>&ldquo;</span>
                <p className="text-[1.15rem] leading-[1.7] font-light flex-1 mb-8" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
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

      {/* ── Our Philosophy (02) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500" style={{ backgroundColor: c.surface }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Philosophy" number="02" />
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-12">
            <h2 className="text-[clamp(1.8rem,3.5vw,3.2rem)] leading-[1.15] font-light italic" style={{ ...serif, color: c.text }}>
              Invest in Travel.
            </h2>
            <div>
              <p className="text-[1.15rem] leading-[1.7] mb-8" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
                Travel is more than airlines and accommodations – it is how and why people leave home and what shapes where and how they choose to live in the first place.
                We invest on behalf of the travel industry. From horizontal platforms—payments, cybersecurity, and workforce management—to vertical solutions across loyalty, distribution, and critical operating systems, we back both industry outsiders and seasoned operators.
                We connect dots and open doors across the largest and most dynamic industry in the world: hotels, transportation, airlines, cruise, agencies, restaurants, events, sports, entertainment, and experiences.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-px" style={{ backgroundColor: c.accent }} />
                <span className="text-[0.72rem] uppercase tracking-[0.22em]" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>Since 2008</span>
              </div>
            </div>
          </div>

          {/* Stats band */}
          <div className="mt-16 md:mt-20 pt-12 border-t grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12" style={{ borderColor: c.rule }}>
            {[
              { value: "$2.8B+", label: "Portfolio Value" },
              { value: "9", label: "Active Companies" },
              { value: "6", label: "Sectors" },
              { value: "17", label: "Years Investing" },
            ].map((s, i) => (
              <div key={i}>
                <span className="text-[clamp(2.5rem,5vw,4rem)] font-light block mb-2 leading-none" style={{ ...serif, color: c.accent, fontWeight: c.statWeight }}>{s.value}</span>
                <span className="text-[0.7rem] uppercase tracking-[0.22em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Headlines (03) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Recent Headlines" number="03" />
          <div className="flex flex-col">
            {headlines.map((h, i) => (
              <Link
                key={i}
                href="/news"
                className="group flex items-center gap-6 md:gap-10 py-6 border-b transition-colors"
                style={{ borderColor: c.rule }}
              >
                <span className="text-[0.72rem] uppercase tracking-[0.18em] shrink-0 w-20" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{h.date}</span>
                <span className="text-[1.75rem] font-light italic flex-1 group-hover:text-[#C49A45] transition-colors" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{h.title}</span>
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
