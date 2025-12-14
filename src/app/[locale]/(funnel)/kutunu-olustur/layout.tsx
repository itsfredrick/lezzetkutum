import { FunnelStepper } from "@/components/funnel/FunnelStepper";

export default function FunnelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <FunnelStepper />
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
