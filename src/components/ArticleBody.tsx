import type { ReactNode } from "react";

function parseInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[0].startsWith("**") && match[2]) {
      parts.push(<strong key={i}>{match[2]}</strong>);
    } else if (match[0].startsWith("*") && match[3]) {
      parts.push(<em key={i}>{match[3]}</em>);
    } else if (match[4] && match[5]) {
      parts.push(
        <a key={i} href={match[5]} rel="noreferrer">
          {match[4]}
        </a>,
      );
    } else {
      parts.push(match[0]);
    }
    i += 1;
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function ArticleBody({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  const blocks = content
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .filter((b) => b.trim());

  return (
    <div className={`article-prose ${className}`.trim()}>
      {blocks.map((block, i) => {
        const key = `${i}-${block.slice(0, 24)}`;
        const trimmed = block.trim();
        if (trimmed === "---") return <hr key={key} />;
        if (trimmed.startsWith("## ")) {
          return <h2 key={key}>{parseInline(trimmed.slice(3))}</h2>;
        }
        if (trimmed.startsWith("# ")) {
          return <h2 key={key}>{parseInline(trimmed.slice(2))}</h2>;
        }
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={key}>
              {parseInline(trimmed.replace(/^>\s?/gm, ""))}
            </blockquote>
          );
        }
        const img = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (img) {
          return (
            <img
              key={key}
              src={img[2]}
              alt={img[1]}
              className="my-4 w-full object-cover"
            />
          );
        }
        const lines = trimmed.split("\n").filter((l) => l.trim());
        if (lines.length > 0 && lines.every((l) => /^\s*[-*]\s+/.test(l))) {
          return (
            <ul key={key}>
              {lines.map((l, j) => (
                <li key={j}>{parseInline(l.replace(/^\s*[-*]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }
        if (lines.length > 0 && lines.every((l) => /^\s*\d+\.\s+/.test(l))) {
          return (
            <ol key={key}>
              {lines.map((l, j) => (
                <li key={j}>{parseInline(l.replace(/^\s*\d+\.\s+/, ""))}</li>
              ))}
            </ol>
          );
        }
        return <p key={key}>{parseInline(trimmed)}</p>;
      })}
    </div>
  );
}
