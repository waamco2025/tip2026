import ConceptShell from "@/components/ConceptShell";
import StoicArticle from "@/concepts/stoic/ArticlePage";
import ModernArticle from "@/concepts/modern/ArticlePage";
import FuturistArticle from "@/concepts/futurist/ArticlePage";
import EditorialArticle from "@/concepts/editorial/ArticlePage";

export default function ArticlePage() {
  return <ConceptShell stoic={<StoicArticle />} modern={<ModernArticle />} futurist={<FuturistArticle />} editorial={<EditorialArticle />} />;
}
