import EditorialHome from "@/concepts/editorial/HomePage";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles();
  return <EditorialHome articles={articles} />;
}
