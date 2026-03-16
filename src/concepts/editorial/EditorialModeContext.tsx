"use client";

import { createContext, useContext, useState } from "react";

const EditorialModeContext = createContext<{
  light: boolean;
  toggle: () => void;
}>({ light: false, toggle: () => {} });

export function EditorialModeProvider({ children }: { children: React.ReactNode }) {
  const [light, setLight] = useState(false);
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
    muted: light ? "#8A8578" : "#7A7568",
    accent: "#C49A45",
    rule: light ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.07)",
    bodyText: light ? "rgba(26,25,23,0.72)" : "rgba(234,229,219,0.72)",
    hamburger: light ? "#1A1917" : "#EAE5DB",
  };
}
