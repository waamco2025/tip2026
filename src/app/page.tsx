import ConceptShell from "@/components/ConceptShell";
import StoicHome from "@/concepts/stoic/HomePage";
import ModernHome from "@/concepts/modern/HomePage";
import FuturistHome from "@/concepts/futurist/HomePage";
import EditorialHome from "@/concepts/editorial/HomePage";

export default function Home() {
  return <ConceptShell stoic={<StoicHome />} modern={<ModernHome />} futurist={<FuturistHome />} editorial={<EditorialHome />} />;
}
