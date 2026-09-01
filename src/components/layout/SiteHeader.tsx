import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

function NavItem({
  item,
  onNavigate,
  inverted,
  className,
}: {
  item: (typeof NAV)[number];
  onNavigate?: () => void;
  inverted?: boolean;
  className?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const styles = cn(
    "text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors duration-200",
    inverted ? "text-paper hover:text-gold" : "text-navy hover:text-gold",
    className,
  );

  if ("to" in item && item.to) {
    return (
      <Link to={item.to} className={styles} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }

  const hash = "hash" in item ? item.hash : "";
  if (pathname === "/") {
    return (
      <a href={`#${hash}`} className={styles} onClick={onNavigate}>
        {item.label}
      </a>
    );
  }
  return (
    <Link to="/" hash={hash} className={styles} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.documentElement.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("menu-open", open);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  const inverted = open || (dark && !scrolled);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] border-b transition-colors duration-300",
          open
            ? "border-gold/20 bg-navy"
            : inverted
              ? "border-gold/20 bg-transparent"
              : "border-gold/30 bg-paper/95 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-[4.5rem] w-[min(92%,1200px)] items-center justify-between">
          <Link
            to="/"
            className={cn(
              "font-display text-[1.55rem] font-semibold tracking-wide",
              inverted ? "text-paper" : "text-navy",
            )}
            onClick={() => setOpen(false)}
          >
            {SITE.first}{" "}
            <span className="text-gold">{SITE.last}</span>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Ana menü">
            {NAV.map((item) => (
              <NavItem key={item.label} item={item} inverted={inverted} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "hidden h-10 items-center px-4 text-[0.7rem] font-semibold tracking-[0.14em] uppercase xl:inline-flex",
                inverted ? "bg-gold text-navy" : "bg-navy text-paper",
              )}
            >
              WhatsApp
            </a>
            <button
              type="button"
              className={cn(
                "inline-flex size-11 items-center justify-center xl:hidden",
                inverted ? "text-paper" : "text-navy",
              )}
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" strokeWidth={1.6} /> : <Menu className="size-6" strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          className="fixed inset-x-0 top-[4.5rem] bottom-0 z-[70] overflow-y-auto bg-navy xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobil menü"
        >
          <nav className="flex min-h-full flex-col px-8 py-6">
            {NAV.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                inverted
                className="flex min-h-12 w-full items-center border-b border-paper/10 text-[0.82rem]"
                onNavigate={() => setOpen(false)}
              />
            ))}
            <Link
              to="/"
              hash="iletisim"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex h-12 items-center justify-center bg-gold px-6 text-[0.72rem] font-semibold tracking-[0.16em] text-navy uppercase"
            >
              İletişime Geçin
            </Link>
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex h-12 items-center justify-center border border-gold px-6 text-[0.72rem] font-semibold tracking-[0.16em] text-gold uppercase"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
