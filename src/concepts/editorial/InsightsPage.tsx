"use client";

import React from "react";
import Link from "next/link";
import { EditorialNav, EditorialFooter } from "./HomePage";
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
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <EditorialNav active="insights" />

      {/* ── Hero ── */}
      <section className="px-6 md:px-12 py-24 md:py-40">
        <div className="max-w-7xl mx-auto">
          <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>Insights</span>
          <h1 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.08] font-light italic mb-8 max-w-4xl" style={{ ...serif, color: c.text }}>
            Perspectives on the future of travel &amp; technology.
          </h1>
          <p className="text-[1.15rem] leading-[1.7] max-w-2xl" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
            News, research, and commentary from Thayer Investment Partners and our portfolio companies.
          </p>
        </div>
      </section>

      {/* ── Featured Article (01) ── */}
      {featured && (
        <section className="px-6 md:px-12 py-24 md:py-32 border-t" style={{ borderColor: c.rule }}>
          <div className="max-w-7xl mx-auto">
            <SectionHeader label="Featured" number="01" />
            <Link href={`/news/${featured.slug}`} className="group grid md:grid-cols-2 gap-8 md:gap-16">
              <div
                className="aspect-[4/3] border flex items-end p-6 group-hover:border-[#C49A45]/30 transition-colors overflow-hidden relative"
                style={{ backgroundColor: c.surface, borderColor: c.rule }}
              >
                {featured.heroImage ? (
                  <img
                    src={featured.heroImage}
                    alt={featured.heroImageAlt}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <span className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>Featured Image</span>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] block mb-4" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>{formatDate(featured.date)} &middot; {featured.category}</span>
                <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.15] font-light italic mb-6 group-hover:text-[#C49A45] transition-colors" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>
                  {featured.title}
                </h2>
                <p className="text-[1.15rem] leading-[1.7] mb-8" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
                  {featured.subhead}
                </p>
                <span className="text-[0.72rem] uppercase tracking-[0.18em] group-hover:text-[#C49A45] transition-colors" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>
                  Read Article &rarr;
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── Recent Articles (02) ── */}
      {rest.length > 0 && (
        <section className="px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <SectionHeader label="Recent Articles" number="02" />
            <div className="flex flex-col">
              {rest.map((a) => (
                <Link
                  key={a.slug}
                  href={`/news/${a.slug}`}
                  className="group grid md:grid-cols-[140px_1fr] gap-4 md:gap-10 py-8 border-b transition-colors"
                  style={{ borderColor: c.rule }}
                >
                  <span className="text-[0.7rem] uppercase tracking-[0.16em] pt-1" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{formatDate(a.date)}</span>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>{a.category}</span>
                    </div>
                    <h3 className="text-[1.75rem] md:text-[1.5rem] font-light italic mb-3 group-hover:text-[#C49A45] transition-colors" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>
                      {a.title}
                    </h3>
                    <p className="text-[1.15rem] leading-[1.7]" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>{a.subhead}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <EditorialFooter />
    </div>
  );
}
