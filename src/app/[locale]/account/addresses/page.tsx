"use client";

import { Button } from "@/components/ui/button";
import { Plus, MapPin, MoreVertical, Pencil, Trash2, Home, Briefcase, Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Types
type Address = {
    id: string;
    title: string;
    type: "HOME" | "WORK" | "OTHER";
    fullAddress: string;
    city: string;
    district: string;
    isDefault: boolean;
};

// Mock Initial Data
const INITIAL_ADDRESSES: Address[] = [
    {
        id: "1",
        title: "Ev",
        type: "HOME",
        fullAddress: "Fenerbahçe Mah. Bağdat Cad. No: 102/4",
        city: "İstanbul",
        district: "Kadıköy",
        isDefault: true,
    },
    {
        id: "2",
        title: "Ofis",
        type: "WORK",
        fullAddress: "Maslak Mah. Büyükdere Cad. No: 23 Plazalar",
        city: "İstanbul",
        district: "Sarıyer",
        isDefault: false,
    }
];

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State (Simple controlled inputs for demo)
    const [formData, setFormData] = useState({ title: "", type: "HOME", address: "", city: "", district: "" });

    const handleSave = () => {
        if (!formData.title || !formData.address) {
            toast.error("Lütfen zorunlu alanları doldurun.");
            return;
        }

        if (editingId) {
            // Edit Mode
            setAddresses(prev => prev.map(addr => addr.id === editingId ? { ...addr, title: formData.title, fullAddress: formData.address, city: formData.city, district: formData.district, type: formData.type as any } : addr));
            toast.success("Adres güncellendi.");
        } else {
            // Add Mode
            const newAddr: Address = {
                id: Math.random().toString(36).substr(2, 9),
                title: formData.title,
                type: formData.type as any,
                fullAddress: formData.address,
                city: formData.city,
                district: formData.district,
                isDefault: addresses.length === 0 // Make default if first
            };
            setAddresses([...addresses, newAddr]);
            toast.success("Yeni adres eklendi.");
        }
        setIsDialogOpen(false);
        resetForm();
    };

    const handleDelete = (id: string) => {
        setAddresses(prev => prev.filter(a => a.id !== id));
        toast.success("Adres silindi.");
    };

    const handleSetDefault = (id: string) => {
        setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
        toast.success("Varsayılan adres değiştirildi.");
    };

    const openEdit = (addr: Address) => {
        setFormData({ title: addr.title, type: addr.type, address: addr.fullAddress, city: addr.city, district: addr.district });
        setEditingId(addr.id);
        setIsDialogOpen(true);
    };

    const openAdd = () => {
        resetForm();
        setIsDialogOpen(true);
    };

    const resetForm = () => {
        setFormData({ title: "", type: "HOME", address: "", city: "", district: "" });
        setEditingId(null);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold text-neutral-900">Teslimat Adresleri</h1>
                    <p className="text-neutral-500">Kayıtlı adreslerinizi buradan yönetebilirsiniz.</p>
                </div>
                <Button onClick={openAdd} className="bg-lime-500 hover:bg-lime-600 text-white font-bold gap-2">
                    <Plus className="w-4 h-4" /> Yeni Adres Ekle
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                    <div key={addr.id} className={cn(
                        "p-6 rounded-2xl border bg-white shadow-sm relative group transition-all",
                        addr.isDefault ? "border-lime-200 ring-1 ring-lime-100" : "border-neutral-200 hover:border-neutral-300"
                    )}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    addr.type === 'HOME' && "bg-blue-50 text-blue-600",
                                    addr.type === 'WORK' && "bg-orange-50 text-orange-600",
                                    addr.type === 'OTHER' && "bg-neutral-100 text-neutral-600",
                                )}>
                                    {addr.type === 'HOME' && <Home className="w-5 h-5" />}
                                    {addr.type === 'WORK' && <Briefcase className="w-5 h-5" />}
                                    {addr.type === 'OTHER' && <MapPin className="w-5 h-5" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-neutral-900">{addr.title}</h3>
                                    {addr.isDefault && <span className="text-[10px] font-bold text-lime-600 uppercase tracking-wider">Varsayılan</span>}
                                </div>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-neutral-900"><MoreVertical className="w-4 h-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleSetDefault(addr.id)} disabled={addr.isDefault}>
                                        <Check className="w-4 h-4 mr-2" /> Varsayılan Yap
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => openEdit(addr)}>
                                        <Pencil className="w-4 h-4 mr-2" /> Düzenle
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(addr.id)} className="text-red-600 focus:text-red-600">
                                        <Trash2 className="w-4 h-4 mr-2" /> Sil
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <p className="text-neutral-600 text-sm leading-relaxed mb-1">
                            {addr.fullAddress}
                        </p>
                        <p className="text-neutral-500 text-xs font-medium">
                            {addr.district} / {addr.city}
                        </p>
                    </div>
                ))}

                {/* Empty State Add Button */}
                <button
                    onClick={openAdd}
                    className="border-2 border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center p-6 text-neutral-400 hover:border-lime-500 hover:text-lime-600 hover:bg-lime-50/30 transition-all min-h-[180px]"
                >
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-sm">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-bold">Yeni Adres Ekle</span>
                </button>
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingId ? "Adresi Düzenle" : "Yeni Adres Ekle"}</DialogTitle>
                        <DialogDescription>
                            Teslimat adresinizi aşağıdan detaylandırın.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Başlık</Label>
                            <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Örn: Evim, İşyeri" className="col-span-3" />
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right mt-3">Tip</Label>
                            <RadioGroup value={formData.type} onValueChange={(val) => setFormData({ ...formData, type: val as any })} className="flex gap-4 col-span-3 pt-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="HOME" id="r-home" />
                                    <Label htmlFor="r-home">Ev</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="WORK" id="r-work" />
                                    <Label htmlFor="r-work">İş</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="OTHER" id="r-other" />
                                    <Label htmlFor="r-other">Diğer</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="city" className="text-right">Şehir</Label>
                            <Input id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder="İstanbul" className="col-span-3" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="district" className="text-right">İlçe</Label>
                            <Input id="district" value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} placeholder="Kadıköy" className="col-span-3" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">Açık Adres</Label>
                            <Textarea id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Mahalle, Cadde, Sokak, Kapı No..." className="col-span-3" />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" onClick={handleSave} className="font-bold bg-lime-500 hover:bg-lime-600 text-white">Kaydet</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
