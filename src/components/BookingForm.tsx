"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function BookingForm({ roomId, pricePerNight }: { roomId: string; pricePerNight: number }) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { data: session, status } = useSession();
    const router = useRouter();

    // Calculate nights and total price dynamically (FR-1.3)
    const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 3600 * 24)) : 0;
    const totalPrice = nights > 0 ? (nights * pricePerNight).toFixed(2) : "0.00";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // FR-1.3: Must be authenticated to book
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
            // Redirect to user dashboard on success
            router.push("/dashboard?success=true");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Get today's date in YYYY-MM-DD format for min attribute
    const today = new Date().toISOString().split("T")[0];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded">{error}</div>}

            <div>
                <label className="block text-sm font-medium text-gray-700">Check-in</label>
                <input
                    type="date"
                    min={today}
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Check-out</label>
                <input
                    type="date"
                    min={checkIn || today}
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>${pricePerNight} x {nights} nights</span>
                    <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 mt-2 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition"
            >
                {loading ? "Processing..." : "Reserve Now"}
            </button>
            {!session && <p className="text-xs text-gray-500 text-center">You must be logged in to book.</p>}
        </form>
    );
}