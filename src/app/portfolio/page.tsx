import ConceptShell from "@/components/ConceptShell";
import StoicPortfolio from "@/concepts/stoic/PortfolioPage";
import ModernPortfolio from "@/concepts/modern/PortfolioPage";
import FuturistPortfolio from "@/concepts/futurist/PortfolioPage";
import EditorialPortfolio from "@/concepts/editorial/PortfolioPage";

export default function PortfolioPage() {
  return <ConceptShell stoic={<StoicPortfolio />} modern={<ModernPortfolio />} futurist={<FuturistPortfolio />} editorial={<EditorialPortfolio />} />;
}
