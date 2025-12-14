
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight">Sistem Ayarları</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Genel Kurallar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Varsayılan Kesim Süresi (Gün)</Label>
                            <Input type="number" defaultValue="4" />
                            <p className="text-xs text-neutral-500">Teslimattan kaç gün önce sipariş kilitlensin?</p>
                        </div>
                        <div className="space-y-2">
                            <Label>KDV Oranı (%)</Label>
                            <Input type="number" defaultValue="1" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button>Kaydet</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>İletişim Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label>Destek E-posta</Label>
                            <Input defaultValue="destek@lezzetkutum.com" />
                        </div>
                        <div className="space-y-2">
                            <Label>WhatsApp Numarası</Label>
                            <Input defaultValue="+90 555 123 45 67" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button>Kaydet</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-red-600">Tehlikeli Bölge</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-100 bg-red-50 rounded-lg">
                        <div>
                            <h4 className="font-bold text-red-900">Bakım Modu</h4>
                            <p className="text-sm text-red-700">Siteyi tüm kullanıcılara kapatır.</p>
                        </div>
                        <Button variant="destructive">Aktifleştir</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
