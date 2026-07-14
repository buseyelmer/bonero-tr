export type FeatureSlug =
  | "gelen-kutusu"
  | "yapay-zeka"
  | "ai-reklam"
  | "isbirligi"
  | "crm"
  | "randevu"
  | "icerik"
  | "email-marketing"
  | "raporlama";

export type FeatureScenario = {
  label: string;
  text: string;
};

export type FeaturePageContent = {
  slug: FeatureSlug;
  homeId: string;
  navLabel: string;
  navLabelEn: string;
  title: string;
  titleEn: string;
  eyebrow: string;
  eyebrowEn: string;
  headline: string;
  headlineEn: string;
  lead: string;
  leadEn: string;
  valuePoints: { title: string; body: string }[];
  valuePointsEn: { title: string; body: string }[];
  scenarios: FeatureScenario[];
  scenariosEn: FeatureScenario[];
  outcome: string;
  outcomeEn: string;
  metaTitle: string;
  metaDescription: string;
  mockCaption: string;
  mockCaptionEn: string;
};

export const FEATURE_PAGES: FeaturePageContent[] = [
  {
    slug: "gelen-kutusu",
    homeId: "inbox",
    navLabel: "Omnichannel",
    navLabelEn: "Omnichannel",
    title: "Omnichannel",
    titleEn: "Omnichannel",
    eyebrow: "Tüm kanallar · tek gelen kutusu",
    eyebrowEn: "All channels · one inbox",
    headline: "WhatsApp, Instagram, e-posta, web — tek akışta. Sekme değiştirmek yok.",
    headlineEn: "WhatsApp, Instagram, email, web — one stream. No tab hopping.",
    lead: "Müşteri hangi kanaldan yazarsa yazsın, Bonero Omnichannel hepsini tek gelen kutusunda toplar. Geçmiş, etiket ve atama kanal fark etmeksizin görünür; ekip aynı ekrandan yanıtlar.",
    leadEn:
      "Wherever the customer writes, Bonero Omnichannel unifies it in one inbox. History, tags, and assignment stay visible across channels — the team replies from a single screen.",
    valuePoints: [
      {
        title: "Tek inbox, tüm kanallar",
        body: "WhatsApp, Instagram DM, e-posta ve web formları yan yana. Okunmamış nabız tek bakışta.",
      },
      {
        title: "Bağlam kaybolmaz",
        body: "Aynı müşteri dün mail, bugün DM yazmış olsa da thread birleşir; tekrar soru sormazsınız.",
      },
      {
        title: "Ekip aynı ekranda",
        body: "Atama, etiket ve öncelik net. ‘Ben bakmadım’ bahanesi biter; yanıt süresi kısalır.",
      },
    ],
    valuePointsEn: [
      {
        title: "One inbox, every channel",
        body: "WhatsApp, Instagram DMs, email, and web forms side by side — unread pulse at a glance.",
      },
      {
        title: "Context stays",
        body: "Same customer mailed yesterday and DMed today — one thread; no re-asking.",
      },
      {
        title: "Team on one screen",
        body: "Assignment, tags, and priority are clear. No “I didn’t see it” — reply time drops.",
      },
    ],
    scenarios: [
      {
        label: "Sabah açılış",
        text: "Dört kanaldan okunmamışlar tek listede; önce aciller, sonra rutinler.",
      },
      {
        label: "Kanal değişimi",
        text: "Müşteri IG’den başlar, WhatsApp’a geçer — geçmiş aynı kartta kalır.",
      },
      {
        label: "Yoğun saat",
        text: "Etiket + atama ile iş bölünür; kimse aynı mesajı iki kez cevaplamaz.",
      },
    ],
    scenariosEn: [
      {
        label: "Morning open",
        text: "Unread from four channels in one list — urgents first, then routine.",
      },
      {
        label: "Channel switch",
        text: "Customer starts on IG, moves to WhatsApp — history stays on one card.",
      },
      {
        label: "Peak hour",
        text: "Tags + assignment split the load; no double replies.",
      },
    ],
    outcome:
      "Kaçırılan mesaj azalır, yanıt hızlanır, müşteri her kanalda aynı deneyimi alır.",
    outcomeEn:
      "Fewer missed messages, faster replies, the same experience on every channel.",
    metaTitle: "Omnichannel — Birleşik Gelen Kutusu",
    metaDescription:
      "WhatsApp, Instagram, e-posta ve web’i tek gelen kutusunda birleştirin. Bonero Omnichannel ile kanal karmaşasını bitirin.",
    mockCaption: "Omnichannel birleşik gelen kutusu",
    mockCaptionEn: "Omnichannel unified inbox",
  },
  {
    slug: "yapay-zeka",
    homeId: "ai",
    navLabel: "AI Agent",
    navLabelEn: "AI Agent",
    title: "AI Agent",
    titleEn: "AI Agent",
    eyebrow: "7/24 akıllı ajan",
    eyebrowEn: "24/7 intelligent agent",
    headline: "Mesajlar beklemesin. AI Agent yanıtlar, yönlendirir, takip eder.",
    headlineEn: "Don’t leave messages waiting. AI Agent replies, routes, and follows up.",
    lead: "WhatsApp, Instagram ve e-postada gelen sorulara Bonero AI Agent 7/24 karşılık verir. SSS’yi çözer, randevu/lead bilgisini toplar; karmaşık işleri ekibe devreder — gece de dahil, kaçan mesaj azalır.",
    leadEn:
      "Bonero AI Agent answers WhatsApp, Instagram, and email around the clock. It handles FAQs, captures appointment/lead info, and hands complex cases to your team — fewer missed messages, nights included.",
    valuePoints: [
      {
        title: "Anında ilk yanıt",
        body: "Çalışma saatleri dışında da müşteri boşlukta kalmaz; Agent nabız tutar, lead soğumaz.",
      },
      {
        title: "Akıllı yönlendirme",
        body: "Basit sorular Agent’ta kalır; satış, şikayet veya özel talep doğru kişiye düşer.",
      },
      {
        title: "Marka dilinde konuşur",
        body: "Ton ve kurallar sizde; Agent işletmenizin sesiyle yanıtlar, siz onay akışını belirlersiniz.",
      },
    ],
    valuePointsEn: [
      {
        title: "Instant first reply",
        body: "Customers aren’t left hanging after hours — the Agent keeps the pulse, leads don’t go cold.",
      },
      {
        title: "Smart handoff",
        body: "Simple questions stay with the Agent; sales, complaints, or special requests reach the right person.",
      },
      {
        title: "Speaks your brand",
        body: "Tone and rules are yours — the Agent replies in your voice; you set the approval flow.",
      },
    ],
    scenarios: [
      {
        label: "Gece DM",
        text: "Fiyat ve saat sorusu gelir; Agent yanıtlar, randevu slotu önerir, sabah ekip özet alır.",
      },
      {
        label: "SSS & yönlendirme",
        text: "Adres/ödeme gibi bilinen sorular otomatik; şikayet etiketlenip destek sırasına gider.",
      },
      {
        label: "Lead yakalama",
        text: "İsim, ihtiyaç ve iletişim Agent tarafından kartlanır; CRM’de takip hazırdır.",
      },
    ],
    scenariosEn: [
      {
        label: "Night DM",
        text: "Price and hours asked — Agent replies, suggests a slot, team gets a morning summary.",
      },
      {
        label: "FAQ & route",
        text: "Known answers auto-resolve; complaints are tagged into support.",
      },
      {
        label: "Lead capture",
        text: "Name, need, and contact captured by the Agent — CRM follow-up ready.",
      },
    ],
    outcome:
      "Yanıt süresi kısalır, gece/hafta sonu kaçakları düşer, ekip zor vakalara odaklanır.",
    outcomeEn:
      "Faster replies, fewer nights/weekend misses, team focus on hard cases.",
    metaTitle: "AI Agent — 7/24 Akıllı Yanıt",
    metaDescription:
      "WhatsApp, Instagram ve e-postada 7/24 AI Agent. Otomatik yanıt, yönlendirme ve lead yakalama — Bonero.",
    mockCaption: "AI Agent konuşma ve yönlendirme",
    mockCaptionEn: "AI Agent chat and handoff",
  },
  {
    slug: "ai-reklam",
    homeId: "ads",
    navLabel: "AI Reklam",
    navLabelEn: "AI Ads",
    title: "AI Reklam Yönetimi",
    titleEn: "AI Ad Management",
    eyebrow: "Çoklu platform · tek ekran",
    eyebrowEn: "Multi-platform · one screen",
    headline: "Meta, Google, TikTok — tek panel. AI, kreatif ve bütçeyi hızlandırır.",
    headlineEn: "Meta, Google, TikTok — one panel. AI speeds creatives and budget moves.",
    lead: "Farklı reklam panelleri arasında sekme açmak bitsin. Bonero’da kampanyaları yan yana görün; AI metin/varyasyon üretir, performans önerir, hangi kanalın dönüştürdüğünü tek bakışta gösterir.",
    leadEn:
      "Stop hopping ad consoles. In Bonero, campaigns sit side by side — AI drafts copy and variants, suggests optimizations, and shows which channel converts at a glance.",
    valuePoints: [
      {
        title: "Tek ekrandan çoklu platform",
        body: "Meta, Google Ads ve TikTok kampanyaları aynı dashboard’da. Durum, harcama ve sonuç yan yana.",
      },
      {
        title: "AI destekli kreatif",
        body: "Hook, gövde ve A/B varyasyonları hedefe ve marka tonuna göre üretilir; onaylayıp yayına alın.",
      },
      {
        title: "Akıllı bütçe sinyali",
        body: "ROAS ve CTR karşılaştırması netleşir; eforu yükselen kanala kaydırırsınız — tahmin değil veri.",
      },
    ],
    valuePointsEn: [
      {
        title: "Multi-platform, one screen",
        body: "Meta, Google Ads, and TikTok campaigns on one dashboard — status, spend, and results side by side.",
      },
      {
        title: "AI-assisted creatives",
        body: "Hooks, body copy, and A/B variants matched to goal and brand tone — approve and ship.",
      },
      {
        title: "Smart budget signals",
        body: "ROAS and CTR compare clearly; shift effort to the channel that rises — data, not guesses.",
      },
    ],
    scenarios: [
      {
        label: "Sabah kontrol",
        text: "Üç platform, bir ekran — hangi kampanya bütçe yiyor, hangisi dönüştürüyor net.",
      },
      {
        label: "Yeni kreatif",
        text: "AI üç hook üretir; kazananı Meta ve TikTok’a aynı anda uygularsınız.",
      },
      {
        label: "Bütçe kaydırma",
        text: "Google ROAS düşmüş, Instagram yükselmiş — harcamayı tek tıkla dengeleyin.",
      },
    ],
    scenariosEn: [
      {
        label: "Morning check",
        text: "Three platforms, one screen — which campaign burns budget, which converts.",
      },
      {
        label: "New creative",
        text: "AI drafts three hooks; apply the winner to Meta and TikTok at once.",
      },
      {
        label: "Budget shift",
        text: "Google ROAS dipped, Instagram rose — rebalance spend in one move.",
      },
    ],
    outcome:
      "Platform karmaşası biter, kreatif tempo artar, bütçe doğru kanala gider.",
    outcomeEn:
      "Less platform chaos, faster creatives, budget on the channels that work.",
    metaTitle: "AI Reklam Yönetimi — Çoklu Platform",
    metaDescription:
      "Meta, Google ve TikTok’u tek ekrandan yönetin; AI ile kreatif ve bütçe önerileri alın. Bonero AI reklam yönetimi.",
    mockCaption: "Çoklu platform reklam paneli",
    mockCaptionEn: "Multi-platform ads panel",
  },
  {
    slug: "isbirligi",
    homeId: "team",
    navLabel: "İşbirliği",
    navLabelEn: "Collaboration",
    title: "Ekip & Onay Yönetimi",
    titleEn: "Team & Approvals",
    eyebrow: "İşbirliği",
    eyebrowEn: "Collaboration",
    headline: "Görev, rol ve onay — e-posta zinciri olmadan.",
    headlineEn: "Tasks, roles, and approvals — without email chains.",
    lead: "Onaylar Slack’te, dosyalar Drive’da, görevler Excel’de kaybolmasın. Bonero’da rol bazlı yetki, görev atama ve onay hattı tek yerde — net sorumluluk, hızlı yayına çıkış.",
    leadEn:
      "Approvals in Slack, files in Drive, tasks in spreadsheets — stop the scatter. Bonero keeps roles, assignments, and approval flows in one place.",
    valuePoints: [
      {
        title: "Kim neyi onaylıyor?",
        body: "Rol ve yetki net; müşteri onayı ile iç onay birbirine karışmaz.",
      },
      {
        title: "Hızlı yayın",
        body: "Bekleyen işler görünür; darboğazlar erken yakalanır.",
      },
      {
        title: "Ölçeklenebilir ekip",
        body: "Yeni üye eklendiğinde süreçler bozulmaz — aynı hat, daha çok el.",
      },
    ],
    valuePointsEn: [
      {
        title: "Who approves what?",
        body: "Clear roles; client and internal approvals stay separated.",
      },
      {
        title: "Ship faster",
        body: "Pending work is visible; bottlenecks surface early.",
      },
      {
        title: "Team that scales",
        body: "Onboard teammates without breaking the flow.",
      },
    ],
    scenarios: [
      {
        label: "Brief → yayın",
        text: "Hesap yükler, editör üretir, müşteri onaylar, yayın — tek rayda ilerler.",
      },
      {
        label: "Darboğaz",
        text: "Müşteri 48 saattir onaylamadı; hat görünür, hatırlatma net.",
      },
      {
        label: "Yeni üye",
        text: "Rol atanır, yetki sınırlı; süreç aynı kalır, kaos olmaz.",
      },
    ],
    scenariosEn: [
      {
        label: "Brief → live",
        text: "Account uploads, editor produces, client approves — one rail.",
      },
      {
        label: "Bottleneck",
        text: "Client pending 48h — the rail shows it, reminder is clear.",
      },
      {
        label: "New hire",
        text: "Role assigned, permissions scoped — process stays intact.",
      },
    ],
    outcome: "Sorumluluk netleşir, onay süresi kısalır, yayın hızlanır.",
    outcomeEn: "Clear ownership, shorter approvals, faster shipping.",
    metaTitle: "İşbirliği — Ekip & Onay Yönetimi",
    metaDescription:
      "Ekipler için rol, görev ve onay hattı. Bonero ile operasyonu şeffaflaştırın — kaydolun ve hemen başlayın.",
    mockCaption: "Ekip rolleri ve onay akışı",
    mockCaptionEn: "Team roles and approval flow",
  },
  {
    slug: "crm",
    homeId: "crm",
    navLabel: "CRM",
    navLabelEn: "CRM",
    title: "CRM",
    titleEn: "CRM",
    eyebrow: "Müşteri & lead yönetimi",
    eyebrowEn: "Customer & lead management",
    headline: "Her lead bir kartta. Pipeline görünür, takip kaçmaz.",
    headlineEn: "Every lead on a card. Pipeline visible, follow-ups don’t slip.",
    lead: "WhatsApp’tan gelen soru, Instagram DM veya web formu — hepsi Bonero CRM’de müşteri kaydına dönüşür. Aşama, etiket ve sonraki adım tek yerde; ekip kiminle konuşulacağını bilir, soğuk lead unutulmaz.",
    leadEn:
      "A WhatsApp question, Instagram DM, or web form becomes a customer record in Bonero CRM. Stage, tags, and next step in one place — the team knows who to talk to, cold leads don’t vanish.",
    valuePoints: [
      {
        title: "Tek müşteri kartı",
        body: "İletişim geçmişi, kanal ve notlar aynı profilde. ‘Bu kişi kimdi?’ avı biter.",
      },
      {
        title: "Görünür pipeline",
        body: "Yeni lead → ilgilenen → teklif → kazanıldı. Hangi aşamada kaç kayıt olduğu nettir.",
      },
      {
        title: "Takip hatırlatması",
        body: "Sonraki arama veya mesaj tarihi karta işlenir; geciken lead panoya düşer.",
      },
    ],
    valuePointsEn: [
      {
        title: "One customer card",
        body: "History, channel, and notes on one profile. No more “who was this?” hunts.",
      },
      {
        title: "Visible pipeline",
        body: "New → interested → proposal → won. See how many records sit in each stage.",
      },
      {
        title: "Follow-up reminders",
        body: "Next call or message date lives on the card; overdue leads surface on the board.",
      },
    ],
    scenarios: [
      {
        label: "Yeni lead",
        text: "DM gelir, kart açılır, etiket atanır — aynı gün takip görevi oluşur.",
      },
      {
        label: "Satış görüşmesi",
        text: "Geçmiş mesajlar ve notlar kartta; görüşmeye hazırlıklı girersiniz.",
      },
      {
        label: "Haftalık kontrol",
        text: "Pipeline’da takılan aşamalar görünür; ekip eforu oraya kaydırır.",
      },
    ],
    scenariosEn: [
      {
        label: "New lead",
        text: "DM arrives, card opens, tag applied — follow-up task the same day.",
      },
      {
        label: "Sales call",
        text: "Past messages and notes on the card — you walk in prepared.",
      },
      {
        label: "Weekly review",
        text: "Stuck pipeline stages show up; the team shifts effort there.",
      },
    ],
    outcome:
      "Lead kaybı azalır, takip düzenli olur, satış konuşmaları bağlamlı ilerler.",
    outcomeEn:
      "Fewer lost leads, steady follow-ups, sales talks with full context.",
    metaTitle: "CRM — Müşteri & Lead Pipeline",
    metaDescription:
      "Lead’leri pipeline’da yönetin; iletişim geçmişi ve takip tek kartta. Bonero CRM ile müşteri ilişkilerinizi netleştirin.",
    mockCaption: "CRM pipeline ve müşteri kartı",
    mockCaptionEn: "CRM pipeline and customer card",
  },
  {
    slug: "randevu",
    homeId: "appointments",
    navLabel: "Randevu & Toplantı",
    navLabelEn: "Appointments & Meetings",
    title: "Randevu & Toplantı",
    titleEn: "Appointments & Meetings",
    eyebrow: "Takvim & takip",
    eyebrowEn: "Calendar & tracking",
    headline: "Randevu kargaşası bitsin. Takvim, hatırlatma ve takip tek yerde.",
    headlineEn: "End appointment chaos. Calendar, reminders, and follow-up in one place.",
    lead: "Salon, klinik, güzellik merkezi veya satış toplantısı — Bonero’da randevular kanal mesajlarıyla bağlanır. Onay, hatırlatma ve no-show takibi aynı panelde; ekip takvim dışı kalmaz.",
    leadEn:
      "Salon, clinic, beauty studio, or sales meeting — appointments link to channel messages in Bonero. Confirmations, reminders, and no-show tracking in one panel; the team stays on the calendar.",
    valuePoints: [
      {
        title: "Tek takvim",
        body: "Günlük ve haftalık görünümde tüm randevular; çakışmalar ve boş slotlar net.",
      },
      {
        title: "Otomatik hatırlatma",
        body: "WhatsApp veya SMS ile onay/hatırlatma; no-show oranı düşer, koltuk dolu kalır.",
      },
      {
        title: "Mesajdan randevuya",
        body: "Inbox’taki talep randevu kartına dönüşür; bağlam kaybolmaz, müşteri tekrar anlatmaz.",
      },
    ],
    valuePointsEn: [
      {
        title: "One calendar",
        body: "Daily and weekly views of every appointment — conflicts and open slots are clear.",
      },
      {
        title: "Auto reminders",
        body: "Confirm and remind via WhatsApp or SMS; fewer no-shows, fuller chairs.",
      },
      {
        title: "From message to booking",
        body: "An inbox request becomes an appointment card — context stays, customer doesn’t repeat.",
      },
    ],
    scenarios: [
      {
        label: "Yeni talep",
        text: "DM’den ‘yarın müsait misiniz?’ gelir; uygun slot seçilir, randevu oluşur.",
      },
      {
        label: "Hatırlatma günü",
        text: "24 saat önce otomatik mesaj gider; müşteri onaylar veya ertelemeyi ister.",
      },
      {
        label: "No-show sonrası",
        text: "Gelmediği kayda düşer; tekrar davet veya yeni slot önerisi tek tıkla.",
      },
    ],
    scenariosEn: [
      {
        label: "New request",
        text: "DM asks “free tomorrow?” — pick a slot, booking is created.",
      },
      {
        label: "Reminder day",
        text: "Auto message 24h ahead; customer confirms or asks to reschedule.",
      },
      {
        label: "After a no-show",
        text: "Miss logged on the card; re-invite or new slot in one tap.",
      },
    ],
    outcome:
      "Takvim dolu kalır, unutulan randevu azalır, ekip aynı programla çalışır.",
    outcomeEn:
      "Calendar stays full, fewer forgotten bookings, one shared schedule for the team.",
    metaTitle: "Randevu & Toplantı — Takvim ve Takip",
    metaDescription:
      "Randevu takvimi, hatırlatma ve mesajdan rezervasyon. Bonero ile randevu ve toplantı takibini tek panelde yönetin.",
    mockCaption: "Randevu takvimi ve hatırlatmalar",
    mockCaptionEn: "Appointment calendar and reminders",
  },
  {
    slug: "icerik",
    homeId: "content",
    navLabel: "İçerik Yönetimi",
    navLabelEn: "Content Management",
    title: "İçerik Yönetimi",
    titleEn: "Content Management",
    eyebrow: "Plan · üret · yayınla",
    eyebrowEn: "Plan · create · publish",
    headline: "İçerik dağılsın, plan dağılmasın. Takvimden yayına tek hat.",
    headlineEn: "Scatter content, not the plan. One line from calendar to publish.",
    lead: "Post, story, newsletter taslağı ve onay — Bonero’da içerik takviminde toplanır. Kim ne zaman ne yayınlayacak belli; brief kaybolmaz, yayın kaçmaz, ekip aynı board’da çalışır.",
    leadEn:
      "Posts, stories, newsletter drafts, and approvals live on Bonero’s content calendar. Who publishes what and when is clear — briefs don’t vanish, drops don’t slip, the team shares one board.",
    valuePoints: [
      {
        title: "İçerik takvimi",
        body: "Haftalık ve aylık görünümde planlanan yayınlar; boş günler ve yoğunluk net.",
      },
      {
        title: "Brief → taslak → onay",
        body: "Durumlar görsel akar. Onay bekleyenler panoda; yayın yetkisi kimdeyse o ilerler.",
      },
      {
        title: "Kanala hazır çıktı",
        body: "Instagram, e-posta veya web — format ve kopya aynı kayıtta; tekrar yazmaya gerek yok.",
      },
    ],
    valuePointsEn: [
      {
        title: "Content calendar",
        body: "Weekly and monthly planned posts — empty days and busy weeks are obvious.",
      },
      {
        title: "Brief → draft → approve",
        body: "Statuses move visually. Pending approvals sit on the board; the owner ships.",
      },
      {
        title: "Channel-ready output",
        body: "Instagram, email, or web — format and copy in one record; no rewriting from scratch.",
      },
    ],
    scenarios: [
      {
        label: "Haftalık plan",
        text: "Pazartesi board açılır; üç post ve bir e-posta slotlanır, sahipler atanır.",
      },
      {
        label: "Onay anı",
        text: "Taslak hazır; yönetici onaylar veya not düşer — durum anında güncellenir.",
      },
      {
        label: "Yayın günü",
        text: "Saat gelince hatırlatma düşer; kanal ve kopya tek tıkla erişilir.",
      },
    ],
    scenariosEn: [
      {
        label: "Weekly plan",
        text: "Monday board opens; three posts and one email are slotted with owners.",
      },
      {
        label: "Approval moment",
        text: "Draft ready; manager approves or leaves a note — status updates instantly.",
      },
      {
        label: "Publish day",
        text: "Reminder at go-live; channel and copy one tap away.",
      },
    ],
    outcome:
      "İçerik düzeni bozulmaz, onay hızlanır, yayın temposu öngörülebilir olur.",
    outcomeEn:
      "Content stays organized, approvals move faster, publish cadence gets predictable.",
    metaTitle: "İçerik Yönetimi — Takvim ve Yayın Akışı",
    metaDescription:
      "İçerik takvimi, brief, onay ve yayın akışı tek panelde. Bonero ile içerik yönetimini netleştirin.",
    mockCaption: "İçerik takvimi ve yayın durumu",
    mockCaptionEn: "Content calendar and publish status",
  },
  {
    slug: "email-marketing",
    homeId: "email",
    navLabel: "Email Marketing",
    navLabelEn: "Email Marketing",
    title: "Email Marketing",
    titleEn: "Email Marketing",
    eyebrow: "Kampanya · segment · otomasyon",
    eyebrowEn: "Campaigns · segments · automation",
    headline: "Bülteni Excel’de derlemeyin. Segment, gönderim ve sonuç tek panelde.",
    headlineEn: "Don’t assemble newsletters in Excel. Segment, send, and results in one panel.",
    lead: "Bonero Email Marketing ile listeyi segmente edin, kampanya oluşturun, A/B test edin ve açılma/tıklama oranını izleyin. CRM ve omnichannel ile bağlı olduğu için soğuk liste değil, sıcak müşteri akışı yürür.",
    leadEn:
      "With Bonero Email Marketing, segment lists, build campaigns, A/B test, and track opens/clicks. Tied to CRM and omnichannel, you run warm customer flows — not cold list dumps.",
    valuePoints: [
      {
        title: "Akıllı segmentler",
        body: "Etiket, kaynak ve davranışa göre listeler. Doğru mesaj doğru gruba gider.",
      },
      {
        title: "Kampanya & otomasyon",
        body: "Tek seferlik bülten veya drip akışları; şablonlar hazır, gönderim zamanlanabilir.",
      },
      {
        title: "Ölçülebilir sonuç",
        body: "Açılma, tıklama ve dönüşüm panoda. Hangi konu satıyor netleşir.",
      },
    ],
    valuePointsEn: [
      {
        title: "Smart segments",
        body: "Lists by tags, source, and behavior — the right message to the right group.",
      },
      {
        title: "Campaigns & automation",
        body: "One-off newsletters or drip flows — templates ready, sends schedulable.",
      },
      {
        title: "Measurable results",
        body: "Opens, clicks, and conversions on the board. See which subjects sell.",
      },
    ],
    scenarios: [
      {
        label: "Haftalık bülten",
        text: "Aktif müşterilere ipucu maili; segment hazır, şablon seçilir, Cuma 10:00’a slotlanır.",
      },
      {
        label: "No-show sonrası",
        text: "Gelmedi etiketiyle otomatik hatırlatma + yeni slot teklifi gider.",
      },
      {
        label: "A/B konu satırı",
        text: "İki konu test edilir; kazanan otomatik kalan listeye ölçeklenir.",
      },
    ],
    scenariosEn: [
      {
        label: "Weekly newsletter",
        text: "Tips mail to active customers — segment ready, template picked, slotted Friday 10:00.",
      },
      {
        label: "After no-show",
        text: "Auto reminder + new slot offer to the no-show tag.",
      },
      {
        label: "A/B subject",
        text: "Two subjects tested; winner scales to the rest of the list.",
      },
    ],
    outcome:
      "Liste dağınıklığı biter, gönderim temposu yükselir, e-posta kanadı ölçülebilir olur.",
    outcomeEn:
      "List chaos ends, send cadence rises, email becomes a measurable channel.",
    metaTitle: "Email Marketing — Kampanya & Otomasyon",
    metaDescription:
      "Segment, kampanya, A/B ve otomasyon tek panelde. Bonero Email Marketing ile bülten ve drip akışlarını yönetin.",
    mockCaption: "Email kampanya ve segment paneli",
    mockCaptionEn: "Email campaign and segment panel",
  },
  {
    slug: "raporlama",
    homeId: "analytics",
    navLabel: "Raporlama",
    navLabelEn: "Reporting",
    title: "Raporlama",
    titleEn: "Reporting",
    eyebrow: "Analitik & performans",
    eyebrowEn: "Analytics & performance",
    headline: "İşletmenizin nabzı tek panelde. Tahmin değil, canlı veri.",
    headlineEn: "Your business pulse on one panel. Live data, not guesses.",
    lead: "Mesaj, randevu, reklam ve dönüşüm metriklerini Bonero’da birleştirin. Hangi kanalın iş getirdiğini, yanıt süresinin nerede kaldığını ve haftalık trendi anında görün — Excel birleştirmeden, ekran görüntüsü avlamadan.",
    leadEn:
      "Unify message, appointment, ads, and conversion metrics in Bonero. See which channel drives work, where reply time slips, and weekly trends instantly — no Excel mashups, no screenshot hunts.",
    valuePoints: [
      {
        title: "Tek bakışta KPI’lar",
        body: "Yanıt süresi, açık talepler, dönüşüm ve kanal kırılımı aynı dashboard’da. Günlük kontrol için rakamlar hazır.",
      },
      {
        title: "Kanallar yan yana",
        body: "WhatsApp, Instagram, e-posta ve reklam performansı karşılaştırmalı. Bütçeyi ve eforu doğru yere kaydırın.",
      },
      {
        title: "Dönem trendi net",
        body: "Haftalık ve aylık grafiklerle ilerleme görünür. Ekip toplantısında ‘ne değişti?’ sorusu saniyelerde cevaplanır.",
      },
    ],
    valuePointsEn: [
      {
        title: "KPIs at a glance",
        body: "Reply time, open requests, conversions, and channel mix on one dashboard — numbers ready for the daily check-in.",
      },
      {
        title: "Channels side by side",
        body: "Compare WhatsApp, Instagram, email, and ad performance. Move budget and effort where they work.",
      },
      {
        title: "Clear period trends",
        body: "Weekly and monthly charts make progress visible. “What changed?” is answered in seconds in team meetings.",
      },
    ],
    scenarios: [
      {
        label: "Sabah rutini",
        text: "Açık talep, yanıt ortalaması ve dünkü dönüşüm — 30 saniyede günün önceliği net.",
      },
      {
        label: "Bütçe ayarı",
        text: "Hangi reklam ve kanal dönüştürüyor belli; harcamayı oraya kaydırırsınız.",
      },
      {
        label: "Haftalık özet",
        text: "Trend grafiği ve kanal karşılaştırması hazır; ekstra rapor derlemesine gerek yok.",
      },
    ],
    scenariosEn: [
      {
        label: "Morning check",
        text: "Open requests, avg reply time, yesterday’s conversions — day’s priority in 30 seconds.",
      },
      {
        label: "Budget tweak",
        text: "See which ads and channels convert; shift spend there.",
      },
      {
        label: "Weekly wrap",
        text: "Trend chart and channel compare ready — no extra report assembly.",
      },
    ],
    outcome:
      "Kararlar hızlanır, efor doğru kanala gider, ekip aynı rakamlarla konuşur.",
    outcomeEn:
      "Faster decisions, effort on the right channels, one shared set of numbers.",
    metaTitle: "Raporlama — Canlı Analitik & Performans",
    metaDescription:
      "Kanal, yanıt ve dönüşüm metriklerini tek dashboard’da izleyin. Bonero raporlama ile işletme performansınızı canlı tutun.",
    mockCaption: "Canlı performans dashboard’u",
    mockCaptionEn: "Live performance dashboard",
  },
];

export const FEATURE_SLUGS = FEATURE_PAGES.map((f) => f.slug);

export function getFeatureBySlug(
  slug: string,
): FeaturePageContent | undefined {
  return FEATURE_PAGES.find((f) => f.slug === slug);
}

export function isFeatureSlug(slug: string): slug is FeatureSlug {
  return FEATURE_SLUGS.includes(slug as FeatureSlug);
}

export function featureHref(slug: FeatureSlug): string {
  return `/features/${slug}`;
}
