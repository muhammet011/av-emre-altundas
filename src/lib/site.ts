export const SITE = {
  name: "Av. Emre Altundaş",
  first: "Av. Emre",
  last: "Altundaş",
  title: "Av. Emre Altundaş | Avukatlık ve Hukuki Danışmanlık",
  description:
    "Av. Emre Altundaş Hukuk Bürosu — yabancılar, ceza, aile, iş, gayrimenkul, tüketici, icra ve miras hukukunda avukatlık ve hukuki danışmanlık.",
  keywords:
    "avukat, hukuk bürosu, yabancılar hukuku, ceza hukuku, boşanma, iş hukuku, gayrimenkul, tüketici hukuku, icra, miras, Emre Altundaş",
  tagline: "Hukuk ve Danışmanlık Bürosu",
  phoneDisplay: "+90 (555) 123 45 67",
  phoneHref: "tel:+905551234567",
  whatsappHref: "https://wa.me/905551234567",
  email: "info@emrealtundas.av.tr",
  address1: "Adalet Mahallesi, Hukuk Plaza, Kat: 5 No: 20",
  address2: "Şişli / İstanbul",
  portrait: "/images/emre-altundas.jpg",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.9791484641663!2d28.9877473154154!3d41.05837697929424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab71d4715f5eb%3A0x8cfedb734892c23b!2zxZ5pxZ9saS9Jc3RhbmJ1bA!5e0!3m2!1str!2str!4v1684343167119!5m2!1str!2str",
  themeColor: "#0F2747",
} as const;

export const NAV = [
  { label: "Hakkımızda", hash: "hakkimizda" },
  { label: "Özgeçmiş", hash: "ozgecmis" },
  { label: "Faaliyet Alanları", hash: "faaliyet" },
  { label: "Makaleler", to: "/makaleler" as const },
  { label: "SSS", hash: "sss" },
  { label: "İletişim", hash: "iletisim" },
] as const;

export const ARTICLE_CATEGORIES = [
  "Genel",
  "Yabancılar Hukuku",
  "Ceza Hukuku",
  "Aile Hukuku",
  "İş Hukuku",
  "Gayrimenkul Hukuku",
  "Tüketici Hukuku",
  "İcra ve İflas Hukuku",
  "Miras Hukuku",
] as const;
