
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat, Flame, Scale, WheatOff, Users } from "lucide-react";

import { CookMode } from "@/components/content/CookMode";

const prisma = new PrismaClient();

async function getRecipe(slug: string) {
    return await prisma.recipe.findUnique({
        where: { slug },
        include: { steps: { orderBy: { stepNumber: 'asc' } } }
    });
}

import { Prisma } from "@prisma/client";

// Define the type manually to avoid namespace issues if strict mode is picky
type RecipeWithSteps = Prisma.RecipeGetPayload<{
    include: { steps: true }
}>;

function RecipeJsonLd({ recipe }: { recipe: RecipeWithSteps }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Recipe",
        "name": recipe.name,
        "image": recipe.imageUrl ? [`https://lezzetkutum.com${recipe.imageUrl}`] : [],
        "description": recipe.description,
        "prepTime": `PT${recipe.timeMinutes}M`,
        "cookTime": `PT${recipe.timeMinutes}M`, // Simplified
        "totalTime": `PT${recipe.timeMinutes}M`,
        "nutrition": {
            "@type": "NutritionInformation",
            "calories": `${recipe.calories || 500} calories`
        },
        "recipeIngredient": [
            "Malzeme 1", "Malzeme 2" // Mocked: In real world, fetch from Ingredient relation
        ],
        "recipeInstructions": recipe.steps.map((step) => ({
            "@type": "HowToStep",
            "text": step.instruction,
            "position": step.stepNumber
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export default async function RecipeDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const recipe = await getRecipe(slug);

    if (!recipe) {
        notFound();
    }

    const nutrition = recipe.nutrition ? JSON.parse(recipe.nutrition as string) : { protein: 0, carbs: 0, fat: 0 };
    const allergens = recipe.allergens ? JSON.parse(recipe.allergens as string) : [];

    return (
        <div className="bg-white min-h-screen">
            <RecipeJsonLd recipe={recipe} />

            {/* Hero */}
            <div className="relative h-[50vh] min-h-[400px]">
                <Image src={recipe.imageUrl || "/assets/images/placeholder_recipe_1.jpg"} alt={recipe.name} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                    <div className="container mx-auto max-w-5xl">
                        <Badge className="bg-primary/90 hover:bg-primary text-white border-0 mb-4 text-base px-4 py-1">
                            {recipe.proteinType}
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight max-w-3xl">{recipe.name}</h1>
                        <div className="flex flex-wrap gap-6 text-sm md:text-base font-medium opacity-90">
                            <span className="flex items-center gap-2"><Clock className="w-5 h-5" /> {recipe.timeMinutes} dakika</span>
                            <span className="flex items-center gap-2"><ChefHat className="w-5 h-5" /> {recipe.difficulty}</span>
                            <span className="flex items-center gap-2"><Flame className="w-5 h-5" /> {recipe.calories || 500} kcal</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-5xl grid lg:grid-cols-3 gap-12">

                {/* Main Content: Steps & Story */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Description */}
                    <div>
                        <p className="text-lg text-neutral-600 leading-relaxed font-medium">
                            {recipe.description}
                        </p>
                    </div>

                    {/* Cook Mode Trigger */}
                    <div className="bg-lime-50 p-6 rounded-2xl border border-lime-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-lg text-lime-900">Yemeği pişirmeye hazır mısın?</h3>
                            <p className="text-lime-700 text-sm">Adım adım moda geçiş yap ve ekranın kapanmasın.</p>
                        </div>
                        <CookMode steps={recipe.steps} recipeName={recipe.name} />
                    </div>

                    {/* Steps */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Hazırlanışı</h2>
                        <div className="space-y-8">
                            {recipe.steps.map((step) => (
                                <div key={step.id} className="flex gap-6 group">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-neutral-100 text-neutral-500 font-bold flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                        {step.stepNumber}
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-neutral-700 text-lg leading-relaxed">{step.instruction}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Afiyet Olsun / Photo Upload */}
                    <div className="bg-white border-2 border-dashed border-neutral-200 rounded-3xl p-8 text-center space-y-4 hover:border-primary/50 transition-colors">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-600">
                            <Users className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-neutral-900">Afiyet Olsun!</h3>
                            <p className="text-neutral-500 max-w-md mx-auto">
                                Yemeğin harika görünüyor! Fotoğrafını çekip bizimle paylaş, bir sonraki kutunda <span className="font-bold text-primary">20₺ indirim</span> kazan.
                            </p>
                        </div>
                        <Button className="font-bold gap-2 bg-neutral-900 text-white hover:bg-neutral-800" size="lg">
                            Fotoğraf Yükle
                        </Button>
                    </div>
                </div>

                {/* Sidebar: Ingredients & Nutrition */}
                <div className="space-y-8">
                    {/* Ingredients Card */}
                    <div className="bg-neutral-50 p-6 rounded-2xl sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-xl">Malzemeler</h3>
                            <div className="flex items-center gap-2 text-sm text-neutral-500 bg-white px-3 py-1 rounded-full border">
                                <Users className="w-4 h-4" /> 2 Kişilik
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Kutudan Çıkanlar</h4>
                                <ul className="space-y-3 text-neutral-700">
                                    <li className="flex justify-between border-b border-neutral-200/50 pb-2"><span>Tavuk Göğsü</span> <span className="font-bold">250g</span></li>
                                    <li className="flex justify-between border-b border-neutral-200/50 pb-2"><span>Basmati Pirinç</span> <span className="font-bold">150g</span></li>
                                    <li className="flex justify-between border-b border-neutral-200/50 pb-2"><span>Mantar</span> <span className="font-bold">200g</span></li>
                                    <li className="flex justify-between border-b border-neutral-200/50 pb-2"><span>Taze Kekik</span> <span className="font-bold">1 Demet</span></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Evdeki Malzemeler</h4>
                                <ul className="space-y-3 text-neutral-500 text-sm">
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-neutral-300 rounded-full" /> Zeytinyağı (2 y.k.)</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-neutral-300 rounded-full" /> Tuz & Karabiber</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Nutrition Card */}
                    <div className="border border-neutral-200 p-6 rounded-2xl">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Scale className="w-5 h-5" /> Besin Değerleri</h3>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-3 bg-neutral-50 rounded-lg">
                                <span className="block text-xl font-bold text-neutral-900">{nutrition.protein}g</span>
                                <span className="text-xs text-neutral-500">Protein</span>
                            </div>
                            <div className="p-3 bg-neutral-50 rounded-lg">
                                <span className="block text-xl font-bold text-neutral-900">{nutrition.carbs}g</span>
                                <span className="text-xs text-neutral-500">Karb.</span>
                            </div>
                            <div className="p-3 bg-neutral-50 rounded-lg">
                                <span className="block text-xl font-bold text-neutral-900">{nutrition.fat}g</span>
                                <span className="text-xs text-neutral-500">Yağ</span>
                            </div>
                        </div>

                        {allergens.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-neutral-100">
                                <h4 className="font-bold text-sm mb-2 text-red-600 flex items-center gap-2">
                                    <WheatOff className="w-4 h-4" /> Alerjen Uyarısı
                                </h4>
                                <p className="text-sm text-neutral-600 capitalize">
                                    {allergens.join(", ")} içerir.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
