"use client";

import { useState } from "react";
import { Wallet, CheckCircle2, AlertCircle } from "lucide-react";

interface PayPalButtonProps {
    amount: number;
    onSuccess: (details: any) => Promise<void>;
    onError: (error: any) => void;
}

export default function PayPalButton({ amount, onSuccess, onError }: PayPalButtonProps) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    // Simulated PayPal payment flow
    // In production, you would integrate the actual PayPal SDK
    const handlePayPalPayment = async () => {
        setLoading(true);
        setStatus("idle");

        try {
            // Simulate PayPal SDK call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Simulated success
            const mockPayPalDetails = {
                orderID: `PP-${Date.now()}`,
                payerID: "MOCK_PAYER_ID",
                paymentID: `PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                status: "COMPLETED",
                amount: amount,
                timestamp: new Date().toISOString(),
            };

            await onSuccess(mockPayPalDetails);
            setStatus("success");
        } catch (error) {
            console.error("PayPal payment error:", error);
            setStatus("error");
            onError(error);
        } finally {
            setLoading(false);
        }
    };

    if (status === "success") {
        return (
            <div className="space-y-4 p-6 bg-emerald-950/20 border border-emerald-800/30 rounded-xl">
                <div className="flex items-center justify-center gap-3 text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                    <div>
                        <h4 className="font-bold">Payment Successful!</h4>
                        <p className="text-xs text-emerald-300/80 mt-1">
                            Your PayPal payment has been processed
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-rose-400 text-sm">Payment Failed</p>
                        <p className="text-xs text-slate-300 mt-1">
                            There was an issue processing your PayPal payment. Please try again.
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setStatus("idle")}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* PayPal Info */}
            <div className="flex items-center gap-3 p-4 bg-blue-950/20 border border-blue-800/30 rounded-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                    <Wallet className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h4 className="font-bold text-white">PayPal Checkout</h4>
                    <p className="text-xs text-slate-400">Fast, secure & trusted payment</p>
                </div>
            </div>

            {/* Amount Display */}
            <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-xl">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Amount to Pay</span>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                        ${amount.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* How it Works */}
            <div className="p-4 bg-indigo-950/20 border border-indigo-800/30 rounded-xl space-y-2">
                <h5 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    How PayPal Works
                </h5>
                <ol className="space-y-1.5 text-xs text-slate-400">
                    <li className="flex gap-2">
                        <span className="text-indigo-400 font-bold">1.</span>
                        <span>Click the button below to continue to PayPal</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-indigo-400 font-bold">2.</span>
                        <span>Log in to your PayPal account</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-indigo-400 font-bold">3.</span>
                        <span>Review and confirm your payment</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-indigo-400 font-bold">4.</span>
                        <span>You'll be redirected back with confirmation</span>
                    </li>
                </ol>
            </div>

            {/* PayPal Button */}
            <button
                onClick={handlePayPalPayment}
                disabled={loading}
                className="w-full py-4 bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold text-sm rounded-xl shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Connecting to PayPal...
                    </>
                ) : (
                    <>
                        <Wallet className="w-5 h-5" />
                        Continue with PayPal
                    </>
                )}
            </button>

            {/* Trust Badge */}
            <p className="text-center text-xs text-slate-500">
                Protected by PayPal Buyer Protection
            </p>
        </div>
    );
}
