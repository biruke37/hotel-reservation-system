"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CalendarCheck,
    BedDouble,
    Users,
    Settings,
    Building2,
    CreditCard
} from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Rooms", href: "/admin/rooms", icon: BedDouble },
    { name: "Guests", href: "/admin/guests", icon: Users },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({ user }: { user?: { name?: string | null; email?: string | null } }) {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-[#0d1322] border-r border-slate-800/60 flex flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-50">
            <div>
                {/* Logo */}
                <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800/60">
                    <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/30">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-lg tracking-wide text-white">HotelHub</span>
                </div>

                {/* Nav Links */}
                <nav className="p-4 space-y-1.5">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${isActive
                                    ? "bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 shadow-sm"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                                    }`}
                            >
                                <item.icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Profile Footer */}
            <div className="p-4 border-t border-slate-800/60 m-3 bg-[#111827] rounded-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600 font-bold text-xs flex items-center justify-center text-white shrink-0 uppercase">
                    {user?.name ? user.name.slice(0, 2) : "AD"}
                </div>
                <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">{user?.name || "Admin User"}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user?.email || "Biruke@hotel.com"}</p>
                </div>
            </div>
        </aside>
    );
}