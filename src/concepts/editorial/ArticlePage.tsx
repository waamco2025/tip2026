"use client";

import React from "react";
import Link from "next/link";
import { EditorialNav, EditorialFooter, ArticleListItem, CloudBackground } from "./HomePage";
import { InlineArticle } from "./InlineArticle";
import { useEditorialMode, ec } from "./EditorialModeContext";
import type { Article } from "@/lib/article-types";

type Props = {
  article: Article;
  prev: Pick<Article, "slug" | "title"> | null;
  next: Pick<Article, "slug" | "title"> | null;
  related: Article[];
};

export default function EditorialArticlePage({ article, prev, next, related }: Props) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };

  return (
    <div className="relative isolate min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <CloudBackground />
      <EditorialNav active="insights" />

      <InlineArticle article={article} linkHeadline={false} />

      {/* ── Related Articles ── */}
      {related.length > 0 && (
        <section className="px-6 md:px-12 py-16 md:py-20 border-t" style={{ borderColor: c.rule }}>
          <div className="max-w-5xl mx-auto">
            <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-10" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>Related Articles</span>
            <div className="flex flex-col">
              {related.map((r) => (
                <ArticleListItem key={r.slug} article={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Article Navigation ── */}
      {(prev || next) && (
        <section className="px-6 md:px-12 py-12 md:py-16 border-t" style={{ borderColor: c.rule }}>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {prev ? (
              <Link href={`/news/${prev.slug}`} className="group flex items-center gap-4 hover:opacity-80 transition-colors" style={{ color: c.muted }}>
                <span>&larr;</span>
                <div>
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] block mb-1" style={{ ...sans, fontWeight: c.sansWeight }}>Previous</span>
                  <span className="text-[1rem] font-light italic" style={{ ...serif, fontWeight: c.headingWeight }}>{prev.title}</span>
                </div>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/news/${next.slug}`} className="group flex items-center gap-4 hover:opacity-80 transition-colors text-right" style={{ color: c.muted }}>
                <div>
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] block mb-1" style={{ ...sans, fontWeight: c.sansWeight }}>Next</span>
                  <span className="text-[1rem] font-light italic" style={{ ...serif, fontWeight: c.headingWeight }}>{next.title}</span>
                </div>
                <span>&rarr;</span>
              </Link>
            ) : <span />}
          </div>
        </section>
      )}

      <EditorialFooter />
    </div>
  );
}
