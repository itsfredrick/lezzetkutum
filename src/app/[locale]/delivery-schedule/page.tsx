"use client";

import { FunnelLayout } from "@/components/layout/FunnelLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ChevronRight, Truck, MapPin, Calendar, Clock, Lock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useFunnelStore } from "@/store/funnel-store";

export default function DeliverySchedulePage() {
    const { deliveryDetails, setDeliveryDetails } = useFunnelStore();

    // Helper to update specific fields
    const updateDetail = (key: keyof typeof deliveryDetails, value: string) => {
        setDeliveryDetails({ [key]: value });
    };

    return (
        <FunnelLayout>
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                <div className="flex-1 space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Teslimat Bilgileri</h1>
                        <p className="text-neutral-600">Yemek kutunun sana ulaşacağı adresi ve zamanı seç.</p>
                    </div>

                    {/* Alert */}
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3 text-orange-800 text-sm">
                        <Clock className="w-5 h-5 shrink-0" />
                        <div>
                            <span className="font-bold">Yarın teslimat için son şans!</span> Siparişini tamamlamak için kalan süre: <span className="font-mono font-bold">02:45:10</span>
                        </div>
                    </div>

                    {/* Step 1: Personal Info */}
                    <Card className="p-6 border-neutral-200 shadow-sm rounded-2xl">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">1</span>
                            Kişisel Bilgiler
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Ad</Label>
                                <Input id="name" placeholder="Can" className="h-12 bg-neutral-50 border-neutral-200"
                                    value={deliveryDetails.firstName}
                                    onChange={(e) => updateDetail('firstName', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="surname">Soyad</Label>
                                <Input id="surname" placeholder="Yılmaz" className="h-12 bg-neutral-50 border-neutral-200"
                                    value={deliveryDetails.lastName}
                                    onChange={(e) => updateDetail('lastName', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefon Numarası</Label>
                            <div className="flex gap-2">
                                <div className="h-12 px-3 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center text-neutral-500 text-sm">+90</div>
                                <Input id="phone" placeholder="5XX XXX XX XX" className="h-12 bg-neutral-50 border-neutral-200"
                                    value={deliveryDetails.phone}
                                    onChange={(e) => updateDetail('phone', e.target.value)}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Step 2: Address */}
                    <Card className="p-6 border-neutral-200 shadow-sm rounded-2xl">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">2</span>
                            Teslimat Adresi
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                                <Label>İl</Label>
                                <Select defaultValue={deliveryDetails.city} onValueChange={(v) => updateDetail('city', v)}>
                                    <SelectTrigger className="h-12 bg-neutral-50 border-neutral-200"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="istanbul">İstanbul</SelectItem>
                                        <SelectItem value="ankara">Ankara</SelectItem>
                                        <SelectItem value="izmir">İzmir</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>İlçe</Label>
                                <Select defaultValue={deliveryDetails.district} onValueChange={(v) => updateDetail('district', v)}>
                                    <SelectTrigger className="h-12 bg-neutral-50 border-neutral-200"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="kadikoy">Kadıköy</SelectItem>
                                        <SelectItem value="sisli">Şişli</SelectItem>
                                        <SelectItem value="besiktas">Beşiktaş</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Zone Success */}
                        <div className="bg-lime-50 border border-lime-200 rounded-lg p-3 flex items-center gap-2 text-lime-800 text-sm font-bold mb-4">
                            <CheckCircle className="w-5 h-5 text-lime-600" />
                            Harika! Bu bölgeye teslimat yapıyoruz.
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Mahalle</Label>
                                <Input placeholder="Caferağa Mah." className="h-12 bg-neutral-50 border-neutral-200"
                                    value={deliveryDetails.neighborhood}
                                    onChange={(e) => updateDetail('neighborhood', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Sokak ve No</Label>
                                <Input placeholder="Örn: Bağdat Cad. No:15" className="h-12 bg-neutral-50 border-neutral-200"
                                    value={deliveryDetails.addressDetail}
                                    onChange={(e) => updateDetail('addressDetail', e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Kat</Label>
                                    <Input placeholder="3" className="h-12 bg-neutral-50 border-neutral-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Daire No</Label>
                                    <Input placeholder="12" className="h-12 bg-neutral-50 border-neutral-200" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Adres Tarifi / Teslimat Notu</Label>
                                <textarea className="w-full min-h-[100px] p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Kurye için ek notlar (Zil çalışmıyor vb.)"></textarea>
                            </div>

                            <div className="flex gap-4">
                                <Button variant="outline" size="sm" className="bg-green-600 text-white hover:bg-green-700 border-none"><MapPin className="w-4 h-4 mr-2" /> Ev</Button>
                                <Button variant="outline" size="sm"><MapPin className="w-4 h-4 mr-2" /> İş</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Step 3: Date & Time */}
                    <Card className="p-6 border-neutral-200 shadow-sm rounded-2xl">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">3</span>
                            Teslimat Zamanı
                        </h2>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {[
                                { id: "oct-14", label: "YARIN", date: "14 Ekim", day: "Salı", badge: true },
                                { id: "oct-16", label: "SONRAKİ", date: "16 Ekim", day: "Perşembe" },
                                { id: "oct-18", label: "SONRAKİ", date: "18 Ekim", day: "Cumartesi" },
                            ].map((slot) => (
                                <div
                                    key={slot.id}
                                    onClick={() => updateDetail('dateId', slot.id)}
                                    className={cn(
                                        "cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-1 transition-all",
                                        deliveryDetails.dateId === slot.id ? "border-green-500 bg-green-50/50" : "border-neutral-100 bg-neutral-50 hover:border-green-200"
                                    )}
                                >
                                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                                        {slot.label} {slot.badge && deliveryDetails.dateId === slot.id && <CheckCircle className="w-3 h-3 text-green-600" />}
                                    </div>
                                    <div className="text-xl font-bold text-neutral-900">{slot.date}</div>
                                    <div className="text-xs text-neutral-500">{slot.day}</div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-neutral-900">Saat Aralığı</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { id: "morning", label: "Sabah", range: "09:00 - 13:00", icon: "☀️" },
                                    { id: "afternoon", label: "Öğleden Sonra", range: "14:00 - 18:00", icon: "🌙" }
                                ].map((time) => (
                                    <div
                                        key={time.id}
                                        onClick={() => updateDetail('timeId', time.id)}
                                        className={cn(
                                            "flex items-center p-4 rounded-xl border transition-all cursor-pointer",
                                            deliveryDetails.timeId === time.id ? "bg-green-50 border-green-500 shadow-sm" : "bg-white border-neutral-200 hover:border-green-200"
                                        )}
                                    >
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm mr-4 border">
                                            {time.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-neutral-900">{time.label}</div>
                                            <div className="text-xs text-neutral-500">{time.range}</div>
                                        </div>
                                        <div className={cn(
                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                            deliveryDetails.timeId === time.id ? "border-green-600" : "border-neutral-300"
                                        )}>
                                            {deliveryDetails.timeId === time.id && <div className="w-2.5 h-2.5 rounded-full bg-green-600" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right: Summary */}
                <div className="lg:w-[380px]">
                    <div className="sticky top-24 space-y-4">
                        {/* Card Image Header */}
                        <div className="rounded-2xl overflow-hidden shadow-lg relative bg-neutral-900">
                            <div className="absolute inset-0 bg-black/40 z-10" />
                            <img src="/assets/images/placeholder_recipe_select_1.jpg" className="w-full h-32 object-cover opacity-80" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                                <div className="text-xs uppercase tracking-wider opacity-80 mb-1">Senin Kutun</div>
                                <h3 className="font-bold text-xl leading-none">Klasik Lezzetler</h3>
                            </div>
                        </div>

                        <Card className="p-6 border-none shadow-lg rounded-2xl bg-white">
                            <div className="flex justify-between items-start mb-6 pb-6 border-b border-dashed border-neutral-200">
                                <div>
                                    <h4 className="font-bold text-neutral-900">Haftalık Abonelik</h4>
                                    <p className="text-xs text-neutral-500">2 Kişilik / 3 Öğün</p>
                                </div>
                                <Button variant="link" className="h-auto p-0 text-xs text-green-600 underline">Düzenle</Button>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-500">Ara Toplam</span>
                                    <span className="font-medium text-neutral-900 line-through">₺850,00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="flex items-center gap-1 text-green-600 font-bold"><Truck className="w-3 h-3" /> Teslimat</span>
                                    <span className="font-bold text-green-600">Ücretsiz</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-6">
                                <span className="font-bold text-lg">Toplam</span>
                                <span className="font-bold text-2xl tracking-tight">₺850,00</span>
                            </div>

                            <Button className="w-full h-12 text-lg font-bold bg-lime-600 hover:bg-lime-700 text-white rounded-xl shadow-lg shadow-lime-900/20" asChild>
                                <Link href="/checkout">
                                    Ödemeye Geç <ChevronRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>

                            <div className="mt-4 flex justify-center gap-2">
                                <span className="bg-neutral-100 px-2 py-1 text-[10px] text-neutral-500 rounded font-medium">VISA</span>
                                <span className="bg-neutral-100 px-2 py-1 text-[10px] text-neutral-500 rounded font-medium">MC</span>
                                <span className="bg-neutral-100 px-2 py-1 text-[10px] text-neutral-500 rounded font-medium">TROY</span>
                            </div>
                        </Card>

                        <Card className="p-4 flex items-center gap-3 bg-neutral-50 border-neutral-200 shadow-none">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <Headphones className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Yardım mı lazım?</p>
                                <p className="text-xs text-neutral-500">Canlı desteğe bağlan</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </FunnelLayout>
    );
}

// Icon helper since 'Headphones' is not imported
function Headphones(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" /><path d="M14 2v4" /><path d="M10 2v2" /><path d="M6 2v2" /><path d="M18 2v2" /></svg>
    )
}
