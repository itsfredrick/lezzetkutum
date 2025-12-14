"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();

    const currentLocale = pathname.startsWith('/en') ? 'en' : 'tr';

    const switchLocale = (locale: string) => {
        // Simple logic: replace the first segment if it exists, or prepend
        // Note: middleware handles /tr and /en prefixes.
        // If current path is /tr/menu -> /en/menu
        // If current path is /menu (default tr) -> /en/menu acts weird if strict, 
        // but typically next-intl handles generic paths via middleware redirection rules.
        // Let's rely on string manipulation for this specific layout structure.

        let newPath = pathname;
        if (pathname.startsWith('/tr')) {
            newPath = pathname.replace('/tr', `/${locale}`);
        } else if (pathname.startsWith('/en')) {
            newPath = pathname.replace('/en', `/${locale}`);
        } else {
            // Default locale root, prepend
            newPath = `/${locale}${pathname}`;
        }

        router.push(newPath);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 px-0">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only">Dil Değiştir</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchLocale('tr')} className={currentLocale === 'tr' ? 'bg-lime-50 text-lime-600 font-bold' : ''}>
                    Türkçe
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLocale('en')} className={currentLocale === 'en' ? 'bg-lime-50 text-lime-600 font-bold' : ''}>
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
