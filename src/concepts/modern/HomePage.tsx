"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Sparkles, Ship, Landmark, Car, Menu, X } from "lucide-react";

const categories = [
  { icon: Building2, name: "Hotels &\nRestaurants", desc: "Hospitality tech platforms transforming guest experiences" },
  { icon: Sparkles, name: "Entertainment &\nExperiences", desc: "Immersive technologies redefining leisure and discovery" },
  { icon: Ship, name: "Cruises &\nAirlines", desc: "Next-generation solutions for air and sea transportation" },
  { icon: Landmark, name: "Real\nEstate", desc: "PropTech innovations in hospitality real estate" },
  { icon: Car, name: "Ground\nTransportation", desc: "Mobility platforms connecting travelers seamlessly" },
];

const testimonials = [
  { quote: '"Thayer is a trusted co-pilot helping entrepreneurs navigate the complex landscape in the travel industry"', name: "Matthijs Welle", title: "CEO, Mews" },
  { quote: '"Thayer is a trusted co-pilot helping entrepreneurs navigate the complex landscape in the travel industry"', name: "Med Benmansour", title: "CEO, Nuitée" },
  { quote: '"Thayer is a trusted co-pilot helping entrepreneurs navigate the complex landscape in the travel industry"', name: "Bo Davis", title: "CEO, MarginEdge" },
];

function LogoPlaceholder() {
  return (
    <div className="w-24 h-14 border border-[#CCC] rounded flex items-center justify-center">
      <span className="text-[#CCC] text-[10px] font-medium tracking-wider">LOGO</span>
    </div>
  );
}

export default function ModernHome() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = ["About", "Portfolio", "Insights", "Investor Relations"];
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Nav */}
      <nav className="relative flex items-center justify-between bg-[#0D2818] h-20 px-6 md:px-14">
        <Link href="/"><img src="/logotype.svg" alt="Thayer" className="h-12" /></Link>
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <Link key={l} href={`/${l === "Insights" ? "news" : l === "Investor Relations" ? "investor-relations" : l.toLowerCase()}`} className="text-white/80 text-sm font-normal hover:text-white transition-colors">{l}</Link>
          ))}
        </div>
        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        {mobileOpen && (
          <div className="absolute top-20 left-0 right-0 bg-[#0D2818] border-t border-[#1A3A25] flex flex-col z-50 md:hidden">
            {navLinks.map((l) => (
              <Link key={l} href={`/${l === "Insights" ? "news" : l === "Investor Relations" ? "investor-relations" : l.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="px-6 py-4 text-sm text-white/80 border-b border-[#1A3A25]">{l}</Link>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="flex flex-col md:flex-row h-auto md:h-[560px]">
        <div className="w-full md:w-[660px] shrink-0 flex flex-col justify-center gap-8 bg-[#0D2818] px-6 md:px-14 py-12 md:py-20 min-h-[400px] md:min-h-0">
          <span className="text-[#C9A962] font-semibold text-xs tracking-[2px]">PIONEERS IN TRAVEL TECHNOLOGY VENTURE CAPITAL</span>
          <h1 className="font-playfair text-[32px] md:text-[52px] italic font-normal text-white leading-[1.1]">Investing in the Future of&nbsp;<span className="whitespace-nowrap">Global Travel</span></h1>
          <p className="text-white/80 text-base leading-relaxed max-w-[500px]">Thayer Investment Partners identifies and supports the most promising ventures shaping the future of travel&nbsp;<span className="whitespace-nowrap">technology worldwide.</span></p>
          <Link href="/about" className="bg-[#C9A962] text-[#0D2818] font-semibold text-[13px] tracking-[1px] px-8 py-3.5 w-fit hover:bg-[#B89A55] transition-colors">LEARN MORE</Link>
        </div>
        <div className="h-[300px] md:h-auto flex-1 bg-cover bg-center" style={{ backgroundImage: "url('/images/modern-hero.png')" }} />
      </section>

      {/* Stats Bar */}
      <section className="flex flex-col md:flex-row justify-between bg-white px-6 md:px-14 py-12 border-y border-[#E5E5E5] gap-8 md:gap-0">
        {[{ val: "110+", label: "Portfolio Companies" }, { val: "150+", label: "Corporate Partners" }, { val: "~$3B", label: "Assets Under Management" }].map((s, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="font-playfair text-[28px] md:text-[44px] italic font-semibold text-[#0D2818]">{s.val}</span>
            <span className="text-[#666] text-sm">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="bg-white px-6 md:px-14 py-12 md:py-20 flex flex-col items-center gap-12 border-b border-[#E5E5E5]">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[#C9A962] font-semibold text-xs tracking-[2px]">WHAT OUR PARTNERS SAY</span>
          <h2 className="font-playfair text-2xl md:text-4xl italic text-[#1A2E23]">Trusted by Industry Leaders</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {testimonials.map((t, i) => (
            <div key={i} className="flex-1 flex flex-col gap-5 p-7 bg-[#FAFAFA] border border-[#E5E5E5]">
              <p className="text-[#666] text-sm leading-relaxed">{t.quote}</p>
              <div className="flex flex-col gap-0.5">
                <span className="text-[#1A2E23] text-[13px] font-medium">{t.name}</span>
                <span className="text-[#C9A962] text-xs">{t.title}</span>
              </div>
            </div>
          ))}
        </div>
        <Link href="/portfolio" className="text-[#C9A962] text-[13px] font-medium hover:underline">View Full Portfolio →</Link>
      </section>

      {/* Statement */}
      <section className="px-6 md:px-32 py-12 md:py-24 flex justify-center">
        <h2 className="font-playfair text-[28px] md:text-[42px] italic font-semibold text-[#0D2818] leading-[1.3] text-center max-w-[720px]">
          We help the world&apos;s largest travel companies solve big problems and unlock new opportunities.
        </h2>
      </section>

      {/* Portfolio Logos */}
      <section className="bg-white px-6 md:px-14 py-12 flex flex-col items-center gap-12">
        {[0, 1].map((row) => (
          <div key={row} className="flex flex-wrap gap-10 justify-center md:justify-between w-full md:w-[1008px]">
            {[0, 1, 2, 3, 4, 5].map((col) => (
              <LogoPlaceholder key={col} />
            ))}
          </div>
        ))}
        <Link href="/portfolio" className="text-[#C9A962] text-sm font-medium hover:underline">View our portfolio →</Link>
      </section>

      {/* Investment Categories */}
      <section className="bg-white px-6 md:px-14 py-12 md:py-20 flex flex-col items-center gap-12 border-y border-[#E5E5E5]">
        <span className="text-[#C9A962] font-semibold text-xs tracking-[2px]">INVESTMENT FOCUS</span>
        <h2 className="font-playfair text-2xl md:text-4xl italic text-[#1A2E23]">Our Investment Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 w-full">
          {categories.map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-4 p-6 border border-[#E5E5E5]">
              <c.icon className="w-7 h-7 text-[#C9A962]" />
              <h3 className="font-playfair text-base leading-[1.3] text-center text-[#1A2E23] whitespace-pre-line">{c.name}</h3>
              <p className="text-[#666] text-xs leading-[1.5] text-center text-balance">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Section */}
      <section className="bg-white px-6 md:px-14 py-12 md:py-24 flex flex-col gap-10">
        <h2 className="font-playfair text-[28px] md:text-[42px] italic font-semibold text-[#0D2818] leading-[1.2] max-w-[800px]">We&apos;ve built a different kind of platform.</h2>
        <p className="text-[#666] text-base leading-[1.7] max-w-[800px]">Thayer Investment Partners leverages deep industry relationships and operational expertise to create value for our portfolio companies. Our platform connects startups with the world&apos;s largest travel corporations, providing unparalleled access to distribution, customers, and strategic guidance.</p>
        <div className="w-full h-[250px] md:h-[400px] bg-cover bg-center rounded" style={{ backgroundImage: "url('/images/modern-platform.png')" }} />
      </section>

      {/* Backed By */}
      <section className="bg-white px-6 md:px-14 py-20 md:py-40 flex flex-col items-center gap-12">
        <h2 className="font-playfair text-2xl md:text-4xl italic font-semibold text-[#0D2818] leading-[1.3] text-center max-w-[800px]">We are backed by visionary corporations from every corner of the travel world.</h2>
        {[0, 1].map((row) => (
          <div key={row} className="flex flex-wrap gap-12 justify-center md:justify-between w-full md:w-[1008px]">
            {[0, 1, 2, 3].map((col) => (
              <LogoPlaceholder key={col} />
            ))}
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-[#0D2818] px-6 md:px-14 py-12 flex flex-col gap-8 border-t border-[#1A3A25]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
          <div className="flex flex-col gap-3">
            <img src="/logotype.svg" alt="Thayer" className="h-14" />
            <span className="text-white/50 text-[13px] whitespace-pre-line">{"Pioneering travel technology\nventure capital since 2008."}</span>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-20">
            <div className="flex flex-col gap-3">
              {navLinks.map((l) => (
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
    </div>
  );
}
