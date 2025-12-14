"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronRight, ChevronLeft, X, Maximize2 } from "lucide-react";
import Image from "next/image";

interface Step {
    id: string;
    stepNumber: number;
    instruction: string;
    imageUrl?: string | null;
}

export function CookMode({ steps, recipeName }: { steps: Step[], recipeName: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(c => c - 1);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full gap-2 bg-lime-600 hover:bg-lime-700 h-12 text-lg">
                    <Maximize2 className="w-5 h-5" /> Pişirme Modu
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[100vw] w-screen h-screen p-0 border-0 rounded-none bg-black/95 text-white flex flex-col items-center justify-center">
                {/* Header */}
                <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-black/50 z-10">
                    <h2 className="font-bold text-lg hidden md:block">{recipeName}</h2>
                    <span className="font-mono text-lime-400 font-bold">Adım {currentStep + 1} / {steps.length}</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
                        <X className="w-8 h-8" />
                    </Button>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl px-4 md:px-8 text-center space-y-8">
                    {steps[currentStep].imageUrl && (
                        <div className="relative w-full aspect-video md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image src={steps[currentStep].imageUrl} alt={`Adım ${currentStep + 1}`} fill className="object-cover" />
                        </div>
                    )}

                    <div className="space-y-4">
                        <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                            {steps[currentStep].instruction}
                            {/* Fallback if no specific title, typically steps are just instructions */}
                        </h3>
                    </div>
                </div>

                {/* Controls */}
                <div className="w-full p-8 flex justify-between items-center max-w-4xl gap-4">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="flex-1 h-16 text-xl border-white/20 text-white hover:bg-white/10 hover:text-white disabled:opacity-30"
                    >
                        <ChevronLeft className="w-6 h-6 mr-2" /> Önceki
                    </Button>

                    <div className="flex gap-1">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-1.5 w-1.5 rounded-full transition-colors ${i === currentStep ? 'bg-lime-500 scale-125' : 'bg-white/20'}`} />
                        ))}
                    </div>

                    <Button
                        size="lg"
                        onClick={nextStep}
                        disabled={currentStep === steps.length - 1}
                        className="flex-1 h-16 text-xl bg-lime-600 hover:bg-lime-700 disabled:opacity-30 disabled:bg-neutral-800"
                    >
                        Sonraki <ChevronRight className="w-6 h-6 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
