"use client";

import { useState } from "react";
import { Calendar, Mail, User, BedDouble, Clock, DollarSign, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function AdminBookingsTable({ initialBookings }: { initialBookings: any[] }) {
    const [bookings, setBookings] = useState(initialBookings);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    const handleStatusChange = async (bookingId: string, newStatus: string) => {
        setIsUpdating(bookingId);
        try {
            const res = await fetch(`/api/bookings/${bookingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while updating the status");
        } finally {
            setIsUpdating(null);
        }
    };

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { bg: string; text: string; border: string; icon: any }> = {
            Pending: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", icon: Clock },
            Confirmed: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", icon: CheckCircle2 },
            CheckedIn: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", icon: CheckCircle2 },
            CheckedOut: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", icon: CheckCircle2 },
            Cancelled: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", icon: XCircle }
        };

        const config = statusConfig[status] || statusConfig.Pending;
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${config.bg} ${config.text} ${config.border}`}>
                <Icon className="w-3.5 h-3.5" />
                {status.replace(/([A-Z])/g, ' $1').trim()}
            </span>
        );
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-800/50 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4 font-semibold">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-indigo-400" />
                                    Guest Info
                                </div>
                            </th>
                            <th className="px-6 py-4 font-semibold">
                                <div className="flex items-center gap-2">
                                    <BedDouble className="w-4 h-4 text-indigo-400" />
                                    Room Details
                                </div>
                            </th>
                            <th className="px-6 py-4 font-semibold">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-indigo-400" />
                                    Booking Dates
                                </div>
                            </th>
                            <th className="px-6 py-4 font-semibold">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-indigo-400" />
                                    Amount
                                </div>
                            </th>
                            <th className="px-6 py-4 font-semibold">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-indigo-400" />
                                    Status
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-16 text-center">
                                    <div className="flex flex-col items-center gap-3 text-slate-500">
                                        <BedDouble className="w-12 h-12 opacity-30" />
                                        <p className="text-sm font-medium">No bookings found</p>
                                        <p className="text-xs">All bookings will appear here</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">
                                                    {booking.user.name[0].toUpperCase()}
                                                </div>
                                                <span className="font-medium text-white">{booking.user.name}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-400 ml-10">
                                                <Mail className="w-3 h-3" />
                                                {booking.user.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <p className="font-medium text-white">{booking.room.type}</p>
                                            <p className="text-xs text-slate-400">Room #{booking.room.roomNumber}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1.5 text-xs">
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-500 font-medium">Check-in:</span>
                                                <span className="text-slate-300">{new Date(booking.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-500 font-medium">Check-out:</span>
                                                <span className="text-slate-300">{new Date(booking.checkOutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-amber-400 font-bold text-lg">${booking.totalPrice.toFixed(2)}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-2">
                                            {getStatusBadge(booking.status)}
                                            <select
                                                value={booking.status}
                                                onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                                disabled={isUpdating === booking.id}
                                                className="block w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="CheckedIn">Checked In</option>
                                                <option value="CheckedOut">Checked Out</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {bookings.length > 0 && (
                <div className="bg-slate-800/30 px-6 py-4 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Total Bookings: <span className="font-bold text-white">{bookings.length}</span></span>
                        <span>Total Revenue: <span className="font-bold text-amber-400">${bookings.reduce((sum, b) => sum + b.totalPrice, 0).toFixed(2)}</span></span>
                    </div>
                </div>
            )}
        </div>
    );
}