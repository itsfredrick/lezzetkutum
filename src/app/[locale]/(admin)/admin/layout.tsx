import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Utensils, Users, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-white">LezzetKutum<span className="text-lime-500">.Admin</span></h1>
                </div>

                <nav className="flex-1 px-3 space-y-1">
                    <AdminLink href="/admin" icon={LayoutDashboard} label="Genel Bakış" />
                    <AdminLink href="/admin/menu-yonetimi" icon={Utensils} label="Menü Yönetimi" />
                    <AdminLink href="/admin/tarifler" icon={ShoppingBag} label="Tarifler" />
                    <AdminLink href="/admin/siparisler" icon={ShoppingBag} label="Siparişler" />
                    <AdminLink href="/admin/users" icon={Users} label="Kullanıcılar" />
                    <AdminLink href="/admin/ayarlar" icon={Settings} label="Ayarlar" />
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-slate-800">
                        <LogOut className="w-4 h-4 mr-2" /> Çıkış Yap
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}

function AdminLink({ href, icon: Icon, label }: { href: string, icon: React.ComponentType<{ className?: string }>, label: string }) {
    return (
        <Link href={href} className="flex items-center px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Icon className="w-5 h-5 mr-3" />
            {label}
        </Link>
    )
}
