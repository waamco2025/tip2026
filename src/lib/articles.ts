import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Article, ArticleBlock, InlineSpan, KeyFigure } from "./article-types";

const INSIGHTS_DIR = path.join(process.cwd(), "src", "content", "insights");

function parseInline(text: string): InlineSpan[] {
  const spans: InlineSpan[] = [];
  const re = /\*([^*]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) spans.push({ text: text.slice(last, m.index) });
    spans.push({ text: m[1], italic: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) spans.push({ text: text.slice(last) });
  return spans;
}

function parseBlocks(body: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  const paragraphs = body.trim().split(/\n\s*\n/);

  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith(">")) {
      const lines = trimmed
        .split("\n")
        .map((l) => l.replace(/^>\s?/, ""))
        .filter((l) => l.length > 0);

      const attrIdx = lines.findIndex((l) => /^[—–-]\s/.test(l));
      let quoteLines: string[];
      let attribution: string | undefined;

      if (attrIdx >= 0) {
        quoteLines = lines.slice(0, attrIdx);
        attribution = lines[attrIdx].replace(/^[—–-]\s*/, "").trim();
      } else {
        quoteLines = lines;
      }

      const quoteText = quoteLines.join(" ").replace(/^["“”](.*)["“”]$/, "$1");
      blocks.push({
        type: "blockquote",
        spans: parseInline(quoteText),
        attribution,
      });
    } else {
      blocks.push({
        type: "paragraph",
        spans: parseInline(trimmed.replace(/\n/g, " ")),
      });
    }
  }
  return blocks;
}

function toArticle(fileName: string): Article {
  const raw = fs.readFileSync(path.join(INSIGHTS_DIR, fileName), "utf-8");
  const { data, content } = matter(raw);
  const slug = (data.slug as string) ?? fileName.replace(/\.md$/, "");
  return {
    slug,
    title: data.title as string,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    category: data.category as string,
    subhead: data.subhead as string,
    keyFigures: (data.key_figures as KeyFigure[]) ?? [],
    heroImage: localHeroFor(slug),
    heroImageAlt: (data.hero_image_alt as string) ?? "",
    sourceUrl: (data.source_url as string) ?? "",
    blocks: parseBlocks(content),
  };
}

function localHeroFor(slug: string): string {
  const dir = path.join(process.cwd(), "public", "insights", "hero");
  if (!fs.existsSync(dir)) return "";
  const match = fs.readdirSync(dir).find((f) => f.startsWith(`${slug}.`));
  return match ? `/insights/hero/${match}` : "";
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(INSIGHTS_DIR)) return [];
  return fs
    .readdirSync(INSIGHTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(toArticle)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
  return getAllArticles().find((a) => a.slug === slug) ?? null;
}
