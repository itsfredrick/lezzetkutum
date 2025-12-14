export function Footer() {
    return (
        <footer className="bg-neutral-50 border-t py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-bold text-lg mb-4">LezzetKutum</h3>
                    <p className="text-sm text-neutral-500">
                        Taze malzemeler, şef onaylı tarifler kapında.
                    </p>
                </div>
                {/* Add more columns as needed */}
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t text-center text-sm text-neutral-400">
                &copy; 2024 LezzetKutum. Tüm hakları saklıdır.
            </div>
        </footer>
    );
}
