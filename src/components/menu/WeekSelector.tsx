"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WeekSelector({ currentWeek, onWeekChange, weeks }: {
    currentWeek: number,
    onWeekChange: (w: number) => void,
    weeks: { weekNumber: number, dateRange: string, isLocked: boolean, isCurrent: boolean }[]
}) {
    return (
        <div className="flex items-center justify-center gap-4 py-8 overflow-x-auto">
            {weeks.map((week, idx) => (
                <div
                    key={week.weekNumber}
                    onClick={() => onWeekChange(week.weekNumber)}
                    className={cn(
                        "cursor-pointer flex flex-col items-center p-3 rounded-xl border-2 transition-all min-w-[120px]",
                        currentWeek === week.weekNumber
                            ? "border-primary bg-primary/5 shadow-md scale-105"
                            : "border-transparent hover:bg-neutral-100",
                        week.isLocked && "opacity-60 grayscale"
                    )}
                >
                    <div className="text-xs font-bold uppercase text-neutral-500 mb-1">
                        {week.isCurrent ? 'Bu Hafta' : `Hafta ${week.weekNumber}`}
                    </div>
                    <div className="text-sm font-bold text-neutral-900 whitespace-nowrap">
                        {week.dateRange}
                    </div>
                    {week.isLocked && <Lock className="w-3 h-3 text-neutral-400 mt-1" />}
                </div>
            ))}
        </div>
    );
}
