"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const milestones = [
  { year: "2008", title: "The Origin of Thayer", desc: "Founded by Chris Hemmeter" },
  { year: "2012", title: "First Thayer Fund", desc: "Chris Hemmeter teams up with Lee Pillsbury to launch first Thayer Fund" },
  { year: "2018", title: "First Institutional Fund", desc: "Chris Hemmeter, Jeff Jackson, and Tyler Carrico launch first Institutional Thayer Fund" },
  { year: "2022", title: "Second Institutional Fund", desc: "Launch of second Institutional Thayer Fund" },
  { year: "2022", title: "First Derive Fund", desc: "Launch of first Derive Fund" },
];

const partners = [
  { name: "Chris Hemmeter", title: "Managing Partner", bio: "Chris Hemmeter co-founded Thayer Ventures, a venture capital platform investing in technology companies in the travel and mobility space." },
  { name: "Tyler Carrico", title: "Managing Partner", bio: "Tyler Carrico co-founded Derive Ventures in 2021 and currently serves as a Managing Partner. Prior to Derive, Tyler spent 4 years as an investment professional at Thayer Ventures." },
  { name: "Mike Scott", title: "Managing Partner", bio: "Mike Scott co-founded Derive Ventures in 2021 and currently serves as a Managing Partner. Prior to co-founding Derive, Mike spent over 3 years as a private equity investment professional at KSL Capital Partners." },
];

const team = [
  { name: "Lee Pillsbury", title: "Co-Founder and Partner", bio: "After graduating from Cornell School of Hotel Administration, Lee spent 19 years at Marriott, rising to become an Executive Vice President and head of Lodging Strategy." },
  { name: "Mark Farrell", title: "Venture Partner", bio: "Mark co-founded Thayer Ventures in 2009 and was involved in all aspects of the firm growth as a Managing Director." },
  { name: "Jeff Jackson", title: "Venture Partner", bio: "Jeff has spent the bulk of his career in executive roles within the transportation and distribution space, including 14 years at American Airlines." },
  { name: "David Brem", title: "Venture Partner", bio: "David Brem currently serves as a Venture Partner at Thayer Investment Partners. Prior to TIP, David earned his MBA from the University of Michigan and worked at an early-stage venture firm focused on transportation and logistics." },
  { name: "Cara Whitehill", title: "Venture Partner", bio: "As a long-time operating exec, startup advisor, investor and road warrior, Cara is actively involved in numerous corners of the travel tech industry, expanding partnership and business development initiatives." },
  { name: "Chelsea Salamone", title: "Vice President", bio: "Chelsea brings over a decade of expertise in the hospitality industry. Before joining TIP, she spent over 5 years at Standard International, aiding in the global expansion of the Standard and Bunkhouse hotels." },
];

function ModernNav({ active }: { active: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [{ l: "About", h: "/about" }, { l: "Portfolio", h: "/portfolio" }, { l: "Insights", h: "/news" }, { l: "Investor Relations", h: "/investor-relations" }];
  return (
    <nav className="relative flex items-center justify-between bg-[#0D2818] h-20 px-6 md:px-14">
      <Link href="/"><img src="/logotype.svg" alt="Thayer" className="h-12" /></Link>
      <div className="hidden md:flex items-center gap-10">
        {links.map((item) => (
          <Link key={item.l} href={item.h} className={`text-sm ${item.l === active ? "text-white font-medium" : "text-white/80 font-normal"} hover:text-white transition-colors`}>{item.l}</Link>
        ))}
      </div>
      <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {mobileOpen && (
        <div className="absolute top-20 left-0 right-0 bg-[#0D2818] border-t border-[#1A3A25] flex flex-col z-50 md:hidden">
          {links.map((item) => (
            <Link key={item.l} href={item.h} onClick={() => setMobileOpen(false)} className={`px-6 py-4 text-sm border-b border-[#1A3A25] ${item.l === active ? "text-white font-medium" : "text-white/80 font-normal"}`}>{item.l}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}

function ModernFooter() {
  return (
    <footer className="bg-[#0D2818] px-6 md:px-14 py-12 flex flex-col gap-8 border-t border-[#1A3A25]">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
        <div className="flex flex-col gap-3">
          <img src="/logotype.svg" alt="Thayer" className="h-14" />
          <span className="text-white/50 text-[13px] whitespace-pre-line">{"Pioneering travel technology\nventure capital since 2008."}</span>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-20">
          <div className="flex flex-col gap-3">
            {["About", "Portfolio", "Insights", "Investor Relations"].map((l) => (
              <Link key={l} href={`/${l === "Insights" ? "news" : l === "Investor Relations" ? "investor-relations" : l.toLowerCase()}`} className="text-white/50 text-[13px] hover:text-white/80">{l}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 w-full md:w-[280px]">
            <span className="text-white text-xs font-semibold">Subscribe</span>
            <span className="text-white/50 text-[13px] leading-[1.5]">Get insights and updates from our team.</span>
            <div className="flex h-10">
              <input className="flex-1 bg-[#0D2818] border border-[#1A3A25] px-3.5 text-white text-sm" placeholder="Email address" />
              <button className="bg-[#C9A962] px-5 text-[#0D2818] text-xs font-semibold">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 pt-4 border-t border-[#1A3A25]">
        <span className="text-white/30 text-[11px]">© 2026 Thayer Investment Partners. All rights reserved.</span>
        <span className="text-white/30 text-[11px]">Privacy Policy  ·  Terms of Use  ·  Disclosures</span>
      </div>
    </footer>
  );
}

export { ModernNav, ModernFooter };

export default function ModernAbout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ModernNav active="About" />

      {/* Split Hero */}
      <section className="flex flex-col md:flex-row h-auto md:h-[560px]">
        <div className="flex flex-col justify-center gap-6 bg-[#0D2818] px-6 md:px-14 py-12 md:py-20 w-full md:w-[660px] min-h-[400px] md:min-h-0">
          <span className="text-[#C9A962] font-semibold text-xs tracking-[2px]">ABOUT</span>
          <h1 className="font-playfair text-[32px] md:text-[48px] italic text-white leading-[1.2] max-w-[520px]">A History of Innovation in Travel.</h1>
          <p className="text-[#8A9B8F] text-[15px] leading-relaxed max-w-[480px]">Since 2008, Thayer Investment Partners has been at the forefront of travel technology investing, partnering with visionary founders to build companies that reshape how the world moves, stays, and experiences new places.</p>
        </div>
        <div className="h-[300px] md:h-auto flex-1 bg-cover bg-center" style={{ backgroundImage: "url('/images/modern-about-hero.png')" }} />
      </section>

      {/* Philosophy */}
      <section className="bg-white px-6 md:px-14 py-12 md:py-20 flex flex-col items-center gap-12">
        <span className="text-[#C9A962] font-semibold text-xs tracking-[2px]">OUR PHILOSOPHY</span>
        <h2 className="font-playfair text-[40px] italic text-[#1A2E23] text-center leading-[1.2] max-w-[700px]">Making travel more efficient and resilient</h2>
        <p className="text-[#666] text-base text-center leading-[1.7] max-w-[800px]">We believe that the convergence of travel and technology represents one of the most significant investment opportunities of our generation.</p>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {[{ t: "Conviction", d: "We believe all businesses can be travel companies. All organizations sell to, partner with, or consume travel. Travel is more than airlines and accommodations \u2013 it is how and why people leave home and what shapes where and how they choose to live." },
            { t: "Network", d: "We connect dots and open doors across the largest and most dynamic industry in the world: hotels, transportation, airlines, cruise, agencies, restaurants, events, sports, entertainment, and experiences." },
            { t: "Partnership", d: "We invest on behalf of the travel industry. From horizontal platforms\u2014payments, cybersecurity, and workforce management\u2014to vertical solutions across loyalty, distribution, and critical operating systems, we back both industry outsiders and seasoned operators." }].map((c, i) => (
            <div key={i} className="flex-1 flex flex-col gap-4 p-7 border border-[#E5E5E5]">
              <h3 className="font-playfair text-[22px] italic text-[#1A2E23]">{c.t}</h3>
              <p className="text-[#666] text-sm leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white px-6 md:px-14 py-12 md:py-20 flex flex-col items-center gap-10 border-y border-[#E5E5E5]">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[#C9A962] font-semibold text-xs tracking-[2px]">OUR JOURNEY</span>
          <h2 className="font-playfair text-2xl md:text-4xl italic text-[#1A2E23] text-center">A History of Innovation in Travel</h2>
        </div>
        <div className="flex flex-col w-full md:w-[700px]">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex flex-col items-center w-3">
                <div className="w-3 h-3 rounded-full bg-[#00D776] shrink-0" />
                {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-[#E5E5E5]" />}
              </div>
              <div className={`flex flex-col gap-1.5 ${i < milestones.length - 1 ? "pb-8" : ""}`}>
                <span className="text-[#00D776] text-[13px] font-semibold">{m.year}</span>
                <h3 className="font-playfair text-[22px] text-[#1A2E23]">{m.title}</h3>
                <p className="text-[#666] text-[15px] leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Club */}
      <section className="bg-white px-6 md:px-14 py-12 md:py-20">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          <div className="flex flex-col gap-4 md:w-1/2">
            <span className="text-[#C9A962] font-semibold text-xs tracking-[2px]">OUR CLUB</span>
            <h2 className="font-playfair text-[28px] md:text-[42px] italic font-semibold text-[#0D2818] leading-[1.2]">Decades of specialized investment and operating experience.</h2>
            <p className="text-[#666] text-base leading-[1.7]">We work with a select group of corporate leaders who appreciate the value of long term partnership and share our belief that progress is centered around travel.</p>
          </div>
          <div className="grid grid-cols-3 gap-5 shrink-0 self-center">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-32 h-20 border border-[#CCC] rounded flex items-center justify-center">
                <span className="text-[#CCC] text-[10px] font-medium tracking-wider">LOGO</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white px-6 md:px-14 py-12 md:py-20 flex flex-col items-center gap-12 border-t border-[#E5E5E5]">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#C9A962] font-semibold text-xs tracking-[2px]">LEADERSHIP</span>
          <h2 className="font-playfair text-2xl md:text-4xl italic text-[#1A2E23]">Our Team</h2>
        </div>
        {[partners, team.slice(0, 3), team.slice(3)].map((row, ri) => (
          <div key={ri} className="flex flex-col md:flex-row gap-6 w-full">
            {row.map((p, i) => (
              <div key={i} className="flex-1 flex flex-col bg-white border border-[#E5E5E5]">
                <div className="h-60 bg-[#E0E0E0]" />
                <div className="flex flex-col gap-1.5 p-5">
                  <h3 className="font-playfair text-base text-[#1A2E23]">{p.name}</h3>
                  <span className="text-[#00D776] text-xs font-semibold">{p.title}</span>
                  <p className="text-[#666] text-[13px] leading-[1.5] line-clamp-4 mt-1">{p.bio}</p>
                  <span className="text-[#00D776] text-[13px] font-medium mt-1 cursor-pointer hover:underline">Read more +</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      <ModernFooter />
    </div>
  );
}
