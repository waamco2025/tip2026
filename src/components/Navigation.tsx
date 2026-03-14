"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Insights", href: "/news" },
  { label: "Investor Relations", href: "/investor-relations" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between bg-thayer-bg px-14 py-5 border-b border-thayer-border">
      <Link href="/" className="flex items-center">
        <img src="/logotype.svg" alt="Thayer Investment Partners" className="h-12" />
      </Link>
      <div className="flex items-center gap-8">
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
    </nav>
  );
}
