"use client";

import { useState } from "react";
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
} from "lucide-react";
import { toast } from "sonner";

// Mock Data for User Bookings
const INITIAL_BOOKINGS = [
    {
        id: "BK-9042",
        roomTitle: "Presidential Luxury Suite",
        roomType: "Deluxe Suite",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800",
        checkIn: "2026-09-10",
        checkOut: "2026-09-15",
        nights: 5,
        guests: "2 Adults, 1 Child",
        totalPrice: 1750,
        paymentStatus: "Paid",
        status: "Upcoming",
        bookedOn: "2026-08-12",
    },
    {
        id: "BK-8810",
        roomTitle: "Executive Ocean View Room",
        roomType: "Executive",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800",
        checkIn: "2026-07-01",
        checkOut: "2026-07-04",
        nights: 3,
        guests: "2 Adults",
        totalPrice: 660,
        paymentStatus: "Paid",
        status: "Completed",
        bookedOn: "2026-06-18",
    },
    {
        id: "BK-7120",
        roomTitle: "Standard King Suite",
        roomType: "Standard",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800",
        checkIn: "2026-05-10",
        checkOut: "2026-05-12",
        nights: 2,
        guests: "1 Adult",
        totalPrice: 280,
        paymentStatus: "Refunded",
        status: "Cancelled",
        bookedOn: "2026-05-01",
    },
];

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
    const [activeTab, setActiveTab] = useState<"All" | "Upcoming" | "Completed" | "Cancelled">("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter Logic
    const filteredBookings = bookings.filter((booking) => {
        const matchesTab = activeTab === "All" || booking.status === activeTab;
        const matchesSearch =
            booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.roomTitle.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    // Action Handlers
    const handleCancelBooking = (id: string) => {
        if (confirm("Are you sure you want to cancel this booking?")) {
            setBookings((prev) =>
                prev.map((b) =>
                    b.id === id ? { ...b, status: "Cancelled", paymentStatus: "Refund Processing" } : b
                )
            );
            toast.success(`Booking ${id} has been cancelled successfully.`);
        }
    };

    const handleDownloadInvoice = (id: string) => {
        toast.info(`Downloading invoice for booking ${id}...`);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 mb-3">
                            <Building2 className="w-3.5 h-3.5" /> Guest Dashboard
                        </div>
                        <h1 className="text-3xl font-black tracking-tight">My Bookings</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Manage your reservations, download invoices, or modify upcoming stays.
                        </p>
                    </div>

                    <Link
                        href="/rooms"
                        className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition cursor-pointer self-start md:self-auto"
                    >
                        <span>Book Another Room</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Quick Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800/80 p-4 rounded-2xl shadow-sm">
                        <p className="text-xs text-slate-500 font-semibold">Total Bookings</p>
                        <p className="text-2xl font-black mt-1">{bookings.length}</p>
                    </div>
                    <div className="bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800/80 p-4 rounded-2xl shadow-sm">
                        <p className="text-xs text-slate-500 font-semibold">Upcoming Stays</p>
                        <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                            {bookings.filter((b) => b.status === "Upcoming").length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800/80 p-4 rounded-2xl shadow-sm">
                        <p className="text-xs text-slate-500 font-semibold">Completed</p>
                        <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                            {bookings.filter((b) => b.status === "Completed").length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800/80 p-4 rounded-2xl shadow-sm">
                        <p className="text-xs text-slate-500 font-semibold">Total Spent</p>
                        <p className="text-2xl font-black mt-1">
                            ${bookings.reduce((sum, b) => (b.status !== "Cancelled" ? sum + b.totalPrice : sum), 0)}
                        </p>
                    </div>
                </div>

                {/* Filter Tabs & Search */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800 p-1.5 rounded-2xl gap-1 w-full sm:w-auto overflow-x-auto">
                        {(["All", "Upcoming", "Completed", "Cancelled"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${activeTab === tab
                                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full sm:w-72">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by ID or room title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition"
                        />
                    </div>
                </div>

                {/* Booking List Cards */}
                {filteredBookings.length === 0 ? (
                    <div className="bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800/80 rounded-3xl p-12 text-center space-y-4 shadow-sm">
                        <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold">No bookings found</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                You don't have any reservations matching your current search or tab filter.
                            </p>
                        </div>
                        <Link
                            href="/rooms"
                            className="inline-block bg-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-indigo-500 transition"
                        >
                            Browse Rooms
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center"
                            >
                                <div className="flex flex-col sm:flex-row gap-5 w-full lg:w-auto">
                                    <div className="relative w-full sm:w-44 h-32 rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                                        <Image
                                            src={booking.image || ""}
                                            alt={booking.roomTitle}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-500/20">
                                                {booking.id}
                                            </span>

                                            <span
                                                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border ${booking.status === "Upcoming"
                                                        ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20"
                                                        : booking.status === "Completed"
                                                            ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
                                                            : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20"
                                                    }`}
                                            >
                                                {booking.status === "Upcoming" && <Clock className="w-3 h-3" />}
                                                {booking.status === "Completed" && <CheckCircle2 className="w-3 h-3" />}
                                                {booking.status === "Cancelled" && <XCircle className="w-3 h-3" />}
                                                {booking.status}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                            {booking.roomTitle}
                                        </h3>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                                                {booking.checkIn} → {booking.checkOut} ({booking.nights} Nights)
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
                                                Payment: <strong className="text-slate-800 dark:text-slate-200">{booking.paymentStatus}</strong>
                                            </span>
                                        </div>

                                        <p className="text-[11px] text-slate-400 pt-1">
                                            Booked on: {booking.bookedOn} • Guests: {booking.guests}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-row lg:flex-col justify-between items-center lg:items-end w-full lg:w-auto border-t lg:border-t-0 border-slate-100 dark:border-slate-800/80 pt-4 lg:pt-0 gap-4">
                                    <div className="text-left lg:text-right">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Paid</p>
                                        <p className="text-2xl font-black text-slate-900 dark:text-white">${booking.totalPrice}</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleDownloadInvoice(booking.id)}
                                            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#131b2e] transition text-xs flex items-center gap-1.5 font-bold cursor-pointer"
                                            title="Download Invoice"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span className="hidden sm:inline">Invoice</span>
                                        </button>

                                        {booking.status === "Upcoming" && (
                                            <button
                                                onClick={() => handleCancelBooking(booking.id)}
                                                className="px-3 py-2.5 rounded-xl border border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition text-xs font-bold flex items-center gap-1 cursor-pointer"
                                            >
                                                <XCircle className="w-4 h-4" />
                                                <span>Cancel Stay</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}