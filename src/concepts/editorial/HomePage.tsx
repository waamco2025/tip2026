"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNavigationOverlay } from "./NavigationOverlay";
import { Building2, UtensilsCrossed, Globe, CreditCard, Wallet, ShieldCheck, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useEditorialMode, ec } from "./EditorialModeContext";
import type { Article } from "@/lib/article-types";
import { formatDate } from "@/lib/article-types";

/* ─── Mobile nav stagger timing ─── */
// Each menu item fades in character-by-character, and rows are themselves
// staggered, so the menu reads top-to-bottom, left-to-right. On close the same
// per-character delays are mirrored (maxDelay − openDelay) so it plays in reverse.
const NAV_CHAR_STEP = 22; // ms between characters within a row
const NAV_ROW_STEP = 70; // ms between rows

function NavStaggerLabel({ text, open, row, maxDelay }: { text: string; open: boolean; row: number; maxDelay: number }) {
  return (
    <>
      {[...text].map((ch, ci) => {
        const openDelay = row * NAV_ROW_STEP + ci * NAV_CHAR_STEP;
        const delay = open ? openDelay : Math.max(0, maxDelay - openDelay);
        return (
          <span
            key={ci}
            aria-hidden
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              opacity: open ? 1 : 0,
              transform: open ? "none" : "translateY(5px)",
              transition: `opacity 200ms ease-out ${delay}ms, transform 200ms ease-out ${delay}ms`,
            }}
          >
            {ch}
          </span>
        );
      })}
    </>
  );
}

/* ─── Shared Nav ─── */
export function EditorialNav({ active = "home" }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { light } = useEditorialMode();
  const c = ec(light);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // White link treatment only at md+ on the Home hero (where links overlay the dark carousel).
  // Desktop links are `hidden md:flex`, so this color never reaches mobile.
  const overlayMode = active === "home" && !scrolled;
  const links = [
    { label: "Home", href: "/", key: "home" },
    { label: "About", href: "/about", key: "about" },
    { label: "Portfolio", href: "/portfolio", key: "portfolio" },
    { label: "Insights", href: "/news", key: "insights" },
    { label: "Investor Relations", href: "https://services.dataexchange.fiscloudservices.com/LogOn/2350903", key: "ir", external: true },
  ];
  // Largest per-character open delay across all rows — used to mirror the
  // stagger on close so the menu animates out in reverse.
  const navMaxDelay =
    (links.length - 1) * NAV_ROW_STEP +
    (Math.max(...links.map((l) => l.label.length)) - 1) * NAV_CHAR_STEP;
  const linkCls = (k: string) =>
    `transition-colors duration-300 ${active === k ? "" : "hover:opacity-80"}`;
  const desktopLinkColor = (isActive: boolean) =>
    overlayMode
      ? (isActive ? "#ffffff" : "rgba(255,255,255,0.75)")
      : (isActive ? c.text : c.muted);

  return (
    <nav
      className="sticky top-0 z-50 border-b transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? c.bg : "transparent",
        borderColor: scrolled ? c.rule : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-0 py-5 md:py-6 flex items-center justify-between">
        <Link href="/">
          <img src={c.logo} alt="Thayer" className="h-12 md:h-14" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8" style={{ fontFamily: "'Syne', sans-serif" }}>
          {links.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className={`text-[0.78rem] uppercase tracking-[0.14em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${linkCls(l.key)}`}
              style={{ color: desktopLinkColor(active === l.key), fontWeight: c.sansWeight, outlineColor: c.accent }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger / close — three bars that morph into an X. The
            top/bottom bars rotate ±45° and converge to the centre while the
            middle bar fades out, giving a smooth hamburger↔X transition. The
            6×6 button keeps the right edge flush with the wrapper's px-6
            boundary, mirroring the logo's left edge. */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setOpen(!open)}
            className="w-6 h-6 relative flex items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {[-6, 0, 6].map((y, i) => (
              <span
                key={i}
                className="absolute left-0 h-[2px] w-6 rounded-full"
                style={{
                  backgroundColor: c.hamburger,
                  transition: "transform 300ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease-out",
                  transform: open
                    ? i === 1
                      ? "scaleX(0)"
                      : `rotate(${i === 0 ? 45 : -45}deg)`
                    : `translateY(${y}px)`,
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu — always mounted so the close animation can play (in
          reverse). The box height animates via the grid 0fr↔1fr trick (smooth to
          the exact content height), and each item's characters stagger in. */}
      <div
        id="mobile-menu"
        className="absolute top-full left-0 w-full md:hidden grid"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          transition: "grid-template-rows 420ms cubic-bezier(0.4,0,0.2,1), opacity 280ms ease-out",
        }}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <div
            className="border-b flex flex-col gap-6 px-6 py-8 transition-colors duration-500"
            style={{ backgroundColor: c.bg, borderColor: c.rule, fontFamily: "'Syne', sans-serif" }}
          >
            {links.map((l, r) => (
              <Link
                key={l.key}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                aria-label={l.label}
                tabIndex={open ? 0 : -1}
                className={`text-[0.72rem] uppercase tracking-[0.14em] w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${linkCls(l.key)}`}
                style={{ color: active === l.key ? c.text : c.muted, fontWeight: c.sansWeight, outlineColor: c.accent }}
                onClick={() => setOpen(false)}
              >
                <NavStaggerLabel text={l.label} open={open} row={r} maxDelay={navMaxDelay} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ─── "Above the Clouds" — fixed halftone cloud background ─── */
// Procedural: two SVG turbulence noise fields composited with two halftone dot
// patterns (larger dots for cloud bodies, smaller dots for wisps). The whole
// element is fixed to the viewport bottom and CSS-masked into a vertical fade,
// so clouds appear to dissipate upward as the user rises through the page.
export function CloudBackground() {
  const { light } = useEditorialMode();
  const c = ec(light);

  // PROTOTYPE (opt-in via ?cloudanim=1): a one-shot 5s intro that animates the
  // feTurbulence generator so the clouds build in, billow, and morph, then
  // FREEZES to the exact static look — so the expensive turbulence recompute is
  // bounded to those 5 seconds with zero ongoing cost. Off by default; the live
  // site is unchanged unless the flag is present. Honors prefers-reduced-motion.
  const wrapRef = useRef<HTMLDivElement>(null);
  const softTurbRef = useRef<SVGFETurbulenceElement>(null);
  const softMatRef = useRef<SVGFEColorMatrixElement>(null);
  const detTurbRef = useRef<SVGFETurbulenceElement>(null);
  const detMatRef = useRef<SVGFEColorMatrixElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!new URLSearchParams(window.location.search).has("cloudanim")) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const wrap = wrapRef.current;
    const sT = softTurbRef.current, sM = softMatRef.current;
    const dT = detTurbRef.current, dM = detMatRef.current;
    if (!wrap || !sT || !sM || !dT || !dM) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const mat = (mult: number, off: number) =>
      `0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 ${mult} 0 0 0 ${off.toFixed(3)}`;
    const DUR = 5000;
    let startT: number | null = null;
    let raf = 0;
    const step = (now: number) => {
      if (startT === null) startT = now;
      const t = Math.min((now - startT) / DUR, 1);
      const e = 1 - Math.pow(1 - t, 3); // easeOutCubic — settles into the final state
      const decay = 1 - t; // morph wobble fades out as it settles
      // Cloud bodies: start finer + sparser, expand/soften into the target.
      sT.setAttribute("baseFrequency",
        `${(lerp(0.009, 0.005, e) + Math.sin(t * Math.PI * 4) * 0.0012 * decay).toFixed(5)} ${(lerp(0.020, 0.012, e) + Math.sin(t * Math.PI * 4 + 1) * 0.0020 * decay).toFixed(5)}`);
      sM.setAttribute("values", mat(4, lerp(-3.0, -1.6, e)));
      // Wisps: faster morph for a livelier edge.
      dT.setAttribute("baseFrequency",
        `${(lerp(0.030, 0.018, e) + Math.sin(t * Math.PI * 5) * 0.0030 * decay).toFixed(5)} ${(lerp(0.055, 0.035, e) + Math.sin(t * Math.PI * 5 + 1) * 0.0040 * decay).toFixed(5)}`);
      dM.setAttribute("values", mat(5, lerp(-3.8, -2.2, e)));
      wrap.style.opacity = String(Math.min(t / 0.4, 1)); // build in over first ~2s
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        // Freeze to the canonical static values (identical to the default look).
        sT.setAttribute("baseFrequency", "0.005 0.012");
        sM.setAttribute("values", mat(4, -1.6));
        dT.setAttribute("baseFrequency", "0.018 0.035");
        dM.setAttribute("values", mat(5, -2.2));
        wrap.style.opacity = "1";
      }
    };
    wrap.style.opacity = "0";
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 h-[21vh] md:h-[30vh] -z-10"
      style={{
        WebkitMaskImage:
          "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)",
        maskImage:
          "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)",
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Cloud bodies — broad lobes, hard-edged via steep alpha threshold so the dots
              form readable cloud silhouettes rather than a diffuse haze. */}
          <filter id="cloud-soft" x="0" y="0" width="100%" height="100%">
            <feTurbulence ref={softTurbRef} type="fractalNoise" baseFrequency="0.005 0.012" numOctaves="3" seed="2" />
            <feColorMatrix ref={softMatRef} values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   4 0 0 0 -1.6" />
          </filter>
          {/* Wisps along the edges — finer turbulence at an even sharper threshold */}
          <filter id="cloud-detail" x="0" y="0" width="100%" height="100%">
            <feTurbulence ref={detTurbRef} type="fractalNoise" baseFrequency="0.018 0.035" numOctaves="2" seed="7" />
            <feColorMatrix ref={detMatRef} values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   5 0 0 0 -2.2" />
          </filter>
          <mask id="cloud-mask-soft" maskUnits="userSpaceOnUse">
            <rect width="100%" height="100%" filter="url(#cloud-soft)" />
          </mask>
          <mask id="cloud-mask-detail" maskUnits="userSpaceOnUse">
            <rect width="100%" height="100%" filter="url(#cloud-detail)" />
          </mask>
          <pattern id="dots-large" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="2" fill={c.muted} />
          </pattern>
          <pattern id="dots-small" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1" fill={c.muted} />
          </pattern>
        </defs>
        {/* Shadow / body dots */}
        <rect width="100%" height="100%" fill="url(#dots-large)" mask="url(#cloud-mask-soft)" opacity="0.32" />
        {/* Highlight / wisp dots */}
        <rect width="100%" height="100%" fill="url(#dots-small)" mask="url(#cloud-mask-detail)" opacity="0.5" />
      </svg>
    </div>
  );
}

/* ─── Next-page lead-in (hero-shaped) ─── */
// Sits at the bottom of every page in place of a CTA. Renders the NEXT page's
// full hero copy (eyebrow + h1 + body) in the same layout container as the
// destination hero, so the content occupies the identical viewport coordinates
// on both sides of the navigation. Click handler smoothly scrolls the lead-in
// to the hero position (section top at nav bottom), then router.push — the
// effect is "I scrolled into the next page." On the destination, the left
// column is already in place; only the right column (cards/grid/carousel/arrow
// flight) animates in, which the existing hero entry animations handle.
// Shared founder testimonials — used by the Home "What Our Entrepreneurs Say"
// cards and by the Portfolio hero's typewriter display. Empty quotes are
// filtered out at the consumer (e.g., Nuitée pending client copy).
export const TESTIMONIALS: { quote: string; author: string; role: string }[] = [
  { quote: "Working with Thayer is like having an experienced strategic operator on our side, not just another tech investor.", author: "Richard Valtr", role: "Founder, Mews" },
  { quote: "I never would have considered Rain a travel company, but Thayer has proven otherwise. Their team works in the background to drive exposure and partnership across a large and important category.", author: "Farooq Malik", role: "Co-Founder & CEO, Rain" },
  { quote: "Every investor claims to be value-add, Thayer is at the top of the list of those who actually are! Their unique ability to drive high-value partnerships in the travel industry is unparalleled.", author: "Pierre-Olivier Lepage", role: "CEO, Cruisebound" },
  { quote: "The Thayer Annual Summit is a special event. The kind where every conversation counted and turned into signed partnerships to help transform the travel & hospitality industry. I feel very grateful to be a part of the Thayer network and I'm looking forward to events to come.", author: "David Lord", role: "CEO, Guidesly" },
  { quote: "", author: "Mohamed Benmansour", role: "CEO, Nuitée" },
];

type PageKey = "home" | "about" | "portfolio" | "insights";
// Layout matches the destination hero's container shape so eyebrow/headline/body
// sit at identical viewport coordinates on both sides of the navigation:
//   "single"  — max-w-7xl wrapper with h1 max-w-4xl + body max-w-2xl (About hero)
//   "two-col" — max-w-7xl wrapper with flex-row, text in flex-1 left column
//               and an empty flex-1 right placeholder (Portfolio/Insights heroes;
//               the destination's logo grid / featured card animates in over it)
const NEXT_PAGE: Record<PageKey, {
  href: string;
  title: string;
  eyebrow: string;
  headline: string;
  body: string;
  layout: "single" | "two-col";
}> = {
  home: {
    href: "/about",
    title: "About",
    eyebrow: "About the Firm",
    headline: "A History of Innovation in Travel.",
    body: "Since 2008, Thayer Investment Partners has been at the forefront of travel technology investing, partnering with visionary founders to build companies that reshape how the world moves, stays, and experiences new places.",
    layout: "single",
  },
  about: {
    href: "/portfolio",
    title: "Portfolio",
    eyebrow: "Portfolio",
    headline: "Investing in companies shaping the future of global travel.",
    body: "Travel isn’t just a vertical. Our portfolio encompasses all companies who can or will sell to and partner with the global travel industry. Thayer invests on behalf of the travel industry to make travel operations and consumption — safer, easier, and fundamentally more intelligent.",
    layout: "two-col",
  },
  portfolio: {
    href: "/news",
    title: "Insights",
    eyebrow: "Insights",
    headline: "Perspectives on the future of travel & technology.",
    body: "News, research, and commentary from Thayer Investment Partners and our portfolio companies.",
    layout: "two-col",
  },
  insights: {
    href: "/",
    title: "Home",
    eyebrow: "Pioneers in Travel Technology · Est. 2008",
    headline: "Investing in the Entrepreneurs Shaping the Global Travel Industry.",
    body: "Thayer Investment Partners is a strategic venture capital firm focused on helping entrepreneurs navigate the dynamic, complex world of travel. Our investors are global corporations, executives, operators and accomplished entrepreneurs who share our belief that travel builds a better world.",
    layout: "single",
  },
};

export function NextPagePanel({ current }: { current: PageKey }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };
  const next = NEXT_PAGE[current];
  const router = useRouter();
  const navOverlay = useNavigationOverlay();
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const navigatingRef = useRef(false);
  // Continue-link Y is computed from the copy block's measured vertical center
  // so it visually aligns with the copy (which is top-aligned in the wrapper,
  // not centered in the section). Falls back to 50% before measurement runs.
  const [linkTopPx, setLinkTopPx] = useState<number | null>(null);

  // Prefetch destination on mount so router.push resolves instantly during
  // the overlay's opaque hold — minimizes the window where new page is still
  // loading.
  useEffect(() => {
    router.prefetch(next.href);
  }, [router, next.href]);

  useEffect(() => {
    const measure = () => {
      if (!copyRef.current || !sectionRef.current) return;
      const copyRect = copyRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();
      setLinkTopPx(copyRect.top - sectionRect.top + copyRect.height / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const navigate = useCallback(async () => {
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    const finish = async () => {
      // Dim the lead-in copy to 50%. Destination hero copies subscribe to the
      // same dimStyle so they also start at 50% on mount — the page swap is a
      // same-opacity content change instead of a flash.
      if (navOverlay) await navOverlay.dim();
      // scroll: false suppresses Next's default scrollTo(0,0). The provider's
      // useLayoutEffect normally resets scroll synchronously before paint, but
      // we add an explicit scrollTo here too as a belt-and-suspenders — on iOS
      // Safari the useLayoutEffect occasionally lands after the next page's
      // first paint, leaving the user mid-page with the sticky nav scrolled
      // out of view.
      router.push(next.href, { scroll: false });
      await new Promise<void>((r) => setTimeout(r, 80));
      window.scrollTo(0, 0);
      navOverlay?.undim();
    };

    if (!sectionRef.current) {
      await finish();
      return;
    }
    const navHeight = window.innerWidth >= 768 ? 105 : 89;
    const rect = sectionRef.current.getBoundingClientRect();
    const targetY = rect.top + window.scrollY - navHeight;
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 4) {
      await finish();
      return;
    }
    // Custom smooth scroll so we know exactly when it finishes — required so
    // we can chain the overlay fade + router.push the moment the scroll settles.
    const duration = 500;
    const startTime = performance.now();
    await new Promise<void>((resolve) => {
      function step(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - 0.5 * Math.cos(progress * Math.PI); // ease-in-out
        window.scrollTo(0, startY + distance * ease);
        if (progress < 1) requestAnimationFrame(step);
        else resolve();
      }
      requestAnimationFrame(step);
    });
    await finish();
  }, [router, next.href, navOverlay]);

  return (
    <section
      ref={sectionRef}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate();
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`Continue to ${next.title}`}
      className="relative px-6 md:px-12 py-24 md:min-h-[calc(100vh-105px)] flex flex-col md:justify-center overflow-hidden cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
      style={{ outlineColor: c.accent }}
    >
      {next.layout === "two-col" ? (
        <div className="relative w-full max-w-7xl mx-auto z-10 flex flex-col md:flex-row gap-12 md:gap-16 md:min-h-[36rem]">
          <div className="md:flex-1">
            <div ref={copyRef} style={navOverlay?.dimStyle}>
              <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8 transition-colors group-hover:text-[#2E9D55]" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
                {next.eyebrow}
              </span>
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.08] font-normal italic mb-8 transition-colors group-hover:text-[#2E9D55]" style={{ ...serif, color: c.text }}>
                {next.headline}
              </h2>
              <p className="text-[1.15rem] leading-[1.7]" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
                {next.body}
              </p>
            </div>
          </div>
          {/* Empty right column — destination's logo grid / card animates in here on arrival. */}
          <div className="md:flex-1" aria-hidden />
        </div>
      ) : (
        <div className="relative w-full max-w-7xl mx-auto z-10 md:min-h-[36rem]">
          <div ref={copyRef} style={navOverlay?.dimStyle}>
            <span className="text-[0.72rem] uppercase tracking-[0.22em] block mb-8 transition-colors group-hover:text-[#2E9D55]" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
              {next.eyebrow}
            </span>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.08] font-normal italic mb-8 max-w-4xl transition-colors group-hover:text-[#2E9D55]" style={{ ...serif, color: c.text }}>
              {next.headline}
            </h2>
            <p className="text-[1.15rem] leading-[1.7] max-w-2xl" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
              {next.body}
            </p>
          </div>
        </div>
      )}

      {/* Mobile continue link: in-flow, centered below the copy so it
          doesn't overlap the body text. Hidden at md+ where the absolute
          right-aligned version takes over. */}
      <div className="md:hidden mt-12 flex justify-center w-full">
        <div className="flex items-center gap-3">
          <span className="text-[0.72rem] uppercase tracking-[0.22em] transition-colors group-hover:text-[#2E9D55]" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
            Continue
          </span>
          <span className="text-[1.1rem] transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: c.accentText }} aria-hidden>
            &rarr;
          </span>
        </div>
      </div>

      {/* Desktop continue link: absolute, right-aligned with content frame,
          vertically aligned with the measured copy block center. */}
      <div
        className="hidden md:block absolute inset-x-0 -translate-y-1/2 px-6 md:px-12 pointer-events-none z-20"
        style={{ top: linkTopPx !== null ? `${linkTopPx}px` : "50%" }}
      >
        <div className="max-w-7xl mx-auto flex justify-end">
          <div className="flex items-center gap-3">
            <span className="text-[0.72rem] uppercase tracking-[0.22em] transition-colors group-hover:text-[#2E9D55]" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
              Continue
            </span>
            <span className="text-[1.1rem] transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: c.accentText }} aria-hidden>
              &rarr;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Shared Footer ─── */
export function EditorialFooter() {
  const { light } = useEditorialMode();
  const c = ec(light);
  return (
    <footer
      className="border-t px-6 md:px-12 py-12 md:py-16 transition-colors duration-500"
      style={{ borderColor: c.rule, backgroundColor: c.bg, fontFamily: "'Syne', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] whitespace-nowrap shrink-0" style={{ color: c.muted, fontWeight: c.sansWeight }}>Thayer Investment Partners</span>
        <div className="flex flex-wrap gap-5">
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Insights", href: "/news" },
            { label: "Investor Relations", href: "https://services.dataexchange.fiscloudservices.com/LogOn/2350903", external: true },
          ].map((t) => (
            <Link key={t.label} href={t.href} target={t.external ? "_blank" : undefined} rel={t.external ? "noopener noreferrer" : undefined} className="text-[0.6rem] uppercase tracking-[0.14em] hover:opacity-80 transition-colors whitespace-nowrap" style={{ color: c.muted, fontWeight: c.sansWeight }}>{t.label}</Link>
          ))}
        </div>
        <span className="text-[0.58rem] uppercase tracking-[0.1em] whitespace-nowrap shrink-0" style={{ color: c.muted, opacity: 0.6 }}>&copy; 2026 Thayer Investment Partners. All rights reserved.</span>
      </div>
    </footer>
  );
}

/* ─── Marginalia arrow companion ─── */
// Hook that observes an anchor element and renders the brand arrow which floats
// in diagonally from off-canvas bottom-left when the anchor enters the viewport
// (with a 15% inset). On exit it waits ~800ms before fading. Returns a ref to
// attach to the anchor (which must be position: relative) and the arrow JSX to
// render as a child. Arrow is hidden below md.
export function useHeadlineArrow<T extends HTMLElement = HTMLDivElement>(opts: { playOnce?: boolean } = {}) {
  const { playOnce = false } = opts;
  const ref = useRef<T>(null);
  type Phase = "pre" | "in" | "out";
  const [phase, setPhase] = useState<Phase>("pre");
  const { light } = useEditorialMode();
  const c = ec(light);

  useEffect(() => {
    if (!ref.current) return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let raf1: number | null = null;
    let raf2: number | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          if (timer) { clearTimeout(timer); timer = null; }
          // Double rAF — force the browser to commit the "pre" paint (opacity 0,
          // offset translate) before flipping to "in". Without this the transition
          // is skipped on mount because React updates both states in the same frame.
          if (raf1 !== null) cancelAnimationFrame(raf1);
          raf1 = requestAnimationFrame(() => {
            if (raf2 !== null) cancelAnimationFrame(raf2);
            raf2 = requestAnimationFrame(() => setPhase("in"));
          });
        } else {
          if (timer) clearTimeout(timer);
          // Only fade out if we were actually "in" — stops below-the-fold sections from
          // auto-advancing pre→out (which would consume the diagonal start position
          // while invisible, so the first real entry would only fade in, not travel).
          // playOnce: once "in", stay "in" — hero arrows shouldn't replay on scroll-back.
          timer = setTimeout(() => setPhase((p) => {
            if (playOnce) return p;
            return p === "in" ? "out" : p;
          }), 800);
        }
      },
      { rootMargin: "-15% 0px -15% 0px" }
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
      if (raf1 !== null) cancelAnimationFrame(raf1);
      if (raf2 !== null) cancelAnimationFrame(raf2);
    };
  }, [playOnce]);

  const arrow = (
    <span
      aria-hidden="true"
      className="hidden md:block absolute pointer-events-none"
      style={{
        right: "100%",
        marginRight: 10,
        top: "100%",
        opacity: phase === "in" ? 1 : 0,
        transform: phase === "pre" ? "translate(-64px, 64px)" : "translate(0, 0)",
        transition: "opacity 600ms ease-out, transform 1200ms cubic-bezier(0.4, 0, 0.4, 1)",
      }}
    >
      <svg width="16" height="16" viewBox="462 5 22 22" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M462.6,14.1c0-.8.8-1.3,1.5-1.5l17.4-6.1c1-.5,2.2.6,1.8,1.8l-6.1,17.4c-.3.7-.7,1.5-1.5,1.5s-1.5-.7-1.5-1.5v-10h-10c-.8,0-1.5-.7-1.5-1.5Z"
          fill={c.accent}
        />
      </svg>
    </span>
  );

  return { ref, arrow };
}

/* ─── Scroll-triggered typewriter ─── */
// Types `text` out character-by-character the first time the element scrolls into
// view, then leaves it fully rendered (no looping). Layout is reflow-free: the
// untyped remainder is rendered with visibility:hidden so it still occupies its
// final space from the first frame — the card never grows while typing. The
// caret is an inline-block of zero width so it doesn't nudge the hidden text and
// change where it wraps. Respects prefers-reduced-motion by rendering instantly.
export function ScrollTypewriter({
  text,
  speed = 12,
  className,
  style,
  trigger,
}: {
  text: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  // When provided, typing is driven by this boolean instead of the component's
  // own IntersectionObserver (lets a parent sequence several typewriters).
  trigger?: boolean;
}) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const ref = useRef<HTMLParagraphElement>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      setCount(text.length);
      return;
    }
    if (trigger !== undefined) {
      if (trigger) setStarted(true);
      return;
    }
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [text.length, trigger]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    const id = setTimeout(() => setCount((n) => n + 1), speed);
    return () => clearTimeout(id);
  }, [started, count, text.length, speed]);

  const done = count >= text.length;
  return (
    <p ref={ref} className={className} style={{ ...style, textWrap: "wrap" }}>
      <span>{text.slice(0, count)}</span>
      {started && !done && (
        <span
          aria-hidden
          className="animate-caret-blink"
          style={{ display: "inline-block", width: 0, overflow: "visible", color: c.accent }}
        >
          |
        </span>
      )}
      {/* Reserve the remaining space so the block is full-size from frame 1. */}
      <span aria-hidden style={{ visibility: "hidden" }}>{text.slice(count)}</span>
    </p>
  );
}

/* ─── Reveal-on-scroll wrapper ─── */
// Subtle, swift fade + rise the first time the element scrolls into view (once).
// Use it to wrap a section's body content so it eases in on arrival. Honors
// prefers-reduced-motion by rendering immediately.
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity 650ms ease-out ${delay}ms, transform 650ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function SectionHeader({ label, number }: { label: string; number: string }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const { ref, arrow } = useHeadlineArrow();
  const sans = { fontFamily: "'Syne', sans-serif" };

  // On first scroll-into-view: type the eyebrow, then draw the divider, then
  // type the number. Plays once per page view (the observer disconnects).
  const [started, setStarted] = useState(false);
  const [numberStart, setNumberStart] = useState(false);
  const charSpeed = 26;
  const lineDelay = label.length * charSpeed + 140;

  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStarted(true);
      setNumberStart(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setNumberStart(true), lineDelay + 240);
    return () => clearTimeout(t);
  }, [started, lineDelay]);

  return (
    <div ref={ref} data-section-header className="flex items-center gap-6 mb-16 md:mb-20 relative">
      {arrow}
      <ScrollTypewriter
        text={label}
        trigger={started}
        speed={charSpeed}
        className="text-[0.72rem] uppercase tracking-[0.22em] shrink-0"
        style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}
      />
      <div
        className="flex-1 h-px origin-left"
        style={{
          backgroundColor: c.rule,
          transform: started ? "scaleX(1)" : "scaleX(0)",
          transition: `transform 500ms ease-out ${lineDelay}ms`,
        }}
      />
      <ScrollTypewriter
        text={number}
        trigger={numberStart}
        speed={charSpeed}
        className="text-[0.72rem] uppercase tracking-[0.22em] shrink-0"
        style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}
      />
    </div>
  );
}

/* ─── Testimonial Carousel: founder quotes ─── */
// Replaces the old 3-col card grid (4 quotes in 6 cells → two empty boxes) and
// the earlier scroll-scrubbed pinned stage. Per the client this is now a
// click-driven HORIZONTAL carousel: one founder quote on stage at a time, the
// reader steps through with the left/right arrows (or the bottom-centre dashes),
// and each quote types itself out swiftly when it lands. Honors
// prefers-reduced-motion with a plain stacked list (no slide, no typing). All
// quotes always live in the DOM (sr-only) for screen readers + SEO.
//
// KNOWN TRADE-OFF (flagged to the client): with no autoplay and no scroll cue,
// quotes 2–N are only reachable by clicking, so most visitors will only ever see
// the first. Cheap mitigations if they reconsider: autoplay, swipe, or a peek of
// the next card. Built as requested for now.

// Types `text` from empty whenever `active` flips true, so a quote re-types every
// time the reader lands on it. While inactive it shows its FULL text — so a slide
// leaving the stage, or one skipped past on a dash-jump, never flashes empty.
// Duration is held roughly constant (~1.4s) regardless of length by stepping
// multiple chars per tick on long quotes — every quote feels equally "swift."
// Reflow-free: the untyped remainder is rendered visibility:hidden so the block
// is full-size from frame 1 and never grows mid-type (keeps it vertically centred).
function StageQuoteText({ text, active, c, sizeClamp, weight }: { text: string; active: boolean; c: ReturnType<typeof ec>; sizeClamp: string; weight: number }) {
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(text.length);
      return;
    }
    const DURATION = 1400;
    const TICK = 18;
    const steps = Math.max(1, Math.ceil(DURATION / TICK));
    const perTick = Math.max(1, Math.ceil(text.length / steps));
    let n = 0;
    setCount(0);
    const id = setInterval(() => {
      n += perTick;
      if (n >= text.length) {
        setCount(text.length);
        clearInterval(id);
      } else {
        setCount(n);
      }
    }, TICK);
    return () => clearInterval(id);
  }, [active, text]);

  const done = count >= text.length;
  return (
    <p
      className="leading-[1.35] italic"
      style={{ ...serif, color: c.text, textWrap: "pretty", fontSize: sizeClamp, fontWeight: weight }}
    >
      <span>{text.slice(0, count)}</span>
      {active && !done && (
        <span
          aria-hidden
          className="animate-caret-blink"
          style={{ display: "inline-block", width: 0, overflow: "visible", color: c.accent }}
        >
          |
        </span>
      )}
      <span aria-hidden style={{ visibility: "hidden" }}>{text.slice(count)}</span>
    </p>
  );
}

export function TestimonialStage({ testimonials }: { testimonials: { quote: string; author: string; role: string }[] }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };
  // The opening quote mark gets its own face: Playfair Display Black is far
  // more substantial, bolder and rounder (ball-terminal commas) than thin
  // Cormorant — it reads as a deliberate graphic element, not punctuation.
  const quoteGlyph = { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900 };
  // One quote fills the whole stage, so size it to its length: short quotes get
  // to be big and declarative; longer ones step down just enough to stay on a
  // single screen. Each bucket scales across viewports too (not just the cap),
  // so the longest quote also shrinks on small phones instead of clipping.
  // Verified to fit every quote down to ~768px-tall laptops and ~667px phones.
  const quoteSize = (len: number) =>
    len < 130
      ? "clamp(2rem, 1rem + 4vw, 3rem)"
      : len < 215
        ? "clamp(1.7rem, 0.9rem + 3.1vw, 2.6rem)"
        : "clamp(1.45rem, 0.7rem + 2.6vw, 2.25rem)";
  // Per-quote weight (Cormorant is now a variable font, so any 300–700 works).
  // Default 600; trialing 550 on the Valtr quote.
  const quoteWeight = (author: string) => (author === "Richard Valtr" ? 550 : 600);
  const N = testimonials.length;

  const stageRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true); // false for one frame to snap a wrap-around
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Gate the type-out to when the carousel is actually on screen, so the first
  // quote types on arrival rather than silently during initial page load.
  useEffect(() => {
    if (reduced) return;
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver((entries) => setInView(entries[0].isIntersecting), { threshold: 0.4 });
    io.observe(stage);
    return () => io.disconnect();
  }, [reduced]);

  // After a wrap snap (transition disabled), re-enable the slide on the next
  // frame so subsequent adjacent steps animate again.
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  // Wrapping navigation — the arrows never dead-end: stepping past the last quote
  // resets to the first (and vice-versa). The wrap snaps (transition off) so the
  // row doesn't visibly rewind through every quote; adjacent steps still slide.
  const goTo = (i: number) => {
    setAnimate(true);
    setIndex(Math.max(0, Math.min(N - 1, i)));
  };
  const step = (delta: 1 | -1) => {
    const target = index + delta;
    if (target < 0 || target >= N) {
      setAnimate(false);
      setIndex(target < 0 ? N - 1 : 0);
    } else {
      setAnimate(true);
      setIndex(target);
    }
  };
  const prev = () => step(-1);
  const next = () => step(1);

  // Reduced motion / no-scrubbing fallback: a calm stacked list, fully rendered.
  if (reduced) {
    return (
      <div className="max-w-3xl mx-auto px-6 md:px-12 mt-2">
        {testimonials.map((t, i) => (
          <div key={i} className="py-10" style={{ borderTop: i ? `1px solid ${c.rule}` : undefined }}>
            <span className="text-[3.4rem] leading-[0.7] block mb-2" style={{ ...quoteGlyph, color: c.accent }}>&ldquo;</span>
            <p className="text-[clamp(1.4rem,1rem+1.5vw,2.2rem)] leading-[1.4] font-semibold italic mb-6" style={{ ...serif, color: c.text }}>{t.quote}</p>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 shrink-0" style={{ backgroundColor: c.accent }} />
              <span>
                <span className="text-[0.78rem] uppercase tracking-[0.18em] block" style={{ ...sans, color: c.text, fontWeight: c.sansWeight }}>{t.author}</span>
                <span className="text-[0.78rem] uppercase tracking-[0.14em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{t.role}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const arrowBase =
    "w-11 h-11 rounded-full border border-black/15 items-center justify-center shrink-0 transition-colors text-[#4A4338] hover:text-[#2E9D55] hover:border-[#2E9D55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E9D55]";
  const renderArrow = (dir: "prev" | "next", cls: string) => (
    <button
      type="button"
      onClick={dir === "prev" ? prev : next}
      aria-label={dir === "prev" ? "Previous quote" : "Next quote"}
      className={`${cls} ${arrowBase}`}
    >
      {dir === "prev" ? <ChevronLeft size={20} aria-hidden /> : <ChevronRight size={20} aria-hidden />}
    </button>
  );

  return (
    <div className="mt-2">
      {/* Full quotes for screen readers + crawlers, independent of carousel state. */}
      <ul className="sr-only">
        {testimonials.map((t, i) => (
          <li key={i}>&ldquo;{t.quote}&rdquo; — {t.author}, {t.role}</li>
        ))}
      </ul>

      <div ref={stageRef} className="relative overflow-hidden max-w-7xl mx-auto">
        {/* Sliding quote row — decorative; the sr-only list above carries the
            real text — so the visual track is aria-hidden. Each slide is locked to
            the same min-height so the row never jolts vertically between quotes. */}
        <div
          aria-hidden
          className="flex"
          style={{ transform: `translateX(-${index * 100}%)`, transition: animate ? "transform 500ms ease-out" : "none" }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="w-full shrink-0 flex items-center justify-center min-h-[32rem] md:min-h-[34rem] px-6 md:px-12 pt-8 pb-24"
            >
              <div className="max-w-5xl w-full">
                <span className="text-[clamp(3.4rem,6.4vw,6.75rem)] leading-[0.7] block mb-2 md:mb-3" style={{ ...quoteGlyph, color: c.accent, opacity: 0.9 }}>&ldquo;</span>
                <StageQuoteText text={t.quote} active={inView && i === index} c={c} sizeClamp={quoteSize(t.quote.length)} weight={quoteWeight(t.author)} />
                <div className="flex items-center gap-4 mt-8 md:mt-10">
                  <span className="h-px w-8 shrink-0" style={{ backgroundColor: c.accent }} />
                  <span>
                    <span className="text-[0.8rem] uppercase tracking-[0.18em] block" style={{ ...sans, color: c.text, fontWeight: c.sansWeight }}>{t.author}</span>
                    <span className="text-[0.8rem] uppercase tracking-[0.14em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{t.role}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side arrows pinned to the content-frame edges (the stage is now capped
            at max-w-7xl), so on large screens they sit beside the quote rather than
            way out at the viewport margins. */}
        {renderArrow("prev", "hidden xl:flex absolute left-12 top-1/2 -translate-y-1/2 z-10")}
        {renderArrow("next", "hidden xl:flex absolute right-12 top-1/2 -translate-y-1/2 z-10")}

        {/* Bottom-centre controls: position dashes, flanked by the arrows below xl
            (where the quote uses the full width and side arrows would overlap). */}
        <div className="absolute bottom-8 inset-x-0 flex items-center justify-center gap-5">
          {renderArrow("prev", "flex xl:hidden")}
          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Quote ${i + 1} of ${N} — ${t.author}`}
                aria-current={i === index ? "true" : undefined}
                className="h-[3px] w-[34px] shrink-0 cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ backgroundColor: i === index ? c.accent : c.rule, outlineColor: c.accent }}
              />
            ))}
          </div>
          {renderArrow("next", "flex xl:hidden")}
        </div>
      </div>
    </div>
  );
}

/* ─── Shared Article List Item ─── */
export function ArticleListItem({ article }: { article: Article }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] gap-5 md:gap-10 py-8 border-b transition-colors items-start"
      style={{ borderColor: c.rule }}
    >
      <div className="aspect-[4/3] border overflow-hidden relative" style={{ borderColor: c.rule, backgroundColor: c.surface }}>
        {article.heroImage ? (
          <img
            src={article.heroImage}
            alt={article.heroImageAlt}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : null}
      </div>
      <div>
        <span className="text-[0.65rem] uppercase tracking-[0.2em] block mb-3" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
          {formatDate(article.date)} &middot; {article.category}
        </span>
        <h3 className="text-[1.4rem] md:text-[1.75rem] leading-[1.2] font-normal italic mb-3 group-hover:text-[#2E9D55] transition-colors" style={{ ...serif, color: c.text, fontWeight: c.headingWeight }}>
          {article.title}
        </h3>
        <p className="hidden md:block text-[1.05rem] md:text-[1.15rem] leading-[1.7]" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>{article.subhead}</p>
      </div>
    </Link>
  );
}

export function EditorialHeadlines({ number, articles }: { number: string; articles: Article[] }) {
  const { light } = useEditorialMode();
  const c = ec(light);
  const sans = { fontFamily: "'Syne', sans-serif" };
  if (articles.length === 0) return null;
  return (
    <section className="px-6 md:px-12 py-24 md:py-32 snap-start">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="Recent Articles" number={number} />
        <Reveal className="flex flex-col">
          {articles.slice(0, 3).map((a) => (
            <ArticleListItem key={a.slug} article={a} />
          ))}
          <div className="mt-10 text-right">
            <Link
              href="/news"
              className="text-[0.72rem] uppercase tracking-[0.18em] hover:text-[#2E9D55] transition-colors"
              style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}
            >
              All Insights &rarr;
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Marquee CSS ─── */
const marqueeCSS = `
@keyframes editorial-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes carousel-timer {
  0% { width: 0%; }
  100% { width: 100%; }
}
@media(min-width:768px) { .hero-slide { background-position: center center !important; } }
`;

/* ─── Carousel Data ─── */
const carouselSlides = [
  {
    company: "Mews", slug: "mews", label: "Mews",
    image: "/images/carousel/mews.webp", mobileBgPos: "calc(50% - 348px) center",
    founders: [{ name: "Richard Valtr", title: "Founder, Mews" }],
    story: "Mews reimagined the hotel operating system from the ground up. We backed their vision to replace legacy property management with a cloud-native platform now powering hospitality worldwide.",
  },
  {
    company: "Cloaked", slug: "cloaked", label: "Cloaked",
    image: "/images/carousel/cloaked.webp", mobileBgPos: "calc(50% - 174px) center",
    founders: [
      { name: "Arjun Bhatnagar", title: "Co-Founder & CEO, Cloaked" },
      { name: "Abhijay Bhatnagar", title: "Co-Founder & CTO, Cloaked" },
    ],
    story: "Cloaked is making privacy infrastructure for the AI era. We invested because as AI-powered scams weaponize personal data, Cloaked gives consumers and enterprises the tools to take back control of their digital identities.",
  },
  {
    company: "Canary Technologies", slug: "canary-technologies", label: "Canary",
    image: "/images/carousel/canary.webp", mobileBgPos: "calc(50% - 314px) center",
    founders: [
      { name: "Harman Singh Narula", title: "Co-Founder & CEO, Canary Technologies" },
      { name: "SJ Sawhney", title: "Co-Founder & President, Canary Technologies" },
    ],
    story: "Canary Technologies is modernizing the hotel guest experience. We invested in their mission to digitize check-in, payments, and upselling across thousands of properties worldwide.",
  },
  {
    company: "MarginEdge", slug: "marginedge", label: "MarginEdge",
    image: "/images/carousel/marginedge.webp", mobileBgPos: "calc(50% - 348px) center",
    founders: [{ name: "Bo Davis", title: "Co-Founder & CEO, MarginEdge" }],
    story: "MarginEdge is eliminating the back-office burden for restaurants. We backed their platform to automate invoicing, inventory, and financial insights for operators everywhere.",
  },
  {
    company: "Nuitée", slug: "nuitee", label: "Nuitée",
    image: "/images/carousel/nuitee.webp", mobileBgPos: "calc(50% - 348px) center",
    founders: [{ name: "Med Benmansour", title: "Founder & CEO, Nuitée" }],
    story: "Nuitée is building the infrastructure layer for global hotel distribution. We backed their API-first platform connecting travel companies to accommodation inventory worldwide.",
  },
  {
    company: "Cardless", slug: "cardless", label: "Cardless",
    image: "/images/carousel/cardless.webp", mobileBgPos: "calc(50% - 300px) center",
    founders: [
      { name: "Scott Kazmierowicz", title: "Co-Founder & CEO, Cardless" },
      { name: "Michael Spelfogel", title: "Co-Founder & President, Cardless" },
    ],
    story: "Cardless is reinventing co-branded credit cards for the modern era. We invested in their platform enabling travel and lifestyle brands to launch card programs effortlessly.",
  },
  {
    company: "Rain", slug: "rain", label: "Rain",
    image: "/images/carousel/rain.webp", mobileBgPos: "calc(50% - 408px) center",
    founders: [
      { name: "Farooq Malik", title: "Co-Founder & CEO, Rain" },
      { name: "Charles Yoo-Naut", title: "Co-Founder, Rain" },
    ],
    story: "Rain is transforming how workers get paid. We backed their earned wage access platform, helping hospitality and travel employers offer on-demand pay to their teams.",
  },
  {
    company: "Super.com", slug: "super", label: "Super",
    image: "/images/carousel/super.webp", mobileBgPos: "calc(50% - 348px) center",
    founders: [{ name: "Hussein Fazal", title: "Co-Founder & CEO, Super.com" }],
    story: "Super.com is building the everyday super app for savings. We invested in their vision to help millions save on travel, finances, and daily spending through one powerful platform.",
  },
];

/* ─── Home Page ─── */
export default function EditorialHomePage({ articles }: { articles: Article[] }) {
  const carouselImageRef = useRef<HTMLDivElement>(null);

  const { light } = useEditorialMode();
  const c = ec(light);
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Syne', sans-serif" };
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = carouselSlides[activeSlide];
  const [hoveredCat, setHoveredCat] = useState<number | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [navPaused, setNavPaused] = useState(false);
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const paused = userPaused || navPaused;

  const goTo = useCallback((idx: number) => {
    setActiveSlide(idx);
    setNavPaused(true);
  }, []);

  const goNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    setNavPaused(true);
  }, []);

  const goPrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    setNavPaused(true);
  }, []);

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  useEffect(() => {
    if (navPaused && !userPaused) {
      const resume = setTimeout(() => setNavPaused(false), 10000);
      return () => clearTimeout(resume);
    }
  }, [navPaused, userPaused]);

  useEffect(() => {
    if (paused) {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
      return;
    }
    autoAdvanceRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => { if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current); };
  }, [paused]);

  const tickerItems = [
    "Travel Technology Venture Capital",
    "$15 Trillion Global Industry",
    "Pioneers Since 2008",
    "Hotels & Hospitality",
    "Airlines & Mobility",
    "Experiences & Entertainment",
    "$2.1T Travel Tech Market by 2030",
  ];

  const stats = [
    { value: "$15T", label: "Global Travel Industry", sub: "Annual economic impact of travel and tourism worldwide" },
    { value: "1.4B", label: "International Arrivals", sub: "Annual cross-border travelers driving demand for innovation" },
    { value: "$2.1T", label: "Travel Tech Market by 2030", sub: "Projected technology spend across the travel ecosystem" },
  ];

  const categories = [
    { icon: Building2, name: "Hospitality Technology", desc: "Cloud platforms powering modern hotel operations and guest experiences" },
    { icon: UtensilsCrossed, name: "Restaurant Technology", desc: "Back-office automation and financial intelligence for restaurant operators" },
    { icon: Globe, name: "Travel Distribution", desc: "Infrastructure connecting travel platforms to global accommodation inventory" },
    { icon: CreditCard, name: "Payments & Loyalty", desc: "Co-branded card programs and loyalty platforms for travel brands" },
    { icon: Wallet, name: "Consumer Finance", desc: "Earned wage access and savings platforms for the modern workforce" },
    { icon: ShieldCheck, name: "Cybersecurity & Privacy", desc: "AI governance, identity protection, and enterprise security infrastructure" },
  ];

  // Drop testimonials without copy yet (e.g. Nuitée, pending client text) so we
  // don't render an empty card.
  const testimonials = TESTIMONIALS.filter((t) => t.quote.length > 0);

  return (
    <div className="relative isolate min-h-screen transition-colors duration-500" style={{ backgroundColor: c.bg, color: c.text }}>
      <CloudBackground />
      <style>{marqueeCSS}</style>
      <EditorialNav active="home" />

      {/* ── Hero ── */}
      {/* min-h-screen (not h-screen): on short viewports the hero grows to fit its
          content instead of forcing the centred copy up behind the sticky nav. */}
      <div className="flex flex-col md:flex-row md:min-h-screen md:-mt-[105px]">
        {/* Left panel — full viewport on mobile, 40% on desktop.
            md:pl uses a calc that mirrors `max-w-7xl mx-auto` inside an
            `md:px-12` section, so the copy's left edge lines up with the
            About/Portfolio/Insights content frame's left edge at any
            viewport. Carousel on the right still bleeds to the viewport
            edge because the left panel itself remains full-bleed. */}
        <div className="relative flex flex-col justify-center w-full md:w-[50%] pl-6 md:pl-[calc(3rem+max(0px,(100vw-86rem)/2))] pr-6 md:pr-24 py-12 md:pt-32 md:pb-0 z-10 shrink-0 min-h-[var(--hero-mobile-h)] md:min-h-0">
          <span className="hidden md:block text-[0.72rem] uppercase tracking-[0.22em] mb-8" style={{ ...sans, color: c.accentText, fontWeight: c.sansWeight }}>
            Pioneers in Travel Technology &middot; Est. 2008
          </span>
          <h1
            className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.08] font-normal italic mb-6"
            style={{ ...serif, color: c.text }}
          >
            Investing in the Entrepreneurs Shaping the Global Travel Industry.
          </h1>
          <p className="text-[1.05rem] md:text-[1.15rem] leading-[1.65] md:leading-[1.7] mb-8" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
            Thayer Investment Partners is a strategic venture capital firm focused on helping entrepreneurs navigate the dynamic, complex world of travel. Our investors are global corporations, executives, operators and accomplished entrepreneurs who share our belief that travel builds a better world.
          </p>

        </div>

        {/* Right panel — flows below left on mobile, 60% on desktop */}
        <section
          className="relative w-full md:h-auto md:flex-1 overflow-hidden flex flex-col md:block"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Image carousel — mobile uses static vh so the image doesn't
              reflow as Safari's bottom bar shows/hides. Full panel on desktop. */}
          <div ref={carouselImageRef} className="relative h-[35vh] shrink-0 md:absolute md:inset-0 md:h-auto overflow-hidden">
            {carouselSlides.map((s, i) => (
              s.image ? (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                  style={{ opacity: i === activeSlide ? 1 : 0 }}
                >
                  {/* Image always fills the panel — cover at 100% height */}
                  <div
                    className="absolute inset-0 bg-no-repeat bg-cover bg-top md:bg-center"
                    style={{ backgroundImage: `url('${s.image}')` }}
                  />
                </div>
              ) : (
                <div key={i} className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ backgroundColor: light ? "#d8d4cc" : "#1a1a1a", opacity: i === activeSlide ? 1 : 0 }} />
              )
            ))}
            {/* Desktop bottom-up gradient for readability */}
            <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70%)" }} />

            {/* Mobile swipe arrows — bottom corners of the image, white,
                hint that the carousel is swipeable. */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous slide"
              className="md:hidden absolute bottom-3 left-3 z-10 w-9 h-9 flex items-center justify-center"
              style={{ color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
            >
              <span className="text-[1.5rem] leading-none" aria-hidden>&larr;</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className="md:hidden absolute bottom-3 right-3 z-10 w-9 h-9 flex items-center justify-center"
              style={{ color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
            >
              <span className="text-[1.5rem] leading-none" aria-hidden>&rarr;</span>
            </button>
          </div>

          {/* Desktop: logo, attribution, carousel, link — bottom right */}
          <div className="absolute bottom-16 right-8 hidden md:flex flex-col items-end z-10 gap-7">
            {/* Company logo — cross-fade */}
            <div className="relative" style={{ height: 52, width: 260 }}>
              {carouselSlides.map((s, idx) => (
                <img key={idx} src={`/logos/portfolio/${s.slug}-dark.svg`} alt={s.company} className="absolute right-0 top-0 object-contain transition-opacity duration-700 ease-in-out" style={{ height: 52, opacity: idx === activeSlide ? 1 : 0 }} />
              ))}
            </div>

            {/* Attribution — cross-fade */}
            <div className="relative w-full" style={{ minHeight: "7.5rem" }}>
              {carouselSlides.map((s, idx) => (
                <div key={idx} className="absolute right-0 top-0 w-max flex flex-col items-end gap-4 transition-opacity duration-700 ease-in-out" style={{ opacity: idx === activeSlide ? 1 : 0, pointerEvents: idx === activeSlide ? "auto" : "none" }}>
                  {s.founders.map((f, i) => (
                    <div key={i} className="flex flex-col items-end">
                      <span className="text-[1.75rem] leading-[1.15] font-normal italic whitespace-nowrap" style={{ ...serif, color: "#fff" }}>{f.name}</span>
                      <span className="text-[0.68rem] uppercase tracking-[0.18em] whitespace-nowrap" style={{ ...sans, color: "rgba(255,255,255,0.7)", fontWeight: c.sansWeight }}>{f.title}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Carousel dashes + link */}
            <div className="flex flex-col items-end gap-3">
              <div className="flex gap-1.5 items-center">
                {carouselSlides.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { if (i === activeSlide) { setUserPaused(!userPaused); setNavPaused(false); } else { goTo(i); } }}
                    aria-label={i === activeSlide ? (userPaused ? "Play carousel" : "Pause carousel") : `Go to slide ${i + 1} — ${s.company}`}
                    className="group/card w-[24px] h-[4px] flex items-center justify-center cursor-pointer relative shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                    style={{ backgroundColor: i === activeSlide ? "rgb(46,157,85)" : "rgba(255,255,255,0.3)", outlineColor: c.accent }}
                  >
                    {i === activeSlide && (
                      <div key={`timer-${activeSlide}-${paused}`} className="absolute inset-y-0 left-0" style={{ backgroundColor: "rgba(255,255,255,0.4)", animation: paused ? "none" : "carousel-timer 6s linear forwards", width: paused ? "100%" : undefined }} />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 z-10" style={{ backgroundColor: "rgb(46,157,85)", height: 20, top: -8 }}>
                      {i === activeSlide && userPaused ? <Play className="w-3 h-3 text-white" /> : <Pause className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                ))}
              </div>

              <Link href="/portfolio" className="text-[0.72rem] uppercase tracking-[0.18em] hover:opacity-80 transition-colors" style={{ ...sans, fontWeight: c.sansWeight, color: "#fff" }}>
                View Portfolio &rarr;
              </Link>
            </div>
          </div>

          {/* Mobile content — logo + attribution below image */}
          <div className="md:hidden relative flex-1 flex flex-col px-6 pt-8 pb-24" style={{ backgroundColor: c.bg }}>
            <div className="flex flex-col items-start gap-5">
              {/* Logo — cross-fade */}
              <div className="relative" style={{ height: 36, width: 180 }}>
                {carouselSlides.map((s, idx) => (
                  <img key={idx} src={`/logos/portfolio/${s.slug}-${light ? "light" : "dark"}.svg`} alt={s.company} className="absolute left-0 top-0 object-contain transition-opacity duration-700 ease-in-out" style={{ height: 36, opacity: idx === activeSlide ? 1 : 0 }} />
                ))}
              </div>
              {/* Names + titles — FIXED height (not min-h) so every slide
                  reserves the same space. The tallest case is a 2-founder slide
                  whose titles wrap to two lines (e.g. Canary's "Co-Founder &
                  President, Canary Technologies"), which measures ~159px; 10.5rem
                  (168px) covers it with headroom. A min-height let that slide grow
                  past the others and shift the whole page below up/down as the
                  carousel cycled. overflow-hidden guards against any overflow. */}
              <div className="flex flex-col items-start gap-3 h-[10.5rem] overflow-hidden">
                {slide.founders.map((f, i) => (
                  <div key={i} className="flex flex-col items-start">
                    <span className="text-[1.5rem] font-normal italic" style={{ ...serif, color: c.text }}>{f.name}</span>
                    <span className="text-[0.78rem] uppercase tracking-[0.22em]" style={{ ...sans, color: c.muted, fontWeight: c.sansWeight }}>{f.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>
      </div>

      {/* ── What Our Entrepreneurs Say (01) ── */}
      <section className="pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader label="What Our Entrepreneurs Say" number="01" />
        </div>
        <TestimonialStage testimonials={testimonials} />
      </section>

      {/* ── Our Philosophy (02) ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Philosophy" number="02" />
          <Reveal className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-12">
            <h2 className="text-[clamp(2.25rem,3.5vw,3.2rem)] leading-[1.15] font-normal italic" style={{ ...serif, color: c.text }}>
              Invest in Travel.
            </h2>
            <div>
              <p className="text-[1.15rem] leading-[1.7] mb-8" style={{ ...sans, color: c.bodyText, fontWeight: c.sansWeight }}>
                Travel is more than airlines and accommodations – it is how and why people leave home and what shapes where and how they choose to live in the first place.
                We invest on behalf of the travel industry. From horizontal platforms—payments, cybersecurity, and workforce management—to vertical solutions across loyalty, distribution, and critical operating systems, we back both industry outsiders and seasoned operators.
                We connect dots and open doors across the largest and most dynamic industry in the world: hotels, transportation, airlines, cruise, agencies, restaurants, events, sports, entertainment, and experiences.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <EditorialHeadlines number="03" articles={articles} />

      <NextPagePanel current="home" />

      <EditorialFooter />
    </div>
  );
}
