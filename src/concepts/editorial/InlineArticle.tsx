"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Link2 } from "lucide-react";
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
      <p className="text-[1.15rem] leading-[1.7] font-normal italic" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
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

// Small icon button placed next to article dates. On hover shows a tooltip
// ("Copy link to article"); on click copies the dedicated article URL to the
// clipboard and swaps the tooltip text to "Copied to Clipboard" for ~2s.
// stopPropagation on the click so this works inside ancestor click handlers
// (e.g., the hero card and the expandable summary).
export function CopyLinkIcon({ slug }: { slug: string }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const sans = { fontFamily: "'Syne', sans-serif" };
  const [copied, setCopied] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const url = `${window.location.origin}/news/${slug}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  };

  return (
    <span className="relative inline-flex items-center group/copy">
      <button
        type="button"
        onClick={handleClick}
        onMouseLeave={() => { if (copied) setCopied(false); }}
        aria-label="Copy link to article"
        className="inline-flex items-center hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
        style={{ outlineColor: c.accent }}
      >
        <Link2 className="w-3.5 h-3.5" style={{ color: c.muted }} aria-hidden />
      </button>
      <span
        role="tooltip"
        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2.5 py-1.5 text-[0.55rem] uppercase tracking-[0.14em] opacity-0 group-hover/copy:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border z-50"
        style={{ ...sans, color: c.text, backgroundColor: c.surface, borderColor: c.rule, fontWeight: c.sansWeight }}
      >
        {copied ? "Copied to Clipboard" : "Copy link to article"}
      </span>
    </span>
  );
}

// Renders an article's hero block + lead image + body, without the page-level
// chrome (nav/footer/related/prev-next). Used by ArticlePage (the dedicated
// page) and by InsightsPage (multiple stacked inline). Headline is wrapped in
// a Link to the dedicated page so the URL stays shareable. The hero block has
// no border-bottom — the image flows directly under it.
export function InlineArticle({ article, linkHeadline = true }: { article: Article; linkHeadline?: boolean }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };

  const headline = (
    <h2 className="text-[clamp(2.5rem,4.5vw,3.8rem)] leading-[1.1] font-normal italic mb-6 transition-colors" style={{ ...serif, color: c.text }}>
      {article.title}
    </h2>
  );

  return (
    <article id={`article-${article.slug}`} className="scroll-mt-[89px] md:scroll-mt-[105px]">
      <section className="px-6 md:px-12 pt-24 md:pt-40 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_280px] gap-12 md:gap-20">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>{article.category}</span>
              <div className="w-8 h-px" style={{ backgroundColor: c.rule }} />
              <span className="text-[0.65rem] uppercase tracking-[0.18em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{formatDate(article.date)}</span>
              <CopyLinkIcon slug={article.slug} />
            </div>
            {linkHeadline ? (
              <Link href={`/news/${article.slug}`} className="block group/headline hover:text-[#2E9D55] transition-colors" onClick={(e) => e.stopPropagation()} style={{ color: c.text }}>
                {headline}
              </Link>
            ) : (
              headline
            )}
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

      {article.heroImage && (
        <section className="px-6 md:px-12 py-16 md:py-20" style={{ paddingTop: 0 }}>
          <div className="max-w-5xl mx-auto">
            <img src={article.heroImage} alt={article.heroImageAlt} className="block w-full h-auto border" style={{ borderColor: c.rule }} />
          </div>
        </section>
      )}

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
    </article>
  );
}
