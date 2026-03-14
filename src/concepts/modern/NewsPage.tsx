import Link from "next/link";
import { ModernNav, ModernFooter } from "./AboutPage";

const articles = [
  { tag: "EDITORIAL", title: "How AI Is Reshaping the Hotel Booking Experience", date: "January 12, 2026", img: "https://images.unsplash.com/photo-1689772640958-7c186dbdfe26?w=600&q=80" },
  { tag: "INNOVATION", title: "Global Travel Recovery Surpasses Pre-Pandemic Levels", date: "January 5, 2026", img: "https://images.unsplash.com/photo-1768069932764-edb7995519ff?w=600&q=80" },
  { tag: "STRATEGY", title: "Sustainable Tourism: The $50 Billion Opportunity", date: "December 28, 2025", img: "https://images.unsplash.com/photo-1767857214296-d13a3c7cdd26?w=600&q=80" },
  { tag: "VIDEO", title: "Inside the Next Generation of Cruise Technology", date: "December 20, 2025", img: "https://images.unsplash.com/photo-1771774469900-5a30448a3051?w=600&q=80" },
  { tag: "DESIGN", title: "Designing the Airport of Tomorrow", date: "December 14, 2025", img: "https://images.unsplash.com/photo-1770539669281-f5a710017670?w=600&q=80" },
  { tag: "EDITORIAL", title: "Why Personalization Is the Future of Hospitality", date: "December 8, 2025", img: "https://images.unsplash.com/photo-1589004264768-3c3a7791dcc4?w=600&q=80" },
  { tag: "INNOVATION", title: "Electric Aviation and the Future of Short-Haul Flights", date: "November 30, 2025", img: "https://images.unsplash.com/photo-1677568527421-2e8f0f1a7ef5?w=600&q=80" },
  { tag: "STRATEGY", title: "Data-Driven Decisions in Travel Venture Capital", date: "November 22, 2025", img: "https://images.unsplash.com/photo-1721593979313-8661afd501c2?w=600&q=80" },
  { tag: "DESIGN", title: "Reimagining the Boutique Hotel Experience", date: "November 15, 2025", img: "https://images.unsplash.com/photo-1611731146471-15c645541cae?w=600&q=80" },
];

export default function ModernNews() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ModernNav active="Insights" />

      {/* Split Hero */}
      <section className="flex flex-col md:flex-row h-auto md:h-[560px]">
        <div className="w-full md:w-[660px] shrink-0 flex flex-col justify-center gap-6 bg-[#0D2818] px-6 md:px-14 py-12 md:py-20 min-h-[400px] md:min-h-0">
          <span className="text-[#C9A962] font-semibold text-xs tracking-[2px]">INSIGHTS</span>
          <h1 className="font-playfair text-[28px] md:text-[44px] italic font-normal text-white leading-[1.15]">Big ideas, emerging trends, and ground-breaking concepts focused on the future of travel.</h1>
        </div>
        <div className="h-[300px] md:h-auto flex-1 bg-cover bg-center" style={{ backgroundImage: "url('/images/modern-news-hero.png')" }} />
      </section>

      {/* Featured */}
      <div className="px-6 md:px-14 pt-8"><span className="text-[#999] font-semibold text-[11px] tracking-[2px]">FEATURED</span></div>
      <section className="flex flex-col md:flex-row gap-10 px-6 md:px-14 py-8 pb-12">
        <div className="w-full md:w-[580px] h-[300px] md:h-[420px] shrink-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524850301259-7729d41d11d9?w=1080&q=80')" }} />
        <div className="flex flex-col justify-center gap-5">
          <span className="text-[#C9A962] font-semibold text-[11px] tracking-[2px]">VIDEO</span>
          <h2 className="font-playfair text-[32px] italic font-semibold text-[#1A2E23] leading-[1.2]">Thayer CEO Speaks with TravelAI About Their Future Vision</h2>
          <p className="text-[#666] text-sm leading-relaxed">Chris Hemmeter and Michael Torres discuss TravelAI&apos;s acquisition of NextTrip Technologies.</p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E5E5E5]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[#1A2E23] text-[13px] font-medium">Chris Hemmeter</span>
              <span className="text-[#999] text-xs">Managing Partner  •  January 24, 2026</span>
            </div>
          </div>
          <Link href="/news/thayer-travelai" className="flex items-center gap-2 bg-[#0D2818] text-white text-xs font-semibold tracking-[1px] px-6 py-3 w-fit hover:bg-[#1A3328] transition-colors">LEARN MORE <span>→</span></Link>
        </div>
      </section>

      <div className="h-px bg-[#E5E5E5]" />

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 md:gap-8 items-center px-6 md:px-14 border-b border-[#E5E5E5]">
        {["ALL", "EDITORIAL", "INNOVATION", "STRATEGY", "DESIGN", "VIDEO"].map((t, i) => (
          <button key={t} className={`py-4 text-xs tracking-[1.5px] font-medium ${i === 0 ? "text-[#0D2818] font-semibold border-b-2 border-[#0D2818]" : "text-[#999]"}`}>{t}</button>
        ))}
      </div>

      {/* Article Grid */}
      <section className="px-6 md:px-14 py-10 flex flex-col gap-6">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex flex-col md:flex-row gap-6">
            {articles.slice(row * 3, row * 3 + 3).map((a, i) => (
              <div key={i} className="flex-1 flex flex-col gap-3">
                <div className="h-60 bg-cover bg-center" style={{ backgroundImage: `url('${a.img}')` }} />
                <span className="text-[#C9A962] font-semibold text-[10px] tracking-[1.5px]">{a.tag}</span>
                <h3 className="font-playfair text-xl italic font-semibold text-[#1A2E23] leading-[1.25]">{a.title}</h3>
                <span className="text-[#999] text-xs">{a.date}</span>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Load More */}
      <div className="flex justify-center px-6 md:px-14 pb-12">
        <button className="bg-[#0D2818] text-white px-10 py-3.5 text-xs font-semibold tracking-[1.5px] hover:bg-[#1A3328] transition-colors">LOAD MORE</button>
      </div>

      <ModernFooter />
    </div>
  );
}
