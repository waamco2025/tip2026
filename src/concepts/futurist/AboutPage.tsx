"use client";

import Link from "next/link";
import { FuturistNav, FuturistFooter } from "./HomePage";
import { TrendingUp, Users, Globe } from "lucide-react";

const milestones = [
  { year: "2006", desc: "Founded in Stamford, CT — Pioneering travel tech venture capital" },
  { year: "2010", desc: "First Major Fund Launch — Establishing our investment thesis" },
  { year: "2015", desc: "$500M Milestone — Half a billion in assets under management" },
  { year: "2019", desc: "Expanded into Maritime — Broadening our transportation thesis" },
  { year: "2023", desc: "TIP Innovation Fund — Next-generation travel technology investments" },
];

const team = [
  [{ name: "Chris Hemmeter", role: "Managing Partner" }, { name: "Tyler Carrico", role: "Managing Partner" }, { name: "Mike Scott", role: "Managing Partner" }],
  [{ name: "Lee Pillsbury", role: "Co-Founder and Partner" }, { name: "Mark Farrell", role: "Venture Partner" }, { name: "Jeff Jackson", role: "Venture Partner" }],
  [{ name: "David Brem", role: "Venture Partner" }, { name: "Cara Whitehill", role: "Venture Partner" }, { name: "Chelsea Salamone", role: "Vice President" }],
];

const approachCards = [
  { icon: TrendingUp, title: "Strategic Capital", desc: "We provide growth equity and venture capital to companies transforming the travel industry through technology.", color: "#00D776" },
  { icon: Users, title: "Industry Network", desc: "Our network of 150+ corporate partners gives portfolio companies unparalleled access to distribution and strategic opportunities.", color: "#00B4D8" },
  { icon: Globe, title: "Global Reach", desc: "With investments spanning 20+ countries, we bring a truly global perspective to travel technology innovation.", color: "#7C3AED" },
];

export default function FuturistAbout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120]">
      <FuturistNav active="About" />

      {/* Hero - two column */}
      <section className="flex flex-col md:flex-row gap-6 md:gap-12 px-6 md:px-12 py-12 md:py-20">
        <div className="flex flex-col justify-center gap-4 w-full md:w-[540px] shrink-0">
          <span className="text-[#00D776] font-semibold text-[11px] tracking-[2px] font-[Inter]">ABOUT US</span>
          <h1 className="text-[32px] md:text-[56px] font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>Who We Are</h1>
        </div>
        <div className="flex items-center flex-1">
          <p className="text-[#94A3B8] text-lg leading-relaxed font-[Inter]">Thayer is a premier venture capital firm focused on travel & transportation technology. Since 2008, we have been partnering with visionary founders building the next generation of companies transforming how the world moves.</p>
        </div>
      </section>

      <div className="h-px bg-[#1E293B]" />

      {/* Photo break */}
      <div className="relative h-[200px] md:h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1715091618825-70f04f4cff72?w=1080&q=80')" }}><div className="absolute inset-0 bg-[#00B4D8]/40" /></div>

      {/* Mission - two column */}
      <section className="flex flex-col md:flex-row gap-6 md:gap-12 px-6 md:px-12 py-12 md:py-20">
        <div className="flex flex-col gap-4 w-full md:w-[540px] shrink-0">
          <span className="text-[#00D776] font-semibold text-xs tracking-[3px] font-[Inter]">OUR MISSION</span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-white leading-[1.15]" style={{ fontFamily: "Space Grotesk" }}>What Drives Us Forward</h2>
          <div className="w-[60px] h-1 bg-[#00D776] rounded-sm" />
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p className="text-[#94A3B8] text-base leading-[1.7] font-[Inter]">Thayer Investment Partners is the largest asset manager investing at the intersection of travel and technology. We partner with some of the most influential innovators and entrepreneurs in the Built World.</p>
          <p className="text-[#64748B] text-base leading-[1.7] font-[Inter]">Our investor network consists of over 150 corporate partners across more than 20 countries and every major asset class in travel — from hospitality and aviation to ground transportation and travel services.</p>
          <h3 className="text-[28px] font-semibold text-white mt-2" style={{ fontFamily: "Space Grotesk" }}>Travel Technology</h3>
          <p className="text-[#64748B] text-base leading-[1.7] font-[Inter]">Together, we are catalyzing the digital transformation of the world&apos;s largest industry, backing breakthrough technologies that make global travel more efficient, sustainable, and resilient.</p>
        </div>
      </section>

      {/* Approach - two column */}
      <section className="flex flex-col md:flex-row gap-6 md:gap-12 px-6 md:px-12 py-12 md:py-20">
        <div className="flex flex-col gap-4 w-full md:w-[540px] shrink-0">
          <span className="text-[#00D776] font-semibold text-xs tracking-[3px] font-[Inter]">OUR APPROACH</span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-white leading-[1.15]" style={{ fontFamily: "Space Grotesk" }}>Making travel more efficient and resilient</h2>
          <div className="w-[60px] h-1 bg-[#00D776] rounded-sm" />
          <p className="text-[#94A3B8] text-[15px] leading-[1.7] font-[Inter]">We believe that the convergence of travel and technology represents one of the most significant investment opportunities of our generation.</p>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          {approachCards.map((c, i) => (
            <div key={i} className="bg-[#131B2E] border border-[#1E293B] rounded-xl p-7 flex flex-col gap-4">
              <c.icon className="w-8 h-8" style={{ color: c.color }} />
              <h3 className="text-xl font-semibold text-white" style={{ fontFamily: "Space Grotesk" }}>{c.title}</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed font-[Inter]">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey - two column */}
      <section className="flex flex-col md:flex-row gap-6 md:gap-12 px-6 md:px-12 py-12 md:py-20">
        <div className="flex flex-col gap-4 w-full md:w-[540px] shrink-0">
          <span className="text-[#00D776] font-semibold text-[11px] tracking-[2px] font-[Inter]">OUR JOURNEY</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>A History of Innovation in Travel</h2>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          {milestones.map((m, i) => (
            <div key={i} className="bg-[#131B2E] border border-[#1E293B] rounded-xl px-6 py-5 flex items-center gap-6">
              <span className="text-[#00D776] text-xl font-bold" style={{ fontFamily: "JetBrains Mono" }}>{m.year}</span>
              <span className="text-[#94A3B8] text-sm font-[Inter]">{m.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-[#1E293B]" />

      {/* Team - two column */}
      <section className="flex flex-col md:flex-row gap-6 md:gap-12 px-6 md:px-12 py-12 md:py-20">
        <div className="flex flex-col gap-4 w-full md:w-[540px] shrink-0">
          <span className="text-[#00D776] font-semibold text-[11px] tracking-[2px] font-[Inter]">TEAM</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>The People Behind Thayer</h2>
        </div>
        <div className="flex flex-col gap-6 flex-1">
          {team.map((row, ri) => (
            <div key={ri} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {row.map((p, i) => (
                <div key={i} className="flex-1 bg-[#131B2E] border border-[#1E293B] rounded-xl p-4 flex flex-col gap-3">
                  <div className="h-40 bg-[#1E293B] rounded-lg" />
                  <span className="text-white text-sm font-semibold font-[Inter]">{p.name}</span>
                  <span className="text-[#64748B] text-xs font-[Inter]">{p.role}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <FuturistFooter />
    </div>
  );
}
