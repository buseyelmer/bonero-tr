export type HelpCategoryId =
  | "baslangic"
  | "omnichannel"
  | "yapay-zeka"
  | "reklam"
  | "operasyon";

export type HelpCategory = {
  id: HelpCategoryId;
  title: string;
  description: string;
};

export type HelpBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; text: string }
  | {
      type: "steps";
      items: { title: string; body: string }[];
    };

export type HelpArticle = {
  slug: string;
  category: HelpCategoryId;
  title: string;
  description: string;
  readingMinutes: number;
  updatedAt: string;
  body: HelpBlock[];
};

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    id: "baslangic",
    title: "Başlangıç",
    description: "Hesap, kanal bağlama ve ilk gün kurulumu.",
  },
  {
    id: "omnichannel",
    title: "Omnichannel",
    description: "Birleşik gelen kutusu, atama ve yanıt akışı.",
  },
  {
    id: "yapay-zeka",
    title: "AI Agent",
    description: "Otomatik yanıt, yönlendirme ve kurallar.",
  },
  {
    id: "reklam",
    title: "Reklam & içerik",
    description: "Kampanya, kreatif ve yayın yönetimi.",
  },
  {
    id: "operasyon",
    title: "Operasyon",
    description: "CRM, randevu, raporlama ve ekip rolleri.",
  },
];

export const HELP_ARTICLES: HelpArticle[] = [
  {
    slug: "hizli-baslangic",
    category: "baslangic",
    title: "Bonero’ya hızlı başlangıç",
    description:
      "Hesabınızı açın, ilk kanalı bağlayın ve ekibi davet edin — yaklaşık 15 dakikada canlıya geçin.",
    readingMinutes: 6,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: "Bu rehber Bonero’yu ilk kez kuran ekipler içindir. Amaç: aynı gün Unified Inbox’ta mesaj yanıtlayabilir hale gelmek. Adımları sırayla izleyin; her adım bir sonrakine bağlıdır.",
      },
      {
        type: "h2",
        text: "Ne hazır olmalı?",
      },
      {
        type: "ul",
        items: [
          "İş e-posta adresiniz (kayıt ve davetler için)",
          "Bağlamak istediğiniz kanal hesapları (WhatsApp Business, Instagram veya e-posta)",
          "En az bir ekip üyesi e-postası (isteğe bağlı ama önerilir)",
        ],
      },
      {
        type: "h2",
        text: "Kurulum adımları",
      },
      {
        type: "steps",
        items: [
          {
            title: "Hesap oluşturun",
            body: "panel.bonero.tr üzerinden kayıt olun. Şirket adınızı ve birincil iletişim e-postanızı girin. Onay mailindeki bağlantıyı açın.",
          },
          {
            title: "İlk kanalı bağlayın",
            body: "Ayarlar → Kanallar menüsünden WhatsApp, Instagram veya e-posta seçin. Meta / Google izin ekranlarını tamamlayın. Bağlantı yeşil “Aktif” olana kadar bekleyin.",
          },
          {
            title: "Gelen kutusunu kontrol edin",
            body: "Omnichannel inbox’a gidin. Test mesajı gönderin — kanal etiketi ve okunmamış nabız görünmelidir. Bu, kurulumun çalıştığını doğrular.",
          },
          {
            title: "Ekibi davet edin",
            body: "Ayarlar → Ekip’ten roller atayın (ör. Operatör, Yönetici). Davet maili gitsin; herkes aynı inbox’tan yanıtlasın.",
          },
        ],
      },
      {
        type: "tip",
        text: "İlk gün sadece bir kanal bağlayın. Hepsi birden bağlanınca sorun ayıklamak zorlaşır. Stabil olduktan sonra ikinci kanalı ekleyin.",
      },
      {
        type: "h2",
        text: "Sonraki adımlar",
      },
      {
        type: "ol",
        items: [
          "Omnichannel gelen kutusu rehberiyle atama ve etiketleri öğrenin",
          "AI Agent’ı açarak gece/ hafta sonu ilk yanıtı otomatikleştirin",
          "CRM’de lead kartlarının kanal mesajlarıyla nasıl birleştiğini kontrol edin",
        ],
      },
      {
        type: "p",
        text: "Takıldığınız adımı not alın — İletişim formundan veya Destek talebiyle yazın; genelde 1 iş günü içinde dönüş yapılır.",
      },
    ],
  },
  {
    slug: "omnichannel-gelen-kutusu",
    category: "omnichannel",
    title: "Omnichannel gelen kutusu nasıl kullanılır?",
    description:
      "WhatsApp, Instagram, e-posta ve web taleplerini tek listede okuyun, etiketleyin ve yanıtlayın.",
    readingMinutes: 7,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: "Omnichannel, tüm müşteri mesajlarını tek gelen kutusunda birleştirir. Kanal fark etmeksizin aynı müşterinin geçmişi görünür; ekip sekme değiştirmeden çalışır.",
      },
      {
        type: "h2",
        text: "Ekranı tanıyalım",
      },
      {
        type: "ul",
        items: [
          "Sol liste: okunmamış / tümü / atananlar filtreleri",
          "Orta alan: konuşma thread’i (kanal etiketi üstte)",
          "Sağ panel: müşteri kartı, etiketler, sonraki adım",
        ],
      },
      {
        type: "h2",
        text: "Günlük kullanım",
      },
      {
        type: "steps",
        items: [
          {
            title: "Sabah filtremizi seçin",
            body: "“Okunmamış” ile başlayın. Acil etiketli (şikayet, randevu) kayıtları önce kapatın; sonra rutin sorulara geçin.",
          },
          {
            title: "Yanıtlayın veya atayın",
            body: "Kendi alanınızdaysa doğrudan yanıtlayın. Değilse “Ata” ile doğru kişiyi seçin — çift cevap riski azalır.",
          },
          {
            title: "Etiket ve not ekleyin",
            body: "Lead, no-show, VIP gibi etiketler ekleyin. Kısa bir iç not bırakın; bir sonraki mesajda bağlam hazır olur.",
          },
          {
            title: "Kanal değişimini takip edin",
            body: "Müşteri IG’den WhatsApp’a geçmiş olsa da aynı kartta kalır. Geçmişi kaydırmadan okuyun — tekrar sormayın.",
          },
        ],
      },
      {
        type: "tip",
        text: "Aynı mesajı iki kişi yanıtlamamak için konuşmayı üstünüze alın (claim). Yoğun saatlerde bu alışkanlık tempo kaybını önler.",
      },
      {
        type: "h2",
        text: "Sık yapılan hatalar",
      },
      {
        type: "ul",
        items: [
          "Filtreyi “Tümü”de bırakıp okunmamışları kaçırmak",
          "Etiket kullanmadan kapatmak — haftalık özet zorlaşır",
          "Kanal uygulamasında da yanıtlamak — Bonero dışı yanıtlar thread’e düşmeyebilir",
        ],
      },
      {
        type: "p",
        text: "Inbox stabilize olduktan sonra AI Agent rehberine geçin; ilk yanıtı Agent’a, zor vakaları ekibe bırakabilirsiniz.",
      },
    ],
  },
  {
    slug: "ai-agent-kurulumu",
    category: "yapay-zeka",
    title: "AI Agent’ı kurma ve yönetme",
    description:
      "7/24 otomatik yanıt, SSS, randevu yakalama ve insan kuyruğuna devretme kurallarını ayarlayın.",
    readingMinutes: 8,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: "AI Agent, WhatsApp, Instagram ve e-postada ilk yanıtı verir; bilinen soruları çözer, lead/randevu bilgisini toplar. Karmaşık veya hassas konular sizin tanımladığınız kuralla ekibe düşer.",
      },
      {
        type: "h2",
        text: "Açmadan önce",
      },
      {
        type: "ul",
        items: [
          "En az bir kanal bağlı ve test mesajı alınabiliyor olmalı",
          "Marka tonunuz kısa bir cümleyle yazılı olsun (ör. “samimi ama net”)",
          "SSS listesi hazır olsun: saatler, adres, fiyat aralığı, iptal politikası",
        ],
      },
      {
        type: "h2",
        text: "Kurulum",
      },
      {
        type: "steps",
        items: [
          {
            title: "Agent’ı etkinleştirin",
            body: "Ayarlar → AI Agent → Açık. Çalışma saatleri dışında da yanıt vermesini istiyorsanız “7/24” seçin; değilse mesai dışı “kapanış mesajı + Agent” kombinasyonunu kullanın.",
          },
          {
            title: "Bilgi bankasını doldurun",
            body: "SSS maddelerini ekleyin. Agent yalnızca buradaki bilgilere dayanarak kesin cevap verir; uydurmaz — emin değilse soft handoff yapar.",
          },
          {
            title: "Devretme kurallarını yazın",
            body: "Örnek: “şikayet, iade, ödeme itirazı → insan kuyruğu”. Satış teklifi gibi konular için “yöneticiye ata” kuralı ekleyebilirsiniz.",
          },
          {
            title: "Test konuşması yapın",
            body: "Gerçek olmayan bir numaradan / hesaptan yazın. Agent yanıtını, etiketleri ve gerekirse handoff’u inbox’ta doğrulayın.",
          },
        ],
      },
      {
        type: "tip",
        text: "İlk hafta Agent’ı “öneri + onay” modunda çalıştırın; ekip gönderiyi onaylasın. Ton oturunca tam otomatiğe geçin.",
      },
      {
        type: "h2",
        text: "İzleme",
      },
      {
        type: "ol",
        items: [
          "Otomatik çözülen oranını raporlamada kontrol edin",
          "Devredilen konuşmaları haftada bir gözden geçirin — bilgi bankasına yeni SSS ekleyin",
          "Yanlış ton veya yanlış bilgi görürseniz ilgili SSS’yi hemen güncelleyin",
        ],
      },
      {
        type: "p",
        text: "Agent, insan ekibin yerini almaz; ilk hattı taşır. Omnichannel inbox rehberiyle birlikte kullanıldığında yanıt süresi ve kaçırılan mesaj belirgin düşer.",
      },
    ],
  },
];

export const HELP_ARTICLE_SLUGS = HELP_ARTICLES.map((a) => a.slug);

export function getHelpArticle(slug: string): HelpArticle | undefined {
  return HELP_ARTICLES.find((a) => a.slug === slug);
}

export function getHelpCategory(
  id: HelpCategoryId,
): HelpCategory | undefined {
  return HELP_CATEGORIES.find((c) => c.id === id);
}

export function getArticlesByCategory(
  id: HelpCategoryId,
): HelpArticle[] {
  return HELP_ARTICLES.filter((a) => a.category === id);
}

export function helpArticleHref(slug: string): string {
  return `/yardim/${slug}`;
}
