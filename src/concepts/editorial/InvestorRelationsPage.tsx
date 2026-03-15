"use client";

import React from "react";
import { EditorialNav, EditorialFooter } from "./HomePage";

function SectionHeader({ label, number }: { label: string; number: string }) {
  return (
    <div className="flex items-center gap-6 mb-16 md:mb-20">
      <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#C49A45] shrink-0" style={{ fontFamily: "'Syne', sans-serif" }}>{label}</span>
      <div className="flex-1 h-px bg-white/[0.07]" />
      <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#7A7568] shrink-0" style={{ fontFamily: "'Syne', sans-serif" }}>{number}</span>
    </div>
  );
}

export default function EditorialInvestorRelationsPage() {
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };

  const documents = [
    { type: "PDF", title: "Fund III Investor Presentation", desc: "Comprehensive overview of investment thesis, strategy, and portfolio construction for Fund III.", link: "Download PDF" },
    { type: "PDF", title: "Annual Report 2025", desc: "Year-end performance review, portfolio updates, and market outlook for limited partners.", link: "Download PDF" },
    { type: "SEC", title: "Form ADV Part 2A", desc: "SEC-required disclosure document detailing advisory services, fees, and business practices.", link: "View Filing" },
    { type: "SEC", title: "Form D Filing", desc: "Notice of exempt offering of securities filed with the Securities and Exchange Commission.", link: "View Filing" },
    { type: "XLS", title: "Quarterly Capital Account", desc: "Detailed capital account statements and performance attribution for current quarter.", link: "Download Report" },
    { type: "PDF", title: "ESG & Impact Report", desc: "Environmental, social, and governance practices across portfolio companies and firm operations.", link: "Download PDF" },
  ];

  const funds = [
    { name: "Thayer Fund I", size: "$48M", vintage: "2008", status: "Fully Deployed" },
    { name: "Thayer Fund II", size: "$82M", vintage: "2015", status: "Fully Deployed" },
    { name: "Thayer Fund III", size: "$150M", vintage: "2025", status: "Deploying" },
  ];

  return (
    <div className="bg-[#0C0C0A] text-[#EAE5DB] min-h-screen">
      <EditorialNav active="ir" />

      {/* ── Hero ── */}
      <section className="px-6 md:px-12 py-24 md:py-40 border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#C49A45] block mb-8" style={sans}>Investor Relations</span>
            <h1 className="text-[clamp(2rem,4.5vw,4rem)] leading-[1.08] font-light italic mb-6" style={serif}>
              Documents, filings, and market data.
            </h1>
            <p className="text-[1.1rem] leading-[1.85] font-light" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
              Access fund documents, regulatory filings, and performance data for Thayer Investment Partners&rsquo;
              limited partners and prospective investors.
            </p>
          </div>
          <div className="border border-white/[0.07] p-8 md:p-10 self-start">
            <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[#C49A45] block mb-4" style={sans}>Important Disclaimer</span>
            <p className="text-[0.85rem] leading-[1.75]" style={{ ...serif, color: "rgba(234,229,219,0.55)" }}>
              The information contained herein is for informational purposes only and does not constitute an offer to sell
              or a solicitation of an offer to buy any securities. Past performance is not indicative of future results.
              Investment involves risk, including possible loss of principal.
            </p>
          </div>
        </div>
      </section>

      {/* ── Documents (01) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Documents & Filings" number="01" />
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {documents.map((d, i) => (
              <div key={i} className="border border-white/[0.07] p-7 md:p-8 flex flex-col hover:border-[#C49A45]/30 transition-colors group cursor-pointer">
                <span
                  className={`text-[0.55rem] uppercase tracking-[0.22em] self-start px-3 py-1 border mb-5 ${
                    d.type === "PDF"
                      ? "text-[#C49A45] border-[#C49A45]/30"
                      : d.type === "SEC"
                      ? "text-[#7A7568] border-[#7A7568]/30"
                      : "text-[#4a8c6a] border-[#4a8c6a]/30"
                  }`}
                  style={sans}
                >
                  {d.type}
                </span>
                <h3 className="text-[1.15rem] font-light italic mb-3 group-hover:text-[#C49A45] transition-colors" style={serif}>{d.title}</h3>
                <p className="text-[0.82rem] leading-[1.7] flex-1 mb-5" style={{ ...serif, color: "rgba(234,229,219,0.55)" }}>{d.desc}</p>
                <span className="text-[0.58rem] uppercase tracking-[0.18em] text-[#7A7568] group-hover:text-[#C49A45] transition-colors" style={sans}>
                  {d.link} &rarr;
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fund Performance (02) ── */}
      <section className="bg-[#141410] px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Fund Performance" number="02" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.15] font-light italic mb-6" style={serif}>
                Three generations of travel-focused investing.
              </h2>
              <p className="text-[1.1rem] leading-[1.85] font-light" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
                Since inception, Thayer has deployed capital across three dedicated travel technology funds,
                building a portfolio that spans the entire travel ecosystem from hospitality and aviation to
                entertainment and real estate technology.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {funds.map((f, i) => (
                <div key={i} className="border border-white/[0.07] p-6 grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 md:gap-8">
                  <span className="text-[1.1rem] font-light italic" style={serif}>{f.name}</span>
                  <span className="text-[1rem] font-light text-[#C49A45]" style={serif}>{f.size}</span>
                  <span className="text-[0.55rem] uppercase tracking-[0.16em] text-[#7A7568]" style={sans}>{f.vintage}</span>
                  <span
                    className={`text-[0.5rem] uppercase tracking-[0.16em] px-3 py-1 border ${
                      f.status === "Deploying" ? "text-[#C49A45] border-[#C49A45]/30" : "text-[#7A7568] border-[#7A7568]/30"
                    }`}
                    style={sans}
                  >
                    {f.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Market Data (03) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Market Data" number="03" />
          <div className="border border-white/[0.07] p-12 md:p-16 flex flex-col items-center justify-center min-h-[300px]">
            <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#7A7568] mb-4" style={sans}>NASDAQ Travel Index</span>
            <div className="w-full max-w-2xl h-48 bg-[#141410] border border-white/[0.05] flex items-center justify-center">
              <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[#7A7568]/40" style={sans}>Market Widget Placeholder</span>
            </div>
            <span className="text-[0.55rem] uppercase tracking-[0.16em] text-[#7A7568]/50 mt-4" style={sans}>Data delayed 15 minutes. Source: NASDAQ</span>
          </div>
        </div>
      </section>

      {/* ── Contact (04) ── */}
      <section className="bg-[#141410] px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Contact" number="04" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="border border-white/[0.07] p-8 md:p-10">
              <span className="text-[0.58rem] uppercase tracking-[0.22em] text-[#C49A45] block mb-5" style={sans}>LP Inquiries</span>
              <h3 className="text-[1.3rem] font-light italic mb-4" style={serif}>Limited Partner Relations</h3>
              <p className="text-[0.92rem] leading-[1.8] mb-6" style={{ ...serif, color: "rgba(234,229,219,0.6)" }}>
                For existing limited partners with questions about fund performance, capital calls,
                or distributions, please contact our investor relations team.
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-[0.68rem] tracking-[0.05em] text-[#7A7568]" style={sans}>ir@thayerinvest.com</span>
                <span className="text-[0.68rem] tracking-[0.05em] text-[#7A7568]" style={sans}>+1 (415) 555-0180</span>
              </div>
            </div>
            <div className="border border-white/[0.07] p-8 md:p-10">
              <span className="text-[0.58rem] uppercase tracking-[0.22em] text-[#C49A45] block mb-5" style={sans}>Fund Administration</span>
              <h3 className="text-[1.3rem] font-light italic mb-4" style={serif}>Operations & Compliance</h3>
              <p className="text-[0.92rem] leading-[1.8] mb-6" style={{ ...serif, color: "rgba(234,229,219,0.6)" }}>
                For questions related to fund administration, tax documents,
                or compliance matters, please contact our operations team.
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-[0.68rem] tracking-[0.05em] text-[#7A7568]" style={sans}>ops@thayerinvest.com</span>
                <span className="text-[0.68rem] tracking-[0.05em] text-[#7A7568]" style={sans}>+1 (415) 555-0181</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
