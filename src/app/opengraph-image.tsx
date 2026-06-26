import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

// Default social share card, applied site-wide unless a route overrides
// openGraph.images (article pages use their hero image). Matches the live
// editorial design: cream ground, green eyebrow, Cormorant Garamond italic
// headline, Syne labels. Fonts are bundled locally (src/app/_fonts) and read
// from disk at build time — no external fetch, so the build stays
// self-contained. (fs.readFile, not fetch(import.meta.url), which Turbopack
// doesn't implement.)
export const alt = `${SITE_NAME} — investing in the entrepreneurs shaping the global travel industry`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // Static instances (Satori can't render variable fonts) — see src/app/_fonts.
  const fontDir = join(process.cwd(), "src/app/_fonts");
  const [cormorant, syne] = await Promise.all([
    readFile(join(fontDir, "Cormorant-Italic-500.ttf")),
    readFile(join(fontDir, "Syne-600.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F4F1EC",
          padding: "78px 88px",
          color: "#1A1917",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Syne",
            fontSize: 27,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#1F6B3A",
          }}
        >
          Thayer Investment Partners
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Cormorant",
            fontStyle: "italic",
            fontSize: 68,
            lineHeight: 1.12,
            maxWidth: 1000,
            color: "#1A1917",
          }}
        >
          Investing in the entrepreneurs shaping the global travel industry.
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Syne",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#4A4338",
          }}
        >
          Pioneers in Travel Technology · Est. 2008
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: cormorant, style: "italic", weight: 500 },
        { name: "Syne", data: syne, style: "normal", weight: 600 },
      ],
    }
  );
}
