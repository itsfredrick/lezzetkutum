
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Leaf, Award, Users } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center text-white text-center">
                <div className="absolute inset-0">
                    <Image src="/assets/images/lifestyle_veg_crates.jpg" alt="Taze Sebzeler" fill className="object-cover brightness-50" />
                </div>
                <div className="relative container mx-auto px-4 z-10 max-w-3xl">
                    <h1 className="text-5xl font-extrabold mb-6">İyi Yemek Herkesin Hakkı</h1>
                    <p className="text-xl opacity-90">
                        Amacımız basit: Sağlıklı, lezzetli ve ev yapımı yemekleri erişilebilir kılarak insanların hayatını kolaylaştırmak.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20">
                <div className="container mx-auto px-4 flex flex-col md:flex-row gap-16 items-center">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-bold">Hikayemiz</h2>
                        <p className="text-neutral-600 text-lg leading-relaxed">
                            LezzetKutum, 2024 yılında İstanbul'da, yoğun şehir hayatında sağlıklı beslenmenin zorluklarını bizzat yaşayan bir grup yemek tutkunu tarafından kuruldu.
                        </p>
                        <p className="text-neutral-600 text-lg leading-relaxed">
                            "Akşam ne pişirsem?" sorusunun yarattığı stresi ortadan kaldırmak ve herkesi kendi mutfağının şefi yapmak için yola çıktık. Bugün binlerce mutlu üyemizin sofrasına konuk olmanın gururunu yaşıyoruz.
                        </p>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="bg-lime-50 p-6 rounded-2xl text-center">
                            <Leaf className="w-8 h-8 mx-auto text-primary mb-3" />
                            <h3 className="font-bold text-xl mb-1">Sürdürülebilir</h3>
                            <p className="text-sm text-neutral-500">Tam ölçülü malzeme ile gıda israfına son.</p>
                        </div>
                        <div className="bg-lime-50 p-6 rounded-2xl text-center">
                            <Award className="w-8 h-8 mx-auto text-primary mb-3" />
                            <h3 className="font-bold text-xl mb-1">Yerel Üretim</h3>
                            <p className="text-sm text-neutral-500">Yerel üreticileri ve çiftçileri destekliyoruz.</p>
                        </div>
                        <div className="bg-lime-50 p-6 rounded-2xl text-center col-span-2">
                            <h3 className="text-4xl font-extrabold text-primary mb-2">50.000+</h3>
                            <p className="font-medium text-neutral-600">Teslim Edilen Kutu</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sourcing */}
            <section className="py-20 bg-neutral-50">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h2 className="text-3xl font-bold mb-12">Malzemelerimiz Nereden Geliyor?</h2>

                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                                <Image src="/assets/images/hero_flatlay_veg.jpg" alt="Sebzeler" fill className="object-cover" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Mevsiminde Sebzeler</h3>
                            <p className="text-neutral-600 text-sm">Sebzelerimizi mevsiminde, yerel üreticilerden günlük olarak temin ediyoruz.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                                <Image src="/assets/images/hero_spices.jpg" alt="Baharatlar" fill className="object-cover" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Özel Baharatlar</h3>
                            <p className="text-neutral-600 text-sm">Yemeklerimize lezzet katan baharat karışımlarını şeflerimiz özel olarak hazırlıyor.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                                <Image src="/assets/images/lifestyle_breakfast.jpg" alt="Kalite" fill className="object-cover" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Kalite Kontrol</h3>
                            <p className="text-neutral-600 text-sm">Her bir malzeme kutuya girmeden önce kalite kontrol ekibimiz tarafından incelenir.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footprint */}
            <section className="py-20 text-center">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-3xl font-bold mb-4">Hizmet Bölgelerimiz</h2>
                    <p className="text-lg text-neutral-600 mb-8">
                        Şu anda İstanbul'un tüm ilçelerine (Adalar hariç), Ankara ve İzmir merkez ilçelerine hizmet veriyoruz.
                        Yakında tüm Türkiye'de olacağız!
                    </p>
                    <Button variant="outline" asChild>
                        <Link href="/faq">Sıkça Sorulan Sorular</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
