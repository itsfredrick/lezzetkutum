"use client";

import { FunnelLayout } from "@/components/layout/FunnelLayout";
import { useFunnelStore } from "@/store/funnel-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Minus, Info, Check, ArrowRight, CheckCircle, Clock, Flame, ChevronRight, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { RECIPES } from "@/lib/mock-data";


export default function SelectRecipesPage() {
    const {
        planConfig,
        menuSelection,
        addMenuItem,
        removeMenuItem
    } = useFunnelStore();

    const maxRecipes = planConfig.recipeCount;
    const currentCount = menuSelection.reduce((acc, curr) => acc + curr.quantity, 0);

    const handleAdd = (id: string) => {
        if (currentCount >= maxRecipes) {
            toast.error("Kutunuz doldu! Başka tarif eklemek için mevcutlardan çıkarın.");
            return;
        }
        addMenuItem(id, maxRecipes);
        toast.success("Tarif kutuya eklendi");
    };

    const handleRemove = (id: string) => {
        removeMenuItem(id);
    };

    const totalPrice = menuSelection.reduce((acc, item) => {
        const recipe = RECIPES.find(r => r.id === item.id);
        return acc + (recipe ? recipe.price * item.quantity : 0);
    }, 0);

    return (
        <FunnelLayout>
            <div className="flex flex-col lg:flex-row gap-8 max-w-[1440px] mx-auto">
                <div className="flex-1">
                    {/* Header Info */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Haftanın Menüsü</h1>
                        <p className="text-neutral-600">4 kişilik planın için lütfen <span className="font-bold text-green-600">{maxRecipes - currentCount} yemek</span> daha seç.</p>

                        <div className="flex gap-2 overflow-x-auto mt-6 pb-2">
                            <Button variant="default" size="sm" className="rounded-full bg-neutral-900 text-white">Tümü</Button>
                            <Button variant="secondary" size="sm" className="rounded-full">Vejetaryen</Button>
                            <Button variant="secondary" size="sm" className="rounded-full">Hızlı Hazırlık</Button>
                            <Button variant="secondary" size="sm" className="rounded-full">Proteini Bol</Button>
                            <Button variant="secondary" size="sm" className="rounded-full">Düşük Kalori</Button>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {RECIPES.map((recipe) => {
                            const selection = menuSelection.find(s => s.id === recipe.id);
                            const qty = selection?.quantity || 0;

                            return (
                                <Card key={recipe.id} className={cn("overflow-hidden border-2 transition-all hover:shadow-md", qty > 0 ? "border-lime-500" : "border-transparent")}>
                                    <div className="aspect-[4/3] relative">
                                        <Image src={recipe.image} alt={recipe.name} fill className="w-full h-full object-cover" />
                                        {recipe.tags.map((tag, i) => (
                                            <Badge key={i} className="absolute top-3 left-3 bg-white text-neutral-900 hover:bg-white shadow-sm font-bold">
                                                {tag}
                                            </Badge>
                                        ))}
                                        {qty > 0 && (
                                            <div className="absolute inset-0 bg-lime-500/20 flex items-center justify-center">
                                                <div className="bg-white rounded-full p-2 text-lime-600 shadow-xl scale-125 animate-in zoom-in">
                                                    <CheckCircle className="w-8 h-8 fill-lime-100" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg leading-tight mb-1">{recipe.name}</h3>
                                        <p className="text-sm text-neutral-500 mb-4">{recipe.description}</p>

                                        <div className="flex items-center gap-4 text-xs text-neutral-400 font-medium mb-6">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.time}</span>
                                            <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {recipe.calories} kcal</span>
                                        </div>

                                        {qty > 0 ? (
                                            <div className="flex items-center justify-between bg-lime-50 rounded-lg p-1">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-lime-700 hover:bg-lime-200" onClick={() => handleRemove(recipe.id)}>-</Button>
                                                <span className="font-bold text-lime-900">{qty}</span>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-lime-700 hover:bg-lime-200" onClick={() => handleAdd(recipe.id)}>+</Button>
                                            </div>
                                        ) : (
                                            <Button className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold" onClick={() => handleAdd(recipe.id)}>
                                                <Plus className="w-4 h-4 mr-2" /> Ekle
                                            </Button>
                                        )}
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-[320px] shrink-0">
                    <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-neutral-100 p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg">Kutun</h3>
                            <span className={cn("text-sm font-bold", currentCount === maxRecipes ? "text-green-600" : "text-orange-500")}>
                                {currentCount}/{maxRecipes} Seçildi
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2 bg-neutral-100 rounded-full mb-6 overflow-hidden">
                            <div
                                className={cn("h-full transition-all duration-500 rounded-full", currentCount === maxRecipes ? "bg-green-500" : "bg-lime-500")}
                                style={{ width: `${(currentCount / maxRecipes) * 100}%` }}
                            />
                        </div>



                        {menuSelection.length === 0 ? (
                            <div className="text-center py-8 border-2 border-dashed border-neutral-100 rounded-xl">
                                <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-3 text-neutral-300">
                                    <Plus className="w-6 h-6" />
                                </div>
                                <p className="text-sm text-neutral-400">Henüz tarif seçmediniz.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 mb-6">
                                {menuSelection.map((item) => {
                                    const recipe = RECIPES.find(r => r.id === item.id);
                                    if (!recipe) return null;
                                    return (
                                        <div key={item.id} className="flex gap-3 items-start group">
                                            <Image src={recipe.image} alt="" width={48} height={48} className="w-12 h-12 rounded-lg object-cover" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold truncate">{recipe.name}</p>
                                                <p className="text-xs text-neutral-500">{item.quantity} Porsiyon</p>
                                                <div className="text-xs font-semibold text-lime-700">{recipe.price} TL</div>
                                            </div>
                                            <Button size="icon" variant="ghost" className="h-6 w-6 text-neutral-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleRemove(item.id)}>
                                                <Trash2 className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Summary Footer */}
                        <div className="space-y-4 mt-6 pt-6 border-t">
                            <div className="flex justify-between items-center bg-neutral-50 p-3 rounded-lg border border-dashed border-neutral-200">
                                <div className="text-sm text-neutral-500">Ara Toplam</div>
                                <div className="font-bold text-lg">{totalPrice.toFixed(2)} TL</div>
                            </div>

                            <Button
                                className="w-full h-12 font-bold text-lg bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50"
                                disabled={currentCount < maxRecipes}
                                asChild={currentCount >= maxRecipes}
                            >
                                {currentCount >= maxRecipes ? (
                                    <Link href="/delivery-schedule">
                                        Teslimatını Seç <ChevronRight className="w-4 h-4 ml-2" />
                                    </Link>
                                ) : (
                                    <span>Seçimi Tamamla</span>
                                )}
                            </Button>

                            {currentCount < maxRecipes && (
                                <Button variant="outline" className="w-full border-lime-500 text-lime-600 hover:bg-lime-50 mt-2" onClick={() => toast.info("Otomatik doldurma yakında eklenecek!")}>
                                    <Sparkles className="w-4 h-4 mr-2" /> Şefin Seçimiyle Doldur
                                </Button>
                            )}
                        </div>

                        <div className="mt-4 bg-lime-50 p-3 rounded-lg flex gap-3 items-start">
                            <div className="bg-white p-1 rounded-full shadow-sm">
                                <Info className="w-4 h-4 text-lime-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-lime-800">Yardım mı lazım?</p>
                                <p className="text-[10px] text-lime-600">Müşteri temsilcimizle görüşün.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FunnelLayout>
    );
}
