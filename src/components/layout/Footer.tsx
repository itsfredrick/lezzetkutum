export function Footer() {
    return (
        <footer className="bg-white border-t pt-16 pb-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* Brand Column */}
                <div className="space-y-4">
                    <h3 className="font-bold text-2xl tracking-tight text-primary">LezzetKutum</h3>
                    <p className="text-neutral-500 leading-relaxed">
                        Taze malzemeler, şef onaylı tarifler ve sıfır atık felsefesiyle mutfakta hayatınızı kolaylaştırıyoruz.
                    </p>
                </div>

                {/* Company Links */}
                <div>
                    <h4 className="font-bold text-neutral-900 mb-6">Kurumsal</h4>
                    <ul className="space-y-4 text-neutral-600">
                        <li><a href="/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</a></li>
                        <li><a href="/nasil-calisir" className="hover:text-primary transition-colors">Nasıl Çalışır?</a></li>
                        <li><a href="/tarifler" className="hover:text-primary transition-colors">Tarifler</a></li>
                        <li><a href="/sss" className="hover:text-primary transition-colors">Sıkça Sorulan Sorular</a></li>
                    </ul>
                </div>

                {/* Legal Links */}
                <div>
                    <h4 className="font-bold text-neutral-900 mb-6">Yasal</h4>
                    <ul className="space-y-4 text-neutral-600">
                        <li><a href="/yasal/kullanim-kosullari" className="hover:text-primary transition-colors">Kullanım Koşulları</a></li>
                        <li><a href="/yasal/gizlilik" className="hover:text-primary transition-colors">Gizlilik Politikası</a></li>
                        <li><a href="/yasal/cerezler" className="hover:text-primary transition-colors">Çerez Politikası</a></li>
                        <li><a href="/yasal/mesafeli-satis" className="hover:text-primary transition-colors">Mesafeli Satış Sözleşmesi</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-bold text-neutral-900 mb-6">Bültenimize Abone Olun</h4>
                    <p className="text-neutral-500 mb-4 text-sm">Haftalık yeni tarifler ve sürpriz indirimler için.</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="E-posta adresiniz"
                            className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                            Kayıt
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-8 border-t border-neutral-100 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
                <p>&copy; 2024 LezzetKutum. Tüm hakları saklıdır.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <span className="hover:text-neutral-600 cursor-pointer">Instagram</span>
                    <span className="hover:text-neutral-600 cursor-pointer">Twitter</span>
                    <span className="hover:text-neutral-600 cursor-pointer">Facebook</span>
                </div>
            </div>
        </footer>
    );
}
