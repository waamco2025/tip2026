"use client";

import React from "react";
import { EditorialNav, EditorialFooter } from "./HomePage";
import { useEditorialMode, ec } from "./EditorialModeContext";

function SectionHeader({ label, number }: { label: string; number: string }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  return (
    <div className="flex items-center gap-6 mb-16 md:mb-20">
      <span className="text-[0.62rem] uppercase tracking-[0.22em] shrink-0" style={{ fontFamily: "'Syne', sans-serif", color: c.accent }}>{label}</span>
      <div className="flex-1 h-px" style={{ backgroundColor: c.rule }} />
      <span className="text-[0.62rem] uppercase tracking-[0.22em] shrink-0" style={{ fontFamily: "'Syne', sans-serif", color: c.muted }}>{number}</span>
    </div>
  );
}

export default function EditorialInvestorRelationsPage() {
  const { light } = useEditorialMode();
  const c = ec(light);
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
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <EditorialNav active="ir" />

      {/* ── Hero ── */}
      <section className="px-6 md:px-12 py-24 md:py-40 border-b" style={{ borderColor: c.rule }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <span className="text-[0.62rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accent }}>Investor Relations</span>
            <h1 className="text-[clamp(2rem,4.5vw,4rem)] leading-[1.08] font-light italic mb-6" style={{ ...serif, color: c.text }}>
              Documents, filings, and market data.
            </h1>
            <p className="text-[1.1rem] leading-[1.85] font-light" style={{ ...serif, color: c.bodyText }}>
              Access fund documents, regulatory filings, and performance data for Thayer Investment Partners&rsquo;
              limited partners and prospective investors.
            </p>
          </div>
          <div className="border p-8 md:p-10 self-start" style={{ borderColor: c.rule }}>
            <span className="text-[0.55rem] uppercase tracking-[0.2em] block mb-4" style={{ ...sans, color: c.accent }}>Important Disclaimer</span>
            <p className="text-[0.85rem] leading-[1.75]" style={{ ...serif, color: c.muted }}>
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
                  className={`text-[0.55rem] uppercase tracking-[0.22em] self-start px-3 py-1 border mb-5 ${
                    d.type === "PDF"
                      ? "text-[#C49A45] border-[#C49A45]/30"
                      : d.type === "SEC"
                      ? "border-[#7A7568]/30"
                      : "text-[#4a8c6a] border-[#4a8c6a]/30"
                  }`}
                  style={{ ...sans, color: d.type === "PDF" ? c.accent : d.type === "SEC" ? c.muted : "#4a8c6a" }}
                >
                  {d.type}
                </span>
                <h3 className="text-[1.15rem] font-light italic mb-3 group-hover:text-[#C49A45] transition-colors" style={{ ...serif, color: c.text }}>{d.title}</h3>
                <p className="text-[0.82rem] leading-[1.7] flex-1 mb-5" style={{ ...serif, color: c.muted }}>{d.desc}</p>
                <span className="text-[0.58rem] uppercase tracking-[0.18em] group-hover:text-[#C49A45] transition-colors" style={{ ...sans, color: c.muted }}>
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
              <p className="text-[1.1rem] leading-[1.85] font-light" style={{ ...serif, color: c.bodyText }}>
                Since inception, Thayer has deployed capital across three dedicated travel technology funds,
                building a portfolio that spans the entire travel ecosystem from hospitality and aviation to
                entertainment and real estate technology.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {funds.map((f, i) => (
                <div key={i} className="border p-6 grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 md:gap-8" style={{ borderColor: c.rule }}>
                  <span className="text-[1.1rem] font-light italic" style={{ ...serif, color: c.text }}>{f.name}</span>
                  <span className="text-[1rem] font-light" style={{ ...serif, color: c.accent }}>{f.size}</span>
                  <span className="text-[0.55rem] uppercase tracking-[0.16em]" style={{ ...sans, color: c.muted }}>{f.vintage}</span>
                  <span
                    className="text-[0.5rem] uppercase tracking-[0.16em] px-3 py-1 border"
                    style={{
                      ...sans,
                      color: f.status === "Deploying" ? c.accent : c.muted,
                      borderColor: f.status === "Deploying" ? "rgba(196,154,69,0.3)" : "rgba(122,117,104,0.3)",
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
          <div className="border p-12 md:p-16 flex flex-col items-center justify-center min-h-[300px]" style={{ borderColor: c.rule }}>
            <span className="text-[0.62rem] uppercase tracking-[0.22em] mb-4" style={{ ...sans, color: c.muted }}>NASDAQ Travel Index</span>
            <div className="w-full max-w-2xl h-48 border flex items-center justify-center" style={{ backgroundColor: c.surface, borderColor: c.rule }}>
              <span className="text-[0.55rem] uppercase tracking-[0.2em]" style={{ ...sans, color: c.muted, opacity: 0.4 }}>Market Widget Placeholder</span>
            </div>
            <span className="text-[0.55rem] uppercase tracking-[0.16em] mt-4" style={{ ...sans, color: c.muted, opacity: 0.5 }}>Data delayed 15 minutes. Source: NASDAQ</span>
          </div>
        </div>
      </section>

      {/* ── Contact (04) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500" style={{ backgroundColor: c.surface }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Contact" number="04" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="border p-8 md:p-10" style={{ borderColor: c.rule }}>
              <span className="text-[0.58rem] uppercase tracking-[0.22em] block mb-5" style={{ ...sans, color: c.accent }}>LP Inquiries</span>
              <h3 className="text-[1.3rem] font-light italic mb-4" style={{ ...serif, color: c.text }}>Limited Partner Relations</h3>
              <p className="text-[0.92rem] leading-[1.8] mb-6" style={{ ...serif, color: c.bodyText }}>
                For existing limited partners with questions about fund performance, capital calls,
                or distributions, please contact our investor relations team.
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-[0.68rem] tracking-[0.05em]" style={{ ...sans, color: c.muted }}>ir@thayerinvest.com</span>
                <span className="text-[0.68rem] tracking-[0.05em]" style={{ ...sans, color: c.muted }}>+1 (415) 555-0180</span>
              </div>
            </div>
            <div className="border p-8 md:p-10" style={{ borderColor: c.rule }}>
              <span className="text-[0.58rem] uppercase tracking-[0.22em] block mb-5" style={{ ...sans, color: c.accent }}>Fund Administration</span>
              <h3 className="text-[1.3rem] font-light italic mb-4" style={{ ...serif, color: c.text }}>Operations & Compliance</h3>
              <p className="text-[0.92rem] leading-[1.8] mb-6" style={{ ...serif, color: c.bodyText }}>
                For questions related to fund administration, tax documents,
                or compliance matters, please contact our operations team.
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-[0.68rem] tracking-[0.05em]" style={{ ...sans, color: c.muted }}>ops@thayerinvest.com</span>
                <span className="text-[0.68rem] tracking-[0.05em]" style={{ ...sans, color: c.muted }}>+1 (415) 555-0181</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
