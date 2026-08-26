
import React from "react";
import Link from "next/link";
import { Hotel, CheckCircle2 } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  variant?: "login" | "register";
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  variant = "login",
  title,
  subtitle,
}: AuthLayoutProps) {
  const isLogin = variant === "login";

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Branding Panel */}
      <div className="relative bg-slate-900 text-white p-8 lg:p-12 flex flex-col justify-between overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="p-2 bg-amber-600 rounded-lg text-white">
            <Hotel className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wider text-white uppercase">HotelHub</h1>
            <p className="text-[10px] text-amber-400 font-semibold tracking-widest uppercase">
              Hotel Reservations
            </p>
          </div>
        </div>

        {/* Dynamic Hero Content */}
        <div className="my-10 space-y-5 relative z-10 max-w-md">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-100 leading-tight">
            {isLogin
              ? "Welcome Back to Refined Hospitality"
              : "Begin Your Journey to Exceptional Stays"}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {isLogin
              ? "Sign in to manage your reservations, view upcoming stays, and enjoy a seamless booking experience."
              : "Create your guest account and unlock access to curated rooms, seamless bookings, and exclusive member privileges."}
          </p>

          {!isLogin && (
            <ul className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Exclusive member rates on premium suites</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Priority check-in & late checkout</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Personalized stay recommendations</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Earn rewards on every reservation</span>
              </li>
            </ul>
          )}
        </div>

        {/* Footer Text */}
        <div className="text-xs text-slate-500 relative z-10">
          © {new Date().getFullYear()} HotelHub. All rights reserved.
        </div>
      </div>

      {/* Right Form Container */}
      <div className="flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif font-bold text-slate-900">{title}</h2>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}