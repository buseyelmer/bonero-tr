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
  {
    slug: "email-kampanya-gonderme",
    category: "reklam",
    title: "E-posta kampanyası oluşturma ve gönderme",
    description:
      "Segment seçin, konuyu yazın, zamanlayın ve açılma/tıklama sonuçlarını takip edin.",
    readingMinutes: 7,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: "Bonero’da e-posta pazarlama ayrı bir ESP’ye export etmeden çalışır. Listeniz CRM / abone verisinden gelir; kampanya, gönderim ve ölçüm aynı panelde kalır.",
      },
      {
        type: "h2",
        text: "Hazırlık",
      },
      {
        type: "ul",
        items: [
          "Gönderen adresi doğrulanmış olmalı (Ayarlar → E-posta)",
          "En az bir segment veya abone listesi tanımlı olmalı",
          "Konu satırı ve CTA hedefiniz net olsun",
        ],
      },
      {
        type: "h2",
        text: "Kampanya adımları",
      },
      {
        type: "steps",
        items: [
          {
            title: "Segment seçin",
            body: "Pazarlama → Segmentler. “Son 30 günde satın alan”, “pasif abone” gibi filtreleri kaydedin. Küçük bir test listesiyle başlayın.",
          },
          {
            title: "Kampanyayı tasarlayın",
            body: "Konu, önizleme metni ve gövdeyi yazın. A/B testi açıyorsanız iki konu satırı tanımlayın; kazanan otomatik devam eder.",
          },
          {
            title: "Önizleyip zamanlayın",
            body: "Kendinize test maili gönderin. Onay sonrası “şimdi gönder” veya takvim slotu seçin.",
          },
          {
            title: "Sonuçları okuyun",
            body: "Açılma, tıklama ve abonelikten çıkış oranına bakın. Sonraki segmenti bu metriğe göre daraltın.",
          },
        ],
      },
      {
        type: "tip",
        text: "İlk kampanyayı tüm listeye atmayın. %10 örnek + kazanan varyasyon, spam şikayetini ve teslimatı korur.",
      },
    ],
  },
  {
    slug: "crm-pipeline-kullanimi",
    category: "operasyon",
    title: "CRM pipeline’ı günlük kullanım",
    description:
      "Lead’leri yakalayın, skorlayın ve kapatın — kartlar mesaj geçmişiyle birlikte ilerler.",
    readingMinutes: 6,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: "CRM, Unified Inbox’taki talepleri satış/operasyon kartına dönüştürür. Amaç: spreadsheet yerine sürükle-bırak pipeline.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Lead’i kart yapın",
            body: "Inbox’tan “CRM’e ekle” veya form entegrasyonuyla kart oluşur. Kanal ve kaynak otomatik gelir.",
          },
          {
            title: "Aşamayı güncelleyin",
            body: "Yeni → İlgili → Teklif → Kazanıldı. Kartı sürükleyin; not ve sonraki adımı yazın.",
          },
          {
            title: "Ekibe görünür tutun",
            body: "Sahibi ata, etiket ekle. Haftalık görüşmede pipeline panosunu ekran paylaşın — gizli Excel yok.",
          },
        ],
      },
      {
        type: "tip",
        text: "“Teklif” aşamasında 7 günden fazla bekleyen kartları filtreleyin. Darboğaz genelde burada görünür.",
      },
    ],
  },
  {
    slug: "randevu-hatirlatma",
    category: "operasyon",
    title: "Randevu alma ve otomatik hatırlatma",
    description:
      "Inbox talebinden takvim slotuna; no-show’u düşüren hatırlatmalar.",
    readingMinutes: 6,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: "Müşteri “yarın müsait misiniz?” yazdığında konuşmayı randevu kartına çevirirsiniz. Hatırlatma WhatsApp/SMS ile otomatik gider.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Talebi randevuya çevirin",
            body: "Konuşmada “Randevu oluştur”. Tarih, saat, hizmet ve personel seçin. Onay mesajı müşteriye düşer.",
          },
          {
            title: "Hatırlatmayı açın",
            body: "24 saat ve/veya 2 saat kala şablon seçin. İptal linki eklemek no-show’u daha da düşürür.",
          },
          {
            title: "No-show sonrası",
            body: "Gelmedi işaretleyin. Tek tıkla yeni slot önerin — kart geçmişi korunur.",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Çakışan slotlarda sistem uyarır",
          "Takvim görünümü ekipçe paylaşılır",
          "Kanal bağlamı (WhatsApp/IG) randevu kartında kalır",
        ],
      },
    ],
  },
  {
    slug: "ai-reklam-brief",
    category: "reklam",
    title: "AI reklam: brief’ten varyasyona",
    description:
      "Platformları bağlayın, kısa brief verin, AI varyasyon üretin ve yayına alın.",
    readingMinutes: 7,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: "AI reklam masası Meta, Google ve TikTok hesaplarını tek yerde tutar. Brief tek; varyasyonlar çok — onay hattına hazır kreatif çıkar.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Hesapları bağlayın",
            body: "Ayarlar → Reklam platformları. Yetkileri tamamlayın; bütçe ve durum panoda görünür hale gelir.",
          },
          {
            title: "Brief yazın",
            body: "Ürün, hedef kitle, teklif ve ton. 3–5 cümle yeter. Marka yasaklı kelimeleri ekleyin.",
          },
          {
            title: "Varyasyon seçin",
            body: "Başlık + görsel + CTA kombinasyonlarını inceleyin. Kazananı onaylayıp kampanyayı açın.",
          },
        ],
      },
      {
        type: "tip",
        text: "İlk hafta bütçeyi düşük tutun. Raporlamada ROAS ve CTR’yi izleyip kazanan varyasyonu ölçekleyin.",
      },
    ],
  },
  {
    slug: "raporlama-metrikleri",
    category: "operasyon",
    title: "Raporlamada doğru metriklere bakmak",
    description:
      "Kanal, yanıt süresi, kampanya ve randevu performansını tek dashboard’da okuyun.",
    readingMinutes: 5,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: "Raporlama, “dün ne oldu?” sorusuna Excel’siz cevap verir. Haftalık operasyon toplantısı için hazır paneller kullanın.",
      },
      {
        type: "h2",
        text: "Önerilen nabız",
      },
      {
        type: "ul",
        items: [
          "Ortalama ilk yanıt süresi (inbox)",
          "AI Agent çözüm oranı ve handoff sayısı",
          "Randevu doluluk ve no-show oranı",
          "E-posta açılma / tıklama",
          "Reklam harcaması vs. lead / randevu",
        ],
      },
      {
        type: "ol",
        items: [
          "Haftanın başında varsayılan dashboard’u açın",
          "Anomali gördüğünüz metrikte detaya inin (kanal veya kampanya)",
          "PDF / özet paylaşımıyla ekibi hizalayın",
        ],
      },
      {
        type: "tip",
        text: "10 metrik değil, 4 nabız seçin. Fazla KPI panosu kimsenin açmadığı bir ekrana dönüşür.",
      },
    ],
  },
  {
    slug: "ekip-rolleri-onay",
    category: "operasyon",
    title: "Ekip rolleri ve onay hattı",
    description:
      "Yetki verin, görev atayın, onayları e-posta zinciri olmadan ilerletin.",
    readingMinutes: 5,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: "İşbirliği modülü rolleri (yönetici, editör, onaycı) ve onay rayını Bonero içinde tutar. Kim neyi bekliyor sorusu sohbette kaybolmaz.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Rol tanımlayın",
            body: "Ayarlar → Ekip. Yeni üyeyi davet ederken rol seçin; yetki sınırı hemen uygulanır.",
          },
          {
            title: "Onay rayını kurun",
            body: "İçerik veya reklam işi için “editör → onaycı” sırasını seçin. Bekleyen adımlar panoda görünür.",
          },
          {
            title: "Darboğazı izleyin",
            body: "48 saatten fazla bekleyen onaylarda hatırlatma gönderin. Yayın ancak onay sonrası açılır.",
          },
        ],
      },
      {
        type: "tip",
        text: "Müşteri onayını iç onaydan ayırın. Aynı kişide birikirse ray tıkanır.",
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
