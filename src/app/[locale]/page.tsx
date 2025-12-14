import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat, Leaf, Star, CheckCircle } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Index');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-neutral-50 py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 z-10">
            <Badge variant="outline" className="px-4 py-1 border-primary/20 text-primary bg-primary/5 rounded-full text-sm font-medium">
              Türkiye'nin 1 Numaralı Yemek Kutusu
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.1]">
              Akşam Yemeği Derdine Son. <span className="text-primary">Taze Malzemeler</span> Kapında.
            </h1>
            <p className="text-lg text-neutral-600 max-w-xl">
              Haftalık değişen menüler, tam ölçülü taze malzemeler ve şef onaylı adım adım tariflerle mutfakta harikalar yaratın.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-lg shadow-primary/20" asChild>
                <Link href="/select-plan">Planını Seç</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-neutral-300" asChild>
                <Link href="/menu">Menüyü İncele</Link>
              </Button>
            </div>

            <p className="text-sm text-neutral-500 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" /> Esnek haftalar. İstediğin zaman iptal et.
            </p>
          </div>

          <div className="flex-1 relative">
            {/* Placeholder for Hero Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-neutral-200">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
              <img src="/assets/images/placeholder_recipe_1.jpg" alt="Lezzetli Yemekler" className="object-cover w-full h-full" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">4.9/5 Puan</p>
                  <p className="text-xs text-neutral-500">Binlerce mutlu müşteri</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Nasıl Çalışır?</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">LezzetKutum ile yemek pişirmek hiç bu kadar kolay olmamıştı. Sadece 3 adımda mutfaktasın.</p>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-2xl mb-4">
                {step}
              </div>
              <h3 className="text-xl font-bold">
                {step === 1 ? 'Tarifini Seç' : step === 2 ? 'Kutunu Teslim Al' : 'Keyifle Pişir'}
              </h3>
              <p className="text-neutral-500">
                {step === 1
                  ? 'Her hafta yenilenen 20+ leziz tarif arasından damak tadına uygun olanları seç.'
                  : step === 2
                    ? 'Taze malzemeler tam ölçüsünde, özel yalıtımlı kutunla soğuk zincir bozulmadan kapına gelsin.'
                    : 'Adım adım resimli tarif kartlarıyla 30 dakikada restoran kalitesinde harika yemekler hazırla.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Menu Preview */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Bu Haftanın Menüsü</h2>
              <p className="text-neutral-600">Şeflerimizin bu hafta için hazırladığı favori lezzetler</p>
            </div>
            <Button variant="link" className="text-primary font-bold hidden sm:flex" asChild>
              <Link href="/menu">Tüm Menüyü Gör &rarr;</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Simplified Recipe Cards */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-md">
                <div className="aspect-[16/10] bg-neutral-200 relative">
                  <img src={`/assets/images/placeholder_recipe_${i}.jpg`} alt="Tarif" className="object-cover w-full h-full" />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-neutral-900 border-none shadow-sm font-medium px-2">
                    <Clock className="w-3 h-3 mr-1" /> 30 dk
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-primary uppercase tracking-wider">
                    <ChefHat className="w-4 h-4" /> İmza Tabak
                  </div>
                  <h3 className="font-bold text-lg mb-2">Izgara Tavuk ve Kök Sebzeler</h3>
                  <p className="text-sm text-neutral-500 line-clamp-2">Ballı hardal soslu ızgara tavuk, fırınlanmış havuç ve kabak eşliğinde.</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="link" className="text-primary font-bold" asChild>
              <Link href="/menu">Tüm Menüyü Gör &rarr;</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Sıkça Sorulan Sorular</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>LezzetKutum'un diğerlerinden farkı nedir?</AccordionTrigger>
              <AccordionContent>
                LezzetKutum, sadece tarif vermekle kalmaz, o tarifi yapmanız için gereken tüm malzemeleri taze ve tam ölçüsünde kapınıza getirir. Böylece alışveriş derdinden kurtulur ve gıda israfını önlarsınız.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Aboneliğimi istediğim zaman iptal edebilir miyim?</AccordionTrigger>
              <AccordionContent>
                Evet, LezzetKutum aboneliğinizi hiçbir taahhüt olmadan dilediğiniz zaman durdurabilir veya iptal edebilirsiniz.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Haftalık menüleri kim hazırlıyor?</AccordionTrigger>
              <AccordionContent>
                Tariflerimiz, ödüllü şefler ve beslenme uzmanları tarafından mevsimin en taze ürünleri kullanılarak özenle hazırlanmaktadır.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Mutfakta Harikalar Yaratmaya Hazır mısın?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">İlk kutunda %30 indirim fırsatını kaçırma.</p>
          <Button size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full font-bold bg-white text-primary hover:bg-neutral-100" asChild>
            <Link href="/select-plan">Hemen Başla</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
