
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Clock, Truck, ChefHat, Calendar, Package } from "lucide-react";

export default function HowItWorksPage() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="py-16 md:py-24 bg-lime-50 text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-6">
                        3 Adımda <span className="text-primary">Şef Sizsiniz</span>
                    </h1>
                    <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                        Alışveriş derdi yok, tarif aramak yok. Sadece yemek pişirmenin keyfi var.
                    </p>
                    <Button size="lg" className="h-14 px-8 text-lg rounded-xl" asChild>
                        <Link href="/select-plan">Hemen Başla</Link>
                    </Button>
                </div>
            </section>

            {/* Steps Details */}
            <section className="py-20">
                <div className="container mx-auto px-4 space-y-24">
                    {/* Step 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 order-2 md:order-1">
                            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-neutral-200">
                                <Image src="/assets/images/placeholder_recipe_select_1.jpg" alt="Seçim Ekranı" fill className="object-cover" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-6 order-1 md:order-2">
                            <div className="w-16 h-16 bg-lime-100 text-lime-700 rounded-full flex items-center justify-center text-3xl font-bold">1</div>
                            <h2 className="text-3xl font-bold">Menünü Oluştur</h2>
                            <p className="text-lg text-neutral-600 leading-relaxed">
                                Her hafta yenilenen 20+ tarif arasından damak tadına uygun olanları seç.
                                İster klasik lezzetler, ister dünya mutfağı, ister form dostu seçenekler.
                                Hangi hafta kaç kişi yiyeceğinize siz karar verin.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3"><CheckCircle className="text-primary w-5 h-5" /> Her hafta yeni tarifler</li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-primary w-5 h-5" /> Kişi sayısını dilediğin gibi ayarla</li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <div className="w-16 h-16 bg-lime-100 text-lime-700 rounded-full flex items-center justify-center text-3xl font-bold">2</div>
                            <h2 className="text-3xl font-bold">Kutun Kapına Gelsin</h2>
                            <p className="text-lg text-neutral-600 leading-relaxed">
                                Malzemeleri sizin için en taze haliyle tedarik ediyoruz. Soğuk zincir kırılmadan,
                                özel yalıtımlı geri dönüştürülebilir kutumuzla seçtiğiniz gün ve saatte kapınıza teslim ediyoruz.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3"><Truck className="text-primary w-5 h-5" /> Ücretsiz kargo imkanı</li>
                                <li className="flex items-center gap-3"><Clock className="text-primary w-5 h-5" /> Size uygun zaman aralığı</li>
                            </ul>
                        </div>
                        <div className="flex-1">
                            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-neutral-200">
                                <Image src="/assets/images/hero_veg_box.jpg" alt="Lezzet Kutusu" fill className="object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 order-2 md:order-1">
                            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-neutral-200">
                                <Image src="/assets/images/hero_cooking_flatlay.jpg" alt="Yemek Pişirme" fill className="object-cover" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-6 order-1 md:order-2">
                            <div className="w-16 h-16 bg-lime-100 text-lime-700 rounded-full flex items-center justify-center text-3xl font-bold">3</div>
                            <h2 className="text-3xl font-bold">Keyifle Pişir</h2>
                            <p className="text-lg text-neutral-600 leading-relaxed">
                                Malzemeler tam ölçüsünde geldiği için israf yok, tartmak yok. Adım adım resimli tarif kartlarımızla
                                restoran kalitesinde yemekleri 30 dakikada hazırlayın.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3"><ChefHat className="text-primary w-5 h-5" /> Şef onaylı pratik tarifler</li>
                                <li className="flex items-center gap-3"><Clock className="text-primary w-5 h-5" /> Ortalama 30 dakika hazırlık süresi</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* What is inside */}
            <section className="py-20 bg-neutral-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Kutunun İçinde Neler Var?</h2>

                    <div className="grid md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
                        <div className="bg-neutral-800 p-8 rounded-2xl">
                            <Package className="w-10 h-10 text-primary mb-4" />
                            <h3 className="text-xl font-bold mb-3">Taze Malzemeler</h3>
                            <p className="text-neutral-400">Halden değil, tarladan sofranıza uzanan tedarik zinciri ile en taze sebzeler.</p>
                        </div>
                        <div className="bg-neutral-800 p-8 rounded-2xl">
                            <ChefHat className="w-10 h-10 text-primary mb-4" />
                            <h3 className="text-xl font-bold mb-3">Tarif Kartları</h3>
                            <p className="text-neutral-400">Adım adım fotoğraflanmış, takip etmesi kolay ve koleksiyon yapılabilir tarif kartları.</p>
                        </div>
                        <div className="bg-neutral-800 p-8 rounded-2xl">
                            <Truck className="w-10 h-10 text-primary mb-4" />
                            <h3 className="text-xl font-bold mb-3">Soğutucu Buz Aküleri</h3>
                            <p className="text-neutral-400">Et ve süt ürünleriniz teslimat anına kadar ilk günkü tazeliğini korusun diye.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cutoff Timeline */}
            <section className="py-20 bg-lime-50/50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Sipariş Takvimi</h2>

                    <div className="relative">
                        {/* Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-neutral-200 -translate-y-1/2 z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            <TimelineItem
                                day="Perşembe"
                                time="23:59"
                                title="Son Sipariş"
                                desc="Haftalık menü seçimini tamamlaman gereken son an."
                                active
                            />
                            <TimelineItem
                                day="Cuma - Pazar"
                                title="Hazırlık"
                                desc="Şeflerimiz ve ekibimiz en taze malzemeleri senin için hazırlar."
                            />
                            <TimelineItem
                                day="Pazartesi"
                                title="Teslimat"
                                desc="Kutun seçtiğin saat aralığında kapına gelir."
                            />
                            <TimelineItem
                                day="Hafta Boyu"
                                title="Pişir & Ye"
                                desc="Taze yemeklerin tadını çıkar."
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6">Mutfakta Harikalar Yaratmaya Hazır Mısın?</h2>
                    <Button size="lg" className="h-16 px-12 text-xl rounded-full" asChild>
                        <Link href="/select-plan">Planını Şimdi Oluştur</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}

function TimelineItem({ day, time, title, desc, active }: { day: string, time: string, title: string, desc: string, active?: boolean }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 flex flex-col items-center text-center">
            <div className={`w-4 h-4 rounded-full mb-4 border-2 ${active ? 'bg-primary border-primary' : 'bg-white border-neutral-300'}`} />
            <span className="text-sm font-bold text-primary mb-1 block">{day} {time && <span className="text-neutral-400 font-normal">| {time}</span>}</span>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-sm text-neutral-500">{desc}</p>
        </div>
    )
}
