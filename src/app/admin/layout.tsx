"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Calendar, 
  Hotel, 
  Users, 
  CreditCard, 
  Settings, 
  Plus, 
  Search, 
  Bell, 
  LogOut,
  ExternalLink,
  Building2
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Rooms", href: "/admin/rooms", icon: Hotel },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#070b14] text-slate-200 overflow-hidden font-sans">
      
      {/* 1. CLEAN SIDEBAR */}
      <aside className="w-64 bg-[#0d1322] border-r border-slate-800/80 flex flex-col justify-between">
        <div>
          {/* Admin Logo */}
          <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800/80">
            <div className="bg-indigo-600/20 p-2 rounded-xl border border-indigo-500/30">
              <Building2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <span className="text-sm font-black text-white tracking-wider block leading-none">
                Hotel<span className="text-indigo-400">Hub</span>
              </span>
              <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Back to Site & User Profile */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 rounded-xl transition border border-slate-800/80"
          >
            <span>Back to Main Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                {session?.user?.name ? session.user.name[0].toUpperCase() : "A"}
              </div>
              <div className="truncate text-xs">
                <p className="font-semibold text-slate-200 truncate">{session?.user?.name || "Admin"}</p>
                <p className="text-[10px] text-slate-500 truncate">{session?.user?.email}</p>
              </div>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              title="Sign Out"
              className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* DEDICATED ADMIN HEADER */}
        <header className="h-16 bg-[#0d1322] border-b border-slate-800/80 px-8 flex items-center justify-between shrink-0">
          {/* Global Search Bar */}
          <div className="relative w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search bookings, guests, rooms..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#070b14] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-200 placeholder-slate-500"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-white bg-[#070b14] hover:bg-slate-800 rounded-xl border border-slate-800 transition cursor-pointer relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 bg-indigo-500 rounded-full absolute top-1.5 right-1.5" />
            </button>

            <Link
              href="/admin/rooms/new"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/30 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Room</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>
    </div>
  );
}