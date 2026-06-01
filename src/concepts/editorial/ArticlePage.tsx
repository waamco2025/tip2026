"use client";

import React from "react";
import Link from "next/link";
import { EditorialNav, EditorialFooter, ArticleListItem, CloudBackground, SectionHeader } from "./HomePage";
import { useEditorialMode, ec } from "./EditorialModeContext";
import type { Article, ArticleBlock, InlineSpan } from "@/lib/article-types";
import { formatDate } from "@/lib/article-types";

function InlineText({ spans }: { spans: InlineSpan[] }) {
  return (
    <>
      {spans.map((s, i) => (s.italic ? <em key={i}>{s.text}</em> : <React.Fragment key={i}>{s.text}</React.Fragment>))}
    </>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const sans = { fontFamily: "'Syne', sans-serif" };

  if (block.type === "paragraph") {
    return (
      <p className="text-[1.15rem] leading-[1.7] mb-8" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
        <InlineText spans={block.spans} />
      </p>
    );
  }
  return (
    <blockquote className="border-l-2 pl-8 my-12" style={{ borderColor: c.accent }}>
      <p className="text-[1.15rem] leading-[1.7] font-light italic" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
        &ldquo;<InlineText spans={block.spans} />&rdquo;
      </p>
      {block.attribution && (
        <cite className="block mt-4 not-italic text-[0.7rem] uppercase tracking-[0.18em]" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
          &mdash; {block.attribution}
        </cite>
      )}
    </blockquote>
  );
}

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

      {/* ── Article Hero ── */}
      <section className="px-6 md:px-12 py-24 md:py-40 border-b" style={{ borderColor: c.rule }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_280px] gap-12 md:gap-20">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>{article.category}</span>
              <div className="w-8 h-px" style={{ backgroundColor: c.rule }} />
              <span className="text-[0.65rem] uppercase tracking-[0.18em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{formatDate(article.date)}</span>
            </div>
            <h1 className="text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.1] font-light italic mb-6" style={{ ...serif, color: c.text }}>
              {article.title}
            </h1>
            <p className="text-[1.15rem] leading-[1.7] max-w-2xl" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
              {article.subhead}
            </p>
          </div>
          {article.keyFigures.length > 0 && (
            <div className="flex flex-col gap-4">
              {article.keyFigures.map((s, i) => (
                <div key={i} className="border p-5 flex items-center justify-between" style={{ borderColor: c.rule }}>
                  <span className="text-[1.6rem] font-light" style={{ ...serif, color: c.accent, fontWeight: c.statWeight }}>{s.value}</span>
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-right" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Article Image ── */}
      {article.heroImage && (
        <section className="px-6 md:px-12 py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <img src={article.heroImage} alt={article.heroImageAlt} className="block w-full h-auto border" style={{ borderColor: c.rule }} />
          </div>
        </section>
      )}

      {/* ── Article Body ── */}
      <section className="px-6 md:px-12 pb-16 md:pb-20" style={{ paddingTop: article.heroImage ? 0 : undefined }}>
        <div className="max-w-3xl mx-auto">
          {article.blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
          {article.sourceUrl && (
            <p className="mt-12 pt-6 border-t text-[0.7rem] uppercase tracking-[0.16em]" style={{ borderColor: c.rule, ...sans, color: c.muted, fontWeight: c.sansWeight }}>
              Source &middot;{" "}
              <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#2E9D55] transition-colors" style={{ color: c.accentText }}>
                {new URL(article.sourceUrl).hostname.replace(/^www\./, "")}
              </a>
            </p>
          )}
        </div>
      </section>

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
