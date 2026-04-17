"use client";

import React, { useState } from "react";
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

export default function EditorialAboutPage() {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };

  const milestones = [
    { year: "2008", title: "Foundation", desc: "Thayer Investment Partners founded by hospitality industry veterans with a vision to invest exclusively in travel technology." },
    { year: "2012", title: "Fund I Fully Deployed", desc: "First fund of $48M fully deployed across early-stage travel technology companies, establishing the firm\u2019s track record." },
    { year: "2018", title: "Expansion & Fund II", desc: "Launched Fund II at $82M, expanding into airlines, mobility platforms, and entertainment technology." },
    { year: "2022", title: "Portfolio Milestones", desc: "Portfolio companies surpass $2.8B in combined valuation. Multiple successful exits validate the travel-focused thesis." },
    { year: "2025", title: "Fund III Launch", desc: "Announced Fund III at $150M to capitalize on post-pandemic travel technology acceleration and AI-driven innovation." },
  ];

  const philosophies = [
    { title: "Conviction", desc: "We believe all businesses can be travel companies. All organizations sell to, partner with, or consume travel. Travel is more than airlines and accommodations \u2013 it is how and why people leave home and what shapes where and how they choose to live." },
    { title: "Network", desc: "We connect dots and open doors across the largest and most dynamic industry in the world: hotels, transportation, airlines, cruise, agencies, restaurants, events, sports, entertainment, and experiences." },
    { title: "Partnership", desc: "We invest on behalf of the travel industry. From horizontal platforms\u2014payments, cybersecurity, and workforce management\u2014to vertical solutions across loyalty, distribution, and critical operating systems, we back both industry outsiders and seasoned operators." },
  ];

  const team = [
    { name: "Chris Hemmeter", role: "Managing Partner", photo: "/images/team/chris-hemmeter.webp", bio: "Built and sold his way through six industries before deciding venture was the one he\u2019d stay in. Founded and sold iCare Marketing to Sysco (2012) and Dynamic Payment Ventures to Elavon, a US Bank subsidiary (2007). Earlier ventures include E&O Kitchen and Bar, a San Francisco restaurant; The Hemmeter Collection, a direct-response retailer; and Hemmeter Publishing, a travel book publisher \u2014 plus a stint as CEO of foodservice software firm CriticalArc. Co-founded Thayer Ventures to back the technical operators rebuilding travel from the infrastructure up. Cornell, BS." },
    { name: "Tyler Carrico", role: "Managing Partner", photo: "/images/team/tyler-carrico.webp", bio: "Joined Thayer Ventures as its first and only investment hire \u2014 a sink-or-swim apprenticeship covering execution, diligence, sourcing, portfolio support, fund management, and LP advisory all at once. Over four years he helped deploy $50M across 12 companies and managed follow-ons across 40+ more. Co-founded Derive Ventures in 2021 to go all-in on the same thesis at a larger scale. Previously in TMT investment banking at BoA Merrill Lynch. UVA, McIntire BS." },
    { name: "Mike Scott", role: "Managing Partner", photo: "/images/team/mike-scott.webp", bio: "Got a $4B+ crash course in travel economics at KSL Capital Partners, covering US hospitality, timeshare, all-inclusives, travel distribution, gaming, and alternative accommodations. Co-founded Derive Ventures in 2021 to back the software layer reshaping those same asset classes. Advises Paradero, an experiential hospitality brand in Mexico. Formerly a J.P. Morgan banker covering real estate, gaming, and lodging. Michigan, Ross BBA." },
    { name: "Lee Pillsbury", role: "Co-Founder & Partner", photo: "", bio: "Spent 19 years inside Marriott watching what the lodging industry couldn\u2019t build itself \u2014 then left to build it. Rose to EVP of Lodging Strategy (Marriott 5x\u2019d revenues and 8x\u2019d EBITA during his run), then founded Thayer Lodging Group in 1988 and ran it for 25+ years at a 26.2% IRR before selling to Brookfield in 2015. Partnered with Jin Jiang Group to form Thayer China and build the first central reservations system running in Mandarin; later took Interstate Hotels private and tripled it to 500+ properties. Today chairs TLG Investment Partners, a national real estate firm with 3,000+ residential units across Florida and Arizona. Cornell Hotel School graduate, Trustee Emeritus, and co-founder with his wife Mary of the Pillsbury Institute for Hospitality Entrepreneurship at Cornell. The two were the first husband-and-wife team to fly a single-engine plane across the North Atlantic." },
    { name: "Mark Farrell", role: "Venture Partner", photo: "", bio: "A former mayor of San Francisco, which turns out to be unusually useful preparation for a venture firm \u2014 both roles live at the intersection of long-term infrastructure bets and daily operational firefighting. Co-founded Thayer Ventures in 2009 and served as Managing Director; co-CEO and CFO of Thayer Ventures Acquisition Corp (NASDAQ: TVAC), the $176M SPAC that took Inspirato public in 2022. Stepped back from day-to-day investing in 2024 to announce another mayoral run. Earlier: attorney at Wilson Sonsini, banker at Thomas Weisel Partners, and eight years as an elected San Francisco official. Loyola Marymount BA (cum laude), University College Dublin MA, Penn Law JD (cum laude)." },
    { name: "Jeff Jackson", role: "Venture Partner", photo: "", bio: "Has sat on every side of a travel M&A table. 14 years at American Airlines, where he managed Sabre\u2019s legal separation from AA before joining the standalone company as EVP and CFO in 2000. Eleven years at Sabre spanning its IPO, 25+ acquisitions and divestitures totaling $8B in value, a Travelocity board seat, global expansion, and the eventual take-private by a PE consortium. Board member at Rent-A-Center and Getty Images along the way. General Partner at Thayer Ventures since 2012. Dartmouth; Kellogg MBA. Treasurer of Fort Worden Hospitality in Port Townsend, WA." },
    { name: "David Brem", role: "Venture Partner", photo: "", bio: "Marine Corps Intelligence before venture \u2014 led cyber intelligence at the Marine Corps Intelligence Activity in Quantico, which may explain the preference for founders who can explain their competitive position in one sentence. Earlier consulting work modernized technology for aerospace and defense clients; later Commercial Strategy at American Airlines and Managing Director of Michigan\u2019s flagship investment fund, sourcing early-stage deals across consumer brands and robotics. Michigan MBA (Ross), BA American University, MA Applied Intelligence (Cyber) from Georgetown." },
    { name: "Cara Whitehill", role: "Venture Partner", photo: "/images/team/cara-whitehill.webp", bio: "Has shipped product at Expedia, Travelocity, Deem, and Traxo \u2014 a career path that reads like a who\u2019s who of travel tech operators. Now splits her time between Thayer\u2019s partnership work with strategic investors and portfolio companies, and a personal angel portfolio of early-stage B2B startups across travel, enterprise software, and healthcare. Frequent PhocusWright speaker, NYU Hospitality Innovation guest lecturer, and co-host of Travel Tech Insider podcast. Based in Cincinnati, where she and her husband are working on playing golf in all 50 states." },
    { name: "Chelsea Salamone", role: "Vice President", photo: "/images/team/chelsea-salamone.webp", bio: "Ten years in hospitality before venture \u2014 the kind of operator DNA that makes boutique hotel people actually answer her calls. Five years at Standard International helping lead the global expansion of Standard and Bunkhouse and developing new brand concepts. Earlier BD roles at Kimpton and Pyramid Hotel Group, after cutting her teeth in Hilton Worldwide\u2019s Management Training Program. Boston University, BS in Hospitality Management." },
  ];
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <EditorialNav active="about" />

      {/* ── Hero ── */}
      <section className="relative px-6 md:px-12 py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-no-repeat" style={{ backgroundImage: "url('/images/about.webp')", backgroundPosition: "center calc(50% + 80px)" }} />
        <div className="absolute inset-0 hidden md:block" style={{ background: light
          ? "linear-gradient(to right, rgba(237,233,226,0.92) 0px, rgba(237,233,226,0.92) 500px, rgba(237,233,226,0.3) 100%)"
          : "linear-gradient(to right, rgba(18,18,18,0.92) 0px, rgba(18,18,18,0.92) 500px, rgba(18,18,18,0.2) 100%)"
        }} />
        <div className="absolute inset-0 md:hidden" style={{ backgroundColor: light
          ? "rgba(237,233,226,0.85)"
          : "rgba(18,18,18,0.82)"
        }} />
        <div className="absolute inset-x-0 bottom-0 h-[40%] hidden md:block" style={{ background: light
          ? "linear-gradient(to top, rgba(237,233,226,0.8) 0%, rgba(237,233,226,0) 100%)"
          : "linear-gradient(to top, rgba(18,18,18,0.8) 0%, rgba(18,18,18,0) 100%)"
        }} />
        <div className="relative max-w-7xl mx-auto z-10">
          <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>About the Firm</span>
          <h1 className="text-[clamp(2.2rem,5.5vw,5rem)] leading-[1.08] font-light italic mb-8 max-w-4xl" style={{ ...serif, color: c.text }}>
            A History of Innovation in Travel.
          </h1>
          <p className="text-[1.15rem] leading-[1.7] max-w-2xl" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
            Since 2008, Thayer Investment Partners has been at the forefront of travel technology investing,
            partnering with visionary founders to build companies that reshape how the world moves, stays, and experiences new places.
          </p>
        </div>
      </section>

      {/* ── Philosophy (01) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500" style={{ backgroundColor: c.surface }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Process" number="01" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {philosophies.map((p, i) => (
              <div key={i} className="border p-8 md:p-10" style={{ borderColor: c.rule }}>
                <span className="text-[3.25rem] md:text-[3.75rem] font-light block mb-4 leading-none" style={{ ...serif, color: c.accent, fontWeight: c.statWeight }}>0{i + 1}</span>
                <h3 className="text-[1.75rem] font-light italic mb-4" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{p.title}</h3>
                <p className="text-[1.15rem] leading-[1.7]" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline (02) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Journey" number="02" />
          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => (
              <div key={i} className="grid md:grid-cols-[120px_1fr] gap-4 md:gap-12 py-10 border-b" style={{ borderColor: c.rule }}>
                <span className="text-[1.8rem] font-light" style={{ ...serif, color: c.accent, fontWeight: c.statWeight }}>{m.year}</span>
                <div>
                  <h3 className="text-[1.75rem] font-light italic mb-3" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{m.title}</h3>
                  <p className="text-[1.15rem] leading-[1.7]" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Club (03) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500" style={{ backgroundColor: c.surface }}>
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
              <div key={i} className="group aspect-[3/2] border flex items-center justify-center px-6 relative overflow-hidden" style={{ borderColor: c.rule }}>
                <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full transition-all duration-200 ease-out" style={{ backgroundColor: "rgb(196,154,69)" }} />
                <img src={`/logos/network/${co.slug}-${light ? "light" : "dark"}.svg`} alt={co.name} className="object-contain relative z-10 group-hover:hidden" style={{ width: co.w, maxWidth: "80%" }} />
                <img src={`/logos/network/${co.slug}-dark.svg`} alt={co.name} className="object-contain relative z-10 hidden group-hover:block group-hover:scale-125 transition-transform duration-700 ease-out" style={{ width: co.w, maxWidth: "80%" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team (04) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="The Team" number="04" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {team.map((t, i) => {
              const expanded = expandedMember === i;
              return (
                <div key={i} className="group cursor-pointer" onClick={() => setExpandedMember(expanded ? null : i)}>
                  <div className="aspect-[3/4] border mb-5 flex items-end p-6 transition-colors duration-500 bg-cover bg-top bg-no-repeat" style={{ backgroundColor: c.surface, borderColor: c.rule, backgroundImage: t.photo ? `url('${t.photo}')` : undefined }}>
                    {!t.photo && <span className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>Portrait</span>}
                  </div>
                  <h3 className="text-[1.75rem] font-light italic mb-1" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{t.name}</h3>
                  <span className="text-[0.7rem] uppercase tracking-[0.18em] block mb-3" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>{t.role}</span>
                  <div className={`overflow-hidden transition-all duration-500 ${expanded ? "max-h-[500px]" : "max-h-0"}`}>
                    <p className="text-[1.15rem] leading-[1.7] mb-3" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>{t.bio}</p>
                  </div>
                  <span
                    className="text-[0.68rem] uppercase tracking-[0.18em] mt-3 inline-block hover:opacity-80 transition-colors"
                    style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}
                  >
                    {expanded ? "Read Less" : "Read More"}
                  </span>
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
