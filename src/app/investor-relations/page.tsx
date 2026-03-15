import ConceptShell from "@/components/ConceptShell";
import StoicInvestorRelations from "@/concepts/stoic/InvestorRelationsPage";
import ModernInvestorRelations from "@/concepts/modern/InvestorRelationsPage";
import FuturistInvestorRelations from "@/concepts/futurist/InvestorRelationsPage";
import EditorialInvestorRelations from "@/concepts/editorial/InvestorRelationsPage";

export default function InvestorRelationsPage() {
  return <ConceptShell stoic={<StoicInvestorRelations />} modern={<ModernInvestorRelations />} futurist={<FuturistInvestorRelations />} editorial={<EditorialInvestorRelations />} />;
}
