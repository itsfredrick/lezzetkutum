
import LegalLayout from "@/components/layout/LegalLayout";

export default function DistanceSalesPage() {
    return (
        <LegalLayout title="Mesafeli Satış Sözleşmesi Ön Bilgilendirme Formu">
            <h2>1. Satıcı Bilgileri</h2>
            <p>Unvan: LezzetKutum Gıda A.Ş.<br />
                Adres: Levent Mah. Örnek Cad. İstanbul<br />
                Telefon: 0850 123 45 67</p>

            <h2>2. Konu</h2>
            <p>İşbu formun konusu, Alıcı'nın Satıcı'ya ait web sitesinden elektronik ortamda siparişini verdiği ürünlerin satışı ve teslimi ile ilgilidir.</p>

            <h2>3. Cayma Hakkı</h2>
            <p>Gıda maddeleri ve çabuk bozulabilen ürünler söz konusu olduğundan, teslim alınan ürünlerde ambalaj açıldıktan sonra cayma hakkı kullanılamaz. (Yönetmelik gereği).</p>

            <p><em>(Bu metin bir örnektir.)</em></p>
        </LegalLayout>
    )
}
