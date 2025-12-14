"use client";

import { useFunnelStore } from "@/store/funnel-store";
import { FunnelLayout } from "@/components/layout/FunnelLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Users, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Plan } from "@prisma/client";

interface PlanSelectionProps {
    plans: Plan[];
}

export function PlanSelection({ plans }: PlanSelectionProps) {
    const { planConfig, setPlanConfig } = useFunnelStore();
    const { personCount, recipeCount } = planConfig;

    // Derived active plan
    const activePlan = plans.find(p => p.personCount === personCount && p.mealsPerWeek === recipeCount) || null;

    // Derived values
    // Derived values
    const getPrice = (val: unknown) => {
        if (!val) return 0;
        if (typeof val === 'number') return val;
        if (typeof val === 'string') return Number(val);
        // Check if it looks like a Prisma Decimal or object with toNumber
        if (typeof val === 'object' && val !== null && 'toNumber' in val) {
            const decimal = val as { toNumber: () => number };
            if (typeof decimal.toNumber === 'function') {
                return decimal.toNumber();
            }
        }
        return Number(val);
    };

    const price = getPrice(activePlan?.pricePerServingTRY);
    const boxPrice = activePlan ? (price * personCount * recipeCount) : 0;
    const discount = 150.00;
    const shipping = getPrice(activePlan?.deliveryFeeTRY);
    const total = Math.max(0, boxPrice - discount + shipping);
    const pricePerServing = price;

    const updatePersonCount = (count: 2 | 4) => {
        setPlanConfig({ personCount: count });
    };

    const updateRecipeCount = (count: 3 | 4 | 5) => {
        setPlanConfig({ recipeCount: count });
    };

    return (
        <FunnelLayout>
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                {/* Left: Configuration */}
                <div className="flex-1 space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Sizin İçin En Uygun <span className="text-green-600">Planı Seçin</span></h1>
                        <p className="text-neutral-600">Kişi sayısı ve haftalık yemek sıklığını belirleyin, mutfağınızda şef siz olun.</p>
                    </div>

                    {/* Step 1: Person Count */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs">1</span>
                            Kaç kişisiniz?
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[2, 4].map((count) => (
                                <div
                                    key={count}
                                    onClick={() => updatePersonCount(count as 2 | 4)}
                                    className={cn(
                                        "relative cursor-pointer border-2 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 transition-all hover:border-green-300",
                                        personCount === count ? "border-green-500 bg-green-50/50" : "border-neutral-100 bg-neutral-50"
                                    )}
                                >
                                    {personCount === count && (
                                        <div className="absolute top-3 right-3 text-green-600">
                                            <div className="bg-green-500 text-white rounded-full p-0.5"><Check className="w-3 h-3" /></div>
                                        </div>
                                    )}
                                    <Users className={cn("w-8 h-8", personCount === count ? "text-green-600" : "text-neutral-400")} />
                                    <span className="font-bold text-lg">{count} Kişi</span>
                                    <span className="text-xs text-neutral-500">{count === 2 ? 'Çiftler için ideal' : 'Aile boyu lezzet'}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: Recipe Count */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs">2</span>
                            Haftada kaç tarif istersiniz?
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            {[3, 4, 5].map((count) => {
                                // Check if this combination exists in DB plans
                                const isAvailable = plans.some(p => p.personCount === personCount && p.mealsPerWeek === count);

                                return (
                                    <div
                                        key={count}
                                        onClick={() => isAvailable && updateRecipeCount(count as 3 | 4 | 5)}
                                        className={cn(
                                            "relative border-2 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 transition-all",
                                            !isAvailable ? "opacity-50 cursor-not-allowed border-neutral-100 bg-neutral-50" : "cursor-pointer hover:border-green-300",
                                            isAvailable && recipeCount === count ? "border-green-500 bg-green-50/50" : "border-neutral-100 bg-neutral-50"
                                        )}
                                    >
                                        {count === 4 && isAvailable && (
                                            <Badge className="absolute -top-3 bg-green-500 hover:bg-green-600 text-white border-none px-2 py-0.5 text-[10px] uppercase">
                                                En Popüler
                                            </Badge>
                                        )}
                                        <span className="font-bold text-2xl">{count}</span>
                                        <span className="text-xs text-neutral-500">Tarif</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Value Props */}
                    <div className="bg-white rounded-3xl overflow-hidden border border-neutral-100">
                        <div className="p-4 bg-neutral-50 border-b font-bold text-neutral-800">Neden LezzetKutum?</div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">Yemek Planlama Süresi</span>
                                <span className="font-bold text-green-600">0 Dakika</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">Gıda İsrafı</span>
                                <span className="font-bold text-green-600">Yok (Tam Ölçü)</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">Teslimat</span>
                                <span className="font-bold text-green-600">Kapıya Kadar</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Summary Card (Sticky) */}
                <div className="lg:w-[380px]">
                    <div className="sticky top-24">
                        <Card className="bg-black text-white border-none shadow-2xl rounded-2xl overflow-hidden relative">
                            {/* Header */}
                            <div className="bg-neutral-800/50 p-6 text-center border-b border-white/10">
                                <h3 className="font-bold text-xl">Sipariş Özeti</h3>
                                <p className="text-sm text-neutral-400">{personCount} Kişi, Haftada {recipeCount} Tarif</p>
                            </div>

                            {/* Breakdown */}
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-300">Porsiyon Başına</span>
                                    <span className="font-bold">{pricePerServing.toFixed(2)} TL</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-300">Kutu Fiyatı</span>
                                    <span className="line-through text-neutral-500">{boxPrice.toFixed(2)} TL</span>
                                </div>
                                <div className="flex justify-between text-sm text-green-400">
                                    <span>İlk Kutu İndirimi</span>
                                    <span>-{discount.toFixed(2)} TL</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-300">Kargo</span>
                                    {shipping === 0 ?
                                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-none">ÜCRETSİZ</Badge>
                                        : <span>{shipping.toFixed(2)} TL</span>
                                    }
                                </div>

                                <div className="h-px bg-white/10 my-4" />

                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-xl">Toplam</span>
                                    <div className="text-right">
                                        <div className="font-bold text-3xl">{total.toFixed(2)} TL</div>
                                        <div className="text-xs text-neutral-500">KDV Dahil</div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="p-6 pt-0">
                                <Button
                                    className="w-full h-14 text-lg font-bold bg-lime-600 hover:bg-lime-700 text-white rounded-xl shadow-lg shadow-lime-900/20"
                                    asChild={!!activePlan}
                                    disabled={!activePlan}
                                >
                                    {activePlan ? (
                                        <Link href="/kutunu-olustur/menu">
                                            Planı Seç <ArrowRight className="w-5 h-5 ml-2" />
                                        </Link>
                                    ) : (
                                        <span>Plan Bulunamadı</span>
                                    )}
                                </Button>

                                <div className="flex justify-center gap-6 mt-4 opacity-50 text-[10px] text-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <Lock className="w-3 h-3" /> Güvenli Ödeme
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <ShieldCheck className="w-3 h-3" /> Kolay İptal
                                    </div>
                                </div>
                            </div>

                            <div className="bg-yellow-500/10 p-2 text-center text-xs text-yellow-500 font-medium">
                                ⏳ Bu fiyatlar 24 saat geçerlidir!
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </FunnelLayout>
    );
}
