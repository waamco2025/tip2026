import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const articles = [
  {
    slug: "nomad-health-2m-users",
    date: "February 5, 2026",
    title: "Portfolio Spotlight: Nomad Health Surpasses 2M Users",
    excerpt:
      "Nomad Health, a Thayer-backed digital health platform for travelers, has crossed the two million user milestone. The platform provides seamless access to telemedicine and travel insurance across 140 countries.",
  },
  {
    slug: "sustainable-aviation-analysis",
    date: "January 22, 2026",
    title: "The Future of Sustainable Aviation: An Industry Analysis",
    excerpt:
      "Our latest industry report examines the emerging technologies and policy shifts driving sustainable aviation forward. From SAF adoption to electric regional aircraft, the next decade promises transformative change.",
  },
  {
    slug: "sarah-chen-forbes",
    date: "January 8, 2026",
    title: "Thayer Partner Sarah Chen Named to Forbes Midas List",
    excerpt:
      "Managing Partner Sarah Chen has been recognized on the 2026 Forbes Midas List for her track record of early-stage investments in travel technology. Chen has led investments totaling over $200M in portfolio value.",
  },
  {
    slug: "luxestay-30m-round",
    date: "December 12, 2025",
    title: "Thayer Participates in $30M Round for LuxeStay Hospitality",
    excerpt:
      "Thayer has joined a consortium of investors in a $30 million growth round for LuxeStay, a premium short-term rental management platform. The investment will fuel expansion into European and Asian markets.",
  },
  {
    slug: "ai-corporate-travel",
    date: "November 19, 2025",
    title: "How AI Is Reshaping Corporate Travel Management",
    excerpt:
      "In this analysis, we explore how artificial intelligence is fundamentally changing the corporate travel landscape. From predictive booking to automated expense reconciliation, the opportunities are vast.",
  },
  {
    slug: "q3-2025-review",
    date: "October 3, 2025",
    title: "Q3 2025 Travel Tech Market Review",
    excerpt:
      "Our quarterly review highlights key trends in travel technology venture funding, notable exits, and emerging segments. Total sector investment reached $4.2B in Q3, marking a 28% year-over-year increase.",
  },
  {
    slug: "new-150m-fund",
    date: "August 27, 2025",
    title: "Thayer Announces New $150M Fund Focused on Travel Innovation",
    excerpt:
      "Thayer Investment Partners has closed its third flagship fund at $150 million, dedicated to early and growth-stage companies transforming the global travel and hospitality ecosystem.",
  },
];

export default function StoicNews() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="flex flex-col items-center gap-4 px-14 py-20">
        <h1 className="font-playfair text-[52px]">News & Insights</h1>
        <p className="text-thayer-text-secondary text-lg leading-[1.5] text-center max-w-[700px]">
          The latest from Thayer Investment Partners — announcements, analysis,
          and perspectives on the future of travel and technology.
        </p>
        <div className="w-[60px] h-0.5 bg-thayer-gold" />
      </section>

      {/* Featured Article */}
      <section className="bg-thayer-surface flex gap-12 px-14 py-10">
        <div className="w-[640px] h-[400px] shrink-0 bg-thayer-navy-light rounded-sm" />
        <div className="flex flex-col justify-center gap-5">
          <div className="flex items-center gap-3">
            <span className="text-thayer-gold font-semibold text-[11px] tracking-[1px]">
              FEATURED
            </span>
            <span className="text-thayer-text-secondary text-xs">
              February 18, 2026
            </span>
          </div>
          <h2 className="font-playfair text-[32px] leading-[1.3]">
            Thayer Leads $45M Series B in TravelAI Platform
          </h2>
          <p className="text-thayer-text-secondary text-sm leading-relaxed">
            Thayer Investment Partners announced today that it has led a $45
            million Series B funding round in TravelAI, a next-generation
            platform leveraging artificial intelligence to transform how
            travelers plan, book, and experience journeys worldwide.
          </p>
          <Link
            href="/news/thayer-travelai-series-b"
            className="text-thayer-gold text-[13px] font-medium hover:underline"
          >
            Read Full Article →
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-thayer-border" />

      {/* Article List */}
      <section className="px-14 py-10 flex flex-col">
        <h2 className="font-playfair text-[28px] mb-8">Recent Articles</h2>
        {articles.map((article, i) => (
          <div
            key={i}
            className={`flex flex-col gap-2.5 py-7 ${
              i < articles.length - 1 ? "border-b border-thayer-border" : ""
            }`}
          >
            <span className="text-thayer-text-muted text-xs">
              {article.date}
            </span>
            <h3 className="font-playfair text-xl">{article.title}</h3>
            <p className="text-thayer-text-secondary text-sm leading-relaxed">
              {article.excerpt}
            </p>
            <Link
              href={`/news/${article.slug}`}
              className="text-thayer-gold text-[13px] font-medium hover:underline"
            >
              Read More →
            </Link>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
