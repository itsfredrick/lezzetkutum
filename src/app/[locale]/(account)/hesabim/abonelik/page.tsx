
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Pause, XCircle, Calendar, Truck } from "lucide-react";

const prisma = new PrismaClient();

async function getUserSubscription(email: string) {
    return await prisma.user.findUnique({
        where: { email },
        select: {
            subscription: {
                include: { plan: true }
            }
        }
    });
}

export default async function AccountSettingsPage() {
    const session = await auth();
    if (!session?.user?.email) redirect('/auth/login');

    const data = await getUserSubscription(session.user.email);
    const sub = data?.subscription;

    if (!sub) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-bold">Aktif aboneliğiniz bulunmuyor</h2>
                <Button className="mt-4" asChild><a href="/select-plan">Plan Seç</a></Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Abonelik Ayarları</h1>
                <Badge className={sub.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}>
                    {sub.status === 'ACTIVE' ? 'Aktif' : 'Durduruldu'}
                </Badge>
            </div>

            <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Mevcut Plan</h3>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="bg-lime-100 p-3 rounded-lg">
                        <Calendar className="w-6 h-6 text-lime-700" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900">{sub.plan.name}</p>
                        <p className="text-sm text-slate-500">Haftalık teslimat • {sub.deliveryDay} günleri</p>
                    </div>
                    <Button variant="outline" className="ml-auto">Planı Değiştir</Button>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="font-bold text-lg mb-6">Teslimat Tercihleri</h3>

                <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base font-semibold">Haftalık Teslimat</Label>
                            <p className="text-sm text-slate-500">Kutularınız her hafta otomatik olarak oluşturulur.</p>
                        </div>
                        <Switch checked={sub.status === 'ACTIVE'} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base font-semibold">SMS Bildirimleri</Label>
                            <p className="text-sm text-slate-500">Kargonuz yola çıktığında haberdar olun.</p>
                        </div>
                        <Switch checked={true} />
                    </div>
                </div>
            </Card>

            <Card className="p-6 border-red-100 bg-red-50/10">
                <h3 className="font-bold text-lg text-red-700 mb-4">Tehlikeli Bölge</h3>
                <div className="flex gap-4">
                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                        <Pause className="w-4 h-4 mr-2" /> Aboneliği Duraklat
                    </Button>
                    <Button variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                        <XCircle className="w-4 h-4 mr-2" /> İptal Et
                    </Button>
                </div>
            </Card>
        </div>
    );
}
