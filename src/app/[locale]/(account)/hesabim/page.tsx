"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, CreditCard, Package, Utensils, Wallet } from "lucide-react";
import Link from "next/link";

export default function AccountOverviewPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <span>Hesabım</span>
                    <span>/</span>
                    <span className="font-medium text-neutral-900">Genel Bakış</span>
                </div>
                <h1 className="text-3xl font-extrabold text-neutral-900">Genel Bakış</h1>
                <p className="text-neutral-500">Hesap durumunuz ve yaklaşan teslimatlarınız.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mb-4">
                        <Wallet className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-neutral-500">Lezzet Kredisi</p>
                        <p className="text-2xl font-bold text-neutral-900">₺150,00</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                        <Utensils className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-neutral-500">Aktif Plan</p>
                        <p className="text-2xl font-bold text-neutral-900">2 Kişilik / 3 Öğün</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
                        <Package className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-neutral-500">Toplam Sipariş</p>
                        <p className="text-2xl font-bold text-neutral-900">12</p>
                    </div>
                </div>
            </div>

            {/* Next Box Section */}
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-lime-100 p-2 rounded-lg text-lime-700">
                            <Package className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-neutral-900">Sıradaki Kutunuz</h2>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none font-bold">
                        Hazırlanıyor
                    </Badge>
                </div>

                <div className="p-6 gap-8 flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 aspect-video rounded-2xl overflow-hidden relative bg-neutral-100">
                        <img src="/assets/images/placeholder_recipe_select_1.jpg" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-6">
                        <div>
                            <p className="text-sm font-medium text-neutral-500 mb-1">Tahmini Teslimat</p>
                            <h3 className="text-2xl font-bold text-neutral-900">14 Ekim Cuma</h3>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm font-bold text-neutral-700">Bu Hafta Seçilenler</p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-sm text-neutral-600">
                                    <span className="w-5 h-5 rounded-full bg-lime-500 flex items-center justify-center text-white text-[10px]">✓</span>
                                    Zeytinyağlı Enginar & Pilav
                                </li>
                                <li className="flex items-center gap-2 text-sm text-neutral-600">
                                    <span className="w-5 h-5 rounded-full bg-lime-500 flex items-center justify-center text-white text-[10px]">✓</span>
                                    Izgara Tavuk & Mevsim Salatası
                                </li>
                                <li className="flex items-center gap-2 text-sm text-neutral-600">
                                    <span className="w-5 h-5 rounded-full bg-lime-500 flex items-center justify-center text-white text-[10px]">✓</span>
                                    Mantar Soslu Makarna
                                </li>
                            </ul>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button variant="outline" className="flex-1 bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300 font-bold text-neutral-700">
                                <Utensils className="w-4 h-4 mr-2" /> Menüyü Düzenle
                            </Button>
                            <Button variant="outline" className="flex-1 bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300 font-bold text-neutral-700">
                                <Calendar className="w-4 h-4 mr-2" /> Tarihi Değiştir
                            </Button>
                            <Button variant="ghost" className="text-red-500 font-bold hover:bg-red-50 hover:text-red-600">
                                Bu haftayı atla
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-neutral-900">Son Aktiviteler</h2>
                    <Button variant="link" className="text-lime-600 font-bold">Tümünü Gör</Button>
                </div>

                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl border border-neutral-100 flex items-center justify-between group cursor-pointer hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                <Package className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-neutral-900">Sipariş #TR-9822 Teslim Edildi</p>
                                <p className="text-xs text-neutral-500">07 Ekim 2023</p>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-lime-600 transition-colors" />
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-neutral-100 flex items-center justify-between group cursor-pointer hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-neutral-900">Ödeme Başarılı</p>
                                <p className="text-xs text-neutral-500">05 Ekim 2023</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-neutral-900">- ₺450,00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
