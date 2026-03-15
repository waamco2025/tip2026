"use client";

import { useTheme, ThemeName } from "./ThemeContext";

const themes: { name: ThemeName; label: string }[] = [
  { name: "stoic", label: "Stoic" },
  { name: "modern", label: "Modern" },
  { name: "futurist", label: "Futurist" },
  { name: "editorial", label: "Editorial" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-1.5 py-1.5 shadow-2xl">
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name)}
          className={`px-5 py-2 text-xs font-semibold tracking-wide rounded-full transition-all duration-300 ${
            theme === t.name
              ? "bg-thayer-gold text-black shadow-lg"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
