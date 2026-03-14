import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const articleContent = {
  title: "Thayer Leads $45M Series B in TravelAI Platform",
  date: "February 18, 2026",
  category: "INVESTMENT",
  lede: "Thayer Investment Partners announced today that it has led a $45 million Series B funding round in TravelAI, a next-generation platform leveraging artificial intelligence to transform how travelers plan, book, and experience journeys worldwide.",
  paragraphs: [
    'NEW YORK — Thayer Investment Partners, a venture capital firm focused exclusively on travel and hospitality technology, announced today that it has led a $45 million Series B funding round in TravelAI, a platform using artificial intelligence to reimagine the end-to-end travel experience.',
    'The round also included participation from existing investors Sequoia Capital and Accel Partners. TravelAI plans to use the new capital to expand its engineering team, accelerate product development, and enter new international markets across Europe and Asia-Pacific.',
    '"TravelAI represents exactly the kind of transformative technology we look for at Thayer," said Chris Hemmeter, Managing Partner at Thayer Investment Partners. "Their platform has demonstrated remarkable traction, and we believe AI-powered personalization will fundamentally reshape how consumers interact with the travel industry."',
    "Founded in 2022, TravelAI has built a proprietary recommendation engine that processes billions of data points to deliver hyper-personalized travel itineraries. The platform currently serves over 500,000 monthly active users and partners with more than 200 airlines, hotel chains, and experience providers globally.",
    '"This investment from Thayer validates our vision of making world-class travel accessible to everyone through intelligent technology," said TravelAI CEO Maria Santos. "Their deep expertise in travel technology and extensive industry network make them the ideal partner for our next phase of growth."',
    "The Series B brings TravelAI's total funding to $72 million. The company expects to reach profitability by Q4 2027 and is targeting $100 million in annual recurring revenue within the next 18 months.",
  ],
};

const relatedArticles = [
  {
    date: "February 5, 2026",
    title: "Portfolio Spotlight: Nomad Health Surpasses 2M Users",
    excerpt:
      "Nomad Health, a Thayer-backed digital health platform for travelers, has crossed the two million user milestone across 140 countries.",
  },
  {
    date: "January 22, 2026",
    title: "The Future of Sustainable Aviation: An Industry Analysis",
    excerpt:
      "Our latest industry report examines the emerging technologies and policy shifts driving sustainable aviation forward over the next decade.",
  },
  {
    date: "January 8, 2026",
    title: "Thayer Partner Sarah Chen Named to Forbes Midas List",
    excerpt:
      "Managing Partner Sarah Chen has been recognized on the 2026 Forbes Midas List for her track record of early-stage investments in travel technology.",
  },
];

export default function StoicArticle() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Article Header */}
      <section className="px-14 pt-12 flex flex-col gap-4">
        <Link
          href="/news"
          className="text-thayer-gold text-[13px] font-medium hover:underline"
        >
          ← Back to All News
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-thayer-text-muted text-xs">
            {articleContent.date}
          </span>
          <div className="w-1 h-1 rounded-full bg-thayer-text-muted" />
          <span className="text-thayer-gold font-semibold text-xs tracking-[1px]">
            {articleContent.category}
          </span>
        </div>
        <h1 className="font-playfair text-[42px] leading-[1.2]">
          {articleContent.title}
        </h1>
        <p className="text-thayer-text-secondary text-lg leading-relaxed">
          {articleContent.lede}
        </p>
      </section>

      {/* Hero Image */}
      <div className="px-14 py-8">
        <div className="w-full h-[500px] bg-thayer-navy-light rounded" />
      </div>

      {/* Article Body */}
      <section className="flex justify-center px-14">
        <div className="max-w-[800px] flex flex-col gap-6 py-12">
          {articleContent.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-thayer-text-secondary text-[15px] leading-[1.8]"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Related Articles */}
      <section className="px-14 py-14 border-t border-thayer-border flex flex-col gap-8">
        <h2 className="font-playfair text-[28px]">More News & Insights</h2>
        <div className="flex gap-6">
          {relatedArticles.map((article, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col gap-4 bg-thayer-surface border border-thayer-border p-6"
            >
              <span className="text-thayer-text-muted text-xs">
                {article.date}
              </span>
              <h3 className="font-playfair text-lg leading-[1.3]">
                {article.title}
              </h3>
              <p className="text-thayer-text-secondary text-[13px] leading-relaxed">
                {article.excerpt}
              </p>
              <span className="text-thayer-gold text-[13px] font-medium cursor-pointer hover:underline">
                Read More →
              </span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
