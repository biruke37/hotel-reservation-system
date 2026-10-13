"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
    Calendar,
    Clock,
    Download,
    XCircle,
    CheckCircle2,
    Search,
    ArrowRight,
    CreditCard,
    Building2,
    Users,
    DollarSign,
    TrendingUp
} from "lucide-react";
import { toast } from "sonner";

// Mock Data for Admin Bookings (will be replaced with API call)
const INITIAL_BOOKINGS = [
    {
        id: "BK-9042",
        guestName: "Abebe Kebede",
        guestEmail: "abebe@example.com",
        roomTitle: "Presidential Luxury Suite",
        roomType: "Deluxe Suite",
        roomNumber: "301",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800",
        checkIn: "2026-09-10",
        checkOut: "2026-09-15",
        nights: 5,
        guests: "2 Adults, 1 Child",
        totalPrice: 1750,
        paymentMethod: "Telebirr",
        paymentStatus: "Paid",
        status: "APPROVED",
        bookedOn: "2026-08-12",
    },
    {
        id: "BK-8810",
        guestName: "Sara Tadesse",
        guestEmail: "sara@example.com",
        roomTitle: "Executive Ocean View Room",
        roomType: "Executive",
        roomNumber: "204",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800",
        checkIn: "2026-07-01",
        checkOut: "2026-07-04",
        nights: 3,
        guests: "2 Adults",
        totalPrice: 660,
        paymentMethod: "CBE",
        paymentStatus: "Paid",
        status: "CHECKED_IN",
        bookedOn: "2026-06-18",
    },
    {
        id: "BK-7120",
        guestName: "Dawit Alamu",
        guestEmail: "dawit@example.com",
        roomTitle: "Standard King Suite",
        roomType: "Standard",
        roomNumber: "105",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800",
        checkIn: "2026-05-10",
        checkOut: "2026-05-12",
        nights: 2,
        guests: "1 Adult",
        totalPrice: 280,
        paymentMethod: "Telebirr",
        paymentStatus: "Refunded",
        status: "CANCELLED",
        bookedOn: "2026-05-01",
    },
    {
        id: "BK-9501",
        guestName: "Tigist Hailu",
        guestEmail: "tigist@example.com",
        roomTitle: "Penthouse Suite",
        roomType: "Penthouse",
        roomNumber: "501",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800",
        checkIn: "2026-08-20",
        checkOut: "2026-08-25",
        nights: 5,
        guests: "4 Adults",
        totalPrice: 2500,
        paymentMethod: "CBE",
        paymentStatus: "Paid",
        status: "PENDING",
        bookedOn: "2026-08-15",
    },
];

export default function AdminBookingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
    const [activeTab, setActiveTab] = useState<"All" | "APPROVED" | "PENDING" | "CHECKED_IN" | "CANCELLED">("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Authentication Guard
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/admin/bookings");
        }
    }, [status, router]);

    // Filter Logic
    const filteredBookings = bookings.filter((booking) => {
        const matchesTab = activeTab === "All" || booking.status === activeTab;
        const matchesSearch =
            booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.roomTitle.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    // Calculate Stats
    const stats = {
        total: bookings.length,
        pending: bookings.filter((b) => b.status === "PENDING").length,
        checkedIn: bookings.filter((b) => b.status === "CHECKED_IN").length,
        cancelled: bookings.filter((b) => b.status === "CANCELLED").length,
        revenue: bookings.reduce((sum, b) => (b.status !== "CANCELLED" ? sum + b.totalPrice : sum), 0),
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

    // Get status icon
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "APPROVED": return <CheckCircle2 className="w-3 h-3" />;
            case "PENDING": return <Clock className="w-3 h-3" />;
            case "CHECKED_IN": return <Building2 className="w-3 h-3" />;
            case "CANCELLED": return <XCircle className="w-3 h-3" />;
            default: return null;
        }
    };

    // Action Handlers
    const handleStatusChange = (id: string, newStatus: string) => {
        setBookings((prev) =>
            prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
        toast.success(`Booking ${id} updated to ${newStatus}`);
    };

    const handleCancelBooking = (id: string) => {
        if (confirm("Are you sure you want to cancel this booking?")) {
            setBookings((prev) =>
                prev.map((b) =>
                    b.id === id ? { ...b, status: "CANCELLED", paymentStatus: "Refunded" } : b
                )
            );
            toast.error(`Booking ${id} has been cancelled.`);
        }
    };

    const handleDownloadInvoice = (id: string) => {
        toast.info(`Downloading invoice for booking ${id}...`);
    };

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    if (status === "loading") {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-medium text-slate-400">Loading bookings...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Admin Dashboard</span>
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-tight">Bookings Management</h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Manage all reservations, guest stays, and booking statuses
                    </p>
                </div>

                <Link
                    href="/admin/rooms"
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                >
                    <span>Book New Room</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-slate-400">Total Bookings</span>
                    </div>
                    <p className="text-2xl font-black text-white">{stats.total}</p>
                    <p className="text-[10px] text-slate-500 mt-1">All time reservations</p>
                </div>

                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 hover:border-amber-500/40 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                            <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-slate-400">Pending</span>
                    </div>
                    <p className="text-2xl font-black text-white">{stats.pending}</p>
                    <p className="text-[10px] text-slate-500 mt-1">Awaiting approval</p>
                </div>

                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-slate-400">Checked In</span>
                    </div>
                    <p className="text-2xl font-black text-white">{stats.checkedIn}</p>
                    <p className="text-[10px] text-slate-500 mt-1">Currently staying</p>
                </div>

                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 hover:border-rose-500/40 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
                            <XCircle className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-slate-400">Cancelled</span>
                    </div>
                    <p className="text-2xl font-black text-white">{stats.cancelled}</p>
                    <p className="text-[10px] text-slate-500 mt-1">Cancelled stays</p>
                </div>

                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-slate-400">Revenue</span>
                    </div>
                    <p className="text-2xl font-black text-white">{formatCurrency(stats.revenue)}</p>
                    <p className="text-[10px] text-slate-500 mt-1">Total bookings value</p>
                </div>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex bg-[#0d1322] border border-slate-800/80 p-1.5 rounded-2xl gap-1 w-full sm:w-auto overflow-x-auto">
                    {(["All", "APPROVED", "PENDING", "CHECKED_IN", "CANCELLED"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${activeTab === tab
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search by ID, guest, or room..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0d1322] border border-slate-800/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition"
                    />
                </div>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
                <div className="bg-[#0d1322] border border-slate-800/80 rounded-3xl p-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto">
                        <Search className="w-8 h-8 text-slate-500" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white">No bookings found</h3>
                        <p className="text-xs text-slate-400 mt-1">
                            No reservations match your current search or filter criteria.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setActiveTab("All");
                        }}
                        className="inline-block bg-indigo-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-500 transition"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-[#0d1322] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 group"
                        >
                            <div className="relative h-40">
                                <Image
                                    src={booking.image}
                                    alt={booking.roomTitle}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3">
                                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${getStatusColor(booking.status)}`}>
                                        {getStatusIcon(booking.status)}
                                        <span className="ml-1">{booking.status}</span>
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-lg border border-indigo-500/20">
                                            {booking.id}
                                        </span>
                                        <span className="text-[10px] text-slate-500">
                                            {booking.bookedOn}
                                        </span>
                                    </div>

                                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                                        {booking.roomTitle}
                                    </h3>
                                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                        <Building2 className="w-3 h-3" />
                                        Room #{booking.roomNumber} • {booking.roomType}
                                    </p>
                                </div>

                                <div className="space-y-2 text-xs text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                                        <span>{booking.checkIn} → {booking.checkOut}</span>
                                        <span className="text-slate-500">({booking.nights} nights)</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                        <span>{booking.guests}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                                        <span className="text-slate-300">{booking.paymentMethod}</span>
                                        <span className="text-slate-500">•</span>
                                        <span className={booking.paymentStatus === "Paid" ? "text-emerald-400" : "text-amber-400"}>
                                            {booking.paymentStatus}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Total Amount</p>
                                        <p className="text-xl font-black text-white">{formatCurrency(booking.totalPrice)}</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleDownloadInvoice(booking.id)}
                                            className="p-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                                            title="Download Invoice"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>

                                        {booking.status === "PENDING" && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(booking.id, "APPROVED")}
                                                    className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition"
                                                    title="Approve Booking"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleCancelBooking(booking.id)}
                                                    className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition"
                                                    title="Cancel Booking"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}

                                        {booking.status === "APPROVED" && (
                                            <button
                                                onClick={() => handleStatusChange(booking.id, "CANCELLED")}
                                                className="px-3 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-semibold transition"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}