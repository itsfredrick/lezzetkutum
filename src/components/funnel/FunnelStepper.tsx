'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
    { id: 1, label: 'Planını Seç', path: '/kutunu-olustur/paket' },
    { id: 2, label: 'Menünü Seç', path: '/kutunu-olustur/menu' },
    { id: 3, label: 'Teslimat', path: '/kutunu-olustur/teslimat' },
    { id: 4, label: 'Ödeme', path: '/kutunu-olustur/odeme' },
];

export function FunnelStepper() {
    const pathname = usePathname();

    // Determine current step index (1-based)
    const currentStep = STEPS.find(s => pathname.includes(s.path))?.id || 1;

    return (
        <div className="w-full bg-white border-b sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-center space-x-4 md:space-x-8">
                    {STEPS.map((step) => {
                        const isCompleted = step.id < currentStep;
                        const isCurrent = step.id === currentStep;

                        return (
                            <div key={step.id} className="flex items-center">
                                {/* Step Circle */}
                                <div
                                    className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-200",
                                        isCompleted && "bg-primary border-primary text-white",
                                        isCurrent && "border-primary text-primary bg-white",
                                        !isCompleted && !isCurrent && "border-neutral-200 text-neutral-400 bg-neutral-50"
                                    )}
                                >
                                    {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                                </div>

                                {/* Step Label (Hidden on mobile for space, or minimal) */}
                                <span className={cn(
                                    "ml-2 text-sm font-medium hidden md:block",
                                    isCompleted && "text-primary",
                                    isCurrent && "text-neutral-900",
                                    !isCompleted && !isCurrent && "text-neutral-400"
                                )}>
                                    {step.label}
                                </span>

                                {/* Connector Line (except last) */}
                                {step.id !== STEPS.length && (
                                    <div className={cn(
                                        "w-8 md:w-16 h-0.5 ml-4 md:ml-8",
                                        step.id < currentStep ? "bg-primary" : "bg-neutral-200"
                                    )} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
