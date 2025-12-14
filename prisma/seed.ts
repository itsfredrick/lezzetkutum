import { PrismaClient, Role, RecipeDifficulty, RecipeSpiceLevel, ProteinType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Cleanup
    await prisma.menuWeekRecipe.deleteMany()
    await prisma.menuWeek.deleteMany()
    await prisma.recipeStep.deleteMany()
    await prisma.recipeIngredient.deleteMany()
    await prisma.ingredient.deleteMany()
    await prisma.recipe.deleteMany()
    await prisma.subscription.deleteMany()
    await prisma.user.deleteMany()
    await prisma.coupon.deleteMany()

    // Users
    const admin = await prisma.user.create({
        data: {
            email: 'admin@lezzetkutum.com',
            name: 'Admin User',
            role: Role.ADMIN,
        }
    })

    const customer = await prisma.user.create({
        data: {
            email: 'user@example.com',
            name: 'Ayşe Yılmaz',
            role: Role.CUSTOMER,
            subscription: {
                create: {
                    planName: '2 Kişilik Plan',
                    peopleCount: 2,
                    mealsPerWeek: 3,
                }
            }
        }
    })

    // Ingredients (Sample)
    const ingredients = ['Tavuk Göğsü', 'Domates', 'Soğan', 'Sarımsak', 'Makarna', 'Pirinç', 'Bulgur', 'Kıyma', 'Patates', 'Havuç', 'Bezelye', 'Mantar', 'Krema', 'Fesleğen', 'Zeytinyağı', 'Tuz', 'Karabiber', 'Kimyon', 'Kekik', 'Pul Biber']

    const ingredientMap = new Map()
    for (const name of ingredients) {
        const ing = await prisma.ingredient.create({
            data: { name, unit: 'adet/g' }
        })
        ingredientMap.set(name, ing.id)
    }

    // Recipes
    const recipesData = [
        { name: 'Izgara Tavuk ve Kök Sebzeler', slug: 'izgara-tavuk-kok-sebzeler', protein: ProteinType.CHICKEN, time: 30, diff: RecipeDifficulty.EASY, spice: RecipeSpiceLevel.MILD, img: '/assets/images/placeholder_recipe_1.jpg' },
        { name: 'Mantarlı ve Ispanaklı Lazanya', slug: 'mantarli-ispanakli-lazanya', protein: ProteinType.VEGGIE, time: 45, diff: RecipeDifficulty.MEDIUM, spice: RecipeSpiceLevel.NONE, img: '/assets/images/placeholder_recipe_2.jpg' },
        { name: 'Anne Köftesi ve Piyaz', slug: 'anne-koftesi-piyaz', protein: ProteinType.BEEF, time: 40, diff: RecipeDifficulty.EASY, spice: RecipeSpiceLevel.MILD, img: '/assets/images/placeholder_recipe_3.jpg' },
        { name: 'Meksika Usulü Taco', slug: 'meksika-usulu-taco', protein: ProteinType.BEEF, time: 25, diff: RecipeDifficulty.EASY, spice: RecipeSpiceLevel.HOT, img: '/assets/images/placeholder_recipe_4.jpg' },
        { name: 'Hint Usulü Körili Tavuk', slug: 'hint-usulu-korili-tavuk', protein: ProteinType.CHICKEN, time: 35, diff: RecipeDifficulty.MEDIUM, spice: RecipeSpiceLevel.MEDIUM, img: '/assets/images/placeholder_recipe_5.jpg' },
        { name: 'Avokadolu Kinoa Salatası', slug: 'avokadolu-kinoa-salatasi', protein: ProteinType.VEGAN, time: 20, diff: RecipeDifficulty.EASY, spice: RecipeSpiceLevel.NONE, img: '/assets/images/placeholder_recipe_6.jpg' },
        { name: 'Somon ve Kuşkonmaz', slug: 'somon-kuskonmaz', protein: ProteinType.FISH, time: 30, diff: RecipeDifficulty.EASY, spice: RecipeSpiceLevel.NONE, img: '/assets/images/placeholder_recipe_7.jpg' },
        { name: 'Etli Nohut Yemeği', slug: 'etli-nohut', protein: ProteinType.BEEF, time: 50, diff: RecipeDifficulty.MEDIUM, spice: RecipeSpiceLevel.MILD, img: '/assets/images/placeholder_recipe_8.jpg' },
        { name: 'Zeytinyağılı Enginar', slug: 'zeytinyagli-enginar', protein: ProteinType.VEGAN, time: 40, diff: RecipeDifficulty.MEDIUM, spice: RecipeSpiceLevel.NONE, img: '/assets/images/placeholder_recipe_9.jpg' },
        { name: 'Karnıyarık', slug: 'karniyarik', protein: ProteinType.BEEF, time: 60, diff: RecipeDifficulty.HARD, spice: RecipeSpiceLevel.MILD, img: '/assets/images/placeholder_recipe_10.jpg' },
        // Recipes 11-20
        { name: 'Mercimek Çorbası', slug: 'mercimek-corbasi', protein: ProteinType.VEGAN, time: 30, diff: RecipeDifficulty.EASY, spice: RecipeSpiceLevel.MILD, img: '/assets/images/placeholder_recipe_11.jpg' },
        { name: 'Hamburger', slug: 'hamburger', protein: ProteinType.BEEF, time: 25, diff: RecipeDifficulty.MEDIUM, spice: RecipeSpiceLevel.NONE, img: '/assets/images/placeholder_recipe_12.jpg' },
        { name: 'Sezar Salata', slug: 'sezar-salata', protein: ProteinType.CHICKEN, time: 20, diff: RecipeDifficulty.EASY, spice: RecipeSpiceLevel.NONE, img: '/assets/images/placeholder_recipe_13.jpg' },
        { name: 'Fırında Levrek', slug: 'firinda-levrek', protein: ProteinType.FISH, time: 45, diff: RecipeDifficulty.MEDIUM, spice: RecipeSpiceLevel.NONE, img: '/assets/images/placeholder_recipe_14.jpg' },
        { name: 'Falafel Dürüm', slug: 'falafel-durum', protein: ProteinType.VEGAN, time: 40, diff: RecipeDifficulty.MEDIUM, spice: RecipeSpiceLevel.MILD, img: '/assets/images/placeholder_recipe_15.jpg' },
        { name: 'Taze Fasulye', slug: 'taze-fasulye', protein: ProteinType.VEGAN, time: 40, diff: RecipeDifficulty.EASY, spice: RecipeSpiceLevel.NONE, img: '/assets/images/placeholder_recipe_16.jpg' },
        { name: 'Hünkar Beğendi', slug: 'hunkar-begendi', protein: ProteinType.BEEF, time: 60, diff: RecipeDifficulty.HARD, spice: RecipeSpiceLevel.NONE, img: '/assets/images/placeholder_recipe_17.jpg' },
        { name: 'Tavuk Sote', slug: 'tavuk-sote', protein: ProteinType.CHICKEN, time: 30, diff: RecipeDifficulty.EASY, spice: RecipeSpiceLevel.MILD, img: '/assets/images/placeholder_recipe_18.jpg' },
        { name: 'Makarna Bolonez', slug: 'makarna-bolonez', protein: ProteinType.BEEF, time: 35, diff: RecipeDifficulty.EASY, spice: RecipeSpiceLevel.NONE, img: '/assets/images/placeholder_recipe_19.jpg' },
        { name: 'Sebzeli Noodle', slug: 'sebzeli-noodle', protein: ProteinType.VEGGIE, time: 15, diff: RecipeDifficulty.EASY, spice: RecipeSpiceLevel.HOT, img: '/assets/images/placeholder_recipe_20.jpg' },
    ]

    const createdRecipes = []
    for (const r of recipesData) {
        const recipe = await prisma.recipe.create({
            data: {
                name: r.name,
                slug: r.slug,
                description: r.name + ' - En taze malzemelerle hazırlanan lezzetli bir tarif.',
                imageUrl: r.img,
                timeMinutes: r.time,
                difficulty: r.diff,
                spiceLevel: r.spice,
                proteinType: r.protein,
                isPublished: true,
                steps: {
                    create: [
                        { stepNumber: 1, instruction: 'Malzemeleri hazırlayın.' },
                        { stepNumber: 2, instruction: 'Pişirin ve servis yapın.' }
                    ]
                }
            }
        })
        createdRecipes.push(recipe)
    }

    // Menu Weeks
    const collections = ['İmza Tabaklar', 'Sokak Lezzetleri', 'Ev Klasikleri', 'Hafif & Dengeli', 'Dünya Turu']

    const today = new Date()
    let currentWeek = 24

    for (let i = 0; i < 4; i++) {
        const cutoff = new Date(today)
        cutoff.setDate(today.getDate() + (i * 7) + 3)

        const menu = await prisma.menuWeek.create({
            data: {
                year: 2024,
                weekNumber: currentWeek + i,
                cutoffDate: cutoff,
                isPublished: true,
                isLocked: i === 0 && false, // First week unlocked for testing or locked if desired
            }
        })

        // Assign 10 recipes to each week randomly across collections
        for (let j = 0; j < 10; j++) {
            const recipe = createdRecipes[(i * 5 + j) % createdRecipes.length]
            await prisma.menuWeekRecipe.create({
                data: {
                    menuWeekId: menu.id,
                    recipeId: recipe.id,
                    collection: collections[j % collections.length]
                }
            })
        }
    }

    console.log('Seeding completed.')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
