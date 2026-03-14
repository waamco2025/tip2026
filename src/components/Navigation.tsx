"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Insights", href: "/news" },
  { label: "Investor Relations", href: "/investor-relations" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-thayer-bg px-6 md:px-14 py-4 md:py-5 border-b border-thayer-border relative">
      <Link href="/" className="flex items-center">
        <img src="/logotype.svg" alt="Thayer Investment Partners" className="h-8 md:h-12" />
      </Link>
      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-thayer-gold ${
                isActive
                  ? "text-thayer-gold font-medium"
                  : "text-thayer-text-secondary"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      {/* Mobile hamburger */}
      <button className="md:hidden text-thayer-text" onClick={() => setOpen(!open)}>
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-thayer-bg border-b border-thayer-border flex flex-col py-4 px-6 gap-4 z-50 md:hidden">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-sm ${
                  isActive ? "text-thayer-gold font-medium" : "text-thayer-text-secondary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
