import ConceptShell from "@/components/ConceptShell";
import StoicArticle from "@/concepts/stoic/ArticlePage";
import ModernArticle from "@/concepts/modern/ArticlePage";
import FuturistArticle from "@/concepts/futurist/ArticlePage";

export default function ArticlePage() {
  return <ConceptShell stoic={<StoicArticle />} modern={<ModernArticle />} futurist={<FuturistArticle />} />;
}
