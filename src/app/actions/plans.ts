'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPlans() {
    try {
        const plans = await prisma.plan.findMany({
            where: { isActive: true },
            orderBy: { basePriceTRY: 'asc' },
        });
        return plans;
    } catch (error) {
        console.error('Failed to fetch plans:', error);
        return [];
    }
}

export async function getPlanBySlug(slug: string) {
    try {
        const plan = await prisma.plan.findUnique({
            where: { slug },
        });
        return plan;
    } catch (error) {
        console.error('Failed to fetch plan:', error);
        return null;
    }
}
