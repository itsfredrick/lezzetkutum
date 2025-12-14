"use client";

import { Clock, Lock } from "lucide-react";

export function CutoffCountdown({ cutoffDate, isLocked }: { cutoffDate: Date, isLocked: boolean }) {
    if (isLocked) {
        return (
            <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-3 flex items-center justify-center gap-2 text-neutral-500 text-sm">
                <Lock className="w-4 h-4" />
                <span>Bu haftanın siparişleri kapandı.</span>
            </div>
        );
    }

    // Simplified visual for dev - real implementation would use interval
    const daysLeft = 3;

    return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center justify-center gap-2 text-yellow-800 text-sm">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Siparişini düzenlemek için son: <strong>{daysLeft} gün</strong></span>
        </div>
    );
}
