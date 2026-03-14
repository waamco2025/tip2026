import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Insights", href: "/news" },
  { label: "Investor Relations", href: "/investor-relations" },
];

export default function Footer() {
  return (
    <footer className="bg-thayer-bg border-t border-thayer-border px-14 py-12 flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-3">
          <span className="text-thayer-gold font-semibold text-[13px] tracking-[2px]">
            THAYER INVESTMENT PARTNERS
          </span>
          <span className="text-thayer-text-secondary text-[13px]">
            Pioneers in travel technology venture capital.
          </span>
        </div>
        <div className="flex items-center gap-8">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-thayer-text-secondary text-[13px] hover:text-thayer-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-thayer-text-muted text-[11px]">
          © 2026 Thayer Investment Partners. All rights reserved.
        </span>
        <span className="text-thayer-text-muted text-[11px]">
          Privacy Policy &nbsp;·&nbsp; Terms of Use
        </span>
      </div>
    </footer>
  );
}
