'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

interface CreateOrderData {
    userId?: string; // If authenticated
    userEmail: string; // Required for guest/user
    planId: string;
    menuWeekId?: string;
    recipeIds: string[];
    totalAmount: number;
    deliveryDate: Date;
    address: {
        city: string;
        district: string;
        fullAddress: string;
        title?: string;
        zipCode?: string;
    };
}

export async function createOrder(data: CreateOrderData) {
    try {
        // 1. Find or Create User (Simplistic for MVP)
        let user;
        if (data.userId) {
            user = await prisma.user.findUnique({ where: { id: data.userId } });
        } else {
            // Guest-ish flow: upsert by email
            user = await prisma.user.upsert({
                where: { email: data.userEmail },
                update: {},
                create: {
                    email: data.userEmail,
                    name: data.userEmail.split('@')[0], // Placeholder
                    role: 'CUSTOMER'
                }
            });
        }

        if (!user) throw new Error("User could not be processed");

        // 2. Create Order
        // Note: In real app, we might verify pricing here again to prevent tampering.
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                menuWeekId: data.menuWeekId,
                status: 'PENDING',
                paymentStatus: 'UNPAID', // Pending payment gateway
                totalAmount: data.totalAmount,
                deliveryDate: data.deliveryDate,
                items: {
                    create: data.recipeIds.map(rId => ({
                        recipeId: rId,
                        quantity: 1 // Assuming 1 quantity per selection for now, or map from input
                    }))
                },
                deliveryAddress: {
                    create: {
                        city: data.address.city,
                        district: data.address.district,
                        fullAddress: data.address.fullAddress,
                        title: data.address.title,
                        zipCode: data.address.zipCode
                    }
                },
                events: {
                    create: {
                        type: 'ORDER_CREATED',
                        notes: 'Order initiated via web checkout'
                    }
                }
            }
        });

        revalidatePath('/dashboard');
        return { success: true, orderId: order.id };

    } catch (error) {
        console.error("Create Create Order Error:", error);
        return { success: false, error: "Sipariş oluşturulamadı." };
    }
}
