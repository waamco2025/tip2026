import { Suspense } from "react";
import EditorialPortfolio from "@/concepts/editorial/PortfolioPage";
import { getAllArticles } from "@/lib/articles";

export default function PortfolioPage() {
  const articles = getAllArticles();
  return (
    <Suspense>
      <EditorialPortfolio articles={articles} />
    </Suspense>
  );
}
