import EditorialInsights from "@/concepts/editorial/InsightsPage";
import { getAllArticles } from "@/lib/articles";

export default function NewsPage() {
  const articles = getAllArticles();
  return <EditorialInsights articles={articles} />;
}
