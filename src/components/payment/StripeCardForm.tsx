"use client";

import { useState } from "react";
import { CreditCard, Lock, AlertCircle } from "lucide-react";

interface StripeCardFormProps {
    onSubmit: (cardData: CardData) => Promise<void>;
    amount: number;
    loading: boolean;
}

export interface CardData {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
}

export default function StripeCardForm({ onSubmit, amount, loading }: StripeCardFormProps) {
    const [cardData, setCardData] = useState<CardData>({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
    });
    const [errors, setErrors] = useState<Partial<CardData>>({});

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || "";
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(" ");
        } else {
            return value;
        }
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        if (v.length >= 2) {
            return v.slice(0, 2) + "/" + v.slice(2, 4);
        }
        return v;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        if (formatted.replace(/\s/g, "").length <= 16) {
            setCardData({ ...cardData, cardNumber: formatted });
        }
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatExpiryDate(e.target.value);
        if (formatted.length <= 5) {
            setCardData({ ...cardData, expiryDate: formatted });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<CardData> = {};

        if (cardData.cardNumber.replace(/\s/g, "").length !== 16) {
            newErrors.cardNumber = "Invalid card number";
        }
        if (!cardData.cardName.trim()) {
            newErrors.cardName = "Card name is required";
        }
        if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
            newErrors.expiryDate = "Invalid expiry date";
        }
        if (cardData.cvv.length < 3) {
            newErrors.cvv = "Invalid CVV";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await onSubmit(cardData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Card Number */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-white">
                    <CreditCard className="w-4 h-4 text-indigo-400" />
                    Card Number
                </label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.cardNumber}
                        onChange={handleCardNumberChange}
                        disabled={loading}
                        className={`w-full bg-slate-950/50 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
                            errors.cardNumber
                                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                                : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                        }`}
                    />
                    {/* Card Type Icon */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <img src="/visa-icon.svg" alt="Visa" className="h-6 opacity-60" onError={(e) => e.currentTarget.style.display = 'none'} />
                        <img src="/mastercard-icon.svg" alt="Mastercard" className="h-6 opacity-60" onError={(e) => e.currentTarget.style.display = 'none'} />
                    </div>
                </div>
                {errors.cardNumber && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.cardNumber}
                    </p>
                )}
            </div>

            {/* Cardholder Name */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-white">Cardholder Name</label>
                <input
                    type="text"
                    placeholder="John Doe"
                    value={cardData.cardName}
                    onChange={(e) => setCardData({ ...cardData, cardName: e.target.value.toUpperCase() })}
                    disabled={loading}
                    className={`w-full bg-slate-950/50 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 transition-all disabled:opacity-50 uppercase ${
                        errors.cardName
                            ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                            : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                    }`}
                />
                {errors.cardName && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.cardName}
                    </p>
                )}
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Expiry Date</label>
                    <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardData.expiryDate}
                        onChange={handleExpiryChange}
                        disabled={loading}
                        className={`w-full bg-slate-950/50 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
                            errors.expiryDate
                                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                                : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                        }`}
                    />
                    {errors.expiryDate && (
                        <p className="text-xs text-rose-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.expiryDate}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Lock className="w-3.5 h-3.5 text-indigo-400" />
                        CVV
                    </label>
                    <input
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "") })}
                        disabled={loading}
                        className={`w-full bg-slate-950/50 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
                            errors.cvv
                                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                                : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                        }`}
                    />
                    {errors.cvv && (
                        <p className="text-xs text-rose-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.cvv}
                        </p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-indigo-600/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing Payment...
                    </>
                ) : (
                    <>
                        <Lock className="w-4 h-4" />
                        Pay ${amount.toFixed(2)}
                    </>
                )}
            </button>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span>Secured by 256-bit SSL encryption</span>
            </div>
        </form>
    );
}
