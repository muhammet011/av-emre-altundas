import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  Building2,
  Eye,
  FileSpreadsheet,
  Gavel,
  Globe,
  Mail,
  MapPin,
  Phone,
  Scale,
  ScrollText,
  Shield,
  ShoppingBag,
  Users,
} from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";
import { usePublishedArticles } from "@/lib/articles";
import { faqJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE.title },
      { name: "description", content: SITE.description },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const SERVICES = [
  {
    icon: Globe,
    title: "Yabancılar Hukuku",
    subtitle: "Yabancılar ve Vatandaşlık Hukuku",
    text: "Türkiye’de bulunan ya da Türkiye ile hukuki bağı olan yabancı ülke vatandaşlarının haklarını korumak ve hukuki süreçlerini eksiksiz yürütmek uzmanlık gerektirir. Yabancılar Hukuku alanında; çalışma ve ikamet izni başvuruları, Türkiye’de gayrimenkul alımı yoluyla veya genel yoldan Türk vatandaşlığı kazanılması süreçleri, sınır dışı (deport) kararlarına itiraz ve tahdit kodlarının kaldırılması davalarında kapsamlı hukuki danışmanlık ve temsil hizmeti sunmaktayız. Mevzuattaki hızlı değişiklikleri yakından takip ederek uluslararası müvekkillerimizin hukuki güvenliğini güvence altına almaktayız.",
  },
  {
    icon: Scale,
    title: "Ceza Hukuku",
    subtitle: "Ceza Hukuku ve Ceza Yargılaması",
    text: "Ceza hukuku, bireylerin hak ve özgürlüklerini doğrudan etkileyen, telafisi güç zararların doğabileceği son derece hassas bir alandır. Soruşturma (karakol ve savcılık ifadesi) aşamasından başlayarak kovuşturma (mahkeme yargılaması), tutukluluğa itiraz, istinaf ve temyiz süreçlerine kadar tüm aşamalarda etkin bir savunma hakkı sunmaktayız. Gerek şüpheli/sanık müdafiliği gerekse mağdur/müşteki vekilliği üstlenerek, adil yargılanma ilkesi çerçevesinde müvekkillerimizin haklarını titizlikle korumaktayız.",
  },
  {
    icon: Users,
    title: "Boşanma ve Aile Hukuku",
    subtitle: "Boşanma ve Aile Hukuku",
    text: "Aile hukukundan doğan uyuşmazlıklar, hukuki boyutunun yanı sıra duygusal olarak da yıpratıcı süreçlerdir. Anlaşmalı ve çekişmeli boşanma davaları başta olmak üzere; velayet, nafaka, maddi ve manevi tazminat talepleri ile evlilik birliği süresince edinilen malların paylaşımı (mal rejimi) davalarında rehberlik etmekteyiz. Sürecin en az yıpranmayla, hak kaybı yaşanmadan ve hukuka uygun şekilde sonuçlanması için kişiye özel hukuki çözümler üretmekteyiz.",
  },
  {
    icon: Briefcase,
    title: "İş Hukuku",
    subtitle: "İş ve Sosyal Güvenlik Hukuku",
    text: "Çalışma hayatında işçi ve işveren arasındaki ilişkilerin kanuni çerçevede yürütülmesi, olası uyuşmazlıkların önüne geçilmesi açısından kritik önem taşır. İşçilik alacakları (kıdem tazminatı, ihbar tazminatı, fazla mesai, yıllık izin vb.), işe iade davaları, iş kazası ve meslek hastalığından doğan tazminat davaları ile işçi-işveren arasındaki arabuluculuk süreçlerinde aktif hizmet vermekteyiz. Ayrıca işverenler için iş sözleşmelerinin hazırlanması ve insan kaynakları süreçlerinin hukuka uygunluğunun sağlanması noktasında danışmanlık sunmaktayız.",
  },
  {
    icon: Building2,
    title: "Gayrimenkul Hukuku",
    subtitle: "Gayrimenkul ve Taşınmaz Hukuku",
    text: "Gayrimenkul sektörü, yüksek maddi değerler içeren ve mevzuatı oldukça detaylı olan bir alandır. Tapu iptal ve tescil davaları, müdahalenin men’i (el atmanın önlenmesi), ecrimisil (haksız işgal tazminatı), şufa (ön alım) davaları ile kira ilişkilerinden doğan tahliye ve kira tespiti davalarında müvekkillerimizi temsil etmekteyiz. Aynı zamanda gayrimenkul alım-satım ve kiralama süreçlerinde sözleşmelerin hazırlanması ve hukuki risk analizlerinin yapılması konusunda danışmanlık sağlamaktayız.",
  },
  {
    icon: ShoppingBag,
    title: "Tüketici Hukuku",
    subtitle: "Tüketici Hukuku",
    text: "Günlük yaşamda sıkça karşılaşılan ayıplı mal ve hizmet alımları, tüketicilerin hak kayıpları yaşamasına neden olabilmektedir. 6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında; ayıplı mal ve hizmetlerden doğan uyuşmazlıklar, konut ve devremülk satış sözleşmelerinden kaynaklanan sorunlar, abonelik ve mesafeli satış sözleşmeleri ile banka kredi masrafları ve sözleşme şartlarına ilişkin ihtilaflarda hizmet vermekteyiz. Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri nezdindeki başvuru ve dava süreçlerini takip ederek müvekkillerimizin mağduriyetlerinin giderilmesini sağlamaktayız.",
  },
  {
    icon: FileSpreadsheet,
    title: "İcra ve İflas Hukuku",
    subtitle: "İcra ve İflas Hukuku",
    text: "Alacakların zamanında, etkin ve kanuni yollarla tahsil edilmesi kadar, haksız icra takipleri karşısında borçluların haklarının korunması da büyük önem taşır. İlama dayalı veya ilamsız icra takipleri, kambiyo senetlerine (çek, senet, poliçe) özgü takipler, ihtiyati haciz kararlarının alınması ve uygulanması süreçlerini yürütmekteyiz. Aynı zamanda borca ve takibe itiraz, itirazın iptali ve kaldırılması davaları, menfi tespit ve istirdat (geri alım) davaları ile tahliye süreçlerinde müvekkillerimizin finansal ve hukuki çıkarlarını titizlikle savunmaktayız.",
  },
  {
    icon: ScrollText,
    title: "Miras Hukuku",
    subtitle: "Miras Hukuku",
    text: "Miras hukuku; vefat sonrasında mal varlığının kime ve nasıl devredileceğine ilişkin hassas ve teknik kurallar içerir. Veraset ilamı (mirasçılık belgesi) alınması, vasiyetname düzenlenmesi veya iptali, saklı payın ihlali halinde açılacak tenkis davaları, mirasın reddi (reddi miras) ve izale-i şuyu (ortaklığın giderilmesi) davalarında hukuki destek sağlamaktayız. Mirasçıların hak kayıplarına uğramasını önlemek ve mirastan doğan uyuşmazlıkları adil bir şekilde çözüme kavuşturmak amacıyla çalışmaktayız.",
  },
];

const PRINCIPLES = [
  {
    icon: Shield,
    title: "Sır Saklama Yükümlülüğü",
    text: "Müvekkillerimize ait tüm bilgi ve belgeler, meslek kuralları gereğince mutlak bir gizlilik içinde korunur.",
  },
  {
    icon: Eye,
    title: "Mesleki Şeffaflık",
    text: "Hukuki süreçlerin her aşaması, olası riskler ve sonuçlar müvekkillerimizle açık ve dürüst biçimde paylaşılır.",
  },
  {
    icon: Scale,
    title: "Özen Yükümlülüğü",
    text: "Üstlenilen hukuki iş ve işlemler, güncel mevzuat ve içtihatlar ışığında en yüksek mesleki özenle takip edilir.",
  },
  {
    icon: Gavel,
    title: "Bağımsızlık",
    text: "Hukuk büromuz, görevini ifa ederken dış etkenlerden bağımsız olarak yalnızca hukukun üstünlüğünü gözetir.",
  },
];

const FAQS = [
  {
    q: "İlk danışmanlık görüşmesi ücretli midir?",
    a: "Avukatlık Kanunu ve Avukatlık Asgari Ücret Tarifesi ile meslek kuralları gereğince, avukatların ücretsiz iş alması yasaktır. Bu nedenle hukuki danışmanlık hizmetlerimiz ücrete tabidir.",
  },
  {
    q: "Dava süreçleri ne kadar sürmektedir?",
    a: "Dava süreleri, yargılamanın türüne, davanın açıldığı adliyenin iş yüküne ve kanun yolu (istinaf/temyiz) süreçlerine göre değişiklik göstermektedir. Kesin bir süre vermek yasal olarak mümkün değildir.",
  },
  {
    q: "Farklı illerdeki davalarla ilgileniyor musunuz?",
    a: "Evet, müvekkillerimizin hukuki ihtiyaçları doğrultusunda Türkiye'nin farklı illerinde bulunan dava ve uyuşmazlık süreçleri büromuz tarafından bizzat takip edilmektedir.",
  },
  {
    q: "Avukata vekaletname nasıl çıkartılır?",
    a: "Vekaletname, büromuzdan temin edeceğiniz vekalet bilgileri ile birlikte Türkiye Cumhuriyeti sınırları içerisindeki herhangi bir noterden; yurt dışında ise konsolosluklar aracılığıyla düzenlenebilmektedir.",
  },
];

function Home() {
  const latest = usePublishedArticles().slice(0, 3);

  return (
    <PageShell>
      <JsonLd data={faqJsonLd(FAQS)} />
      <section className="bg-mist pt-36 pb-24 min-[900px]:min-h-dvh min-[900px]:pt-40">
        <div className="mx-auto grid w-[min(92%,1200px)] items-center gap-14 min-[900px]:grid-cols-2 min-[900px]:gap-16">
          <Reveal>
            <p className="font-display text-[1.45rem] text-gold italic">
              {SITE.tagline}
            </p>
            <h1 className="mt-3 font-display text-[2.5rem] leading-[1.12] text-navy sm:text-[3.5rem]">
              Avukatlık ve Hukuki Danışmanlık Hizmetleri.
            </h1>
            <p className="mt-6 max-w-xl text-[1.05rem] text-ink/85">
              Ulusal ve uluslararası mevzuat çerçevesinde, gerçek ve tüzel
              kişilere yönelik avukatlık ve hukuki danışmanlık hizmeti
              sunulmaktadır.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#iletisim" className="btn-gold">
                İletişime Geçin
              </a>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center border border-navy px-6 text-[0.82rem] font-semibold tracking-[0.12em] text-navy uppercase"
              >
                WhatsApp
              </a>
            </div>
          </Reveal>
          <Reveal delay={120} className="relative">
            <div className="relative">
              <div className="pointer-events-none absolute -top-5 -left-5 hidden h-full w-full border-2 border-gold min-[900px]:block" />
              <img
                src={SITE.portrait}
                alt="Av. Emre Altundaş — Elazığ Adalet Sarayı önünde"
                className="relative z-10 w-full object-cover object-[28%_18%] shadow-[10px_10px_30px_rgba(0,0,0,0.1)] min-[900px]:aspect-3/4 min-[900px]:max-h-[560px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="hakkimizda" className="bg-paper py-24 sm:py-28">
        <div className="mx-auto grid w-[min(92%,1200px)] gap-16 min-[900px]:grid-cols-2 min-[900px]:gap-20">
          <Reveal>
            <h2 className="font-display text-[2.4rem] sm:text-[3rem]">Büromuz Hakkında</h2>
            <div className="gold-rule my-5" />
            <p className="mb-5 text-[1.05rem] text-ink/90">
              Av. Emre Altundaş Hukuk Bürosu, bireylerin ve işletmelerin
              karşılaştığı hukuki meselelere kalıcı ve uygulanabilir çözümler
              üretmek amacıyla kuruldu. Her dosyayı kendine özgü bir süreç olarak
              ele alıyor, müvekkillerimizin haklarını en etkin şekilde savunmak
              için sürecin her adımını birlikte yürütüyoruz.
            </p>
            <p className="font-display my-8 border-l-[3px] border-gold pl-5 text-[1.4rem] leading-snug text-navy italic">
              Ceza ve aile hukukundan yabancılar, iş ve gayrimenkul
              uyuşmazlıklarına kadar geniş bir alanda hizmet veriyoruz.
            </p>
            <p className="text-[1.05rem] text-ink/90">
              Bizim için hukuk yalnızca kanun maddelerinden ibaret değil; güven,
              açıklık ve emek ister. Bu nedenle müvekkillerimizle kurduğumuz her
              ilişkide dürüstlüğü, gizliliği ve adalete erişimi önceliğimiz
              olarak görüyoruz.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <img
              src="/images/office.jpg"
              alt="Hukuk bürosu çalışma salonu"
              className="h-full min-h-[280px] w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section id="ozgecmis" className="bg-mist py-24 sm:py-28">
        <div className="site-wrap grid items-center gap-14 min-[900px]:grid-cols-2 min-[900px]:gap-16">
          <Reveal>
            <img
              src={SITE.portrait}
              alt="Av. Emre Altundaş"
              className="w-full object-cover object-[28%_18%] aspect-3/4 max-h-[520px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="text-[0.72rem] tracking-[0.16em] text-gold uppercase">Kurucu Avukat</p>
            <h2 className="mt-3 font-display text-[2.4rem] sm:text-[3rem]">Özgeçmiş</h2>
            <div className="gold-rule my-5" />
            <p className="text-[1.05rem] text-ink/90">
              Av. Emre Altundaş, bireylerin ve işletmelerin hukuki süreçlerini
              özen, gizlilik ve bağımsızlık ilkeleriyle yürütmek üzere bürosunu
              kurmuştur. Dava takibi ve danışmanlıkta, her dosyayı kendi
              bağlamında ele alır.
            </p>
            <div className="mt-8 space-y-5 bg-navy p-8 text-sm leading-relaxed text-muted sm:p-10">
              <p>
                <strong className="text-gold">Eğitim:</strong>{" "}
                <span className="text-paper/90">
                  İstanbul Üniversitesi Hukuk Fakültesi mezunu; ceza hukuku ve
                  ticaret hukuku alanlarında ileri düzey sertifika programlarını
                  tamamlamış, mesleki gelişimini güncel mevzuat ve içtihat
                  takibiyle sürdürmektedir.
                </span>
              </p>
              <p>
                <strong className="text-gold">Kariyer:</strong>{" "}
                <span className="text-paper/90">
                  10 yılı aşkın süredir ceza, aile, yabancılar ve ticaret hukuku
                  alanlarında dava takibi yürütmekte; KOBİ ve kurumsal firmalara
                  sözleşme ve uyuşmazlık yönetimi konusunda danışmanlık
                  vermektedir.
                </span>
              </p>
              <p>
                <strong className="text-gold">Misyon:</strong>{" "}
                <span className="text-paper/90">
                  Her müvekkilin hikâyesinin farklı olduğu inancıyla, hukukun
                  üstünlüğü ilkesi çerçevesinde savunma hakkının etkin ve özenli
                  biçimde kullanılmasını ilke edinmiştir.
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="faaliyet" className="bg-mist py-24 text-center sm:py-28">
        <div className="mx-auto w-[min(92%,1200px)]">
          <Reveal>
            <h2 className="font-display text-[2.4rem] sm:text-[3rem]">Faaliyet Alanlarımız</h2>
            <div className="gold-rule gold-rule-center my-5" />
            <p className="mx-auto max-w-xl text-ink/75">
              Büromuz nezdinde yürütülen başlıca çalışma alanları aşağıda
              sunulmuştur.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-7 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 50, 250)}>
                <article className="h-full border border-line border-b-[3px] border-b-gold bg-paper p-8 text-left sm:p-10">
                  <s.icon className="size-8 text-gold" strokeWidth={1.4} />
                  <h3 className="mt-6 font-display text-[1.55rem] leading-snug">
                    {s.title}
                  </h3>
                  {s.subtitle !== s.title ? (
                    <p className="mt-1 font-display text-[1.02rem] text-gold italic">
                      {s.subtitle}
                    </p>
                  ) : null}
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/80">
                    {s.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist pb-24">
        <div className="mx-auto w-[min(92%,1200px)]">
          <Reveal>
            <h2 className="text-center font-display text-[2.4rem] sm:text-[3rem]">
              Son Makaleler
            </h2>
            <div className="gold-rule gold-rule-center my-5" />
          </Reveal>
          {latest.length === 0 ? (
            <p className="mt-10 text-center text-muted">
              Henüz yayınlanmış makale bulunmuyor.
            </p>
          ) : (
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}
          <div className="mt-10 text-center">
            <Link
              to="/makaleler"
              className="inline-flex h-12 items-center bg-gold px-9 text-[0.82rem] font-semibold tracking-[0.12em] text-navy uppercase transition-colors hover:bg-transparent hover:text-gold hover:outline hover:outline-1 hover:outline-gold"
            >
              Tüm Makaleleri Gör
            </Link>
          </div>
        </div>
      </section>

      <section id="prensipler" className="bg-navy py-24 text-paper sm:py-28">
        <div className="mx-auto w-[min(92%,1200px)]">
          <Reveal>
            <h2 className="text-center font-display text-[2.4rem] text-paper sm:text-[3rem]">
              Çalışma Prensiplerimiz
            </h2>
            <div className="gold-rule gold-rule-center my-5" />
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <article className="h-full border border-paper/10 px-7 py-10 text-center">
                  <p.icon className="mx-auto size-9 text-gold" strokeWidth={1.4} />
                  <h4 className="mt-5 font-display text-[1.35rem] text-paper">{p.title}</h4>
                  <p className="mt-3 text-[0.9rem] text-muted">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="sss" className="bg-paper py-24 sm:py-28">
        <div className="mx-auto w-[min(92%,800px)]">
          <Reveal>
            <h2 className="text-center font-display text-[2.4rem] sm:text-[3rem]">
              Sık Sorulan Sorular
            </h2>
            <div className="gold-rule gold-rule-center my-5" />
          </Reveal>
          <div className="mt-10">
            {FAQS.map((item, i) => (
              <details
                key={item.q}
                className="border-b border-line py-6"
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[1.3rem] text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="faq-mark shrink-0" aria-hidden="true" />
                </summary>
                <p className="mt-4 border-l-2 border-gold pl-4 text-ink/90">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="iletisim" className="bg-mist py-24 sm:py-28">
        <div className="mx-auto grid w-[min(92%,1200px)] gap-14 min-[900px]:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-[2.4rem] sm:text-[3rem]">İletişim Bilgileri</h2>
            <div className="gold-rule my-5" />
            <p className="mb-10 text-ink/85">
              Hukuki destek talepleriniz ve randevu oluşturmak için çalışma
              saatleri içerisinde iletişime geçebilirsiniz.
            </p>
            <ul className="space-y-7">
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.6} />
                <div>
                  <h4 className="font-display text-lg">Telefon</h4>
                  <a href={SITE.phoneHref} className="text-ink/85 hover:text-gold">
                    {SITE.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.6} />
                <div>
                  <h4 className="font-display text-lg">E-Posta</h4>
                  <a href={`mailto:${SITE.email}`} className="text-ink/85 hover:text-gold">
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.6} />
                <div>
                  <h4 className="font-display text-lg">Adres</h4>
                  <p className="text-ink/85">
                    {SITE.address1}
                    <br />
                    {SITE.address2}
                  </p>
                </div>
              </li>
            </ul>
            <div className="mt-8 grayscale contrast-110">
              <iframe
                title="Büro konumu"
                src={SITE.mapEmbed}
                className="h-[250px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
