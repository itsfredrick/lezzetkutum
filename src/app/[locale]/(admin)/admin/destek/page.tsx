
import { PrismaClient } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

const prisma = new PrismaClient();

async function getTickets() {
    return await prisma.supportTicket.findMany({
        include: {
            user: true,
            _count: { select: { messages: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
}

export default async function AdminSupportPage() {
    const tickets = await getTickets();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Destek Talepleri</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Bekleyen Talepler</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Talep ID</TableHead>
                                <TableHead>Kullanıcı</TableHead>
                                <TableHead>Konu</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Durum</TableHead>
                                <TableHead>Tarih</TableHead>
                                <TableHead>Mesaj</TableHead>
                                <TableHead className="text-right">İşlem</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell className="font-mono text-xs">{ticket.id.slice(0, 8)}</TableCell>
                                    <TableCell>{ticket.user.email}</TableCell>
                                    <TableCell className="font-medium">{ticket.subject}</TableCell>
                                    <TableCell><Badge variant="outline">{ticket.category}</Badge></TableCell>
                                    <TableCell>
                                        <Badge className={
                                            ticket.status === 'OPEN' ? 'bg-red-100 text-red-700' :
                                                ticket.status === 'CLOSED' ? 'bg-neutral-100 text-neutral-700' :
                                                    'bg-blue-100 text-blue-700'
                                        }>
                                            {ticket.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{ticket.createdAt.toLocaleDateString("tr-TR")}</TableCell>
                                    <TableCell>{ticket._count.messages}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/support/${ticket.id}`}>Yönet</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
