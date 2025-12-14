"use client";

import { useActionState } from "react";
import { createTicket } from "@/app/actions/ticket-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialState = {
    success: false,
    message: ''
};

export default function CreateTicketForm() {
    const [state, formAction] = useActionState(createTicket, initialState);

    return (
        <form action={formAction} className="space-y-4 pt-4">
            <div className="space-y-2">
                <Label htmlFor="category">Konu Başlığı</Label>
                <Select name="category" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="DELIVERY">Teslimat Sorunu</SelectItem>
                        <SelectItem value="MISSING_ITEM">Eksik/Hasarlı Ürün</SelectItem>
                        <SelectItem value="QUALITY">Kalite Bildirimi</SelectItem>
                        <SelectItem value="BILLING">Ödeme/Fatura</SelectItem>
                        <SelectItem value="OTHER">Diğer</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="subject">Başlık</Label>
                <Input name="subject" placeholder="Örn: Siparişim Geç Kaldı" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="message">Mesajınız</Label>
                <Textarea name="message" placeholder="Detayları buraya yazınız..." required />
            </div>

            {state.message && (
                <div className={`text-sm p-3 rounded-md ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {state.message}
                </div>
            )}

            <Button type="submit" className="w-full">Gönder</Button>
        </form>
    );
}
