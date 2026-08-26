"use client";

import { useState } from "react";
import {
    Building2,
    Mail,
    Phone,
    Globe,
    DollarSign,
    Clock,
    ShieldCheck,
    Bell,
    Save,
    CheckCircle2,
    Lock,
    Sparkles,
} from "lucide-react";

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState<"general" | "booking" | "notifications" | "security">("general");
    const [isSaved, setIsSaved] = useState(false);

    // Form States
    const [generalSettings, setGeneralSettings] = useState({
        hotelName: "HotelHub Luxury",
        contactEmail: "admin@hotelhub.com",
        phone: "+251 911 000 111",
        address: "Bole Road, Addis Ababa, Ethiopia",
        currency: "USD",
    });

    const [bookingRules, setBookingRules] = useState({
        checkInTime: "14:00",
        checkOutTime: "11:00",
        taxRate: "15",
        cancellationPolicy: "24_hours",
        autoConfirm: true,
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailAlerts: true,
        newBookingNotify: true,
        cancellationNotify: true,
        dailyReports: false,
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="space-y-6 max-w-5xl">
            {/* Top Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d1322] border border-slate-800/80 p-6 rounded-2xl shadow-xl">
                <div>
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
                        <Sparkles className="w-4 h-4" />
                        <span>System Configuration</span>
                    </div>
                    <h1 className="text-xl font-black text-white tracking-wide">
                        Hotel Preferences & Settings
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        all hotel information payment and reervation customer this manage::
                    </p>
                </div>

                {isSaved && (
                    <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-xs font-bold animate-fade-in">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Saved Successfully!</span>
                    </div>
                )}
            </div>

            {/* Tabs Bar */}
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 overflow-x-auto">
                <button
                    onClick={() => setActiveTab("general")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${activeTab === "general"
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                            : "text-slate-400 hover:text-white bg-[#0d1322] border border-slate-800/80"
                        }`}
                >
                    <Building2 className="w-4 h-4" />
                    <span>General Information</span>
                </button>
                <button
                    onClick={() => setActiveTab("booking")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${activeTab === "booking"
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                            : "text-slate-400 hover:text-white bg-[#0d1322] border border-slate-800/80"
                        }`}
                >
                    <Clock className="w-4 h-4" />
                    <span>Booking Rules & Tax</span>
                </button>
                <button
                    onClick={() => setActiveTab("notifications")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${activeTab === "notifications"
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                            : "text-slate-400 hover:text-white bg-[#0d1322] border border-slate-800/80"
                        }`}
                >
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                </button>
                <button
                    onClick={() => setActiveTab("security")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${activeTab === "security"
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                            : "text-slate-400 hover:text-white bg-[#0d1322] border border-slate-800/80"
                        }`}
                >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Security & Password</span>
                </button>
            </div>

            {/* Main Settings Form */}
            <form onSubmit={handleSave} className="space-y-6">
                {/* Tab 1: General Info */}
                {activeTab === "general" && (
                    <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-6 space-y-5 shadow-xl">
                        <h2 className="text-sm font-bold text-white border-b border-slate-800/80 pb-3">
                            General Hotel Details
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-300">Hotel Name</label>
                                <div className="relative">
                                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={generalSettings.hotelName}
                                        onChange={(e) =>
                                            setGeneralSettings({ ...generalSettings, hotelName: e.target.value })
                                        }
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-300">Contact Email</label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="email"
                                        value={generalSettings.contactEmail}
                                        onChange={(e) =>
                                            setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })
                                        }
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-300">Phone Number</label>
                                <div className="relative">
                                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={generalSettings.phone}
                                        onChange={(e) =>
                                            setGeneralSettings({ ...generalSettings, phone: e.target.value })
                                        }
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-300">Default Currency</label>
                                <div className="relative">
                                    <DollarSign className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <select
                                        value={generalSettings.currency}
                                        onChange={(e) =>
                                            setGeneralSettings({ ...generalSettings, currency: e.target.value })
                                        }
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                                    >
                                        <option value="USD">USD ($)</option>
                                        <option value="ETB">ETB (Br)</option>
                                        <option value="EUR">EUR (€)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">Hotel Address</label>
                            <div className="relative">
                                <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={generalSettings.address}
                                    onChange={(e) =>
                                        setGeneralSettings({ ...generalSettings, address: e.target.value })
                                    }
                                    className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: Booking Rules */}
                {activeTab === "booking" && (
                    <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-6 space-y-5 shadow-xl">
                        <h2 className="text-sm font-bold text-white border-b border-slate-800/80 pb-3">
                            Booking Rules & Policies
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-300">Check-in Time</label>
                                <input
                                    type="time"
                                    value={bookingRules.checkInTime}
                                    onChange={(e) =>
                                        setBookingRules({ ...bookingRules, checkInTime: e.target.value })
                                    }
                                    className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-300">Check-out Time</label>
                                <input
                                    type="time"
                                    value={bookingRules.checkOutTime}
                                    onChange={(e) =>
                                        setBookingRules({ ...bookingRules, checkOutTime: e.target.value })
                                    }
                                    className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-300">Tax Rate (%)</label>
                                <input
                                    type="number"
                                    value={bookingRules.taxRate}
                                    onChange={(e) =>
                                        setBookingRules({ ...bookingRules, taxRate: e.target.value })
                                    }
                                    className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-300">Cancellation Policy</label>
                                <select
                                    value={bookingRules.cancellationPolicy}
                                    onChange={(e) =>
                                        setBookingRules({ ...bookingRules, cancellationPolicy: e.target.value })
                                    }
                                    className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                                >
                                    <option value="free">Free Cancellation</option>
                                    <option value="24_hours">Flexible (24 hours notice)</option>
                                    <option value="non_refundable">Non-refundable</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                            <div>
                                <p className="text-xs font-bold text-white">Instant Booking Auto-Confirm</p>
                                <p className="text-[11px] text-slate-400">client place take self Confirm ።</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={bookingRules.autoConfirm}
                                onChange={(e) =>
                                    setBookingRules({ ...bookingRules, autoConfirm: e.target.checked })
                                }
                                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
                            />
                        </div>
                    </div>
                )}

                {/* Tab 3: Notifications */}
                {activeTab === "notifications" && (
                    <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-6 space-y-5 shadow-xl">
                        <h2 className="text-sm font-bold text-white border-b border-slate-800/80 pb-3">
                            Notification Preferences
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-white">New Booking Email Alerts</p>
                                    <p className="text-[11px] text-slate-400">new reservation taken Email sent።</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notificationSettings.newBookingNotify}
                                    onChange={(e) =>
                                        setNotificationSettings({ ...notificationSettings, newBookingNotify: e.target.checked })
                                    }
                                    className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
                                />
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                                <div>
                                    <p className="text-xs font-bold text-white">Cancellation Alerts</p>
                                    <p className="text-[11px] text-slate-400">cancel place notification sent።</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notificationSettings.cancellationNotify}
                                    onChange={(e) =>
                                        setNotificationSettings({ ...notificationSettings, cancellationNotify: e.target.checked })
                                    }
                                    className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 4: Security */}
                {activeTab === "security" && (
                    <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-6 space-y-5 shadow-xl">
                        <h2 className="text-sm font-bold text-white border-b border-slate-800/80 pb-3">
                            Admin Password & Authentication
                        </h2>

                        <div className="space-y-4 max-w-md">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-300">Current Password</label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-300">New Password</label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bottom Save Action Bar */}
                <div className="flex items-center justify-end">
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition active:scale-95"
                    >
                        <Save className="w-4 h-4" />
                        <span>Save Settings Changes</span>
                    </button>
                </div>
            </form>
        </div>
    );
}