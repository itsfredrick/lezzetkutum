
import { PrismaClient } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { replyToTicket, updateTicketStatus } from "@/app/actions/ticket-actions";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

async function getTicket(id: string) {
    return await prisma.supportTicket.findUnique({
        where: { id },
        include: {
            user: true,
            messages: { orderBy: { createdAt: 'asc' } }
        }
    });
}

export default async function AdminTicketDetail({ params }: { params: { id: string } }) {
    const ticket = await getTicket(params.id);
    if (!ticket) return <div>Bulunamadı</div>;

    async function handleReply(formData: FormData) {
        "use server";
        const message = formData.get("message") as string;
        await replyToTicket(ticket!.id, message);
    }

    async function handleStatus(formData: FormData) {
        "use server";
        const status = formData.get("status") as string;
        await updateTicketStatus(ticket!.id, status);
    }

    return (
        <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start bg-white p-6 rounded-xl border border-neutral-200">
                <div>
                    <h1 className="text-2xl font-bold mb-2">{ticket.subject}</h1>
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <span>Kullanıcı: <span className="text-neutral-900 font-bold">{ticket.user.email}</span></span>
                        <span>Kategori: {ticket.category}</span>
                        <span>ID: {ticket.id}</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <form action={handleStatus}>
                        <div className="flex items-center gap-2">
                            <select name="status" defaultValue={ticket.status} className="border rounded h-9 px-2 text-sm">
                                <option value="OPEN">Açık</option>
                                <option value="IN_PROGRESS">İşlemde</option>
                                <option value="CLOSED">Kapalı</option>
                            </select>
                            <Button size="sm" variant="secondary">Güncelle</Button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-neutral-50 p-6 rounded-xl border border-neutral-200 space-y-6">
                {ticket.messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.senderRole === 'ADMIN' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] rounded-2xl p-4 ${msg.senderRole === 'ADMIN' ? 'bg-primary text-white' : 'bg-white border border-neutral-200'}`}>
                            <div className="font-bold text-xs mb-1 opacity-70">
                                {msg.senderRole === 'ADMIN' ? 'Destek Ekibi' : ticket.user.name || 'Kullanıcı'}
                                <span className="ml-2 font-normal opacity-50">{msg.createdAt.toLocaleTimeString()}</span>
                            </div>
                            <p className="whitespace-pre-wrap">{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Reply Input */}
            <div className="bg-white p-4 rounded-xl border border-neutral-200">
                <form action={handleReply} className="flex gap-4">
                    <Textarea name="message" placeholder="Yanıtınızı yazın..." className="flex-1" required />
                    <Button type="submit" className="h-auto">Yanıtla</Button>
                </form>
            </div>
        </div>
    );
}
