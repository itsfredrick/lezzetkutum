export default function AdminDashboard() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Genel Bakış</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard title="Aktif Sipariş" value="124" trend="+12%" color="bg-blue-500" />
                <StatCard title="Bu Haftaki Gelir" value="₺45.250" trend="+5%" color="bg-green-500" />
                <StatCard title="Yeni Üye" value="48" trend="+18%" color="bg-purple-500" />
                <StatCard title="Bekleyen Destek" value="5" trend="-2%" color="bg-orange-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="font-bold text-lg mb-4">Son Siparişler</h2>
                    <div className="flex items-center justify-center h-48 text-slate-400 border-2 border-dashed rounded-lg">
                        List Component Placeholder
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="font-bold text-lg mb-4">Haftalık Menü Durumu</h2>
                    <div className="flex items-center justify-center h-48 text-slate-400 border-2 border-dashed rounded-lg">
                        Week Status Placeholder
                    </div>
                </div>
            </div>
        </div>
    )
}

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    color: 'green' | 'blue' | 'purple' | 'orange';
}

function StatCard({ title, value, trend, color }: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className={`absolute top-0 right-0 p-2 opacity-10 ${color}`}>
                <div className="w-16 h-16 rounded-full" />
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
            <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                {trend}
            </span>
        </div>
    )
}
