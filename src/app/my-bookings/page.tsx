
"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Calendar,
    CheckCircle2,
    Clock,
    MapPin,
    ArrowRight,
    XCircle,
    AlertTriangle,
    Hotel,
    Sparkles,
    Check
} from "lucide-react";

interface Booking {
    id: string;
    roomTitle: string;
    roomType: string;
    imageUrl: string;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
    status: "Confirmed" | "Cancelled";
    guests: string;
    bookingDate: string;
}

const INITIAL_BOOKINGS: Booking[] = [
    {
        id: "RES-8492",
        roomTitle: "Presidential Luxury Suite",
        roomType: "Deluxe Suite",
        imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1000",
        checkIn: "2026-09-01",
        checkOut: "2026-09-05",
        totalPrice: 1400,
        status: "Confirmed",
        guests: "2 Adults",
        bookingDate: "2026-08-15",
    },
    {
        id: "RES-3104",
        roomTitle: "Executive Deluxe Room",
        roomType: "Executive",
        imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000",
        checkIn: "2026-07-10",
        checkOut: "2026-07-12",
        totalPrice: 440,
        status: "Cancelled",
        guests: "1 Adult",
        bookingDate: "2026-07-01",
    },
];

function BookingsContent() {
    const searchParams = useSearchParams();
    const isPaymentSuccess = searchParams.get("payment") === "success";
    const tx_ref = searchParams.get("tx_ref");

    const [bookings, setBookings] = useState<Booking[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("hotel_hub_bookings");
            if (saved) {
                try { return JSON.parse(saved); } catch { /* fallback */ }
            }
        }
        return INITIAL_BOOKINGS;
    });

    const [activeTab, setActiveTab] = useState<"all" | "confirmed" | "cancelled">("all");
    const [cancellingId, setCancellingId] = useState<string | null>(null);
    const [showSuccessBanner, setShowSuccessBanner] = useState(isPaymentSuccess);

    // ክፍያውን በ Backend API (verify-payment) አማካኝነት ማረጋገጥ እና ሪዘርቬሽኑን መመዝገብ
    // ክፍያውን በ Backend API (verify-payment) አማካኝነት ማረጋገጥ እና ሪዘርቬሽኑን መመዝገብ
    useEffect(() => {
        async function verifyUserPayment() {
            if (isPaymentSuccess) {
                // ይህ ክፍያ በዚሁ session መመዝገቡን ለማረጋገጥ (ዳግመኛ እንዳይደገም)
                const verifiedKey = `verified_${tx_ref || 'default'}`;
                if (sessionStorage.getItem(verifiedKey)) return;

                let verifiedId = tx_ref || `RES-${Math.floor(1000 + Math.random() * 9000)}`;

                if (tx_ref) {
                    try {
                        const res = await fetch(`/api/verify-payment?tx_ref=${tx_ref}`);
                        const result = await res.json();
                        if (!result.success) {
                            console.warn("Payment verification failed on server.");
                            return;
                        }
                    } catch (err) {
                        console.error("Error verifying payment:", err);
                    }
                }

                setBookings((prev) => {
                    const hasRecent = prev.some(b => b.id === verifiedId);
                    if (hasRecent) return prev;

                    const newBooking: Booking = {
                        id: verifiedId,
                        roomTitle: "Presidential Luxury Suite",
                        roomType: "Deluxe Suite",
                        imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1000",
                        checkIn: "2026-10-01",
                        checkOut: "2026-10-05",
                        totalPrice: 1400,
                        status: "Confirmed",
                        guests: "2 Adults",
                        bookingDate: new Date().toISOString().split('T')[0],
                    };
                    const updated = [newBooking, ...prev];
                    localStorage.setItem("hotel_hub_bookings", JSON.stringify(updated));
                    return updated;
                });

                // በአንድ session ውስጥ አንዴ ብቻ እንዲመዝገብ ማድረግ
                sessionStorage.setItem(verifiedKey, "true");
            }
        }

        verifyUserPayment();
    }, [isPaymentSuccess, tx_ref]);
    // ለውጦችን በ LocalStorage ማስቀመጥ
    useEffect(() => {
        localStorage.setItem("hotel_hub_bookings", JSON.stringify(bookings));
    }, [bookings]);

    const handleCancelBooking = (id: string) => {
        setBookings((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: "Cancelled" as const } : item
            )
        );
        setCancellingId(null);
    };

    const filteredBookings = bookings.filter((item) => {
        if (activeTab === "confirmed") return item.status === "Confirmed";
        if (activeTab === "cancelled") return item.status === "Cancelled";
        return true;
    });

    return (
        <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-24">

            {/* Header Banner */}
            <div className="bg-gradient-to-b from-[#0d1322] to-[#070b14] border-b border-slate-800/80 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 inline-flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Guest Portal
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        My Reservations
                    </h1>
                    <p className="text-slate-400 text-xs sm:text-sm">
                        Track, review, and manage all your room reservations securely in real-time.
                    </p>
                </div>
            </div>

            {/* Main Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">

                {/* Payment Success Notification Banner */}
                {showSuccessBanner && (
                    <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-emerald-950/20 animate-fade-in">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                                <Check className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white">Payment Successful!</h4>
                                <p className="text-xs text-emerald-300/80">Your transaction was verified successfully and your room reservation is confirmed.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowSuccessBanner(false)}
                            className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-emerald-900/30 transition cursor-pointer"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4 overflow-x-auto scrollbar-none">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === "all"
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                            : "bg-[#0d1322] text-slate-400 hover:text-white border border-slate-800"
                            }`}
                    >
                        All Reservations ({bookings.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("confirmed")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === "confirmed"
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                            : "bg-[#0d1322] text-slate-400 hover:text-white border border-slate-800"
                            }`}
                    >
                        Confirmed ({bookings.filter((b) => b.status === "Confirmed").length})
                    </button>
                    <button
                        onClick={() => setActiveTab("cancelled")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === "cancelled"
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                            : "bg-[#0d1322] text-slate-400 hover:text-white border border-slate-800"
                            }`}
                    >
                        Cancelled ({bookings.filter((b) => b.status === "Cancelled").length})
                    </button>
                </div>

                {/* Bookings List */}
                {filteredBookings.length === 0 ? (
                    <div className="text-center py-20 bg-[#0d1322]/50 rounded-3xl border border-slate-800 space-y-4">
                        <Hotel className="w-12 h-12 text-slate-600 mx-auto" />
                        <p className="text-slate-400 text-sm">No reservations found for this filter.</p>
                        <Link
                            href="/rooms"
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition"
                        >
                            <span>Explore Available Rooms</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredBookings.map((booking) => {
                            const isConfirmed = booking.status === "Confirmed";

                            return (
                                <div
                                    key={booking.id}
                                    className="bg-[#0d1322] border border-slate-800 rounded-3xl overflow-hidden p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl relative transition-all hover:border-slate-700/80"
                                >
                                    {/* Room Image */}
                                    <div className="relative h-48 w-full md:w-64 rounded-2xl overflow-hidden shrink-0 bg-slate-800">
                                        <Image
                                            src={booking.imageUrl}
                                            alt={booking.roomTitle}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 256px"
                                            className={`object-cover transition duration-500 ${!isConfirmed && "grayscale opacity-60"}`}
                                        />
                                        <div className="absolute top-3 left-3 bg-[#070b14]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-300 border border-slate-700/80">
                                            {booking.id}
                                        </div>
                                    </div>

                                    {/* Booking Details */}
                                    <div className="flex-1 space-y-3 w-full">
                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                                                {booking.roomType}
                                            </span>

                                            {isConfirmed ? (
                                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Confirmed
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                                                    <XCircle className="w-3.5 h-3.5" />
                                                    Cancelled
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-xl font-bold text-white">{booking.roomTitle}</h2>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-400 pt-1">
                                            <div className="flex items-center gap-2 bg-[#131b2e] p-2.5 rounded-xl border border-slate-800/80">
                                                <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                                                <div>
                                                    <span className="block text-[10px] text-slate-500">Check-In</span>
                                                    <strong className="text-white font-medium">{booking.checkIn}</strong>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 bg-[#131b2e] p-2.5 rounded-xl border border-slate-800/80">
                                                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                                                <div>
                                                    <span className="block text-[10px] text-slate-500">Check-Out</span>
                                                    <strong className="text-white font-medium">{booking.checkOut}</strong>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 bg-[#131b2e] p-2.5 rounded-xl border border-slate-800/80 col-span-2 sm:col-span-1">
                                                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                                                <div>
                                                    <span className="block text-[10px] text-slate-500">Guests</span>
                                                    <strong className="text-white font-medium">{booking.guests}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price & Actions */}
                                    <div className="text-right w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 flex md:flex-col items-center md:items-end justify-between shrink-0 space-y-2">
                                        <div>
                                            <span className="text-[10px] text-slate-400 block">Total Amount</span>
                                            <span className={`text-2xl font-black ${isConfirmed ? "text-emerald-400" : "text-slate-500 line-through"}`}>
                                                ${booking.totalPrice}
                                            </span>
                                        </div>

                                        {isConfirmed && (
                                            <button
                                                onClick={() => setCancellingId(booking.id)}
                                                className="text-xs font-semibold text-rose-400 hover:text-rose-300 hover:underline transition cursor-pointer"
                                            >
                                                Cancel Reservation
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Cancellation Modal */}
            {cancellingId && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#0d1322] border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-scale-up">
                        <div className="flex items-center gap-3 text-amber-400">
                            <AlertTriangle className="w-6 h-6 shrink-0" />
                            <h3 className="text-lg font-bold text-white">Cancel Reservation?</h3>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Are you sure you want to cancel booking <strong className="text-white">{cancellingId}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                onClick={() => setCancellingId(null)}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 transition cursor-pointer"
                            >
                                Keep Booking
                            </button>
                            <button
                                onClick={() => handleCancelBooking(cancellingId)}
                                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/25 transition cursor-pointer"
                            >
                                Confirm Cancellation
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

// Next.js Suspense boundary for useSearchParams compliance
export default function BookingsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#070b14] text-slate-400 flex items-center justify-center text-xs">Loading reservations...</div>}>
            <BookingsContent />
        </Suspense>
    );
}