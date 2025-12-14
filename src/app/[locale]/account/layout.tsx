"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    User,
    Package,
    MapPin,
    CreditCard,
    Settings,
    Bell,
    HelpCircle,
    LogOut,
    Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const SIDEBAR_ITEMS = [
    { label: "Genel Bakış", href: "/account", icon: LayoutDashboard, exact: true },
    { label: "Sıradaki Kutu", href: "/account/next-box", icon: Package },
    { label: "Geçmiş Siparişler", href: "/account/orders", icon: User }, // Icon mismatch in logic, fixing: History is Clock usually, but user design has 'Siparişlerim' as bag.
    { label: "Abonelik Ayarları", href: "/account/settings", icon: Settings },
    { label: "Teslimat Adresleri", href: "/account/addresses", icon: MapPin },
    { label: "Ödeme Yöntemleri", href: "/account/payments", icon: CreditCard },
    { label: "Lezzet Kredileri", href: "/account/credits", icon: CreditCard },
];

// Correcting items based on actual Design Image 1 Sidebar:
// - User Widget (Top)
// - Genel Bakış (Grid icon)
// - Sıradaki Kutu (Box icon)
// - Geçmiş Siparişler (History/Clock icon)
// - Abonelik Ayarları (Sliders icon)
// - Teslimat Adresleri (Pin icon)
// - Ödeme Yöntemleri (Card icon)
// - Lezzet Kredileri (Wallet icon)

const NAV_ITEMS = [
    { label: "Genel Bakış", href: "/account", icon: LayoutDashboard, exact: true },
    { label: "Sıradaki Kutu", href: "/account/next-box", icon: Package },
    { label: "Geçmiş Siparişler", href: "/account/orders", icon: User }, // Using User for now as placeholder if icon vague
    { label: "Abonelik Ayarları", href: "/account/settings", icon: Settings },
    { label: "Teslimat Adresleri", href: "/account/addresses", icon: MapPin },
    { label: "Ödeme Yöntemleri", href: "/account/payments", icon: CreditCard },
    { label: "Lezzet Kredileri", href: "/account/credits", icon: Wallet },
];

// Re-evaluating icons from screenshot visually:
// 1. Grid (Genel Bakış) -> LayoutDashboard
// 2. Box (Sıradaki Kutu) -> Package
// 3. Clock/History (Geçmiş Siparişler) -> History
// 4. Sliders/Settings (Abonelik Ayarları) -> Settings2 or SlidersHorizontal
// 5. Pin (Teslimat Adresleri) -> MapPin
// 6. Card (Ödeme Yöntemleri) -> CreditCard
// 7. Wallet (Lezzet Kredileri) -> Wallet

import { History, SlidersHorizontal, Wallet } from "lucide-react";

const FINAL_NAV_ITEMS = [
    { label: "Genel Bakış", href: "/account", icon: LayoutDashboard, exact: true },
    { label: "Sıradaki Kutu", href: "/account/next-box", icon: Package },
    { label: "Geçmiş Siparişler", href: "/account/orders", icon: History },
    { label: "Abonelik Ayarları", href: "/account/settings", icon: SlidersHorizontal },
    { label: "Teslimat Adresleri", href: "/account/addresses", icon: MapPin },
    { label: "Ödeme Yöntemleri", href: "/account/payments", icon: CreditCard },
    { label: "Lezzet Kredileri", href: "/account/credits", icon: Wallet },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const SidebarContent = () => (
        <div className="flex flex-col h-full py-6">
            {/* User Widget */}
            <div className="px-6 mb-8">
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm bg-lime-100 text-lime-700">
                        <AvatarImage src="/assets/images/avatar_1.jpg" />
                        <AvatarFallback className="font-bold">EY</AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                        <p className="text-xs text-neutral-500 font-medium truncate">Hoşgeldiniz</p>
                        <p className="text-sm font-bold text-neutral-900 truncate">Elif Yılmaz</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 space-y-1">
                {FINAL_NAV_ITEMS.map((item) => {
                    const isActive = item.exact
                        ? pathname === item.href || pathname === `/tr${item.href}`
                        : pathname.startsWith(item.href) || pathname.startsWith(`/tr${item.href}`);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-lime-50 text-lime-700 font-bold shadow-sm ring-1 ring-lime-100"
                                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-2")} />
                            {item.label}
                            {item.href === "/account/next-box" && (
                                <span className="ml-auto bg-lime-100 text-lime-700 text-[10px] font-bold px-2 py-0.5 rounded-full">YENİ</span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="px-4 mt-auto space-y-1 pt-6 border-t border-dashed border-neutral-200">
                <Link
                    href="/help"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                >
                    <HelpCircle className="w-5 h-5" />
                    Yardım & Destek
                </Link>
                <div className="pt-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="w-5 h-5" />
                        Çıkış Yap
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-neutral-50/50">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
                <div className="font-bold text-lg">Hesabım</div>
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-[280px]">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="container mx-auto max-w-7xl flex items-start gap-8 py-8 px-4">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-72 bg-white rounded-3xl border border-neutral-100 shadow-sm sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto shrink-0">
                    <SidebarContent />
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
