
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, ChevronRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

async function getUserOrders(email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
        include: { orders: { orderBy: { createdAt: 'desc' }, take: 10 } }
    });
    return user?.orders || [];
}

export default async function AccountOrdersPage() {
    const session = await auth();
    if (!session?.user?.email) {
        redirect('/auth/login');
    }

    const orders = await getUserOrders(session.user.email);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Siparişlerim</h1>

            {orders.length === 0 ? (
                <Card className="p-12 text-center text-slate-500">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Henüz siparişiniz yok</h3>
                    <p className="mb-6">Lezzet dolu kutularımızı keşfetmeye başlayın.</p>
                    <Button asChild>
                        <Link href="/select-plan">Plan Seç</Link>
                    </Button>
                </Card>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Card key={order.id} className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-slate-900">Sipariş #{order.id.slice(0, 8)}</h3>
                                        <Badge variant="secondary" className="uppercase text-[10px] tracking-wider">
                                            {order.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(order.deliveryDate).toLocaleDateString('tr-TR')}</span>
                                        <span className="flex items-center gap-1 font-semibold text-slate-900">₺{Number(order.totalAmount).toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button variant="outline" size="sm">Detaylar</Button>
                                    <Button size="sm" className="bg-lime-600 hover:bg-lime-700">Tekrarla</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
