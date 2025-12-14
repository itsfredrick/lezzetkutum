
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Cleanup
    const tablenames = await prisma.$queryRaw<Array<{ name: string }>>`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma_migrations';`

    for (const { name } of tablenames) {
        try {
            await prisma.$executeRawUnsafe(`DELETE FROM "${name}";`)
        } catch (error) {
            console.log(`Failed to clean ${name}: ${error}`)
        }
    }

    // 1. Plans
    const plans = await Promise.all([
        prisma.plan.create({
            data: {
                name: '2 Kişilik / 3 Öğün',
                slug: '2-people-3-meals',
                personCount: 2,
                mealsPerWeek: 3,
                basePriceTRY: 600.00,
                pricePerServingTRY: 100.00,
                deliveryFeeTRY: 0,
            }
        }),
        prisma.plan.create({
            data: {
                name: '4 Kişilik / 3 Öğün',
                slug: '4-people-3-meals',
                personCount: 4,
                mealsPerWeek: 3,
                basePriceTRY: 1100.00,
                pricePerServingTRY: 91.66,
                deliveryFeeTRY: 0,
            }
        }),
        prisma.plan.create({
            data: {
                name: '2 Kişilik / 4 Öğün',
                slug: '2-people-4-meals',
                personCount: 2,
                mealsPerWeek: 4,
                basePriceTRY: 750.00,
                pricePerServingTRY: 93.75,
                deliveryFeeTRY: 0,
            }
        })
    ])

    // 2. Users
    const admin = await prisma.user.create({
        data: {
            email: 'admin@lezzetkutum.com',
            name: 'Admin User',
            role: 'ADMIN',
        }
    })

    const customer = await prisma.user.create({
        data: {
            email: 'user@example.com',
            name: 'Ayşe Yılmaz',
            role: 'CUSTOMER',
            subscription: {
                create: {
                    planId: plans[0].id,
                    status: 'ACTIVE',
                    deliveryZone: 'Istanbul-Europe',
                    deliveryDay: 'Monday',
                    deliveryWindow: '18:00-21:00'
                }
            },
            addresses: {
                create: {
                    title: 'Ev',
                    city: 'İstanbul',
                    district: 'Kadıköy',
                    fullAddress: 'Bağdat Cad. No:1 D:5',
                    zipCode: '34744'
                }
            }
        }
    })

    // 3. Recipes (20 Real-ish Recipes)
    const recipesData = [
        { name: 'Izgara Tavuk ve Kök Sebzeler', slug: 'izgara-tavuk', protein: 'CHICKEN', time: 30, diff: 'EASY', spice: 'MILD', img: '/assets/images/recipe_1.png' },
        { name: 'Mantarlı ve Ispanaklı Lazanya', slug: 'mantarli-lazanya', protein: 'VEGGIE', time: 45, diff: 'MEDIUM', spice: 'NONE', img: '/assets/images/recipe_2.png' },
        { name: 'Anne Köftesi ve Piyaz', slug: 'anne-koftesi', protein: 'BEEF', time: 40, diff: 'EASY', spice: 'MILD', img: '/assets/images/recipe_3.png' },
        { name: 'Meksika Usulü Taco', slug: 'meksika-taco', protein: 'BEEF', time: 25, diff: 'EASY', spice: 'HOT', img: '/assets/images/recipe_2.png' }, // reusing img
        { name: 'Hint Usulü Körili Tavuk', slug: 'korili-tavuk', protein: 'CHICKEN', time: 35, diff: 'MEDIUM', spice: 'MEDIUM', img: '/assets/images/recipe_1.png' },
        { name: 'Avokadolu Kinoa Salatası', slug: 'avokadolu-kinoa', protein: 'VEGAN', time: 20, diff: 'EASY', spice: 'NONE', img: '/assets/images/recipe_2.png' },
        { name: 'Somon ve Kuşkonmaz', slug: 'somon-kuskonmaz', protein: 'FISH', time: 30, diff: 'EASY', spice: 'NONE', img: '/assets/images/recipe_3.png' },
        { name: 'Etli Nohut Yemeği', slug: 'etli-nohut', protein: 'BEEF', time: 50, diff: 'MEDIUM', spice: 'MILD', img: '/assets/images/recipe_1.png' },
        { name: 'Zeytinyağılı Enginar', slug: 'zeytinyagli-enginar', protein: 'VEGAN', time: 40, diff: 'MEDIUM', spice: 'NONE', img: '/assets/images/recipe_2.png' },
        { name: 'Karnıyarık', slug: 'karniyarik', protein: 'BEEF', time: 60, diff: 'HARD', spice: 'MILD', img: '/assets/images/recipe_3.png' },
        // 11-20
        { name: 'Mercimek Çorbası', slug: 'mercimek-corbasi', protein: 'VEGAN', time: 30, diff: 'EASY', spice: 'MILD', img: '/assets/images/recipe_1.png' },
        { name: 'Hamburger', slug: 'hamburger', protein: 'BEEF', time: 25, diff: 'MEDIUM', spice: 'NONE', img: '/assets/images/recipe_2.png' },
        { name: 'Sezar Salata', slug: 'sezar-salata', protein: 'CHICKEN', time: 20, diff: 'EASY', spice: 'NONE', img: '/assets/images/recipe_3.png' },
        { name: 'Fırında Levrek', slug: 'firinda-levrek', protein: 'FISH', time: 45, diff: 'MEDIUM', spice: 'NONE', img: '/assets/images/recipe_1.png' },
        { name: 'Falafel Dürüm', slug: 'falafel-durum', protein: 'VEGAN', time: 40, diff: 'MEDIUM', spice: 'MILD', img: '/assets/images/recipe_2.png' },
        { name: 'Taze Fasulye', slug: 'taze-fasulye', protein: 'VEGAN', time: 40, diff: 'EASY', spice: 'NONE', img: '/assets/images/recipe_3.png' },
        { name: 'Hünkar Beğendi', slug: 'hunkar-begendi', protein: 'BEEF', time: 60, diff: 'HARD', spice: 'NONE', img: '/assets/images/recipe_1.png' },
        { name: 'Tavuk Sote', slug: 'tavuk-sote', protein: 'CHICKEN', time: 30, diff: 'EASY', spice: 'MILD', img: '/assets/images/recipe_2.png' },
        { name: 'Makarna Bolonez', slug: 'makarna-bolonez', protein: 'BEEF', time: 35, diff: 'EASY', spice: 'NONE', img: '/assets/images/recipe_3.png' },
        { name: 'Sebzeli Noodle', slug: 'sebzeli-noodle', protein: 'VEGGIE', time: 15, diff: 'EASY', spice: 'HOT', img: '/assets/images/recipe_1.png' },
    ]

    const createdRecipes = []
    for (const r of recipesData) {
        const nutrition = JSON.stringify({ protein: 30, carbs: 45, fat: 20 })
        const allergens = JSON.stringify(r.protein === 'FISH' ? ['fish'] : [])

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
                nutrition,
                allergens,
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

    // 4. Menu Weeks (4 weeks ahead)
    const collections = ['İmza Tabaklar', 'Sokak Lezzetleri', 'Ev Klasikleri', 'Hafif & Dengeli', 'Dünya Turu']
    const today = new Date()

    // Align to next Monday
    const nextMonday = new Date(today)
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7))
    nextMonday.setHours(0, 0, 0, 0)

    for (let i = 0; i < 4; i++) {
        const weekStart = new Date(nextMonday)
        weekStart.setDate(nextMonday.getDate() + (i * 7))

        // Cutoff is 4 days before delivery (Thurs before Mon)
        const cutoff = new Date(weekStart)
        cutoff.setDate(weekStart.getDate() - 4)

        const menu = await prisma.menuWeek.create({
            data: {
                year: weekStart.getFullYear(),
                weekNumber: getWeekNumber(weekStart),
                weekStartDate: weekStart,
                cutoffDate: cutoff,
                isPublished: true,
                isLocked: i === 0, // First week might be locked if close
                city: 'Istanbul',
                zone: 'Europe'
            }
        })

        // Assign 15 recipes per week
        for (let j = 0; j < 15; j++) {
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

function getWeekNumber(d: Date) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
