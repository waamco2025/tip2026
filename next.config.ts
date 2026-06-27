import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // The Insights section lives at /news (the nav just labels it "Insights").
  // Redirect the label-matching path so thayer.vc/insights resolves too.
  async redirects() {
    return [
      { source: "/insights", destination: "/news", permanent: true },
      { source: "/insights/:slug", destination: "/news/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
