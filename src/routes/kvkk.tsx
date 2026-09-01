import { createFileRoute, Link } from "@tanstack/react-router";
import { KvkkContent } from "@/components/KvkkContent";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/kvkk")({
  head: () => ({
    meta: [
      { title: "KVKK Aydınlatma Metni | Av. Emre Altundaş" },
      {
        name: "description",
        content:
          "Av. Emre Altundaş Hukuk Bürosu Kişisel Verilerin Korunması Kanunu (KVKK) aydınlatma metni.",
      },
    ],
    links: [{ rel: "canonical", href: "/kvkk" }],
  }),
  component: KvkkPage,
});

function KvkkPage() {
  return (
    <PageShell>
      <section className="bg-mist pt-[4.5rem] pb-24">
        <div className="mx-auto w-[min(92%,760px)] pt-16">
          <Link to="/" className="text-sm text-gold">
            ← Anasayfaya Dön
          </Link>
          <h1 className="mt-6 font-display text-[2.4rem] text-navy">
            KVKK Aydınlatma Metni
          </h1>
          <div className="gold-rule my-5" />
          <div className="bg-paper p-8 sm:p-10">
            <KvkkContent />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
