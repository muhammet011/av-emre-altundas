import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { legalServiceJsonLd } from "@/lib/seo";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageShell({
  children,
  darkHeader = false,
}: {
  children: ReactNode;
  darkHeader?: boolean;
}) {
  return (
    <div className="min-h-dvh bg-paper">
      <JsonLd data={legalServiceJsonLd()} />
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[90] focus:bg-gold focus:px-3 focus:py-2 focus:text-navy"
      >
        İçeriğe geç
      </a>
      <SiteHeader dark={darkHeader} />
      <main id="icerik">{children}</main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
