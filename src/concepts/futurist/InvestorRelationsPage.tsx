"use client";

import Link from "next/link";
import { FuturistNav, FuturistFooter } from "./HomePage";
import { FileText, TrendingUp, BookOpen } from "lucide-react";

const documents = [
  { icon: FileText, title: "SEC Filings", desc: "10-K Reports, 10-Q Quarterly Filings, and 8-K Current Reports filed with the Securities and Exchange Commission.", link: "View Filings →", color: "#00D776" },
  { icon: TrendingUp, title: "Quarterly Reports", desc: "Financial results, quarterly earnings reports, and portfolio performance data for investor review.", link: "View Reports →", color: "#00B4D8" },
  { icon: BookOpen, title: "Prospectus & Supplements", desc: "Public offerings, prospectus documents, and supplementary materials for institutional investors.", link: "View Documents →", color: "#7C3AED" },
];

const tickers = [
  { symbol: "TVAC", price: "$104.42", change: "+4.23 (+4.2%)", up: true },
  { symbol: "TVACU", price: "$6.18", change: "-0.05 (-0.8%)", up: false },
  { symbol: "TVACW", price: "$10.25", change: "+0.15 (+1.5%)", up: true },
];

export default function FuturistInvestorRelations() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120]">
      <FuturistNav active="Investor Relations" />

      {/* Header - two column */}
      <section className="flex flex-col md:flex-row px-6 md:px-12 py-12 md:py-20">
        <div className="flex flex-col gap-4 w-full md:w-[576px] shrink-0 md:px-12">
          <span className="text-[#00D776] font-semibold text-xs tracking-[3px] font-[Inter]">INVESTOR RELATIONS</span>
          <h1 className="text-[32px] md:text-[56px] font-bold text-white leading-[1.1]" style={{ fontFamily: "Space Grotesk" }}>Investor Relations</h1>
          <div className="w-[60px] h-1 bg-[#00D776] rounded-sm" />
        </div>
        <div className="flex flex-col justify-center gap-4 flex-1 mt-6 md:mt-0 md:px-6">
          <p className="text-[#94A3B8] text-lg leading-[1.7] font-[Inter]">Access important documents, SEC filings, and real-time market data for Thayer Investment Partners securities.</p>
          <p className="text-[#64748B] text-[15px] leading-[1.7] font-[Inter]">Thayer Ventures Acquisition Corp. (NASDAQ: TVAC) is a special purpose acquisition company focused on the travel and transportation technology sector.</p>
        </div>
      </section>

      {/* Ticker Banner */}
      <div className="relative h-[200px] md:h-[280px] bg-cover bg-center flex items-center px-6 md:px-12" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1700574005887-47134ebde2ba?w=1080&q=80')" }}>
        <div className="absolute inset-0 bg-[#00D776]/30" />
        <span className="relative z-10 text-[20px] md:text-[32px] font-bold text-white tracking-[2px]" style={{ fontFamily: "Space Grotesk" }}>NASDAQ: TVAC  ·  TVACU  ·  TVACW</span>
      </div>

      {/* Documents - two column */}
      <section className="flex flex-col md:flex-row px-6 md:px-12 py-12 md:py-20">
        <div className="flex flex-col gap-4 w-full md:w-[576px] shrink-0 md:px-12">
          <span className="text-[#00D776] font-semibold text-xs tracking-[3px] font-[Inter]">DOCUMENTS</span>
          <h2 className="text-[28px] md:text-[44px] font-bold text-white leading-[1.15]" style={{ fontFamily: "Space Grotesk" }}>Documents & Filings</h2>
          <p className="text-[#94A3B8] text-[15px] leading-relaxed font-[Inter]">Access quarterly reports, SEC filings, and other important documents for Thayer Investment Partners.</p>
        </div>
        <div className="flex flex-col gap-5 flex-1 mt-6 md:mt-0 md:px-6">
          {documents.map((d, i) => (
            <div key={i} className="bg-[#131B2E] border border-[#1E293B] rounded-xl p-6 flex items-start gap-5">
              <d.icon className="w-10 h-10 shrink-0" style={{ color: d.color }} />
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "Space Grotesk" }}>{d.title}</h3>
                <p className="text-[#94A3B8] text-[13px] leading-[1.5] font-[Inter]">{d.desc}</p>
                <span className="text-[13px] font-semibold font-[Inter]" style={{ color: d.color }}>{d.link}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Data - two column */}
      <section className="flex flex-col md:flex-row px-6 md:px-12 py-12 md:py-20 border-t border-[#1E293B]">
        <div className="flex flex-col gap-4 w-full md:w-[576px] shrink-0 md:px-12">
          <span className="text-[#00D776] font-semibold text-xs tracking-[3px] font-[Inter]">MARKET DATA</span>
          <h2 className="text-[28px] md:text-[44px] font-bold text-white leading-[1.15]" style={{ fontFamily: "Space Grotesk" }}>Stock Performance</h2>
          <p className="text-[#94A3B8] text-[15px] leading-relaxed font-[Inter]">Real-time NASDAQ performance data for Thayer Investment Partners securities.</p>
        </div>
        <div className="flex flex-col gap-4 flex-1 mt-6 md:mt-0 md:px-6">
          {tickers.map((t, i) => (
            <div key={i} className="bg-[#131B2E] border border-[#1E293B] rounded-xl p-6 flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="bg-[#00D776]/15 text-[#00D776] text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded w-fit font-[Inter]">NASDAQ</span>
                <span className="text-[#94A3B8] text-sm font-bold" style={{ fontFamily: "Space Grotesk" }}>{t.symbol}</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[24px] md:text-[32px] font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>{t.price}</span>
                <span className={`text-sm font-semibold font-[Inter] ${t.up ? "text-[#00D776]" : "text-[#EF4444]"}`}>{t.change}</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      <FuturistFooter />
    </div>
  );
}
