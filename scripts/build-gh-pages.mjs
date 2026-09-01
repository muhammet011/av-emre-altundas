import { mkdirSync, writeFileSync, cpSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docs = join(root, "docs");
const BASE = "/emrehocadeneme/";

const SITE = {
  name: "Av. Emre Altundaş",
  first: "Av. Emre",
  last: "Altundaş",
  title: "Av. Emre Altundaş | Avukatlık ve Hukuki Danışmanlık",
  description:
    "Av. Emre Altundaş Hukuk Bürosu — yabancılar, ceza, aile, iş, gayrimenkul, tüketici, icra ve miras hukukunda avukatlık ve hukuki danışmanlık.",
  tagline: "Hukuk ve Danışmanlık Bürosu",
  phoneDisplay: "+90 (555) 123 45 67",
  phoneHref: "tel:+905551234567",
  whatsappHref: "https://wa.me/905551234567",
  email: "info@emrealtundas.av.tr",
  address1: "Adalet Mahallesi, Hukuk Plaza, Kat: 5 No: 20",
  address2: "Şişli / İstanbul",
};

const NAV = [
  { label: "Hakkımızda", href: "./#hakkimizda" },
  { label: "Özgeçmiş", href: "./#ozgecmis" },
  { label: "Faaliyet Alanları", href: "./#faaliyet" },
  { label: "Makaleler", href: "makaleler/" },
  { label: "SSS", href: "./#sss" },
  { label: "İletişim", href: "./#iletisim" },
];

const SERVICES = [
  {
    title: "Yabancılar Hukuku",
    subtitle: "Yabancılar ve Vatandaşlık Hukuku",
    text: "Türkiye’de bulunan ya da Türkiye ile hukuki bağı olan yabancı ülke vatandaşlarının haklarını korumak ve hukuki süreçlerini eksiksiz yürütmek uzmanlık gerektirir. Yabancılar Hukuku alanında; çalışma ve ikamet izni başvuruları, Türkiye’de gayrimenkul alımı yoluyla veya genel yoldan Türk vatandaşlığı kazanılması süreçleri, sınır dışı (deport) kararlarına itiraz ve tahdit kodlarının kaldırılması davalarında kapsamlı hukuki danışmanlık ve temsil hizmeti sunmaktayız. Mevzuattaki hızlı değişiklikleri yakından takip ederek uluslararası müvekkillerimizin hukuki güvenliğini güvence altına almaktayız.",
  },
  {
    title: "Ceza Hukuku",
    subtitle: "Ceza Hukuku ve Ceza Yargılaması",
    text: "Ceza hukuku, bireylerin hak ve özgürlüklerini doğrudan etkileyen, telafisi güç zararların doğabileceği son derece hassas bir alandır. Soruşturma (karakol ve savcılık ifadesi) aşamasından başlayarak kovuşturma (mahkeme yargılaması), tutukluluğa itiraz, istinaf ve temyiz süreçlerine kadar tüm aşamalarda etkin bir savunma hakkı sunmaktayız. Gerek şüpheli/sanık müdafiliği gerekse mağdur/müşteki vekilliği üstlenerek, adil yargılanma ilkesi çerçevesinde müvekkillerimizin haklarını titizlikle korumaktayız.",
  },
  {
    title: "Boşanma ve Aile Hukuku",
    subtitle: "Boşanma ve Aile Hukuku",
    text: "Aile hukukundan doğan uyuşmazlıklar, hukuki boyutunun yanı sıra duygusal olarak da yıpratıcı süreçlerdir. Anlaşmalı ve çekişmeli boşanma davaları başta olmak üzere; velayet, nafaka, maddi ve manevi tazminat talepleri ile evlilik birliği süresince edinilen malların paylaşımı (mal rejimi) davalarında rehberlik etmekteyiz. Sürecin en az yıpranmayla, hak kaybı yaşanmadan ve hukuka uygun şekilde sonuçlanması için kişiye özel hukuki çözümler üretmekteyiz.",
  },
  {
    title: "İş Hukuku",
    subtitle: "İş ve Sosyal Güvenlik Hukuku",
    text: "Çalışma hayatında işçi ve işveren arasındaki ilişkilerin kanuni çerçevede yürütülmesi, olası uyuşmazlıkların önüne geçilmesi açısından kritik önem taşır. İşçilik alacakları (kıdem tazminatı, ihbar tazminatı, fazla mesai, yıllık izin vb.), işe iade davaları, iş kazası ve meslek hastalığından doğan tazminat davaları ile işçi-işveren arasındaki arabuluculuk süreçlerinde aktif hizmet vermekteyiz. Ayrıca işverenler için iş sözleşmelerinin hazırlanması ve insan kaynakları süreçlerinin hukuka uygunluğunun sağlanması noktasında danışmanlık sunmaktayız.",
  },
  {
    title: "Gayrimenkul Hukuku",
    subtitle: "Gayrimenkul ve Taşınmaz Hukuku",
    text: "Gayrimenkul sektörü, yüksek maddi değerler içeren ve mevzuatı oldukça detaylı olan bir alandır. Tapu iptal ve tescil davaları, müdahalenin men’i (el atmanın önlenmesi), ecrimisil (haksız işgal tazminatı), şufa (ön alım) davaları ile kira ilişkilerinden doğan tahliye ve kira tespiti davalarında müvekkillerimizi temsil etmekteyiz. Aynı zamanda gayrimenkul alım-satım ve kiralama süreçlerinde sözleşmelerin hazırlanması ve hukuki risk analizlerinin yapılması konusunda danışmanlık sağlamaktayız.",
  },
  {
    title: "Tüketici Hukuku",
    subtitle: "Tüketici Hukuku",
    text: "Günlük yaşamda sıkça karşılaşılan ayıplı mal ve hizmet alımları, tüketicilerin hak kayıpları yaşamasına neden olabilmektedir. 6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında; ayıplı mal ve hizmetlerden doğan uyuşmazlıklar, konut ve devremülk satış sözleşmelerinden kaynaklanan sorunlar, abonelik ve mesafeli satış sözleşmeleri ile banka kredi masrafları ve sözleşme şartlarına ilişkin ihtilaflarda hizmet vermekteyiz. Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri nezdindeki başvuru ve dava süreçlerini takip ederek müvekkillerimizin mağduriyetlerinin giderilmesini sağlamaktayız.",
  },
  {
    title: "İcra ve İflas Hukuku",
    subtitle: "İcra ve İflas Hukuku",
    text: "Alacakların zamanında, etkin ve kanuni yollarla tahsil edilmesi kadar, haksız icra takipleri karşısında borçluların haklarının korunması da büyük önem taşır. İlama dayalı veya ilamsız icra takipleri, kambiyo senetlerine (çek, senet, poliçe) özgü takipler, ihtiyati haciz kararlarının alınması ve uygulanması süreçlerini yürütmekteyiz. Aynı zamanda borca ve takibe itiraz, itirazın iptali ve kaldırılması davaları, menfi tespit ve istirdat (geri alım) davaları ile tahliye süreçlerinde müvekkillerimizin finansal ve hukuki çıkarlarını titizlikle savunmaktayız.",
  },
  {
    title: "Miras Hukuku",
    subtitle: "Miras Hukuku",
    text: "Miras hukuku; vefat sonrasında mal varlığının kime ve nasıl devredileceğine ilişkin hassas ve teknik kurallar içerir. Veraset ilamı (mirasçılık belgesi) alınması, vasiyetname düzenlenmesi veya iptali, saklı payın ihlali halinde açılacak tenkis davaları, mirasın reddi (reddi miras) ve izale-i şuyu (ortaklığın giderilmesi) davalarında hukuki destek sağlamaktayız. Mirasçıların hak kayıplarına uğramasını önlemek ve mirastan doğan uyuşmazlıkları adil bir şekilde çözüme kavuşturmak amacıyla çalışmaktayız.",
  },
];

const PRINCIPLES = [
  {
    title: "Sır Saklama Yükümlülüğü",
    text: "Müvekkillerimize ait tüm bilgi ve belgeler, meslek kuralları gereğince mutlak bir gizlilik içinde korunur.",
  },
  {
    title: "Mesleki Şeffaflık",
    text: "Hukuki süreçlerin her aşaması, olası riskler ve sonuçlar müvekkillerimizle açık ve dürüst biçimde paylaşılır.",
  },
  {
    title: "Özen Yükümlülüğü",
    text: "Üstlenilen hukuki iş ve işlemler, güncel mevzuat ve içtihatlar ışığında en yüksek mesleki özenle takip edilir.",
  },
  {
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

const ARTICLES = [
  {
    slug: "kira-sozlesmelerinde-dikkat-edilmesi-gerekenler",
    title: "Kira Sözleşmelerinde Dikkat Edilmesi Gerekenler",
    summary:
      "Konut ve çatılı işyeri kiralarında sözleşme kurulurken yazılması gereken maddeler, depozito, tahliye taahhüdü ve zam sınırına ilişkin pratik esaslar.",
    image: "images/articles/pen.jpg",
    category: "Gayrimenkul Hukuku",
    date: "18 Haziran 2026",
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
    slug: "anlasmali-bosanma-sureci",
    title: "Anlaşmalı Boşanma Süreci Nasıl İşler?",
    summary:
      "Anlaşmalı boşanmanın şartları, protokolde yer alması gereken hususlar ve duruşmada dikkat edilmesi gerekenler.",
    image: "images/articles/books.jpg",
    category: "Aile Hukuku",
    date: "27 Mayıs 2026",
    content: `Anlaşmalı boşanma, evlilik birliğinin en az bir yıl sürmüş olması ve eşlerin boşanma ile sonuçları üzerinde tam bir mutabakata varmış olmaları halinde mümkündür. Bu yol, çekişmeli yargılamaya göre daha kısa ve öngörülebilir bir süreç sunar.

Protokol; nafaka, velayet, kişisel ilişki, ziynet ve mal rejiminin tasfiyesine ilişkin açık hükümler içermelidir. Muğlak "karşılıklı alacak yoktur" cümleleri, sonradan açılan davaların temelini oluşturabilir.

Velayet düzenlenirken çocuğun üstün yararı esastır. Kişisel ilişki gün ve saatlerinin somut yazılması, sonraki icra ve ihlal iddialarını azaltır. İştirak nafakasının tutarı, ödeme günü ve artış usulü protokole işlenmelidir.

Duruşmada her iki eşin de hâkim huzurunda protokolü serbest iradeyle kabul ettiğini beyan etmesi gerekir. Bir tarafın yokluğu kural olarak anlaşmalı boşanmayı düşürür.

Anlaşmalı boşanma kararı kesinleşmeden yeni bir evlilik yapılamaz. Kararın tebliği ve kesinleşme şerhi, sonraki işlemler için belgelenmelidir.

Bu yazı genel bilgilendirme niteliğindedir ve yerini somut dosya incelemesine bırakmaz.`,
  },
  {
    slug: "ise-iade-davasinin-sartlari",
    title: "İşe İade Davasının Şartları",
    summary:
      "İş güvencesi kapsamı, bir aylık hak düşürücü süre, feshin geçerli nedene dayanması ve işe iade kararının sonuçları.",
    image: "images/articles/gavel.jpg",
    category: "İş Hukuku",
    date: "14 Nisan 2026",
    content: `İşe iade davası, belirsiz süreli iş sözleşmesiyle çalışan ve iş güvencesi kapsamındaki işçinin, feshin geçersizliğini ileri sürdüğü özel bir davadır. İşe iade, her feshin otomatik sonucu değildir; kanundaki şartların birlikte gerçekleşmesi gerekir.

İş güvencesi kural olarak, otuz veya daha fazla işçi çalıştıran işyerinde en az altı aylık kıdemi bulunan işçiler için söz konusudur. Belirli süreli sözleşmeler ve bazı yönetici konumları bu korumanın dışında kalabilir.

Fesih bildiriminin tebliğinden itibaren bir aylık hak düşürücü süre içinde arabulucuya başvurulması zorunludur. Süre, işçi lehine yorumlansa da kaçırıldığında dava dinlenmez.

İşveren, feshin geçerli bir nedene dayandığını ispatla yükümlüdür. Performans, davranış veya işletmesel gerekçeler somut, ölçülebilir ve usulüne uygun tespitlerle ortaya konmalıdır. Savunma alınmadan yapılan davranış fesihleri sıklıkla geçersiz bulunmaktadır.

Mahkemenin feshin geçersizliğine karar vermesi halinde işçi, kararın tebliğinden itibaren on iş günü içinde işe başlamak üzere işverene başvurmalıdır. Süresinde başvurulmazsa fesih geçerli hale gelir.

Yazı, genel çerçeveyi çizer; kıdem, ihbar ve işe başlatmama tazminatı hesapları dosya verilerine göre ayrıca yapılır.`,
  },
  {
    slug: "6284-sayili-kanun-koruma-tedbirleri",
    title: "6284 Sayılı Kanun Kapsamında Koruma Tedbirleri",
    summary:
      "Ailenin korunması ve kadına karşı şiddetin önlenmesine ilişkin tedbir kararlarının kapsamı, süresi ve ihlalin sonuçları.",
    image: "images/articles/columns.jpg",
    category: "Aile Hukuku",
    date: "9 Mart 2026",
    content: `6284 sayılı Ailenin Korunması ve Kadına Karşı Şiddetin Önlenmesine Dair Kanun, şiddet mağduruna hızlı ve geçici koruma sağlamayı amaçlar. Tedbir kararı, esasa ilişkin bir ceza yargılamasının yerine geçmez; ancak ihlali ayrı yaptırımlara bağlanır.

Koruyucu tedbirler arasında barınma yeri sağlanması, geçici maddi yardım, psikolojik destek ve kimlik bilgilerinin gizlenmesi sayılabilir. Önleyici tedbirler ise evden uzaklaştırma, yaklaşmama, iletişim yasağı ve silah teslimi gibi yükümlülükleri kapsar.

Kararlar, gecikmesinde sakınca bulunan hâllerde mülki amir veya kolluk tarafından da verilebilir; hâkim onayına sunulur. Süre kural olarak altı aydır ve uzatılabilir.

Tedbirin ihlali, Türk Ceza Kanunu'ndaki ilgili suç tiplerinden bağımsız olarak 6284 m. 13 uyarınca zorlama hapsine konu olabilir. Mağdurun "vazgeçmesi", kamu düzenini ilgilendiren tedbirin kendiliğinden düşmesi anlamına gelmez.

Başvuru, Aile Mahkemesi'ne veya 112 / 183 hatları ve kolluk aracılığıyla yapılabilir. Delil eşiği, ceza yargılamasındaki kadar katı tutulmaz; somut olayın özelliği yeterlidir.

Bu metin hukuki mütalaa yerine geçmez. Şiddet tehlikesi varsa öncelik, güvenliğin derhal sağlanmasıdır.`,
  },
  {
    slug: "icra-takibinde-borclu-ve-alacaklinin-haklari",
    title: "İcra Takibinde Borçlu ve Alacaklının Hakları",
    summary:
      "Ödeme emrine itiraz, haciz, istihkak ve takibin iptali başlıklarında hem alacaklı hem borçlu yönünden temel usul hakları.",
    image: "images/articles/scales.jpg",
    category: "İcra ve İflas Hukuku",
    date: "3 Şubat 2026",
    content: `İcra takibi, alacağın devlet gücüyle tahsilini sağlayan bir yoldur. Hem alacaklı hem borçlu için süreler hak düşürücüdür; "görmedim" savunması çoğu kez sonuç vermez.

İlamsız takipte ödeme emrine yedi gün içinde itiraz edilmezse takip kesinleşir. İtiraz, takibi durdurur; alacaklı itirazın iptali veya kaldırılması yollarına başvurabilir. İmzaya itiraz ile borca itirazın hukuki sonuçları farklıdır.

Hacizde, borçlunun hâlihazırda kullandığı zorunlu eşya ve nafaka nitelikli gelirin bir kısmı haczedilemez. Maaş haczi kural olarak dörtte bir oranındadır; nafaka alacaklarında oran değişebilir.

Üçüncü kişinin elindeki malın haczi istihkak iddiasını doğurur. İstihkak davası, haciz tarihinden itibaren yedi gün gibi kısa sürelerle örülüdür.

Takibin iptali ve taliki, borcun sona ermesi, zamanaşımı veya usulsüz tebligat gibi nedenlere dayanabilir. Tebligatın usulsüzlüğü, öğrenme tarihinden itibaren süreleri yeniden başlatabilir.

İcra dosyası, evrakın tamlığı ve sürelerin kaçırılmaması üzerine kuruludur. Genel bilgi, somut dosya incelemesinin yerini tutmaz.`,
  },
  {
    slug: "tapu-iptal-ve-tescil-davalari",
    title: "Tapu İptal ve Tescil Davalarına İlişkin Temel Esaslar",
    summary:
      "Muris muvazaası, sahtecilik, ehliyetsizlik ve kazandırıcı zamanaşımı iddialarında tapu kaydının düzeltilmesi.",
    image: "images/articles/building.jpg",
    category: "Gayrimenkul Hukuku",
    date: "16 Ocak 2026",
    content: `Tapu sicili, taşınmaz üzerindeki hakları gösteren resmi kayıttır. Sicile güven ilkesi, iyiniyetli üçüncü kişileri korur; ancak kaydın yolsuz olduğu hâllerde iptal ve tescil davası açılabilir.

Muris muvazaası, miras bırakının mirasçılardan mal kaçırmak amacıyla yaptığı temliklerde sıkça ileri sürülür. Yargıtay, satışın gerçek bedelinin ödenip ödenmediğini, tarafların ekonomik durumunu ve tapu dışı delilleri birlikte değerlendirir.

Sahte vekâletname veya ehliyetsizlik iddialarında, işlemin yokluğu veya butlanı söz konusu olabilir. Bu davalarda zamanaşımı ve hak düşürücü süreler, hukuki niteliğe göre değişir.

Kazandırıcı zamanaşımı ile tescil, malikin tapuda görünmediği ve zilyetliğin kanundaki süre ve koşullarla sürdüğü hâllerde gündeme gelir. Zilyetliğin çekişmesiz, malik sıfatıyla ve aralıksız olması aranır.

Dava, kural olarak taşınmazın bulunduğu yer mahkemesinde açılır. Tedbiren tapu kaydına şerh konulması, davanın devamında üçüncü kişilere karşı koruma sağlar.

Taşınmaz uyuşmazmaları, keşif ve bilirkişi incelemesine dayanır. Bu yazı, dosyadaki tapu kaydı ve belgeler görülmeden hüküm ifade etmez.`,
  },
];

const KVKK = [
  {
    title: "Veri Sorumlusu",
    body: `${SITE.name} Hukuk Bürosu (“Büro”), 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca veri sorumlusu sıfatıyla, işbu internet sitesi üzerinden iletişim formu aracılığıyla tarafımızla paylaştığınız kişisel verilerinizin işlenmesine ilişkin olarak sizi bilgilendirmek isteriz.`,
  },
  {
    title: "İşlenen Kişisel Veriler",
    body: "İletişim formu aracılığıyla ad-soyad, e-posta adresi, telefon numarası ve mesaj içeriğinde paylaştığınız diğer bilgiler işlenmektedir.",
  },
  {
    title: "İşlenme Amacı",
    body: "Paylaştığınız kişisel veriler; tarafınızca iletilen talep ve sorulara yanıt verilmesi, randevu ve danışmanlık süreçlerinin yürütülmesi, hukuki destek taleplerinin değerlendirilmesi ve büromuzla iletişiminizin sağlanması amaçlarıyla sınırlı olarak işlenmektedir.",
  },
  {
    title: "Hukuki Sebep",
    body: "Kişisel verileriniz, KVKK’nın 5. maddesinde yer alan “ilgili kişinin açık rızasının bulunması” hukuki sebebine dayanılarak işlenmektedir.",
  },
  {
    title: "Aktarım",
    body: "Kişisel verileriniz, yasal zorunluluklar dışında üçüncü kişilerle paylaşılmamaktadır.",
  },
  {
    title: "Saklama Süresi",
    body: "Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve yasal saklama yükümlülükleri çerçevesinde muhafaza edilmektedir.",
  },
  {
    title: "Haklarınız",
    body: "KVKK’nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde/yurt dışında aktarıldığı üçüncü kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini isteme, KVKK’da öngörülen şartlar çerçevesinde silinmesini/yok edilmesini isteme, yapılan işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme, münhasıran otomatik sistemlerle analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.",
  },
];

function esc(s) {
  return String(s)
    .replaceAll("&", "&" + "amp;")
    .replaceAll("<", "&" + "lt;")
    .replaceAll(">", "&" + "gt;")
    .replaceAll('"', "&" + "quot;");
}

function md(src) {
  const lines = src.split("\n");
  const out = [];
  let list = [];
  const flushList = () => {
    if (!list.length) return;
    out.push(`<ul>${list.map((i) => `<li>${i}</li>`).join("")}</ul>`);
    list = [];
  };
  const inline = (t) =>
    t
      .replaceAll("&", "&" + "amp;")
      .replaceAll("<", "&" + "lt;")
      .replaceAll(">", "&" + "gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  for (const line of lines) {
    if (line.startsWith("- ")) {
      list.push(inline(line.slice(2)));
      continue;
    }
    flushList();
    if (!line.trim()) continue;
    if (line.startsWith("## ")) {
      out.push(`<h2>${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith("> ")) {
      out.push(`<blockquote>${inline(line.slice(2))}</blockquote>`);
    } else {
      out.push(`<p>${inline(line)}</p>`);
    }
  }
  flushList();
  return out.join("\n");
}

function icon(name) {
  const common = 'viewBox="0 0 24 24" aria-hidden="true"';
  const paths = {
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    scale:
      '<path d="M12 3v18M5 7h14"/><path d="M5 7l-3 6a4 4 0 0 0 6 0L5 7M19 7l-3 6a4 4 0 0 0 6 0L19 7"/><path d="M8 21h8"/>',
    users:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    briefcase:
      '<rect x="2" y="7" width="20" height="14" rx="0"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20"/>',
    building:
      '<rect x="4" y="2" width="16" height="20"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
    bag: '<path d="M6 8h12l1 13H5L6 8z"/><path d="M9 8V7a3 3 0 0 1 6 0v1"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
    scroll: '<path d="M8 21h8a2 2 0 0 0 2-2V5"/><path d="M6 3h10a2 2 0 0 1 2 2v14"/><path d="M8 21a2 2 0 0 1-2-2V5a2 2 0 1 0-2 2h2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    gavel: '<path d="m14 13-8.5 8.5M16 16l6-6M8 8l6-6M9 7l8 8"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.25a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z"/>',
    mail: '<rect x="2" y="4" width="20" height="16"/><path d="m22 7-10 7L2 7"/>',
    pin: '<path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.2"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
  };
  return `<svg ${common}>${paths[name] || ""}</svg>`;
}

function waSvg() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m-2.73 4.2c-.17-.38-.35-.39-.51-.4h-.44c-.15 0-.4.06-.61.3-.21.24-.8.78-.8 1.9s.82 2.21.93 2.36c.12.15 1.58 2.47 3.86 3.37 1.9.75 2.29.6 2.7.56.41-.04 1.33-.54 1.52-1.07.19-.53.19-.98.13-1.07-.06-.09-.23-.15-.48-.27s-1.33-.65-1.54-.73c-.21-.07-.36-.11-.51.12-.15.23-.58.72-.71.87-.13.15-.26.16-.48.04-.23-.12-.95-.35-1.81-1.11-.67-.6-1.12-1.33-1.25-1.56-.13-.23-.01-.35.1-.46.1-.1.23-.27.34-.4.11-.13.15-.23.23-.38.07-.15.04-.29-.02-.4-.06-.12-.51-1.3-.71-1.77"/></svg>`;
}

function layout({ title, description, body, canonical = "./" }) {
  const navLinks = NAV.map((n) => `<a href="${n.href}">${n.label}</a>`).join("");
  const mobileLinks = NAV.map(
    (n) => `<a class="nav-link" href="${n.href}" data-close-menu>${n.label}</a>`,
  ).join("");
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <base href="${BASE}" />
  <link rel="canonical" href="${BASE}${canonical.replace(/^\.\//, "")}" />
  <link rel="icon" href="favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,500;1,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/site.css" />
</head>
<body>
  <header class="site-header" data-header>
    <div class="wrap header-inner">
      <a class="brand" href="./" data-close-menu>${SITE.first} <span>${SITE.last}</span></a>
      <nav class="nav-desktop" aria-label="Ana menü">${navLinks}</nav>
      <div class="header-actions">
        <a class="header-wa" href="${SITE.whatsappHref}" target="_blank" rel="noreferrer">WhatsApp</a>
        <button type="button" class="menu-btn" data-menu-toggle aria-label="Menüyü aç" aria-expanded="false">
          <span class="burger" data-icon-open aria-hidden="true"></span>
          <span class="burger-x" data-icon-close hidden aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </header>
  <div class="mobile-overlay" data-overlay role="dialog" aria-modal="true" aria-label="Mobil menü">
    <nav>
      ${mobileLinks}
      <a class="mobile-cta" href="./#iletisim" data-close-menu>İletişime Geçin</a>
      <a class="mobile-wa" href="${SITE.whatsappHref}" target="_blank" rel="noreferrer">WhatsApp</a>
    </nav>
  </div>
  ${body}
  <footer class="site-footer">
    <div class="wrap">
      <a class="brand" href="./">${SITE.first} <span>${SITE.last}</span></a>
      <p class="sub">Hukuk ve Danışmanlık</p>
      <nav class="footer-nav">
        <a href="./#ozgecmis">Özgeçmiş</a>
        <a href="makaleler/">Makaleler</a>
        <a href="kvkk/">KVKK</a>
        <a href="./#iletisim">İletişim</a>
      </nav>
      <p class="copy">© ${new Date().getFullYear()} ${SITE.name} Hukuk Bürosu. Tüm hakları saklıdır.</p>
      <p class="credit">MB Design tarafından mevzuata uygun hazırlanmıştır.</p>
    </div>
  </footer>
  <a class="wa-float" href="${SITE.whatsappHref}" target="_blank" rel="noreferrer" aria-label="WhatsApp ile yazın">${waSvg()}</a>
  <script src="js/site.js"></script>
</body>
</html>
`;
}

function articleCard(a) {
  return `<a class="article-card" href="makale/${a.slug}/" data-article-cat="${esc(a.category)}">
    <img src="${a.image}" alt="" />
    <div class="pad">
      <p class="cat">${esc(a.category)}</p>
      <h3>${esc(a.title)}</h3>
      <p>${esc(a.summary)}</p>
      <span class="more">Devamını oku</span>
    </div>
  </a>`;
}

const serviceIcons = ["globe", "scale", "users", "briefcase", "building", "bag", "file", "scroll"];
const principleIcons = ["shield", "eye", "scale", "gavel"];

const homeBody = `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="kicker">${SITE.tagline}</p>
      <h1>Avukatlık ve Hukuki Danışmanlık Hizmetleri.</h1>
      <p class="lead">Ulusal ve uluslararası mevzuat çerçevesinde, gerçek ve tüzel kişilere yönelik avukatlık ve hukuki danışmanlık hizmeti sunulmaktadır.</p>
      <div class="hero-actions">
        <a class="btn-gold" href="./#iletisim">İletişime Geçin</a>
        <a class="btn-outline" href="${SITE.whatsappHref}" target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    </div>
    <div class="portrait-wrap">
      <img src="images/emre-altundas.jpg" alt="Av. Emre Altundaş — Elazığ Adalet Sarayı önünde" />
    </div>
  </div>
</section>
<section class="section paper" id="hakkimizda">
  <div class="wrap two-col">
    <div>
      <h2>Büromuz Hakkında</h2>
      <div class="gold-rule"></div>
      <p class="body-copy">Av. Emre Altundaş Hukuk Bürosu, bireylerin ve işletmelerin karşılaştığı hukuki meselelere kalıcı ve uygulanabilir çözümler üretmek amacıyla kuruldu. Her dosyayı kendine özgü bir süreç olarak ele alıyor, müvekkillerimizin haklarını en etkin şekilde savunmak için sürecin her adımını birlikte yürütüyoruz.</p>
      <p class="quote">Ceza ve aile hukukundan yabancılar, iş ve gayrimenkul uyuşmazlıklarına kadar geniş bir alanda hizmet veriyoruz.</p>
      <p class="body-copy">Bizim için hukuk yalnızca kanun maddelerinden ibaret değil; güven, açıklık ve emek ister. Bu nedenle müvekkillerimizle kurduğumuz her ilişkide dürüstlüğü, gizliliği ve adalete erişimi önceliğimiz olarak görüyoruz.</p>
    </div>
    <img class="office-img" src="images/office.jpg" alt="Hukuk bürosu çalışma salonu" />
  </div>
</section>
<section class="section mist" id="ozgecmis">
  <div class="wrap two-col">
    <img class="bio-portrait" src="images/emre-altundas.jpg" alt="Av. Emre Altundaş" />
    <div>
      <p class="eyebrow">Kurucu Avukat</p>
      <h2>Özgeçmiş</h2>
      <div class="gold-rule"></div>
      <p class="body-copy">Av. Emre Altundaş, bireylerin ve işletmelerin hukuki süreçlerini özen, gizlilik ve bağımsızlık ilkeleriyle yürütmek üzere bürosunu kurmuştur. Dava takibi ve danışmanlıkta, her dosyayı kendi bağlamında ele alır.</p>
      <div class="bio-card">
        <p><strong>Eğitim:</strong> <span>İstanbul Üniversitesi Hukuk Fakültesi mezunu; ceza hukuku ve ticaret hukuku alanlarında ileri düzey sertifika programlarını tamamlamış, mesleki gelişimini güncel mevzuat ve içtihat takibiyle sürdürmektedir.</span></p>
        <p><strong>Kariyer:</strong> <span>10 yılı aşkın süredir ceza, aile, yabancılar ve ticaret hukuku alanlarında dava takibi yürütmekte; KOBİ ve kurumsal firmalara sözleşme ve uyuşmazlık yönetimi konusunda danışmanlık vermektedir.</span></p>
        <p><strong>Misyon:</strong> <span>Her müvekkilin hikâyesinin farklı olduğu inancıyla, hukukun üstünlüğü ilkesi çerçevesinde savunma hakkının etkin ve özenli biçimde kullanılmasını ilke edinmiştir.</span></p>
      </div>
    </div>
  </div>
</section>
<section class="section mist" id="faaliyet">
  <div class="wrap center">
    <h2>Faaliyet Alanlarımız</h2>
    <div class="gold-rule center"></div>
    <p class="muted">Büromuz nezdinde yürütülen başlıca çalışma alanları aşağıda sunulmuştur.</p>
    <div class="cards-2">
      ${SERVICES.map(
        (s, i) => `<article class="service-card">${icon(serviceIcons[i])}
        <h3>${esc(s.title)}</h3>
        ${s.subtitle !== s.title ? `<p class="service-sub">${esc(s.subtitle)}</p>` : ""}
        <p>${esc(s.text)}</p>
      </article>`,
      ).join("")}
    </div>
  </div>
</section>
<section class="section mist" style="padding-top:0">
  <div class="wrap">
    <h2 class="center">Son Makaleler</h2>
    <div class="gold-rule center"></div>
    <div class="article-grid">${ARTICLES.slice(0, 3).map(articleCard).join("")}</div>
    <p class="center" style="margin-top:2.5rem"><a class="btn-gold" href="makaleler/">Tüm Makaleleri Gör</a></p>
  </div>
</section>
<section class="section navy" id="prensipler">
  <div class="wrap">
    <h2 class="center">Çalışma Prensiplerimiz</h2>
    <div class="gold-rule center"></div>
    <div class="principles">
      ${PRINCIPLES.map(
        (p, i) => `<article class="principle">${icon(principleIcons[i])}<h4>${esc(p.title)}</h4><p>${esc(p.text)}</p></article>`,
      ).join("")}
    </div>
  </div>
</section>
<section class="section paper" id="sss">
  <div class="wrap">
    <h2 class="center">Sık Sorulan Sorular</h2>
    <div class="gold-rule center"></div>
    <div class="faq">
      ${FAQS.map(
        (f, i) => `<details${i === 0 ? " open" : ""}>
        <summary>${esc(f.q)}<span class="faq-mark" aria-hidden="true"></span></summary>
        <p>${esc(f.a)}</p>
      </details>`,
      ).join("")}
    </div>
  </div>
</section>
<section class="section mist" id="iletisim">
  <div class="wrap two-col">
    <div>
      <h2>İletişim Bilgileri</h2>
      <div class="gold-rule"></div>
      <p class="body-copy">Hukuki destek talepleriniz ve randevu oluşturmak için çalışma saatleri içerisinde iletişime geçebilirsiniz.</p>
      <ul class="contact-list">
        <li>${icon("phone")}<div><h4>Telefon</h4><a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a></div></li>
        <li>${icon("mail")}<div><h4>E-Posta</h4><a href="mailto:${SITE.email}">${SITE.email}</a></div></li>
        <li>${icon("pin")}<div><h4>Adres</h4><p>${SITE.address1}<br />${SITE.address2}</p></div></li>
      </ul>
      <div class="map-wrap">
        <iframe title="Büro konumu" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.9791484641663!2d28.9877473154154!3d41.05837697929424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab71d4715f5eb%3A0x8cfedb734892c23b!2zxZ5pxZ9saS9Jc3RhbmJ1bA!5e0!3m2!1str!2str!4v1684343167119!5m2!1str!2str" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
    <form class="form" id="contactForm">
      <h3>Mesaj Gönderin</h3>
      <p data-form-note></p>
      <input name="name" required placeholder="Adınız Soyadınız" />
      <input type="email" name="email" required placeholder="E-Posta Adresiniz" />
      <input type="tel" name="phone" placeholder="Telefon Numaranız" />
      <textarea name="message" required rows="5" placeholder="Danışmak istediğiniz hukuki konuyu kısaca özetleyiniz..."></textarea>
      <label class="kvkk-row"><input type="checkbox" name="kvkk_onay" required /><span><a href="kvkk/">KVKK Aydınlatma Metni</a>’ni okudum, kişisel verilerimin iletilmesini kabul ediyorum.</span></label>
      <button class="btn-gold" type="submit">Gönder</button>
    </form>
  </div>
</section>
`;

function write(rel, html) {
  const path = join(docs, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, html);
}

cpSync(join(root, "public/images"), join(docs, "images"), { recursive: true });
copyFileSync(join(root, "public/favicon.svg"), join(docs, "favicon.svg"));
writeFileSync(join(docs, ".nojekyll"), "");

write(
  "index.html",
  layout({ title: SITE.title, description: SITE.description, body: homeBody, canonical: "./" }),
);

const cats = ["all", ...new Set(ARTICLES.map((a) => a.category))];
const makalelerBody = `
<section class="page-hero"><div class="wrap"><h1>Makaleler</h1><p>Hukuki süreçlere ilişkin genel bilgilendirme yazıları.</p></div></section>
<section class="section mist">
  <div class="wrap">
    <div class="filters">
      ${cats
        .map(
          (c, i) =>
            `<button type="button" class="filter${i === 0 ? " is-on" : ""}" data-filter="${c === "all" ? "all" : esc(c)}">${c === "all" ? "Tümü" : esc(c)}</button>`,
        )
        .join("")}
    </div>
    <div class="article-grid">${ARTICLES.map(articleCard).join("")}</div>
  </div>
</section>
`;
write(
  "makaleler/index.html",
  layout({
    title: `Makaleler | ${SITE.name}`,
    description: "Hukuk bürosu makaleleri.",
    body: makalelerBody,
    canonical: "makaleler/",
  }),
);

const kvkkBody = `
<section class="page-hero"><div class="wrap"><h1>KVKK Aydınlatma Metni</h1><p>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme.</p></div></section>
<section class="section paper">
  <div class="wrap">
    ${KVKK.map((k) => `<article class="kvkk-block"><h2>${esc(k.title)}</h2><p class="body-copy">${esc(k.body)}</p></article>`).join("")}
    <p class="kvkk-block body-copy">Bu haklarınızı kullanmak için ${SITE.email} adresinden büromuzla iletişime geçebilirsiniz.</p>
  </div>
</section>
`;
write(
  "kvkk/index.html",
  layout({
    title: `KVKK | ${SITE.name}`,
    description: "KVKK aydınlatma metni.",
    body: kvkkBody,
    canonical: "kvkk/",
  }),
);

for (const a of ARTICLES) {
  const body = `
<section class="page-hero"><div class="wrap"><p class="eyebrow">${esc(a.category)} · ${esc(a.date)}</p><h1>${esc(a.title)}</h1></div></section>
<img class="article-hero-img" src="${a.image}" alt="" />
<section class="section paper"><div class="article-prose">${md(a.content)}<p style="margin-top:2.5rem"><a class="btn-outline" href="makaleler/">Tüm makaleler</a></p></div></section>
`;
  write(
    `makale/${a.slug}/index.html`,
    layout({
      title: `${a.title} | ${SITE.name}`,
      description: a.summary,
      body,
      canonical: `makale/${a.slug}/`,
    }),
  );
}

write(
  "404.html",
  layout({
    title: `Sayfa bulunamadı | ${SITE.name}`,
    description: SITE.description,
    body: `<section class="page-hero"><div class="wrap"><h1>Sayfa bulunamadı</h1><p>Aradığınız sayfa taşınmış veya silinmiş olabilir.</p><p style="margin-top:1.5rem"><a class="btn-gold" href="./">Ana sayfaya dön</a></p></div></section>`,
    canonical: "./",
  }),
);

console.log("GitHub Pages static site written to docs/");
