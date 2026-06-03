import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EditorialArticle from "@/concepts/editorial/ArticlePage";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const url = `/news/${slug}`;
  const images = article.heroImage ? [article.heroImage] : undefined;
  return {
    title: article.title,
    description: article.subhead,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.subhead,
      url,
      publishedTime: article.date,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.subhead,
      images,
    },
  };
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

  // Article structured data for rich results in search.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.subhead,
    datePublished: article.date,
    articleSection: article.category,
    ...(article.heroImage ? { image: `${SITE_URL}${article.heroImage}` } : {}),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logotype-dark.svg` },
    },
    mainEntityOfPage: `${SITE_URL}/news/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <EditorialArticle article={article} prev={prev} next={next} related={related} />
    </>
  );
}
