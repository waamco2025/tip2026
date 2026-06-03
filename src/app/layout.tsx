import type { Metadata } from "next";
import "./globals.css";
import { EditorialModeProvider } from "@/concepts/editorial/EditorialModeContext";
import { NavigationOverlayProvider } from "@/concepts/editorial/NavigationOverlay";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  // metadataBase makes every relative canonical/OG URL resolve to the production
  // host, so canonical tags point at the real domain even when served from the
  // Netlify preview — that's what stops the preview competing in search.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Syne:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <EditorialModeProvider>
          <NavigationOverlayProvider>
            {children}
          </NavigationOverlayProvider>
        </EditorialModeProvider>
      </body>
    </html>
  );
}
