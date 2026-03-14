import Link from "next/link";
import { ModernNav, ModernFooter } from "./AboutPage";

const relatedArticles = [
  { tag: "STRATEGY", title: "Beyond the Booking: Understanding Travel's Data Revolution", img: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=600&q=80" },
  { tag: "INNOVATION", title: "Intelligent Power: How AI Is Transforming Hotel Energy Management", img: "https://images.unsplash.com/photo-1681263780297-2a85d64edade?w=600&q=80" },
  { tag: "EDITORIAL", title: "Europe's Market Expansion: New Frontiers in Travel Technology", img: "https://images.unsplash.com/photo-1771694331073-8da859d9d208?w=600&q=80" },
];

export default function ModernArticle() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ModernNav active="Insights" />

      {/* Article Header */}
      <section className="bg-[#0D2818] px-6 md:px-14 pt-14 pb-12 flex flex-col gap-5">
        <span className="text-[#C9A962] font-semibold text-[11px] tracking-[2px]">VIDEO</span>
        <h1 className="font-playfair text-[28px] md:text-[44px] italic font-semibold text-white leading-[1.15] max-w-[800px]">Thayer Managing Partner Speaks with TravelAI About Their Future Vision</h1>
        <span className="text-white/50 text-[13px]">By Thayer Staff  •  January 17, 2026</span>
      </section>

      {/* Hero Image */}
      <div className="px-6 md:px-14 py-8">
        <div className="w-full h-[250px] md:h-[500px] bg-cover bg-center rounded" style={{ backgroundImage: "url('/images/modern-article-hero.png')" }} />
      </div>

      {/* Article Body */}
      <section className="flex justify-center px-6 md:px-14">
        <div className="max-w-[800px] flex flex-col gap-6 py-8 pb-12">
          {[
            "Chris Hemmeter, Managing Partner of Thayer Investment Partners, sat down with Michael Torres, CEO of TravelAI, last week to discuss the company's ambitious vision for transforming global travel through artificial intelligence.",
            "It was a pleasure to have Thayer Investment Partners' Managing Partner and TravelAI's founder, Michael Torres, in an event with Chris to discuss his vision for transformative technology reshaping the travel industry since 2019 and the exciting future ahead.",
            'The discussion centered around TravelAI\'s groundbreaking approach to personalization — using machine learning algorithms to understand traveler preferences at a deeper level than traditional booking platforms. "We\'re not just recommending destinations," Torres explained. "We\'re understanding the emotional journey that travelers seek."',
            'Hemmeter emphasized the strategic importance of this investment within Thayer\'s broader portfolio thesis: "Travel technology sits at the intersection of multiple transformative trends — AI, mobile-first experiences, sustainability, and the growing demand for authentic local experiences."',
            "Looking ahead, Torres outlined plans to expand TravelAI's capabilities into predictive travel planning, real-time itinerary optimization, and seamless integration with transportation and hospitality partners worldwide. The $45 million Series B funding will accelerate these initiatives.",
          ].map((p, i) => (
            <p key={i} className="text-[#333] text-base leading-[1.8]">{p}</p>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="px-6 md:px-14 py-12 border-t border-[#E5E5E5] flex flex-col gap-8">
        <span className="text-[#999] font-semibold text-[11px] tracking-[2px]">RELATED CONTENT</span>
        <div className="flex flex-col md:flex-row gap-6">
          {relatedArticles.map((a, i) => (
            <div key={i} className="flex-1 flex flex-col gap-3">
              <div className="h-[200px] bg-cover bg-center" style={{ backgroundImage: `url('${a.img}')` }} />
              <span className="text-[#C9A962] font-semibold text-[10px] tracking-[1.5px]">{a.tag}</span>
              <h3 className="font-playfair text-lg italic font-semibold text-[#1A1A1A] leading-[1.25]">{a.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <ModernFooter />
    </div>
  );
}
