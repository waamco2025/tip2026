import type { Metadata } from "next";
import EditorialInsights from "@/concepts/editorial/InsightsPage";
import { getAllArticles } from "@/lib/articles";

const title = "Insights";
const description =
  "Perspectives on the future of travel and technology — news, research, and commentary from Thayer Investment Partners and our portfolio companies.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/news" },
  openGraph: { title, description, url: "/news" },
  twitter: { title, description },
};

export default function NewsPage() {
  const articles = getAllArticles();
  return <EditorialInsights articles={articles} />;
}
