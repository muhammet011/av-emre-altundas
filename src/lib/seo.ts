import { SITE } from "./site";

export function legalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${SITE.name} Hukuk Bürosu`,
    image: SITE.portrait,
    url: "/",
    telephone: SITE.phoneHref.replace("tel:", ""),
    email: SITE.email,
    description: SITE.description,
    areaServed: { "@type": "Country", name: "Türkiye" },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address1,
      addressLocality: "Şişli",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    founder: {
      "@type": "Person",
      name: SITE.name,
      jobTitle: "Avukat",
      image: SITE.portrait,
    },
    knowsAbout: [
      "Yabancılar Hukuku",
      "Ceza Hukuku",
      "Aile Hukuku",
      "İş Hukuku",
      "Gayrimenkul Hukuku",
      "Tüketici Hukuku",
      "İcra ve İflas Hukuku",
      "Miras Hukuku",
    ],
  };
}

export function articleJsonLd(input: {
  title: string;
  summary: string;
  slug: string;
  createdAt: string;
  updatedAt?: string;
  imageUrl: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.summary,
    datePublished: input.createdAt,
    dateModified: input.updatedAt ?? input.createdAt,
    inLanguage: "tr-TR",
    author: { "@type": "Person", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: `${SITE.name} Hukuk Bürosu`,
    },
    image: input.imageUrl || SITE.portrait,
    mainEntityOfPage: `/makale/${input.slug}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
