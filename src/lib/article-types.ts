export type KeyFigure = { value: string; label: string };

export type InlineSpan = { text: string; italic?: boolean };

export type ArticleBlock =
  | { type: "paragraph"; spans: InlineSpan[] }
  | { type: "blockquote"; spans: InlineSpan[]; attribution?: string };

export type Article = {
  slug: string;
  title: string;
  date: string;
  category: string;
  subhead: string;
  keyFigures: KeyFigure[];
  heroImage: string;
  heroImageAlt: string;
  sourceUrl: string;
  blocks: ArticleBlock[];
};

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}
