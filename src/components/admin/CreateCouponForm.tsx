"use client";

import { useActionState } from "react";
import { createCoupon } from "@/app/actions/coupon-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialState = {
    success: false,
    message: ''
};

export default function CreateCouponForm() {
    const [state, formAction] = useActionState(createCoupon, initialState);

    return (
        <form action={formAction} className="space-y-4 pt-4">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <Label htmlFor="code">Kupon Kodu</Label>
                    <Input id="code" name="code" placeholder="Örn: YAZ2024" required className="uppercase" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="discountType">İndirim Tipi</Label>
                        <Select name="discountType" defaultValue="PERCENT">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PERCENT">Yüzde (%)</SelectItem>
                                <SelectItem value="FIXED">Sabit Tutar (₺)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="value">Değer</Label>
                        <Input id="value" name="value" type="number" placeholder="20" required />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="minBasket">Min. Sepet Tutarı</Label>
                        <Input id="minBasket" name="minBasket" type="number" defaultValue="0" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="maxUsage">Max. Kullanım</Label>
                        <Input id="maxUsage" name="maxUsage" type="number" defaultValue="100" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="expiresAt">Son Kullanma Tarihi</Label>
                    <Input id="expiresAt" name="expiresAt" type="date" required />
                </div>
            </div>

            {state.message && (
                <div className={`text-sm p-3 rounded-md ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {state.message}
                </div>
            )}

            <Button type="submit" className="w-full">Oluştur</Button>
        </form>
    );
}
