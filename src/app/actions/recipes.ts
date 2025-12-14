'use server';

import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export async function getCurrentMenuWeek() {
    const now = new Date();
    // Find the active week (published, not locked, or just close to date)
    const week = await prisma.menuWeek.findFirst({
        where: {
            weekStartDate: {
                gte: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7) // Recent/Upcoming
            },
            isPublished: true,
        },
        include: {
            recipes: {
                include: {
                    recipe: true
                }
            }
        },
        orderBy: {
            weekStartDate: 'asc'
        }
    });

    return week;
}

export async function getRecipeBySlug(slug: string) {
    const recipe = await prisma.recipe.findUnique({
        where: { slug },
        include: {
            ingredients: {
                include: { ingredient: true }
            },
            steps: {
                orderBy: { stepNumber: 'asc' }
            }
        }
    });

    if (!recipe) return null;
    return recipe;
}

export async function getAllRecipes(query?: string) {
    if (query) {
        return prisma.recipe.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { description: { contains: query } }
                ],
                isPublished: true,
            },
            take: 20
        });
    }
    return prisma.recipe.findMany({
        where: { isPublished: true },
        take: 20,
        orderBy: { createdAt: 'desc' }
    });
}
