export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-4xl font-extrabold mb-8">Kullanım Koşulları</h1>
            <div className="prose prose-lg prose-lime">
                <p>Son Güncelleme: 14 Aralık 2025</p>
                <p>LezzetKutum'a hoş geldiniz. Bu siteyi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız...</p>
                {/* Content truncated for brevity */}
                <h3>1. Hizmetin Kapsamı</h3>
                <p>LezzetKutum, haftalık yemek planları ve malzeme kitleri sunan bir abonelik hizmetidir.</p>
                <h3>2. Üyelik ve İptal</h3>
                <p>Üyeliğinizi dilediğiniz zaman hesap ayarlarınızdan iptal edebilirsiniz.</p>
            </div>
        </div>
    );
}
