import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  CalendarCheck,
  FileText,
  LayoutDashboard,
  Mail,
  Megaphone,
  Users,
  UsersRound,
} from "lucide-react";
import { featureHref, type FeatureSlug } from "@/lib/features";

export type FeatureNavItem = {
  id: string;
  label: string;
  labelEn: string;
  description: string;
  descriptionEn: string;
  href: string;
  icon: LucideIcon;
  /** Existing detail page slug, if any */
  slug?: FeatureSlug;
};

export type FeatureNavGroup = {
  id: string;
  title: string;
  titleEn: string;
  items: FeatureNavItem[];
};

/** Header mega-menu: tüm özellik detay sayfalarına gider. */
export const FEATURE_NAV_GROUPS: FeatureNavGroup[] = [
  {
    id: "kanallar",
    title: "Kanallar",
    titleEn: "Channels",
    items: [
      {
        id: "omnichannel",
        slug: "gelen-kutusu",
        label: "Omnichannel",
        labelEn: "Omnichannel",
        description: "WhatsApp, IG, e-posta, web — tek inbox",
        descriptionEn: "WhatsApp, IG, email, web — one inbox",
        href: featureHref("gelen-kutusu"),
        icon: LayoutDashboard,
      },
      {
        id: "email-marketing",
        slug: "email-marketing",
        label: "Email Marketing",
        labelEn: "Email Marketing",
        description: "Kampanya, segment ve otomasyon",
        descriptionEn: "Campaigns, segments, automation",
        href: featureHref("email-marketing"),
        icon: Mail,
      },
    ],
  },
  {
    id: "yapay-zeka",
    title: "Yapay Zeka",
    titleEn: "AI",
    items: [
      {
        id: "ai-agent",
        slug: "yapay-zeka",
        label: "AI Agent",
        labelEn: "AI Agent",
        description: "7/24 akıllı yanıt ve yönlendirme",
        descriptionEn: "24/7 smart replies and routing",
        href: featureHref("yapay-zeka"),
        icon: Bot,
      },
      {
        id: "ai-reklam",
        slug: "ai-reklam",
        label: "AI Reklam Yönetimi",
        labelEn: "AI Ad Management",
        description: "Meta, Google, TikTok — tek panel",
        descriptionEn: "Meta, Google, TikTok — one panel",
        href: featureHref("ai-reklam"),
        icon: Megaphone,
      },
    ],
  },
  {
    id: "isletme",
    title: "İşletme",
    titleEn: "Business",
    items: [
      {
        id: "crm",
        slug: "crm",
        label: "CRM",
        labelEn: "CRM",
        description: "Müşteri ve lead pipeline",
        descriptionEn: "Customer and lead pipeline",
        href: featureHref("crm"),
        icon: UsersRound,
      },
      {
        id: "isbirligi",
        slug: "isbirligi",
        label: "İşbirliği",
        labelEn: "Collaboration",
        description: "Rol, görev ve onay hattı",
        descriptionEn: "Roles, tasks, and approval flow",
        href: featureHref("isbirligi"),
        icon: Users,
      },
      {
        id: "randevu",
        slug: "randevu",
        label: "Randevu & Toplantı",
        labelEn: "Appointments & Meetings",
        description: "Takvim ve takip tek yerde",
        descriptionEn: "Calendar and tracking in one place",
        href: featureHref("randevu"),
        icon: CalendarCheck,
      },
      {
        id: "icerik",
        slug: "icerik",
        label: "İçerik Yönetimi",
        labelEn: "Content Management",
        description: "İçerik planı ve yayın akışı",
        descriptionEn: "Content plan and publish flow",
        href: featureHref("icerik"),
        icon: FileText,
      },
      {
        id: "raporlama",
        slug: "raporlama",
        label: "Raporlama",
        labelEn: "Reporting",
        description: "Canlı metrik ve performans",
        descriptionEn: "Live metrics and performance",
        href: featureHref("raporlama"),
        icon: BarChart3,
      },
    ],
  },
];

export const FEATURE_NAV_ITEMS = FEATURE_NAV_GROUPS.flatMap((g) => g.items);
