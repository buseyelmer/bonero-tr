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
