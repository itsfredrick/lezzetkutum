
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export type AnalyticsEvent =
    | "USER_LOGIN"
    | "USER_REGISTER"
    | "CHECKOUT_INITIATED"
    | "ORDER_COMPLETED"
    | "COUPON_APPLIED"
    | "SUBSCRIPTION_UPDATED"
    | "TICKET_CREATED";

export async function logEvent(event: AnalyticsEvent, metadata?: Record<string, unknown>) {
    try {
        const session = await auth();
        const userId = session?.user?.id; // Note: id might not be in default session type without extending details, but let's assume standard behavior or null

        // In a real high-scale app, this would be a fire-and-forget message queue push.
        // For this MVP, direct DB write is fine.

        await prisma.eventLog.create({
            data: {
                userId: userId || null,
                event,
                metadata: metadata ? JSON.stringify(metadata) : null,
                // ipAddress and userAgent would need headers() access, skipping for simplicity in this utility
            }
        });
    } catch (error) {
        console.error("Analytics Error:", error);
        // Fail silently, don't block user flow
    }
}
