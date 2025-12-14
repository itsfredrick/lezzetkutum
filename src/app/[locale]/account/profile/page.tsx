"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
    return (
        <div className="space-y-8 max-w-2xl">
            <div className="space-y-1">
                <h1 className="text-3xl font-extrabold text-neutral-900">Profil Bilgileri</h1>
                <p className="text-neutral-500">Kişisel bilgilerinizi buradan güncelleyebilirsiniz.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">Ad</Label>
                        <Input id="firstName" defaultValue="Elif" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Soyad</Label>
                        <Input id="lastName" defaultValue="Yılmaz" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">E-posta Adresi</Label>
                    <Input id="email" defaultValue="elif.yilmaz@example.com" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Telefon Numarası</Label>
                    <Input id="phone" defaultValue="+90 555 123 45 67" />
                </div>

                <div className="pt-4 flex justify-end">
                    <Button className="bg-lime-500 hover:bg-lime-600 text-white font-bold px-8">Değişiklikleri Kaydet</Button>
                </div>
            </div>
        </div>
    );
}
