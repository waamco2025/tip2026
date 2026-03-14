import Link from "next/link";
import { Building2, MonitorSmartphone, Ship, MapPin, Car } from "lucide-react";

const categories = [
  { icon: Building2, name: "Hotels & Resorts", color: "#00D776" },
  { icon: MonitorSmartphone, name: "Travel Tech", color: "#00B4D8" },
  { icon: Ship, name: "Cruises & Maritime", color: "#7C3AED" },
  { icon: MapPin, name: "Destinations", color: "#00D776" },
  { icon: Car, name: "Ground Transportation", color: "#00B4D8" },
];

const testimonials = [
  { quote: "\"Thayer's deep expertise in travel technology has been instrumental in helping us scale our platform to serve millions of travelers worldwide.\"", author: "— Sarah Chen, CEO of TravelFlow" },
  { quote: "\"Their network of industry connections opened doors we didn't even know existed. A truly transformative partnership.\"", author: "— Marcus Rivera, Founder of JetPath" },
  { quote: "\"Thayer understood our vision from day one and provided strategic guidance that accelerated our growth by 3x.\"", author: "— Anika Patel, CTO of RouteSmart" },
];

const news = [
  { date: "MAR 10, 2026", title: "Thayer Leads $45M Series B in Autonomous Shuttle Startup", desc: "Investment will accelerate deployment of self-driving transit solutions across major urban centers." },
  { date: "FEB 24, 2026", title: "New Report: AI-Powered Travel Personalization Market to Reach $12B by 2030", desc: "Thayer-backed companies are at the forefront of the AI revolution in travel planning and booking." },
  { date: "FEB 08, 2026", title: "Thayer Portfolio Company AeroLink Acquired for $200M", desc: "Strategic exit marks one of the largest acquisitions in aviation technology this year." },
];

function FuturistNav({ active }: { active?: string }) {
  return (
    <nav className="relative z-20 flex items-center justify-between bg-[#0B1120] h-20 px-16 pt-6">
      <Link href="/"><img src="/logotype.svg" alt="Thayer" className="h-12" /></Link>
      <div className="flex items-center gap-10">
        {[{ l: "About", h: "/about" }, { l: "Portfolio", h: "/portfolio" }, { l: "News", h: "/news" }, { l: "Investor Relations", h: "/investor-relations" }].map((item) => (
          <Link key={item.l} href={item.h} className={`text-sm ${item.l === active ? "text-[#00D776] font-semibold" : "text-[#94A3B8]"} hover:text-white transition-colors`}>{item.l}</Link>
        ))}
      </div>
    </nav>
  );
}

function FuturistFooter() {
  return (
    <footer className="bg-[#080D18] px-12 py-12 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <img src="/logotype.svg" alt="Thayer" className="h-10" />
        <div className="flex items-center gap-8">
          {["About", "Portfolio", "News", "Investor Relations"].map((l) => (
            <Link key={l} href={`/${l === "Investor Relations" ? "investor-relations" : l.toLowerCase()}`} className="text-[#94A3B8] text-sm hover:text-white transition-colors">{l}</Link>
          ))}
        </div>
      </div>
      <div className="h-px bg-[#1E293B]" />
      <span className="text-[#64748B] text-[13px]">© 2026 Thayer Investment Partners. All rights reserved.</span>
    </footer>
  );
}

export { FuturistNav, FuturistFooter };

export default function FuturistHome() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120]">
      {/* Hero with full-bleed image */}
      <div className="relative h-[672px] overflow-hidden flex flex-col">
        <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1662385930449-2ce48aae632c?w=1080&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-transparent" />
        <nav className="relative z-20 flex items-center justify-between bg-transparent h-20 px-16 pt-6">
          <Link href="/"><img src="/logotype.svg" alt="Thayer" className="h-12" /></Link>
          <div className="flex items-center gap-10">
            {[{ l: "About", h: "/about" }, { l: "Portfolio", h: "/portfolio" }, { l: "News", h: "/news" }, { l: "Investor Relations", h: "/investor-relations" }].map((item) => (
              <Link key={item.l} href={item.h} className="text-sm text-white/70 hover:text-white transition-colors">{item.l}</Link>
            ))}
          </div>
        </nav>
        <div className="relative z-10 px-16 flex flex-col justify-center gap-6 max-w-[600px] flex-1">
          <span className="text-[#00D776] font-semibold text-[11px] tracking-[2px] font-[Inter]">PIONEERS IN TRAVEL TECHNOLOGY VENTURE CAPITAL</span>
          <h1 className="text-[48px] font-bold text-white leading-[1.1]" style={{ fontFamily: "Space Grotesk" }}>Investing in the Future of Global Travel</h1>
          <p className="text-[#94A3B8] text-base leading-relaxed font-[Inter]">We partner with visionary founders building the next generation of travel and transportation technology companies that will reshape how the world moves.</p>
          <Link href="/portfolio" className="bg-[#00D776] text-[#0B1120] font-semibold text-sm px-8 py-3.5 rounded-lg w-fit hover:bg-[#00C06A] transition-colors font-[Inter]">Explore Portfolio</Link>
        </div>
      </div>

      {/* Testimonials - two column */}
      <section className="flex gap-12 px-16 py-20">
        <div className="flex flex-col gap-4 w-[480px] shrink-0">
          <span className="text-[#00D776] font-semibold text-[11px] tracking-[2px] font-[Inter]">TESTIMONIALS</span>
          <h2 className="text-4xl font-bold text-white leading-[1.2]" style={{ fontFamily: "Space Grotesk" }}>Trusted by Industry Leaders</h2>
        </div>
        <div className="flex flex-col gap-5 flex-1">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#131B2E] border border-[#1E293B] rounded-xl p-7 flex flex-col gap-4">
              <p className="text-[#94A3B8] text-[15px] leading-relaxed font-[Inter]">{t.quote}</p>
              <span className="text-white text-[13px] font-semibold font-[Inter]">{t.author}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Parallax Banner */}
      <section className="relative h-[300px] flex flex-col items-center justify-center gap-4 bg-cover bg-center opacity-90" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1769913773089-73113d2a5cc1?w=1080&q=80')" }}><div className="absolute inset-0 bg-[#0B1120]/70" />
        <h2 className="relative z-10 text-[32px] font-bold text-white text-center" style={{ fontFamily: "Space Grotesk" }}>THE FUTURE OF TRAVEL IS BEING BUILT TODAY</h2>
        <p className="relative z-10 text-white/80 text-base text-center font-[Inter]">A $15 trillion industry undergoing unprecedented digital transformation</p>
      </section>

      {/* Opportunity - two column */}
      <section className="flex items-center gap-12 px-16 py-20">
        <div className="flex flex-col gap-3 w-[480px] shrink-0">
          <span className="text-[#00D776] font-semibold text-[11px] tracking-[2px] font-[Inter]">OPPORTUNITY</span>
          <h2 className="text-[56px] font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>$15 Trillion</h2>
          <span className="text-[#94A3B8] text-lg font-[Inter]">Global Travel Industry</span>
        </div>
        <div className="flex gap-5 flex-1">
          {[{ val: "110+", label: "Portfolio Companies", color: "#00D776" }, { val: "$830M+", label: "Assets Under Management", color: "#00D776" }, { val: "20+", label: "Years of Experience", color: "#00D776" }].map((s, i) => (
            <div key={i} className="flex-1 bg-[#131B2E] border border-[#1E293B] rounded-xl p-7 flex flex-col gap-3">
              <span className="text-4xl font-bold" style={{ fontFamily: "Space Grotesk", color: s.color }}>{s.val}</span>
              <span className="text-[#94A3B8] text-sm font-[Inter]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories - two column */}
      <section className="flex gap-12 px-16 py-20">
        <div className="flex flex-col gap-4 w-[480px] shrink-0">
          <span className="text-[#00D776] font-semibold text-[11px] tracking-[2px] font-[Inter]">SECTORS</span>
          <h2 className="text-4xl font-bold text-white leading-[1.2]" style={{ fontFamily: "Space Grotesk" }}>Our Investment Categories</h2>
          <p className="text-[#94A3B8] text-[15px] leading-relaxed font-[Inter] max-w-[380px]">Focused exclusively on the travel and transportation ecosystem across five core verticals.</p>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          {categories.map((c, i) => (
            <div key={i} className="bg-[#131B2E] border border-[#1E293B] rounded-xl px-6 py-5 flex items-center gap-4">
              <c.icon className="w-[22px] h-[22px]" style={{ color: c.color }} />
              <span className="text-white text-[15px] font-medium font-[Inter]">{c.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Network - two column */}
      <section className="flex items-center gap-12 px-16 py-20">
        <div className="flex flex-col gap-4 w-[480px] shrink-0">
          <span className="text-[#00D776] font-semibold text-[11px] tracking-[2px] font-[Inter]">NETWORK</span>
          <h2 className="text-4xl font-bold text-white leading-[1.2]" style={{ fontFamily: "Space Grotesk" }}>A Powerful Network</h2>
        </div>
        <div className="flex flex-col gap-6 flex-1">
          <p className="text-[#94A3B8] text-base leading-[1.7] font-[Inter]">We connect our portfolio companies with strategic partners across the global travel ecosystem — from airline alliances and hotel groups to technology platforms and distribution networks.</p>
          <Link href="/about" className="flex items-center gap-2 border border-[#00D776] text-[#00D776] text-sm font-medium px-6 py-3 rounded-lg w-fit hover:bg-[#00D776]/10 transition-colors font-[Inter]">Learn More →</Link>
        </div>
      </section>

      {/* Parallax Banner 2 */}
      <div className="relative h-[250px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1768022926120-3288b9d10aac?w=1080&q=80')" }}><div className="absolute inset-0 bg-[#7C3AED]/40" /></div>

      {/* News - two column */}
      <section className="flex gap-12 px-16 py-20">
        <div className="flex flex-col gap-4 w-[480px] shrink-0">
          <span className="text-[#00D776] font-semibold text-[11px] tracking-[2px] font-[Inter]">LATEST NEWS</span>
          <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>Stay Updated</h2>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          {news.map((n, i) => (
            <div key={i} className="bg-[#131B2E] border border-[#1E293B] rounded-xl p-7 flex flex-col gap-2">
              <span className="text-[#64748B] text-[11px] font-semibold tracking-[1px] font-[Inter]">{n.date}</span>
              <h3 className="text-white text-[15px] font-semibold font-[Inter]">{n.title}</h3>
              <p className="text-[#94A3B8] text-[13px] leading-[1.5] font-[Inter]">{n.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <FuturistFooter />
    </div>
  );
}
