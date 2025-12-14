
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail } from "lucide-react";
import Link from 'next/link';

export default function FAQPage() {
    return (
        <div className="bg-white min-h-screen">
            <section className="bg-lime-900 text-white py-20 text-center">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h1 className="text-4xl font-bold mb-6">Nasıl yardımcı olabiliriz?</h1>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <Input
                            placeholder="Bir soru arayın (örn. teslimat, ödeme)"
                            className="h-14 pl-12 text-black rounded-xl border-0 shadow-lg"
                        />
                    </div>
                </div>
            </section>

            <section className="py-16 container mx-auto px-4 max-w-3xl">
                <div className="space-y-12">

                    {/* Category: General */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-lime-800">Genel & Abonelik</h2>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="gen-1">
                                <AccordionTrigger>LezzetKutum nedir?</AccordionTrigger>
                                <AccordionContent>
                                    LezzetKutum, şef onaylı tarifleri ve bu tarifler için gereken taze malzemeleri tam ölçüsünde kapınıza getiren bir yemek kiti servisidir.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="gen-2">
                                <AccordionTrigger>Taahhüt vermem gerekiyor mu?</AccordionTrigger>
                                <AccordionContent>
                                    Hayır. Abonelik sistemiyle çalışıyoruz ancak herhangi bir taahhüt yok. İstediğiniz hafta sipariş verebilir, istediğiniz zaman duraklatabilir veya iptal edebilirsiniz.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Category: Delivery */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-lime-800">Teslimat</h2>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="del-1">
                                <AccordionTrigger>Hangi bölgelere teslimat yapıyorsunuz?</AccordionTrigger>
                                <AccordionContent>
                                    Şu anda İstanbul (Tüm ilçeler), Ankara, İzmir, Bursa ve Antalya merkez ilçelerine teslimat yapıyoruz.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="del-2">
                                <AccordionTrigger>Evde yoksam ne olur?</AccordionTrigger>
                                <AccordionContent>
                                    Kutularımız özel yalıtımlı ve buz akülüdür. Gıdalar kapınızda 6-8 saate kadar tazeliğini korur. Güvenli bir yere bırakılmasını isterseniz kurye notlarında belirtebilirsiniz.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Category: Recipes */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-lime-800">Yemekler & Malzemeler</h2>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="rec-1">
                                <AccordionTrigger>Malzemeler ne kadar süre taze kalır?</AccordionTrigger>
                                <AccordionContent>
                                    Amacımız yemekleri o hafta içinde tüketmenizdir. Et ve balık ürünleri vakumlu paketlerde gelir ve buzdolabında 3-4 gün, sebzeler ise 5-7 gün tazeliğini korur.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                </div>
            </section>

            <section className="py-12 bg-neutral-50 text-center">
                <div className="container mx-auto px-4">
                    <p className="text-neutral-600 mb-4">Aradığınız cevabı bulamadınız mı?</p>
                    <Button className="gap-2" asChild>
                        <Link href="/contact"><Mail className="w-4 h-4" /> Bize Ulaşın</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
