"use client";

import { useState } from "react";
import { Smartphone, AlertCircle, Send } from "lucide-react";

interface MobileMoneyFormProps {
    onSubmit: (phoneNumber: string) => Promise<void>;
    amount: number;
    loading: boolean;
    provider: "telebirr" | "cbe";
}

export default function MobileMoneyForm({ onSubmit, amount, loading, provider }: MobileMoneyFormProps) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");

    const providerInfo = {
        telebirr: {
            name: "Telebirr",
            color: "purple",
            placeholder: "0912345678",
            instructions: "Enter your Telebirr registered phone number",
        },
        cbe: {
            name: "CBE Birr",
            color: "amber",
            placeholder: "0911234567",
            instructions: "Enter your CBE Birr registered phone number",
        },
    };

    const info = providerInfo[provider];

    const formatPhoneNumber = (value: string) => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, "");
        // Limit to 10 digits
        return digits.slice(0, 10);
    };

    const validatePhoneNumber = (phone: string): boolean => {
        // Ethiopian phone number validation (09 or 07 prefix, 10 digits)
        const phoneRegex = /^0[79]\d{8}$/;
        return phoneRegex.test(phone);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhoneNumber(formatted);
        if (error) setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validatePhoneNumber(phoneNumber)) {
            setError("Please enter a valid Ethiopian phone number");
            return;
        }

        setError("");
        await onSubmit(phoneNumber);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Provider Header */}
            <div className={`flex items-center gap-3 p-4 rounded-xl border ${
                provider === "telebirr"
                    ? "bg-purple-950/20 border-purple-800/30"
                    : "bg-amber-950/20 border-amber-800/30"
            }`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    provider === "telebirr"
                        ? "bg-purple-600"
                        : "bg-amber-600"
                }`}>
                    <Smartphone className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h4 className="font-bold text-white">{info.name}</h4>
                    <p className="text-xs text-slate-400">{info.instructions}</p>
                </div>
            </div>

            {/* Phone Number Input */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Smartphone className="w-4 h-4 text-indigo-400" />
                    Phone Number
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                        +251
                    </span>
                    <input
                        type="tel"
                        placeholder={info.placeholder}
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        disabled={loading}
                        className={`w-full bg-slate-950/50 border rounded-xl pl-16 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
                            error
                                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                                : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                        }`}
                    />
                </div>
                {error && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {error}
                    </p>
                )}
            </div>

            {/* Payment Amount Display */}
            <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-xl">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Amount to Pay</span>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                        ${amount.toFixed(2)}
                    </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                    You will receive a payment request on your phone
                </p>
            </div>

            {/* Instructions */}
            <div className="p-4 bg-indigo-950/20 border border-indigo-800/30 rounded-xl space-y-2">
                <h5 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                    <Send className="w-3.5 h-3.5" />
                    How It Works
                </h5>
                <ol className="space-y-1.5 text-xs text-slate-400">
                    <li className="flex gap-2">
                        <span className="text-indigo-400 font-bold">1.</span>
                        <span>Enter your {info.name} registered phone number</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-indigo-400 font-bold">2.</span>
                        <span>You'll receive a payment request on your phone</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-indigo-400 font-bold">3.</span>
                        <span>Enter your PIN to approve the payment</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-indigo-400 font-bold">4.</span>
                        <span>Payment confirmation will be instant</span>
                    </li>
                </ol>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading || !phoneNumber}
                className={`w-full py-4 text-white font-bold text-sm rounded-xl shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2 ${
                    provider === "telebirr"
                        ? "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 shadow-purple-600/20"
                        : "bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 shadow-amber-600/20"
                }`}
            >
                {loading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending Request...
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        Send Payment Request
                    </>
                )}
            </button>
        </form>
    );
}
