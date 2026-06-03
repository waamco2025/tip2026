import type { Metadata } from "next";
import EditorialAbout from "@/concepts/editorial/AboutPage";
import { getAllArticles } from "@/lib/articles";

const title = "About";
const description =
  "A history of innovation in travel. Since 2008, Thayer Investment Partners has partnered with visionary founders building companies that reshape how the world moves, stays, and experiences new places.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
  twitter: { title, description },
};

export default function AboutPage() {
  const articles = getAllArticles();
  return <EditorialAbout articles={articles} />;
}
