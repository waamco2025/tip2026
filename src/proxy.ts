import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Tell crawlers not to index any non-production host (Netlify preview/branch
// deploys served from *.netlify.app). The real domain has no such header, so
// only it gets indexed — this plus the canonical tags keeps the preview from
// competing with the production site in search results.
export function proxy(request: NextRequest) {
  const res = NextResponse.next();
  const host = request.headers.get("host") ?? "";
  if (host.endsWith(".netlify.app")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return res;
}

export const config = {
  // Skip Next internals and files with an extension (static assets).
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
