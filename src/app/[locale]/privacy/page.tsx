export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-4xl font-extrabold mb-8">Gizlilik Politikası</h1>
            <div className="prose prose-lg prose-lime">
                <p>Son Güncelleme: 14 Aralık 2025</p>
                <p>LezzetKutum olarak kişisel verilerinizin güvenliğine önem veriyoruz...</p>
                {/* Content truncated for brevity */}
                <h3>1. Toplanan Veriler</h3>
                <p>Hizmetimizi kullanırken size daha iyi bir deneyim sunmak için bazı verileri topluyoruz.</p>
                <h3>2. Verilerin Kullanımı</h3>
                <p>Topladığımız verileri siparişlerinizi işlemek ve size özel öneriler sunmak için kullanırız.</p>
            </div>
        </div>
    );
}
