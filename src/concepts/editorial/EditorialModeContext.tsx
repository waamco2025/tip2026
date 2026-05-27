"use client";

import { createContext, useContext } from "react";

const EditorialModeContext = createContext<{
  light: boolean;
  toggle: () => void;
}>({ light: true, toggle: () => {} });

export function EditorialModeProvider({ children }: { children: React.ReactNode }) {
  return (
    <EditorialModeContext.Provider value={{ light: true, toggle: () => {} }}>
      {children}
    </EditorialModeContext.Provider>
  );
}

export function useEditorialMode() {
  return useContext(EditorialModeContext);
}

/* Color mappings */
export function ec(_light: boolean) {
  return {
    bg: "#F4F1EC",
    surface: "#F0EDE8",
    text: "#1A1917",
    muted: "#4A4338",
    accent: "#2E9D55",
    accentText: "#1F6B3A",
    rule: "rgba(0,0,0,0.14)",
    bodyText: "rgba(26,25,23,0.78)",
    bodyWeight: 600,
    sansWeight: 600,
    headingWeight: 600,
    statWeight: 600,
    hamburger: "#1A1917",
    logo: "/logotype-dark.svg",
  };
}
