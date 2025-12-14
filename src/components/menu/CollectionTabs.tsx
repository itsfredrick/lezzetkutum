"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChefHat, Globe, Leaf, Home, Flame } from "lucide-react";

const collections = [
    { id: "all", label: "Tümü", icon: null },
    { id: "imza-tabaklar", label: "İmza Tabaklar", icon: ChefHat },
    { id: "sokak-lezzetleri", label: "Sokak Lezzetleri", icon: Flame },
    { id: "ev-klasikleri", label: "Ev Klasikleri", icon: Home },
    { id: "hafif-dengeli", label: "Hafif & Dengeli", icon: Leaf },
    { id: "dunya-turu", label: "Dünya Turu", icon: Globe },
];

export function CollectionTabs({ value, onChange }: { value: string, onChange: (v: string) => void }) {
    return (
        <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
                {collections.map((col) => {
                    const isActive = value === col.id;
                    const Icon = col.icon;
                    return (
                        <button
                            key={col.id}
                            onClick={() => onChange(col.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border",
                                isActive
                                    ? "bg-primary text-white border-primary shadow-md"
                                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                            )}
                        >
                            {Icon && <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-neutral-400")} />}
                            {col.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
