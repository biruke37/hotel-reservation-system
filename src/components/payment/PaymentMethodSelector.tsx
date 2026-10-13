"use client";

import { useState } from "react";
import { CreditCard, Smartphone, Building2, Wallet, CheckCircle2, Shield } from "lucide-react";

export type PaymentMethod = "card" | "paypal" | "telebirr" | "cbe" | "stripe";

interface PaymentMethodSelectorProps {
    selectedMethod: PaymentMethod;
    onMethodChange: (method: PaymentMethod) => void;
}

const paymentMethods = [
    {
        id: "stripe" as PaymentMethod,
        name: "Credit/Debit Card",
        description: "Visa, Mastercard, Amex",
        icon: CreditCard,
        badge: "Popular",
        color: "indigo",
    },
    {
        id: "paypal" as PaymentMethod,
        name: "PayPal",
        description: "Fast & secure",
        icon: Wallet,
        badge: "Trusted",
        color: "blue",
    },
    {
        id: "telebirr" as PaymentMethod,
        name: "Telebirr",
        description: "Ethiopian mobile money",
        icon: Smartphone,
        badge: "Local",
        color: "purple",
    },
    {
        id: "cbe" as PaymentMethod,
        name: "CBE Birr",
        description: "Commercial Bank of Ethiopia",
        icon: Building2,
        badge: "Bank",
        color: "amber",
    },
];

export default function PaymentMethodSelector({
    selectedMethod,
    onMethodChange,
}: PaymentMethodSelectorProps) {
    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-indigo-400" />
                        Payment Method
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                        Choose your preferred payment option
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">Secure</span>
                </div>
            </div>

            {/* Payment Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selectedMethod === method.id;

                    return (
                        <button
                            key={method.id}
                            onClick={() => onMethodChange(method.id)}
                            className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
                                isSelected
                                    ? "border-indigo-500 bg-indigo-950/40 shadow-lg shadow-indigo-500/20"
                                    : "border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/60"
                            }`}
                        >
                            {/* Badge */}
                            <span
                                className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    method.color === "indigo"
                                        ? "bg-indigo-500 text-white"
                                        : method.color === "blue"
                                        ? "bg-blue-500 text-white"
                                        : method.color === "purple"
                                        ? "bg-purple-500 text-white"
                                        : "bg-amber-500 text-slate-950"
                                }`}
                            >
                                {method.badge}
                            </span>

                            <div className="flex items-center gap-3">
                                {/* Icon */}
                                <div
                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                                        isSelected
                                            ? "bg-indigo-600 text-white scale-105"
                                            : "bg-slate-800/50 text-slate-400 group-hover:bg-slate-800 group-hover:text-slate-300"
                                    }`}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`font-bold text-sm transition-colors ${
                                                isSelected ? "text-white" : "text-slate-200 group-hover:text-white"
                                            }`}
                                        >
                                            {method.name}
                                        </span>
                                        {isSelected && (
                                            <CheckCircle2 className="w-4 h-4 text-indigo-400 animate-in zoom-in duration-200" />
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-3 p-4 bg-slate-950/40 border border-slate-800 rounded-xl">
                <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-300">
                        Secure Payment Guarantee
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        All transactions are encrypted with 256-bit SSL. Your payment information is never stored on our servers.
                    </p>
                </div>
            </div>
        </div>
    );
}
