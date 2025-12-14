"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Check, Lock } from "lucide-react";

const STEPS = [
    { id: 1, label: "Plan", path: "/select-plan" },
    { id: 2, label: "Yemek Seçimi", path: "/select-recipes" },
    { id: 3, label: "Teslimat", path: "/delivery-schedule" },
    { id: 4, label: "Ödeme", path: "/checkout" },
];

export function FunnelHeader() {
    return (
        <header className="border-b bg-white sticky top-0 z-50 h-20">
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-lime-500 rounded-tr-xl rounded-bl-xl"></div>
                    <span className="font-bold text-2xl text-neutral-900 tracking-tight">LezzetKutum</span>
                </Link>

                <div className="flex items-center gap-2 text-sm text-neutral-500 font-medium">
                    <Lock className="w-4 h-4 text-green-600" />
                    Güvenli Ödeme
                </div>
            </div>
        </header>
    );
}

export function FunnelStepper() {
    const pathname = usePathname();

    // Determine current step index (1-based)
    const currentStep = STEPS.find(s => pathname.includes(s.path))?.id || 1;

    return (
        <div className="w-full bg-neutral-50 border-b py-4">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center max-w-2xl mx-auto">
                    {STEPS.map((step, index) => {
                        const isCompleted = step.id < currentStep;
                        const isCurrent = step.id === currentStep;

                        return (
                            <div key={step.id} className="flex items-center">
                                {/* Connector Line */}
                                {index > 0 && (
                                    <div className={cn(
                                        "w-12 h-1 mx-2 rounded-full",
                                        isCompleted ? "bg-green-500" : "bg-neutral-200"
                                    )} />
                                )}

                                {/* Step Circle & Label */}
                                <div className="flex items-center gap-2">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                                        isCompleted ? "bg-green-500 text-white" : isCurrent ? "bg-lime-500 text-white shadow-lg shadow-lime-200" : "bg-neutral-200 text-neutral-500"
                                    )}>
                                        {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                                    </div>
                                    <span className={cn(
                                        "text-sm font-medium hidden sm:block",
                                        isCurrent ? "text-neutral-900" : "text-neutral-400"
                                    )}>
                                        {step.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export function FunnelLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <FunnelHeader />
            <FunnelStepper />
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="py-8 text-center text-sm text-neutral-400">
                &copy; 2024 LezzetKutum. Tüm hakları saklıdır.
            </footer>
        </div>
    );
}
