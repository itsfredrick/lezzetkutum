"use client";

import { Button } from "@/components/ui/button";
import { Plus, CreditCard } from "lucide-react";

export default function PaymentsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-neutral-900 mb-1">Ödeme Yöntemleri</h1>
                    <p className="text-neutral-500">Kayıtlı kartlarınızı buradan yönetebilirsiniz.</p>
                </div>
                <Button className="bg-lime-500 hover:bg-lime-600 text-white font-bold gap-2">
                    <Plus className="w-4 h-4" /> Yeni Kart Ekle
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-8">
                        <CreditCard className="w-8 h-8 text-neutral-700" />
                        <span className="bg-lime-100 text-lime-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Varsayılan</span>
                    </div>
                    <div className="mb-4">
                        <p className="text-neutral-500 text-xs uppercase font-bold tracking-wider mb-1">Kart Numarası</p>
                        <p className="font-mono text-lg font-bold text-neutral-800">**** **** **** 4242</p>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-neutral-500 text-xs uppercase font-bold tracking-wider mb-1">Son Kullanma</p>
                            <p className="font-mono font-medium text-neutral-800">12/26</p>
                        </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-lime-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                <div className="border-2 border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center p-6 text-neutral-400 hover:border-lime-500 hover:text-lime-600 hover:bg-lime-50/30 transition-all cursor-pointer min-h-[200px]">
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="font-bold">Yeni Kart Ekle</span>
                </div>
            </div>
        </div>
    );
}
