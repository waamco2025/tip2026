import EditorialHome from "@/concepts/editorial/HomePage";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export default function Home() {
  const articles = getAllArticles();
  // Organization structured data — helps search engines build a knowledge panel
  // and associate the brand name, logo, and site.
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/logotype-dark.svg`,
    foundingDate: "2008",
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <EditorialHome articles={articles} />
    </>
  );
}
