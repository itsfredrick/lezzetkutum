
import LegalLayout from "@/components/layout/LegalLayout";

export default function CookiesPage() {
    return (
        <LegalLayout title="Çerez Politikası">
            <p>Web sitemizden en verimli şekilde faydalanabilmeniz ve kullanıcı deneyiminizi geliştirebilmek için çerezler kullanıyoruz.</p>

            <h2>1. Çerez Nedir?</h2>
            <p>Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınız aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır.</p>

            <h2>2. Kullandığımız Çerezler</h2>
            <ul>
                <li><strong>Zorunlu Çerezler:</strong> Sitenin çalışması için gereklidir (Oturum, sepet işlemleri).</li>
                <li><strong>Analitik Çerezler:</strong> Site trafiğini analiz etmemizi sağlar.</li>
            </ul>

            <p><em>(Bu metin bir örnektir.)</em></p>
        </LegalLayout>
    )
}
