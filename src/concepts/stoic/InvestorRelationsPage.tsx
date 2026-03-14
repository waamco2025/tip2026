import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { StoicStockWidgets } from "@/components/StockWidgets";
import { FileText, BookOpen, FileCheck } from "lucide-react";

const documents = [
  {
    icon: FileText,
    title: "PFIC Statement",
    desc: "Annual Passive Foreign Investment Company statement for US tax reporting purposes.",
    link: "Download PDF →",
  },
  {
    icon: BookOpen,
    title: "Prospectus",
    desc: "Complete offering prospectus with detailed fund strategy, terms, and risk disclosures.",
    link: "View Prospectus →",
  },
  {
    icon: FileCheck,
    title: "SEC Form 8-K",
    desc: "Current report filing with the Securities and Exchange Commission for material events.",
    link: "View Filing →",
  },
];

export default function StoicInvestorRelations() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="flex flex-col items-center gap-4 px-6 md:px-14 py-12 md:py-20">
        <h1 className="font-playfair text-[32px] md:text-[52px]">Investor Relations</h1>
        <p className="text-thayer-text-secondary text-lg leading-[1.5] text-center max-w-full md:max-w-[700px]">
          Access important documents, SEC filings, and real-time market data for
          Thayer Investment Partners.
        </p>
        <div className="w-[60px] h-0.5 bg-thayer-gold" />
      </section>

      {/* Documents & Filings */}
      <section className="px-6 md:px-14 py-10 md:py-14 flex flex-col gap-8">
        <h2 className="font-playfair text-[22px] md:text-[28px]">Documents & Filings</h2>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {documents.map((doc, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-5 bg-thayer-surface border border-thayer-border p-8"
            >
              <doc.icon className="w-12 h-12 text-thayer-gold" />
              <h3 className="font-playfair text-xl text-center">{doc.title}</h3>
              <p className="text-thayer-text-secondary text-[13px] leading-[1.5] text-center">
                {doc.desc}
              </p>
              <span className="text-thayer-gold text-[13px] font-medium cursor-pointer hover:underline">
                {doc.link}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Market Data */}
      <section className="px-6 md:px-14 py-10 md:py-14 border-t border-thayer-border flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-playfair text-[22px] md:text-[28px]">Market Data</h2>
          <p className="text-thayer-text-secondary text-sm leading-[1.5]">
            Real-time NASDAQ performance data for Thayer Investment Partners
            securities.
          </p>
        </div>
        <StoicStockWidgets />
      </section>

      <Footer />
    </div>
  );
}
