import { Link } from "@tanstack/react-router";
import type { Article } from "@/lib/articles";
import { formatTrDate } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex h-full flex-col bg-paper shadow-[0_4px_20px_rgba(15,39,71,0.06)]">
      {article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt=""
          className="h-[190px] w-full object-cover"
        />
      ) : (
        <div className="h-[190px] w-full bg-linear-to-br from-navy to-navy-deep" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2.5 text-[0.72rem] tracking-[0.14em] text-gold uppercase">
          {article.category} · {formatTrDate(article.createdAt)}
        </p>
        <h3 className="font-display text-[1.35rem] leading-snug text-navy">
          {article.title}
        </h3>
        {article.summary ? (
          <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-slate">
            {article.summary}
          </p>
        ) : null}
        <Link
          to="/makale/$slug"
          params={{ slug: article.slug }}
          className="mt-5 self-start border-b-2 border-gold pb-0.5 text-[0.88rem] font-semibold text-navy"
        >
          Devamını Oku →
        </Link>
      </div>
    </article>
  );
}
