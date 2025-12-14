"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ChevronRight, FileText, HelpCircle, AlertCircle, Clock, CheckCircle, Package } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Data
const ORDERS = [
    { id: "LK-29381", date: "24 Ekim 2023", summary: "2x Akdeniz Salatası Kiti, 1x Izg...", total: "450.00 ₺", status: "DELIVERED", label: "Teslim Edildi" },
    { id: "LK-29300", date: "26 Ekim 2023", summary: "1x Vegan Burger Kiti, 2x Deto...", total: "520.00 ₺", status: "PREPARING", label: "Hazırlanıyor" },
    { id: "LK-28112", date: "28 Eylül 2023", summary: "4x Karışık Mevsim Meyveleri", total: "0.00 ₺", status: "CANCELLED", label: "İptal Edildi" },
    { id: "LK-27455", date: "15 Eylül 2023", summary: "1x İtalyan Makarnası, 1x Tirami...", total: "340.50 ₺", status: "DELIVERED", label: "Teslim Edildi" },
    { id: "LK-26550", date: "01 Eylül 2023", summary: "4 Kişilik Aile Menüsü", total: "650.00 ₺", status: "DELIVERED", label: "Teslim Edildi" },
];

export default function OrderHistoryPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-neutral-900 mb-1">Siparişlerim</h1>
                    <p className="text-neutral-500">Geçmiş ve aktif siparişlerinizin durumunu buradan takip edebilirsiniz.</p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                    <Input placeholder="Sipariş Ara..." className="pl-9 bg-white border-neutral-200" />
                </div>
            </div>

            {/* Order List */}
            <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="bg-transparent p-0 gap-2 flex-wrap h-auto">
                    <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white bg-neutral-100 text-neutral-600 px-6 h-9 font-medium">Tümü</TabsTrigger>
                    <TabsTrigger value="active" className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white bg-neutral-100 text-neutral-600 px-6 h-9 font-medium">Devam Edenler</TabsTrigger>
                    <TabsTrigger value="delivered" className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white bg-neutral-100 text-neutral-600 px-6 h-9 font-medium">Teslim Edilenler</TabsTrigger>
                    <TabsTrigger value="cancelled" className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white bg-neutral-100 text-neutral-600 px-6 h-9 font-medium">İptaller</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <div className="bg-white border boundary-neutral-200 rounded-3xl overflow-hidden shadow-sm">

                        {/* Table Header (Hidden on Mobile usually, but let's keep simplistic) */}
                        <div className="grid grid-cols-12 gap-4 p-4 border-b border-neutral-100 bg-neutral-50/50 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                            <div className="col-span-12 md:col-span-2">Sipariş No</div>
                            <div className="col-span-6 md:col-span-2">Tarih</div>
                            <div className="col-span-6 md:col-span-4">İçerik Özeti</div>
                            <div className="col-span-6 md:col-span-2">Durum</div>
                            <div className="col-span-6 md:col-span-2 text-right md:text-left">Tutar</div>
                        </div>

                        {/* Items */}
                        <div className="divide-y divide-neutral-100">
                            {ORDERS.map((order) => (
                                <div key={order.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-neutral-50 transition-colors items-center group cursor-pointer">
                                    <div className="col-span-12 md:col-span-2 font-bold text-neutral-900">
                                        #{order.id}
                                    </div>
                                    <div className="col-span-6 md:col-span-2 text-sm text-neutral-600">
                                        {order.date}
                                    </div>
                                    <div className="col-span-6 md:col-span-4 text-sm text-neutral-500 truncate">
                                        {order.summary}
                                    </div>
                                    <div className="col-span-6 md:col-span-2">
                                        <Badge variant="secondary" className={cn(
                                            "font-bold border-none",
                                            order.status === 'DELIVERED' && "bg-green-100 text-green-700",
                                            order.status === 'PREPARING' && "bg-orange-100 text-orange-700",
                                            order.status === 'CANCELLED' && "bg-red-100 text-red-700",
                                        )}>
                                            {order.status === 'DELIVERED' && <CheckCircle className="w-3 h-3 mr-1" />}
                                            {order.status === 'PREPARING' && <Clock className="w-3 h-3 mr-1" />}
                                            {order.status === 'CANCELLED' && <AlertCircle className="w-3 h-3 mr-1" />}
                                            {order.label}
                                        </Badge>
                                    </div>
                                    <div className="col-span-5 md:col-span-2 font-bold text-neutral-900 text-right md:text-left">
                                        {order.total}
                                    </div>
                                    <div className="col-span-1 flex justify-end">
                                        <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-900" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Footer */}
                        <div className="p-4 bg-neutral-50/30 border-t border-neutral-100 flex items-center justify-between">
                            <span className="text-sm text-neutral-500">Toplam 4 sipariş gösteriliyor</span>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled className="h-8">Önceki</Button>
                                <Button variant="outline" size="sm" className="h-8">Sonraki</Button>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Bottom Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#e9f5e1] rounded-2xl p-8 flex flex-col justify-center border border-[#dcebd3]">
                    <div className="w-10 h-10 bg-lime-500 rounded-lg flex items-center justify-center text-white mb-6">
                        <HelpCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Yardım mı lazım?</h3>
                    <p className="text-neutral-600 mb-6 text-sm">Siparişinizle ilgili bir sorun yaşıyorsanız müşteri temsilcimizle görüşün.</p>
                    <Button variant="link" className="p-0 h-auto font-bold text-neutral-900 underline justify-start">Canlı Destek Başlat</Button>
                </div>

                <div className="bg-white rounded-2xl p-8 flex flex-col justify-center border border-neutral-200">
                    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-600 mb-6">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Faturalarım</h3>
                    <p className="text-neutral-600 mb-6 text-sm">Geçmiş dönemlere ait tüm faturalarınızı toplu olarak indirebilirsiniz.</p>
                    <Button variant="link" className="p-0 h-auto font-bold text-neutral-900 underline justify-start">Faturaları Görüntüle</Button>
                </div>
            </div>
        </div>
    );
}
