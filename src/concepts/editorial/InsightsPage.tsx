"use client";

import React from "react";
import Link from "next/link";
import { EditorialNav, EditorialFooter, ArticleListItem, CloudBackground } from "./HomePage";
import { useEditorialMode, ec } from "./EditorialModeContext";
import type { Article } from "@/lib/article-types";
import { formatDate } from "@/lib/article-types";

function SectionHeader({ label, number }: { label: string; number: string }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  return (
    <div className="flex items-center gap-6 mb-16 md:mb-20">
      <span className="text-[0.72rem] uppercase tracking-[0.22em] shrink-0" style={{ fontFamily: "'Syne', sans-serif", color: c.accentText, fontWeight: c.sansWeight }}>{label}</span>
      <div className="flex-1 h-px" style={{ backgroundColor: c.rule }} />
      <span className="text-[0.72rem] uppercase tracking-[0.22em] shrink-0" style={{ fontFamily: "'Syne', sans-serif", color: c.muted, fontWeight: c.sansWeight }}>{number}</span>
    </div>
  );
}

export default function EditorialInsightsPage({ articles }: { articles: Article[] }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="relative isolate min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <CloudBackground />
      <EditorialNav active="insights" />

      {/* ── Hero (intro + featured) ── */}
      <section className="px-6 md:px-12 py-24 md:py-0 md:min-h-[600px] flex flex-col">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-12 md:gap-16 flex-1">
          <div className="md:flex-1 md:pt-24">
            <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>Insights</span>
            <h1 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.08] font-light italic mb-8" style={{ ...serif, color: c.text }}>
              Perspectives on the future of travel &amp; technology.
            </h1>
            <p className="text-[1.15rem] leading-[1.7] max-w-xl" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
              News, research, and commentary from Thayer Investment Partners and our portfolio companies.
            </p>
          </div>

          {featured && (
            <div className="md:flex-1 md:flex md:items-center">
            <Link href={`/news/${featured.slug}`} className="group flex flex-col gap-4 border p-6 md:p-8 w-full" style={{ backgroundColor: c.surface, borderColor: c.rule }}>
              <span className="text-[0.65rem] uppercase tracking-[0.2em] block" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>Latest &middot; {formatDate(featured.date)} &middot; {featured.category}</span>
              <div
                className="aspect-[5/3] md:aspect-auto md:h-[210px] border overflow-hidden relative"
                style={{ backgroundColor: c.bg, borderColor: c.rule }}
              >
                {featured.heroImage ? (
                  <img
                    src={featured.heroImage}
                    alt={featured.heroImageAlt}
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <span className="absolute bottom-6 left-6 text-[0.65rem] uppercase tracking-[0.2em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>Featured Image</span>
                )}
              </div>
              <div>
                <h2 className="text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.2] font-light italic mb-4 group-hover:text-[#2E9D55] transition-colors" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>
                  {featured.title}
                </h2>
                <p className="text-[1.05rem] leading-[1.7] mb-5" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
                  {featured.subhead}
                </p>
                <span className="text-[0.72rem] uppercase tracking-[0.18em] group-hover:text-[#2E9D55] transition-colors" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>
                  Read Article &rarr;
                </span>
              </div>
            </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Recent Articles (01) ── */}
      {rest.length > 0 && (
        <section className="px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <SectionHeader label="Recent Articles" number="01" />
            <div className="flex flex-col">
              {rest.map((a) => (
                <ArticleListItem key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <EditorialFooter />
    </div>
  );
}
