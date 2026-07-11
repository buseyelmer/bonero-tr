export type FeatureSlug =
  | "gelen-kutusu"
  | "yapay-zeka"
  | "ai-reklam"
  | "isbirligi"
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
    navLabel: "Gelen Kutusu",
    navLabelEn: "Inbox",
    title: "Unified Inbox",
    titleEn: "Unified Inbox",
    eyebrow: "Birleşik gelen kutusu",
    eyebrowEn: "Unified inbox",
    headline: "Dağınık kanallar bitsin. Her lead için tek kutu.",
    headlineEn: "Scattered channels end. One inbox for every lead.",
    lead: "WhatsApp, Instagram DM, e-posta ve web formları ayrı sekmelerde kaybolmasın. Bonero Unified Inbox, ajans ekibinin yanıt süresini kısaltır; her talebi tek akışta görünür kılar.",
    leadEn:
      "Stop losing WhatsApp, Instagram DMs, email, and web forms across tabs. Bonero Unified Inbox shortens agency response time and keeps every request in one visible stream.",
    valuePoints: [
      {
        title: "Kaçırılan mesaj = kaçırılan iş",
        body: "Okunmamış nabız ve kanal etiketleriyle öncelik netleşir; ekip aynı ekrandan yanıtlar — lead soğumadan.",
      },
      {
        title: "Müşteriye tek dil",
        body: "Farklı kanallardan gelen talepler birleşir; marka sesi ve bağlam tutarlı kalır.",
      },
      {
        title: "Ajans temposuna uygun",
        body: "Çok hesaplı operasyonlarda dağınık paneller yerine tek operasyon merkezi.",
      },
    ],
    valuePointsEn: [
      {
        title: "Missed message = missed work",
        body: "Unread pulse and channel tags clarify priority; the team replies from one screen before the lead goes cold.",
      },
      {
        title: "One voice for the client",
        body: "Requests from every channel merge so brand tone and context stay consistent.",
      },
      {
        title: "Built for agency pace",
        body: "One ops hub instead of scattered panels across many accounts.",
      },
    ],
    scenarios: [
      {
        label: "Sabah rutini",
        text: "Üç hesap, dört kanal — tek listede okunmamışlar. Öncelik net, kimse ‘ben bakmadım’ demez.",
      },
      {
        label: "Kriz anı",
        text: "Negatif DM ve mail aynı anda düşer; etiket + atama ile doğru kişiye gider.",
      },
      {
        label: "Müşteri sorusu",
        text: "‘Dün ne yazmıştı?’ geçmişi kanal fark etmeksizin tek thread’de bulunur.",
      },
    ],
    scenariosEn: [
      {
        label: "Morning routine",
        text: "Three accounts, four channels — unread in one list. Priority is clear; no “I didn’t see it.”",
      },
      {
        label: "Crisis moment",
        text: "Negative DMs and email land together; tags and assignment route the right person.",
      },
      {
        label: "Client question",
        text: "“What did they write yesterday?” — one thread, any channel.",
      },
    ],
    outcome:
      "Yanıt süresi kısalır, lead kaybı durur, ekip aynı ekranda çalışır — kanal değiştirmeden.",
    outcomeEn:
      "Faster replies, fewer lost leads, one screen for the whole team — no channel hopping.",
    metaTitle: "Gelen Kutusu — Unified Inbox",
    metaDescription:
      "WhatsApp, Instagram, e-posta ve web taleplerini tek gelen kutusunda yönetin. Ajanslar için omnichannel iletişim — kaydolun ve hemen başlayın.",
    mockCaption: "Omnichannel gelen kutusu görünümü",
    mockCaptionEn: "Omnichannel inbox view",
  },
  {
    slug: "yapay-zeka",
    homeId: "ai",
    navLabel: "Yapay Zeka",
    navLabelEn: "AI",
    title: "AI İçerik Asistanı",
    titleEn: "AI Content Assistant",
    eyebrow: "Yapay zeka",
    eyebrowEn: "Artificial intelligence",
    headline: "Marka tonunda taslak ve yanıt — dakikalar içinde.",
    headlineEn: "On-brand drafts and replies — in minutes.",
    lead: "Her müşteri için sıfırdan yazmak günü yiyor. Bonero AI, marka sesine uygun yanıt önerileri ve içerik taslakları üretir; ekibiniz onaylayıp gönderir.",
    leadEn:
      "Writing from scratch for every client burns the day. Bonero AI drafts on-brand replies and content; your team reviews and sends.",
    valuePoints: [
      {
        title: "Daha az blank page",
        body: "Yanıt önerileri ve hızlı taslaklarla ilk kelimeyi AI atar; siz kaliteyi garanti edersiniz.",
      },
      {
        title: "Marka tonu korunur",
        body: "Her marka için tutarlı dil — junior ekip bile doğru tonda başlar.",
      },
      {
        title: "Kapasite artışı",
        body: "Aynı ekiple daha fazla hesap yönetilir; creative ve destek yükü dengelenir.",
      },
    ],
    valuePointsEn: [
      {
        title: "Less blank page",
        body: "AI starts the first draft; you lock quality and tone.",
      },
      {
        title: "Brand voice stays intact",
        body: "Consistent language per brand — even junior teammates start right.",
      },
      {
        title: "More capacity",
        body: "Run more accounts with the same team; balance creative and support load.",
      },
    ],
    scenarios: [
      {
        label: "DM yanıtı",
        text: "Müşteri sorusuna 3 ton seçeneği — kibar, satış odaklı, kısa. Bir tıkla düzenle, gönder.",
      },
      {
        label: "İçerik taslağı",
        text: "Haftalık post brief’inden marka dilinde taslak; editör cilalar, onay iner.",
      },
      {
        label: "Çoklu marka",
        text: "Her hesap kendi sesiyle öneri alır; karışma riski düşer.",
      },
    ],
    scenariosEn: [
      {
        label: "DM reply",
        text: "Three tone options for a client question — polish and send.",
      },
      {
        label: "Content draft",
        text: "Weekly post brief becomes on-brand copy; editor refinishes.",
      },
      {
        label: "Multi-brand",
        text: "Each account gets its own voice — less mix-ups.",
      },
    ],
    outcome: "Yazım süresi düşer, ton tutarlı kalır, ekip kapasitesi artar.",
    outcomeEn: "Less writing time, consistent tone, more team capacity.",
    metaTitle: "Yapay Zeka — AI İçerik Asistanı",
    metaDescription:
      "Ajanslar için marka tonunda AI yanıt ve içerik taslakları. Bonero ile dakikalar içinde üretin — kaydolun ve hemen başlayın.",
    mockCaption: "AI yanıt önerisi paneli",
    mockCaptionEn: "AI reply suggestion panel",
  },
  {
    slug: "ai-reklam",
    homeId: "ads",
    navLabel: "AI Reklam",
    navLabelEn: "AI Ads",
    title: "AI Reklam Üretimi",
    titleEn: "AI Ad Generation",
    eyebrow: "AI Reklam",
    eyebrowEn: "AI Ads",
    headline: "Kampanya metni ve varyasyon — onaya hazır, dakikalar içinde.",
    headlineEn: "Campaign copy and variants — approval-ready in minutes.",
    lead: "Hook, gövde ve A/B varyasyonları manuel yazmak tempo düşürüyor. Bonero AI, hedefe ve marka tonuna göre reklam metinleri üretir; ekibiniz onaylayıp yayına alır.",
    leadEn:
      "Writing hooks, body copy, and A/B variants by hand slows the pace. Bonero AI drafts on-brand ad copy for your goal — your team reviews and ships.",
    valuePoints: [
      {
        title: "Daha hızlı kreatif döngü",
        body: "Meta / IG taslakları ve varyasyonlar aynı anda çıkar; brief’ten onaya süre kısalır.",
      },
      {
        title: "Test edilebilir seçenekler",
        body: "A/B hook’lar hazır gelir — hangi mesajın çalıştığını daha çabuk görürsünüz.",
      },
      {
        title: "Marka tonu korunur",
        body: "Her müşteri için tutarlı dil; junior ekip bile doğru tonda başlar.",
      },
    ],
    valuePointsEn: [
      {
        title: "Faster creative cycles",
        body: "Meta / IG drafts and variants land together — brief to approval shrinks.",
      },
      {
        title: "Testable options",
        body: "A/B hooks ready out of the box — learn what converts sooner.",
      },
      {
        title: "Brand voice intact",
        body: "Consistent tone per client; even junior teammates start right.",
      },
    ],
    scenarios: [
      {
        label: "Retarget",
        text: "Sepet terk hook’ları A/B/C — aynı brief’ten üç açı, onay hattına düşer.",
      },
      {
        label: "Lansman",
        text: "Yeni ürün için acil + samimi ton karışımı; Meta karakter limitine uygun.",
      },
      {
        label: "A/B haftası",
        text: "Kazanan hook’u çoğaltın; kaybedeni arşivleyin — tempo bozulmaz.",
      },
    ],
    scenariosEn: [
      {
        label: "Retarget",
        text: "Cart-abandon hooks A/B/C from one brief — into approval.",
      },
      {
        label: "Launch",
        text: "Urgent + friendly mix for a new product, Meta-length ready.",
      },
      {
        label: "A/B week",
        text: "Scale the winner, archive the rest — pace stays high.",
      },
    ],
    outcome: "Brief’ten yayına süre kısalır; test hızı artar.",
    outcomeEn: "Brief-to-live shrinks; testing speed goes up.",
    metaTitle: "AI Reklam — Kampanya & Varyasyon",
    metaDescription:
      "Ajanslar için AI reklam metni ve A/B varyasyon. Bonero ile onaya hazır kreatif üretin — kaydolun ve hemen başlayın.",
    mockCaption: "AI reklam varyasyon paneli",
    mockCaptionEn: "AI ad variation panel",
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
      "Ajans ekipleri için rol, görev ve onay hattı. Bonero ile operasyonu şeffaflaştırın — kaydolun ve hemen başlayın.",
    mockCaption: "Ekip rolleri ve onay akışı",
    mockCaptionEn: "Team roles and approval flow",
  },
  {
    slug: "raporlama",
    homeId: "analytics",
    navLabel: "Raporlama",
    navLabelEn: "Reporting",
    title: "Analitik & Raporlama",
    titleEn: "Analytics & Reporting",
    eyebrow: "Raporlama",
    eyebrowEn: "Reporting",
    headline: "Ekran görüntüsü bitsin. Rakamlar sunuma hazır gelsin.",
    headlineEn: "No more screenshots. Numbers arrive deck-ready.",
    lead: "Bonero hesap, kanal ve dönem performansını tek panelde toplar. Pazartesi sunumu, bütçe kararı veya yenileme görüşmesi — hikâye hazır, kanıt canlı.",
    leadEn:
      "Bonero consolidates account, channel, and period performance in one panel. Monday decks, budget calls, renewals — story ready, proof live.",
    valuePoints: [
      {
        title: "Sunuma hazır özet",
        body: "Canlı KPI’lar, kanal kırılımı ve dönem trendi — paylaşmaya hazır müşteri dosyası.",
      },
      {
        title: "Ölçülebilir güven",
        body: "Şeffaf rakamlar ‘ne yaptınız?’ sorusunu kapatır; yenileme görüşmeleri somutlaşır.",
      },
      {
        title: "Karar hızı",
        body: "Hangi kanal dönüştürüyor netleşir; bütçe ve efor doğru yere kayar.",
      },
    ],
    valuePointsEn: [
      {
        title: "Deck-ready summaries",
        body: "Live KPIs, channel mix, and period trends — a client dossier ready to share.",
      },
      {
        title: "Measurable trust",
        body: "Transparent numbers answer “what did you do?” — renewals get concrete.",
      },
      {
        title: "Faster decisions",
        body: "See which channel converts; move budget and effort with confidence.",
      },
    ],
    scenarios: [
      {
        label: "Pazartesi sunumu",
        text: "Hesap özeti tek ekranda; ekran görüntüsü avı yok, hikâye hazır.",
      },
      {
        label: "Bütçe kararı",
        text: "Hangi kanal dönüştürüyor net; eforu oraya kaydırırsınız.",
      },
      {
        label: "Yenileme görüşmesi",
        text: "90 günlük trend ile değer anlatılır — ‘ne yaptınız?’ cevabı hazır.",
      },
    ],
    scenariosEn: [
      {
        label: "Monday deck",
        text: "Account digest on one screen — story ready, no screenshot hunt.",
      },
      {
        label: "Budget call",
        text: "See which channel converts; move effort there.",
      },
      {
        label: "Renewal meeting",
        text: "90-day trend tells the value story — answers ready.",
      },
    ],
    outcome:
      "Sunum süresi kısalır, müşteri güveni artar, bütçe kararları hızlanır.",
    outcomeEn: "Faster decks, stronger trust, quicker budget calls.",
    metaTitle: "Raporlama — Analitik & Performans",
    metaDescription:
      "Ajanslar için canlı metrik, kanal kırılımı ve müşteri özeti. Bonero raporlama ile sunuma hazır olun — kaydolun ve hemen başlayın.",
    mockCaption: "Performans ve rapor paneli",
    mockCaptionEn: "Performance and reporting panel",
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
