import { Link } from "@tanstack/react-router";
import { Linkedin, Mail } from "lucide-react";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t-[3px] border-gold bg-navy text-center text-paper">
      <div className="site-wrap py-14">
        <Link to="/" className="font-display text-2xl font-semibold tracking-wide text-paper">
          {SITE.first} <span className="text-gold">{SITE.last}</span>
        </Link>
        <p className="mt-2 text-sm text-muted">Hukuk ve Danışmanlık</p>
        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.78rem] tracking-[0.12em] text-gold uppercase">
          <Link to="/" hash="ozgecmis">
            Özgeçmiş
          </Link>
          <Link to="/makaleler">Makaleler</Link>
          <Link to="/kvkk">KVKK</Link>
          <Link to="/" hash="iletisim">
            İletişim
          </Link>
        </nav>
        <div className="mt-5 flex items-center justify-center gap-5">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-gold transition-opacity hover:opacity-80"
          >
            <Linkedin className="size-5" strokeWidth={1.6} />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            aria-label="E-posta"
            className="text-gold transition-opacity hover:opacity-80"
          >
            <Mail className="size-5" strokeWidth={1.6} />
          </a>
        </div>
        <p className="mt-6 text-xs text-muted">
          © {new Date().getFullYear()} {SITE.name} Hukuk Bürosu. Tüm hakları saklıdır.
        </p>
        <p className="mt-2 text-[0.7rem] text-muted/80">
          MB Design tarafından mevzuata uygun hazırlanmıştır.
        </p>
      </div>
    </footer>
  );
}
