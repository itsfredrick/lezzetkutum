import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-black text-lime-100 leading-none">404</h1>
            <h2 className="text-3xl font-bold text-neutral-900 mt-8 mb-4">
                Aradığınız Sayfa Bulunamadı
            </h2>
            <p className="text-neutral-500 text-lg max-w-md mb-8">
                Aradığınız tarif veya sayfa taşınmış ya da silinmiş olabilir. Lezzetli rotanıza anasayfadan devam edebilirsiniz.
            </p>
            <Button asChild className="h-12 px-8 rounded-full font-bold text-lg">
                <Link href="/">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Anasayfaya Dön
                </Link>
            </Button>
        </div>
    );
}
