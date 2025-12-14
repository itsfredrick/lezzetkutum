"use client";

import { Button } from "@/components/ui/button";
import { Calendar, CreditCard, MapPin, Pause, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SubscriptionSettingsPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-1">
                <h1 className="text-3xl font-extrabold text-neutral-900">Abonelik Ayarları</h1>
                <p className="text-neutral-500">Abonelik planınızı, teslimat adresinizi ve ödeme yönteminizi buradan yönetebilirsiniz.</p>
            </div>

            {/* Plan Card (Dark wood bg style from design) */}
            <div className="relative rounded-3xl overflow-hidden min-h-[200px] flex items-end">
                <img src="/assets/images/placeholder_recipe_select_2.jpg" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="relative z-10 p-8 w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <Badge className="bg-lime-500 hover:bg-lime-600 text-white border-none font-bold">AKTİF</Badge>
                            <span className="text-white/80 text-sm font-medium flex items-center gap-1">
                                <Calendar className="w-4 h-4" /> Sıradaki Teslimat: 14 Kasım
                            </span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-white">Mevcut Planınız</h2>
                        <p className="text-white/90 text-lg">Klasik Kutu • Haftalık • 2 Kişilik</p>
                    </div>
                    <Button className="bg-lime-500 hover:bg-lime-600 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-black/20">
                        Planı Değiştir
                    </Button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-4 justify-start px-6 rounded-xl border-neutral-200 hover:bg-neutral-50 bg-white shadow-sm text-neutral-700 font-bold gap-3">
                    <Pause className="w-5 h-5" /> Aboneliği Duraklat
                </Button>
                <Button variant="outline" className="h-auto py-4 justify-start px-6 rounded-xl border-neutral-200 hover:bg-neutral-50 bg-white shadow-sm text-neutral-700 font-bold gap-3">
                    <Calendar className="w-5 h-5" /> Teslimat Gününü Değiştir
                </Button>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Delivery Address */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-neutral-900">Teslimat Adresi</h3>
                        <Button variant="link" className="text-lime-600 font-bold text-sm">Yeni Adres Ekle</Button>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center text-lime-700 shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h4 className="font-bold text-neutral-900">Ev</h4>
                                    <div className="flex gap-2">
                                        <button className="text-neutral-400 hover:text-neutral-900"><Pencil className="w-4 h-4" /></button>
                                        <button className="text-neutral-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                                <p className="text-neutral-500 text-sm mt-1 leading-relaxed">
                                    Fenerbahçe Mah. Bağdat Cad. No: 102/4<br />
                                    Kadıköy, İstanbul
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-neutral-900">Ödeme Yöntemi</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between h-[126px]">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-8 rounded bg-neutral-100 flex items-center justify-center border border-neutral-200">
                                {/* MasterCard Logo Mock */}
                                <div className="flex -space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900">Mastercard **** 4242</h4>
                                <p className="text-xs text-neutral-500">Son Kullanma: 12/26</p>
                            </div>
                        </div>
                        <Button variant="secondary" className="font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200">
                            Güncelle
                        </Button>
                    </div>
                </div>
            </div>

            <div className="pt-8 text-right border-t border-dashed border-neutral-200">
                <Button variant="link" className="text-neutral-400 hover:text-red-600 font-medium text-sm">
                    Aboneliği İptal Et
                </Button>
            </div>
        </div>
    );
}
