"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PaymentMethodSelector, { PaymentMethod } from "./PaymentMethodSelector";
import StripeCardForm, { CardData } from "./StripeCardForm";
import PayPalButton from "./PayPalButton";
import MobileMoneyForm from "./MobileMoneyForm";
import BookingSummary from "./BookingSummary";
import { CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

interface CheckoutPageProps {
    roomId: string;
    room: {
        name: string;
        type: string;
        imageUrl?: string;
        pricePerNight: number;
    };
    checkIn: string;
    checkOut: string;
    guests: number;
    nights: number;
    total: number;
}

export default function CheckoutPage({
    roomId,
    room,
    checkIn,
    checkOut,
    guests,
    nights,
    total,
}: CheckoutPageProps) {
    const router = useRouter();
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("stripe");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Stripe Card Payment Handler
    const handleCardPayment = async (cardData: CardData) => {
        setLoading(true);
        setError("");

        try {
            // Simulate payment processing
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Create booking after successful payment
            const bookingRes = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    roomId,
                    checkInDate: checkIn,
                    checkOutDate: checkOut,
                    totalPrice: total,
                    paymentMethod: "stripe",
                    paymentDetails: {
                        last4: cardData.cardNumber.slice(-4),
                        cardType: "visa", // Detect from card number
                    },
                }),
            });

            if (!bookingRes.ok) {
                throw new Error("Failed to create booking");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/my-bookings?success=true");
            }, 2000);
        } catch (err: any) {
            setError(err.message || "Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // PayPal Payment Handler
    const handlePayPalSuccess = async (details: any) => {
        setLoading(true);
        setError("");

        try {
            const bookingRes = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    roomId,
                    checkInDate: checkIn,
                    checkOutDate: checkOut,
                    totalPrice: total,
                    paymentMethod: "paypal",
                    paymentDetails: details,
                }),
            });

            if (!bookingRes.ok) {
                throw new Error("Failed to create booking");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/my-bookings?success=true");
            }, 2000);
        } catch (err: any) {
            setError(err.message || "Booking creation failed.");
        } finally {
            setLoading(false);
        }
    };

    // Mobile Money Payment Handler
    const handleMobileMoneyPayment = async (phoneNumber: string) => {
        setLoading(true);
        setError("");

        try {
            // Simulate mobile money request
            await new Promise((resolve) => setTimeout(resolve, 3000));

            const bookingRes = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    roomId,
                    checkInDate: checkIn,
                    checkOutDate: checkOut,
                    totalPrice: total,
                    paymentMethod: selectedMethod,
                    paymentDetails: {
                        phoneNumber,
                        provider: selectedMethod,
                    },
                }),
            });

            if (!bookingRes.ok) {
                throw new Error("Failed to create booking");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/my-bookings?success=true");
            }, 2000);
        } catch (err: any) {
            setError(err.message || "Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="max-w-md w-full space-y-6 text-center">
                    <div className="flex items-center justify-center">
                        <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
                        <p className="text-slate-400 mt-2">
                            Your booking has been confirmed. Redirecting to your bookings...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Back to Room Details</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Payment Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Complete Your Booking</h1>
                            <p className="text-slate-400 mt-2">
                                Choose your payment method and complete your reservation
                            </p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="flex items-start gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-rose-400">Payment Error</p>
                                    <p className="text-xs text-slate-300 mt-1">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Payment Method Selector */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <PaymentMethodSelector
                                selectedMethod={selectedMethod}
                                onMethodChange={setSelectedMethod}
                            />
                        </div>

                        {/* Payment Form */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            {selectedMethod === "stripe" && (
                                <StripeCardForm
                                    onSubmit={handleCardPayment}
                                    amount={total}
                                    loading={loading}
                                />
                            )}

                            {selectedMethod === "paypal" && (
                                <PayPalButton
                                    amount={total}
                                    onSuccess={handlePayPalSuccess}
                                    onError={(err) => setError(err.message)}
                                />
                            )}

                            {(selectedMethod === "telebirr" || selectedMethod === "cbe") && (
                                <MobileMoneyForm
                                    onSubmit={handleMobileMoneyPayment}
                                    amount={total}
                                    loading={loading}
                                    provider={selectedMethod}
                                />
                            )}
                        </div>
                    </div>

                    {/* Right Column - Booking Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <BookingSummary
                                room={room}
                                checkIn={checkIn}
                                checkOut={checkOut}
                                guests={guests}
                                nights={nights}
                                total={total}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
