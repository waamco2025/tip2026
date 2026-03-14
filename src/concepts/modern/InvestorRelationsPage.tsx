import Link from "next/link";
import { FileText, BookOpen, FileCheck } from "lucide-react";
import { ModernNav, ModernFooter } from "./AboutPage";
import { ModernStockWidgets } from "@/components/StockWidgets";

const documents = [
  { icon: FileText, title: "PFIC Statement", desc: "Annual Passive Foreign Investment Company statement for US tax reporting purposes.", link: "Download PDF →" },
  { icon: BookOpen, title: "Prospectus", desc: "Complete offering prospectus with detailed fund strategy, terms, and risk disclosures.", link: "View Prospectus →" },
  { icon: FileCheck, title: "SEC Form 8-K", desc: "Current report filing with the Securities and Exchange Commission for material events.", link: "View Filing →" },
];

export default function ModernInvestorRelations() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ModernNav active="Investor Relations" />

      {/* Split Hero */}
      <section className="flex flex-col md:flex-row h-auto md:h-[560px]">
        <div className="w-full md:w-[660px] shrink-0 flex flex-col justify-center gap-6 bg-[#0D2818] px-6 md:px-14 py-12 md:py-20 min-h-[400px] md:min-h-0">
          <span className="text-[#C9A962] font-semibold text-xs tracking-[2px]">INVESTOR RELATIONS</span>
          <h1 className="font-playfair text-[28px] md:text-[44px] text-white leading-[1.15] max-w-[460px]">Access documents, filings, and real-time market data.</h1>
          <p className="text-white/65 text-base leading-relaxed max-w-[420px]">Important information for current and prospective investors in Thayer Investment Partners.</p>
        </div>
        <div className="h-[300px] md:h-auto flex-1 bg-cover bg-center" style={{ backgroundImage: "url('/images/modern-ir-hero.png')" }} />
      </section>

      {/* Documents */}
      <section className="px-6 md:px-14 py-12 md:py-20 flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <h2 className="font-playfair text-[32px] text-[#111]">Documents & Filings</h2>
          <p className="text-[#666] text-base leading-relaxed max-w-[600px]">Access annual reports, SEC filings, and key investor documents for Thayer Investment Partners.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {documents.map((doc, i) => (
            <div key={i} className="flex-1 flex flex-col gap-5 p-8 border border-[#E5E5E5]">
              <doc.icon className="w-10 h-10 text-[#0D2818]" />
              <h3 className="font-playfair text-xl text-[#111]">{doc.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed">{doc.desc}</p>
              <span className="text-[#C9A962] text-[13px] font-medium cursor-pointer hover:underline">{doc.link}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-[#E5E5E5]" />

      {/* Market Data */}
      <section className="px-6 md:px-14 py-12 md:py-20 flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <h2 className="font-playfair text-[32px] text-[#111]">Market Data</h2>
          <p className="text-[#666] text-base leading-relaxed max-w-[500px]">Real-time NASDAQ performance data for Thayer Investment Partners securities.</p>
        </div>
        <ModernStockWidgets />
      </section>

      <ModernFooter />
    </div>
  );
}
