"use client";

import { Button } from "@/components/ui/button";
import { Check, CheckCircle, Clock, MapPin, Truck, ChevronUp, User, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function OrderConfirmedPage() {
    const [isSummaryOpen, setIsSummaryOpen] = useState(true);

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center py-12 px-4">
            {/* Header */}
            <div className="w-full max-w-4xl flex justify-between items-center mb-12">
                <Link href="/" className="font-bold text-2xl flex items-center gap-2">
                    <div className="w-6 h-6 bg-lime-500 rounded-tr-lg rounded-bl-lg" />
                    LezzetKutum
                </Link>
                <div className="flex gap-4 text-sm font-medium">
                    <Link href="/recipes" className="text-neutral-500 hover:text-neutral-900">Tarifler</Link>
                    <Link href="/plans" className="text-neutral-500 hover:text-neutral-900">Planlar</Link>
                    <Link href="/how-it-works" className="text-neutral-500 hover:text-neutral-900">Nasıl Çalışır?</Link>
                    <Link href="/account" className="flex items-center gap-2 text-neutral-900">
                        <User className="w-4 h-4" /> Hesabım
                    </Link>
                </div>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl overflow-hidden mb-8">
                <div className="p-12 text-center border-b border-neutral-100">
                    <div className="w-24 h-24 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-lime-200">
                            <Check className="w-10 h-10 stroke-[4]" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold text-neutral-900 mb-4 tracking-tight">Harika! Siparişin Alındı.</h1>
                    <p className="text-neutral-600 text-lg">
                        Sipariş No: <span className="font-bold text-neutral-900">#LK-89203</span>. Lezzet dolu kutun yola çıkmaya hazırlanıyor.
                    </p>

                    <div className="flex justify-center gap-4 mt-8">
                        <Button className="h-12 px-8 bg-lime-500 hover:bg-lime-600 text-neutral-900 font-bold rounded-lg" asChild>
                            <Link href="/recipes">
                                <ShoppingBag className="w-4 h-4 mr-2" /> Tarifleri Gör
                            </Link>
                        </Button>
                        <Button variant="outline" className="h-12 px-8 rounded-lg" asChild>
                            <Link href="/account">
                                <User className="w-4 h-4 mr-2" /> Hesabım
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="bg-neutral-50/50 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-2">
                            <Truck className="w-5 h-5 text-lime-600" />
                            <span className="text-xs font-bold text-lime-600 uppercase tracking-wider">Tahmini Teslimat</span>
                        </div>
                        <div className="text-2xl font-bold text-neutral-900 mb-1">14 Ekim, Cuma</div>
                        <p className="text-sm text-neutral-500">Kargo takibi yakında aktif olacak.</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-5 h-5 text-lime-600" />
                            <span className="text-xs font-bold text-lime-600 uppercase tracking-wider">Teslimat Saati</span>
                        </div>
                        <div className="text-2xl font-bold text-neutral-900 mb-1">09:00 – 18:00 Arası</div>
                        <p className="text-sm text-neutral-500">Teslimat günü SMS ile bilgilendirme yapılacaktır.</p>
                    </div>
                </div>

                <div className="px-8 pb-8">
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-4">
                        <div className="bg-orange-100 text-orange-600 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                            !
                        </div>
                        <div>
                            <div className="font-bold text-orange-900 text-sm">Son Düzenleme Tarihi</div>
                            <div className="text-sm text-orange-800">Menü değişikliği için son tarih: <span className="font-bold">12 Ekim Çarşamba, 23:59</span></div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-100">
                    <button
                        onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                        className="w-full flex items-center justify-between p-6 hover:bg-neutral-50 transition-colors"
                    >
                        <div className="flex items-center gap-3 font-bold text-lg">
                            <ShoppingBag className="w-5 h-5 text-green-600" /> Sipariş Özeti
                        </div>
                        <ChevronUp className={cn("w-5 h-5 transition-transform", !isSummaryOpen && "rotate-180")} />
                    </button>

                    {isSummaryOpen && (
                        <div className="px-6 pb-6 animate-in slide-in-from-top-2">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-neutral-50 p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <img src="/assets/images/placeholder_recipe_select_1.jpg" className="w-12 h-12 rounded-lg object-cover" />
                                        <div>
                                            <div className="font-bold text-sm">Klasik Menü</div>
                                            <div className="text-xs text-neutral-500">Izgara Tavuklu Sezar Salata</div>
                                        </div>
                                    </div>
                                    <div className="font-bold text-neutral-400">x2</div>
                                </div>

                                <div className="flex justify-between items-center bg-neutral-50 p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-neutral-200 rounded-lg flex items-center justify-center text-[10px] text-neutral-500 font-bold">Resim</div>
                                        <div>
                                            <div className="font-bold text-sm">Vejetaryen Seçim</div>
                                            <div className="text-xs text-neutral-500">Fesleğenli Sebze Makarna</div>
                                        </div>
                                    </div>
                                    <div className="font-bold text-neutral-400">x1</div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-dashed border-neutral-200 flex justify-between items-center">
                                <span className="text-neutral-500">Toplam Tutar</span>
                                <span className="font-bold text-xl text-neutral-900">₺349.90</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Button variant="link" className="text-neutral-400 hover:text-neutral-900 text-xs">
                Yardıma mı ihtiyacın var?
            </Button>

            <footer className="mt-12 text-[10px] text-neutral-400 flex gap-4">
                <Link href="#">Gizlilik Politikası</Link>
                <Link href="#">Kullanım Koşulları</Link>
                <Link href="#">İletişim</Link>
                <span>© 2023 LezzetKutum. Tüm hakları saklıdır.</span>
            </footer>
        </div>
    );
}
