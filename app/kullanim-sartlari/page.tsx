import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description:
    "Bonero platformunun kullanım şartları. Hizmet koşulları, hesap sorumlulukları ve kabul edilebilir kullanım politikası.",
  alternates: { canonical: "/kullanim-sartlari" },
};

const sections = [
  {
    title: "1. Taraflar ve Kabul",
    paragraphs: [
      "Bu Kullanım Şartları (“Şartlar”), Bonero tarafından sunulan omnichannel AI iletişim platformu ve ilgili hizmetlerin (“Hizmet”) kullanımını düzenler. Hizmete erişerek veya hesap oluşturarak bu Şartları okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz.",
      "Hizmeti bir şirket adına kullanıyorsanız, ilgili kuruluşu bu Şartlarla bağlamaya yetkili olduğunuzu kabul edersiniz.",
    ],
  },
  {
    title: "2. Hizmetin Tanımı",
    paragraphs: [
      "Bonero; Instagram, WhatsApp, e-posta ve benzeri kanalları tek panelde birleştiren, yapay zeka destekli gelen kutusu, ekip yönetimi ve raporlama araçları sunan bir SaaS platformudur.",
      "Özellikler, paket kapsamına ve teknik güncellemelere göre değişebilir. Önemli değişiklikler makul süre içinde duyurulur.",
    ],
  },
  {
    title: "3. Hesap ve Güvenlik",
    paragraphs: [
      "Hesap bilgilerinizin gizliliğinden siz sorumlusunuz. Yetkisiz erişimi fark ettiğinizde derhal bize bildirmelisiniz.",
    ],
    bullets: [
      "Doğru ve güncel hesap bilgisi sağlamak",
      "Ekip üyelerinizin erişim yetkilerini yönetmek",
      "Bağladığınız üçüncü taraf hesapların kullanım şartlarına uymak",
    ],
  },
  {
    title: "4. Kabul Edilebilir Kullanım",
    paragraphs: [
      "Hizmeti yasalara, üçüncü taraf platform kurallarına ve müşteri sözleşmelerinize uygun kullanmalısınız.",
    ],
    bullets: [
      "Spam, phishing veya yanıltıcı iletişim için kullanmamak",
      "Başkalarının verilerine izinsiz erişmemek",
      "Sistemi tersine mühendislik veya aşırı yükleme ile bozmamak",
      "Yasadışı içerik veya faaliyetleri kolaylaştırmamak",
    ],
  },
  {
    title: "5. Abonelik, Ücretler ve İptal",
    paragraphs: [
      "Ücretli paketlerde faturalama dönemi, fiyat ve özellikler sipariş / paket sayfasında belirtilir. Ödeme yapılmaması hizmetin askıya alınmasına yol açabilir.",
      "İptal talepleri bir sonraki faturalama döneminden itibaren geçerli olur; aksi sözleşmede belirtilmedikçe kısmi iade yapılmaz.",
    ],
  },
  {
    title: "6. Fikri Mülkiyet",
    paragraphs: [
      "Bonero yazılımı, markası, arayüzü ve dokümantasyonu Bonero’ya aittir. Size yalnızca Hizmeti kullanmak için sınırlı, devredilemez bir lisans verilir.",
      "Platforma yüklediğiniz veya bağladığınız müşteri içerikleri size (veya müşterilerinize) aittir; Hizmeti sunmak için gerekli işlemeye izin verirsiniz.",
    ],
  },
  {
    title: "7. Sorumluluk Sınırı",
    paragraphs: [
      "Hizmet “olduğu gibi” sunulur. Üçüncü taraf kanalların (Meta, WhatsApp, e-posta sağlayıcıları vb.) kesintileri, API değişiklikleri veya politikaları Bonero’nun kontrolü dışındadır.",
      "Yasal olarak izin verilen azami ölçüde Bonero’nun toplam sorumluluğu, son 12 ayda ilgili hesap için ödenen ücretlerle sınırlıdır.",
    ],
  },
  {
    title: "8. Fesih",
    paragraphs: [
      "Şartları ihlal etmeniz halinde hesabınız askıya alınabilir veya sonlandırılabilir. Fesih sonrası verilerinizin silinmesi veya dışa aktarımı için makul bir süre tanınır; ayrıntılar KVKK metninde yer alır.",
    ],
  },
  {
    title: "9. Uygulanacak Hukuk",
    paragraphs: [
      "Bu Şartlar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda İstanbul mahkemeleri ve icra daireleri yetkilidir.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPageShell
      eyebrow="Yasal"
      title="Kullanım Şartları"
      updated="Son güncelleme: 11 Temmuz 2026"
      intro="Bonero’yu kullanmadan önce lütfen bu şartları dikkatle okuyun. Platformu kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız."
      sections={sections}
    />
  );
}
