import type { Metadata } from "next";
import "./globals.css";
import { EditorialModeProvider } from "@/concepts/editorial/EditorialModeContext";

export const metadata: Metadata = {
  title: "Thayer Investment Partners",
  description: "Pioneers in travel technology venture capital",
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
          {children}
        </EditorialModeProvider>
      </body>
    </html>
  );
}
