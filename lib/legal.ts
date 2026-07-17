import type { L } from "@/lib/locale-copy";

export type LegalSection = {
  title: L;
  paragraphs: L[];
  bullets?: L[];
};

export type LegalDocument = {
  eyebrow: L;
  title: L;
  updated: L;
  intro: L;
  sections: LegalSection[];
};

export const KVKK_DOCUMENT: LegalDocument = {
  eyebrow: { tr: "Yasal", en: "Legal" },
  title: {
    tr: "KVKK Aydınlatma Metni",
    en: "Privacy Notice (KVKK)",
  },
  updated: {
    tr: "Son güncelleme: 11 Temmuz 2026",
    en: "Last updated: July 11, 2026",
  },
  intro: {
    tr: "Bu metin, Bonero olarak kişisel verilerinizi hangi amaçlarla ve nasıl işlediğimizi; haklarınızı nasıl kullanabileceğinizi açıklar.",
    en: "This notice explains how Bonero processes your personal data, for what purposes, and how you can exercise your rights under Turkish data protection law (KVKK).",
  },
  sections: [
    {
      title: {
        tr: "1. Veri Sorumlusu",
        en: "1. Data Controller",
      },
      paragraphs: [
        {
          tr: "6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri sorumlusu Bonero’dur. İletişim: hello@bonero.tr — İstanbul, Türkiye.",
          en: "Under Turkey’s Personal Data Protection Law (KVKK), Bonero is the data controller. Contact: hello@bonero.tr — Istanbul, Turkey.",
        },
      ],
    },
    {
      title: {
        tr: "2. İşlenen Kişisel Veriler",
        en: "2. Personal Data We Process",
      },
      paragraphs: [
        {
          tr: "Hizmet kapsamında aşağıdaki kategorilerde veriler işlenebilir:",
          en: "Within the scope of the service, we may process data in the following categories:",
        },
      ],
      bullets: [
        {
          tr: "Kimlik ve iletişim: ad-soyad, e-posta, telefon, şirket unvanı",
          en: "Identity & contact: name, email, phone, company name",
        },
        {
          tr: "Hesap ve kullanım: oturum, rol, tercih, destek kayıtları",
          en: "Account & usage: sessions, roles, preferences, support records",
        },
        {
          tr: "İletişim içeriği: bağladığınız kanallardan gelen mesajlar (müşteri verisi)",
          en: "Communication content: messages from connected channels (customer data)",
        },
        {
          tr: "Teknik veriler: IP, tarayıcı, cihaz, log ve güvenlik kayıtları",
          en: "Technical data: IP, browser, device, logs, and security records",
        },
        {
          tr: "Fatura bilgileri: fatura unvanı, vergi bilgisi, ödeme referansları",
          en: "Billing data: invoice details, tax information, payment references",
        },
      ],
    },
    {
      title: {
        tr: "3. İşleme Amaçları",
        en: "3. Processing Purposes",
      },
      paragraphs: [
        {
          tr: "Kişisel veriler şu amaçlarla işlenir:",
          en: "Personal data is processed for the following purposes:",
        },
      ],
      bullets: [
        {
          tr: "Hesap oluşturma, kimlik doğrulama ve hizmet sunumu",
          en: "Account creation, authentication, and service delivery",
        },
        {
          tr: "Omnichannel gelen kutusu, ekip yönetimi ve raporlama",
          en: "Omnichannel inbox, team management, and reporting",
        },
        {
          tr: "Destek, güvenlik, dolandırıcılık önleme ve sistem iyileştirme",
          en: "Support, security, fraud prevention, and system improvement",
        },
        {
          tr: "Sözleşme, faturalama ve yasal yükümlülüklerin yerine getirilmesi",
          en: "Contract performance, billing, and legal compliance",
        },
        {
          tr: "Açık rızanız varsa ürün duyuruları ve pazarlama iletişimi",
          en: "Product announcements and marketing (with your explicit consent)",
        },
      ],
    },
    {
      title: {
        tr: "4. Hukuki Sebepler",
        en: "4. Legal Bases",
      },
      paragraphs: [
        {
          tr: "İşleme; KVKK m.5 ve m.6 çerçevesinde sözleşmenin kurulması/ifası, hukuki yükümlülük, meşru menfaat ve gerektiğinde açık rıza hukuki sebeplerine dayanır.",
          en: "Processing is based on contract performance, legal obligations, legitimate interests, and explicit consent where required under KVKK Articles 5 and 6.",
        },
      ],
    },
    {
      title: {
        tr: "5. Aktarım ve Barındırma",
        en: "5. Transfers & Hosting",
      },
      paragraphs: [
        {
          tr: "Veriler; bulut altyapısı (ör. AWS), ödeme, e-posta ve analitik hizmet sağlayıcılarıyla, yalnızca hizmetin sunumu için gerekli ölçüde ve uygun güvencelerle paylaşılabilir.",
          en: "Data may be shared with cloud infrastructure (e.g. AWS), payment, email, and analytics providers only as needed to deliver the service and with appropriate safeguards.",
        },
        {
          tr: "Yurt dışına aktarım söz konusu olduğunda KVKK’nın öngördüğü şartlara (açık rıza, taahhütname vb.) uyulur.",
          en: "Cross-border transfers comply with KVKK requirements (consent, undertakings, etc.) where applicable.",
        },
      ],
    },
    {
      title: {
        tr: "6. Saklama Süresi",
        en: "6. Retention",
      },
      paragraphs: [
        {
          tr: "Veriler, işleme amacının gerektirdiği süre ve ilgili mevzuattaki zamanaşımı / saklama yükümlülükleri boyunca tutulur. Süre bitiminde silinir, yok edilir veya anonimleştirilir.",
          en: "Data is retained for as long as required by the processing purpose and applicable law. After that, it is deleted, destroyed, or anonymized.",
        },
      ],
    },
    {
      title: {
        tr: "7. Güvenlik",
        en: "7. Security",
      },
      paragraphs: [
        {
          tr: "256-bit AES şifreleme, SSL/TLS, erişim kontrolü, düzenli güvenlik gözden geçirmeleri ve rol bazlı yetkilendirme gibi teknik ve idari tedbirler uygulanır.",
          en: "We apply technical and organizational measures including AES-256 encryption, SSL/TLS, access controls, regular security reviews, and role-based permissions.",
        },
      ],
    },
    {
      title: {
        tr: "8. KVKK Kapsamındaki Haklarınız",
        en: "8. Your Rights",
      },
      paragraphs: [
        {
          tr: "KVKK m.11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içi/yurt dışı aktarılan üçüncü kişileri bilme, düzeltme, silme/yok etme, itiraz ve zararın giderilmesini talep etme haklarına sahipsiniz.",
          en: "Under KVKK Article 11 you may request information about processing, learn whether data is used for its purpose, know third parties data is shared with, request correction or deletion, object, and seek compensation for damages.",
        },
        {
          tr: "Başvurularınızı hello@bonero.tr adresine iletebilirsiniz. Talepler, KVKK’da öngörülen sürelerde yanıtlanır.",
          en: "Send requests to hello@bonero.tr. We respond within the timelines set by KVKK.",
        },
      ],
    },
    {
      title: {
        tr: "9. Çerezler",
        en: "9. Cookies",
      },
      paragraphs: [
        {
          tr: "Sitede oturum, güvenlik ve (onayınızla) analitik çerezler kullanılabilir. Tarayıcı ayarlarından çerezleri yönetebilirsiniz; zorunlu çerezlerin kapatılması bazı işlevleri engelleyebilir.",
          en: "We may use session, security, and (with consent) analytics cookies. You can manage cookies in your browser; disabling essential cookies may limit some features.",
        },
      ],
    },
  ],
};

export const AYDINLATMA_DOCUMENT: LegalDocument = {
  eyebrow: { tr: "Yasal", en: "Legal" },
  title: {
    tr: "Aydınlatma Metni",
    en: "Clarification Notice",
  },
  updated: {
    tr: "Son güncelleme: 17 Temmuz 2026",
    en: "Last updated: July 17, 2026",
  },
  intro: {
    tr: "6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 10. maddesi uyarınca; Bonero web sitesi, iletişim formları ve hizmet süreçlerinde kişisel verilerinizin işlenmesine ilişkin bilgilendirme aşağıdadır.",
    en: "Pursuant to Article 10 of Turkey’s Personal Data Protection Law (KVKK), this notice explains how Bonero processes personal data collected via our website, contact forms, and service processes.",
  },
  sections: [
    {
      title: {
        tr: "1. Veri Sorumlusunun Kimliği",
        en: "1. Identity of the Data Controller",
      },
      paragraphs: [
        {
          tr: "Veri sorumlusu Bonero’dur. İletişim: hello@bonero.tr — İstanbul, Türkiye. Bonero, NEXINE bünyesinde faaliyet gösterir.",
          en: "The data controller is Bonero. Contact: hello@bonero.tr — Istanbul, Turkey. Bonero operates as part of NEXINE.",
        },
      ],
    },
    {
      title: {
        tr: "2. İşlenen Veri Kategorileri",
        en: "2. Categories of Data Processed",
      },
      paragraphs: [
        {
          tr: "Hizmet ve iletişim kanallarımız üzerinden aşağıdaki kişisel veriler işlenebilir:",
          en: "The following personal data may be processed through our services and communication channels:",
        },
      ],
      bullets: [
        {
          tr: "Kimlik: ad, soyad, unvan",
          en: "Identity: name, title",
        },
        {
          tr: "İletişim: e-posta, telefon, şirket adı",
          en: "Contact: email, phone, company name",
        },
        {
          tr: "İşlem güvenliği: IP adresi, tarayıcı / cihaz bilgisi, log kayıtları",
          en: "Transaction security: IP address, browser / device info, logs",
        },
        {
          tr: "Müşteri işlem: destek talepleri, form içerikleri, abonelik kayıtları",
          en: "Customer transaction: support requests, form content, subscription records",
        },
      ],
    },
    {
      title: {
        tr: "3. İşleme Amaçları",
        en: "3. Purposes of Processing",
      },
      paragraphs: [
        {
          tr: "Kişisel verileriniz şu amaçlarla işlenir:",
          en: "Your personal data is processed for the following purposes:",
        },
      ],
      bullets: [
        {
          tr: "Web sitesi ziyareti, demo / iletişim taleplerinin yanıtlanması",
          en: "Responding to website visits and demo / contact requests",
        },
        {
          tr: "Hesap oluşturma, kimlik doğrulama ve hizmetin sunulması",
          en: "Account creation, authentication, and service delivery",
        },
        {
          tr: "Sözleşme süreçleri, faturalama ve müşteri desteği",
          en: "Contract processes, billing, and customer support",
        },
        {
          tr: "Güvenlik, dolandırıcılık önleme ve yasal yükümlülüklerin yerine getirilmesi",
          en: "Security, fraud prevention, and compliance with legal obligations",
        },
        {
          tr: "Açık rızanız varsa ürün bilgilendirmesi ve pazarlama iletişimi",
          en: "Product updates and marketing communications where you have given explicit consent",
        },
      ],
    },
    {
      title: {
        tr: "4. Hukuki Sebepler",
        en: "4. Legal Bases",
      },
      paragraphs: [
        {
          tr: "İşleme; KVKK’nın 5. ve 6. maddeleri kapsamında sözleşme kurulması / ifası, hukuki yükümlülük, meşru menfaat ve gerektiğinde açık rızanıza dayanır.",
          en: "Processing is based on contract formation / performance, legal obligation, legitimate interest, and where required explicit consent, under KVKK Articles 5 and 6.",
        },
      ],
    },
    {
      title: {
        tr: "5. Aktarım",
        en: "5. Transfers",
      },
      paragraphs: [
        {
          tr: "Verileriniz; hizmetin sunulması için gerekli olduğu ölçüde bulut / altyapı sağlayıcıları, ödeme ve iletişim altyapısı iş ortakları ile; yasal zorunluluk halinde yetkili kurumlarla paylaşılabilir. Yurt dışı aktarım söz konusu olduğunda KVKK’daki usullere uyulur.",
          en: "Data may be shared with cloud / infrastructure providers, payment and communication partners as needed to deliver the service, and with competent authorities when legally required. Cross-border transfers follow KVKK procedures.",
        },
      ],
    },
    {
      title: {
        tr: "6. Saklama Süresi",
        en: "6. Retention Period",
      },
      paragraphs: [
        {
          tr: "Veriler, işleme amacının gerektirdiği süre ve ilgili mevzuattaki zamanaşımı / saklama süreleri boyunca tutulur; süre sonunda silinir, yok edilir veya anonim hale getirilir.",
          en: "Data is retained for as long as required by the processing purpose and applicable limitation / retention rules, then deleted, destroyed, or anonymized.",
        },
      ],
    },
    {
      title: {
        tr: "7. Haklarınız",
        en: "7. Your Rights",
      },
      paragraphs: [
        {
          tr: "KVKK’nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, düzeltme, silme, aktarımın bildirilmesini isteme, itiraz ve zararınızın giderilmesini talep etme haklarına sahipsiniz.",
          en: "Under KVKK Article 11 you may request to learn whether your data is processed, request correction or deletion, be informed of transfers, object to processing, and claim compensation for unlawful processing.",
        },
        {
          tr: "Başvurularınızı hello@bonero.tr adresine iletebilirsiniz. Talepleriniz KVKK’da öngörülen sürelerde yanıtlanır. Ayrıntılı gizlilik bilgisi için KVKK / Gizlilik metnine bakabilirsiniz.",
          en: "Send requests to hello@bonero.tr. We respond within the periods set by KVKK. For a fuller privacy overview, see our Privacy / KVKK notice.",
        },
      ],
    },
  ],
};

export const REFUND_DOCUMENT: LegalDocument = {
  eyebrow: { tr: "Yasal", en: "Legal" },
  title: {
    tr: "İade / İptal Koşulları",
    en: "Refund & Cancellation Policy",
  },
  updated: {
    tr: "Son güncelleme: 17 Temmuz 2026",
    en: "Last updated: July 17, 2026",
  },
  intro: {
    tr: "Bu metin, Bonero ücretli paketlerinin iptali, abonelik sonlandırma ve iade koşullarını açıklar. Kullanım Şartları ile birlikte geçerlidir.",
    en: "This policy explains cancellation, subscription termination, and refunds for Bonero paid plans. It applies together with our Terms of Service.",
  },
  sections: [
    {
      title: {
        tr: "1. Abonelik Modeli",
        en: "1. Subscription Model",
      },
      paragraphs: [
        {
          tr: "Bonero, dönemsel (aylık / yıllık) abonelikle sunulan bir SaaS hizmetidir. Paket kapsamı, fiyat ve faturalama dönemi sipariş veya paketler sayfasında gösterilir.",
          en: "Bonero is a SaaS service sold on a periodic (monthly / annual) subscription. Plan scope, price, and billing period are shown on the order or pricing page.",
        },
      ],
    },
    {
      title: {
        tr: "2. İptal",
        en: "2. Cancellation",
      },
      paragraphs: [
        {
          tr: "Aboneliğinizi istediğiniz zaman panel üzerinden veya hello@bonero.tr / destek kanallarımız aracılığıyla iptal edebilirsiniz.",
          en: "You may cancel your subscription at any time via the panel or by contacting hello@bonero.tr / our support channels.",
        },
      ],
      bullets: [
        {
          tr: "İptal, yürürlükteki faturalama döneminin sonunda geçerli olur",
          en: "Cancellation takes effect at the end of the current billing period",
        },
        {
          tr: "Dönem sonuna kadar mevcut paketin özelliklerini kullanmaya devam edebilirsiniz",
          en: "You keep access to your plan features until the period ends",
        },
        {
          tr: "Otomatik yenileme iptal sonrası durdurulur; yeni dönem için ücret alınmaz",
          en: "Auto-renewal stops after cancellation; no charge for a new period",
        },
      ],
    },
    {
      title: {
        tr: "3. İade",
        en: "3. Refunds",
      },
      paragraphs: [
        {
          tr: "Dijital abonelik niteliği nedeniyle, aksi yazılı olarak kararlaştırılmadıkça veya aşağıda belirtilen istisnalar dışında kısmi / dönem içi iade yapılmaz.",
          en: "Because this is a digital subscription, partial or mid-cycle refunds are not provided unless agreed in writing or covered by the exceptions below.",
        },
      ],
      bullets: [
        {
          tr: "Çift tahsilat veya teknik hata kaynaklı yanlış ücretlendirme — düzeltme / iade yapılır",
          en: "Duplicate charge or billing error due to a technical fault — corrected or refunded",
        },
        {
          tr: "Hizmetin Bonero kaynaklı sürekli ve ciddi şekilde sunulamaması — durum değerlendirilerek kısmi iade veya süre uzatımı uygulanabilir",
          en: "Service materially unavailable due to Bonero — may result in a partial refund or service credit after review",
        },
        {
          tr: "Özel kurumsal sözleşmelerde iade / iptal maddeleri o sözleşmeye tabidir",
          en: "Enterprise contracts follow their own cancellation and refund clauses",
        },
      ],
    },
    {
      title: {
        tr: "4. Paket Değişikliği",
        en: "4. Plan Changes",
      },
      paragraphs: [
        {
          tr: "Daha yüksek bir pakete geçişte fark ücreti uygulanabilir. Daha düşük pakete geçiş genellikle bir sonraki faturalama döneminde geçerli olur; dönem içi fark iadesi yapılmaz.",
          en: "Upgrades may incur a prorated difference. Downgrades usually take effect at the next billing period; mid-cycle difference refunds are not issued.",
        },
      ],
    },
    {
      title: {
        tr: "5. Deneme ve Promosyonlar",
        en: "5. Trials & Promotions",
      },
      paragraphs: [
        {
          tr: "Ücretsiz deneme veya kampanya dönemlerinde ücret alınmaz. Deneme bitiminde ücretli plana geçmezseniz abonelik otomatik ücretlendirilmez; kampanya koşulları ayrıca duyurulur.",
          en: "No charge during free trial or promo periods. If you do not convert to a paid plan after a trial, you are not billed automatically; promo terms are announced separately.",
        },
      ],
    },
    {
      title: {
        tr: "6. Başvuru",
        en: "6. How to Request",
      },
      paragraphs: [
        {
          tr: "İptal veya iade taleplerinizi panelden veya hello@bonero.tr adresine hesap / fatura bilginizle iletin. Talepler makul süre içinde incelenir; iade onaylanırsa ödeme yönteminize veya banka hesabınıza yansıtılır (banka süreleri değişiklik gösterebilir).",
          en: "Submit cancellation or refund requests in the panel or to hello@bonero.tr with your account / invoice details. Requests are reviewed within a reasonable time; approved refunds are returned to your payment method or bank (timing may vary by bank).",
        },
      ],
    },
  ],
};

export const TERMS_DOCUMENT: LegalDocument = {
  eyebrow: { tr: "Yasal", en: "Legal" },
  title: {
    tr: "Kullanım Şartları",
    en: "Terms of Service",
  },
  updated: {
    tr: "Son güncelleme: 11 Temmuz 2026",
    en: "Last updated: July 11, 2026",
  },
  intro: {
    tr: "Bonero’yu kullanmadan önce lütfen bu şartları dikkatle okuyun. Platformu kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.",
    en: "Please read these terms carefully before using Bonero. By accessing the platform or creating an account, you agree to the conditions below.",
  },
  sections: [
    {
      title: {
        tr: "1. Taraflar ve Kabul",
        en: "1. Parties & Acceptance",
      },
      paragraphs: [
        {
          tr: "Bu Kullanım Şartları (“Şartlar”), Bonero tarafından sunulan omnichannel AI iletişim platformu ve ilgili hizmetlerin (“Hizmet”) kullanımını düzenler. Hizmete erişerek veya hesap oluşturarak bu Şartları okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz.",
          en: 'These Terms of Service ("Terms") govern use of Bonero’s omnichannel AI communication platform and related services ("Service"). By accessing the Service or creating an account, you confirm you have read, understood, and accepted these Terms.',
        },
        {
          tr: "Hizmeti bir şirket adına kullanıyorsanız, ilgili kuruluşu bu Şartlarla bağlamaya yetkili olduğunuzu kabul edersiniz.",
          en: "If you use the Service on behalf of a company, you represent that you are authorized to bind that organization to these Terms.",
        },
      ],
    },
    {
      title: {
        tr: "2. Hizmetin Tanımı",
        en: "2. Description of Service",
      },
      paragraphs: [
        {
          tr: "Bonero; Instagram, WhatsApp, e-posta ve benzeri kanalları tek panelde birleştiren, yapay zeka destekli gelen kutusu, ekip yönetimi ve raporlama araçları sunan bir SaaS platformudur.",
          en: "Bonero is a SaaS platform that unifies Instagram, WhatsApp, email, and similar channels in one panel, with AI-assisted inbox, team management, and reporting tools.",
        },
        {
          tr: "Özellikler, paket kapsamına ve teknik güncellemelere göre değişebilir. Önemli değişiklikler makul süre içinde duyurulur.",
          en: "Features may vary by plan and evolve with product updates. Material changes will be announced within a reasonable time.",
        },
      ],
    },
    {
      title: {
        tr: "3. Hesap ve Güvenlik",
        en: "3. Account & Security",
      },
      paragraphs: [
        {
          tr: "Hesap bilgilerinizin gizliliğinden siz sorumlusunuz. Yetkisiz erişimi fark ettiğinizde derhal bize bildirmelisiniz.",
          en: "You are responsible for keeping account credentials confidential. Notify us immediately if you suspect unauthorized access.",
        },
      ],
      bullets: [
        {
          tr: "Doğru ve güncel hesap bilgisi sağlamak",
          en: "Provide accurate and up-to-date account information",
        },
        {
          tr: "Ekip üyelerinizin erişim yetkilerini yönetmek",
          en: "Manage access permissions for team members",
        },
        {
          tr: "Bağladığınız üçüncü taraf hesapların kullanım şartlarına uymak",
          en: "Comply with the terms of any third-party accounts you connect",
        },
      ],
    },
    {
      title: {
        tr: "4. Kabul Edilebilir Kullanım",
        en: "4. Acceptable Use",
      },
      paragraphs: [
        {
          tr: "Hizmeti yasalara, üçüncü taraf platform kurallarına ve müşteri sözleşmelerinize uygun kullanmalısınız.",
          en: "You must use the Service in compliance with applicable laws, third-party platform rules, and your customer agreements.",
        },
      ],
      bullets: [
        {
          tr: "Spam, phishing veya yanıltıcı iletişim için kullanmamak",
          en: "Do not use the Service for spam, phishing, or misleading communication",
        },
        {
          tr: "Başkalarının verilerine izinsiz erişmemek",
          en: "Do not access others’ data without authorization",
        },
        {
          tr: "Sistemi tersine mühendislik veya aşırı yükleme ile bozmamak",
          en: "Do not reverse engineer or overload the system",
        },
        {
          tr: "Yasadışı içerik veya faaliyetleri kolaylaştırmamak",
          en: "Do not facilitate illegal content or activity",
        },
      ],
    },
    {
      title: {
        tr: "5. Abonelik, Ücretler ve İptal",
        en: "5. Subscription, Fees & Cancellation",
      },
      paragraphs: [
        {
          tr: "Ücretli paketlerde faturalama dönemi, fiyat ve özellikler sipariş / paket sayfasında belirtilir. Ödeme yapılmaması hizmetin askıya alınmasına yol açabilir.",
          en: "For paid plans, billing period, pricing, and features are shown on the order or pricing page. Non-payment may result in suspension.",
        },
        {
          tr: "İptal talepleri bir sonraki faturalama döneminden itibaren geçerli olur; aksi sözleşmede belirtilmedikçe kısmi iade yapılmaz.",
          en: "Cancellations take effect at the next billing cycle unless otherwise agreed; partial refunds are not provided unless stated in contract.",
        },
      ],
    },
    {
      title: {
        tr: "6. Fikri Mülkiyet",
        en: "6. Intellectual Property",
      },
      paragraphs: [
        {
          tr: "Bonero yazılımı, markası, arayüzü ve dokümantasyonu Bonero’ya aittir. Size yalnızca Hizmeti kullanmak için sınırlı, devredilemez bir lisans verilir.",
          en: "Bonero software, brand, interface, and documentation belong to Bonero. You receive a limited, non-transferable license to use the Service only.",
        },
        {
          tr: "Platforma yüklediğiniz veya bağladığınız müşteri içerikleri size (veya müşterilerinize) aittir; Hizmeti sunmak için gerekli işlemeye izin verirsiniz.",
          en: "Customer content you upload or connect remains yours (or your customers’); you grant us permission to process it as needed to provide the Service.",
        },
      ],
    },
    {
      title: {
        tr: "7. Sorumluluk Sınırı",
        en: "7. Limitation of Liability",
      },
      paragraphs: [
        {
          tr: "Hizmet “olduğu gibi” sunulur. Üçüncü taraf kanalların (Meta, WhatsApp, e-posta sağlayıcıları vb.) kesintileri, API değişiklikleri veya politikaları Bonero’nun kontrolü dışındadır.",
          en: 'The Service is provided "as is." Outages, API changes, or policy updates from third-party channels (Meta, WhatsApp, email providers, etc.) are outside Bonero’s control.',
        },
        {
          tr: "Yasal olarak izin verilen azami ölçüde Bonero’nun toplam sorumluluğu, son 12 ayda ilgili hesap için ödenen ücretlerle sınırlıdır.",
          en: "To the maximum extent permitted by law, Bonero’s total liability is limited to fees paid for the relevant account in the preceding 12 months.",
        },
      ],
    },
    {
      title: {
        tr: "8. Fesih",
        en: "8. Termination",
      },
      paragraphs: [
        {
          tr: "Şartları ihlal etmeniz halinde hesabınız askıya alınabilir veya sonlandırılabilir. Fesih sonrası verilerinizin silinmesi veya dışa aktarımı için makul bir süre tanınır; ayrıntılar KVKK metninde yer alır.",
          en: "We may suspend or terminate your account if you breach these Terms. After termination, a reasonable period is provided for data export or deletion; see our privacy notice for details.",
        },
      ],
    },
    {
      title: {
        tr: "9. Uygulanacak Hukuk",
        en: "9. Governing Law",
      },
      paragraphs: [
        {
          tr: "Bu Şartlar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda İstanbul mahkemeleri ve icra daireleri yetkilidir.",
          en: "These Terms are governed by the laws of the Republic of Turkey. Istanbul courts and enforcement offices have jurisdiction over disputes.",
        },
      ],
    },
  ],
};
