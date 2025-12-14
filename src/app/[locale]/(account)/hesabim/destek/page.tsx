
import CreateTicketForm from "@/components/account/CreateTicketForm";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const prisma = new PrismaClient();

async function getUserTickets(email: string) {
    return await prisma.supportTicket.findMany({
        where: { user: { email } },
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { messages: true } } }
    });
}

export default async function AccountSupportPage() {
    const session = await auth();
    const tickets = await getUserTickets(session?.user?.email!);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Destek Taleplerim</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gap-2"><Plus className="w-4 h-4" /> Yeni Talep</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Yeni Destek Talebi</DialogTitle>
                        </DialogHeader>
                        <CreateTicketForm />
                    </DialogContent>
                </Dialog>
            </div>

            {tickets.length === 0 ? (
                <Card className="text-center py-12">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-neutral-900">Henüz bir talebiniz yok</h3>
                        <p className="text-neutral-500 max-w-sm">
                            Siparişleriniz veya hesabınızla ilgili bir sorunuz varsa buradan bize ulaşabilirsiniz.
                        </p>
                    </div>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {tickets.map((ticket) => (
                        <Card key={ticket.id} className="hover:border-primary transition-colors cursor-pointer" >
                            <Link href={`/account/support/${ticket.id}`} className="block p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg">{ticket.subject}</h3>
                                        <p className="text-sm text-neutral-500">Kategori: {ticket.category}</p>
                                    </div>
                                    <Badge className={ticket.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-700'}>
                                        {ticket.status === 'OPEN' ? 'Açık' : 'Kapalı'}
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center text-xs text-neutral-400 mt-4">
                                    <span>#{ticket.id.slice(0, 8)}</span>
                                    <span>{ticket.createdAt.toLocaleDateString("tr-TR")} • {ticket._count.messages} Mesaj</span>
                                </div>
                            </Link>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
