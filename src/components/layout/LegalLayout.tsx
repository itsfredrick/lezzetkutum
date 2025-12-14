
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({ children, title }: { children: React.ReactNode, title: string }) {
    return (
        <div className="bg-white min-h-screen py-10 md:py-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary" asChild>
                    <Link href="/"><ArrowLeft className="w-4 h-4 mr-2" /> Anasayfaya Dön</Link>
                </Button>

                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900">{title}</h1>

                <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-p:text-neutral-600 prose-a:text-primary">
                    {children}
                </div>
            </div>
        </div>
    )
}
