import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Building2, Sparkles, Ship, Landmark, Car } from "lucide-react";

const categories = [
  {
    icon: Building2,
    name: "Hotels &\nRestaurants",
    desc: "Hospitality tech platforms transforming guest experiences",
  },
  {
    icon: Sparkles,
    name: "Entertainment &\nExperiences",
    desc: "Immersive technologies redefining leisure and discovery",
  },
  {
    icon: Ship,
    name: "Cruises &\nAirlines",
    desc: "Next-generation solutions for air and sea transportation",
  },
  {
    icon: Landmark,
    name: "Real\nEstate",
    desc: "PropTech innovations in hospitality real estate",
  },
  {
    icon: Car,
    name: "Ground\nTransportation",
    desc: "Mobility platforms connecting travelers seamlessly",
  },
];

const testimonials = [
  {
    quote:
      '"Thayer is a trusted co-pilot helping entrepreneurs navigate the complex landscape in the travel industry"',
    name: "Matthijs Welle",
    title: "CEO, Mews",
  },
  {
    quote:
      '"Thayer is a trusted co-pilot helping entrepreneurs navigate the complex landscape in the travel industry"',
    name: "Med Benmansour",
    title: "CEO, Nuitée",
  },
  {
    quote:
      '"Thayer is a trusted co-pilot helping entrepreneurs navigate the complex landscape in the travel industry"',
    name: "Bo Davis",
    title: "CEO, MarginEdge",
  },
];

const newsItems = [
  {
    title:
      "Thayer Leads $200M Series C in CloudHotel, Advancing AI-Powered Hospitality",
    excerpt:
      "The investment will accelerate CloudHotel's expansion into European and Asian markets, bringing intelligent property management to over 10,000 hotels worldwide.",
    date: "Mar 5, 2026",
  },
  {
    title:
      "Portfolio Company TripAI Acquires European Competitor for $85M",
    excerpt:
      "The strategic acquisition strengthens TripAI's position as the leading AI-driven travel recommendation engine, adding 15 million active users across 12 European markets.",
    date: "Feb 18, 2026",
  },
  {
    title:
      "Thayer Partners Named Top Travel & Hospitality VC Firm for Third Consecutive Year",
    excerpt:
      "Industry publication TravelTech Weekly recognizes Thayer's consistent track record in identifying and nurturing breakout companies in the travel technology sector.",
    date: "Jan 30, 2026",
  },
];

export default function StoicHome() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center gap-8 py-0 px-6 md:px-14 h-[500px] md:h-[700px] bg-thayer-bg">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1768438194652-651b5a6d9580?w=1080')] bg-cover bg-center opacity-25" />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <span className="text-thayer-gold font-semibold text-xs tracking-[1px]">
            PIONEERS IN TRAVEL TECHNOLOGY VENTURE CAPITAL
          </span>
          <h1 className="font-playfair text-[32px] md:text-[64px] leading-[1.15] text-center max-w-[900px]">
            Investing in the Future{"\n"}of Global Travel
          </h1>
          <p className="text-white text-base leading-relaxed text-center max-w-full md:max-w-[700px]">
            We partner with visionary founders building transformative technology
            {"\n"}for the world&apos;s largest and most dynamic industry.
          </p>
          <Link
            href="/portfolio"
            className="bg-thayer-gold text-thayer-bg font-semibold text-xs tracking-[1px] px-8 py-3.5 hover:bg-thayer-gold-dim transition-colors"
          >
            EXPLORE OUR PORTFOLIO
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-thayer-surface border-y border-thayer-border px-6 md:px-14 py-12 md:py-20 flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-3 w-full">
          <span className="text-thayer-gold font-semibold text-xs tracking-[1px]">
            WHAT OUR PARTNERS SAY
          </span>
          <h2 className="font-playfair text-2xl md:text-4xl text-center">
            Trusted by Industry Leaders
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col gap-5 p-7 border border-thayer-border"
            >
              <p className="text-thayer-text-secondary text-sm leading-relaxed">
                {t.quote}
              </p>
              <div className="flex flex-col gap-0.5">
                <span className="text-thayer-text text-[13px] font-medium">
                  {t.name}
                </span>
                <span className="text-thayer-gold text-xs">{t.title}</span>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/portfolio"
          className="text-thayer-gold text-[13px] font-medium hover:underline"
        >
          View Full Portfolio →
        </Link>
      </section>

      {/* Parallax Banner 1 */}
      <section className="relative h-[250px] md:h-[360px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1768438194652-651b5a6d9580?w=1080')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-thayer-bg/[0.88] via-thayer-bg/25 to-thayer-bg/[0.88]" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
          <div className="w-[60px] h-0.5 bg-thayer-gold" />
          <h2 className="font-playfair text-[32px]">
            Where Technology Meets Exploration
          </h2>
        </div>
      </section>

      {/* Opportunity */}
      <section className="bg-thayer-bg px-6 md:px-14 py-12 md:py-20 flex flex-col items-center gap-12">
        <span className="text-thayer-gold font-semibold text-xs tracking-[1px]">
          THE OPPORTUNITY
        </span>
        <h2 className="font-playfair text-[48px] md:text-[96px]">$15 Trillion</h2>
        <h3 className="font-playfair text-[28px] text-thayer-text-secondary">
          The Global Travel Industry
        </h3>
        <p className="text-thayer-text-secondary text-[15px] leading-[1.7] text-center max-w-full md:max-w-[800px]">
          Travel and tourism represents one of the world&apos;s largest economic
          sectors, contributing over 10% of global GDP. Technology is
          fundamentally reshaping how people discover, book, experience, and
          share travel — creating unprecedented opportunities for innovation and
          value creation.
        </p>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center w-full">
          {[
            {
              val: "1.4B",
              label: "International Tourist\nArrivals Annually",
            },
            {
              val: "23%",
              label: "Digital Booking\nPenetration Growth",
            },
            { val: "$2.1T", label: "Travel Tech\nMarket by 2030" },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 border border-thayer-border px-5 py-7 w-full md:w-60"
            >
              <span className="font-playfair text-2xl md:text-4xl text-thayer-gold">
                {s.val}
              </span>
              <span className="text-thayer-text-secondary text-xs leading-[1.5] text-center whitespace-pre-line">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Investment Categories */}
      <section className="bg-thayer-surface border-y border-thayer-border px-6 md:px-14 py-12 md:py-20 flex flex-col items-center gap-12">
        <span className="text-thayer-gold font-semibold text-xs tracking-[1px]">
          INVESTMENT FOCUS
        </span>
        <h2 className="font-playfair text-2xl md:text-4xl">Our Investment Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 w-full">
          {categories.map((c, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-4 p-6 border border-thayer-border"
            >
              <c.icon className="w-7 h-7 text-thayer-gold" />
              <h3 className="font-playfair text-base leading-[1.3] text-center whitespace-pre-line">
                {c.name}
              </h3>
              <p className="text-thayer-text-secondary text-xs leading-[1.5] text-center text-balance">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Network */}
      <section className="bg-thayer-bg px-6 md:px-14 py-12 md:py-20 flex flex-col items-center gap-12">
        <span className="text-thayer-gold font-semibold text-xs tracking-[1px]">
          OUR NETWORK
        </span>
        <h2 className="font-playfair text-2xl md:text-4xl">A Powerful Network</h2>
        <p className="text-thayer-text-secondary text-[15px] leading-relaxed text-center max-w-full md:max-w-[700px]">
          A network of investors, advisors, and portfolio companies serving the
          global travel industry.
        </p>
        <div className="flex flex-col gap-5 w-full max-w-[900px]">
          {[0, 1].map((row) => (
            <div key={row} className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {[0, 1, 2].map((col) => (
                <div
                  key={col}
                  className="flex-1 h-[120px] border border-thayer-border flex items-center justify-center"
                >
                  <span className="text-thayer-text-muted text-[10px] font-medium tracking-wider">LOGO</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Parallax Banner 2 */}
      <section className="relative h-[250px] md:h-[340px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635979238851-6ebe864aa0ec?w=1080')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-thayer-bg/[0.88] via-thayer-bg/20 to-thayer-bg/[0.88]" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 backdrop-blur-sm">
          <div className="w-[60px] h-0.5 bg-thayer-gold" />
          <h2 className="font-playfair text-2xl md:text-4xl leading-[1.3] text-center max-w-full md:max-w-[700px] px-6">
            Connecting Capital to the World&apos;s{"\n"}Greatest Journeys
          </h2>
          <p className="text-thayer-text-secondary text-sm text-center max-w-[600px]">
            The preeminent name in travel technology since 2008.
          </p>
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-thayer-surface border-y border-thayer-border px-6 md:px-14 py-12 md:py-20 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
          <div className="flex flex-col gap-3">
            <span className="text-thayer-gold font-semibold text-xs tracking-[1px]">
              LATEST NEWS
            </span>
            <h2 className="font-playfair text-2xl md:text-4xl">Recent Headlines</h2>
          </div>
          <Link
            href="/news"
            className="text-thayer-gold text-[13px] font-medium hover:underline"
          >
            View All News →
          </Link>
        </div>
        <div className="flex flex-col">
          {newsItems.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row justify-between py-6 gap-2 ${
                i < newsItems.length - 1 ? "border-b border-thayer-border" : ""
              }`}
            >
              <div className="flex flex-col gap-2 max-w-[900px]">
                <h3 className="font-playfair text-lg">{item.title}</h3>
                <p className="text-thayer-text-secondary text-[13px] leading-[1.5]">
                  {item.excerpt}
                </p>
              </div>
              <span className="text-thayer-text-muted text-xs whitespace-nowrap ml-0 md:ml-8">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
