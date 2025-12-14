"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Facebook, Github } from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock API Call
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Hesabınız oluşturuldu! Giriş yapabilirsiniz.");
            router.push('/auth/login');
        }, 1500);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left: Register Form */}
            <div className="flex items-center justify-center p-8 lg:p-12 relative bg-white">
                <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-neutral-500 hover:text-neutral-900 font-medium">
                    <ArrowLeft className="w-4 h-4" /> Anasayfaya Dön
                </Link>

                <div className="w-full max-w-sm space-y-8">
                    <div className="space-y-2 text-center lg:text-left">
                        <h1 className="text-3xl font-extrabold text-neutral-900">LezzetKutum'a Katıl</h1>
                        <p className="text-neutral-500">İlk kutunuzda %30 indirim fırsatını kaçırmayın.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Ad</Label>
                                <Input id="firstName" placeholder="Adınız" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Soyad</Label>
                                <Input id="lastName" placeholder="Soyadınız" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">E-posta Adresi</Label>
                            <Input id="email" placeholder="ornek@email.com" type="email" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Şifre</Label>
                            <Input id="password" type="password" required />
                        </div>

                        <Button type="submit" disabled={isLoading} className="w-full font-bold h-11 text-base">
                            {isLoading ? "Kaydediliyor..." : "Ücretsiz Üye Ol"}
                        </Button>
                        <p className="text-xs text-center text-neutral-500 px-4">
                            Kayıt olarak <Link href="/terms" className="underline">Kullanım Koşulları</Link> ve <Link href="/privacy" className="underline">Gizlilik Politikası</Link>'nı kabul etmiş olursunuz.
                        </p>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-neutral-400 font-bold">veya şununla kayıt ol</span>
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
                        Zaten hesabınız var mı?{" "}
                        <Link href="/auth/login" className="font-bold text-lime-600 hover:underline">
                            Giriş Yap
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right: Feature Image */}
            <div className="hidden lg:block relative bg-lime-900">
                <img src="/assets/images/placeholder_recipe_select_2.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
                <div className="relative h-full flex flex-col justify-end p-16 text-white space-y-4 z-10">
                    <h2 className="text-4xl font-bold leading-tight">
                        "Sağlıklı beslenmek artık çok kolay ve lezzetli."
                    </h2>
                    <p className="opacity-80">Binlerce mutlu üye arasına katılın.</p>
                </div>
            </div>
        </div>
    );
}
