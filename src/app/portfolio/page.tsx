import { Suspense } from "react";
import EditorialPortfolio from "@/concepts/editorial/PortfolioPage";

export default function PortfolioPage() {
  return (
    <Suspense>
      <EditorialPortfolio />
    </Suspense>
  );
}
