
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, Lock, Unlock, Eye, EyeOff } from "lucide-react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getMenuWeeks() {
    return await prisma.menuWeek.findMany({
        orderBy: [{ year: 'asc' }, { weekNumber: 'asc' }],
        include: { _count: { select: { recipes: true } } }
    });
}

export default async function AdminMenusPage() {
    const weeks = await getMenuWeeks();

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Menü Yönetimi</h1>
                <Button>+ Yeni Hafta Oluştur</Button>
            </div>

            <div className="grid gap-4">
                {weeks.map((week) => (
                    <Card key={week.id} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="bg-slate-100 p-3 rounded-lg text-slate-600 font-bold text-lg w-16 text-center">
                                H{week.weekNumber}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">
                                    {week.weekStartDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })} Haftası
                                </h3>
                                <p className="text-sm text-slate-500">
                                    {week._count.recipes} Tarif Seçili • Kesim Tarihi: {week.cutoffDate.toLocaleDateString('tr-TR')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {week.isPublished ? (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none"><Eye className="w-3 h-3 mr-1" /> Yayında</Badge>
                            ) : (
                                <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200"><EyeOff className="w-3 h-3 mr-1" /> Taslak</Badge>
                            )}

                            {week.isLocked ? (
                                <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none"><Lock className="w-3 h-3 mr-1" /> Kilitli</Badge>
                            ) : (
                                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200"><Unlock className="w-3 h-3 mr-1" /> Açık</Badge>
                            )}

                            <Button variant="outline" size="sm">Düzenle</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
