"use client";

import { FunnelLayout } from "@/components/layout/FunnelLayout";
import { useFunnelStore } from "@/store/funnel-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, CheckCircle, Clock, Flame, ChevronRight, Sparkles, Trash2, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

// Defines the shape of the data returned by the server action
type MenuWeekWithRecipes = Prisma.MenuWeekGetPayload<{
    include: {
        recipes: {
            include: {
                recipe: true
            }
        }
    }
}>;

interface RecipeSelectionProps {
    menuWeek: MenuWeekWithRecipes | null;
}

export function RecipeSelection({ menuWeek }: RecipeSelectionProps) {
    const {
        planConfig,
        menuSelection,
        addMenuItem,
        removeMenuItem
    } = useFunnelStore();

    const maxRecipes = planConfig.recipeCount;
    const currentCount = menuSelection.reduce((acc, curr) => acc + curr.quantity, 0);

    // Flatten recipes for easier access
    const recipes = menuWeek?.recipes.map(mr => mr.recipe) || [];

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

    // Calculate approx price (Mocking Plan Price per serving as ~90TL if not stored)
    // In a real app, we should store the selected Plan Price in the store.
    const pricePerServing = 89.90;
    const totalPrice = currentCount * pricePerServing * planConfig.personCount;

    return (
        <FunnelLayout>
            <div className="flex flex-col lg:flex-row gap-8 max-w-[1440px] mx-auto">
                <div className="flex-1">
                    {/* Header Info */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Haftanın Menüsü</h1>
                        <p className="text-neutral-600">
                            {menuWeek ? `${menuWeek.weekNumber}. Hafta Menüsü` : "Geçerli menü bulunamadı."}
                        </p>
                        <p className="text-neutral-600 mt-2">
                            4 kişilik planın için lütfen <span className="font-bold text-green-600">{Math.max(0, maxRecipes - currentCount)} yemek</span> daha seç.
                        </p>

                        <div className="flex gap-2 overflow-x-auto mt-6 pb-2">
                            <Button variant="default" size="sm" className="rounded-full bg-neutral-900 text-white">Tümü</Button>
                            {/* Filter buttons could be wired up to local state filter */}
                            <Button variant="secondary" size="sm" className="rounded-full">Vejetaryen</Button>
                            <Button variant="secondary" size="sm" className="rounded-full">Hızlı Hazırlık</Button>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {recipes.map((recipe) => {
                            const selection = menuSelection.find(s => s.id === recipe.id);
                            const qty = selection?.quantity || 0;

                            return (
                                <Card key={recipe.id} className={cn("overflow-hidden border-2 transition-all hover:shadow-md", qty > 0 ? "border-lime-500" : "border-transparent")}>
                                    <div className="aspect-[4/3] relative">
                                        {recipe.imageUrl ? (
                                            <Image src={recipe.imageUrl} alt={recipe.name} fill className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400">Resim Yok</div>
                                        )}

                                        <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
                                            {/* Example mapping tags from properties */}
                                            {recipe.difficulty === 'EASY' && <Badge className="bg-white text-neutral-900 hover:bg-white">Kolay</Badge>}
                                            {recipe.proteinType === 'VEGAN' && <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Vegan</Badge>}
                                            {recipe.spiceLevel !== 'NONE' && <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Acı</Badge>}
                                        </div>

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
                                        <p className="text-sm text-neutral-500 mb-4 line-clamp-2">{recipe.description}</p>

                                        <div className="flex items-center gap-4 text-xs text-neutral-400 font-medium mb-6">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.timeMinutes} dk</span>
                                            {recipe.calories && <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {recipe.calories} kcal</span>}
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
                                style={{ width: `${(Math.min(currentCount / maxRecipes, 1)) * 100}%` }}
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
                                    const recipe = recipes.find(r => r.id === item.id);
                                    if (!recipe) return null;
                                    return (
                                        <div key={item.id} className="flex gap-3 items-start group">
                                            {recipe.imageUrl && <Image src={recipe.imageUrl} alt="" width={48} height={48} className="w-12 h-12 rounded-lg object-cover" />}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold truncate">{recipe.name}</p>
                                                <p className="text-xs text-neutral-500">{item.quantity} Porsiyon</p>
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
                                <div className="text-sm text-neutral-500">Tahmini Toplam</div>
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
