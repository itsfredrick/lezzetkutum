"use client";

import { Button } from "@/components/ui/button";
import { Wallet, Gift } from "lucide-react";

export default function CreditsPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-1">
                <h1 className="text-3xl font-extrabold text-neutral-900">Lezzet Kredileri</h1>
                <p className="text-neutral-500">Kazandığınız puanları ve bakiyenizi buradan takip edin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-lime-900 text-white p-8 rounded-3xl relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="opacity-80 font-medium mb-2">Toplam Bakiye</p>
                        <h2 className="text-5xl font-extrabold mb-6">₺150,00</h2>
                        <Button className="bg-white text-lime-900 hover:bg-neutral-100 font-bold border-none">
                            Kredi Yükle
                        </Button>
                    </div>
                    <Wallet className="absolute -bottom-6 -right-6 w-48 h-48 text-white/5 rotate-12" />
                </div>

                <div className="bg-white p-8 rounded-3xl border border-neutral-100 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4">
                        <Gift className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Arkadaşını Davet Et</h3>
                    <p className="text-neutral-500 mb-6 text-sm">
                        Arkadaşlarınıza LezzetKutum'u önerin, her ikiniz de 100₺ kredi kazanın.
                    </p>
                    <Button variant="outline" className="w-full font-bold">Davet Linki Paylaş</Button>
                </div>
            </div>
        </div>
    );
}
