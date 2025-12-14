export const RECIPES = [
    {
        id: "1",
        name: "Mantarlı Tavuk Sote",
        description: "Basmati pilav ve taze kekik ile",
        image: "/assets/images/recipe_1.png",
        time: "25 dk",
        calories: 650,
        tags: ["Proteini Bol"],
        price: 115.00
    },
    {
        id: "2",
        name: "Ege Usulü Sebze Kasesi",
        description: "Avokado ve kinoa eşliğinde",
        image: "/assets/images/recipe_2.png",
        time: "15 dk",
        calories: 420,
        tags: ["Şefin Seçimi"],
        price: 105.00
    },
    {
        id: "3",
        name: "Fesleğenli Makarna",
        description: "Ev yapımı domates sosu ile",
        image: "/assets/images/recipe_1.png",
        time: "20 dk",
        calories: 550,
        tags: ["Vejetaryen"],
        price: 95.00
    },
    {
        id: "4",
        name: "Izgara Köfte Tabağı",
        description: "Piyaz ve közlenmiş biber ile",
        image: "/assets/images/recipe_2.png",
        time: "35 dk",
        calories: 720,
        tags: [],
        price: 130.00
    },
    {
        id: "5",
        name: "Fırında Somon",
        description: "Kuşkonmaz ve limon sosu ile",
        image: "/assets/images/recipe_1.png",
        time: "30 dk",
        calories: 580,
        tags: ["Deniz Ürünü"],
        price: 145.00
    },
    {
        id: "6",
        name: "Acılı Dana Eti Wok",
        description: "Noodle ve mevsim sebzeleri ile",
        image: "/assets/images/recipe_2.png",
        time: "20 dk",
        calories: 600,
        tags: ["Acı"],
        price: 125.00
    }
];

export const PLANS = [
    {
        id: '2-people',
        title: "2 Kişilik",
        description: "Çiftler veya arkadaşlar için.",
        basePrice: 120, // Per portion
    },
    {
        id: '4-people',
        title: "4 Kişilik",
        description: "Aileler ve misafirler için.",
        basePrice: 105, // Per portion (Discounted)
    }
];

export const calculateOrderTotal = (totalRecipes: number, peopleCount: number) => {
    // Logic: Base price depends on plan, multiplied by meals and people
    // Simple mock logic matching previous component behavior
    const plan = PLANS.find(p => p.id === (peopleCount === 2 ? '2-people' : '4-people')) || PLANS[0];
    const subtotal = plan.basePrice * totalRecipes * peopleCount;
    const shipping = subtotal > 500 ? 0 : 39.90;

    return {
        subtotal,
        shipping,
        total: subtotal + shipping,
        pricePerServing: plan.basePrice
    };
};
