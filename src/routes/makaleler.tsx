import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleCard } from "@/components/ArticleCard";
import { PageShell } from "@/components/layout/PageShell";
import { usePublishedArticles } from "@/lib/articles";

export const Route = createFileRoute("/makaleler")({
  head: () => ({
    meta: [
      { title: "Makaleler | Av. Emre Altundaş" },
      {
        name: "description",
        content:
          "Av. Emre Altundaş Hukuk Bürosu makaleleri — güncel mevzuat ve hukuki gelişmeler üzerine değerlendirmeler.",
      },
    ],
    links: [{ rel: "canonical", href: "/makaleler" }],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const articles = usePublishedArticles();
  const [cat, setCat] = useState("Tümü");
  const categories = useMemo(() => {
    const set = new Set(articles.map((a) => a.category));
    return ["Tümü", ...[...set].sort((a, b) => a.localeCompare(b, "tr"))];
  }, [articles]);
  const visible = cat === "Tümü" ? articles : articles.filter((a) => a.category === cat);

  return (
    <PageShell>
      <section className="bg-mist pb-24 pt-[4.5rem]">
        <div className="mx-auto w-[min(92%,1100px)] pt-16 pb-6 text-center">
          <Link to="/" className="text-sm text-gold">
            ← Anasayfaya Dön
          </Link>
          <h1 className="font-display text-[2.6rem] text-navy">Makaleler</h1>
          <div className="gold-rule gold-rule-center my-5" />
          <p className="mx-auto max-w-md text-slate">
            Güncel mevzuat ve hukuki gelişmeler üzerine değerlendirmelerimiz.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={
                  cat === c
                    ? "h-10 bg-navy px-4 text-xs font-semibold tracking-wide text-paper uppercase"
                    : "h-10 border border-navy px-4 text-xs font-semibold tracking-wide text-navy uppercase"
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="mx-auto grid w-[min(92%,1100px)] gap-8 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.length === 0 ? (
            <p className="col-span-full py-16 text-center text-muted">
              Bu kategoride yayınlanmış makale bulunmuyor.
            </p>
          ) : (
            visible.map((a) => <ArticleCard key={a.id} article={a} />)
          )}
        </div>
      </section>
    </PageShell>
  );
}
