
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getOrders() {
    return await prisma.order.findMany({
        take: 20,
        orderBy: { createdAt: 'desc' },
        include: { user: true }
    });
}

export default async function AdminOrdersPage() {
    const orders = await getOrders();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Siparişler</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                            <TableHead>Sipariş ID</TableHead>
                            <TableHead>Müşteri</TableHead>
                            <TableHead>Durum</TableHead>
                            <TableHead>Tutar</TableHead>
                            <TableHead>Teslimat Tarihi</TableHead>
                            <TableHead className="text-right">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                                <TableCell>
                                    <div className="font-medium text-slate-900">{order.user.name || order.user.email}</div>
                                    <div className="text-xs text-slate-500">{order.user.email}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="uppercase text-[10px] tracking-wider">
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-bold">₺{Number(order.totalAmount).toFixed(2)}</TableCell>
                                <TableCell>{new Date(order.deliveryDate).toLocaleDateString('tr-TR')}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">Detay</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
