import type { HelpArticle } from "@/lib/help";

export const HELP_ARTICLES: HelpArticle[] = [
  {
    slug: "hizli-baslangic",
    category: "baslangic",
    title: {
      tr: "Bonero’ya hızlı başlangıç",
      en: "Quick start with Bonero",
    },
    description: {
      tr: "Hesabınızı açın, ilk kanalı bağlayın ve ekibi davet edin — yaklaşık 15 dakikada canlıya geçin.",
      en: "Create your account, connect your first channel, and invite the team — go live in about 15 minutes.",
    },
    readingMinutes: 6,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: {
          tr: "Bu rehber Bonero’yu ilk kez kuran ekipler içindir. Amaç: aynı gün Unified Inbox’ta mesaj yanıtlayabilir hale gelmek. Adımları sırayla izleyin; her adım bir sonrakine bağlıdır.",
          en: "This guide is for teams setting up Bonero for the first time. The goal: reply to messages in the Unified Inbox the same day. Follow the steps in order — each one builds on the last.",
        },
      },
      {
        type: "h2",
        text: { tr: "Ne hazır olmalı?", en: "What should you have ready?" },
      },
      {
        type: "ul",
        items: [
          {
            tr: "İş e-posta adresiniz (kayıt ve davetler için)",
            en: "A business email address (for signup and invites)",
          },
          {
            tr: "Bağlamak istediğiniz kanal hesapları (WhatsApp Business, Instagram veya e-posta)",
            en: "Channel accounts to connect (WhatsApp Business, Instagram, or email)",
          },
          {
            tr: "En az bir ekip üyesi e-postası (isteğe bağlı ama önerilir)",
            en: "At least one teammate’s email (optional but recommended)",
          },
        ],
      },
      {
        type: "h2",
        text: { tr: "Kurulum adımları", en: "Setup steps" },
      },
      {
        type: "steps",
        items: [
          {
            title: { tr: "Hesap oluşturun", en: "Create your account" },
            body: {
              tr: "panel.bonero.tr üzerinden kayıt olun. Şirket adınızı ve birincil iletişim e-postanızı girin. Onay mailindeki bağlantıyı açın.",
              en: "Sign up at panel.bonero.tr. Enter your company name and primary contact email. Open the confirmation link in your inbox.",
            },
          },
          {
            title: { tr: "İlk kanalı bağlayın", en: "Connect your first channel" },
            body: {
              tr: "Ayarlar → Kanallar menüsünden WhatsApp, Instagram veya e-posta seçin. Meta / Google izin ekranlarını tamamlayın. Bağlantı yeşil “Aktif” olana kadar bekleyin.",
              en: "Go to Settings → Channels and choose WhatsApp, Instagram, or email. Complete the Meta / Google permission screens. Wait until the connection shows green “Active”.",
            },
          },
          {
            title: { tr: "Gelen kutusunu kontrol edin", en: "Check the inbox" },
            body: {
              tr: "Omnichannel inbox’a gidin. Test mesajı gönderin — kanal etiketi ve okunmamış nabız görünmelidir. Bu, kurulumun çalıştığını doğrular.",
              en: "Open the omnichannel inbox. Send a test message — you should see the channel label and an unread indicator. That confirms setup is working.",
            },
          },
          {
            title: { tr: "Ekibi davet edin", en: "Invite your team" },
            body: {
              tr: "Ayarlar → Ekip’ten roller atayın (ör. Operatör, Yönetici). Davet maili gitsin; herkes aynı inbox’tan yanıtlasın.",
              en: "In Settings → Team, assign roles (e.g. Operator, Manager). Send invites so everyone replies from the same inbox.",
            },
          },
        ],
      },
      {
        type: "tip",
        text: {
          tr: "İlk gün sadece bir kanal bağlayın. Hepsi birden bağlanınca sorun ayıklamak zorlaşır. Stabil olduktan sonra ikinci kanalı ekleyin.",
          en: "Connect only one channel on day one. Linking everything at once makes troubleshooting harder. Add a second channel once the first is stable.",
        },
      },
      {
        type: "h2",
        text: { tr: "Sonraki adımlar", en: "Next steps" },
      },
      {
        type: "ol",
        items: [
          {
            tr: "Omnichannel gelen kutusu rehberiyle atama ve etiketleri öğrenin",
            en: "Learn assignment and labels with the omnichannel inbox guide",
          },
          {
            tr: "AI Agent’ı açarak gece/ hafta sonu ilk yanıtı otomatikleştirin",
            en: "Enable AI Agent to automate first replies at night and on weekends",
          },
          {
            tr: "CRM’de lead kartlarının kanal mesajlarıyla nasıl birleştiğini kontrol edin",
            en: "See how lead cards in CRM merge with channel messages",
          },
        ],
      },
      {
        type: "p",
        text: {
          tr: "Takıldığınız adımı not alın — İletişim formundan veya Destek talebiyle yazın; genelde 1 iş günü içinde dönüş yapılır.",
          en: "Note where you get stuck — contact us via the form or a support request; we usually reply within one business day.",
        },
      },
    ],
  },
  {
    slug: "omnichannel-gelen-kutusu",
    category: "omnichannel",
    title: {
      tr: "Omnichannel gelen kutusu nasıl kullanılır?",
      en: "How to use the omnichannel inbox",
    },
    description: {
      tr: "WhatsApp, Instagram, e-posta ve web taleplerini tek listede okuyun, etiketleyin ve yanıtlayın.",
      en: "Read, label, and reply to WhatsApp, Instagram, email, and web requests in one list.",
    },
    readingMinutes: 7,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: {
          tr: "Omnichannel, tüm müşteri mesajlarını tek gelen kutusunda birleştirir. Kanal fark etmeksizin aynı müşterinin geçmişi görünür; ekip sekme değiştirmeden çalışır.",
          en: "Omnichannel merges all customer messages into one inbox. You see the same customer’s history regardless of channel; your team works without switching tabs.",
        },
      },
      {
        type: "h2",
        text: { tr: "Ekranı tanıyalım", en: "Know the layout" },
      },
      {
        type: "ul",
        items: [
          {
            tr: "Sol liste: okunmamış / tümü / atananlar filtreleri",
            en: "Left list: unread / all / assigned filters",
          },
          {
            tr: "Orta alan: konuşma thread’i (kanal etiketi üstte)",
            en: "Center: conversation thread (channel label on top)",
          },
          {
            tr: "Sağ panel: müşteri kartı, etiketler, sonraki adım",
            en: "Right panel: customer card, labels, next step",
          },
        ],
      },
      {
        type: "h2",
        text: { tr: "Günlük kullanım", en: "Daily workflow" },
      },
      {
        type: "steps",
        items: [
          {
            title: { tr: "Sabah filtremizi seçin", en: "Pick your morning filter" },
            body: {
              tr: "“Okunmamış” ile başlayın. Acil etiketli (şikayet, randevu) kayıtları önce kapatın; sonra rutin sorulara geçin.",
              en: 'Start with "Unread". Close urgent-tagged items (complaints, appointments) first; then handle routine questions.',
            },
          },
          {
            title: { tr: "Yanıtlayın veya atayın", en: "Reply or assign" },
            body: {
              tr: "Kendi alanınızdaysa doğrudan yanıtlayın. Değilse “Ata” ile doğru kişiyi seçin — çift cevap riski azalır.",
              en: 'If it’s yours, reply directly. Otherwise use "Assign" to route to the right person — fewer duplicate replies.',
            },
          },
          {
            title: { tr: "Etiket ve not ekleyin", en: "Add labels and notes" },
            body: {
              tr: "Lead, no-show, VIP gibi etiketler ekleyin. Kısa bir iç not bırakın; bir sonraki mesajda bağlam hazır olur.",
              en: "Add labels like lead, no-show, VIP. Leave a short internal note so context is ready on the next message.",
            },
          },
          {
            title: { tr: "Kanal değişimini takip edin", en: "Track channel switches" },
            body: {
              tr: "Müşteri IG’den WhatsApp’a geçmiş olsa da aynı kartta kalır. Geçmişi kaydırmadan okuyun — tekrar sormayın.",
              en: "If a customer moves from IG to WhatsApp, they stay on the same card. Scroll the history — don’t ask again.",
            },
          },
        ],
      },
      {
        type: "tip",
        text: {
          tr: "Aynı mesajı iki kişi yanıtlamamak için konuşmayı üstünüze alın (claim). Yoğun saatlerde bu alışkanlık tempo kaybını önler.",
          en: "Claim conversations so two people don’t reply to the same message. During busy hours, this habit prevents lost momentum.",
        },
      },
      {
        type: "h2",
        text: { tr: "Sık yapılan hatalar", en: "Common mistakes" },
      },
      {
        type: "ul",
        items: [
          {
            tr: "Filtreyi “Tümü”de bırakıp okunmamışları kaçırmak",
            en: 'Leaving the filter on "All" and missing unread messages',
          },
          {
            tr: "Etiket kullanmadan kapatmak — haftalık özet zorlaşır",
            en: "Closing without labels — weekly summaries get harder",
          },
          {
            tr: "Kanal uygulamasında da yanıtlamak — Bonero dışı yanıtlar thread’e düşmeyebilir",
            en: "Replying in the native channel app — replies outside Bonero may not appear in the thread",
          },
        ],
      },
      {
        type: "p",
        text: {
          tr: "Inbox stabilize olduktan sonra AI Agent rehberine geçin; ilk yanıtı Agent’a, zor vakaları ekibe bırakabilirsiniz.",
          en: "Once the inbox is stable, move to the AI Agent guide — let Agent handle first replies and route hard cases to the team.",
        },
      },
    ],
  },
  {
    slug: "ai-agent-kurulumu",
    category: "yapay-zeka",
    title: {
      tr: "AI Agent’ı kurma ve yönetme",
      en: "Set up and manage AI Agent",
    },
    description: {
      tr: "7/24 otomatik yanıt, SSS, randevu yakalama ve insan kuyruğuna devretme kurallarını ayarlayın.",
      en: "Configure 24/7 auto-replies, FAQs, appointment capture, and handoff rules to your human queue.",
    },
    readingMinutes: 8,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: {
          tr: "AI Agent, WhatsApp, Instagram ve e-postada ilk yanıtı verir; bilinen soruları çözer, lead/randevu bilgisini toplar. Karmaşık veya hassas konular sizin tanımladığınız kuralla ekibe düşer.",
          en: "AI Agent sends the first reply on WhatsApp, Instagram, and email; answers known questions and collects lead/appointment info. Complex or sensitive topics hand off to your team per your rules.",
        },
      },
      {
        type: "h2",
        text: { tr: "Açmadan önce", en: "Before you enable it" },
      },
      {
        type: "ul",
        items: [
          {
            tr: "En az bir kanal bağlı ve test mesajı alınabiliyor olmalı",
            en: "At least one channel connected and receiving test messages",
          },
          {
            tr: "Marka tonunuz kısa bir cümleyle yazılı olsun (ör. “samimi ama net”)",
            en: 'Brand tone written in one short line (e.g. "friendly but direct")',
          },
          {
            tr: "SSS listesi hazır olsun: saatler, adres, fiyat aralığı, iptal politikası",
            en: "FAQ list ready: hours, address, price range, cancellation policy",
          },
        ],
      },
      {
        type: "h2",
        text: { tr: "Kurulum", en: "Setup" },
      },
      {
        type: "steps",
        items: [
          {
            title: { tr: "Agent’ı etkinleştirin", en: "Enable Agent" },
            body: {
              tr: "Ayarlar → AI Agent → Açık. Çalışma saatleri dışında da yanıt vermesini istiyorsanız “7/24” seçin; değilse mesai dışı “kapanış mesajı + Agent” kombinasyonunu kullanın.",
              en: 'Settings → AI Agent → On. Choose "24/7" if you want replies outside business hours; otherwise use after-hours closing message + Agent.',
            },
          },
          {
            title: { tr: "Bilgi bankasını doldurun", en: "Fill the knowledge base" },
            body: {
              tr: "SSS maddelerini ekleyin. Agent yalnızca buradaki bilgilere dayanarak kesin cevap verir; uydurmaz — emin değilse soft handoff yapar.",
              en: "Add FAQ entries. Agent only gives definitive answers from this content — no guessing; it soft-handoffs when unsure.",
            },
          },
          {
            title: { tr: "Devretme kurallarını yazın", en: "Write handoff rules" },
            body: {
              tr: "Örnek: “şikayet, iade, ödeme itirazı → insan kuyruğu”. Satış teklifi gibi konular için “yöneticiye ata” kuralı ekleyebilirsiniz.",
              en: 'Example: "complaint, refund, payment dispute → human queue". Add "assign to manager" for sales quotes and similar topics.',
            },
          },
          {
            title: { tr: "Test konuşması yapın", en: "Run a test conversation" },
            body: {
              tr: "Gerçek olmayan bir numaradan / hesaptan yazın. Agent yanıtını, etiketleri ve gerekirse handoff’u inbox’ta doğrulayın.",
              en: "Message from a test number or account. Verify Agent replies, labels, and handoff in the inbox.",
            },
          },
        ],
      },
      {
        type: "tip",
        text: {
          tr: "İlk hafta Agent’ı “öneri + onay” modunda çalıştırın; ekip gönderiyi onaylasın. Ton oturunca tam otomatiğe geçin.",
          en: 'Run Agent in "suggest + approve" mode the first week so the team approves sends. Switch to full automation once tone is right.',
        },
      },
      {
        type: "h2",
        text: { tr: "İzleme", en: "Monitoring" },
      },
      {
        type: "ol",
        items: [
          {
            tr: "Otomatik çözülen oranını raporlamada kontrol edin",
            en: "Check auto-resolution rate in reporting",
          },
          {
            tr: "Devredilen konuşmaları haftada bir gözden geçirin — bilgi bankasına yeni SSS ekleyin",
            en: "Review handed-off conversations weekly — add new FAQs to the knowledge base",
          },
          {
            tr: "Yanlış ton veya yanlış bilgi görürseniz ilgili SSS’yi hemen güncelleyin",
            en: "Update the relevant FAQ immediately if you see wrong tone or information",
          },
        ],
      },
      {
        type: "p",
        text: {
          tr: "Agent, insan ekibin yerini almaz; ilk hattı taşır. Omnichannel inbox rehberiyle birlikte kullanıldığında yanıt süresi ve kaçırılan mesaj belirgin düşer.",
          en: "Agent doesn’t replace your team; it carries the first line. Combined with the omnichannel inbox guide, response time and missed messages drop noticeably.",
        },
      },
    ],
  },
  {
    slug: "email-kampanya-gonderme",
    category: "reklam",
    title: {
      tr: "E-posta kampanyası oluşturma ve gönderme",
      en: "Create and send email campaigns",
    },
    description: {
      tr: "Segment seçin, konuyu yazın, zamanlayın ve açılma/tıklama sonuçlarını takip edin.",
      en: "Pick a segment, write the subject, schedule, and track opens and clicks.",
    },
    readingMinutes: 7,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: {
          tr: "Bonero’da e-posta pazarlama ayrı bir ESP’ye export etmeden çalışır. Listeniz CRM / abone verisinden gelir; kampanya, gönderim ve ölçüm aynı panelde kalır.",
          en: "Email marketing in Bonero works without exporting to a separate ESP. Your list comes from CRM / subscriber data; campaign, send, and metrics stay in one panel.",
        },
      },
      {
        type: "h2",
        text: { tr: "Hazırlık", en: "Preparation" },
      },
      {
        type: "ul",
        items: [
          {
            tr: "Gönderen adresi doğrulanmış olmalı (Ayarlar → E-posta)",
            en: "Sender address verified (Settings → Email)",
          },
          {
            tr: "En az bir segment veya abone listesi tanımlı olmalı",
            en: "At least one segment or subscriber list defined",
          },
          {
            tr: "Konu satırı ve CTA hedefiniz net olsun",
            en: "Clear subject line and CTA goal",
          },
        ],
      },
      {
        type: "h2",
        text: { tr: "Kampanya adımları", en: "Campaign steps" },
      },
      {
        type: "steps",
        items: [
          {
            title: { tr: "Segment seçin", en: "Choose a segment" },
            body: {
              tr: "Pazarlama → Segmentler. “Son 30 günde satın alan”, “pasif abone” gibi filtreleri kaydedin. Küçük bir test listesiyle başlayın.",
              en: 'Marketing → Segments. Save filters like "purchased in last 30 days" or "inactive subscriber". Start with a small test list.',
            },
          },
          {
            title: { tr: "Kampanyayı tasarlayın", en: "Design the campaign" },
            body: {
              tr: "Konu, önizleme metni ve gövdeyi yazın. A/B testi açıyorsanız iki konu satırı tanımlayın; kazanan otomatik devam eder.",
              en: "Write subject, preview text, and body. For A/B tests, define two subject lines; the winner continues automatically.",
            },
          },
          {
            title: { tr: "Önizleyip zamanlayın", en: "Preview and schedule" },
            body: {
              tr: "Kendinize test maili gönderin. Onay sonrası “şimdi gönder” veya takvim slotu seçin.",
              en: 'Send a test email to yourself. After approval, choose "send now" or a calendar slot.',
            },
          },
          {
            title: { tr: "Sonuçları okuyun", en: "Read the results" },
            body: {
              tr: "Açılma, tıklama ve abonelikten çıkış oranına bakın. Sonraki segmenti bu metriğe göre daraltın.",
              en: "Review open, click, and unsubscribe rates. Narrow the next segment based on these metrics.",
            },
          },
        ],
      },
      {
        type: "tip",
        text: {
          tr: "İlk kampanyayı tüm listeye atmayın. %10 örnek + kazanan varyasyon, spam şikayetini ve teslimatı korur.",
          en: "Don’t blast the full list on the first campaign. A 10% sample + winning variation protects deliverability and reduces spam complaints.",
        },
      },
    ],
  },
  {
    slug: "crm-pipeline-kullanimi",
    category: "operasyon",
    title: {
      tr: "CRM pipeline’ı günlük kullanım",
      en: "CRM pipeline in daily use",
    },
    description: {
      tr: "Lead’leri yakalayın, skorlayın ve kapatın — kartlar mesaj geçmişiyle birlikte ilerler.",
      en: "Capture, score, and close leads — cards move forward with message history attached.",
    },
    readingMinutes: 6,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: {
          tr: "CRM, Unified Inbox’taki talepleri satış/operasyon kartına dönüştürür. Amaç: spreadsheet yerine sürükle-bırak pipeline.",
          en: "CRM turns inbox requests into sales/ops cards. The goal: a drag-and-drop pipeline instead of spreadsheets.",
        },
      },
      {
        type: "steps",
        items: [
          {
            title: { tr: "Lead’i kart yapın", en: "Turn the lead into a card" },
            body: {
              tr: "Inbox’tan “CRM’e ekle” veya form entegrasyonuyla kart oluşur. Kanal ve kaynak otomatik gelir.",
              en: 'From the inbox use "Add to CRM" or create via form integration. Channel and source are filled automatically.',
            },
          },
          {
            title: { tr: "Aşamayı güncelleyin", en: "Update the stage" },
            body: {
              tr: "Yeni → İlgili → Teklif → Kazanıldı. Kartı sürükleyin; not ve sonraki adımı yazın.",
              en: "New → Interested → Proposal → Won. Drag the card; add notes and next steps.",
            },
          },
          {
            title: { tr: "Ekibe görünür tutun", en: "Keep it visible to the team" },
            body: {
              tr: "Sahibi ata, etiket ekle. Haftalık görüşmede pipeline panosunu ekran paylaşın — gizli Excel yok.",
              en: "Assign an owner, add labels. Share the pipeline board in weekly meetings — no hidden spreadsheets.",
            },
          },
        ],
      },
      {
        type: "tip",
        text: {
          tr: "“Teklif” aşamasında 7 günden fazla bekleyen kartları filtreleyin. Darboğaz genelde burada görünür.",
          en: 'Filter cards stuck in "Proposal" for more than 7 days. Bottlenecks usually show up here.',
        },
      },
    ],
  },
  {
    slug: "randevu-hatirlatma",
    category: "operasyon",
    title: {
      tr: "Randevu alma ve otomatik hatırlatma",
      en: "Bookings and automatic reminders",
    },
    description: {
      tr: "Inbox talebinden takvim slotuna; no-show’u düşüren hatırlatmalar.",
      en: "From inbox request to calendar slot; reminders that cut no-shows.",
    },
    readingMinutes: 6,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: {
          tr: "Müşteri “yarın müsait misiniz?” yazdığında konuşmayı randevu kartına çevirirsiniz. Hatırlatma WhatsApp/SMS ile otomatik gider.",
          en: 'When a customer asks "are you free tomorrow?" you turn the conversation into an appointment card. Reminders go out automatically via WhatsApp/SMS.',
        },
      },
      {
        type: "steps",
        items: [
          {
            title: { tr: "Talebi randevuya çevirin", en: "Convert the request to an appointment" },
            body: {
              tr: "Konuşmada “Randevu oluştur”. Tarih, saat, hizmet ve personel seçin. Onay mesajı müşteriye düşer.",
              en: 'In the conversation choose "Create appointment". Pick date, time, service, and staff. A confirmation goes to the customer.',
            },
          },
          {
            title: { tr: "Hatırlatmayı açın", en: "Enable reminders" },
            body: {
              tr: "24 saat ve/veya 2 saat kala şablon seçin. İptal linki eklemek no-show’u daha da düşürür.",
              en: "Choose templates for 24 hours and/or 2 hours before. Adding a cancel link reduces no-shows further.",
            },
          },
          {
            title: { tr: "No-show sonrası", en: "After a no-show" },
            body: {
              tr: "Gelmedi işaretleyin. Tek tıkla yeni slot önerin — kart geçmişi korunur.",
              en: "Mark as no-show. Offer a new slot in one click — card history is preserved.",
            },
          },
        ],
      },
      {
        type: "ul",
        items: [
          {
            tr: "Çakışan slotlarda sistem uyarır",
            en: "The system warns on conflicting slots",
          },
          {
            tr: "Takvim görünümü ekipçe paylaşılır",
            en: "Calendar view is shared across the team",
          },
          {
            tr: "Kanal bağlamı (WhatsApp/IG) randevu kartında kalır",
            en: "Channel context (WhatsApp/IG) stays on the appointment card",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-reklam-brief",
    category: "reklam",
    title: {
      tr: "AI reklam: brief’ten varyasyona",
      en: "AI ads: from brief to variations",
    },
    description: {
      tr: "Platformları bağlayın, kısa brief verin, AI varyasyon üretin ve yayına alın.",
      en: "Connect platforms, write a short brief, generate AI variations, and go live.",
    },
    readingMinutes: 7,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: {
          tr: "AI reklam masası Meta, Google ve TikTok hesaplarını tek yerde tutar. Brief tek; varyasyonlar çok — onay hattına hazır kreatif çıkar.",
          en: "The AI ads workspace keeps Meta, Google, and TikTok accounts in one place. One brief; many variations — creatives ready for your approval flow.",
        },
      },
      {
        type: "steps",
        items: [
          {
            title: { tr: "Hesapları bağlayın", en: "Connect accounts" },
            body: {
              tr: "Ayarlar → Reklam platformları. Yetkileri tamamlayın; bütçe ve durum panoda görünür hale gelir.",
              en: "Settings → Ad platforms. Complete permissions; budget and status appear on the dashboard.",
            },
          },
          {
            title: { tr: "Brief yazın", en: "Write the brief" },
            body: {
              tr: "Ürün, hedef kitle, teklif ve ton. 3–5 cümle yeter. Marka yasaklı kelimeleri ekleyin.",
              en: "Product, audience, offer, and tone. 3–5 sentences is enough. Add brand banned words.",
            },
          },
          {
            title: { tr: "Varyasyon seçin", en: "Pick variations" },
            body: {
              tr: "Başlık + görsel + CTA kombinasyonlarını inceleyin. Kazananı onaylayıp kampanyayı açın.",
              en: "Review headline + image + CTA combinations. Approve the winner and launch the campaign.",
            },
          },
        ],
      },
      {
        type: "tip",
        text: {
          tr: "İlk hafta bütçeyi düşük tutun. Raporlamada ROAS ve CTR’yi izleyip kazanan varyasyonu ölçekleyin.",
          en: "Keep budget low the first week. Watch ROAS and CTR in reporting and scale the winning variation.",
        },
      },
    ],
  },
  {
    slug: "raporlama-metrikleri",
    category: "operasyon",
    title: {
      tr: "Raporlamada doğru metriklere bakmak",
      en: "Reading the right metrics in reporting",
    },
    description: {
      tr: "Kanal, yanıt süresi, kampanya ve randevu performansını tek dashboard’da okuyun.",
      en: "Read channel, response time, campaign, and appointment performance in one dashboard.",
    },
    readingMinutes: 5,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: {
          tr: "Raporlama, “dün ne oldu?” sorusuna Excel’siz cevap verir. Haftalık operasyon toplantısı için hazır paneller kullanın.",
          en: 'Reporting answers "what happened yesterday?" without Excel. Use ready-made panels for your weekly ops meeting.',
        },
      },
      {
        type: "h2",
        text: { tr: "Önerilen nabız", en: "Recommended pulse metrics" },
      },
      {
        type: "ul",
        items: [
          {
            tr: "Ortalama ilk yanıt süresi (inbox)",
            en: "Average first response time (inbox)",
          },
          {
            tr: "AI Agent çözüm oranı ve handoff sayısı",
            en: "AI Agent resolution rate and handoff count",
          },
          {
            tr: "Randevu doluluk ve no-show oranı",
            en: "Appointment fill rate and no-show rate",
          },
          {
            tr: "E-posta açılma / tıklama",
            en: "Email open / click rates",
          },
          {
            tr: "Reklam harcaması vs. lead / randevu",
            en: "Ad spend vs. leads / appointments",
          },
        ],
      },
      {
        type: "ol",
        items: [
          {
            tr: "Haftanın başında varsayılan dashboard’u açın",
            en: "Open the default dashboard at the start of the week",
          },
          {
            tr: "Anomali gördüğünüz metrikte detaya inin (kanal veya kampanya)",
            en: "Drill into anomalies (by channel or campaign)",
          },
          {
            tr: "PDF / özet paylaşımıyla ekibi hizalayın",
            en: "Align the team with PDF / summary sharing",
          },
        ],
      },
      {
        type: "tip",
        text: {
          tr: "10 metrik değil, 4 nabız seçin. Fazla KPI panosu kimsenin açmadığı bir ekrana dönüşür.",
          en: "Pick 4 pulse metrics, not 10. Too many KPIs turn into a dashboard nobody opens.",
        },
      },
    ],
  },
  {
    slug: "ekip-rolleri-onay",
    category: "operasyon",
    title: {
      tr: "Ekip rolleri ve onay hattı",
      en: "Team roles and approval workflow",
    },
    description: {
      tr: "Yetki verin, görev atayın, onayları e-posta zinciri olmadan ilerletin.",
      en: "Grant permissions, assign tasks, and move approvals without email chains.",
    },
    readingMinutes: 5,
    updatedAt: "2026-07-14",
    body: [
      {
        type: "p",
        text: {
          tr: "İşbirliği modülü rolleri (yönetici, editör, onaycı) ve onay rayını Bonero içinde tutar. Kim neyi bekliyor sorusu sohbette kaybolmaz.",
          en: "The collaboration module keeps roles (manager, editor, approver) and approval paths inside Bonero. Who is waiting for what doesn’t get lost in chat.",
        },
      },
      {
        type: "steps",
        items: [
          {
            title: { tr: "Rol tanımlayın", en: "Define roles" },
            body: {
              tr: "Ayarlar → Ekip. Yeni üyeyi davet ederken rol seçin; yetki sınırı hemen uygulanır.",
              en: "Settings → Team. Choose a role when inviting; permission limits apply immediately.",
            },
          },
          {
            title: { tr: "Onay rayını kurun", en: "Set up the approval path" },
            body: {
              tr: "İçerik veya reklam işi için “editör → onaycı” sırasını seçin. Bekleyen adımlar panoda görünür.",
              en: 'For content or ads, choose "editor → approver" order. Pending steps show on the board.',
            },
          },
          {
            title: { tr: "Darboğazı izleyin", en: "Watch for bottlenecks" },
            body: {
              tr: "48 saatten fazla bekleyen onaylarda hatırlatma gönderin. Yayın ancak onay sonrası açılır.",
              en: "Send reminders on approvals waiting more than 48 hours. Publishing opens only after approval.",
            },
          },
        ],
      },
      {
        type: "tip",
        text: {
          tr: "Müşteri onayını iç onaydan ayırın. Aynı kişide birikirse ray tıkanır.",
          en: "Separate customer approval from internal approval. If one person holds both, the path jams.",
        },
      },
    ],
  },
];
