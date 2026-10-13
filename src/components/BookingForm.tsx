"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Calendar, Clock, DollarSign, AlertCircle, CheckCircle2, User } from "lucide-react";

export default function BookingForm({ roomId, pricePerNight }: { roomId: string; pricePerNight: number }) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { data: session, status } = useSession();
    const router = useRouter();

    // Calculate nights and total price dynamically
    const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 3600 * 24)) : 0;
    const totalPrice = nights > 0 ? (nights * pricePerNight).toFixed(2) : "0.00";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Must be authenticated to book
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/rooms/" + roomId);
            return;
        }

        if (nights <= 0) {
            setError("Check-out date must be after check-in date.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roomId, checkInDate: checkIn, checkOutDate: checkOut })
            });

            if (!res.ok) {
                const errData = await res.text();
                throw new Error(errData || "Failed to create booking. Room might be already booked.");
            }

            const booking = await res.json();
            router.push("/my-bookings?success=true");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Get today's date in YYYY-MM-DD format for min attribute
    const today = new Date().toISOString().split("T")[0];

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Authentication Warning */}
            {status === "unauthenticated" && (
                <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm">
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <p className="font-semibold text-amber-400">Authentication Required</p>
                        <p className="text-xs text-slate-300">You need to sign in to complete your reservation</p>
                    </div>
                </div>
            )}

            {/* Error Alert */}
            {error && (
                <div className="flex items-start gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-sm">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-rose-400">Booking Error</p>
                        <p className="text-xs text-slate-300 mt-1">{error}</p>
                    </div>
                </div>
            )}

            {/* Check-in Date */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    Check-in Date
                </label>
                <div className="relative">
                    <input
                        type="date"
                        min={today}
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                </div>
            </div>

            {/* Check-out Date */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    Check-out Date
                </label>
                <div className="relative">
                    <input
                        type="date"
                        min={checkIn || today}
                        required
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                </div>
            </div>

            {/* Booking Summary */}
            <div className="space-y-3 p-5 bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-indigo-800/30 rounded-2xl">
                <div className="flex items-center gap-2 pb-3 border-b border-indigo-800/30">
                    <DollarSign className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Booking Summary</span>
                </div>

                <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400 flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            Duration
                        </span>
                        <span className="font-semibold text-white">
                            {nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'}` : 'Select dates'}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Price per night</span>
                        <span className="font-semibold text-white">${pricePerNight.toFixed(2)}</span>
                    </div>

                    {nights > 0 && (
                        <div className="flex justify-between items-center pt-2 border-t border-indigo-800/30">
                            <span className="text-slate-400">Subtotal</span>
                            <span className="font-semibold text-slate-300">${(nights * pricePerNight).toFixed(2)}</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center pt-3 border-t-2 border-indigo-700/40">
                    <span className="text-white font-bold text-base">Total Amount</span>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                        ${totalPrice}
                    </span>
                </div>
            </div>

            {/* Reserve Button */}
            <button
                type="submit"
                disabled={loading || status === "loading"}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-indigo-600/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                    </>
                ) : (
                    <>
                        <CheckCircle2 className="w-4 h-4" />
                        Confirm Reservation
                    </>
                )}
            </button>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Secure booking • Instant confirmation • Free cancellation</span>
            </div>
        </form>
    );
}