"use client";

import { useState } from "react";
import { RecipeCard } from "@/components/menu/RecipeCard";
import { WeekSelector } from "@/components/menu/WeekSelector";
import { CutoffCountdown } from "@/components/menu/CutoffCountdown";
import { CollectionTabs } from "@/components/menu/CollectionTabs";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

// Mock Data
const MOCK_WEEKS = [
    { weekNumber: 24, dateRange: "12 - 18 Haz", isLocked: false, isCurrent: true },
    { weekNumber: 25, dateRange: "19 - 25 Haz", isLocked: false, isCurrent: false },
    { weekNumber: 26, dateRange: "26 Haz - 02 Tem", isLocked: false, isCurrent: false },
    { weekNumber: 27, dateRange: "03 - 09 Tem", isLocked: true, isCurrent: false },
];

const MOCK_RECIPES = [
    { id: "1", slug: "izgara-tavuk", name: "Izgara Tavuk ve Kök Sebzeler", imageUrl: "/assets/images/placeholder_recipe_1.jpg", timeMinutes: 30, difficulty: "EASY", spiceLevel: "MILD", proteinType: "CHICKEN", collectionLabel: "İmza Tabak" },
    { id: "2", slug: "lazanya", name: "Mantarlı ve Ispanaklı Lazanya", imageUrl: "/assets/images/placeholder_recipe_2.jpg", timeMinutes: 45, difficulty: "MEDIUM", spiceLevel: "NONE", proteinType: "VEGGIE", collectionLabel: "Vejetaryen" },
    { id: "3", slug: "kofte", name: "Anne Köftesi ve Piyaz", imageUrl: "/assets/images/placeholder_recipe_3.jpg", timeMinutes: 40, difficulty: "EASY", spiceLevel: "MILD", proteinType: "BEEF", collectionLabel: "Ev Klasikleri" },
    { id: "4", slug: "taco", name: "Meksika Usulü Taco", imageUrl: "/assets/images/placeholder_recipe_4.jpg", timeMinutes: 25, difficulty: "EASY", spiceLevel: "HOT", proteinType: "BEEF", collectionLabel: "Sokak Lezzetleri" },
    { id: "5", slug: "kori-tavuk", name: "Hint Usulü Körili Tavuk", imageUrl: "/assets/images/placeholder_recipe_5.jpg", timeMinutes: 35, difficulty: "MEDIUM", spiceLevel: "MEDIUM", proteinType: "CHICKEN", collectionLabel: "Dünya Turu" },
    { id: "6", slug: "salata", name: "Avokadolu Kinoa Salatası", imageUrl: "/assets/images/placeholder_recipe_6.jpg", timeMinutes: 20, difficulty: "EASY", spiceLevel: "NONE", proteinType: "VEGAN", collectionLabel: "Hafif & Dengeli" },
] as const;

export default function MenuPage() {
    const [currentWeek, setCurrentWeek] = useState(24);
    const [activeCollection, setActiveCollection] = useState("all");

    return (
        <div className="min-h-screen bg-neutral-50 pb-20">
            <div className="bg-white border-b sticky top-16 z-40 shadow-sm">
                <div className="container mx-auto px-4">
                    <WeekSelector
                        currentWeek={currentWeek}
                        onWeekChange={setCurrentWeek}
                        weeks={MOCK_WEEKS}
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
                    <div className="w-full md:w-auto">
                        <CutoffCountdown cutoffDate={new Date()} isLocked={false} />
                    </div>

                    <div className="w-full md:w-auto flex items-center gap-4">
                        {/* Mobile scrolling tabs */}
                        <div className="flex-1 overflow-hidden">
                            <CollectionTabs value={activeCollection} onChange={setActiveCollection} />
                        </div>

                        <Button variant="outline" size="icon" className="shrink-0 border-neutral-200">
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {MOCK_RECIPES.map((recipe) => (
                        <RecipeCard key={recipe.id} {...recipe} />
                    ))}
                    {/* Duplicate for grid fill */}
                    {MOCK_RECIPES.map((recipe) => (
                        <RecipeCard key={`${recipe.id}-dup`} {...recipe} id={`${recipe.id}-dup`} />
                    ))}
                </div>
            </div>
        </div>
    );
}
