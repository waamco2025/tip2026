import { Suspense } from "react";
import type { Metadata } from "next";
import EditorialPortfolio from "@/concepts/editorial/PortfolioPage";
import { getAllArticles } from "@/lib/articles";

const title = "Portfolio";
const description =
  "Companies shaping the future of global travel. Thayer's portfolio spans every business that sells to, partners with, or consumes travel — making travel operations and consumption safer, easier, and more intelligent.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portfolio" },
  openGraph: { title, description, url: "/portfolio" },
  twitter: { title, description },
};

export default function PortfolioPage() {
  const articles = getAllArticles();
  return (
    <Suspense>
      <EditorialPortfolio articles={articles} />
    </Suspense>
  );
}
