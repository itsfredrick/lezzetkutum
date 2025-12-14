"use client";

import { Button } from "@/components/ui/button";
import { Package, Calendar } from "lucide-react";

export default function NextBoxPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-1">
                <h1 className="text-3xl font-extrabold text-neutral-900">Sıradaki Kutu</h1>
                <p className="text-neutral-500">Gelecek teslimatınızın detaylarını buradan yönetin.</p>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-12 text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6 text-lime-600">
                    <Package className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Kutunuz Hazırlanıyor</h2>
                <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                    14 Ekim Cuma günü teslim edilecek kutunuz için şeflerimiz en taze malzemeleri seçiyor.
                </p>
                <div className="flex justify-center gap-4">
                    <Button className="font-bold">Sipariş Detayları</Button>
                    <Button variant="outline" className="font-bold">
                        <Calendar className="w-4 h-4 mr-2" /> Tarihi Değiştir
                    </Button>
                </div>
            </div>
        </div>
    );
}
