"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Facebook, Github, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock API Call
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");
            router.push('/account');
        }, 1500);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left: Login Form */}
            <div className="flex items-center justify-center p-8 lg:p-12 relative bg-white">
                <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-neutral-500 hover:text-neutral-900 font-medium">
                    <ArrowLeft className="w-4 h-4" /> Anasayfaya Dön
                </Link>

                <div className="w-full max-w-sm space-y-8">
                    <div className="space-y-2 text-center lg:text-left">
                        <h1 className="text-3xl font-extrabold text-neutral-900">Tekrar Hoşgeldiniz</h1>
                        <p className="text-neutral-500">Lezzet dolu dünyanıza giriş yapın.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">E-posta Adresi</Label>
                            <Input id="email" placeholder="ornek@email.com" type="email" required />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password">Şifre</Label>
                                <Link href="#" className="text-xs font-bold text-lime-600 hover:underline">Şifremi Unuttum</Link>
                            </div>
                            <Input id="password" type="password" required />
                        </div>

                        <Button type="submit" disabled={isLoading} className="w-full font-bold h-11 text-base">
                            {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-neutral-400 font-bold">veya şununla devam et</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-11 font-bold">
                            <Github className="w-4 h-4 mr-2" /> GitHub
                        </Button>
                        <Button variant="outline" className="h-11 font-bold">
                            <Facebook className="w-4 h-4 mr-2 text-blue-600" /> Facebook
                        </Button>
                    </div>

                    <p className="text-center text-sm text-neutral-500">
                        Hesabınız yok mu?{" "}
                        <Link href="/auth/register" className="font-bold text-lime-600 hover:underline">
                            Hemen Kayıt Ol
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right: Feature Image */}
            <div className="hidden lg:block relative bg-lime-900">
                <Image
                    src="/assets/images/placeholder_recipe_select_1.jpg"
                    alt="Cooking background"
                    fill
                    className="object-cover opacity-60 mix-blend-overlay"
                    priority
                />
                <div className="relative h-full flex flex-col justify-end p-16 text-white space-y-4 z-10">
                    <h2 className="text-4xl font-bold leading-tight">
                        "En taze malzemelerle yemek pişirmek hiç bu kadar keyifli olmamıştı."
                    </h2>
                    <p className="opacity-80">Elif Yılmaz, Gurme Üye</p>
                </div>
            </div>
        </div>
    );
}
