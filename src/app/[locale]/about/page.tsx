import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Leaf, Truck, Recycle, Clock, MapPin, Target, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16 lg:py-24">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <span className="text-lime-600 font-bold tracking-wider text-sm uppercase">LezzetKutum Hakkında</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 leading-tight">
                            LezzetKutum'a Hoş Geldiniz
                        </h1>
                        <p className="text-xl text-neutral-600 leading-relaxed">
                            Sofranıza gelen tazelik, doğallık ve mutluluk. Türkiye'nin en sevilen yemek kiti ile tanışın.
                        </p>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-orange-100">
                            {/* Illustration placeholder */}
                            <img src="/assets/images/placeholder_recipe_select_2.jpg" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Hikayemiz */}
            <div className="bg-neutral-50 py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-8">Hikayemiz</h2>
                    <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                        <p className="font-medium text-neutral-900">
                            LezzetKutum, 2019 yılında basit bir sorudan doğdu: "Bugün ne pişirsem?"
                        </p>
                        <p>
                            Bu soruyu ortadan kaldırmak ve herkesin evinde şef gibi hissetmesini sağlamak amacıyla yola çıktık. Şehir hayatının koşuşturmacası içinde sağlıklı, taze ve lezzetli yemekler pişirmenin ne kadar zor olabileceğini biliyorduk. Market alışverişi, malzeme israfı ve tarif arama derdini bitirmek istedik.
                        </p>
                        <p>
                            Türkiye'nin bereketli topraklarından gelen en taze malzemeleri, şeflerimizin hazırladığı pratik ve lezzetli tariflerle birleştirerek kapınıza getiriyoruz. Bugün, binlerce mutfakta pişen yemeklerin bir parçası olmanın gururunu yaşıyoruz.
                        </p>
                    </div>
                </div>
            </div>

            {/* Değerlerimiz */}
            <div className="container mx-auto px-4 py-24">
                <h2 className="text-3xl font-bold mb-12">Değerlerimiz</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-neutral-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center text-lime-600 mb-6">
                            <Leaf className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Tazelik Garantisi</h3>
                        <p className="text-neutral-600">Malzemelerimiz tarlalardan toplandıktan sonra en kısa sürede kutunuza girer. Dondurulmuş değil, mevsiminde ve tazedir.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-neutral-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                            <Truck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Yerel Üretim</h3>
                        <p className="text-neutral-600">Türkiye'nin dört bir yanındaki yerel üreticileri destekliyoruz. İthal ürün yerine yerli mahsulleri tercih ediyoruz.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-neutral-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                            <Recycle className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Sıfır Atık</h3>
                        <p className="text-neutral-600">Porsiyonlanmış malzemeler göndererek gıda israfını önlüyoruz. Sadece ihtiyacınız kadarını kullanırsınız.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-neutral-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Zaman Tasarrufu</h3>
                        <p className="text-neutral-600">Alışverişe ve planlamaya harcanan saatleri size geri veriyoruz. 30 dakikada şef tabağı hazır.</p>
                    </div>
                </div>
            </div>

            {/* Yerel Çiftçiler Section */}
            <div className="container mx-auto px-4 mb-24">
                <div className="bg-[#f0fdf4] rounded-[3rem] overflow-hidden flex flex-col lg:flex-row">
                    <div className="flex-1 p-12 lg:p-24 flex flex-col justify-center space-y-8">
                        <div className="flex items-center gap-2 text-lime-700 font-bold text-sm tracking-widest uppercase">
                            <MapPin className="w-4 h-4" /> Türkiye Geneli
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 leading-tight">
                            Yerel Çiftçilerimizle Omuz Omuza
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            LezzetKutum ailesi olarak, sadece müşterilerimize değil, toprağımıza da sorumlu olduğumuza inanıyoruz. Antalya'nın domatesinden, Malatya'nın kayısısına, Ege'nin zeytinyağına kadar en iyi mahsulleri kaynağından alıyoruz.
                        </p>
                        <p className="text-neutral-600">
                            Her kutuda, o ürünü yetiştiren çiftçinin emeği ve hikayesi var.
                        </p>
                        <Button variant="link" className="text-lime-600 font-bold p-0 h-auto justify-start text-lg">
                            Tedarikçilerimizi İnceleyin &rarr;
                        </Button>
                    </div>
                    <div className="flex-1 h-[400px] lg:h-auto relative">
                        <img src="/assets/images/placeholder_recipe_select_1.jpg" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Sürdürülebilirlik Gallery */}
            <div className="container mx-auto px-4 mb-24">
                <h2 className="text-3xl font-bold mb-4">Gelecek İçin Sürdürülebilirlik</h2>
                <p className="text-neutral-600 max-w-2xl mb-12">
                    Paketlemelerimizde geri dönüştürülebilir malzemeler kullanıyor, karbon ayak izimizi azaltmak için lojistik ağımızı sürekli optimize ediyoruz.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="aspect-square rounded-3xl overflow-hidden relative group">
                        <img src="/assets/images/placeholder_recipe_select_1.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-white font-bold text-lg">Geri Dönüşüm</h3>
                        </div>
                    </div>
                    <div className="aspect-square rounded-3xl overflow-hidden relative group">
                        <img src="/assets/images/placeholder_recipe_select_2.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-white font-bold text-lg">Yeşil Lojistik</h3>
                        </div>
                    </div>
                    <div className="aspect-square rounded-3xl overflow-hidden relative group">
                        <img src="/assets/images/placeholder_recipe_select_1.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-white font-bold text-lg">Karbon Nötr</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="container mx-auto px-4 mb-24">
                <div className="bg-[#1a2e1a] rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            Mutfağınızda Devrim Yaratmaya Hazır Mısınız?
                        </h2>
                        <p className="text-white/70 text-lg">
                            Haftalık planınızı seçin, malzemeleri kapınıza getirelim. LezzetKutum ailesine bugün katılın.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="h-14 px-8 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-xl text-lg">
                                Planları İncele
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 bg-transparent text-white border-white/20 hover:bg-white/10 font-bold rounded-xl text-lg">
                                Menüye Göz At
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
