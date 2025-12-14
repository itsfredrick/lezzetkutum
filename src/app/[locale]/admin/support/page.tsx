"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Phone, Mail, MapPin, Clock, MoreVertical, Archive, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const TICKETS = [
    { id: 1, user: "Ayşe Yılmaz", avatar: "/assets/images/avatar_1.jpg", lastMsg: "Teslimat adresimi değiştirebilir miyim?", time: "10 dk önce", status: "WAITING", unread: 2 },
    { id: 2, user: "Mehmet Demir", avatar: "/assets/images/avatar_2.jpg", lastMsg: "Eksik malzeme çıktı.", time: "1 sa önce", status: "OPEN", unread: 0 },
    { id: 3, user: "Zeynep Kaya", avatar: "/assets/images/avatar_3.jpg", lastMsg: "Harika bir deneyimdi, teşekkürler!", time: "2 sa önce", status: "RESOLVED", unread: 0 },
    { id: 4, user: "Ali Vural", avatar: "/assets/images/avatar_4.jpg", lastMsg: "Ödeme sayfasında hata alıyorum.", time: "1 gün önce", status: "OPEN", unread: 1 },
];

const MESSAGES = [
    { id: 1, sender: "user", text: "Merhaba, siparişim henüz ulaşmadı. Durumu nedir?", time: "14:30" },
    { id: 2, sender: "agent", text: "Merhaba Ayşe Hanım, kontrol ediyorum. Siparişiniz şu an dağıtımda görünüyor.", time: "14:32" },
    { id: 3, sender: "user", text: "Teşekkürler. Bir de teslimat adresimi değiştirebilir miyim? Henüz gelmediyse.", time: "14:35" },
];

export default function SupportConsolePage() {
    const [activeTicket, setActiveTicket] = useState(TICKETS[0]);
    const [messageInput, setMessageInput] = useState("");

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Left Sidebar: Ticket List */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-800 mb-4">Destek Konsolu</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input placeholder="Talep ara..." className="pl-9 bg-gray-50 border-gray-200" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {TICKETS.map(ticket => (
                        <div
                            key={ticket.id}
                            onClick={() => setActiveTicket(ticket)}
                            className={cn(
                                "p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors flex gap-3",
                                activeTicket.id === ticket.id && "bg-lime-50 border-l-4 border-l-lime-500 hover:bg-lime-50"
                            )}
                        >
                            <Avatar>
                                <AvatarImage src={ticket.avatar} />
                                <AvatarFallback className="bg-gray-200 text-gray-600">{ticket.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-start mb-1">
                                    <span className={cn("font-bold text-sm", activeTicket.id === ticket.id ? "text-lime-900" : "text-gray-900")}>{ticket.user}</span>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{ticket.time}</span>
                                </div>
                                <p className="text-xs text-gray-500 truncate">{ticket.lastMsg}</p>
                            </div>
                            {ticket.unread > 0 && (
                                <div className="shrink-0 flex flex-col items-end justify-center">
                                    <Badge className="bg-lime-500 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">{ticket.unread}</Badge>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Center: Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-white">
                <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={activeTicket.avatar} />
                            <AvatarFallback>{activeTicket.user[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="font-bold text-sm text-gray-900">{activeTicket.user}</h2>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-xs text-gray-500">Çevrimiçi | Sipariş #12345</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
                            <Clock className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
                            <Archive className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                    {/* Date Divider */}
                    <div className="flex justify-center">
                        <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">Bugün</span>
                    </div>

                    {MESSAGES.map((msg) => (
                        <div key={msg.id} className={cn("flex gap-3", msg.sender === 'agent' ? "flex-row-reverse" : "")}>
                            <Avatar className="h-8 w-8 mt-1">
                                {msg.sender === 'agent' ? (
                                    <AvatarFallback className="bg-lime-600 text-white">LK</AvatarFallback>
                                ) : (
                                    <>
                                        <AvatarImage src={activeTicket.avatar} />
                                        <AvatarFallback>{activeTicket.user[0]}</AvatarFallback>
                                    </>
                                )}
                            </Avatar>
                            <div className={cn(
                                "max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                                msg.sender === 'agent'
                                    ? "bg-lime-500 text-white rounded-tr-none"
                                    : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                            )}>
                                <p>{msg.text}</p>
                                <div className={cn("text-[10px] mt-2 font-medium opacity-70", msg.sender === 'agent' ? "text-lime-100 text-right" : "text-gray-400")}>
                                    {msg.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="relative flex items-center gap-2 max-w-4xl mx-auto">
                        <Input
                            placeholder="Bir mesaj yazın..."
                            className="h-12 rounded-xl bg-gray-50 border-gray-200 pr-12 text-base focus-visible:ring-lime-500"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <Button className="absolute right-2 h-9 w-9 p-0 rounded-lg bg-lime-500 hover:bg-lime-600 text-white shadow-sm">
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Sidebar: Customer Profile */}
            <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto hidden xl:block">
                <div className="text-center mb-8">
                    <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-gray-50">
                        <AvatarImage src={activeTicket.avatar} />
                        <AvatarFallback className="text-xl bg-gray-100 text-gray-500">{activeTicket.user[0]}</AvatarFallback>
                    </Avatar>
                    <h2 className="font-bold text-lg text-gray-900">{activeTicket.user}</h2>
                    <Badge variant="outline" className="mt-2 text-lime-600 bg-lime-50 border-lime-200">VIP Müşteri</Badge>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">İletişim Bilgileri</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Mail className="w-4 h-4 stroke-2" />
                            <span>ayse.yilmaz@example.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Phone className="w-4 h-4 stroke-2" />
                            <span>+90 555 123 45 67</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 stroke-2 mt-0.5" />
                            <span className="leading-snug">Bağdat Cad. No:123 Kadıköy / İstanbul</span>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Son Siparişler</h3>
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-gray-900 text-xs">#12345</span>
                                <Badge className="text-[10px] bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-1.5 h-5">Dağıtımda</Badge>
                            </div>
                            <div className="text-xs text-gray-500">12 Ekim • 450 ₺</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-gray-900 text-xs">#12102</span>
                                <Badge className="text-[10px] bg-green-100 text-green-700 hover:bg-green-100 border-none px-1.5 h-5">Teslim Edildi</Badge>
                            </div>
                            <div className="text-xs text-gray-500">5 Ekim • 420 ₺</div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    <div className="space-y-3">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Aksiyonlar</h3>
                        <Button variant="outline" className="w-full justify-start gap-2 border-gray-200 text-gray-700 hover:bg-gray-50">
                            <CheckCircle className="w-4 h-4" /> Talebi Çözümle
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 border-gray-200 text-gray-700 hover:bg-gray-50">
                            <XCircle className="w-4 h-4" /> İade Oluştur
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
