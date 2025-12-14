import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "LezzetKutum - Taze Malzemeler Kapında",
  description: "Haftalık değişen menüler, tam ölçülü taze malzemeler ve şef onaylı adım adım tariflerle mutfakta harikalar yaratın.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Toaster />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
