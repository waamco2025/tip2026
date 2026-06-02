"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { EditorialNav, EditorialFooter, EditorialHeadlines, CloudBackground, SectionHeader, useHeadlineArrow, NextPagePanel, TESTIMONIALS } from "./HomePage";
import { useNavigationOverlay } from "./NavigationOverlay";
import { useEditorialMode, ec } from "./EditorialModeContext";
import type { Article } from "@/lib/article-types";

type Company = {
  name: string;
  slug: string;
  url: string;
  categories: string[];
  highlight?: boolean;
  w?: number;
  img?: string;
  bgPos?: string;
  logo?: string;      // logo file stem when it differs from slug (also marks "has a logo file")
  noWhite?: boolean;  // logo has no -dark (white) variant for the hover state
  acquired?: string;  // acquirer name; renders an "Acquired by …" pill that lifts on hover
};

const companies: Company[] = [
  { name: "MarginEdge", slug: "marginedge", w: 220, url: "https://www.marginedge.com", categories: ["Travel", "Food Service", "Hospitality"], highlight: true },
  { name: "Katanox", slug: "katanox", logo: "katanox", url: "https://www.katanox.com", categories: ["Travel", "Hospitality", "Distribution"] },
  { name: "Lendflow", slug: "lendflow", logo: "lendflow", url: "https://www.lendflow.com", categories: ["Travel", "Horizontal"] },
  { name: "Runwise", slug: "runwise", logo: "runwise", url: "https://www.runwise.com", categories: ["Travel", "Prop Tech", "Sustainability"] },
  { name: "Domuso", slug: "domuso", logo: "domuso", url: "https://www.domuso.com", categories: ["Travel", "Prop Tech"] },
  { name: "Scale Computing", slug: "scale-computing", w: 200, url: "https://www.scalecomputing.com", categories: ["Travel", "Horizontal"] },
  { name: "Cents", slug: "cents", logo: "cents", url: "https://www.trycents.com", categories: ["Travel", "Prop Tech", "Horizontal"] },
  { name: "StayFlexi", slug: "stayflexi", logo: "stayflexi", url: "https://stayflexi.com", categories: ["Travel", "Hospitality"] },
  { name: "Roots Natural Kitchen", slug: "roots-natural-kitchen", logo: "roots-natural-kitchen", url: "https://www.rootsnaturalkitchen.com", categories: ["Travel", "OpCo", "Food Service"] },
  { name: "Meez", slug: "meez", logo: "meez", url: "https://www.getmeez.com", categories: ["Travel", "Food Service", "Sustainability"] },
  { name: "Way", slug: "way", w: 160, url: "https://www.way.co", categories: ["Travel", "Experience", "Distribution"] },
  { name: "Sensible Weather", slug: "sensible-weather", logo: "sensible-weather", url: "https://www.sensibleweather.com", categories: ["Travel", "Horizontal", "Sustainability"] },
  { name: "Nestment", slug: "nestment", logo: "nestment", url: "https://www.nestment.com", categories: ["Travel", "Prop Tech", "Sustainability"] },
  { name: "Topkey", slug: "topkey", w: 160, url: "https://www.topkey.io", categories: ["Travel", "Hospitality", "Prop Tech"] },
  { name: "Vend", slug: "vend", logo: "vend-park", url: "https://www.vendpark.io", categories: ["Travel", "Prop Tech"] },
  { name: "Cardinal Lands", slug: "cardinal-lands", logo: "cardinal-lands", url: "https://cardinallands.com", categories: ["Travel", "OpCo", "Hospitality"] },
  { name: "PayTheory", slug: "paytheory", logo: "paytheory", url: "https://www.paytheory.com", categories: ["Travel", "Horizontal", "Sustainability"] },
  { name: "Directo", slug: "directo", logo: "directo", url: "https://www.getdirecto.com", categories: ["Travel", "Hospitality", "Distribution"] },
  { name: "Aventuur", slug: "aventuur", logo: "aventuur", url: "https://www.aventuur.com", categories: ["Travel", "OpCo", "Experience"] },
  { name: "Canary Technologies", slug: "canary-technologies", w: 220, url: "https://www.canarytechnologies.com", categories: ["Travel", "Hospitality", "Experience"], highlight: true },
  { name: "Gravity Haus", slug: "gravity-haus", logo: "gravity-haus", url: "https://gravityhaus.com", categories: ["Travel", "OpCo"] },
  { name: "Orderful", slug: "orderful", w: 180, url: "https://www.orderful.com", categories: ["Travel", "Distribution", "Horizontal"] },
  { name: "Cardless", slug: "cardless", w: 200, url: "https://www.cardless.com", categories: ["Travel", "Horizontal"], highlight: true },
  { name: "Guidesly", slug: "guidesly", logo: "guidesly", url: "https://guidesly.com", categories: ["Travel", "Experience"] },
  { name: "Nuit\u00e9e", slug: "nuitee", w: 160, url: "https://nuitee.com", categories: ["Travel", "Distribution"], highlight: true },
  { name: "Rain", slug: "rain", w: 160, url: "https://www.rain.xyz", categories: ["Travel", "Horizontal"], highlight: true },
  { name: "Jose Andres Group", slug: "jose-andres-group", logo: "jose-andres-group", url: "https://www.joseandres.com", categories: ["Travel", "OpCo"] },
  { name: "BoomPop", slug: "boompop", logo: "boompop", url: "https://boompop.com", categories: ["Travel", "Experience", "Hospitality", "Corporate"] },
  { name: "Ballers", slug: "ballers", logo: "ballers", url: "https://www.ballers-us.com", categories: ["Travel", "OpCo", "Experience"] },
  { name: "Paradero", slug: "paradero", w: 180, url: "https://www.paraderohotels.com", categories: ["Travel", "OpCo", "Hospitality"] },
  { name: "Tixr", slug: "tixr", logo: "tixr", url: "https://www.tixr.com", categories: ["Travel", "Experience"], highlight: true },
  { name: "Magic", slug: "magic", logo: "magic", url: "https://www.magic.company", categories: ["Travel", "Experience", "Hospitality", "Food Service"] },
  { name: "Path Water", slug: "path-water", logo: "path", url: "https://drinkpathwater.com", categories: ["Travel", "Sustainability"] },
  { name: "Bilt", slug: "bilt", logo: "bilt", url: "https://www.biltrewards.com", categories: ["Travel", "Horizontal", "Experience"], highlight: true },
  { name: "Beekeeper", slug: "beekeeper", logo: "beekeeper", acquired: "LumApps", url: "https://www.beekeeper.io", categories: ["Travel", "Horizontal"] },
  { name: "Mews", slug: "mews", w: 200, url: "https://www.mews.com", categories: ["Travel", "Hospitality"], highlight: true },
  { name: "May Mobility", slug: "may-mobility", logo: "may-mobility", url: "https://maymobility.com", categories: ["Travel"] },
  { name: "Humanly", slug: "humanly", logo: "humanly", url: "https://www.humanly.io", categories: ["Travel", "Horizontal"] },
  { name: "Rest", slug: "rest", w: 140, url: "https://www.restsensor.com", categories: ["Travel", "Prop Tech", "Sustainability"] },
  { name: "Super", slug: "super", w: 190, url: "https://www.super.com", categories: ["Travel", "Distribution", "Horizontal"], highlight: true },
  { name: "Meili", slug: "meili", logo: "meili", url: "https://www.meili.travel", categories: ["Travel", "Distribution"] },
  { name: "Deal Engine", slug: "deal-engine", logo: "dealengine", url: "https://deal-engine.com", categories: ["Travel", "Corporate"] },
  { name: "Point.Me", slug: "point-me", logo: "point.me", url: "https://www.point.me", categories: ["Travel", "Distribution", "Experience"] },
  { name: "HyperGuest", slug: "hyperguest", logo: "hyperguest", url: "https://www.hyperguest.com", categories: ["Travel", "Distribution"] },
  { name: "RS21", slug: "rs21", logo: "rs21", url: "https://rs21.io", categories: ["Travel", "Horizontal"] },
  { name: "Safara", slug: "safara", logo: "safara", url: "https://www.safara.com", categories: ["Travel", "Distribution"] },
  { name: "NLX", slug: "nlx", logo: "nlx", url: "https://nlx.ai", categories: ["Travel", "Horizontal"] },
  { name: "Bounce", slug: "bounce", logo: "bounce", url: "https://bounce.com", categories: ["Travel", "Horizontal"] },
  { name: "TripSuite", slug: "tripsuite", logo: "tripsuite", url: "https://www.tripsuite.com", categories: ["Travel", "Corporate"] },
  { name: "CruiseBound", slug: "cruisebound", logo: "cruisebound", url: "https://www.cruisebound.com", categories: ["Travel", "Distribution"] },
  { name: "Bonafide", slug: "bonafide", logo: "bonafide", url: "https://bonafide.ai", categories: ["Travel", "Distribution"] },
  { name: "Amenitiz", slug: "amenitiz", logo: "amenitiz", url: "https://amenitiz.com/en", categories: ["Travel", "Hospitality"] },
  { name: "Bridge", slug: "bridge", logo: "bridge", url: "https://www.bridgemarketplace.com", categories: ["Travel", "Hospitality", "Prop Tech"] },
  { name: "Hermetic", slug: "hermetic", logo: "hermetic-ai", url: "https://www.hermetic.ai", categories: ["Travel", "Hospitality", "Food Service"] },
  { name: "Cafeteria", slug: "cafeteria", logo: "cafeteria", url: "https://www.teamcafeteria.com", categories: ["Travel", "Horizontal"] },
  { name: "Journey", slug: "journey", logo: "journey", url: "https://www.journey.com", categories: ["Travel", "Hospitality", "Experience"] },
  { name: "Somo", slug: "somo", logo: "somo", w: 80, url: "https://somo.ai", categories: ["Travel", "Prop Tech", "Sustainability"] },
  { name: "ClaraSight", slug: "clarasight", logo: "clarasight", url: "https://www.clarasight.com", categories: ["Travel", "Corporate", "Sustainability"] },
  { name: "Resort Pass", slug: "resort-pass", logo: "resortpass", url: "https://www.resortpass.com", categories: ["Travel", "Hospitality", "Distribution"] },
  { name: "Jetstream", slug: "jetstream", w: 180, url: "https://jetstream.security", categories: ["Travel", "Horizontal"] },
  { name: "Slang", slug: "slang", logo: "slang", url: "https://www.slang.ai", categories: ["Travel", "Food Service"] },
  { name: "Cloaked", slug: "cloaked", w: 160, url: "https://cloaked.com", categories: ["Travel", "Horizontal"], highlight: true },
  { name: "Rove", slug: "rove", logo: "rove", url: "https://www.rove.com", categories: ["Travel", "Distribution"] },
  { name: "Social Tables", slug: "social-tables", logo: "socialtables", acquired: "Cvent", url: "https://www.socialtables.com", categories: ["Travel", "Hospitality"] },
  { name: "Id90", slug: "id90", logo: "id90", url: "https://www.id90travel.com", categories: ["Travel", "Distribution"] },
  { name: "Upgrade", slug: "upgrade", logo: "upgrade", url: "https://www.upgrade.com", categories: ["Travel", "Horizontal"] },
  { name: "Duetto", slug: "duetto", w: 180, acquired: "GrowthCurve", url: "https://www.duettocloud.com", categories: ["Travel", "Hospitality"] },
];

export default function EditorialPortfolioPage({ articles }: { articles: Article[] }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };
  const { ref: heroArrowRef, arrow: heroArrow } = useHeadlineArrow<HTMLSpanElement>({ playOnce: true });
  const navOverlay = useNavigationOverlay();
  // Bottom-of-hero "Active Investments" scroll anchor. Fades in 3.5s after mount
  // (giving the testimonial typewriter time to settle), fades out permanently
  // once the user scrolls far enough past the hero.
  const heroSectionRef = useRef<HTMLElement>(null);
  const [anchorVisible, setAnchorVisible] = useState(false);
  const [anchorDismissed, setAnchorDismissed] = useState(false);
  useEffect(() => {
    if (anchorDismissed) return;
    const t = setTimeout(() => setAnchorVisible(true), 3500);
    return () => clearTimeout(t);
  }, [anchorDismissed]);
  useEffect(() => {
    if (anchorDismissed) return;
    const onScroll = () => {
      if (!heroSectionRef.current) return;
      const rect = heroSectionRef.current.getBoundingClientRect();
      if (rect.bottom < window.innerHeight * 0.5) {
        setAnchorVisible(false);
        setAnchorDismissed(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [anchorDismissed]);

  // Hero testimonial typewriter: cycle through valid Home testimonials with a
  // character-by-character type-in, hold, fade, then advance.
  const heroTestimonials = TESTIMONIALS.filter((t) => t.quote.length > 0);
  const [tIdx, setTIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  type TPhase = "typing" | "complete" | "fading";
  const [tPhase, setTPhase] = useState<TPhase>("typing");
  const current = heroTestimonials[tIdx];
  const fullText = current.quote;
  useEffect(() => {
    if (tPhase === "typing") {
      if (charCount < fullText.length) {
        const id = setTimeout(() => setCharCount((n) => n + 1), 18);
        return () => clearTimeout(id);
      }
      setTPhase("complete");
      return;
    }
    if (tPhase === "complete") {
      // Hold longer for longer quotes; clamp between 5s and 8s.
      const hold = Math.min(8000, Math.max(5000, fullText.length * 35));
      const id = setTimeout(() => setTPhase("fading"), hold);
      return () => clearTimeout(id);
    }
    // fading
    const id = setTimeout(() => {
      setTIdx((i) => (i + 1) % heroTestimonials.length);
      setCharCount(0);
      setTPhase("typing");
    }, 500);
    return () => clearTimeout(id);
  }, [tPhase, charCount, fullText, heroTestimonials.length]);

  const categoryList = [
    "Highlights",
    "Travel",
    "Corporate",
    "Distribution",
    "Experience",
    "Food Service",
    "Horizontal",
    "Hospitality",
    "OpCo",
    "Prop Tech",
    "Sustainability",
  ];
  const searchParams = useSearchParams();
  const [active, setActive] = useState("Travel");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categoryList.includes(cat)) {
      setActive(cat);
    }
  }, [searchParams]);

  const matches =
    active === "Highlights"
      ? companies.filter((co) => co.highlight)
      : companies.filter((co) => co.categories.includes(active));
  const byName = (a: Company, b: Company) => a.name.localeCompare(b.name);
  const filtered = [
    ...matches.filter((co) => co.highlight).sort(byName),
    ...matches.filter((co) => !co.highlight).sort(byName),
  ];

  return (
    <div className="relative isolate min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <CloudBackground />
      <EditorialNav active="portfolio" />

      {/* ── Hero ── */}
      <section ref={heroSectionRef} className="relative px-6 md:px-12 py-24 md:min-h-[calc(100vh-105px)] flex flex-col md:justify-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 md:min-h-[36rem]">
          <div className="md:flex-1" style={navOverlay?.dimStyle}>
            <span ref={heroArrowRef} className="relative text-[0.72rem] uppercase tracking-[0.22em] block mb-8 w-fit" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
              {heroArrow}
              Portfolio
            </span>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.08] font-normal italic mb-8" style={{ ...serif, color: c.text }}>
              Investing in companies shaping the future of global travel.
            </h1>
            <p className="text-[1.15rem] leading-[1.7]" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
              Travel isn&rsquo;t just a vertical. Our portfolio encompasses all companies who can or will sell to and partner with the global travel industry. Thayer invests on behalf of the travel industry to make travel operations and consumption &mdash; safer, easier, and fundamentally more intelligent.
            </p>
          </div>

          {/* Right column: founder testimonial cycling through the same quotes used
              on Home, animated character-by-character inside a bordered card so it
              reads as a distinct visual element rather than free-floating text.
              Card dimensions match the Insights featured-article card exactly so the
              hero right-side composition reads the same across both pages. */}
          <div className="md:flex-1">
            <div
              className="w-full md:w-[min(34rem,100%)] md:ml-auto border p-8 md:p-10 flex flex-col h-[38rem] md:h-[34rem]"
              style={{
                borderColor: c.rule,
                backgroundColor: c.surface,
                opacity: tPhase === "fading" ? 0 : 1,
                transition: "opacity 500ms ease-in-out",
              }}
            >
              <span className="text-[2.5rem] leading-none mb-4" style={{ ...serif, color: c.accent }} aria-hidden>&ldquo;</span>
              <p className="text-[clamp(1.35rem,1.9vw,1.75rem)] leading-[1.45] font-light" style={{ ...sans, color: c.text }}>
                {fullText.slice(0, charCount)}
                {tPhase === "typing" && (
                  <span className="inline-block ml-[2px] animate-caret-blink" style={{ color: c.accent }} aria-hidden>|</span>
                )}
              </p>
              <div className="text-right mt-auto pt-8">
                <span className="block text-[0.78rem] uppercase tracking-[0.18em]" style={{ ...sans, color: c.text, fontWeight: c.sansWeight }}>{current.author}</span>
                <span className="block text-[0.72rem] uppercase tracking-[0.14em] mt-1" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{current.role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll-to-Active-Investments anchor: fades in 3.5s after mount,
            fades out permanently once the user scrolls past the hero. */}
        <a
          href="#active-investments"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("active-investments")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{
            opacity: anchorVisible ? 1 : 0,
            pointerEvents: anchorVisible ? "auto" : "none",
            transition: "opacity 600ms ease-out",
            outlineColor: c.accent,
          }}
          aria-label="Scroll to Active Investments section"
        >
          <span className="text-[0.72rem] uppercase tracking-[0.22em] transition-colors group-hover:text-[#2E9D55]" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
            Active Investments
          </span>
          <span
            className="text-[1.2rem] leading-none group-hover:text-[#2E9D55]"
            style={{
              color: c.accentText,
              transform: anchorVisible ? "translateY(0)" : "translateY(-14px)",
              transition: "transform 1200ms ease-out, color 200ms ease-out",
            }}
            aria-hidden
          >
            &darr;
          </span>
        </a>
      </section>

      {/* ── Active Investments (01) ── */}
      <section id="active-investments" className="px-6 md:px-12 py-24 md:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Active Investments" number="01" />
          <div className="sticky top-[89px] md:top-[105px] z-40 flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-x-visible gap-2 pt-4 pb-8 mb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ backgroundColor: c.bg }}>
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="text-[0.7rem] uppercase tracking-[0.16em] px-5 py-2 border shrink-0 transition-all duration-300 hover:bg-[rgba(46,157,85,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: active === cat ? c.accent : c.rule,
                  color: active === cat ? c.accentText : c.muted,
                  backgroundColor: active === cat ? "rgba(46,157,85,0.1)" : undefined,
                  fontWeight: c.sansWeight,
                  outlineColor: c.accent,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {filtered.map((co) => {
              const stem = co.logo ?? co.slug;
              const showLogo = Boolean(co.logo || co.w);
              const swapToWhite = Boolean(co.img) || !co.noWhite;
              const logoStyle: React.CSSProperties = co.w
                ? { width: co.w, maxWidth: "80%" }
                : { maxWidth: "80%", maxHeight: "45%" };
              return (
                <a
                  key={co.slug}
                  href={co.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${co.name}`}
                  className="group aspect-[4/3] border flex items-center justify-center px-4 md:px-6 relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ backgroundColor: c.surface, borderColor: c.rule, outlineColor: c.accent }}
                >
                  {showLogo ? (
                    <>
                      {co.img ? (
                        <>
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-all duration-700 ease-out bg-cover" style={{ backgroundImage: `url('${co.img}')`, backgroundPosition: co.bgPos }} />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
                        </>
                      ) : (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" style={{ backgroundColor: c.accent }} />
                      )}
                      <img src={`/logos/portfolio/${stem}-${light ? "light" : "dark"}.svg`} alt={`${co.name} logo`} className={`object-contain relative z-10 ${swapToWhite ? "group-hover:hidden" : ""}`} style={logoStyle} />
                      {swapToWhite && (
                        <img src={`/logos/portfolio/${stem}-dark.svg`} alt={`${co.name} logo`} className={`object-contain relative z-10 hidden group-hover:block transition-transform duration-700 ease-out ${co.img ? "group-hover:scale-110" : ""}`} style={logoStyle} />
                      )}
                    </>
                  ) : (
                    <span
                      className="relative z-10 text-center text-[1.05rem] md:text-[1.15rem] font-normal italic leading-tight transition-colors duration-300 group-hover:text-[#2E9D55]"
                      style={{ ...serif, color: c.text }}
                    >
                      {co.name}
                    </span>
                  )}
                  {co.acquired && (
                    <span
                      className="absolute bottom-3 left-0 right-0 mx-auto w-fit z-20 whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.12em] transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
                      style={{ ...sans, backgroundColor: c.bg, borderColor: c.rule, color: c.muted, fontWeight: c.sansWeight }}
                    >
                      Acquired by {co.acquired}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <EditorialHeadlines number="02" articles={articles} />

      <NextPagePanel current="portfolio" />

      <EditorialFooter />
    </div>
  );
}
