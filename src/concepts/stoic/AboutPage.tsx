import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const milestones = [
  {
    year: "2008",
    title: "The Origin of Thayer",
    desc: "Founded by Chris Hemmeter",
  },
  {
    year: "2012",
    title: "First Thayer Fund",
    desc: "Chris Hemmeter teams up with Lee Pillsbury to launch first Thayer Fund",
  },
  {
    year: "2018",
    title: "First Institutional Fund",
    desc: "Chris Hemmeter, Jeff Jackson, and Tyler Carrico launch first Institutional Thayer Fund",
  },
  {
    year: "2022",
    title: "Second Institutional Fund",
    desc: "Launch of second Institutional Thayer Fund",
  },
  {
    year: "2022",
    title: "First Derive Fund",
    desc: "Launch of first Derive Fund",
  },
];

const partners = [
  {
    name: "Chris Hemmeter",
    title: "Managing Partner",
    bio: "Chris Hemmeter co-founded Thayer Ventures, a venture capital platform investing in technology companies in the travel and mobility space. Prior to Thayer Ventures, Chris was founder and CEO of iCare Marketing (sold to Sysco Foodservice Corporation in 2012); founder and CEO of Dynamic Payment Ventures (sold to Elavon, a subsidiary of US Bank in 2007).",
  },
  {
    name: "Tyler Carrico",
    title: "Managing Partner",
    bio: "Tyler Carrico co-founded Derive Ventures in 2021 and currently serves as a Managing Partner. Prior to Derive, Tyler spent 4 years as an investment professional at Thayer Ventures, responsible for investment execution, diligence, sourcing, portfolio support, fund management, and LP advisory.",
  },
  {
    name: "Mike Scott",
    title: "Managing Partner",
    bio: "Mike Scott co-founded Derive Ventures in 2021 and currently serves as a Managing Partner. Prior to co-founding Derive, Mike spent over 3 years as a private equity investment professional at KSL Capital Partners with over $4bn of transaction experience.",
  },
];

const team = [
  {
    name: "Lee Pillsbury",
    title: "Co-Founder and Partner",
    bio: "After graduating from Cornell's School of Hotel Administration, Lee spent 19 years at Marriott, rising to become an Executive Vice President and head of Lodging Strategy and Corporate Officer. Lee left Marriott in 1988 to launch Thayer Lodging Group.",
  },
  {
    name: "Mark Farrell",
    title: "Venture Partner",
    bio: "Mark co-founded Thayer Ventures in 2009 and was involved in all aspects of the firm's growth as a Managing Director. Mark's background includes professional experience as an attorney at Wilson Sonsini Goodrich & Rosati and investment banker at Thomas Weisel Partners.",
  },
  {
    name: "Jeff Jackson",
    title: "Venture Partner",
    bio: "Jeff has spent the bulk of his career in executive roles within the transportation and distribution space. Based in Dallas, Jeff spent 14 years with American Airlines and 11 years at Sabre as Chief Financial Officer and EVP Corporate Development.",
  },
  {
    name: "David Brem",
    title: "Venture Partner",
    bio: "David Brem currently serves as a Venture Partner at Thayer Investment Partners. David earned his MBA from the Stephen M. Ross School of Business at the University of Michigan and previously worked in Commercial Strategy at American Airlines.",
  },
  {
    name: "Cara Whitehill",
    title: "Venture Partner",
    bio: "As a long-time operating exec, startup advisor, investor and road warrior, Cara is actively involved in numerous corners of the travel tech industry. She is a former leader at Expedia, Travelocity, Deem and venture-backed startup Traxo.",
  },
  {
    name: "Chelsea Salamone",
    title: "Vice President",
    bio: "Chelsea brings over a decade of expertise in the hospitality industry. Before joining TIP, she spent over 5 years at Standard International, aiding in the global expansion of the Standard and Bunkhouse hotels.",
  },
];

export default function StoicAbout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="flex flex-col items-center gap-6 px-14 py-24">
        <h1 className="font-playfair text-[56px] text-center">Who We Are</h1>
        <p className="text-thayer-text-secondary text-base leading-[1.7] text-center max-w-[720px]">
          Thayer Investment Partners is a leading investment firm dedicated
          exclusively to advancing the global travel industry. Since our founding
          in 2009, we have pioneered travel technology venture capital and
          continue to shape the future of this dynamic sector.
        </p>
        <div className="w-[60px] h-0.5 bg-thayer-gold" />
      </section>

      {/* Timeline */}
      <section className="bg-thayer-surface border-y border-thayer-border px-14 py-20 flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4 w-full">
          <span className="text-thayer-gold font-semibold text-xs tracking-[1px]">
            OUR JOURNEY
          </span>
          <h2 className="font-playfair text-4xl text-center">
            A History of Innovation in Travel
          </h2>
        </div>
        <div className="flex flex-col w-[700px]">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex flex-col items-center w-6">
                <div className="w-3 h-3 rounded-full bg-thayer-gold shrink-0" />
                {i < milestones.length - 1 && (
                  <div className="w-0.5 flex-1 bg-thayer-border" />
                )}
              </div>
              <div
                className={`flex flex-col gap-1.5 ${
                  i < milestones.length - 1 ? "pb-10" : ""
                }`}
              >
                <span className="text-thayer-gold text-[13px] font-semibold">
                  {m.year}
                </span>
                <h3 className="font-playfair text-[22px]">{m.title}</h3>
                <p className="text-thayer-text-secondary text-[15px] leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-thayer-border" />

      {/* Team */}
      <section className="px-14 py-16 flex flex-col gap-12">
        <h2 className="font-playfair text-[22px] text-thayer-gold">Team</h2>

        {/* Partners Row */}
        <div className="flex gap-6">
          {partners.map((p, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col bg-thayer-surface border border-thayer-border"
            >
              <div className="h-60 bg-thayer-navy-light" />
              <div className="flex flex-col gap-1.5 p-5">
                <h3 className="font-playfair text-base">{p.name}</h3>
                <span className="text-thayer-gold text-xs font-semibold">
                  {p.title}
                </span>
                <p className="text-thayer-text-secondary text-[13px] leading-[1.5] line-clamp-4 mt-1">
                  {p.bio}
                </p>
                <span className="text-thayer-gold text-[13px] font-medium mt-1 cursor-pointer hover:underline">
                  Read more +
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Team Rows */}
        <div className="flex gap-6">
          {team.slice(0, 3).map((t, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col bg-thayer-surface border border-thayer-border"
            >
              <div className="h-60 bg-thayer-navy-light" />
              <div className="flex flex-col gap-1.5 p-5">
                <h3 className="font-playfair text-base">{t.name}</h3>
                <span className="text-thayer-gold text-xs font-semibold">
                  {t.title}
                </span>
                <p className="text-thayer-text-secondary text-[13px] leading-[1.5] line-clamp-4 mt-1">
                  {t.bio}
                </p>
                <span className="text-thayer-gold text-[13px] font-medium mt-1 cursor-pointer hover:underline">
                  Read more +
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-6">
          {team.slice(3).map((t, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col bg-thayer-surface border border-thayer-border"
            >
              <div className="h-60 bg-thayer-navy-light" />
              <div className="flex flex-col gap-1.5 p-5">
                <h3 className="font-playfair text-base">{t.name}</h3>
                <span className="text-thayer-gold text-xs font-semibold">
                  {t.title}
                </span>
                <p className="text-thayer-text-secondary text-[13px] leading-[1.5] line-clamp-4 mt-1">
                  {t.bio}
                </p>
                <span className="text-thayer-gold text-[13px] font-medium mt-1 cursor-pointer hover:underline">
                  Read more +
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Divider */}
      <div className="h-px bg-thayer-border" />

      <Footer />
    </div>
  );
}
