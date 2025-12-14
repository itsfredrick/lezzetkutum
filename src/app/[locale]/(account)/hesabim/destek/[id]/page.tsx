
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { replyToTicket } from "@/app/actions/ticket-actions";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

async function getTicket(id: string, userEmail: string) {
    const ticket = await prisma.supportTicket.findUnique({
        where: { id },
        include: {
            messages: { orderBy: { createdAt: 'asc' } },
            user: true
        }
    });

    // Security check: only allow owner to view
    if (!ticket || ticket.user.email !== userEmail) return null;
    return ticket;
}

export default async function AccountTicketDetailPage({ params }: { params: { id: string } }) {
    const session = await auth();
    if (!session?.user?.email) redirect('/auth/login');

    const ticket = await getTicket(params.id, session.user.email);
    if (!ticket) redirect('/account/support');

    async function handleReply(formData: FormData) {
        "use server";
        const message = formData.get("message") as string;
        await replyToTicket(ticket!.id, message);
    }

    return (
        <div className="space-y-6 h-[calc(100vh-200px)] flex flex-col">
            <div className="bg-white p-6 rounded-xl border border-neutral-200">
                <h1 className="text-xl font-bold mb-1">{ticket.subject}</h1>
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <span className="font-mono bg-neutral-100 px-2 py-0.5 rounded">#{ticket.id.slice(0, 8)}</span>
                    <span>{ticket.category}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 p-4">
                {ticket.messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.senderRole === 'USER' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 ${msg.senderRole === 'USER' ? 'bg-primary text-white rounded-br-none' : 'bg-white border border-neutral-200 rounded-bl-none'}`}>
                            <p className="text-sm">{msg.message}</p>
                            <span className="text-[10px] opacity-70 block mt-2 text-right">
                                {msg.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {ticket.status !== 'CLOSED' && (
                <div className="bg-white p-4 rounded-xl border border-neutral-200">
                    <form action={handleReply} className="flex gap-4">
                        <Textarea name="message" placeholder="Yanıt yaz..." className="flex-1 min-h-[50px]" required />
                        <Button type="submit">Gönder</Button>
                    </form>
                </div>
            )}

            {ticket.status === 'CLOSED' && (
                <div className="text-center p-4 bg-neutral-100 rounded-xl text-neutral-500 font-medium">
                    Bu talep kapatılmıştır.
                </div>
            )}
        </div>
    );
}
