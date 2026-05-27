"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { EditorialNav, EditorialFooter, EditorialHeadlines } from "./HomePage";
import { useEditorialMode, ec } from "./EditorialModeContext";
import type { Article } from "@/lib/article-types";

function SectionHeader({ label, number }: { label: string; number: string }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  return (
    <div className="flex items-center gap-6 mb-16 md:mb-20">
      <span className="text-[0.72rem] uppercase tracking-[0.22em] shrink-0" style={{ fontFamily: "'Syne', sans-serif", color: c.accentText, fontWeight: c.sansWeight }}>{label}</span>
      <div className="flex-1 h-px" style={{ backgroundColor: c.rule }} />
      <span className="text-[0.72rem] uppercase tracking-[0.22em] shrink-0" style={{ fontFamily: "'Syne', sans-serif", color: c.muted, fontWeight: c.sansWeight }}>{number}</span>
    </div>
  );
}

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
  { name: "Cardinal Lands", slug: "cardinal-lands", logo: "cardinal-lands", url: "https://cardinallands.com", categories: ["Travel", "Operations", "Hospitality"] },
  { name: "PayTheory", slug: "paytheory", logo: "paytheory", url: "https://www.paytheory.com", categories: ["Travel", "Horizontal", "Sustainability"] },
  { name: "Directo", slug: "directo", logo: "direct", url: "https://www.directsoftware.com", categories: ["Travel", "Hospitality", "Distribution"] },
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
  { name: "May Mobility", slug: "may-mobility", logo: "may-mobility", url: "https://maymobility.com", categories: ["Travel", "Transportation"] },
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

  const categoryList = [
    "Travel",
    "Corporate",
    "Distribution",
    "Experience",
    "Food Service",
    "Horizontal",
    "Hospitality",
    "OpCo",
    "Operations",
    "Prop Tech",
    "Sustainability",
    "Transportation",
  ];
  const searchParams = useSearchParams();
  const [active, setActive] = useState("Travel");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categoryList.includes(cat)) {
      setActive(cat);
    }
  }, [searchParams]);

  const matches = companies.filter((co) => co.categories.includes(active));
  const filtered = [...matches.filter((co) => co.highlight), ...matches.filter((co) => !co.highlight)];

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <EditorialNav active="portfolio" />

      {/* ── Hero ── */}
      <section className="px-6 md:px-12 py-24 md:min-h-[600px] flex flex-col">
        <div className="w-full max-w-7xl mx-auto">
          <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>Portfolio</span>
          <h1 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.08] font-light italic mb-8 max-w-4xl" style={{ ...serif, color: c.text }}>
            Investing in companies shaping the future of global travel.
          </h1>
          <p className="text-[1.15rem] leading-[1.7] max-w-3xl" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
            Travel isn&rsquo;t just a vertical. Our portfolio encompasses all companies who can or will sell to and partner with the global travel industry. Thayer invests on behalf of the travel industry to make travel operations and consumption &mdash; safer, easier, and fundamentally more intelligent.
          </p>
        </div>
      </section>

      {/* ── Active Investments (01) ── */}
      <section id="active-investments" className="px-6 md:px-12 py-24 md:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Active Investments" number="01" />
          <div className="sticky top-[89px] md:top-[105px] z-40 flex flex-wrap gap-2 pt-4 pb-8 mb-4" style={{ backgroundColor: c.bg }}>
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="text-[0.7rem] uppercase tracking-[0.16em] px-4 py-2 border transition-all duration-300 hover:bg-[rgba(46,157,85,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
                      className="relative z-10 text-center text-[1.05rem] md:text-[1.15rem] font-light italic leading-tight transition-colors duration-300 group-hover:text-[#2E9D55]"
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

      <EditorialFooter />
    </div>
  );
}
