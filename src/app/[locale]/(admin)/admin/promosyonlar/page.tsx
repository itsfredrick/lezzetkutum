
import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Tag } from "lucide-react";
import CreateCouponForm from "@/components/admin/CreateCouponForm";
import CouponStatusToggle from "@/components/admin/CouponStatusToggle";

const prisma = new PrismaClient();

async function getCoupons() {
    return await prisma.coupon.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export default async function AdminPromotionsPage() {
    const coupons = await getCoupons();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Promosyonlar</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gap-2"><Plus className="w-4 h-4" /> Yeni Kupon</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Yeni Kupon Oluştur</DialogTitle>
                            <DialogDescription>
                                İndirim kodunu ve kurallarını belirleyin.
                            </DialogDescription>
                        </DialogHeader>
                        <CreateCouponForm />
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Aktif Kampanyalar</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Kod</TableHead>
                                <TableHead>Tip</TableHead>
                                <TableHead>Değer</TableHead>
                                <TableHead>Min. Sepet</TableHead>
                                <TableHead>Kullanım</TableHead>
                                <TableHead>Bitiş</TableHead>
                                <TableHead>Durum</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {coupons.map((coupon) => (
                                <TableRow key={coupon.id}>
                                    <TableCell className="font-mono font-bold text-primary flex items-center gap-2">
                                        <Tag className="w-4 h-4" /> {coupon.code}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{coupon.discountType === 'PERCENT' ? 'Yüzde' : 'Sabit'}</Badge>
                                    </TableCell>
                                    <TableCell className="font-bold">
                                        {coupon.discountType === 'PERCENT' ? `%${coupon.value}` : `₺${coupon.value}`}
                                    </TableCell>
                                    <TableCell>₺{Number(coupon.minBasket)}</TableCell>
                                    <TableCell>{coupon.usedCount} / {coupon.maxUsage}</TableCell>
                                    <TableCell>{new Date(coupon.expiresAt).toLocaleDateString("tr-TR")}</TableCell>
                                    <TableCell>
                                        <CouponStatusToggle id={coupon.id} isActive={coupon.isActive} />
                                    </TableCell>
                                </TableRow>
                            ))}
                            {coupons.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-neutral-500">
                                        Henüz hiç kupon oluşturulmamış.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
