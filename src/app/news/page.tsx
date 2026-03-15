import ConceptShell from "@/components/ConceptShell";
import StoicNews from "@/concepts/stoic/NewsPage";
import ModernNews from "@/concepts/modern/NewsPage";
import FuturistNews from "@/concepts/futurist/NewsPage";
import EditorialInsights from "@/concepts/editorial/InsightsPage";

export default function NewsPage() {
  return <ConceptShell stoic={<StoicNews />} modern={<ModernNews />} futurist={<FuturistNews />} editorial={<EditorialInsights />} />;
}
