"use client";

import { createContext, useContext, useState, useEffect } from "react";

const EditorialModeContext = createContext<{
  light: boolean;
  toggle: () => void;
}>({ light: false, toggle: () => {} });

export function EditorialModeProvider({ children }: { children: React.ReactNode }) {
  const [light, setLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("editorial-light");
    if (stored === "true") setLight(true);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("editorial-light", String(light));
  }, [light, mounted]);

  return (
    <EditorialModeContext.Provider value={{ light, toggle: () => setLight((v) => !v) }}>
      {children}
    </EditorialModeContext.Provider>
  );
}

export function useEditorialMode() {
  return useContext(EditorialModeContext);
}

/* Color mappings */
export function ec(light: boolean) {
  return {
    bg: light ? "#FAF8F5" : "#0C0C0A",
    surface: light ? "#F0EDE8" : "#141410",
    text: light ? "#1A1917" : "#EAE5DB",
    muted: light ? "#5C5549" : "#7A7568",        // darker in light mode (was #8A8578)
    accent: "#C49A45",
    rule: light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.07)",  // slightly more visible in light
    bodyText: light ? "rgba(26,25,23,0.88)" : "rgba(234,229,219,0.82)",  // higher contrast in light
    bodyWeight: light ? 600 : 500,
    /* Additional weights for different contexts */
    sansWeight: light ? 600 : 500,    // sans-serif labels, dates, tags
    headingWeight: light ? 600 : 500, // section subheadings (italic)
    statWeight: light ? 600 : 400,    // stat numbers
    hamburger: light ? "#1A1917" : "#EAE5DB",
    logo: light ? "/logotype-dark.svg" : "/logotype.svg",
  };
}
