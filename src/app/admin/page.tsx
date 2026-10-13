"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    DollarSign,
    CalendarCheck,
    Users,
    BedDouble,
    Plus,
    X,
    Check,
    XCircle,
    Loader2,
    TrendingUp,
    Clock,
    CreditCard
} from "lucide-react";

// Mock Initial Data
const initialBookings = [
    { id: "BK-2024-001", guest: "Abebe Kebede", room: "Deluxe Suite #301", dates: "Aug 18 - Aug 22", status: "APPROVED", amount: "$450", checkIn: "2024-08-18", checkOut: "2024-08-22", paymentMethod: "Telebirr" },
    { id: "BK-2024-002", guest: "Sara Tadesse", room: "Executive Room #204", dates: "Aug 19 - Aug 21", status: "PENDING", amount: "$280", checkIn: "2024-08-19", checkOut: "2024-08-21", paymentMethod: "CBE" },
    { id: "BK-2024-003", guest: "Dawit Alamu", room: "Standard King #105", dates: "Aug 20 - Aug 25", status: "CHECKED_IN", amount: "$620", checkIn: "2024-08-20", checkOut: "2024-08-25", paymentMethod: "Telebirr" },
    { id: "BK-2024-004", guest: "Tigist Hailu", room: "Penthouse #501", dates: "Aug 22 - Aug 26", status: "CANCELLED", amount: "$1,200", checkIn: "2024-08-22", checkOut: "2024-08-26", paymentMethod: "CBE" },
];

const initialStats = {
    totalRevenue: 24850,
    totalBookings: 128,
    activeGuests: 52,
    availableRooms: 18,
    occupancyRate: 60,
    pendingApprovals: 5,
    todayCheckins: 3,
    todayCheckouts: 2
};

export default function AdminDashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [bookings, setBookings] = useState(initialBookings);
    const [stats, setStats] = useState(initialStats);
    const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
    const [newRoom, setNewRoom] = useState({ number: "", type: "Deluxe Suite", price: "" });
    const [loading, setLoading] = useState(false);

    // Authentication Guard
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/admin");
        }
    }, [status, router]);

    // Loading State
    if (status === "loading") {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
                <p className="text-sm font-medium text-slate-400">Loading admin dashboard...</p>
            </div>
        );
    }

    // Status Change Handler
    const handleStatusChange = (id: string, newStatus: string) => {
        setBookings((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
    };

    // Add Room Form Submit
    const handleAddRoomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsAddRoomOpen(false);
            setNewRoom({ number: "", type: "Deluxe Suite", price: "" });
        }, 1000);
    };

    // Format currency
    const formatCurrency = (amount: string | number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(amount));
    };

    // Get status badge color
    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            'APPROVED': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            'PENDING': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            'CHECKED_IN': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            'CANCELLED': 'bg-rose-500/10 text-rose-400 border-rose-500/20'
        };
        return colors[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Action Header Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#0d1322] border border-slate-800/80 p-5 rounded-2xl shadow-lg">
                <div>
                    <h1 className="text-xl font-bold text-white">Dashboard Overview</h1>
                    <p className="text-xs text-slate-400 mt-1">Manage hotel reservations, guests, and room inventory</p>
                </div>
                <button
                    onClick={() => setIsAddRoomOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Room</span>
                </button>
            </div>

            {/* Stats Cards - Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Revenue */}
                <div className="group bg-[#0d1322] border border-slate-800/80 rounded-2xl p-6 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-400" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
                        </div>
                        <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                            <TrendingUp className="w-4 h-4" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2">${stats.totalRevenue.toLocaleString()}</h3>
                    <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +14.2% vs last month
                    </p>
                </div>

                {/* Total Bookings */}
                <div className="group bg-[#0d1322] border border-slate-800/80 rounded-2xl p-6 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <CalendarCheck className="w-5 h-5 text-indigo-400" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Bookings</span>
                        </div>
                        <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                            <Users className="w-4 h-4" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2">{stats.totalBookings}</h3>
                    <p className="text-xs text-indigo-400 font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +8.1% vs last month
                    </p>
                </div>

                {/* Active Guests */}
                <div className="group bg-[#0d1322] border border-slate-800/80 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-400" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Guests</span>
                        </div>
                        <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white transition-all">
                            <Users className="w-4 h-4" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2">{stats.activeGuests}</h3>
                    <p className="text-xs text-purple-400 font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +5.4% vs last month
                    </p>
                </div>

                {/* Available Rooms */}
                <div className="group bg-[#0d1322] border border-slate-800/80 rounded-2xl p-6 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <BedDouble className="w-5 h-5 text-amber-400" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Available Rooms</span>
                        </div>
                        <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-white transition-all">
                            <BedDouble className="w-4 h-4" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2">{stats.availableRooms}<span className="text-base text-slate-500">/30</span></h3>
                    <p className="text-xs text-amber-400 font-medium flex items-center gap-1">
                        {stats.occupancyRate}% occupancy rate
                    </p>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Pending Approvals */}
                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <CreditCard className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-semibold text-slate-400">Pending Approvals</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.pendingApprovals}</p>
                        <p className="text-[10px] text-slate-500 mt-1">Payments awaiting approval</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                        <span className="text-xs font-bold text-amber-400">{stats.pendingApprovals}</span>
                    </div>
                </div>

                {/* Today's Check-ins */}
                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Check className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-semibold text-slate-400">Today's Check-ins</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.todayCheckins}</p>
                        <p className="text-[10px] text-slate-500 mt-1">Guests arriving today</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <Check className="w-4 h-4 text-blue-400" />
                    </div>
                </div>

                {/* Today's Check-outs */}
                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-semibold text-slate-400">Today's Check-outs</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.todayCheckouts}</p>
                        <p className="text-[10px] text-slate-500 mt-1">Guests checking out today</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <Clock className="w-4 h-4 text-emerald-400" />
                    </div>
                </div>
            </div>

            {/* Recent Reservations Table */}
            <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg">
                <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-white">Recent Reservations</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Manage bookings and confirm arrivals</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-400 border border-slate-700">
                            View All
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800/80 bg-[#111827]/50 text-[11px] uppercase tracking-wider text-slate-400">
                                <th className="py-4 px-6 font-semibold">Booking ID</th>
                                <th className="py-4 px-6 font-semibold">Guest</th>
                                <th className="py-4 px-6 font-semibold">Room</th>
                                <th className="py-4 px-6 font-semibold">Dates</th>
                                <th className="py-4 px-6 font-semibold">Payment</th>
                                <th className="py-4 px-6 font-semibold">Status</th>
                                <th className="py-4 px-6 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                            {bookings.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-800/30 transition-all duration-200 group">
                                    <td className="py-4 px-6">
                                        <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-lg border border-indigo-500/20">
                                            {item.id}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                                {item.guest.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                                                    {item.guest}
                                                </p>
                                                <p className="text-[10px] text-slate-500">Booked via {item.paymentMethod}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="text-sm text-slate-300 font-medium">{item.room}</p>
                                        <p className="text-[10px] text-slate-500">{item.dates}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-300 font-medium">{item.checkIn}</span>
                                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                                → {item.checkOut}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="text-xs font-bold text-slate-200">{item.amount}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider border ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {item.status === "PENDING" && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(item.id, "APPROVED")}
                                                        className="p-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-lg transition-all"
                                                        title="Confirm Booking"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(item.id, "CANCELLED")}
                                                        className="p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg transition-all"
                                                        title="Cancel Booking"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                            {item.status === "APPROVED" && (
                                                <button
                                                    onClick={() => handleStatusChange(item.id, "CANCELLED")}
                                                    className="px-3 py-1.5 bg-slate-800 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 rounded-lg text-xs font-semibold transition-all border border-slate-700 hover:border-rose-500/30"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            {item.status === "CHECKED_IN" && (
                                                <span className="text-xs text-emerald-400 font-medium px-3 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                                    Active
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}