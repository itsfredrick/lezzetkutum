"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Info, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function PlansPricingPage() {
    // Configurator State
    const [people, setPeople] = useState<2 | 4>(2);
    const [meals, setMeals] = useState<number>(3);

    // Mock Pricing Logic (Mirroring DB Logic roughly for display)
    // 2 People Base: 100 TL/serving
    // 4 People Base: 90 TL/serving
    // Discount based on meals count (more meals = lower per serving)
    const basePerServing = people === 2 ? 105 : 95;
    const discountPerMeal = (meals - 2) * 2.5;
    const pricePerServing = basePerServing - discountPerMeal;

    const shipping = 29.99;
    const subtotal = pricePerServing * people * meals;
    const total = subtotal + (subtotal > 600 ? 0 : shipping);

    return (
        <div className="bg-white">
            <section className="py-16 md:py-24 bg-lime-50 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-6">
                    Sizin Planınız, Sizin Kurallarınız
                </h1>
                <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                    Esnek haftalık planlar. İstediğiniz zaman atlayın, duraklatın veya iptal edin.
                </p>
            </section>

            <section className="py-12 container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">

                    {/* Configurator */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                1. Kişi Sayısı Seçin
                            </h3>
                            <div className="flex gap-4">
                                {[2, 4].map(n => (
                                    <button
                                        key={n}
                                        onClick={() => setPeople(n as any)}
                                        className={cn(
                                            "flex-1 py-4 px-6 rounded-xl border-2 font-bold text-lg transition-all",
                                            people === n
                                                ? "border-primary bg-primary/5 text-primary"
                                                : "border-neutral-200 text-neutral-600 hover:border-primary/50"
                                        )}
                                    >
                                        {n} Kişi
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                2. Haftalık Öğün Sayısı
                            </h3>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                {[2, 3, 4, 5, 6].map(n => (
                                    <button
                                        key={n}
                                        onClick={() => setMeals(n)}
                                        className={cn(
                                            "py-3 rounded-lg border-2 font-bold transition-all",
                                            meals === n
                                                ? "border-primary bg-primary/5 text-primary"
                                                : "border-neutral-200 text-neutral-600 hover:border-primary/50"
                                        )}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-neutral-50 p-6 rounded-2xl space-y-4">
                            <h3 className="font-bold text-lg">Neler Dahil?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-neutral-700">
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                    <span>Ücretsiz Kargo</span>
                                </li>
                                <li className="flex items-center gap-3 text-neutral-700">
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                    <span>Adım Adım Tarif Kartları</span>
                                </li>
                                <li className="flex items-center gap-3 text-neutral-700">
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                    <span>Özel Yalıtımlı Kutu</span>
                                </li>
                                <li className="flex items-center gap-3 text-neutral-700">
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                    <span>Esnek Abonelik (Kolay İptal)</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Summary Card */}
                    <div className="w-full lg:w-96 shrink-0">
                        <div className="bg-white border border-neutral-200 shadow-xl rounded-2xl p-8 sticky top-24">
                            <h2 className="text-2xl font-bold mb-6 text-center">Özet</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-neutral-600">
                                    <span>Porsiyon fiyatı</span>
                                    <span className="font-medium">₺{pricePerServing.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-neutral-600">
                                    <span>Kargo</span>
                                    <span className="font-medium text-green-600">Ücretsiz</span>
                                </div>
                                <div className="border-t border-neutral-100 my-4 pt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold text-neutral-900">Haftalık Toplam</span>
                                    <span className="text-3xl font-extrabold text-primary">₺{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button size="lg" className="w-full h-14 text-lg font-bold rounded-xl mb-4" asChild>
                                <Link href={`/select-plan?people=${people}&meals=${meals}`}>Planı Seç</Link>
                            </Button>

                            <p className="text-xs text-center text-neutral-400">
                                İstediğiniz zaman iptal edebilirsiniz.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-neutral-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Sıkça Sorulan Sorular</h2>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Haftayı atlayabilir miyim?</AccordionTrigger>
                            <AccordionContent>
                                Evet. Seyahate çıkıyorsanız veya o hafta yemek yapmak istemiyorsanız, hesabınızdan o haftayı tek tuşla atlayabilirsiniz. Hiçbir ücret ödemezsiniz.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Aboneliğimi nasıl iptal ederim?</AccordionTrigger>
                            <AccordionContent>
                                Hesabım {'>'} Ayarlar sayfasından aboneliğinizi dilediğiniz zaman ceza veya ek ücret olmaksızın iptal edebilirsiniz.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Teslimat saatini seçebilir miyim?</AccordionTrigger>
                            <AccordionContent>
                                Evet, sipariş oluştururken size uygun gün ve saat aralığını (Sabah, Öğle, Akşam) seçebilirsiniz.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </div>
    )
}
