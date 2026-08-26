
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, Smartphone, CreditCard, Building2 } from "lucide-react";

interface CheckoutProps {
    params: {
        id: string;
    };
}

export default function CheckoutPage({ params }: CheckoutProps) {
    const [bookingId, setBookingId] = useState<string>("");

    useEffect(() => {
        if (params?.id) {
            setBookingId(params.id);
        }
    }, [params]);

    const { data: session } = useSession();
    const router = useRouter();

    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("telebirr"); // telebirr, cbe, chapa

    const [bookingDetails, setBookingDetails] = useState({
        roomType: "Luxury Suite",
        roomNumber: "101",
        checkInDate: "2026-09-10",
        checkOutDate: "2026-09-13",
        grandTotal: 1500,
    });

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // ዩዘሩ ሎጊን አድርጎ ከሆነ ስሙን እና ኢሜይሉን በአግባቡ መሙላት
    useEffect(() => {
        if (session?.user) {
            const rawName = session.user.name || session.user.email || "";

            if (rawName.includes("@")) {
                const nameFromEmail = rawName.split("@")[0];
                setFirstName(nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1));
                setLastName("Guest");
            } else {
                const nameParts = rawName.split(" ");
                setFirstName(nameParts[0] || "");
                setLastName(nameParts.slice(1).join(" ") || "Guest");
            }

            setEmail(session.user.email || "");
        }
    }, [session]);

    // የቡኪንግ መረጃዎችን ከባክኤንድ ማምጣት
    useEffect(() => {
        async function fetchBookingData(id: string) {
            try {
                const res = await fetch(`/api/booking/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setBookingDetails({
                        roomType: data.room?.type || "Luxury Suite",
                        roomNumber: data.room?.roomNumber || "101",
                        checkInDate: data.checkInDate ? data.checkInDate.split("T")[0] : "2026-09-10",
                        checkOutDate: data.checkOutDate ? data.checkOutDate.split("T")[0] : "2026-09-13",
                        grandTotal: data.totalPrice || 1500,
                    });
                }
            } catch (error) {
                console.error("Failed to load booking details", error);
            }
        }
        if (bookingId) {
            fetchBookingData(bookingId);
        }
    }, [bookingId]);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setErrorMessage("");

        // ለ Telebirr እና CBE Birr ስልክ ቁጥር ማስገባት ግዴታ ስለሆነ ማረጋገጥ
        if ((paymentMethod === "telebirr" || paymentMethod === "cbe") && (!phone || phone.length < 10)) {
            setErrorMessage(`Please enter a valid phone number for ${paymentMethod.toUpperCase()}`);
            setIsProcessing(false);
            return;
        }

        try {
            const response = await fetch("/api/payment/initialize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookingId,
                    totalPrice: bookingDetails.grandTotal,
                    paymentMethod,
                    firstName,
                    lastName,
                    email,
                    phone,
                }),
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server returned an invalid response. Check API route.");
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to process payment");
            }

            // ክፍያው ወደ ተመረጠው ጌትዌይ ዩአርኤል (Telebirr, CBE, ወይንም Chapa Checkout URL) እንዲዞር ማድረግ
            if (data.checkout_url) {
                window.location.href = data.checkout_url;
            } else {
                throw new Error("Payment checkout URL not found from gateway.");
            }

        } catch (error: any) {
            console.error("Checkout error:", error);

            // ኤረሩ የትኛውንም ዓይነት (Object, String, Error) ቢሆን ወደ ትክክለኛ ጽሁፍ መቀየር
            let finalMsg = "Something went wrong during payment.";

            const errData = error.response?.data;
            if (errData) {
                if (typeof errData === 'string') {
                    finalMsg = errData;
                } else if (errData.error) {
                    finalMsg = typeof errData.error === 'object' ? JSON.stringify(errData.error) : errData.error;
                } else {
                    finalMsg = JSON.stringify(errData);
                }
            } else if (error.message) {
                finalMsg = error.message;
            }

            setErrorMessage(finalMsg);
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#070b14] text-slate-100 p-6 sm:p-10 flex items-center justify-center font-sans">
            <div className="max-w-4xl w-full bg-[#0d1322] border border-slate-800 rounded-3xl p-8 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* ግራဘက် - የክፍያ ምርጫ እና ፎርም */}
                <form onSubmit={handleCheckout} className="space-y-4">
                    <h2 className="text-xl font-bold mb-2">Checkout & Payment</h2>
                    <p className="text-xs text-slate-400 mb-4">Choose your preferred Ethiopian payment method.</p>

                    {errorMessage && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-xl">
                            {errorMessage}
                        </div>
                    )}

                    {/* የክፍያ አማራጮች (Telebirr, CBE Birr, Chapa Card) */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <button
                            type="button"
                            onClick={() => setPaymentMethod("telebirr")}
                            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition cursor-pointer ${paymentMethod === "telebirr"
                                ? "bg-indigo-600/20 border-indigo-500 text-indigo-400"
                                : "bg-[#131b2e] border-slate-800 text-slate-400 hover:border-slate-700"
                                }`}
                        >
                            <Smartphone className="w-5 h-5 text-emerald-400" />
                            Telebirr
                        </button>

                        <button
                            type="button"
                            onClick={() => setPaymentMethod("cbe")}
                            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition cursor-pointer ${paymentMethod === "cbe"
                                ? "bg-indigo-600/20 border-indigo-500 text-indigo-400"
                                : "bg-[#131b2e] border-slate-800 text-slate-400 hover:border-slate-700"
                                }`}
                        >
                            <Building2 className="w-5 h-5 text-purple-400" />
                            CBE Birr
                        </button>

                        <button
                            type="button"
                            onClick={() => setPaymentMethod("chapa")}
                            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition cursor-pointer ${paymentMethod === "chapa"
                                ? "bg-indigo-600/20 border-indigo-500 text-indigo-400"
                                : "bg-[#131b2e] border-slate-800 text-slate-400 hover:border-slate-700"
                                }`}
                        >
                            <CreditCard className="w-5 h-5 text-blue-400" />
                            Card / Chapa
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full bg-[#131b2e] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full bg-[#131b2e] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#131b2e] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* የስልክ ቁጥር ሳጥን: ለ Telebirr እና CBE ግዴታ ሲሆን, ለ Chapa ግን አማራጭ ይሆናል */}
                    <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                            Phone Number {paymentMethod === "chapa" ? "(Optional for Card)" : `(For ${paymentMethod.toUpperCase()})`}
                        </label>
                        <input
                            type="tel"
                            placeholder="09xxxxxxxx / 07xxxxxxxx"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-[#131b2e] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                            required={paymentMethod !== "chapa"}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-xs shadow-lg shadow-indigo-600/30"
                    >
                        {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isProcessing
                            ? "Connecting to Payment..."
                            : paymentMethod === "chapa"
                                ? `Pay ETB ${bookingDetails.grandTotal} via Card (Chapa)`
                                : `Pay ETB ${bookingDetails.grandTotal} via ${paymentMethod.toUpperCase()}`
                        }
                    </button>
                </form>

                {/* ቀኝဘက် - ማጠቃለያ ክፍል */}
                <div className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                    <div>
                        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Booking Summary</h3>
                        <div className="space-y-3 text-xs text-slate-400">
                            <div className="flex justify-between border-b border-slate-800 pb-2">
                                <span>Room:</span>
                                <span className="text-white font-semibold">{bookingDetails.roomType} (#{bookingDetails.roomNumber})</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Check-in:</span>
                                <span className="text-white font-semibold">{bookingDetails.checkInDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Check-out:</span>
                                <span className="text-white font-semibold">{bookingDetails.checkOutDate}</span>
                            </div>
                            <div className="flex justify-between border-t border-slate-800 pt-3 mt-2">
                                <span className="text-white font-bold">Total Amount:</span>
                                <span className="text-emerald-400 font-bold text-sm">ETB {bookingDetails.grandTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 border-t border-slate-800/80 pt-4">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Secured by Chapa Gateway (Telebirr & CBE Supported).</span>
                    </div>
                </div>

            </div>
        </div>
    );
}