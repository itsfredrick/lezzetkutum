import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
    return (
        <header className="border-b bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-bold text-2xl text-primary">LezzetKutum</Link>

                {/* Nav Links */}
                <nav className="hidden md:flex gap-6">
                    <Link href="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors">Nasıl Çalışır?</Link>
                    <Link href="/menu" className="text-sm font-medium hover:text-primary transition-colors">Menü</Link>
                    <Link href="/plans-pricing" className="text-sm font-medium hover:text-primary transition-colors">Paketler</Link>
                    <Link href="/recipes" className="text-sm font-medium hover:text-primary transition-colors">Tarifler</Link>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2 lg:gap-4">
                    <LanguageSwitcher />

                    {/* Demo: Show generic 'Hesabım' to simulate logged in user, alongside Login for testing */}
                    <Button variant="ghost" size="sm" asChild className="hidden lg:flex">
                        <Link href="/account">Hesabım</Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/auth/login">Giriş Yap</Link>
                    </Button>
                    <Button size="sm" asChild className="font-bold">
                        <Link href="/select-plan">Kutunu Oluştur</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
