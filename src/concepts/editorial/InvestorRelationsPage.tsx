"use client";

import React from "react";
import { EditorialNav, EditorialFooter } from "./HomePage";
import { useEditorialMode, ec } from "./EditorialModeContext";
import { EditorialStockWidgets } from "@/components/StockWidgets";

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

export default function EditorialInvestorRelationsPage() {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };

  const documents = [
    { type: "PDF", title: "PFIC Statement", desc: "Annual Passive Foreign Investment Company statement for US tax reporting purposes.", link: "Download PDF" },
    { type: "PDF", title: "Prospectus", desc: "Complete offering prospectus with detailed fund strategy, terms, and risk disclosures.", link: "View Prospectus" },
    { type: "SEC", title: "SEC Form 8-K", desc: "Current report filing with the Securities and Exchange Commission for material events.", link: "View Filing" },
  ];

  const funds = [
    { name: "Thayer Fund I", size: "$48M", vintage: "2008", status: "Fully Deployed" },
    { name: "Thayer Fund II", size: "$82M", vintage: "2015", status: "Fully Deployed" },
    { name: "Thayer Fund III", size: "$150M", vintage: "2025", status: "Deploying" },
  ];

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <EditorialNav active="ir" />

      {/* ── Hero ── */}
      <section className="px-6 md:px-12 py-24 md:py-40 border-b" style={{ borderColor: c.rule }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>Investor Relations</span>
            <h1 className="text-[clamp(2rem,4.5vw,4rem)] leading-[1.08] font-light italic mb-6" style={{ ...serif, color: c.text }}>
              Documents, filings, and market data.
            </h1>
            <p className="text-[1.5rem] leading-[1.7]" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
              Access fund documents, regulatory filings, and performance data for Thayer Investment Partners&rsquo;
              limited partners and prospective investors.
            </p>
          </div>
          <div className="border p-8 md:p-10 self-start" style={{ borderColor: c.rule }}>
            <span className="text-[0.65rem] uppercase tracking-[0.2em] block mb-4" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>Important Disclaimer</span>
            <p className="text-[1.5rem] leading-[1.7]" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
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
              <div key={i} className="border p-7 md:p-8 flex flex-col hover:border-[#C49A45]/30 transition-colors group cursor-pointer" style={{ borderColor: c.rule }}>
                <span
                  className={`text-[0.65rem] uppercase tracking-[0.22em] self-start px-3 py-1 border mb-5 ${
                    d.type === "PDF"
                      ? "text-[#C49A45] border-[#C49A45]/30"
                      : d.type === "SEC"
                      ? "border-[#7A7568]/30"
                      : "text-[#4a8c6a] border-[#4a8c6a]/30"
                  }`}
                  style={{ ...sans, color: d.type === "PDF" ? c.accent : d.type === "SEC" ? c.muted : "#4a8c6a", fontWeight: c.sansWeight }}
                >
                  {d.type}
                </span>
                <h3 className="text-[1.5rem] font-light italic mb-3 group-hover:text-[#C49A45] transition-colors" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{d.title}</h3>
                <p className="text-[1.5rem] leading-[1.7] flex-1 mb-5" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>{d.desc}</p>
                <span className="text-[0.78rem] uppercase tracking-[0.18em] group-hover:text-[#C49A45] transition-colors" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>
                  {d.link} &rarr;
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fund Performance (02) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500" style={{ backgroundColor: c.surface }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Fund Performance" number="02" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.15] font-light italic mb-6" style={{ ...serif, color: c.text }}>
                Three generations of travel-focused investing.
              </h2>
              <p className="text-[1.5rem] leading-[1.7]" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
                Since inception, Thayer has deployed capital across three dedicated travel technology funds,
                building a portfolio that spans the entire travel ecosystem from hospitality and aviation to
                entertainment and real estate technology.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {funds.map((f, i) => (
                <div key={i} className="border p-6 grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 md:gap-8" style={{ borderColor: c.rule }}>
                  <span className="text-[1.5rem] font-light italic" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>{f.name}</span>
                  <span className="text-[1rem] font-light" style={{ ...serif, color: c.accent, fontWeight: c.statWeight }}>{f.size}</span>
                  <span className="text-[0.65rem] uppercase tracking-[0.16em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{f.vintage}</span>
                  <span
                    className="text-[0.6rem] uppercase tracking-[0.16em] px-3 py-1 border"
                    style={{
                      ...sans,
                      color: f.status === "Deploying" ? c.accent : c.muted,
                      borderColor: f.status === "Deploying" ? "rgba(196,154,69,0.3)" : "rgba(122,117,104,0.3)",
                      fontWeight: c.sansWeight,
                    }}
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
          <EditorialStockWidgets light={light} />
          <p className="text-[0.65rem] uppercase tracking-[0.16em] mt-6 text-center" style={{ ...sans, color: c.muted, opacity: 0.5, fontWeight: c.sansWeight }}>Data delayed 15 minutes. Source: NASDAQ</p>
        </div>
      </section>

      {/* ── Contact (04) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500" style={{ backgroundColor: c.surface }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Contact" number="04" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="border p-8 md:p-10" style={{ borderColor: c.rule }}>
              <span className="text-[0.78rem] uppercase tracking-[0.22em] block mb-5" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>LP Inquiries</span>
              <h3 className="text-[1.5rem] font-light italic mb-4" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>Limited Partner Relations</h3>
              <p className="text-[1.5rem] leading-[1.7] mb-6" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
                For existing limited partners with questions about fund performance, capital calls,
                or distributions, please contact our investor relations team.
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-[0.78rem] tracking-[0.05em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>ir@thayerinvest.com</span>
                <span className="text-[0.78rem] tracking-[0.05em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>+1 (415) 555-0180</span>
              </div>
            </div>
            <div className="border p-8 md:p-10" style={{ borderColor: c.rule }}>
              <span className="text-[0.78rem] uppercase tracking-[0.22em] block mb-5" style={{ ...sans, color: c.accent, fontWeight: c.sansWeight }}>Fund Administration</span>
              <h3 className="text-[1.5rem] font-light italic mb-4" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>Operations & Compliance</h3>
              <p className="text-[1.5rem] leading-[1.7] mb-6" style={{ ...serif, color: c.bodyText, fontWeight: c.bodyWeight }}>
                For questions related to fund administration, tax documents,
                or compliance matters, please contact our operations team.
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-[0.78rem] tracking-[0.05em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>ops@thayerinvest.com</span>
                <span className="text-[0.78rem] tracking-[0.05em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>+1 (415) 555-0181</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
