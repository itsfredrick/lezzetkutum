"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

const createCouponSchema = z.object({
    code: z.string().min(3).toUpperCase(),
    discountType: z.enum(["PERCENT", "FIXED"]),
    value: z.coerce.number().positive(),
    minBasket: z.coerce.number().min(0).default(0),
    maxUsage: z.coerce.number().int().positive().default(100),
    expiresAt: z.string().transform((str) => new Date(str)),
});

export async function createCoupon(prevState: unknown, formData: FormData) {
    const session = await auth();
    // In real app check session?.user?.role === 'ADMIN'

    const validatedFields = createCouponSchema.safeParse({
        code: formData.get("code"),
        discountType: formData.get("discountType"),
        value: formData.get("value"),
        minBasket: formData.get("minBasket"),
        maxUsage: formData.get("maxUsage"),
        expiresAt: formData.get("expiresAt"),
    });

    if (!validatedFields.success) {
        return { success: false, message: "Geçersiz veri girişi", errors: validatedFields.error.flatten().fieldErrors };
    }

    try {
        await prisma.coupon.create({
            data: validatedFields.data
        });
        revalidatePath("/admin/promosyonlar");
        return { success: true, message: "Kupon oluşturuldu" };
    } catch (error) {
        return { success: false, message: "Kupon oluşturulurken bir hata oluştu (Kod benzersiz olmalı)" };
    }
}

export async function toggleCouponStatus(id: string, isActive: boolean) {
    await prisma.coupon.update({
        where: { id },
        data: { isActive }
    });
    revalidatePath("/admin/promosyonlar");
}
