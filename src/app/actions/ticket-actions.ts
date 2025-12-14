"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Create a new ticket (User)
export async function createTicket(prevState: unknown, formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) return { success: false, message: "Oturum açmalısınız" };

    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const category = formData.get("category") as string;

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return { success: false, message: "Kullanıcı bulunamadı" };

    try {
        const ticket = await prisma.supportTicket.create({
            data: {
                userId: user.id,
                subject,
                category,
                messages: {
                    create: {
                        senderId: user.id,
                        senderRole: 'USER',
                        message
                    }
                }
            }
        });
        revalidatePath("/hesabim/destek");
        return { success: true, message: "Destek talebi oluşturuldu" };
    } catch (e) {
        return { success: false, message: "Hata oluştu" };
    }
}

// Reply to ticket (Admin or User)
export async function replyToTicket(ticketId: string, message: string) {
    const session = await auth();
    if (!session?.user?.email) return { success: false };

    // Determine role (simplified) - in real app check session role
    // For now assuming if coming from /admin it's admin, but we need safe role check
    // We'll trust the user role stored in session for now from auth.config
    // But `auth()` session might just have name/email/image. logic needs to fetch user 

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return { success: false };

    const role = user.role === 'ADMIN' ? 'ADMIN' : 'USER';

    await prisma.ticketMessage.create({
        data: {
            ticketId,
            senderId: user.id,
            senderRole: role,
            message
        }
    });

    // If admin replies, possibly change status to IN_PROGRESS or RESOLVED?
    // Let's keep it simple
    revalidatePath(`/admin/destek/${ticketId}`);
    revalidatePath(`/hesabim/destek/${ticketId}`);
    return { success: true };
}

// Update status (Admin)
export async function updateTicketStatus(ticketId: string, status: string) {
    await prisma.supportTicket.update({
        where: { id: ticketId },
        data: { status }
    });
    revalidatePath("/admin/destek");
}
