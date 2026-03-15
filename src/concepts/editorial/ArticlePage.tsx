"use client";

import React from "react";
import Link from "next/link";
import { EditorialNav, EditorialFooter } from "./HomePage";

export default function EditorialArticlePage() {
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };

  const stats = [
    { value: "$45M", label: "Series B" },
    { value: "14", label: "Markets" },
    { value: "2.4M", label: "Users" },
  ];

  const related = [
    { date: "Feb 18, 2026", title: "Portfolio Company StaySync Closes $28M Series A" },
    { date: "Jan 22, 2026", title: "Thayer Fund III Announces Final Close at $150M" },
    { date: "Jan 10, 2026", title: "2026 Travel Technology Outlook: Five Themes to Watch" },
  ];

  return (
    <div className="bg-[#0C0C0A] text-[#EAE5DB] min-h-screen">
      <EditorialNav active="insights" />

      {/* ── Article Hero ── */}
      <section className="px-6 md:px-12 py-24 md:py-40 border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_280px] gap-12 md:gap-20">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[#C49A45]" style={sans}>Investment</span>
              <div className="w-8 h-px bg-white/[0.12]" />
              <span className="text-[0.55rem] uppercase tracking-[0.18em] text-[#7A7568]" style={sans}>Mar 05, 2026</span>
            </div>
            <h1 className="text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.1] font-light italic mb-6" style={serif}>
              Thayer Leads $45M Series B in TravelAI Platform
            </h1>
            <p className="text-[1.1rem] leading-[1.85] font-light max-w-2xl" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
              The investment will accelerate TravelAI&rsquo;s expansion into 14 new markets and fund development of
              next-generation generative AI capabilities for the travel industry.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {stats.map((s, i) => (
              <div key={i} className="border border-white/[0.07] p-5 flex items-center justify-between">
                <span className="text-[1.6rem] font-light text-[#C49A45]" style={serif}>{s.value}</span>
                <span className="text-[0.55rem] uppercase tracking-[0.18em] text-[#7A7568]" style={sans}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Article Image ── */}
      <section className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-[21/9] bg-[#141410] border border-white/[0.07] flex items-center justify-center">
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#7A7568]/40" style={sans}>Article Image</span>
          </div>
        </div>
      </section>

      {/* ── Article Body ── */}
      <section className="px-6 md:px-12 pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto">
          <p className="text-[1.1rem] leading-[1.85] font-light mb-8" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
            Thayer Investment Partners announced today that it has led a $45 million Series B investment in TravelAI,
            the leading generative AI platform for the global travel industry. The round included participation from
            existing investors and strategic partners across the hospitality ecosystem.
          </p>
          <p className="text-[1.1rem] leading-[1.85] font-light mb-8" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
            TravelAI has built a comprehensive AI platform that enables travel companies to deliver hyper-personalized
            experiences at scale. The platform serves over 2.4 million active users across 14 markets, processing
            billions of data points to generate real-time recommendations, dynamic pricing, and predictive analytics.
          </p>

          <blockquote className="border-l-2 border-[#C49A45] pl-8 my-12">
            <p className="text-[1.3rem] leading-[1.65] font-light italic" style={{ ...serif, color: "rgba(234,229,219,0.85)" }}>
              &ldquo;TravelAI represents a generational shift in how travel companies interact with their customers.
              The platform&rsquo;s ability to synthesize vast amounts of travel data into actionable, personalized
              experiences is truly transformative.&rdquo;
            </p>
            <cite className="block mt-4 not-italic text-[0.6rem] uppercase tracking-[0.18em] text-[#C49A45]" style={sans}>
              &mdash; Chris Hemmeter, Managing Partner, Thayer Investment Partners
            </cite>
          </blockquote>

          <p className="text-[1.1rem] leading-[1.85] font-light mb-8" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
            The Series B funding will be used to expand TravelAI&rsquo;s platform into 14 new international markets,
            with a focus on Europe and Asia-Pacific regions where demand for AI-powered travel personalization is
            growing rapidly. The company also plans to double its engineering team and invest heavily in its
            generative AI capabilities.
          </p>
          <p className="text-[1.1rem] leading-[1.85] font-light mb-8" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
            Founded in 2021, TravelAI has quickly established itself as the category leader in AI-powered travel
            technology. The company&rsquo;s platform integrates with major hotel chains, airlines, and online travel
            agencies, providing a unified AI layer that improves conversion rates, guest satisfaction, and
            operational efficiency.
          </p>
          <p className="text-[1.1rem] leading-[1.85] font-light mb-8" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
            The investment underscores Thayer&rsquo;s continued commitment to identifying and backing the most
            innovative companies in the travel technology ecosystem. With Fund III now actively deploying capital,
            the firm is positioned to lead additional rounds in companies that are leveraging artificial intelligence,
            machine learning, and data analytics to transform the $15 trillion global travel industry.
          </p>

          <blockquote className="border-l-2 border-[#C49A45] pl-8 my-12">
            <p className="text-[1.3rem] leading-[1.65] font-light italic" style={{ ...serif, color: "rgba(234,229,219,0.85)" }}>
              &ldquo;Having Thayer as our lead investor gives us access to the deepest network in travel technology.
              Their team understands our market better than any other venture firm, and their operational support
              has been instrumental in our growth.&rdquo;
            </p>
            <cite className="block mt-4 not-italic text-[0.6rem] uppercase tracking-[0.18em] text-[#C49A45]" style={sans}>
              &mdash; CEO, TravelAI
            </cite>
          </blockquote>

          <p className="text-[1.1rem] leading-[1.85] font-light" style={{ ...serif, color: "rgba(234,229,219,0.72)" }}>
            TravelAI is the latest in a series of investments by Thayer in the AI and machine learning space
            within travel. The firm&rsquo;s portfolio includes several other companies leveraging advanced
            technology to improve efficiency and guest experiences across hotels, airlines, and experiences
            marketplaces. As the travel industry continues its post-pandemic recovery and acceleration,
            Thayer believes that AI-native companies will capture a disproportionate share of value creation.
          </p>
        </div>
      </section>

      {/* ── Related Articles ── */}
      <section className="px-6 md:px-12 py-16 md:py-20 border-t border-white/[0.07]">
        <div className="max-w-5xl mx-auto">
          <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#C49A45] block mb-10" style={sans}>Related Articles</span>
          <div className="flex flex-col">
            {related.map((r, i) => (
              <Link
                key={i}
                href="/concepts/editorial/article"
                className="group flex items-center gap-6 md:gap-10 py-5 border-b border-white/[0.07] hover:border-[#C49A45]/30 transition-colors"
              >
                <span className="text-[0.58rem] uppercase tracking-[0.16em] text-[#7A7568] shrink-0 w-24" style={sans}>{r.date}</span>
                <span className="text-[1.1rem] md:text-[1.25rem] font-light italic flex-1 group-hover:text-[#C49A45] transition-colors" style={serif}>{r.title}</span>
                <span className="text-[#7A7568] group-hover:text-[#C49A45] transition-colors shrink-0">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Article Navigation ── */}
      <section className="px-6 md:px-12 py-12 md:py-16 border-t border-white/[0.07]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link href="/concepts/editorial/insights" className="group flex items-center gap-4 text-[#7A7568] hover:text-[#C49A45] transition-colors">
            <span>&larr;</span>
            <div>
              <span className="text-[0.55rem] uppercase tracking-[0.18em] block mb-1" style={sans}>Previous</span>
              <span className="text-[1rem] font-light italic" style={serif}>Portfolio Company StaySync Closes $28M Series A</span>
            </div>
          </Link>
          <Link href="/concepts/editorial/insights" className="group flex items-center gap-4 text-[#7A7568] hover:text-[#C49A45] transition-colors text-right">
            <div>
              <span className="text-[0.55rem] uppercase tracking-[0.18em] block mb-1" style={sans}>Next</span>
              <span className="text-[1rem] font-light italic" style={serif}>Thayer Fund III Announces Final Close at $150M</span>
            </div>
            <span>&rarr;</span>
          </Link>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
