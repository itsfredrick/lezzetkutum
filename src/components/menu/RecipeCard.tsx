import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BarChart, Flame, Leaf, User, Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Types corresponding to Prisma enums roughly
export type RecipeCardProps = {
    id: string;
    slug: string;
    name: string;
    imageUrl: string;
    timeMinutes: number;
    calories?: number;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    spiceLevel: "NONE" | "MILD" | "MEDIUM" | "HOT";
    proteinType: string;
    isVegetarian?: boolean;
    collectionLabel?: string;
    isLocked?: boolean;
    onSelect?: () => void;
    isSelected?: boolean;
};

export function RecipeCard({
    slug,
    name,
    imageUrl,
    timeMinutes,
    calories,
    difficulty,
    spiceLevel,
    collectionLabel,
    isLocked,
    onSelect,
    isSelected
}: RecipeCardProps) {
    return (
        <Card className={cn("overflow-hidden flex flex-col h-full group transition-all duration-300 hover:shadow-lg border-neutral-200", isSelected && "ring-2 ring-primary border-primary")}>
            <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className={cn("object-cover w-full h-full transition-transform duration-500 group-hover:scale-105", isLocked && "grayscale")}
                />

                {collectionLabel && (
                    <Badge className="absolute top-3 left-3 bg-white/95 text-xs text-primary font-bold shadow-sm backdrop-blur-sm border-none">
                        {collectionLabel}
                    </Badge>
                )}

                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-neutral-400 hover:text-red-500 shadow-sm backdrop-blur-sm">
                        <Heart className="w-4 h-4" />
                    </Button>
                </div>

                <div className="absolute bottom-3 left-3 flex gap-2">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-sm text-neutral-800 font-medium px-2 h-6">
                        <Clock className="w-3 h-3 mr-1" /> {timeMinutes} dk
                    </Badge>
                </div>
            </div>

            <CardContent className="p-4 flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                    <span className="flex items-center gap-1"><BarChart className="w-3 h-3" /> {difficulty === 'EASY' ? 'Kolay' : difficulty === 'MEDIUM' ? 'Orta' : 'Zor'}</span>
                    {calories && <span className="flex items-center gap-1">• {calories} kcal</span>}
                    {spiceLevel !== 'NONE' && (
                        <span className="flex items-center gap-1 text-orange-500">
                            <Flame className="w-3 h-3 fill-orange-500" />
                            {spiceLevel === 'MILD' ? 'Hafif Acı' : spiceLevel === 'MEDIUM' ? 'Orta Acı' : 'Acı'}
                        </span>
                    )}
                </div>

                <h3 className="font-bold text-neutral-800 leading-tight group-hover:text-primary transition-colors">
                    <Link href={`/tarifler/${slug}`} className="before:absolute before:inset-0">
                        {name}
                    </Link>
                </h3>
            </CardContent>

            <CardFooter className="p-4 pt-0 mt-auto">
                {onSelect ? (
                    <Button
                        onClick={(e: React.MouseEvent) => { e.preventDefault(); onSelect(); }}
                        className={cn("w-full rounded-lg font-bold z-10 relative", isSelected ? "bg-primary text-white" : "bg-neutral-100 text-neutral-900 hover:bg-primary hover:text-white")}
                        disabled={isLocked}
                    >
                        {isSelected ? "Seçildi" : isLocked ? "Kilitli" : "Seç"}
                    </Button>
                ) : (
                    <Button
                        asChild
                        className="w-full rounded-lg font-bold z-10 relative bg-neutral-100 text-neutral-900 hover:bg-primary hover:text-white"
                        disabled={isLocked}
                    >
                        <Link href={`/tarifler/${slug}`}>İncele</Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
