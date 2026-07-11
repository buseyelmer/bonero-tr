import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Bonero KVKK aydınlatma metni. Kişisel verilerin işlenmesi, saklanması, aktarımı ve haklarınız hakkında bilgilendirme.",
  alternates: { canonical: "/kvkk" },
};

const sections = [
  {
    title: "1. Veri Sorumlusu",
    paragraphs: [
      "6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri sorumlusu Bonero’dur. İletişim: hello@bonero.tr — İstanbul, Türkiye.",
    ],
  },
  {
    title: "2. İşlenen Kişisel Veriler",
    paragraphs: [
      "Hizmet kapsamında aşağıdaki kategorilerde veriler işlenebilir:",
    ],
    bullets: [
      "Kimlik ve iletişim: ad-soyad, e-posta, telefon, şirket / ajans unvanı",
      "Hesap ve kullanım: oturum, rol, tercih, destek kayıtları",
      "İletişim içeriği: bağladığınız kanallardan gelen mesajlar (müşteri verisi)",
      "Teknik veriler: IP, tarayıcı, cihaz, log ve güvenlik kayıtları",
      "Fatura bilgileri: fatura unvanı, vergi bilgisi, ödeme referansları",
    ],
  },
  {
    title: "3. İşleme Amaçları",
    paragraphs: [
      "Kişisel veriler şu amaçlarla işlenir:",
    ],
    bullets: [
      "Hesap oluşturma, kimlik doğrulama ve hizmet sunumu",
      "Omnichannel gelen kutusu, ekip yönetimi ve raporlama",
      "Destek, güvenlik, dolandırıcılık önleme ve sistem iyileştirme",
      "Sözleşme, faturalama ve yasal yükümlülüklerin yerine getirilmesi",
      "Açık rızanız varsa ürün duyuruları ve pazarlama iletişimi",
    ],
  },
  {
    title: "4. Hukuki Sebepler",
    paragraphs: [
      "İşleme; KVKK m.5 ve m.6 çerçevesinde sözleşmenin kurulması/ifası, hukuki yükümlülük, meşru menfaat ve gerektiğinde açık rıza hukuki sebeplerine dayanır.",
    ],
  },
  {
    title: "5. Aktarım ve Barındırma",
    paragraphs: [
      "Veriler; bulut altyapısı (ör. AWS), ödeme, e-posta ve analitik hizmet sağlayıcılarıyla, yalnızca hizmetin sunumu için gerekli ölçüde ve uygun güvencelerle paylaşılabilir.",
      "Yurt dışına aktarım söz konusu olduğunda KVKK’nın öngördüğü şartlara (açık rıza, taahhütname vb.) uyulur.",
    ],
  },
  {
    title: "6. Saklama Süresi",
    paragraphs: [
      "Veriler, işleme amacının gerektirdiği süre ve ilgili mevzuattaki zamanaşımı / saklama yükümlülükleri boyunca tutulur. Süre bitiminde silinir, yok edilir veya anonimleştirilir.",
    ],
  },
  {
    title: "7. Güvenlik",
    paragraphs: [
      "256-bit AES şifreleme, SSL/TLS, erişim kontrolü, düzenli güvenlik gözden geçirmeleri ve rol bazlı yetkilendirme gibi teknik ve idari tedbirler uygulanır.",
    ],
  },
  {
    title: "8. KVKK Kapsamındaki Haklarınız",
    paragraphs: [
      "KVKK m.11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içi/yurt dışı aktarılan üçüncü kişileri bilme, düzeltme, silme/yok etme, itiraz ve zararın giderilmesini talep etme haklarına sahipsiniz.",
      "Başvurularınızı hello@bonero.tr adresine iletebilirsiniz. Talepler, KVKK’da öngörülen sürelerde yanıtlanır.",
    ],
  },
  {
    title: "9. Çerezler",
    paragraphs: [
      "Sitede oturum, güvenlik ve (onayınızla) analitik çerezler kullanılabilir. Tarayıcı ayarlarından çerezleri yönetebilirsiniz; zorunlu çerezlerin kapatılması bazı işlevleri engelleyebilir.",
    ],
  },
];

export default function KvkkPage() {
  return (
    <LegalPageShell
      eyebrow="Yasal"
      title="KVKK Aydınlatma Metni"
      updated="Son güncelleme: 11 Temmuz 2026"
      intro="Bu metin, Bonero olarak kişisel verilerinizi hangi amaçlarla ve nasıl işlediğimizi; haklarınızı nasıl kullanabileceğinizi açıklar."
      sections={sections}
    />
  );
}
