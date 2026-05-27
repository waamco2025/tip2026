import EditorialAbout from "@/concepts/editorial/AboutPage";
import { getAllArticles } from "@/lib/articles";

export default function AboutPage() {
  const articles = getAllArticles();
  return <EditorialAbout articles={articles} />;
}
