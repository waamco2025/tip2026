"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { EditorialNav, EditorialFooter, EditorialHeadlines, CloudBackground, SectionHeader } from "./HomePage";
import { useEditorialMode, ec } from "./EditorialModeContext";
import type { Article } from "@/lib/article-types";

export default function EditorialAboutPage({ articles }: { articles: Article[] }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };


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
      <section className="relative px-6 md:px-12 py-24 md:min-h-screen flex flex-col md:justify-center overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto z-10 md:min-h-[36rem]">
          <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>About the Firm</span>
          <h1 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.08] font-light italic mb-8 max-w-4xl" style={{ ...serif, color: c.text }}>
            A History of Innovation in Travel.
          </h1>
          <p className="text-[1.15rem] leading-[1.7] max-w-2xl" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
            Since 2008, Thayer Investment Partners has been at the forefront of travel technology investing,
            partnering with visionary founders to build companies that reshape how the world moves, stays, and experiences new places.
          </p>
        </div>
      </section>

      {/* ── Philosophy (01) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Process" number="01" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <h2 className="text-[clamp(2.2rem,4.5vw,4rem)] leading-[1.1] font-light italic" style={{ ...serif, color: c.text }}>
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
                      <h3 className="text-[1.6rem] md:text-[2rem] font-light italic leading-[1.15]" style={{ ...serif, fontWeight: c.headingWeight }}>{t.name}</h3>
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
          <h2 className="text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.15] font-light italic mb-6" style={{ ...serif, color: c.text }}>
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

      <EditorialFooter />
    </div>
  );
}
