import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export interface Block {
  type: "heading" | "text" | "image";
  level?: number;
  text?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface PageData {
  slug: string;
  title: string;
  // Optional explicit SEO overrides. When set, take precedence over the
  // bare `title` and the auto-extracted description in generateMetadata.
  // Use this to rescue underperforming pages (low CTR, weak default
  // descriptions) without rewriting body copy.
  seo?: {
    title?: string;
    description?: string;
  };
  blocks: Block[];
  faqs?: FAQItem[];
}

function Heading({ level, text }: { level: number; text: string }) {
  const cls = {
    1: "text-4xl md:text-5xl font-bold text-gray-900 mb-6 mt-8",
    2: "text-3xl md:text-4xl font-bold text-gray-900 mb-5 mt-12",
    3: "text-2xl md:text-3xl font-semibold text-gray-900 mb-4 mt-10",
    4: "text-xl md:text-2xl font-semibold text-gray-900 mb-3 mt-8",
    5: "text-lg font-semibold text-gray-800 mb-2 mt-6",
    6: "text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2 mt-6",
  }[level] || "text-xl font-semibold";

  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  return <Tag className={cls}>{text}</Tag>;
}

// Inline markdown-style links: [anchor](href). Internal hrefs (starting with
// "/") render as Next <Link> for client-side nav + crawlable internal links;
// external hrefs render as <a rel="noopener noreferrer">. Text without the
// pattern renders unchanged (no content currently uses it), so this is
// backward-compatible with every existing block.
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderInline(text: string): ReactNode {
  if (!text.includes("](")) return text;
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const [, label, href] = m;
    if (href.startsWith("/")) {
      nodes.push(
        <Link key={key++} href={href} className="text-blue-600 underline hover:text-blue-700 font-medium">
          {label}
        </Link>
      );
    } else {
      nodes.push(
        <a key={key++} href={href} className="text-blue-600 underline hover:text-blue-700 font-medium" rel="noopener noreferrer">
          {label}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function TextBlock({ text }: { text: string }) {
  if (text.startsWith("• ")) {
    return (
      <p className="text-base text-gray-700 leading-relaxed mb-2 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-500">
        {renderInline(text.slice(2))}
      </p>
    );
  }
  return (
    <p className="text-base text-gray-700 leading-relaxed mb-4">
      {renderInline(text)}
    </p>
  );
}

function ImageBlock({ src, alt, width, height }: { src: string; alt: string; width?: number; height?: number }) {
  const w = width || 1200;
  const h = height || 800;

  return (
    <figure className="my-8 rounded-xl overflow-hidden bg-gray-100">
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        className="w-full h-auto"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        style={{ aspectRatio: `${w} / ${h}` }}
        placeholder="empty"
      />
      {alt && <figcaption className="sr-only">{alt}</figcaption>}
    </figure>
  );
}

export default function PageRenderer({ page }: { page: PageData }) {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
      <header className="mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          {page.title}
        </h1>
      </header>

      <div className="prose prose-lg max-w-none">
        {page.blocks.map((block, i) => {
          if (block.type === "heading" && block.text) {
            // Demote level=1 to level=2 — page.title is already the only h1
            const level = block.level === 1 ? 2 : block.level || 2;
            return <Heading key={i} level={level} text={block.text} />;
          }
          if (block.type === "text" && block.text) {
            return <TextBlock key={i} text={block.text} />;
          }
          if (block.type === "image" && block.src) {
            // Skip stale WordPress contact-form spinner SVG (404s on the new site)
            if (block.src.includes("wp-content/")) return null;
            return (
              <ImageBlock
                key={i}
                src={block.src}
                alt={block.alt || ""}
                width={block.width}
                height={block.height}
              />
            );
          }
          return null;
        })}
      </div>
    </article>
  );
}
