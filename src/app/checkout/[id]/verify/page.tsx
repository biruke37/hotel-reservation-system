"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, ShieldCheck } from "lucide-react";

export default function PaymentVerificationPage() {
    const router = useRouter();
    const params = useParams();
    const bookingId = params?.id;

    const [booking, setBooking] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // ፎርም ላይ የሚሞሉ መረጃዎች (Form states)
    const [paymentMethod, setPaymentMethod] = useState("cbe"); // 'cbe' or 'telebirr'
    const [transactionRef, setTransactionRef] = useState("");
    const [phoneNumberOrAccount, setPhoneNumberOrAccount] = useState("");

    // 1. የቦኪንግ መረጃውን ከዳታቤዝ ማምጣት (Fetch booking details)
    useEffect(() => {
        async function fetchBooking() {
            try {
                const res = await fetch(`/api/bookings/${bookingId}`);
                const data = await res.json();
                if (data.success) {
                    setBooking(data.booking);
                } else {
                    setErrorMsg("ቦኪንግ መረጃውን ማግኘት አልተቻለም።");
                }
            } catch (err) {
                console.error("Error fetching booking:", err);
                setErrorMsg("የሰርቨር ስህተት አጋጥሟል።");
            } finally {
                setIsLoading(false);
            }
        }

        if (bookingId) {
            fetchBooking();
        }
    }, [bookingId]);

    // 2. ክፍያውን ልኮ ወደ አድሚን ማረጋገጫ መላክ (Submit Verification)
    const handleSubmitVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!transactionRef.trim()) {
            setErrorMsg("እባክዎ የግብይት ማጠቃለያ ቁጥር (Transaction Ref) ያስገቡ።");
            return;
        }

        setIsSubmitting(true);
        setErrorMsg("");

        try {
            const res = await fetch("/api/payment/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookingId,
                    paymentMethod,
                    transactionRef,
                    phoneNumberOrAccount,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setSuccessMsg(data.message);
                setTimeout(() => {
                    router.push("/admin/payments"); // ወይም ወደ ተጠቃሚው ዳሽቦርድ
                }, 2000);
            } else {
                setErrorMsg(data.message || "ማረጋገጥ አልተቻለም።");
            }
        } catch (err) {
            console.error("Verification submit error:", err);
            setErrorMsg("የኔትወርክ ስህተት አጋጥሟል።");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4]">
                <Loader2 className="w-8 h-8 animate-spin text-[#c59a5b]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f7f4] py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6">

                {/* Header & Price Info */}
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="font-serif text-lg font-bold text-gray-900">
                            {booking?.hotelName || "ሆቴል ሪዘርቬሽን"}
                        </h1>
                        <p className="text-xs text-gray-500">
                            {booking?.roomType || "ክፍል"} • {booking?.nights || 1} ሌሊት
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-gray-400 block">የሚከፈለው ጠቅላላ ዋጋ</span>
                        <span className="font-serif font-bold text-lg text-[#080d1a]">
                            {booking?.amount ? booking.amount.toLocaleString() : "0"} ETB
                        </span>
                    </div>
                </div>

                {/* Error / Success Messages */}
                {errorMsg && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-600 p-3 rounded-lg text-xs">
                        {errorMsg}
                    </div>
                )}
                {successMsg && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 p-3 rounded-lg text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> {successMsg}
                    </div>
                )}

                {/* Instructions */}
                <div className="bg-[#fcfbfa] p-4 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-2">
                    <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#c59a5b]" /> የክፍያ መመሪያ (Payment Instructions)
                    </p>
                    <p>1. በንግድ ባንክ (CBE) ቁጥር: <strong>1000XXXXXXXXXX</strong> ወይም በቴሌብር: <strong>09XXXXXXXX</strong> ገንዘቡን ያስተላልፉ።</p>
                    <p>2. ከባንክ ወይም ከቴሌብር የደረሰዎትን የትራንዛክሽን ቁጥር (Transaction Reference) ከታች ባለው ሳጥን ውስጥ ያስገቡ።</p>
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmitVerification} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">የክፍያ አማራጭ (Payment Method)</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#c59a5b] outline-none"
                        >
                            <option value="cbe">የኢትዮጵያ ንግድ ባንክ (CBE)</option>
                            <option value="telebirr">ቴሌብር (Telebirr)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">የግብይት ማጠቃለያ ቁጥር (Transaction Ref)</label>
                        <input
                            type="text"
                            required
                            placeholder="ለምሳሌ፡ FT24059XXXX ወይም TR24..."
                            value={transactionRef}
                            onChange={(e) => setTransactionRef(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#c59a5b] outline-none font-mono"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">የስልክ ቁጥር ወይም የባንክ አካውንት (Phone/Account)</label>
                        <input
                            type="text"
                            placeholder="0911223344"
                            value={phoneNumberOrAccount}
                            onChange={(e) => setPhoneNumberOrAccount(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#c59a5b] outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-[#080d1a] hover:bg-[#1a233a] text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 mt-6"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> በመላክ ላይ...
                            </>
                        ) : (
                            "ክፍያውን አረጋግጥ (Verify Payment)"
                        )}
                    </button>
                </form>

            </div>
        </div>
    );
}