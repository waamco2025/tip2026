import Link from "next/link";
import { FuturistNav, FuturistFooter } from "./HomePage";

const relatedArticles = [
  { tag: "INVESTMENT", tagColor: "#00D776", date: "Aug 25, 2025", title: "Thayer Leads $40M Series B in AeroPort Technologies" },
  { tag: "INSIGHTS", tagColor: "#00B4D8", date: "Feb 15, 2026", title: "Why AI-Powered Concierge Services Will Define Luxury Travel" },
  { tag: "PARTNERSHIP", tagColor: "#7C3AED", date: "Aug 3, 2025", title: "Thayer Partners with SkyBridge to Accelerate Aviation Innovation" },
];

export default function FuturistArticle() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120]">
      <FuturistNav active="News" />
      <div className="h-px bg-[#1E293B]" />

      {/* Header - two column */}
      <section className="flex gap-10 px-14 py-14">
        <div className="flex flex-col justify-center gap-4 w-[480px] shrink-0">
          <span className="text-[#64748B] text-[13px] font-[Inter]">News  &gt;  Article</span>
          <div className="flex items-center gap-3">
            <span className="bg-[#00D776]/15 text-[#00D776] text-[11px] font-semibold tracking-[1.5px] px-2.5 py-1 rounded font-[Inter]">VIDEO</span>
            <span className="text-[#64748B] text-[13px] font-[Inter]">March 11, 2026</span>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4 flex-1">
          <h1 className="text-[40px] font-bold text-white leading-[1.2]" style={{ fontFamily: "Space Grotesk" }}>Thayer Managing Partner Speaks with TravelAI About Their Future Vision</h1>
          <p className="text-[#94A3B8] text-base leading-[1.5] font-[Inter]">Chris Hemmeter sits down with TravelAI to discuss how artificial intelligence is reshaping the travel and transportation landscape.</p>
        </div>
      </section>

      {/* Hero Image */}
      <div className="px-14 py-0">
        <div className="w-full h-[700px] bg-cover bg-center rounded-xl" style={{ backgroundImage: "url('/images/futurist-article-hero.png')" }} />
      </div>

      <div className="h-px bg-[#1E293B] mt-8" />

      {/* Article body - two column */}
      <section className="flex gap-10 px-14 py-14">
        <div className="flex flex-col gap-4 w-[480px] shrink-0">
          <span className="text-[#64748B] text-[10px] font-semibold tracking-[2px] font-[Inter]">WRITTEN BY</span>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#1E293B] rounded-full" />
            <div className="flex flex-col gap-1">
              <span className="text-white text-[15px] font-semibold font-[Inter]">Chris Hemmeter</span>
              <span className="text-[#94A3B8] text-[13px] font-[Inter]">Managing Partner</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 flex-1">
          {[
            "In an exclusive conversation with TravelAI, Thayer Investment Partners Managing Partner Chris Hemmeter laid out a compelling vision for how artificial intelligence will fundamentally transform the travel and transportation industries over the next decade.",
            "\"We are at an inflection point,\" Hemmeter explained. \"The convergence of large language models, computer vision, and real-time data processing means that every touchpoint in the traveler journey can now be intelligently orchestrated.\"",
            "Hemmeter pointed to Thayer's recent portfolio investments as evidence of this thesis in action. AeroPort Technologies, which closed a $40 million Series B led by Thayer, is deploying computer vision systems that reduce airport security wait times by up to 60 percent.",
            "The conversation also touched on the sustainability imperative facing the travel sector. Hemmeter noted that AI-powered route optimization and demand forecasting tools are not only improving margins for operators but also reducing carbon footprints at scale.",
            "Looking ahead, Hemmeter expressed particular excitement about the convergence of generative AI and concierge services — a future where AI-powered travel agents handle complex multi-leg itineraries, anticipate disruptions, and negotiate optimal pricing in real time.",
          ].map((p, i) => (
            <p key={i} className="text-[#94A3B8] text-[15px] leading-[1.7] font-[Inter]">{p}</p>
          ))}
        </div>
      </section>

      <div className="h-px bg-[#1E293B]" />

      {/* Related - two column */}
      <section className="flex gap-10 px-14 py-14">
        <div className="flex flex-col gap-3 w-[480px] shrink-0">
          <h2 className="text-[32px] font-bold text-white leading-[1.2]" style={{ fontFamily: "Space Grotesk" }}>More News & Insights</h2>
          <p className="text-[#64748B] text-sm font-[Inter]">Continue exploring the latest from Thayer.</p>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          {relatedArticles.map((a, i) => (
            <div key={i} className="bg-[#131B2E] border border-[#1E293B] rounded-xl p-4 flex items-center gap-4">
              <div className="w-[120px] h-20 bg-[#1E293B] rounded-lg shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-semibold tracking-[1px] px-2 py-0.5 rounded font-[Inter]" style={{ color: a.tagColor, backgroundColor: a.tagColor + "20" }}>{a.tag}</span>
                  <span className="text-[#64748B] text-xs font-[Inter]">{a.date}</span>
                </div>
                <span className="text-white text-sm font-medium font-[Inter]">{a.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-[#1E293B]" />
      <FuturistFooter />
    </div>
  );
}
