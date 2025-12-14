"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MessageSquare, Mail } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const CATEGORIES = [
    { id: "overview", label: "Genel Bakış" },
    { id: "account", label: "Üyelik ve Hesap" },
    { id: "delivery", label: "Sipariş ve Teslimat" },
    { id: "payment", label: "Ödemeler" },
    { id: "products", label: "Ürünler ve Malzemeler" },
];

const FAQS = {
    overview: [
        { q: "LezzetKutum tam olarak nedir?", a: "LezzetKutum, şefler tarafından hazırlanan lezzetli tarifleri ve bu tarifleri yapmanız için gereken taze, porsiyonlanmış malzemeleri her hafta kapınıza kadar getiren bir yemek kiti aboneliğidir. Market alışverişi derdinden kurtarır ve mutfakta zaman kazandırır." },
        { q: "Haftalık menü ne zaman açıklanıyor?", a: "Her Salı günü gelecek haftanın menüsü sitemizde yayınlanır ve seçim yapmanız için açılır." },
    ],
    account: [
        { q: "Aboneliğimi nasıl iptal edebilirim?", a: "Hesabım sayfasından 'Üyelik Ayarları' sekmesine giderek aboneliğinizi istediğiniz zaman iptal edebilirsiniz. Herhangi bir taahhüt yoktur." },
        { q: "Haftalık siparişi atlayabilir miyim?", a: "Evet! Seyahatteyseniz veya o hafta yemek yapmak istemiyorsanız, teslimat tarihinden 4 gün öncesine kadar o haftayı atlayabilirsiniz." },
    ],
    delivery: [
        { q: "Teslimat bölgeleriniz nerelerdir?", a: "Şu anda İstanbul, Ankara, İzmir, Bursa ve Antalya şehir merkezlerine teslimat yapıyoruz. Dağıtım ağımızı sürekli genişletiyoruz." },
        { q: "Evde yoksam ne olur?", a: "Kutularımız özel yalıtımlı ve buz akülü olduğu için malzemeleriniz akşama kadar kapıda taze kalır. Teslimat notuna 'kapıya bırak' yazabilirsiniz." },
    ],
    payment: [
        { q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?", a: "Visa, Mastercard ve American Express kredi kartları ile ödeme yapabilirsiniz. Kapıda ödeme seçeneğimiz bulunmamaktadır." },
    ],
    products: [
        { q: "Malzemeler organik mi?", a: "Mümkün olan her yerde organik ve yerel üreticileri tercih ediyoruz. Etlerimiz %100 yerli besi, sebzelerimiz ise mevsiminde toplanmıştır." },
    ]
};

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState("overview");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
            <div className="relative bg-neutral-900 py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img src="/assets/images/placeholder_recipe_select_1.jpg" className="w-full h-full object-cover blur-sm" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent" />

                <div className="relative container mx-auto text-center max-w-3xl space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Sıkça Sorulan Sorular</h1>
                    <p className="text-neutral-300 text-lg mb-8">LezzetKutum deneyimi hakkında merak ettiğiniz her şey burada.</p>

                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                        <Input
                            placeholder="Hangi konuda yardıma ihtiyacınız var?"
                            className="h-14 pl-12 rounded-xl text-lg bg-white shadow-xl border-none text-neutral-900 placeholder:text-neutral-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button className="absolute right-2 top-2 h-10 px-6 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-lg">
                            Ara
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-1 container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
                {/* Sidebar Categories */}
                <div className="w-full lg:w-64 shrink-0 space-y-2">
                    <h3 className="font-bold text-lg mb-4 px-2">Kategoriler</h3>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                activeCategory === cat.id
                                    ? "bg-lime-100/50 text-lime-700 border-l-4 border-lime-500"
                                    : "text-neutral-600 hover:bg-white hover:shadow-sm"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 max-w-3xl space-y-8">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
                        <h2 className="text-2xl font-bold mb-6 border-b pb-4">
                            {CATEGORIES.find(c => c.id === activeCategory)?.label}
                        </h2>

                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {FAQS[activeCategory as keyof typeof FAQS]?.map((item, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl px-4 border-neutral-200">
                                    <AccordionTrigger className="text-left font-bold text-neutral-800 hover:no-underline hover:text-lime-600 py-4 text-base">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-neutral-600 text-base leading-relaxed pb-4">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            )) || <p>Bu kategoride henüz soru bulunmamaktadır.</p>}
                        </Accordion>
                    </div>

                    {/* Contact Box */}
                    <div className="bg-lime-50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-lime-100">
                        <div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">Hala sorunuz mu var?</h3>
                            <p className="text-neutral-600">Aradığınız cevabı bulamadıysanız destek ekibimiz size yardımcı olmaktan mutluluk duyar.</p>
                        </div>
                        <div className="flex gap-4">
                            <Button className="bg-lime-500 hover:bg-lime-600 text-white font-bold h-12 px-6 gap-2">
                                <MessageSquare className="w-5 h-5" /> Canlı Destek
                            </Button>
                            <Button variant="outline" className="bg-white border-neutral-200 h-12 px-6 gap-2 font-bold text-neutral-700">
                                <Mail className="w-5 h-5" /> E-posta Gönder
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
