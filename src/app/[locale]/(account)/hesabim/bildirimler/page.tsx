"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NotificationsPage() {
    const [preferences, setPreferences] = useState({
        orderUpdates: { email: true, sms: true, push: true },
        promotions: { email: true, sms: false, push: false },
        newsletter: { email: true, sms: false, push: false },
        delivery: { email: true, sms: true, push: true }
    });

    const handleToggle = (category: keyof typeof preferences, type: 'email' | 'sms' | 'push') => {
        setPreferences(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [type]: !prev[category][type]
            }
        }));
        toast.success("Tercihleriniz güncellendi.");
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="space-y-1">
                <h1 className="text-3xl font-extrabold text-neutral-900">Bildirim Ayarları</h1>
                <p className="text-neutral-500">Hangi konularda ve kanallardan bildirim almak istediğinizi seçin.</p>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-4 p-6 bg-neutral-50/50 border-b border-neutral-100 text-sm font-bold text-neutral-500">
                    <div className="col-span-12 md:col-span-5">Bildirim Tipi</div>
                    <div className="col-span-4 md:col-span-2 text-center flex flex-col items-center gap-1">
                        <Mail className="w-4 h-4" /> E-posta
                    </div>
                    <div className="col-span-4 md:col-span-2 text-center flex flex-col items-center gap-1">
                        <MessageSquare className="w-4 h-4" /> SMS
                    </div>
                    <div className="col-span-4 md:col-span-3 text-center flex flex-col items-center gap-1">
                        <Smartphone className="w-4 h-4" /> Push Bildirim
                    </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-neutral-100">
                    {/* Order Updates */}
                    <div className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-neutral-50/30 transition-colors">
                        <div className="col-span-12 md:col-span-5 space-y-1">
                            <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                                <PackageIcon /> Sipariş Durumları
                            </h3>
                            <p className="text-xs text-neutral-500">Siparişiniz alındığında, kargolandığında ve teslim edildiğinde.</p>
                        </div>
                        <div className="col-span-4 md:col-span-2 flex justify-center">
                            <Switch checked={preferences.orderUpdates.email} onCheckedChange={() => handleToggle('orderUpdates', 'email')} />
                        </div>
                        <div className="col-span-4 md:col-span-2 flex justify-center">
                            <Switch checked={preferences.orderUpdates.sms} onCheckedChange={() => handleToggle('orderUpdates', 'sms')} />
                        </div>
                        <div className="col-span-4 md:col-span-3 flex justify-center">
                            <Switch checked={preferences.orderUpdates.push} onCheckedChange={() => handleToggle('orderUpdates', 'push')} />
                        </div>
                    </div>

                    {/* Delivery Updates */}
                    <div className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-neutral-50/30 transition-colors">
                        <div className="col-span-12 md:col-span-5 space-y-1">
                            <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                                <TruckIcon /> Teslimat Güncellemeleri
                            </h3>
                            <p className="text-xs text-neutral-500">Kurye yaklaştığında veya teslimat saatinde değişiklik olduğunda.</p>
                        </div>
                        <div className="col-span-4 md:col-span-2 flex justify-center">
                            <Switch checked={preferences.delivery.email} onCheckedChange={() => handleToggle('delivery', 'email')} />
                        </div>
                        <div className="col-span-4 md:col-span-2 flex justify-center">
                            <Switch checked={preferences.delivery.sms} onCheckedChange={() => handleToggle('delivery', 'sms')} />
                        </div>
                        <div className="col-span-4 md:col-span-3 flex justify-center">
                            <Switch checked={preferences.delivery.push} onCheckedChange={() => handleToggle('delivery', 'push')} />
                        </div>
                    </div>

                    {/* Promotions */}
                    <div className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-neutral-50/30 transition-colors">
                        <div className="col-span-12 md:col-span-5 space-y-1">
                            <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                                <TagIcon /> Kampanya ve Fırsatlar
                            </h3>
                            <p className="text-xs text-neutral-500">Size özel indirimler ve yeni özellikler hakkında.</p>
                        </div>
                        <div className="col-span-4 md:col-span-2 flex justify-center">
                            <Switch checked={preferences.promotions.email} onCheckedChange={() => handleToggle('promotions', 'email')} />
                        </div>
                        <div className="col-span-4 md:col-span-2 flex justify-center">
                            <Switch checked={preferences.promotions.sms} onCheckedChange={() => handleToggle('promotions', 'sms')} />
                        </div>
                        <div className="col-span-4 md:col-span-3 flex justify-center">
                            <Switch checked={preferences.promotions.push} onCheckedChange={() => handleToggle('promotions', 'push')} />
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-neutral-50/30 transition-colors">
                        <div className="col-span-12 md:col-span-5 space-y-1">
                            <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                                <BookIcon /> Haftalık Bülten
                            </h3>
                            <p className="text-xs text-neutral-500">Şef önerileri, yeni tarifler ve sağlıklı yaşam ipuçları.</p>
                        </div>
                        <div className="col-span-4 md:col-span-2 flex justify-center">
                            <Switch checked={preferences.newsletter.email} onCheckedChange={() => handleToggle('newsletter', 'email')} />
                        </div>
                        <div className="col-span-4 md:col-span-2 flex justify-center text-neutral-300">
                            {/* SMS disabled for newsletter example */}
                            -
                        </div>
                        <div className="col-span-4 md:col-span-3 flex justify-center">
                            <Switch checked={preferences.newsletter.push} onCheckedChange={() => handleToggle('newsletter', 'push')} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => toast.message("Değişiklikler geri alındı.")}>İptal</Button>
                <Button onClick={() => toast.success("Tüm ayarlar kaydedildi.")} className="px-8 font-bold">Kaydet</Button>
            </div>
        </div>
    );
}

// Simple internal icon components for cleaner JSX
function PackageIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lime-600"><path d="M16.5 9.4 7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" x2="12" y1="22" y2="12" /></svg> }
function TruckIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg> }
function TagIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l5 5a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-5-5z" /><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" /></svg> }
function BookIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg> }
