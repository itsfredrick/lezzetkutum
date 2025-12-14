"use client";

import { FunnelLayout } from "@/components/layout/FunnelLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ChevronRight, ArrowRight, Lock, CreditCard, Wallet, BadgeCheck, ShieldCheck, Info } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFunnelStore } from "@/store/funnel-store";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { createOrder } from "@/app/actions/orders";
import { Prisma } from "@prisma/client";

type MenuWeekWithRecipes = Prisma.MenuWeekGetPayload<{
    include: {
        recipes: {
            include: {
                recipe: true
            }
        }
    }
}>;

interface CheckoutFormProps {
    menuWeek: MenuWeekWithRecipes | null;
}

export function CheckoutForm({ menuWeek }: CheckoutFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { deliveryDetails, menuSelection, planConfig, resetFunnel } = useFunnelStore();

    const addressString = `${deliveryDetails.neighborhood} ${deliveryDetails.addressDetail} ${deliveryDetails.district}/${deliveryDetails.city}`;

    const recipes = useMemo(() => menuWeek?.recipes.map(mr => mr.recipe) || [], [menuWeek]);

    // Calculate Totals - Using estimated price for MVP
    const pricePerServing = 89.90;
    const subTotal = (planConfig.personCount * planConfig.recipeCount * pricePerServing);

    // Check if we have dynamic pricing per recipe later. 
    // For now, subtotal is flat. `menuSelection` items don't store price.

    const shipping = 0;
    const discount = 0;
    const total = subTotal + shipping - discount;

    const handleCheckout = async () => {
        setIsSubmitting(true);
        try {
            // Validate
            if (!deliveryDetails.firstName || !deliveryDetails.phone) {
                toast.error("Lütfen teslimat bilgilerini eksiksiz doldurun.");
                setIsSubmitting(false);
                return;
            }

            const result = await createOrder({
                userEmail: "guest@example.com", // TODO: Get from Auth or Input
                planId: "default-plan", // TODO: Get from Store
                menuWeekId: menuWeek?.id || undefined,
                recipeIds: menuSelection.map(s => s.id),
                totalAmount: total,
                deliveryDate: new Date(), // Mock date
                address: {
                    city: deliveryDetails.city,
                    district: deliveryDetails.district,
                    fullAddress: addressString,
                    title: "Ev",
                    zipCode: "34000"
                }
            });

            if (result.success) {
                toast.success("Sipariş başarıyla oluşturuldu!");
                resetFunnel();
                router.push('/order-confirmed');
            } else {
                toast.error(result.error || "Bir hata oluştu.");
            }
        } catch (e) {
            toast.error("Network error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FunnelLayout>
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-neutral-200">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center"><BadgeCheck className="w-4 h-4" /></div>
                            <span className="font-bold text-green-700">Teslimat</span>
                        </div>
                        <div className="flex-1 text-center font-medium text-neutral-900 mx-4">
                            {addressString}
                        </div>
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">Düzenle</Button>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6">Ödeme Yöntemi</h2>

                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                            {/* Tabs */}
                            <div className="flex border-b border-neutral-200">
                                <button className="flex-1 py-4 text-center font-bold text-neutral-900 border-b-2 border-green-500 bg-green-50/50 flex items-center justify-center gap-2">
                                    <CreditCard className="w-5 h-5" /> Kredi / Banka Kartı
                                </button>
                                <button className="flex-1 py-4 text-center font-medium text-neutral-500 hover:bg-neutral-50 flex items-center justify-center gap-2 transition-colors">
                                    <Wallet className="w-5 h-5" /> Dijital Cüzdan
                                </button>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <Label>Kart Üzerindeki İsim</Label>
                                    <Input placeholder="Ad Soyad" className="h-12 bg-neutral-50" />
                                </div>

                                <div className="space-y-2">
                                    <Label>Kart Numarası</Label>
                                    <div className="relative">
                                        <Input placeholder="0000 0000 0000 0000" className="h-12 bg-white pl-12 font-mono text-lg" />
                                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
                                            <CreditCard className="w-5 h-5 opacity-50" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Son Kullanma Tarihi</Label>
                                        <Input placeholder="AA/YY" className="h-12 bg-white text-center" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-1">CVV / CVC <Info size={12} className="text-neutral-400" /></Label>
                                        <Input type="password" placeholder="***" className="h-12 bg-white text-center tracking-widest" />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 pt-2">
                                    <Checkbox id="save-card" />
                                    <Label htmlFor="save-card" className="font-normal text-neutral-600">Kartımı bir sonraki alışveriş için sakla</Label>
                                </div>
                            </div>

                            <div className="bg-neutral-50 p-3 text-center text-xs text-neutral-500 flex items-center justify-center gap-2 border-t border-neutral-100">
                                <Lock className="w-3 h-3" /> 256-Bit SSL ile güvenli ödeme
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-neutral-200">
                        <h3 className="font-bold mb-4">Sözleşmeler ve Onaylar</h3>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-2">
                                <Checkbox id="terms1" />
                                <Label htmlFor="terms1" className="font-normal text-xs text-neutral-600 leading-tight">
                                    <span className="underline cursor-pointer">Mesafeli Satış Sözleşmesi</span>'ni ve <span className="underline cursor-pointer">Ön Bilgilendirme Formu</span>'nu okudum, onaylıyorum.
                                </Label>
                            </div>
                            <div className="flex items-start space-x-2">
                                <Checkbox id="terms2" />
                                <Label htmlFor="terms2" className="font-normal text-xs text-neutral-600 leading-tight">
                                    <span className="underline cursor-pointer">KVKK Aydınlatma Metni</span> kapsamında kişisel verilerimin işlenmesini kabul ediyorum.
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Order Summary */}
                <div className="lg:w-[380px]">
                    <div className="sticky top-24">
                        <Card className="bg-white p-6 rounded-2xl shadow-lg border border-neutral-100">
                            <h3 className="font-bold text-xl mb-1">Sipariş Özeti</h3>
                            <p className="text-sm text-neutral-500 mb-6">{planConfig.personCount} kişilik / {planConfig.recipeCount} öğün planı</p>

                            <div className="space-y-4 mb-6">
                                {menuSelection.map(item => {
                                    const recipe = recipes.find(r => r.id === item.id);
                                    if (!recipe) return null;
                                    return (
                                        <div key={item.id} className="flex gap-3 py-3 border-b border-neutral-100">
                                            {recipe.imageUrl && <Image src={recipe.imageUrl} alt={recipe.name} width={64} height={64} className="w-16 h-16 rounded-lg object-cover" />}
                                            <div className="flex-1">
                                                <div className="font-bold text-sm">{recipe.name}</div>
                                                <div className="text-xs text-neutral-500">{item.quantity} Porsiyon</div>
                                            </div>
                                            {/* Price per recipe is not tracked individually in this model, so omitting or showing plan part */}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mb-6">
                                <Label className="text-xs font-bold mb-2 block">İndirim Kodu</Label>
                                <div className="flex gap-2">
                                    <Input placeholder="KODU GİRİNİZ" className="bg-neutral-50" />
                                    <Button className="bg-neutral-800 text-white">Uygula</Button>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6 pt-6 border-t border-dashed border-neutral-200">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-500">Ara Toplam</span>
                                    <span className="font-medium">{subTotal.toFixed(2)} TL</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-500">Kargo</span>
                                    <span className="font-bold text-green-600">Ücretsiz</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-green-600 font-medium">İndirim (YAZ10)</span>
                                    <span className="font-bold text-green-600">-{discount.toFixed(2)} TL</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-6">
                                <span className="font-bold text-lg">Genel Toplam</span>
                                <span className="font-bold text-3xl tracking-tight text-neutral-900">{total.toFixed(2)} TL</span>
                            </div>

                            <Button
                                size="lg"
                                className="w-full h-14 bg-lime-500 hover:bg-lime-600 text-neutral-900 font-extrabold text-lg shadow-xl shadow-lime-200 rounded-xl"
                                onClick={handleCheckout}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "İşleniyor..." : (
                                    <>Siparişi Tamamla <ArrowRight className="w-5 h-5 ml-2" /></>
                                )}
                            </Button>

                            <p className="text-[10px] text-center mt-3 text-neutral-400 leading-tight">
                                "Siparişi Tamamla" butonuna basarak, Mesafeli Satış Sözleşmesi'ni kabul etmiş olursunuz.
                            </p>
                        </Card>

                        <div className="mt-6 bg-white p-4 rounded-xl border border-neutral-200 flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Yardıma mı ihtiyacınız var?</p>
                                <p className="text-xs text-neutral-500">0850 123 45 67 no'lu hattan bize ulaşın.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FunnelLayout>
    );
}
