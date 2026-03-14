import Link from "next/link";
import { FuturistNav, FuturistFooter } from "./HomePage";
import { ChevronRight } from "lucide-react";

const articles = [
  { tag: "INVESTMENT", tagColor: "#00D776", title: "Thayer Leads $40M Series B in AeroPort Technologies", date: "Aug 25, 2025" },
  { tag: "INSIGHTS", tagColor: "#00B4D8", title: "Why AI-Powered Concierge Services Will Define Luxury Travel", date: "Feb 15, 2026" },
  { tag: "PARTNERSHIP", tagColor: "#7C3AED", title: "Thayer Partners with SkyBridge to Accelerate Aviation Innovation", date: "Aug 3, 2025" },
  { tag: "VIDEO", tagColor: "#00D776", title: "Panel Discussion: The Future of Sustainable Tourism Infrastructure", date: "Jan 10, 2026" },
  { tag: "INSIGHTS", tagColor: "#00B4D8", title: "How Blockchain is Reshaping Travel Loyalty Programs", date: "Jun 12, 2025" },
  { tag: "INVESTMENT", tagColor: "#00D776", title: "Thayer Announces Strategic Investment in NomadPay Fintech Platform", date: "Oct 18, 2025" },
  { tag: "PARTNERSHIP", tagColor: "#7C3AED", title: "Thayer and GlobalStay Launch Joint Venture for Smart Hotel Tech", date: "Dec 5, 2025" },
];

export default function FuturistNews() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120]">
      <FuturistNav active="News" />

      {/* Header */}
      <section className="flex gap-12 px-14 py-20">
        <div className="flex flex-col justify-center gap-4 flex-1">
          <h1 className="text-[52px] font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>News & Insights</h1>
          <p className="text-[#94A3B8] text-base leading-[1.5] font-[Inter] max-w-[480px]">The latest announcements, investment updates, and thought leadership from Thayer Investment Partners.</p>
        </div>
        <div className="flex flex-col justify-center items-end gap-2">
          <div className="w-[120px] h-[3px] bg-[#00D776]" />
          <div className="w-[80px] h-[3px] bg-[#00D776]/50" />
          <div className="w-[40px] h-[3px] bg-[#00D776]/25" />
        </div>
      </section>

      {/* Featured */}
      <section className="flex gap-8 px-14 py-10">
        <div className="w-[528px] h-[400px] shrink-0 bg-cover bg-center rounded-xl" style={{ backgroundImage: "url('/images/futurist-article-hero.png')" }} />
        <div className="flex flex-col justify-center gap-4 flex-1">
          <div className="flex items-center gap-3">
            <span className="bg-[#00D776]/15 text-[#00D776] text-[11px] font-semibold tracking-[1.5px] px-2.5 py-1 rounded font-[Inter]">VIDEO</span>
            <span className="text-[#64748B] text-[13px] font-[Inter]">March 11, 2026</span>
          </div>
          <h2 className="text-[28px] font-bold text-white leading-[1.3]" style={{ fontFamily: "Space Grotesk" }}>Thayer Managing Partner Speaks with TravelAI About Their Future Vision</h2>
          <span className="text-[#94A3B8] text-sm font-[Inter]">Chris Hemmeter, Managing Partner</span>
          <Link href="/news/thayer-travelai" className="bg-[#00D776] text-[#0B1120] text-sm font-semibold px-6 py-2.5 rounded-md w-fit font-[Inter]">Read Article</Link>
        </div>
      </section>

      <div className="h-px bg-[#1E293B]" />

      {/* Article list */}
      <section className="px-14 py-12 flex flex-col">
        <span className="text-[#64748B] text-[11px] font-semibold tracking-[2px] mb-6 font-[Inter]">ALL ARTICLES</span>
        {articles.map((a, i) => (
          <div key={i} className={`flex items-center gap-4 py-5 ${i < articles.length - 1 ? "border-b border-[#1E293B]" : ""}`}>
            <div className="w-[120px]">
              <span className="text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded font-[Inter]" style={{ color: a.tagColor, backgroundColor: a.tagColor + "20" }}>{a.tag}</span>
            </div>
            <span className="text-white text-[15px] font-medium flex-1 font-[Inter]">{a.title}</span>
            <span className="text-[#64748B] text-[13px] font-[Inter]">{a.date}</span>
            <ChevronRight className="w-[18px] h-[18px] text-[#64748B]" />
          </div>
        ))}
      </section>

      <div className="h-px bg-[#1E293B]" />
      <FuturistFooter />
    </div>
  );
}
