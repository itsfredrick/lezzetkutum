"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Clock, BarChart, Users, Flame, Info, CheckCircle, ChefHat, PlayCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Mock Data for a single recipe
// Mock Data matching the design image precisely
const RECIPE = {
    id: "1",
    name: "Fıstıklı ve Nar Ekşili Antakya Usulü Köfte",
    slug: "antakya-usulu-kofte",
    rating: 5,
    reviewCount: 124,
    description: "Antakya mutfağının eşsiz lezzetlerinden biri olan bu tarif, nar ekşisinin mayhoşluğu ve fıstığın çıtırlığıyla sofralarınıza geliyor. Geleneksel baharatlarla harmanlanmış, damakta iz bırakan bir lezzet şöleni.",
    imageUrl: "/assets/images/placeholder_recipe_detail_hero.jpg",
    prepTime: "15 dk",
    cookTime: "20 dk",
    difficulty: "Orta",
    spiceLevel: "Hafif Acı",
    calories: 450,
    tags: ["HAZIRLANIŞ"],
    ingredients: [
        { name: "Dana Kıyma", amount: "300 g" },
        { name: "Kuru Soğan", amount: "1 adet" },
        { name: "Nar Ekşisi", amount: "2 yk" },
        { name: "Antep Fıstığı (İç)", amount: "40 g" },
        { name: "Galeta Unu", amount: "2 yk" },
        { name: "Kimyon & Karabiber", amount: "1 tk" }
    ],
    steps: [
        {
            number: 1,
            title: "Malzemeleri Hazırlayın",
            text: "Soğanı rendeleyin ve suyunu sıkın. Maydanozları ince ince kıyın. Antep fıstıklarını havanda iri parçalar kalacak şekilde dövün. Tüm ön hazırlık malzemelerini tezgaha dizin.",
            image: "/assets/images/placeholder_step_1.jpg"
        },
        {
            number: 2,
            title: "Köfte Harcını Yoğurun",
            text: "Geniş bir kaba kıymayı alın. Üzerine rendelenmiş soğan, galeta unu, yumurta, nar ekşisi, dövülmüş fıstık ve baharatları ekleyin. Tüm malzemeler özleşene kadar yaklaşık 5-7 dakika yoğurun.",
            image: null
        },
        {
            number: 3,
            title: "Şekil Verin ve Dinlendirin",
            text: "Hazırladığınız harçtan ceviz büyüklüğünde parçalar koparın. Elinizi hafifçe ıslatarak yassı veya silindir şeklinde köfteler hazırlayın. Buzdolabında 15 dakika dinlendirin.",
            image: null,
            tip: "Püf Noktası: Dinlendirmek köftelerin pişerken dağılmasını önler ve lezzetini tam almasını sağlar."
        },
        {
            number: 4,
            title: "Pişirme",
            text: "Döküm tava veya yapışmaz tavayı orta ateşte ısıtın. Çok az yağ ekleyip köfteleri arkalı önlü kızarana kadar pişirin. Yanında lavaş ve közlenmiş biber ile servis yapın.",
            image: null
        }
    ],
    nutrition: {
        protein: "35g",
        carbs: "25g",
        fat: "18g"
    }
};

const SIMILAR_RECIPES = [
    { id: "1", name: "Izgara Tavuklu Kinoa Salatası", image: "/assets/images/placeholder_recipe_6.jpg", time: "25 dk", desc: "Hafif ve doyurucu bir seçenek." },
    { id: "2", name: "Ev Yapımı Kayseri Mantısı", image: "/assets/images/placeholder_recipe_3.jpg", time: "60 dk", desc: "Geleneksel lezzet, tam kıvamında." },
    { id: "3", name: "San Sebastian Cheesecake", image: "/assets/images/placeholder_recipe_5.jpg", time: "45 dk", desc: "Akışkan kıvamlı efsane tatlı." },
    { id: "4", name: "Mevsim Yeşillikleri Salatası", image: "/assets/images/placeholder_recipe_2.jpg", time: "15 dk", desc: "Taze, hafif ve sağlıklı." },
];

export default function RecipeDetail({ params }: { params: { slug: string } }) {
    const [cookMode, setCookMode] = useState(false);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    const toggleStep = (step: number) => {
        setCompletedSteps(prev =>
            prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step]
        );
    };

    if (cookMode) {
        return (
            <div className="min-h-screen bg-black text-white p-6">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold">{RECIPE.name}</h1>
                        <div className="flex items-center gap-4">
                            <Label htmlFor="cook-mode" className="cursor-pointer font-medium">Pişirme Modu</Label>
                            <Switch id="cook-mode" checked={cookMode} onCheckedChange={setCookMode} />
                        </div>
                    </div>

                    <div className="space-y-12">
                        {RECIPE.steps.map((step) => (
                            <div
                                key={step.number}
                                onClick={() => toggleStep(step.number)}
                                className={cn(
                                    "flex gap-6 p-6 rounded-2xl transition-all cursor-pointer",
                                    completedSteps.includes(step.number) ? "bg-neutral-900 opacity-50" : "bg-neutral-800 hover:bg-neutral-700"
                                )}
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 shrink-0",
                                    completedSteps.includes(step.number) ? "bg-green-500 border-green-500 text-black" : "border-white/20 text-white"
                                )}>
                                    {completedSteps.includes(step.number) ? <CheckCircle className="w-6 h-6" /> : step.number}
                                </div>
                                <div>
                                    <p className="text-2xl leading-relaxed">{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Button
                            size="lg"
                            variant="secondary" // Use secondary which is light-colored in normal theme, need to check contrast
                            className="bg-primary text-white hover:bg-primary/80 h-16 px-12 text-xl rounded-full"
                            onClick={() => setCookMode(false)}
                        >
                            Bitir ve Çık
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const [servings, setServings] = useState(2);

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Breadcrumbs & Header */}
            <div className="container mx-auto px-4 py-6">
                <nav className="text-sm text-neutral-500 mb-6 font-medium">
                    Anasayfa / Tarifler / <span className="text-neutral-900">Antakya Usulü Köfte</span>
                </nav>

                <div className="bg-lime-100/50 inline-block px-3 py-1 rounded-md text-lime-700 text-xs font-bold tracking-wider mb-4 uppercase">
                    HAZIRLANIŞ
                </div>

                <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                    <span className="text-xs text-neutral-500 ml-1">({RECIPE.reviewCount} Değerlendirme)</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-6 leading-tight max-w-4xl">
                    {RECIPE.name}
                </h1>

                <p className="text-neutral-600 leading-relaxed text-lg max-w-4xl mb-8">
                    {RECIPE.description}
                </p>

                {/* Hero Image */}
                <div className="relative aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden mb-8 group">
                    <img src={RECIPE.imageUrl} alt={RECIPE.name} className="w-full h-full object-cover" />
                    <Button className="absolute bottom-6 right-6 bg-white text-neutral-900 hover:bg-neutral-100 font-bold rounded-full px-6 gap-2">
                        <PlayCircle className="w-5 h-5" /> Tarif Videosu
                    </Button>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-xs text-neutral-500 font-bold uppercase">HAZIRLIK</div>
                            <div className="font-bold text-neutral-900">{RECIPE.prepTime}</div>
                        </div>
                    </div>
                    <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                            <ChefHat className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-xs text-neutral-500 font-bold uppercase">PİŞİRME</div>
                            <div className="font-bold text-neutral-900">{RECIPE.cookTime}</div>
                        </div>
                    </div>
                    <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                            <BarChart className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-xs text-neutral-500 font-bold uppercase">ZORLUK</div>
                            <div className="font-bold text-neutral-900">{RECIPE.difficulty}</div>
                        </div>
                    </div>
                    <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                            <Flame className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-xs text-neutral-500 font-bold uppercase">ACILIK</div>
                            <div className="font-bold text-neutral-900">{RECIPE.spiceLevel}</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Preparation Steps */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-neutral-900">Hazırlanışı</h2>
                            <div className="flex items-center gap-3">
                                <Label htmlFor="cook-mode-switch" className="text-sm font-medium text-neutral-500">Pişirme Modu</Label>
                                <Switch id="cook-mode-switch" checked={cookMode} onCheckedChange={setCookMode} />
                            </div>
                        </div>

                        <div className="space-y-12">
                            {RECIPE.steps.map((step) => (
                                <div key={step.number} className="group">
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 rounded-full bg-lime-500 text-white flex items-center justify-center text-xl font-bold shrink-0">
                                            {step.number}
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <h3 className="font-bold text-xl text-neutral-900">{step.title}</h3>
                                            <p className="text-neutral-600 leading-relaxed text-lg">
                                                {step.text}
                                            </p>

                                            {step.image && (
                                                <div className="mt-4 rounded-2xl overflow-hidden aspect-video">
                                                    <img src={step.image} className="w-full h-full object-cover" />
                                                </div>
                                            )}

                                            {step.tip && (
                                                <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start border border-blue-100">
                                                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                                    <div>
                                                        <div className="font-bold text-blue-800 text-sm mb-1">Püf Noktası</div>
                                                        <p className="text-sm text-blue-700">{step.tip.replace("Püf Noktası:", "")}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Final Card */}
                        <div className="mt-16 bg-neutral-50 p-8 rounded-3xl text-center border border-neutral-100">
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">Afiyet Olsun!</h3>
                            <p className="text-neutral-500 mb-6">Bu tarifi denediniz mi? Fotoğrafını çekip bizimle paylaşın.</p>
                            <Button variant="outline" className="gap-2 bg-white hover:bg-gray-50">
                                <span className="text-green-600 font-bold flex items-center gap-2"><div className="w-2 h-2 bg-green-600 rounded-full" /> Fotoğraf Yükle</span>
                            </Button>
                        </div>
                    </div>

                    {/* Right: Ingredients */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-3xl shadow-lg border border-neutral-100 overflow-hidden">
                                <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                                    <h3 className="font-bold text-lg">Malzemeler</h3>
                                    <div className="flex items-center gap-3 bg-neutral-50 rounded-lg p-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0 rounded-md"
                                            onClick={() => setServings(Math.max(1, servings - 1))}
                                        >-</Button>
                                        <span className="text-sm font-bold w-4 text-center">{servings}</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0 rounded-md"
                                            onClick={() => setServings(servings + 1)}
                                        >+</Button>
                                        <span className="text-xs font-medium text-neutral-500 ml-1">Kişi</span>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    {RECIPE.ingredients.map((ing, i) => (
                                        <div key={i} className="flex items-start gap-3 group cursor-pointer">
                                            <div className="mt-1 w-5 h-5 rounded border border-neutral-300 flex items-center justify-center group-hover:border-lime-500 transition-colors">
                                                {/* Checkbox mockup */}
                                            </div>
                                            <div className="flex-1 flex justify-between text-sm">
                                                <span className="text-neutral-700 font-medium group-hover:text-neutral-900">{ing.name}</span>
                                                <span className="text-neutral-400 font-medium">{ing.amount}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-6 pt-0">
                                    <Button className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold h-12 rounded-xl text-base">
                                        <div className="mr-2"><div className="w-4 h-4 border-2 border-white rounded-sm" /></div>
                                        Tümünü Sepete Ekle
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                                <Button variant="ghost" className="w-full flex justify-between p-4 h-auto font-bold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900">
                                    <span>Besin Değerleri (1 Porsiyon)</span>
                                    <span className="text-neutral-400 text-xs">▼</span>
                                </Button>
                                <div className="px-4 pb-4 border-t border-dashed border-neutral-200 pt-4 hidden">
                                    {/* Content hidden for mockup match */}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                                <Button variant="ghost" className="w-full flex justify-between p-4 h-auto font-bold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900">
                                    <span>Alerjen Uyarısı</span>
                                    <span className="text-neutral-400 text-xs">▼</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="mt-24 pt-12 border-t border-neutral-100">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-neutral-900">Bunları da Beğenebilirsiniz</h2>
                        <Link href="/recipes" className="text-lime-600 font-bold text-sm hover:underline flex items-center">
                            Tümünü Gör &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SIMILAR_RECIPES.map((item) => (
                            <div key={item.id} className="group cursor-pointer bg-white rounded-xl border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative aspect-[4/3] bg-neutral-100">
                                    <img src={item.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <Badge className="absolute bottom-2 right-2 bg-white/90 text-neutral-900 px-2 text-xs backdrop-blur-sm shadow-sm">{item.time}</Badge>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-neutral-900 leading-tight mb-2 group-hover:text-lime-600">{item.name}</h3>
                                    <p className="text-xs text-neutral-500 line-clamp-2">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
