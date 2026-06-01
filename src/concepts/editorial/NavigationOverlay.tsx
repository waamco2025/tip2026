"use client";

import React, { createContext, useCallback, useContext, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Sits in the root layout so dim state and the scroll-reset effect persist
// across page mounts. Components that should fade during lead-in transitions
// (HeroLeadIn's copy + each destination hero's copy) spread `dimStyle` on a
// wrapper. The provider also handles the scroll-reset on pathname changes via
// useLayoutEffect — fires after React commits the new page DOM but before
// paint, so the new page is never visible at the old scroll position.
type Ctx = {
  dim: () => Promise<void>;
  undim: () => void;
  dimStyle: React.CSSProperties;
};
const NavigationOverlayContext = createContext<Ctx | null>(null);

const FADE_MS = 300;
const DIM_OPACITY = 0.5;

export function NavigationOverlayProvider({ children }: { children: React.ReactNode }) {
  const [dimmed, setDimmed] = useState(false);
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (prevPath.current !== null && prevPath.current !== pathname) {
      // behavior: 'instant' bypasses globals.css `scroll-behavior: smooth`,
      // which otherwise animates the scroll-reset visibly.
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    prevPath.current = pathname;
  }, [pathname]);

  const dim = useCallback(async () => {
    setDimmed(true);
    await new Promise<void>((r) => setTimeout(r, FADE_MS));
  }, []);

  const undim = useCallback(() => {
    setDimmed(false);
  }, []);

  const dimStyle: React.CSSProperties = {
    opacity: dimmed ? DIM_OPACITY : 1,
    transition: `opacity ${FADE_MS}ms ease-in-out`,
  };

  return (
    <NavigationOverlayContext.Provider value={{ dim, undim, dimStyle }}>
      {children}
    </NavigationOverlayContext.Provider>
  );
}

export function useNavigationOverlay() {
  return useContext(NavigationOverlayContext);
}
