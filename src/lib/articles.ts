import { useSyncExternalStore } from "react";
import { slugifyBase } from "./utils";

export type Article = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = "altundas.articles.v2";
const LEGACY_KEY = "altundas.articles.v1";

export const SEED_ARTICLES: Article[] = [
  {
    id: "kira-sozlesmesi",
    slug: "kira-sozlesmelerinde-dikkat-edilmesi-gerekenler",
    title: "Kira Sözleşmelerinde Dikkat Edilmesi Gerekenler",
    summary:
      "Konut ve çatılı işyeri kiralarında sözleşme kurulurken yazılması gereken maddeler, depozito, tahliye taahhüdü ve zam sınırına ilişkin pratik esaslar.",
    imageUrl: "/images/articles/pen.jpg",
    published: true,
    category: "Gayrimenkul Hukuku",
    createdAt: "2026-06-18T09:00:00.000Z",
    updatedAt: "2026-06-18T09:00:00.000Z",
    content: `Kira ilişkisi, günlük hayatta en sık kurulan sözleşmelerden biridir. Buna rağmen birçok uyuşmazlık, sözleşmenin aceleyle, eksik ya da belirsiz hükümlerle imzalanmasından doğar.

Konut ve çatılı işyeri kiralarında Türk Borçlar Kanunu'nun 299 ve devamı maddeleri uygulanır. Sözleşmenin yazılı olması ispat kolaylığı sağlar.

## Sözleşmede açıkça yazılması gerekenler

- Kira bedeli ve ödeme günü
- Kullanım amacı (konut / işyeri)
- Aidat, demirbaş listesi ve teslim durumu
- Depozito tutarı ve iade koşulları

Depozito, kural olarak üç aylık kira bedelini aşamaz ve kiracıya iadesi, teslim anındaki durumla kıyaslanarak değerlendirilir. "Tadilat yapılmadan iade edilmez" gibi genel ifadeler, yıpranma payı ile gerçek zararı birbirine karıştırdığı için sıkça uyuşmazlık çıkarır.

Tahliye taahhüdü, kiracının serbest iradesiyle ve kira sözleşmesinin kurulmasından sonra düzenlenmiş olmalıdır. Sözleşmeyle aynı anda imzalanan taahhütler yargı uygulamasında çoğu kez geçersiz sayılmaktadır.

> Belirsiz "piyasa rayicine göre" artış kayıtları, hem kiracı hem kiralayan için öngörülebilirliği zayıflatır.

Bu yazı genel bilgilendirme amaçlıdır; somut bir kira uyuşmazmasında dosya bazında hukuki değerlendirme gerekir.`,
  },
  {
    id: "anlasmali-bosanma",
    slug: "anlasmali-bosanma-sureci",
    title: "Anlaşmalı Boşanma Süreci Nasıl İşler?",
    summary:
      "Anlaşmalı boşanmanın şartları, protokolde yer alması gereken hususlar ve duruşmada dikkat edilmesi gerekenler.",
    imageUrl: "/images/articles/books.jpg",
    published: true,
    category: "Aile Hukuku",
    createdAt: "2026-05-27T09:00:00.000Z",
    updatedAt: "2026-05-27T09:00:00.000Z",
    content: `Anlaşmalı boşanma, evlilik birliğinin en az bir yıl sürmüş olması ve eşlerin boşanma ile sonuçları üzerinde tam bir mutabakata varmış olmaları halinde mümkündür. Bu yol, çekişmeli yargılamaya göre daha kısa ve öngörülebilir bir süreç sunar.

Protokol; nafaka, velayet, kişisel ilişki, ziynet ve mal rejiminin tasfiyesine ilişkin açık hükümler içermelidir. Muğlak "karşılıklı alacak yoktur" cümleleri, sonradan açılan davaların temelini oluşturabilir.

Velayet düzenlenirken çocuğun üstün yararı esastır. Kişisel ilişki gün ve saatlerinin somut yazılması, sonraki icra ve ihlal iddialarını azaltır. İştirak nafakasının tutarı, ödeme günü ve artış usulü protokole işlenmelidir.

Duruşmada her iki eşin de hâkim huzurunda protokolü serbest iradeyle kabul ettiğini beyan etmesi gerekir. Bir tarafın yokluğu kural olarak anlaşmalı boşanmayı düşürür.

Anlaşmalı boşanma kararı kesinleşmeden yeni bir evlilik yapılamaz. Kararın tebliği ve kesinleşme şerhi, sonraki işlemler için belgelenmelidir.

Bu yazı genel bilgilendirme niteliğindedir ve yerini somut dosya incelemesine bırakmaz.`,
  },
  {
    id: "ise-iade",
    slug: "ise-iade-davasinin-sartlari",
    title: "İşe İade Davasının Şartları",
    summary:
      "İş güvencesi kapsamı, bir aylık hak düşürücü süre, feshin geçerli nedene dayanması ve işe iade kararının sonuçları.",
    imageUrl: "/images/articles/gavel.jpg",
    published: true,
    category: "İş Hukuku",
    createdAt: "2026-04-14T09:00:00.000Z",
    updatedAt: "2026-04-14T09:00:00.000Z",
    content: `İşe iade davası, belirsiz süreli iş sözleşmesiyle çalışan ve iş güvencesi kapsamındaki işçinin, feshin geçersizliğini ileri sürdüğü özel bir davadır. İşe iade, her feshin otomatik sonucu değildir; kanundaki şartların birlikte gerçekleşmesi gerekir.

İş güvencesi kural olarak, otuz veya daha fazla işçi çalıştıran işyerinde en az altı aylık kıdemi bulunan işçiler için söz konusudur. Belirli süreli sözleşmeler ve bazı yönetici konumları bu korumanın dışında kalabilir.

Fesih bildiriminin tebliğinden itibaren bir aylık hak düşürücü süre içinde arabulucuya başvurulması zorunludur. Süre, işçi lehine yorumlansa da kaçırıldığında dava dinlenmez.

İşveren, feshin geçerli bir nedene dayandığını ispatla yükümlüdür. Performans, davranış veya işletmesel gerekçeler somut, ölçülebilir ve usulüne uygun tespitlerle ortaya konmalıdır. Savunma alınmadan yapılan davranış fesihleri sıklıkla geçersiz bulunmaktadır.

Mahkemenin feshin geçersizliğine karar vermesi halinde işçi, kararın tebliğinden itibaren on iş günü içinde işe başlamak üzere işverene başvurmalıdır. Süresinde başvurulmazsa fesih geçerli hale gelir.

Yazı, genel çerçeveyi çizer; kıdem, ihbar ve işe başlatmama tazminatı hesapları dosya verilerine göre ayrıca yapılır.`,
  },
  {
    id: "6284-koruma",
    slug: "6284-sayili-kanun-koruma-tedbirleri",
    title: "6284 Sayılı Kanun Kapsamında Koruma Tedbirleri",
    summary:
      "Ailenin korunması ve kadına karşı şiddetin önlenmesine ilişkin tedbir kararlarının kapsamı, süresi ve ihlalin sonuçları.",
    imageUrl: "/images/articles/columns.jpg",
    published: true,
    category: "Aile Hukuku",
    createdAt: "2026-03-09T09:00:00.000Z",
    updatedAt: "2026-03-09T09:00:00.000Z",
    content: `6284 sayılı Ailenin Korunması ve Kadına Karşı Şiddetin Önlenmesine Dair Kanun, şiddet mağduruna hızlı ve geçici koruma sağlamayı amaçlar. Tedbir kararı, esasa ilişkin bir ceza yargılamasının yerine geçmez; ancak ihlali ayrı yaptırımlara bağlanır.

Koruyucu tedbirler arasında barınma yeri sağlanması, geçici maddi yardım, psikolojik destek ve kimlik bilgilerinin gizlenmesi sayılabilir. Önleyici tedbirler ise evden uzaklaştırma, yaklaşmama, iletişim yasağı ve silah teslimi gibi yükümlülükleri kapsar.

Kararlar, gecikmesinde sakınca bulunan hâllerde mülki amir veya kolluk tarafından da verilebilir; hâkim onayına sunulur. Süre kural olarak altı aydır ve uzatılabilir.

Tedbirin ihlali, Türk Ceza Kanunu'ndaki ilgili suç tiplerinden bağımsız olarak 6284 m. 13 uyarınca zorlama hapsine konu olabilir. Mağdurun "vazgeçmesi", kamu düzenini ilgilendiren tedbirin kendiliğinden düşmesi anlamına gelmez.

Başvuru, Aile Mahkemesi'ne veya 112 / 183 hatları ve kolluk aracılığıyla yapılabilir. Delil eşiği, ceza yargılamasındaki kadar katı tutulmaz; somut olayın özelliği yeterlidir.

Bu metin hukuki mütalaa yerine geçmez. Şiddet tehlikesi varsa öncelik, güvenliğin derhal sağlanmasıdır.`,
  },
  {
    id: "icra-haklari",
    slug: "icra-takibinde-borclu-ve-alacaklinin-haklari",
    title: "İcra Takibinde Borçlu ve Alacaklının Hakları",
    summary:
      "Ödeme emrine itiraz, haciz, istihkak ve takibin iptali başlıklarında hem alacaklı hem borçlu yönünden temel usul hakları.",
    imageUrl: "/images/articles/scales.jpg",
    published: true,
    category: "İcra ve İflas Hukuku",
    createdAt: "2026-02-03T09:00:00.000Z",
    updatedAt: "2026-02-03T09:00:00.000Z",
    content: `İcra takibi, alacağın devlet gücüyle tahsilini sağlayan bir yoldur. Hem alacaklı hem borçlu için süreler hak düşürücüdür; "görmedim" savunması çoğu kez sonuç vermez.

İlamsız takipte ödeme emrine yedi gün içinde itiraz edilmezse takip kesinleşir. İtiraz, takibi durdurur; alacaklı itirazın iptali veya kaldırılması yollarına başvurabilir. İmzaya itiraz ile borca itirazın hukuki sonuçları farklıdır.

Hacizde, borçlunun hâlihazırda kullandığı zorunlu eşya ve nafaka nitelikli gelirin bir kısmı haczedilemez. Maaş haczi kural olarak dörtte bir oranındadır; nafaka alacaklarında oran değişebilir.

Üçüncü kişinin elindeki malın haczi istihkak iddiasını doğurur. İstihkak davası, haciz tarihinden itibaren yedi gün gibi kısa sürelerle örülüdür.

Takibin iptali ve taliki, borcun sona ermesi, zamanaşımı veya usulsüz tebligat gibi nedenlere dayanabilir. Tebligatın usulsüzlüğü, öğrenme tarihinden itibaren süreleri yeniden başlatabilir.

İcra dosyası, evrakın tamlığı ve sürelerin kaçırılmaması üzerine kuruludur. Genel bilgi, somut dosya incelemesinin yerini tutmaz.`,
  },
  {
    id: "tapu-iptal",
    slug: "tapu-iptal-ve-tescil-davalari",
    title: "Tapu İptal ve Tescil Davalarına İlişkin Temel Esaslar",
    summary:
      "Muris muvazaası, sahtecilik, ehliyetsizlik ve kazandırıcı zamanaşımı iddialarında tapu kaydının düzeltilmesi.",
    imageUrl: "/images/articles/building.jpg",
    published: true,
    category: "Gayrimenkul Hukuku",
    createdAt: "2026-01-16T09:00:00.000Z",
    updatedAt: "2026-01-16T09:00:00.000Z",
    content: `Tapu sicili, taşınmaz üzerindeki hakları gösteren resmi kayıttır. Sicile güven ilkesi, iyiniyetli üçüncü kişileri korur; ancak kaydın yolsuz olduğu hâllerde iptal ve tescil davası açılabilir.

Muris muvazaası, miras bırakının mirasçılardan mal kaçırmak amacıyla yaptığı temliklerde sıkça ileri sürülür. Yargıtay, satışın gerçek bedelinin ödenip ödenmediğini, tarafların ekonomik durumunu ve tapu dışı delilleri birlikte değerlendirir.

Sahte vekâletname veya ehliyetsizlik iddialarında, işlemin yokluğu veya butlanı söz konusu olabilir. Bu davalarda zamanaşımı ve hak düşürücü süreler, hukuki niteliğe göre değişir.

Kazandırıcı zamanaşımı ile tescil, malikin tapuda görünmediği ve zilyetliğin kanundaki süre ve koşullarla sürdüğü hâllerde gündeme gelir. Zilyetliğin çekişmesiz, malik sıfatıyla ve aralıksız olması aranır.

Dava, kural olarak taşınmazın bulunduğu yer mahkemesinde açılır. Tedbiren tapu kaydına şerh konulması, davanın devamında üçüncü kişilere karşı koruma sağlar.

Taşınmaz uyuşmazmaları, keşif ve bilirkişi incelemesine dayanır. Bu yazı, dosyadaki tapu kaydı ve belgeler görülmeden hüküm ifade etmez.`,
  },
];

const listeners = new Set<() => void>();
let clientCache: Article[] | null = null;

function emit() {
  listeners.forEach((l) => l());
}

function normalize(raw: Partial<Article> & { id: string; title: string }): Article {
  const created = raw.createdAt ?? new Date().toISOString();
  return {
    id: raw.id,
    slug: raw.slug || raw.id,
    title: raw.title,
    summary: raw.summary ?? "",
    content: raw.content ?? "",
    category: raw.category ?? "Genel",
    imageUrl: raw.imageUrl ?? null,
    published: Boolean(raw.published),
    createdAt: created,
    updatedAt: raw.updatedAt ?? created,
  };
}

function readStorage(): Article[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Article>[];
    if (!Array.isArray(parsed)) return null;
    return parsed
      .filter((a): a is Partial<Article> & { id: string; title: string } =>
        Boolean(a && a.id && a.title),
      )
      .map(normalize);
  } catch {
    return null;
  }
}

function getSnapshot(): Article[] {
  if (!clientCache) {
    clientCache = readStorage() ?? SEED_ARTICLES;
  }
  return clientCache;
}

function getServerSnapshot(): Article[] {
  return SEED_ARTICLES;
}

function persist(next: Article[]) {
  clientCache = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emit();
}

export function subscribeArticles(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useArticles() {
  return useSyncExternalStore(subscribeArticles, getSnapshot, getServerSnapshot);
}

export function usePublishedArticles() {
  const all = useArticles();
  return all
    .filter((a) => a.published)
    .slice()
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export function getArticleBySlug(slug: string, list: Article[]) {
  return list.find((a) => a.slug === slug || a.id === slug);
}

export function uniqueSlug(base: string, current: Article[], exceptId?: string) {
  const clean = slugifyBase(base);
  let slug = clean;
  let i = 2;
  while (current.some((a) => a.slug === slug && a.id !== exceptId)) {
    slug = `${clean}-${i}`;
    i += 1;
  }
  return slug;
}

export function upsertArticle(
  input: Omit<Article, "id" | "createdAt" | "updatedAt"> & {
    id?: string;
    createdAt?: string;
  },
) {
  const current = getSnapshot();
  const now = new Date().toISOString();
  if (input.id) {
    const next = current.map((a) =>
      a.id === input.id
        ? normalize({
            ...a,
            title: input.title,
            summary: input.summary,
            content: input.content,
            imageUrl: input.imageUrl,
            published: input.published,
            category: input.category,
            slug: uniqueSlug(input.slug || input.title, current, input.id),
            updatedAt: now,
          })
        : a,
    );
    persist(next);
    return input.id;
  }
  const slug = uniqueSlug(input.slug || input.title, current);
  const article = normalize({
    id: slug,
    slug,
    title: input.title,
    summary: input.summary,
    content: input.content,
    imageUrl: input.imageUrl,
    published: input.published,
    category: input.category,
    createdAt: now,
    updatedAt: now,
  });
  persist([article, ...current]);
  return article.id;
}

export function deleteArticle(id: string) {
  persist(getSnapshot().filter((a) => a.id !== id));
}

export function resetArticles() {
  if (typeof window === "undefined") return;
  clientCache = SEED_ARTICLES;
  localStorage.removeItem(STORAGE_KEY);
  emit();
}
