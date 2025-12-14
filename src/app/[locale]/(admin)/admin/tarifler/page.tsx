
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Search, Plus, ChefHat } from "lucide-react";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getRecipes() {
    return await prisma.recipe.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export default async function AdminRecipesPage() {
    const recipes = await getRecipes();

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Tarifler</h1>
                <div className="flex gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input placeholder="Tarif ara..." className="pl-9 bg-white" />
                    </div>
                    <Button><Plus className="w-4 h-4 mr-2" /> Yeni Tarif</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recipes.map((recipe) => (
                    <Card key={recipe.id} className="overflow-hidden group">
                        <div className="relative h-48 bg-slate-100">
                            {recipe.imageUrl ? (
                                <Image src={recipe.imageUrl} alt={recipe.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-300">
                                    <ChefHat className="w-12 h-12" />
                                </div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-1">
                                <Badge className={recipe.isPublished ? "bg-green-500/90" : "bg-slate-500/90"}>
                                    {recipe.isPublished ? "Yayında" : "Taslak"}
                                </Badge>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-slate-900 truncate mb-1" title={recipe.name}>{recipe.name}</h3>
                            <div className="flex gap-2 text-xs text-slate-500 mb-4">
                                <span>{recipe.timeMinutes} dk</span>
                                <span>•</span>
                                <span>{recipe.difficulty}</span>
                                <span>•</span>
                                <span>{recipe.calories || 0} kcal</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-mono text-slate-400">#{recipe.proteinType}</span>
                                <Button variant="outline" size="sm" className="h-8">Düzenle</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
