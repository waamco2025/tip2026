"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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

const companies = [
  {
    name: "Canary Technologies", slug: "canary-technologies", w: 220, url: "https://www.canarytechnologies.com",
    img: "/images/carousel/canary.webp", category: "Hospitality Technology",
    desc: "Modern hospitality technology platform powering guest management and hotel operations.",
    founders: [
      { name: "Harman Singh Narula", title: "Co-Founder & CEO" },
      { name: "SJ Sawhney", title: "Co-Founder & President" },
    ],
    story: "Harman Singh Narula and SJ Sawhney saw an industry stuck in the past — hotels still relying on paper forms, manual ID checks, and outdated payment systems. They built Canary Technologies to digitize the entire guest journey, from contactless check-in to dynamic upselling. We invested because their platform doesn't just modernize operations — it transforms the economics of hospitality. Today, Canary powers thousands of properties worldwide, helping hotels increase revenue while delivering the seamless experience modern travelers expect.",
    headlines: [
      { date: "Mar 2026", title: "Canary Technologies Raises $50M Series C to Expand Global Reach" },
      { date: "Jan 2026", title: "Canary Partners with Major Hotel Chain for Contactless Check-In" },
    ],
  },
  {
    name: "Mews", slug: "mews", w: 200, url: "https://www.mews.com",
    img: "/images/carousel/mews.webp", category: "Hospitality Technology",
    desc: "Cloud-native property management system for modern hospitality businesses worldwide.",
    founders: [
      { name: "Richard Valtr", title: "Founder" },
    ],
    story: "Richard Valtr believed the hotel industry deserved better than decades-old software held together with workarounds. He built Mews from the ground up as a cloud-native operating system — not a digitized version of legacy tools, but a fundamentally new way to run a hotel. We backed Mews because their architecture enables what legacy systems can't: real-time automation, open integrations, and a guest experience that feels effortless. Mews now powers properties across dozens of countries, proving that modern infrastructure can reshape an entire industry.",
    headlines: [
      { date: "Feb 2026", title: "Mews Expands to 50 Countries with New APAC Launch" },
      { date: "Dec 2025", title: "Mews Named Top PMS by Hotel Tech Report for Third Year" },
    ],
  },
  {
    name: "Jetstream", slug: "jetstream", w: 180, url: "https://jetstream.security",
    img: "", category: "Cybersecurity & Privacy",
    desc: "AI governance platform giving enterprises visibility and control over autonomous AI systems.",
    founders: [
      { name: "Raj Rajamani", title: "Founder & CEO" },
      { name: "Jared Phipps", title: "Founder & COO" },
      { name: "Venu Vissamsetty", title: "Founder & Chief Architect" },
      { name: "Jatheen Anand", title: "Founder & CTO" },
    ],
    story: "Raj Rajamani, Jared Phipps, Venu Vissamsetty, and Jatheen Anand are security veterans who held senior leadership roles at CrowdStrike, SentinelOne, and Cohesity. They saw enterprises racing to deploy AI without guardrails — 93% lacking any AI security governance. They built Jetstream to be the trust layer that lets organizations scale AI safely, providing visibility across teams and vendors, agentic identity management, and runtime control. We invested because as AI becomes critical infrastructure across travel and every other industry, governance isn\u2019t a nice-to-have — it\u2019s the prerequisite for trust.",
    headlines: [
      { date: "Apr 2026", title: "Jetstream Emerges from Stealth with $34M Seed Led by Redpoint Ventures" },
      { date: "Mar 2026", title: "Jetstream Launches AI Governance Platform for Enterprise Security Teams" },
    ],
  },
  {
    name: "Cloaked", slug: "cloaked", w: 160, url: "https://cloaked.com",
    img: "", category: "Cybersecurity & Privacy",
    desc: "All-in-one consumer privacy and security platform protecting digital identities in the AI era.",
    founders: [
      { name: "Arjun Bhatnagar", title: "Co-Founder & CEO" },
      { name: "Abhijay Bhatnagar", title: "Co-Founder & CTO" },
    ],
    story: "Brothers Arjun and Abhijay Bhatnagar recognized that AI-powered scams were weaponizing personal data at unprecedented scale, while privacy tools remained fragmented and reactive. They built Cloaked as the all-in-one platform that gives people back control — masked emails, masked phone numbers, data broker removal, dark web monitoring, and identity theft insurance in a single product. With 350,000+ paying users, 10 million+ identities protected, and 10x year-over-year growth, Cloaked has proven massive consumer demand. We invested because privacy is becoming mandatory infrastructure, and Cloaked is expanding from consumer traction into enterprise — a path that mirrors the most successful platform companies in cybersecurity.",
    headlines: [
      { date: "Mar 2026", title: "Cloaked Raises $375M Series B Led by General Catalyst" },
      { date: "Jan 2026", title: "Cloaked Surpasses 350,000 Paying Users and 10M Protected Identities" },
    ],
  },
  {
    name: "MarginEdge", slug: "marginedge", w: 220, url: "https://www.marginedge.com",
    img: "/images/carousel/marginedge.webp", category: "Restaurant Technology",
    desc: "Restaurant management platform automating back-office operations and financial insights.",
    founders: [
      { name: "Bo Davis", title: "Co-Founder & CEO" },
    ],
    story: "Bo Davis spent years watching restaurant operators drown in invoices, spreadsheets, and manual inventory counts. He built MarginEdge to eliminate the back-office burden entirely — turning stacks of paper into real-time financial intelligence. We invested because restaurants are the backbone of the hospitality ecosystem, and MarginEdge gives operators the visibility they need to thrive. The platform now automates operations for thousands of restaurants, helping them focus on what matters: the food and the guest.",
    headlines: [
      { date: "Mar 2026", title: "MarginEdge Surpasses 5,000 Restaurant Locations" },
      { date: "Nov 2025", title: "MarginEdge Launches AI-Powered Inventory Forecasting" },
    ],
  },
  {
    name: "Nuit\u00e9e", slug: "nuitee", w: 160, url: "https://nuitee.com",
    img: "/images/carousel/nuitee.webp", category: "Travel Distribution",
    desc: "B2B hotel distribution platform connecting travel companies to global accommodation inventory.",
    founders: [
      { name: "Med Benmansour", title: "Founder & CEO" },
    ],
    story: "Med Benmansour understood that hotel distribution was broken — fragmented APIs, inconsistent data, and unreliable connectivity made it nearly impossible for travel companies to access global inventory efficiently. He built Nuit\u00e9e as the infrastructure layer the industry was missing: a single API that connects travel platforms to millions of hotel rooms worldwide. We backed Nuit\u00e9e because distribution is the plumbing of travel, and Med's platform makes it work the way it always should have.",
    headlines: [
      { date: "Feb 2026", title: "Nuit\u00e9e API Now Powers Over 200 Travel Platforms Globally" },
      { date: "Oct 2025", title: "Nuit\u00e9e Closes Series A to Scale Hotel Distribution Infrastructure" },
    ],
  },
  {
    name: "Cardless", slug: "cardless", w: 200, url: "https://www.cardless.com",
    img: "/images/carousel/cardless.webp", category: "Payments & Loyalty",
    desc: "Modern credit card platform enabling brands to launch and manage co-branded card programs.",
    founders: [
      { name: "Scott Kazmierowicz", title: "Co-Founder & CEO" },
      { name: "Michael Spelfogel", title: "Co-Founder & President" },
    ],
    story: "Scott Kazmierowicz and Michael Spelfogel recognized that co-branded credit cards were one of the most powerful tools in travel loyalty — but launching one required years of bank negotiations and millions in upfront investment. They built Cardless to change that equation entirely, enabling any brand to launch a card program in weeks instead of years. We invested because loyalty and payments sit at the heart of the travel economy, and Cardless makes this capability accessible to brands of every size.",
    headlines: [
      { date: "Jan 2026", title: "Cardless Partners with Major Airline for New Rewards Card" },
      { date: "Sep 2025", title: "Cardless Platform Surpasses $1B in Annual Transaction Volume" },
    ],
  },
  {
    name: "Rain", slug: "rain", w: 160, url: "https://www.rain.xyz",
    img: "/images/carousel/rain.webp", category: "Consumer Finance",
    desc: "Earned wage access platform helping employers offer on-demand pay to their workforce.",
    founders: [
      { name: "Farooq Malik", title: "Co-Founder & CEO" },
      { name: "Charles Yoo-Naut", title: "Co-Founder" },
    ],
    story: "Farooq Malik and Charles Yoo-Naut saw that the workers powering the hospitality industry — housekeepers, servers, front desk staff — were living paycheck to paycheck while their earned wages sat locked in two-week pay cycles. They built Rain to give workers instant access to the money they've already earned. We backed Rain because the travel and hospitality workforce is the foundation of everything we invest in, and financial wellness directly impacts retention, productivity, and service quality.",
    headlines: [
      { date: "Mar 2026", title: "Rain Expands Earned Wage Access to 500+ Hospitality Employers" },
      { date: "Dec 2025", title: "Rain Raises Series B to Accelerate Workforce Finance Platform" },
    ],
  },
  {
    name: "Super", slug: "super", w: 190, url: "https://www.super.com",
    img: "/images/carousel/super.webp", category: "Consumer Finance",
    desc: "Next-generation travel and experiences platform for the modern traveler.",
    founders: [
      { name: "Hussein Fazal", title: "Co-Founder & CEO" },
    ],
    story: "Hussein Fazal set out to build the app that helps everyday consumers save money on everything — starting with travel. Super.com combines discounted hotel bookings, a credit-building debit card, and exclusive savings into one platform that rewards users for spending smarter. We invested because Super.com is redefining what a travel platform can be: not just a booking engine, but a financial companion that makes travel more accessible for millions of people through one powerful platform.",
    headlines: [
      { date: "Feb 2026", title: "Super.com Surpasses 10 Million Users Worldwide" },
      { date: "Nov 2025", title: "Super.com Launches Credit-Building Features for Travelers" },
    ],
  },
];

export default function EditorialPortfolioPage() {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };

  const categoryList = ["All", "Hospitality Technology", "Restaurant Technology", "Travel Distribution", "Payments & Loyalty", "Consumer Finance", "Cybersecurity & Privacy"];
  const searchParams = useSearchParams();
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [expandedVisible, setExpandedVisible] = useState<string | null>(null);

  const handleExpand = (slug: string | null) => {
    if (slug) {
      setExpanded(slug);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setExpandedVisible(slug);
          const el = document.getElementById(slug);
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
          }
        });
      });
    } else {
      setExpandedVisible(null);
      setTimeout(() => setExpanded(null), 500);
    }
  };

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categoryList.includes(cat)) {
      setActive(cat);
    }
  }, [searchParams]);

  const filtered = active === "All" ? companies : companies.filter((co) => co.category === active);

  const metaStats = [
    { value: "$2.8B+", label: "Portfolio Value" },
    { value: "9", label: "Active Companies" },
    { value: "6", label: "Sectors" },
    { value: "3", label: "Funds" },
  ];

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <EditorialNav active="portfolio" />

      {/* ── Hero ── */}
      <section className="px-6 md:px-12 py-24 md:py-40">
        <div className="max-w-7xl mx-auto">
          <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>Portfolio</span>
          <h1 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.08] font-light italic mb-12 max-w-4xl" style={{ ...serif, color: c.text }}>
            Investing in companies shaping the future of global travel.
          </h1>
          <div className="flex flex-wrap gap-8 md:gap-16">
            {metaStats.map((s, i) => (
              <div key={i}>
                <span className="text-[2.2rem] font-light block mb-1" style={{ ...serif, color: c.accent, fontWeight: c.statWeight }}>{s.value}</span>
                <span className="text-[0.72rem] uppercase tracking-[0.18em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio List (01) ── */}
      <section id="active-investments" className="px-6 md:px-12 py-24 md:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Active Investments" number="01" />
          <div className="flex flex-wrap gap-2 mb-12">
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActive(cat);
                  handleExpand(null);
                  setTimeout(() => {
                    document.getElementById("active-investments")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 100);
                }}
                className="text-[0.7rem] uppercase tracking-[0.16em] px-2 py-2 border transition-all duration-300 hover:bg-[rgba(196,154,69,0.1)]"
                style={{
                  borderColor: active === cat ? c.accent : c.rule,
                  color: active === cat ? c.accent : c.muted,
                  backgroundColor: active === cat ? "rgba(196,154,69,0.1)" : undefined,
                  fontWeight: c.sansWeight,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            {filtered.map((co) => {
              const isExpanded = expanded === co.slug;
              const isVisible = expandedVisible === co.slug;
              return (
                <div key={co.slug} id={co.slug} className="scroll-mt-24">
                  {/* Collapsed state */}
                  <div
                    className="flex flex-col md:flex-row cursor-pointer group transition-opacity duration-500"
                    onClick={() => handleExpand(isExpanded ? null : co.slug)}
                    style={{ display: isExpanded ? "none" : undefined, opacity: isExpanded ? 0 : 1 }}
                  >
                    <div className="w-full md:w-1/3 aspect-[4/3] border flex items-center justify-center px-10 relative overflow-hidden shrink-0" style={{ backgroundColor: c.surface, borderColor: c.rule }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-all duration-700 ease-out bg-cover" style={{ backgroundImage: `url('${co.img}')`, backgroundPosition: "right center" }} />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
                      <img src={`/logos/portfolio/${co.slug}-${light ? "light" : "dark"}.svg`} alt={co.name} className="object-contain relative z-10 group-hover:hidden" style={{ width: co.w, maxWidth: "80%" }} />
                      <img src={`/logos/portfolio/${co.slug}-dark.svg`} alt={co.name} className="object-contain relative z-10 hidden group-hover:block group-hover:scale-125 transition-transform duration-700 ease-out" style={{ width: co.w, maxWidth: "80%" }} />
                    </div>
                    <div className="flex-1 flex flex-col justify-center pl-0 md:pl-10 pt-6 md:pt-0">
                      <span className="text-[0.78rem] uppercase tracking-[0.2em] block mb-2" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>{co.category}</span>
                      <h3 className="text-[2rem] md:text-[2.5rem] font-light italic mb-3 group-hover:text-[#C49A45] transition-colors" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{co.name}</h3>
                      <p className="text-[1.1rem] leading-[1.7] mb-4" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{co.desc}</p>
                      <span className="text-[0.72rem] uppercase tracking-[0.18em] mt-2" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>
                        Read More &rarr;
                      </span>
                    </div>
                  </div>

                  {/* Expanded state */}
                  {isExpanded && (
                    <div className="flex flex-col md:flex-row transition-opacity duration-500 ease-in-out" style={{ opacity: isVisible ? 1 : 0 }}>
                      {/* Left — photo + logo, 50% */}
                      <div
                        className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center shrink-0"
                        style={{
                          backgroundImage: `url('${co.img}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "85% center",
                          border: "1px solid rgb(196,154,69)",
                          minHeight: 500,
                        }}
                      >
                        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
                        <img src={`/logos/portfolio/${co.slug}-dark.svg`} alt={co.name} className="object-contain relative z-10" style={{ width: co.w * 1.5, maxWidth: "65%" }} />
                      </div>

                      {/* Right — content, 50% */}
                      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center border border-l-0 relative" style={{ backgroundColor: c.surface, borderColor: c.rule }}>
                        <button onClick={() => handleExpand(null)} className="absolute top-4 right-5 text-[2rem] leading-none hover:opacity-60 transition-opacity" style={{ color: c.muted }}>&times;</button>
                        <span className="text-[0.78rem] uppercase tracking-[0.2em] block mb-2" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>{co.category}</span>
                        <h3 className="text-[2rem] md:text-[2.5rem] font-light italic mb-4" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{co.name}</h3>

                        {/* Founders */}
                        <div className="mb-6">
                          {co.founders.map((f, i) => (
                            <div key={i} className="mb-2">
                              <span className="text-[1.5rem] font-light italic" style={{ ...serif, color: c.text }}>{f.name}</span>
                              <span className="text-[0.72rem] uppercase tracking-[0.18em] block" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>{f.title}</span>
                            </div>
                          ))}
                        </div>

                        {/* Story */}
                        <p className="text-[1.15rem] leading-[1.7] mb-8" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
                          {co.story}
                        </p>

                        {/* Headlines */}
                        <div className="border-t pt-6" style={{ borderColor: c.rule }}>
                          <span className="text-[0.68rem] uppercase tracking-[0.22em] block mb-4" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>Recent Headlines</span>
                          <div className="flex flex-col">
                            {co.headlines.map((h, i) => (
                              <div key={i} className="flex items-center gap-6 py-3 border-b" style={{ borderColor: c.rule }}>
                                <span className="text-[0.72rem] uppercase tracking-[0.18em] shrink-0 w-20" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{h.date}</span>
                                <span className="text-[1.5rem] font-light italic flex-1" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{h.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* External link */}
                        <a href={co.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[0.72rem] uppercase tracking-[0.18em] mt-6 inline-block hover:opacity-80 transition-colors" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>
                          Visit {co.name} &rarr;
                        </a>

                        {/* Close */}
                        <button
                          onClick={() => handleExpand(null)}
                          className="text-[0.72rem] uppercase tracking-[0.18em] mt-6 text-left hover:opacity-80 transition-colors"
                          style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}
                        >
                          Close &times;
                        </button>
                      </div>
                    </div>
                  )}
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
