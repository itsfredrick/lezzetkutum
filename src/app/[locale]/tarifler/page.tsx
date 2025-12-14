"use client";

import { useState } from "react";
import { RecipeCard } from "@/components/menu/RecipeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ChefHat, Flame, Clock, Leaf, Heart, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock Data (Expanded specific to library)
const MOCK_RECIPES = [
    { id: "1", slug: "izgara-tavuk-kok-sebzeler", name: "Izgara Tavuk ve Kök Sebzeler", imageUrl: "/assets/images/placeholder_recipe_1.jpg", timeMinutes: 30, difficulty: "EASY", spiceLevel: "MILD", proteinType: "CHICKEN", calories: 450, tags: ["Ana Yemek", "Kolay"] },
    { id: "2", slug: "mantarli-ispanakli-lazanya", name: "Mantarlı ve Ispanaklı Lazanya", imageUrl: "/assets/images/placeholder_recipe_2.jpg", timeMinutes: 45, difficulty: "MEDIUM", spiceLevel: "NONE", proteinType: "VEGGIE", calories: 520, tags: ["Vejetaryen"] },
    { id: "3", slug: "anne-koftesi-piyaz", name: "Anne Köftesi ve Piyaz", imageUrl: "/assets/images/placeholder_recipe_3.jpg", timeMinutes: 40, difficulty: "EASY", spiceLevel: "MILD", proteinType: "BEEF", calories: 600, tags: ["Klasik"] },
    { id: "4", slug: "meksika-usulu-taco", name: "Meksika Usulü Taco", imageUrl: "/assets/images/placeholder_recipe_4.jpg", timeMinutes: 25, difficulty: "EASY", spiceLevel: "HOT", proteinType: "BEEF", calories: 550, tags: ["Dünya Mutfağı"] },
    { id: "5", slug: "hint-usulu-korili-tavuk", name: "Hint Usulü Körili Tavuk", imageUrl: "/assets/images/placeholder_recipe_5.jpg", timeMinutes: 35, difficulty: "MEDIUM", spiceLevel: "MEDIUM", proteinType: "CHICKEN", calories: 480, tags: ["Baharatlı"] },
    { id: "6", slug: "avokadolu-kinoa-salatasi", name: "Avokadolu Kinoa Salatası", imageUrl: "/assets/images/placeholder_recipe_6.jpg", timeMinutes: 20, difficulty: "EASY", spiceLevel: "NONE", proteinType: "VEGAN", calories: 350, tags: ["Vegan", "Fit"] },
    { id: "7", slug: "somon-kuskonmaz", name: "Somon ve Kuşkonmaz", imageUrl: "/assets/images/placeholder_recipe_7.jpg", timeMinutes: 30, difficulty: "EASY", spiceLevel: "NONE", proteinType: "FISH", calories: 420, tags: ["Deniz Ürünü"] },
    { id: "8", slug: "etli-nohut", name: "Etli Nohut Yemeği", imageUrl: "/assets/images/placeholder_recipe_8.jpg", timeMinutes: 50, difficulty: "MEDIUM", spiceLevel: "MILD", proteinType: "BEEF", calories: 580, tags: ["Geleneksel"] },

    // New additions for "Yeni Eklenenler"
    { id: "9", slug: "acili-menemen", name: "Acılı Menemen", imageUrl: "/assets/images/placeholder_recipe_1.jpg", timeMinutes: 20, difficulty: "EASY", spiceLevel: "HOT", proteinType: "VEGGIE", calories: 320, tags: ["Kahvaltı", "Kolay"] },
    { id: "10", slug: "yesil-salata", name: "Avokadolu Yeşil Salata", imageUrl: "/assets/images/placeholder_recipe_6.jpg", timeMinutes: 10, difficulty: "EASY", spiceLevel: "NONE", proteinType: "VEGAN", calories: 180, tags: ["Vegan", "Çok Kolay"] },
    { id: "11", slug: "mercimek-koftesi", name: "Mercimek Köftesi", imageUrl: "/assets/images/placeholder_recipe_8.jpg", timeMinutes: 40, difficulty: "MEDIUM", spiceLevel: "MILD", proteinType: "VEGAN", calories: 260, tags: ["Atıştırmalık", "Orta"] },
    { id: "12", slug: "lahmacun", name: "Ev Usulü Lahmacun", imageUrl: "/assets/images/placeholder_recipe_3.jpg", timeMinutes: 50, difficulty: "HARD", spiceLevel: "MILD", proteinType: "BEEF", calories: 450, tags: ["Hamurişi", "Orta"] },
    { id: "13", slug: "yaprak-sarma", name: "Yaprak Sarma", imageUrl: "/assets/images/placeholder_recipe_2.jpg", timeMinutes: 75, difficulty: "HARD", spiceLevel: "NONE", proteinType: "VEGAN", calories: 220, tags: ["Zeytinyağı", "Zor"] },
    { id: "14", slug: "sutlac", name: "Fırın Sütlaç", imageUrl: "/assets/images/placeholder_recipe_5.jpg", timeMinutes: 55, difficulty: "MEDIUM", spiceLevel: "NONE", proteinType: "VEGGIE", calories: 290, tags: ["Tatlı", "Kolay"] },
] as const;

const WEEKLY_FAVORITES = [
    { id: "fav1", slug: "karniyarik", name: "Geleneksel Karnıyarık", description: "Türk mutfağının vazgeçilmezi, közlenmiş patlıcan ve nefis kıyma harcının buluşması.", imageUrl: "/assets/images/placeholder_recipe_10.jpg", time: "45 dk", difficulty: "Orta", author: "Zeynep Usta", authorImg: "/assets/images/avatar_1.jpg", tag: "Popüler" },
    { id: "fav2", slug: "kayseri-mantisi", name: "Ev Yapımı Kayseri Mantısı", description: "El açması hamuru ve bol sarımsaklı yoğurt sosuyla sofralarınızın yıldızı olacak.", imageUrl: "/assets/images/placeholder_recipe_3.jpg", time: "60 dk", difficulty: "Zor", author: "Ahmet Şef", authorImg: "/assets/images/avatar_2.jpg", tag: "" },
    { id: "fav3", slug: "fistikli-baklava", name: "Fıstıklı Ev Baklavası", description: "Bayramların ve özel günlerin vazgeçilmezi, çıtır çıtır ev yapımı baklava.", imageUrl: "/assets/images/placeholder_recipe_7.jpg", time: "90 dk", difficulty: "Uzman", author: "Elif Hanım", authorImg: "/assets/images/avatar_3.jpg", tag: "Şefin Seçimi" },
];

const CATEGORIES = [
    { id: 'all', label: 'Tümü', icon: null },
    { id: 'trend', label: 'Trendler', icon: Flame },
    { id: 'quick', label: 'Hızlı & Kolay', icon: Clock },
    { id: 'turkish', label: 'Türk Mutfağı', icon: ChefHat },
    { id: 'vegan', label: 'Vegan', icon: Leaf },
    { id: 'healthy', label: 'Sağlıklı Seçimler', icon: Heart },
    { id: 'sweet', label: 'Tatlılar', icon: null },
];

export default function RecipesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Hero / Search Section */}
            <div className="bg-neutral-50/50 pt-16 pb-12">
                <div className="container mx-auto px-4 text-center space-y-6">
                    <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.1]">
                        Mutfağınızdaki Şef: <br />
                        <span className="text-lime-600">LezzetKutum Tarifler</span>
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
                        Binlerce denenmiş tarif, püf noktaları ve video anlatımları ile damak tadınıza uygun olanı bulun, pişirmeye başlayın.
                    </p>

                    <div className="relative max-w-2xl mx-auto mt-8 flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                            <Input
                                placeholder="Yemek, malzeme veya mutfak ara (örn: Karnıyarık)"
                                className="pl-12 h-14 text-base rounded-lg shadow-sm border-neutral-200 bg-white focus-visible:ring-lime-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button className="h-14 px-8 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-lg text-base">
                            Ara
                        </Button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
                        {CATEGORIES.map((cat) => (
                            <Button
                                key={cat.id}
                                variant={activeCategory === cat.id ? "default" : "outline"}
                                className={cn(
                                    "rounded-full h-9 px-4 text-sm font-medium border-neutral-200",
                                    activeCategory === cat.id
                                        ? "bg-lime-500 text-white hover:bg-lime-600 border-lime-500"
                                        : "bg-white text-neutral-700 hover:bg-neutral-50"
                                )}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.icon && <cat.icon className="w-3.5 h-3.5 mr-2" />}
                                {cat.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Weekly Favorites */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full border-2 border-lime-500 flex items-center justify-center">
                            <div className="w-3 h-1 bg-lime-500 rounded-full animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold text-neutral-900">Haftanın Favorileri</h2>
                    </div>
                    <Button variant="ghost" className="text-lime-600 hover:text-lime-700 text-sm font-bold">
                        Tümünü Gör &rarr;
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {WEEKLY_FAVORITES.map((item) => (
                        <div key={item.id} className="group cursor-pointer">
                            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                {item.tag && (
                                    <Badge className="absolute top-4 left-4 bg-lime-400 text-neutral-900 border-none font-bold shadow-sm">
                                        {item.tag}
                                    </Badge>
                                )}
                                <Button size="icon" className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white border-none rounded-full backdrop-blur-sm h-8 w-8">
                                    <Heart className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <div className="flex gap-4 text-xs font-medium text-neutral-500">
                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.time}</span>
                                    <span className="flex items-center gap-1"><BarChart className="w-3.5 h-3.5" /> {item.difficulty}</span>
                                </div>
                                <h3 className="font-bold text-lg text-neutral-900 leading-tight group-hover:text-lime-600 transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-neutral-500 line-clamp-2">
                                    {item.description}
                                </p>
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-2">
                                        {/* Avatar Placeholder - simple approach */}
                                        <div className="w-6 h-6 rounded-full bg-neutral-200 overflow-hidden">
                                            {/* <img src={item.authorImg} className="w-full h-full object-cover" /> */}
                                        </div>
                                        <span className="text-xs font-medium text-neutral-600">{item.author}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-7 text-xs font-bold text-neutral-900">Tarifi Gör</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* New Added */}
            <div className="container mx-auto px-4 py-8 border-t border-neutral-100">
                <h2 className="text-2xl font-bold text-neutral-900 mb-8">Yeni Eklenenler</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_RECIPES.slice(8, 16).map((recipe) => (
                        <div key={recipe.id} className="group">
                            <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-neutral-100">
                                <img src={recipe.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <Badge className="absolute bottom-3 right-3 bg-black/60 text-white border-none backdrop-blur-sm px-2 py-0.5 text-xs font-medium rounded-md">
                                    {recipe.timeMinutes} dk
                                </Badge>
                                {recipe.tags && recipe.tags[0] && (
                                    <span className="absolute bottom-3 left-3 text-[10px] font-bold text-lime-600 bg-white/90 px-2 py-0.5 rounded-full uppercase tracking-wider">{recipe.tags[0]}</span>
                                )}
                            </div>
                            <h3 className="font-bold text-neutral-900 group-hover:text-lime-600 transition-colors mb-1 line-clamp-1">
                                {recipe.name}
                            </h3>
                            <div className="flex gap-2 text-xs text-neutral-500">
                                <span className="flex items-center gap-1">
                                    <Flame className="w-3 h-3" /> {recipe.calories} kcal
                                </span>
                                <span>•</span>
                                <span>{recipe.difficulty === "EASY" ? "Kolay" : "Orta"}</span>
                            </div>
                        </div>
                    ))}
                    {/* Reuse mock recipes to fill grid if needed, or stick to slice */}
                </div>

                <div className="mt-12 text-center">
                    <Button variant="outline" className="px-8 rounded-full border-neutral-300 font-bold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50">
                        Daha Fazla Tarif Yükle
                    </Button>
                </div>
            </div>

            {/* Newsletter / Footnote Area - from design "Haftalık Lezzet Rehberi" */}
            <div className="container mx-auto px-4 py-16">
                <div className="bg-[#1a2e1a] rounded-3xl p-8 md:p-12 text-center md:text-left relative overflow-hidden">
                    {/* Background Pattern could go here */}
                    <div className="relative z-10 max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Haftalık Lezzet Rehberi</h2>
                        <p className="text-white/70 mb-8">
                            En yeni tarifler, mutfak ipuçları ve LezzetKutum indirimlerinden haberdar olmak için bültenimize abone olun.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <Input placeholder="E-posta adresiniz" className="bg-white/10 border-white/10 text-white placeholder:text-white/50 h-12" />
                            <Button className="h-12 bg-lime-500 hover:bg-lime-600 text-white font-bold px-8">Abone Ol</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
