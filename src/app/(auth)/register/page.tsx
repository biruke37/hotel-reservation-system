
"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Check, Building2, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Password toggle visibility states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        // 1. Password validation (length, uppercase, lowercase, number, special character)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!\%*#?&]{8,}$/;

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        if (!/(?=.*[a-z])/.test(formData.password)) {
            setError("Password must contain at least one lowercase letter.");
            return;
        }
        if (!/(?=.*[A-Z])/.test(formData.password)) {
            setError("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/(?=.*\d)/.test(formData.password)) {
            setError("Password must contain at least one number.");
            return;
        }
        if (!/(?=.*[@$!%*?&])/.test(formData.password)) {
            setError("Password must contain at least one special character.");
            return;
        }

        // 2. Gender validation
        if (!formData.gender || formData.gender === "select gender") {
            setError("Please select your gender.");
            return;
        }

        // 3. Password matching validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    gender: formData.gender,
                    password: formData.password,
                }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || "Registration failed. Please try again.");
            }

            router.push("/login?registered=true");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col lg:flex-row bg-hotel-cream font-sans">

            {/* 1. Left Dark Banner */}
            <div className="lg:w-1/2 bg-hotel-navy-950 bg-hotel-pattern text-white p-8 lg:p-16 flex flex-col justify-between border-r border-hotel-navy-900">
                <div>
                    {/* Brand Logo */}
                    <div className="flex items-center gap-3 mb-16">
                        <div className="p-2.5 bg-hotel-gold-500/20 border border-hotel-gold-500/40 rounded-xl text-hotel-gold-400">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="font-extrabold text-xl tracking-wide text-white block leading-none font-display">HotelHub</span>
                            <span className="text-[10px] tracking-widest text-hotel-gold-400 uppercase font-medium">LUXURY RESERVATIONS</span>
                        </div>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-6">
                        Begin Your Journey to <br /> Exceptional Stays
                    </h1>

                    <p className="text-hotel-navy-300 text-sm max-w-lg leading-relaxed mb-10">
                        Create your guest account and unlock access to curated rooms, seamless bookings, and exclusive member privileges.
                    </p>

                    <ul className="space-y-4 text-sm text-hotel-navy-200">
                        <li className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-hotel-gold-500/20 text-hotel-gold-400 flex items-center justify-center text-xs shrink-0">
                                <Check className="w-3 h-3" />
                            </span>
                            Exclusive member rates on premium suites
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-hotel-gold-500/20 text-hotel-gold-400 flex items-center justify-center text-xs shrink-0">
                                <Check className="w-3 h-3" />
                            </span>
                            Priority check-in & late checkout
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-hotel-gold-500/20 text-hotel-gold-400 flex items-center justify-center text-xs shrink-0">
                                <Check className="w-3 h-3" />
                            </span>
                            Personalized stay recommendations
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-hotel-gold-500/20 text-hotel-gold-400 flex items-center justify-center text-xs shrink-0">
                                <Check className="w-3 h-3" />
                            </span>
                            Earn rewards on every reservation
                        </li>
                    </ul>
                </div>
            </div>

            {/* 2. Right Form Container */}
            <div className="lg:w-1/2 bg-[#faf8f5] flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md bg-white rounded-2xl p-8 border border-slate-200/60 shadow-xl shadow-slate-200/50">

                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-display font-bold text-slate-900 mb-1">
                            Create Your Account
                        </h2>
                    </div>

                    {/* Error Alert Message */}
                    {error && (
                        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
                            <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                            <div className="relative">
                                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                    autoComplete="name"
                                    className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-hotel-gold-500 focus:ring-1 focus:ring-hotel-gold-500 transition"
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    autoComplete="email"
                                    className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-hotel-gold-500 focus:ring-1 focus:ring-hotel-gold-500 transition"
                                />
                            </div>
                        </div>

                        {/* Gender - Special Radio/Interactive Selection */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Gender</label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: "Male", value: "male" },
                                    { label: "Female", value: "female" },
                                    { label: "Other", value: "other" },
                                ].map((item) => {
                                    const isSelected = formData.gender === item.value;
                                    return (
                                        <button
                                            key={item.value}
                                            type="button"
                                            onClick={() => {
                                                setFormData((prev) => ({ ...prev, gender: item.value }));
                                                if (error) setError(null);
                                            }}
                                            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all flex items-center justify-center gap-1.5 ${isSelected
                                                ? "border-hotel-gold-500 bg-hotel-gold-500/10 text-hotel-gold-700 shadow-sm"
                                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                                                }`}
                                        >
                                            <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${isSelected ? "border-hotel-gold-600 bg-hotel-gold-600" : "border-slate-300"}`}>
                                                {isSelected && <span className="w-1 h-1 bg-white rounded-full" />}
                                            </span>
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Password with Toggle */}
                        <div>
                            <label htmlFor="password" className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="At least 8 chars, Upper, Lower, Number & Special"
                                    required
                                    autoComplete="new-password"
                                    className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-10 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-hotel-gold-500 focus:ring-1 focus:ring-hotel-gold-500 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password with Toggle */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Re-enter your password"
                                    required
                                    autoComplete="new-password"
                                    className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-10 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-hotel-gold-500 focus:ring-1 focus:ring-hotel-gold-500 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-start gap-2 pt-1">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-hotel-gold-600 focus:ring-0"
                            />
                            <label htmlFor="terms" className="text-[11px] leading-relaxed text-slate-500">
                                I agree to HotelHub&apos;s{" "}
                                <Link href="#" className="font-medium text-hotel-gold-600 hover:text-hotel-gold-700">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="#" className="font-medium text-hotel-gold-600 hover:text-hotel-gold-700">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="font-bold w-full bg-[#c9952e] hover:bg-[#b07a24] text-white py-2.5 rounded-lg text-xs shadow-md transition mt-2 disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Creating account...</span>
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-500">
                            Already a member?{" "}
                            <Link
                                href="/login"
                                className="font-bold text-hotel-gold-600 transition-colors hover:text-hotel-gold-700"
                            >
                                Sign in to your account
                            </Link>
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
}