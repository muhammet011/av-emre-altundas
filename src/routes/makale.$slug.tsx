import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArticleBody } from "@/components/ArticleBody";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/layout/PageShell";
import { getArticleBySlug, SEED_ARTICLES, usePublishedArticles } from "@/lib/articles";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { formatTrDate } from "@/lib/utils";

export const Route = createFileRoute("/makale/$slug")({
  head: ({ params }) => {
    const article = getArticleBySlug(params.slug, SEED_ARTICLES);
    return {
      meta: [
        {
          title: article
            ? `${article.title} | ${SITE.name}`
            : `Makale | ${SITE.name}`,
        },
        {
          name: "description",
          content: article?.summary ?? SITE.description,
        },
        { name: "robots", content: "index,follow" },
      ],
      links: [{ rel: "canonical", href: `/makale/${params.slug}` }],
    };
  },
  component: ArticleDetail,
});

function ArticleDetail() {
  const { slug } = Route.useParams();
  const articles = usePublishedArticles();
  const article = getArticleBySlug(slug, articles);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | ${SITE.name}`;
    }
  }, [article]);

  if (!article) {
    return (
      <PageShell>
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
          <p className="text-muted">Bu makale bulunamadı veya yayından kaldırılmış olabilir.</p>
          <Link
            to="/makaleler"
            className="mt-6 text-sm font-semibold text-navy underline decoration-gold decoration-2"
          >
            Tüm makalelere dön
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          summary: article.summary,
          slug: article.slug,
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
          imageUrl: article.imageUrl,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana sayfa", url: "/" },
          { name: "Makaleler", url: "/makaleler" },
          { name: article.title, url: `/makale/${article.slug}` },
        ])}
      />
      {article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="mt-[4.5rem] h-[280px] w-full object-cover sm:h-[360px]"
        />
      ) : (
        <div className="mt-[4.5rem] h-[220px] w-full bg-linear-to-br from-navy to-navy-deep" />
      )}
      <article className="mx-auto w-[min(92%,760px)] pt-10 pb-24">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link to="/" className="hover:text-gold">
            Ana sayfa
          </Link>
          <span>/</span>
          <Link to="/makaleler" className="hover:text-gold">
            Makaleler
          </Link>
          <span>/</span>
          <span className="text-navy">{article.title}</span>
        </nav>
        <p className="mt-5 mb-3.5 text-[0.8rem] tracking-[0.14em] text-gold uppercase">
          {article.category} · {formatTrDate(article.createdAt)}
        </p>
        <h1 className="font-display text-[2rem] leading-snug text-navy sm:text-[2.4rem]">
          {article.title}
        </h1>
        {article.summary ? (
          <p className="mt-4 text-[1.05rem] text-slate italic">{article.summary}</p>
        ) : null}
        <ArticleBody
          content={article.content}
          className="mt-8 text-[1.05rem] leading-[1.9] text-slate"
        />
        <p className="mt-12 border-t border-line pt-6 text-xs text-muted">
          Bu yazı genel bilgilendirme amaçlıdır; somut bir uyuşmazmada hukuki
          mütalaa niteliği taşımaz.
        </p>
      </article>
    </PageShell>
  );
}
