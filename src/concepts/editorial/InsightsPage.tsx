"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { EditorialNav, EditorialFooter, CloudBackground, SectionHeader, useHeadlineArrow, Reveal } from "./HomePage";
import { InlineArticle, CopyLinkIcon } from "./InlineArticle";
import { useNavigationOverlay } from "./NavigationOverlay";
import { useEditorialMode, ec } from "./EditorialModeContext";
import type { Article } from "@/lib/article-types";
import { formatDate } from "@/lib/article-types";

// Expandable summary card for the 4th article. Whole card area click-toggles
// the expanded state; once expanded, the full InlineArticle replaces the card.
// Headline + copy-link icon stopPropagation so they don't trigger expand.
function ExpandableArticle({ article }: { article: Article }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return <InlineArticle article={article} animateIn />;
  }

  return (
    <section className="px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setExpanded(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setExpanded(true);
            }
          }}
          aria-expanded={false}
          className="group grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] gap-5 md:gap-10 py-8 border-t border-b transition-colors items-start cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ borderColor: c.rule, outlineColor: c.accent }}
        >
          <div className="aspect-[4/3] border overflow-hidden relative" style={{ borderColor: c.rule, backgroundColor: c.surface }}>
            {article.heroImage && (
              <img
                src={article.heroImage}
                alt={article.heroImageAlt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            )}
          </div>
          <div>
            <span className="text-[0.65rem] uppercase tracking-[0.2em] inline-flex items-center gap-3 mb-3" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
              <span>{formatDate(article.date)} &middot; {article.category}</span>
              <CopyLinkIcon slug={article.slug} />
            </span>
            <Link
              href={`/news/${article.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="block hover:text-[#2E9D55] transition-colors"
              style={{ color: c.text }}
            >
              <h3 className="text-[1.4rem] md:text-[1.75rem] leading-[1.2] font-normal italic mb-3" style={{ ...serif, fontWeight: c.headingWeight }}>
                {article.title}
              </h3>
            </Link>
            <p className="hidden md:block text-[1.05rem] md:text-[1.15rem] leading-[1.7] mb-4" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>{article.subhead}</p>
            <span className="text-[0.72rem] uppercase tracking-[0.18em] group-hover:text-[#2E9D55] transition-colors inline-flex items-center gap-2" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>
              Expand Article &darr;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EditorialInsightsPage({ articles }: { articles: Article[] }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };
  const { ref: heroArrowRef, arrow: heroArrow } = useHeadlineArrow<HTMLSpanElement>({ playOnce: true });
  const navOverlay = useNavigationOverlay();

  const featured = articles[0];
  const inlineArticles = articles.slice(0, 3);
  const expandable = articles[3];
  const rest = articles.slice(4);

  const heroSectionRef = useRef<HTMLElement>(null);
  // Scroll-down anchor at the bottom of the hero — fades in 1.5s after mount,
  // dismisses permanently once the user scrolls past the hero.
  const [anchorVisible, setAnchorVisible] = useState(false);
  const [anchorDismissed, setAnchorDismissed] = useState(false);
  useEffect(() => {
    if (anchorDismissed) return;
    const t = setTimeout(() => setAnchorVisible(true), 1500);
    return () => clearTimeout(t);
  }, [anchorDismissed]);
  useEffect(() => {
    if (anchorDismissed) return;
    const onScroll = () => {
      if (!heroSectionRef.current) return;
      const rect = heroSectionRef.current.getBoundingClientRect();
      if (rect.bottom < window.innerHeight * 0.5) {
        setAnchorVisible(false);
        setAnchorDismissed(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [anchorDismissed]);

  const scrollToFeatured = () => {
    if (!featured) return;
    const target = document.getElementById(`article-${featured.slug}`);
    if (!target) return;
    const navHeight = window.innerWidth >= 768 ? 105 : 89;
    const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight;
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 4) return;
    // Custom rAF scroll — explicitly eased over a fixed duration so the motion
    // is smoother and more deliberate than the browser's default smooth scroll.
    const duration = 850;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 0.5 - 0.5 * Math.cos(progress * Math.PI);
      window.scrollTo(0, startY + distance * ease);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="relative isolate min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <CloudBackground />
      <EditorialNav active="insights" />

      {/* ── Hero (intro + featured) ── */}
      <section ref={heroSectionRef} className="relative px-6 md:px-12 py-24 md:min-h-[calc(100vh-105px)] flex flex-col md:justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-12 md:gap-16 md:min-h-[36rem]">
          <div className="md:flex-1" style={navOverlay?.dimStyle}>
            <span ref={heroArrowRef} className="relative text-[0.72rem] uppercase tracking-[0.22em] block mb-8" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
              {heroArrow}
              Insights
            </span>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.08] font-normal italic mb-8" style={{ ...serif, color: c.text }}>
              Perspectives on the future of travel &amp; technology.
            </h1>
            <p className="text-[1.15rem] leading-[1.7]" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
              News, research, and commentary from Thayer Investment Partners and our portfolio companies.
            </p>
          </div>

          {featured && (
            // Hidden on mobile: the first article is inlined immediately below the
            // hero, so on small screens the user scrolls straight into it without
            // needing the featured-card shortcut.
            <div className="hidden md:block md:flex-1">
              <div
                role="button"
                tabIndex={0}
                onClick={scrollToFeatured}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    scrollToFeatured();
                  }
                }}
                aria-label={`Scroll to ${featured.title}`}
                className="group flex flex-col gap-4 border p-8 md:p-10 w-full md:w-[min(34rem,100%)] md:ml-auto md:h-[34rem] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: c.surface, borderColor: c.rule, outlineColor: c.accent }}
              >
                <span className="text-[0.65rem] uppercase tracking-[0.2em] inline-flex items-center gap-3" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
                  <span>Latest &middot; {formatDate(featured.date)} &middot; {featured.category}</span>
                  <CopyLinkIcon slug={featured.slug} />
                </span>
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
                <div className="mt-auto">
                  <h2 className="text-[clamp(1.65rem,2.4vw,2rem)] leading-[1.2] font-normal italic mb-4 group-hover:text-[#2E9D55] transition-colors" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>
                    {featured.title}
                  </h2>
                  <p className="text-[1.05rem] leading-[1.7] mb-5" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
                    {featured.subhead}
                  </p>
                  <span className="text-[0.72rem] uppercase tracking-[0.18em] group-hover:text-[#2E9D55] transition-colors" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>
                    Read Article &darr;
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scroll cue to the first inlined article */}
        {featured && (
          <a
            href={`#article-${featured.slug}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToFeatured();
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              opacity: anchorVisible ? 1 : 0,
              pointerEvents: anchorVisible ? "auto" : "none",
              transition: "opacity 600ms ease-out",
              outlineColor: c.accent,
            }}
            aria-label="Scroll to articles"
          >
            <span className="text-[0.72rem] uppercase tracking-[0.22em] transition-colors group-hover:text-[#2E9D55]" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
              Recent Articles
            </span>
            <span
              className="text-[1.2rem] leading-none group-hover:text-[#2E9D55]"
              style={{
                color: c.accentText,
                transform: anchorVisible ? "translateY(0)" : "translateY(-14px)",
                transition: "transform 1200ms ease-out, color 200ms ease-out",
              }}
              aria-hidden
            >
              &darr;
            </span>
          </a>
        )}
      </section>

      {/* ── Inlined articles ── */}
      {inlineArticles.map((a) => (
        <Reveal key={a.slug}>
          <InlineArticle article={a} />
        </Reveal>
      ))}

      {/* ── Expandable 4th article ── */}
      {expandable && <ExpandableArticle article={expandable} />}

      {/* ── Any further articles: summary list (no inlining) ── */}
      {rest.length > 0 && (
        <section className="px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <SectionHeader label="More Articles" number="02" />
            <Reveal className="flex flex-col">
              {rest.map((a) => (
                <div key={a.slug} className="grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] gap-5 md:gap-10 py-8 border-b items-start" style={{ borderColor: c.rule }}>
                  <Link href={`/news/${a.slug}`} className="aspect-[4/3] border overflow-hidden relative group" style={{ borderColor: c.rule, backgroundColor: c.surface }}>
                    {a.heroImage && (
                      <img src={a.heroImage} alt={a.heroImageAlt} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    )}
                  </Link>
                  <div>
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] inline-flex items-center gap-3 mb-3" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
                      <span>{formatDate(a.date)} &middot; {a.category}</span>
                      <CopyLinkIcon slug={a.slug} />
                    </span>
                    <Link href={`/news/${a.slug}`} className="block hover:text-[#2E9D55] transition-colors" style={{ color: c.text }}>
                      <h3 className="text-[1.4rem] md:text-[1.75rem] leading-[1.2] font-normal italic mb-3" style={{ ...serif, fontWeight: c.headingWeight }}>
                        {a.title}
                      </h3>
                    </Link>
                    <p className="hidden md:block text-[1.05rem] md:text-[1.15rem] leading-[1.7]" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>{a.subhead}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <EditorialFooter />
    </div>
  );
}
