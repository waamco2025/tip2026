"use client";

import { useTheme } from "./ThemeContext";
import { EditorialModeProvider } from "@/concepts/editorial/EditorialModeContext";

export default function ConceptShell({
  stoic,
  modern,
  futurist,
  editorial,
}: {
  stoic: React.ReactNode;
  modern?: React.ReactNode;
  futurist?: React.ReactNode;
  editorial?: React.ReactNode;
}) {
  const { theme } = useTheme();

  if (theme === "stoic") return <>{stoic}</>;
  if (theme === "modern" && modern) return <>{modern}</>;
  if (theme === "futurist" && futurist) return <>{futurist}</>;
  if (theme === "editorial" && editorial) return <EditorialModeProvider>{editorial}</EditorialModeProvider>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-thayer-bg">
      <div className="text-center flex flex-col items-center gap-4">
        <h2 className="font-playfair text-3xl text-thayer-text">
          {theme.charAt(0).toUpperCase() + theme.slice(1)} Concept
        </h2>
        <p className="text-thayer-text-secondary text-sm">
          Coming soon — this concept is currently in design.
        </p>
      </div>
    </div>
  );
}
