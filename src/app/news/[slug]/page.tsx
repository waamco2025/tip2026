import { notFound } from "next/navigation";
import EditorialArticle from "@/concepts/editorial/ArticlePage";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const all = getAllArticles();
  const idx = all.findIndex((a) => a.slug === slug);
  const prev = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
  const next = idx > 0 ? all[idx - 1] : null;
  const related = all.filter((a) => a.slug !== slug).slice(0, 3);

  return <EditorialArticle article={article} prev={prev} next={next} related={related} />;
}
