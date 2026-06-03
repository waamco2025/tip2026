import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

// Default social share card, applied site-wide unless a route overrides
// openGraph.images (article pages use their hero image). Rendered at build time
// via next/og — no external font fetch, so it can't break the build.
export const alt = `${SITE_NAME} — investing in the entrepreneurs shaping the global travel industry`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f1a14",
          padding: "80px",
          color: "#f0f5f2",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#2E9D55",
            fontFamily: "sans-serif",
          }}
        >
          Thayer Investment Partners
        </div>
        <div style={{ display: "flex", fontSize: 64, lineHeight: 1.15, fontStyle: "italic", maxWidth: 980 }}>
          Investing in the entrepreneurs shaping the global travel industry.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(240,245,242,0.6)",
            fontFamily: "sans-serif",
          }}
        >
          Pioneers in Travel Technology · Est. 2008
        </div>
      </div>
    ),
    { ...size }
  );
}
