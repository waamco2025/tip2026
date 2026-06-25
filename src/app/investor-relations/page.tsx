import type { Metadata } from "next";
import EditorialInvestorRelations from "@/concepts/editorial/InvestorRelationsPage";

const title = "Investor Relations";
const description =
  "Investor relations for Thayer Investment Partners — fund reporting, operations, and contacts for our limited partners.";

export const metadata: Metadata = {
  title,
  description,
  // De-listed: the live nav/footer link investors to the external portal, so this
  // page is kept reachable by direct URL but kept out of search and the sitemap.
  robots: { index: false, follow: false },
  alternates: { canonical: "/investor-relations" },
  openGraph: { title, description, url: "/investor-relations" },
  twitter: { title, description },
};

export default function InvestorRelationsPage() {
  return <EditorialInvestorRelations />;
}
