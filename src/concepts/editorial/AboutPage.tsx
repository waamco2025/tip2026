"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { EditorialNav, EditorialFooter, EditorialHeadlines, CloudBackground, SectionHeader, NextPagePanel } from "./HomePage";
import { useNavigationOverlay } from "./NavigationOverlay";
import { useEditorialMode, ec } from "./EditorialModeContext";
import type { Article } from "@/lib/article-types";

export default function EditorialAboutPage({ articles }: { articles: Article[] }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };
  const navOverlay = useNavigationOverlay();

  // Hero arrow flight: brand arrow rises diagonally through the cloud band,
  // drawing a contrail from a fixed start point to a rest point just above-right
  // of the headline. Anchoring the end to the h1's bounding box keeps the arrow
  // tip clear of the text regardless of viewport size — the h1's right edge is
  // governed by font clamp + max-w-4xl, not section width, so a fixed % endpoint
  // would land inside the text at wide-but-short viewports. Plays once on mount.
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroH1Ref = useRef<HTMLHeadingElement>(null);
  const [contrailLength, setContrailLength] = useState(0);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 21, y: 98 });
  const [endPos, setEndPos] = useState<{ x: number; y: number }>({ x: 60, y: 25 });
  // The brand arrow glyph's natural orientation points up-right at ~45° from
  // horizontal. The contrail's actual screen-pixel angle depends on viewport
  // aspect (preserveAspectRatio="none" stretches viewBox non-uniformly). At
  // mobile the overlay is much taller than wide, so the contrail looks
  // steeper than the arrow's default 45°. Rotate the arrow glyph by the delta
  // so it visually points along the contrail at any viewport.
  const [arrowRotation, setArrowRotation] = useState(0);
  const [heroArrowFlown, setHeroArrowFlown] = useState(false);
  const [flightComplete, setFlightComplete] = useState(false);
  // Bottom-of-hero "Our Process" scroll anchor. Fades in once the arrow flight
  // finishes; fades out (permanently for this page view) once the user scrolls
  // far enough that the hero is mostly above the viewport.
  const [anchorVisible, setAnchorVisible] = useState(false);
  const [anchorDismissed, setAnchorDismissed] = useState(false);
  useEffect(() => {
    if (!flightComplete || anchorDismissed) return;
    const t = setTimeout(() => setAnchorVisible(true), 1000);
    return () => clearTimeout(t);
  }, [flightComplete, anchorDismissed]);
  useEffect(() => {
    if (anchorDismissed) return;
    const onScroll = () => {
      if (!heroOverlayRef.current) return;
      const rect = heroOverlayRef.current.getBoundingClientRect();
      // Once the hero's bottom edge crosses the upper half of the viewport,
      // the user has clearly scrolled past it — dismiss the anchor for good.
      if (rect.bottom < window.innerHeight * 0.5) {
        setAnchorVisible(false);
        setAnchorDismissed(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [anchorDismissed]);
  useEffect(() => {
    // Whole trajectory is shifted left by SHIFT_LEFT_PX (start and end). The
    // start uses a base % then subtracts the px shift converted to a %; the
    // end's px offset past h1.right already absorbs the shift directly.
    const BASE_START_X = 26;
    const BASE_START_Y = 98;
    const SHIFT_LEFT_PX = 86;
    const END_OFFSET_X = 28 - SHIFT_LEFT_PX; // px past h1's right edge (was 28; shifted left 86px)
    const END_OFFSET_Y = 12; // px above h1's top
    const measure = () => {
      if (!heroOverlayRef.current || !heroH1Ref.current) return;
      const overlayRect = heroOverlayRef.current.getBoundingClientRect();
      const h1Rect = heroH1Ref.current.getBoundingClientRect();
      const startX = BASE_START_X - (SHIFT_LEFT_PX / overlayRect.width) * 100;
      setStartPos({ x: startX, y: BASE_START_Y });
      const endXPx = h1Rect.right - overlayRect.left + END_OFFSET_X;
      const endYPx = h1Rect.top - overlayRect.top - END_OFFSET_Y;
      const endX = Math.min(96, Math.max(20, (endXPx / overlayRect.width) * 100));
      const endY = Math.min(96, Math.max(4, (endYPx / overlayRect.height) * 100));
      setEndPos({ x: endX, y: endY });
      const dx = ((endX - startX) / 100) * overlayRect.width;
      const dy = ((BASE_START_Y - endY) / 100) * overlayRect.height;
      setContrailLength(Math.sqrt(dx * dx + dy * dy));
      // In CSS coords (y positive down): the path's actual screen angle is
      // atan2(-dy_up, dx) where dy_up is "amount going up" (positive). For an
      // up-right path that gives a NEGATIVE CSS angle (e.g., -45° desktop,
      // -57° tall mobile). The brand arrow's natural CSS angle is -45°, so
      // the rotation we apply is pathAngleCSS - (-45°) = pathAngleCSS + 45°.
      // Negative dy here is "going down" in CSS terms.
      const pathAngleCSS = (Math.atan2(-dy, dx) * 180) / Math.PI;
      setArrowRotation(pathAngleCSS + 45);
    };
    measure();
    let raf1: number | null = null;
    let raf2: number | null = null;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setHeroArrowFlown(true));
    });
    // After the initial 2500ms flight, lock the arrow's transitions off so any
    // future endPos changes (from window resize) snap immediately.
    const flightTimer = setTimeout(() => setFlightComplete(true), 2500);
    window.addEventListener("resize", measure);
    return () => {
      if (raf1 !== null) cancelAnimationFrame(raf1);
      if (raf2 !== null) cancelAnimationFrame(raf2);
      clearTimeout(flightTimer);
      window.removeEventListener("resize", measure);
    };
  }, []);


  const team = [
    { name: "Chris Hemmeter", role: "Managing Partner", photo: "/images/team/chris-hemmeter.webp", bio: "Chris Hemmeter co-founded Thayer Ventures, a venture capital platform investing in technology companies in the travel and mobility space. Prior to Thayer Ventures, Chris was founder and CEO of iCare Marketing (sold to Sysco Foodservice Corporation in 2012); founder and CEO of Dynamic Payment Ventures (sold to Elavon, a subsidiary of US Bank in 2007); CEO of CriticalArc Technologies, a supply-chain software provider to the foodservice industry; founder of E&O Kitchen and Bar, a casual dining restaurant based in San Francisco; founder of The Hemmeter Collection, a direct response retailer; and founder of Hemmeter Publishing, a publisher and distributor of travel books and content. Chris holds a Bachelor of Science from Cornell University." },
    { name: "Tyler Carrico", role: "Managing Partner", photo: "/images/team/tyler-carrico.webp", bio: "Tyler Carrico co-founded Derive Ventures in 2021 and currently serves as a Managing Partner. Prior to Derive, Tyler spent 4 years as an investment professional at Thayer Ventures. At Thayer Ventures, he was the first and only hire during his tenure responsible for investment execution, diligence, sourcing, portfolio support, fund management, and LP advisory. He was directly involved with the deployment of $50 million over 12 portfolio companies and oversaw follow-ons and management of over 40 companies. Prior to Thayer Ventures, Tyler was an investment banking professional in BoA Merril Lynch's Tech, Media and Telecom group. He graduated from the University of Virginia and holds a Bachelor of Science from the McIntire School of Commerce." },
    { name: "Mike Scott", role: "Managing Partner", photo: "/images/team/mike-scott.webp", bio: "Mike Scott co-founded Derive Ventures in 2021 and currently serves as a Managing Partner. Prior to co-founding Derive, Mike spent over 3 years as a private equity investment professional at KSL Capital Partners. At KSL, he had over $4bn of transaction experience covering U.S. hospitality, timeshare, all-inclusive resorts, travel distribution, gaming and alternative accommodations. Prior to KSL, Mike was an investment banking professional in J.P. Morgan's Real Estate, Gaming and Lodging group. Mike currently serves as an advisor to Paradero \u2013 an experiential hospitality brand, operator and owner in Mexico. He graduated from the University of Michigan and holds a Bachelor of Business Administration from the Stephen M. Ross School of Business." },
    { name: "Jeff Jackson", role: "Venture Partner", photo: "/images/team/jeffery-jackson.webp", bio: "Jeff has spent the bulk of his career in executive roles within the transportation and distribution space. Based in Dallas, Jeff spent 14 years with American Airlines, managed the legal separation of Sabre, Inc. from AA and left to become EVP and Chief Financial Officer of the stand-alone company in 2000. Over his 11 years at Sabre, both as Chief Financial Officer and as EVP Corporate Development, Jeff managed the Sabre initial public offering, completed over 25 acquisitions and divestitures of over $8 billion in value, served on the Board of Travelocity, managed the globalization of the Sabre organization, and completed sale of the company to a group of private equity firms, thereby taking Sabre, Inc. private. Jeff serveds on the Boards of Rent-A-Center, a $2.8 billion public rent-to-own retail space company and of Getty Images. Prior to becoming the Managing Director of Thayer Investment Partners, Jeff was a General Partner at Thayer Ventures since 2012. Thayer Ventures invests in travel and hospitality focused start-up tech companies, including hotels, restaurants, travel, cruise and gaming. Jeff is a graduate of Dartmouth College and has an MBA from the Northwestern's Kellogg Business School. He serveds as Chair of Parents Advisory Committee of Carleton College and as an ex-officio member of the Board of Trustees. He is Treasurer and Board member of Fort Worden Hospitality, a conference and events center for music, arts, nature, community, weddings, food and drink in Port Townsend, Washington." },
    { name: "David Brem", role: "Venture Partner", photo: "/images/team/david-brem.webp", bio: "David Brem currently serves as a Venture Partner at Thayer Investment Partners. Prior to TIP, David earned his MBA from the Stephen M. Ross School of Business at the University of Michigan. During business school, David worked at an early-stage venture firm focused on investing in companies transforming transportation, logistics, and advanced air mobility. David also served as Managing Director of Michigan's flagship investment fund, where he led sourcing, diligence, and portfolio support for early-stage investments across sectors, including consumer brands and robotics. David also previously worked in Commercial Strategy at American Airlines, supporting initiatives across the carrier's hub network operations, and founded Michigan's first institutionally recognized aviation organization, engaging with industry leaders across aerospace, climate, and travel technology. Prior to business school, David worked in management consulting, where he focused on modernizing technology solutions for aerospace and aviation organizations, across both defense and commercial engagements. Prior to entering client service, David served as the Subject Matter Expert Lead for his team at the Marine Corps Intelligence Activity, where he led cyber intelligence efforts supporting national security operations in Quantico, VA. In addition to his MBA, David also holds a Bachelor's degree in Political Science from American University, and a Master's degree in Applied Intelligence with a concentration in Cyber Intelligence from Georgetown University." },
    { name: "Chelsea Salamone", role: "Vice President", photo: "/images/team/chelsea-salamone.webp", bio: "Chelsea brings over a decade of expertise in the hospitality industry. Before joining TIP, she spent over 5 years at Standard International, aiding in the global expansion of the Standard and Bunkhouse hotels, and contributing to the development of new brands and brand elements. Prior to her tenure at Standard International, Chelsea held business development positions at Kimpton Hotels & Restaurants and Pyramid Hotel Group, and gained operational experience with Hilton through Hilton Worldwide's Management Training Program. She holds a Bachelor of Science in Hospitality Management from Boston University." },
  ];
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  return (
    <div className="relative isolate min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <CloudBackground />
      <EditorialNav active="about" />

      {/* ── Hero ── */}
      <section className="relative px-6 md:px-12 py-24 md:min-h-[calc(100vh-105px)] flex flex-col md:justify-center overflow-hidden">
        {/* Flying arrow + contrail overlay. SVG line stretches non-uniformly with
            section dimensions; vector-effect keeps the stroke a constant pixel width.
            The arrow div uses % left/top so its center stays aligned with the line
            endpoints regardless of viewport. Hidden below md. */}
        <div ref={heroOverlayRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="contrail-grad" gradientUnits="userSpaceOnUse" x1={startPos.x} y1={startPos.y} x2={endPos.x} y2={endPos.y}>
                <stop offset="0%" stopColor={c.accent} stopOpacity="0" />
                <stop offset="20%" stopColor={c.accent} stopOpacity="1" />
                <stop offset="80%" stopColor={c.accent} stopOpacity="1" />
                <stop offset="100%" stopColor={c.accent} stopOpacity="0" />
              </linearGradient>
            </defs>
            {contrailLength > 0 && (
              <line
                x1={startPos.x} y1={startPos.y} x2={endPos.x} y2={endPos.y}
                stroke="url(#contrail-grad)"
                strokeOpacity="0.5"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                strokeDasharray={contrailLength}
                strokeDashoffset={heroArrowFlown ? 0 : contrailLength}
                style={{ transition: "stroke-dashoffset 2500ms cubic-bezier(0.4, 0, 0.4, 1)" }}
              />
            )}
          </svg>
          <div
            className="absolute"
            style={{
              left: heroArrowFlown ? `${endPos.x}%` : `${startPos.x}%`,
              top: heroArrowFlown ? `${endPos.y}%` : `${startPos.y}%`,
              transform: `translate(-50%, -50%) rotate(${arrowRotation}deg)`,
              opacity: heroArrowFlown ? 1 : 0,
              // Only transition DURING the flight. Before lift-off the transition
              // must be "none" so the arrow snaps to its measured start position.
              // Otherwise measure()'s start-position update (which lands one render
              // before lift-off) is itself still mid-transition when the flight
              // begins, so the arrow launches from a stale x and follows a line
              // offset from the contrail — converging only at the end. The error
              // is tiny on desktop (start x barely moves) but large on mobile
              // (start x shifts ~17%), which is why it only looked broken there.
              transition: heroArrowFlown && !flightComplete
                ? "left 2500ms cubic-bezier(0.4, 0, 0.4, 1), top 2500ms cubic-bezier(0.4, 0, 0.4, 1), opacity 1800ms ease-out"
                : "none",
            }}
          >
            <svg width="36" height="36" viewBox="462 5 22 22" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M462.6,14.1c0-.8.8-1.3,1.5-1.5l17.4-6.1c1-.5,2.2.6,1.8,1.8l-6.1,17.4c-.3.7-.7,1.5-1.5,1.5s-1.5-.7-1.5-1.5v-10h-10c-.8,0-1.5-.7-1.5-1.5Z"
                fill={c.accent}
              />
            </svg>
          </div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto z-10 md:min-h-[36rem]" style={navOverlay?.dimStyle}>
          <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>About the Firm</span>
          <h1 ref={heroH1Ref} className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.08] font-normal italic mb-8 max-w-4xl" style={{ ...serif, color: c.text }}>
            A History of Innovation in Travel.
          </h1>
          <p className="text-[1.15rem] leading-[1.7] max-w-2xl" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
            Since 2008, Thayer Investment Partners has been at the forefront of travel technology investing,
            partnering with visionary founders to build companies that reshape how the world moves, stays, and experiences new places.
          </p>
        </div>

        {/* Scroll-to-next-section anchor: fades in after the arrow flight,
            fades out once the user scrolls past the hero and stays gone. */}
        <a
          href="#our-process"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("our-process")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{
            opacity: anchorVisible ? 1 : 0,
            pointerEvents: anchorVisible ? "auto" : "none",
            transition: "opacity 600ms ease-out",
            outlineColor: c.accent,
          }}
          aria-label="Scroll to Our Process section"
        >
          <span className="text-[0.72rem] uppercase tracking-[0.22em] transition-colors group-hover:text-[#2E9D55]" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
            Our Process
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

      {/* ── Philosophy (01) ── */}
      <section id="our-process" className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500 scroll-mt-[89px] md:scroll-mt-[105px]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Process" number="01" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <h2 className="text-[clamp(2.2rem,4.5vw,4rem)] leading-[1.1] font-normal italic" style={{ ...serif, color: c.text }}>
              Conviction, network, and partnership, refined over 15+ years.
            </h2>
            <p className="text-[1.15rem] leading-[1.7]" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
              While Travel and Tourism is one of the largest industries on earth contributing roughly 10% of global GDP, it has historically underinvested in modern technology compared to other sectors of similar size. Founded in 2008, Thayer was created to spur innovation in travel and help entrepreneurs navigate its complex web of stakeholders. Over the past 15+ years, we have invested in over 100 companies that have had a huge impact in advancing the travel industry. Today we are focused on being the bridge between silicon valley and the global travel industry. We help all companies unlock the travel industry and drive sales, strategy and partnership for our portfolio. All businesses will sell to, partner with or consume travel and Thayer is the strategic co-pilot.
            </p>
          </div>
        </div>
      </section>

      {/* ── Team (02) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="The Team" number="02" />
          <div className="flex flex-col border-t" style={{ borderColor: c.rule }}>
            {team.map((t, i) => {
              const expanded = expandedMember === i;
              return (
                <div key={i} className="border-b" style={{ borderColor: c.rule }}>
                  <button
                    type="button"
                    onClick={() => setExpandedMember(expanded ? null : i)}
                    aria-expanded={expanded}
                    className="w-full flex items-center justify-between gap-6 py-6 md:py-8 text-left transition-colors hover:text-[#2E9D55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                    style={{ color: c.text, outlineColor: c.accent }}
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 flex-1 min-w-0">
                      <h3 className="text-[1.6rem] md:text-[2rem] font-normal italic leading-[1.15]" style={{ ...serif, fontWeight: c.headingWeight }}>{t.name}</h3>
                      <span className="text-[0.7rem] uppercase tracking-[0.18em]" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>{t.role}</span>
                    </div>
                    <ChevronDown
                      className="w-5 h-5 shrink-0 transition-transform duration-300"
                      style={{ color: c.muted, transform: expanded ? "rotate(180deg)" : "none" }}
                    />
                  </button>
                  <div className={`grid transition-all duration-500 ease-in-out ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="pb-8 md:pb-10 grid md:grid-cols-[260px_1fr] gap-6 md:gap-10">
                        {t.photo ? (
                          <div className="aspect-[3/4] border bg-cover bg-top bg-no-repeat" style={{ borderColor: c.rule, backgroundImage: `url('${t.photo}')` }} />
                        ) : (
                          <div className="aspect-[3/4] border flex items-end p-6" style={{ backgroundColor: c.surface, borderColor: c.rule }}>
                            <span className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>Portrait</span>
                          </div>
                        )}
                        <p className="text-[1.05rem] md:text-[1.15rem] leading-[1.7]" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>{t.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Our Club (03) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Club" number="03" />
          <h2 className="text-[clamp(2rem,3vw,2.8rem)] leading-[1.15] font-normal italic mb-6" style={{ ...serif, color: c.text }}>
            Decades of specialized investment and operating experience.
          </h2>
          <p className="text-[1.15rem] leading-[1.7] mb-12" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
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
              <div key={i} className="group aspect-[3/2] border flex items-center justify-center px-6 relative overflow-hidden" style={{ borderColor: c.rule, backgroundColor: c.bg }}>
                <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full transition-all duration-200 ease-out" style={{ backgroundColor: "rgb(46,157,85)" }} />
                <img src={`/logos/network/${co.slug}-${light ? "light" : "dark"}.svg`} alt={co.name} className="object-contain relative z-10 group-hover:hidden" style={{ width: co.w, maxWidth: "80%" }} />
                <img src={`/logos/network/${co.slug}-dark.svg`} alt={co.name} className="object-contain relative z-10 hidden group-hover:block group-hover:scale-125 transition-transform duration-700 ease-out" style={{ width: co.w, maxWidth: "80%" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <EditorialHeadlines number="04" articles={articles} />

      <NextPagePanel current="about" />

      <EditorialFooter />
    </div>
  );
}
