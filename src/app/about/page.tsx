import ConceptShell from "@/components/ConceptShell";
import StoicAbout from "@/concepts/stoic/AboutPage";
import ModernAbout from "@/concepts/modern/AboutPage";
import FuturistAbout from "@/concepts/futurist/AboutPage";
import EditorialAbout from "@/concepts/editorial/AboutPage";

export default function AboutPage() {
  return <ConceptShell stoic={<StoicAbout />} modern={<ModernAbout />} futurist={<FuturistAbout />} editorial={<EditorialAbout />} />;
}
