"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    DollarSign,
    CalendarCheck,
    Users,
    BedDouble,
    Plus,
    X,
    Check,
    XCircle,
    Loader2
} from "lucide-react";

// Mock Initial Data
const initialBookings = [
    { id: "1", guest: "Abebe Kebede", room: "Deluxe Suite #301", dates: "Aug 18 - Aug 22", status: "CONFIRMED", amount: "$450" },
    { id: "2", guest: "Sara Tadesse", room: "Executive Room #204", dates: "Aug 19 - Aug 21", status: "PENDING", amount: "$280" },
    { id: "3", guest: "Dawit Alamu", room: "Standard King #105", dates: "Aug 20 - Aug 25", status: "CHECKED_IN", amount: "$620" },
    { id: "4", guest: "Tigist Hailu", room: "Penthouse #501", dates: "Aug 22 - Aug 26", status: "CANCELLED", amount: "$1,200" },
];

export default function AdminDashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [bookings, setBookings] = useState(initialBookings);
    const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
    const [newRoom, setNewRoom] = useState({ number: "", type: "Deluxe Suite", price: "" });

    // Authentication Guard: ያልገባ ወይም Admin ያልሆነ ሰው ሲገባ ወደ Login ይመልሰዋል
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/admin");
        }
    }, [status, router]);

    // Loading State: Authentication እስኪረጋገጥ Loading ያሳያል
    if (status === "loading") {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                <p className="text-xs font-medium">admin permission waiting me...</p>
            </div>
        );
    }

    // አካውንት ካልገባ ምንም አይነት ዳታ እንዳይታይ ይከለክላል
    if (!session) {
        return null;
    }

    // Status Change Handler (Confirm / Cancel)
    const handleStatusChange = (id: string, newStatus: string) => {
        setBookings((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
    };

    // Add Room Form Submit
    const handleAddRoomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`አዲስ ክፍል #${newRoom.number} (${newRoom.type}) በ $${newRoom.price} በተሳካ ሁኔታ ተመዝግቧል!`);
        setIsAddRoomOpen(false);
        setNewRoom({ number: "", type: "Deluxe Suite", price: "" });
    };

    return (
        <div className="space-y-8 relative">
            {/* Action Header Banner */}
            <div className="flex items-center justify-between bg-[#0d1322] border border-slate-800/80 p-4 rounded-2xl">
                <div>
                    <h1 className="text-lg font-bold text-white">Dashboard Overview</h1>
                    <p className="text-xs text-slate-400">
                        Hotel all activity and reservation this manage
                    </p>
                </div>
                <button
                    onClick={() => setIsAddRoomOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Room</span>
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
                        <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                            <DollarSign className="w-5 h-5" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-white">$24,850</h3>
                    <p className="text-xs text-emerald-400 font-medium mt-1">↑ +14.2% vs last month</p>
                </div>

                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Bookings</span>
                        <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                            <CalendarCheck className="w-5 h-5" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-white">{bookings.length}</h3>
                    <p className="text-xs text-indigo-400 font-medium mt-1">↑ +8.1% vs last month</p>
                </div>

                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Guests</span>
                        <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-white">52</h3>
                    <p className="text-xs text-purple-400 font-medium mt-1">↑ +5.4% vs last month</p>
                </div>

                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Available Rooms</span>
                        <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                            <BedDouble className="w-5 h-5" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-white">18/30</h3>
                    <p className="text-xs text-amber-400 font-medium mt-1">60% occupancy rate</p>
                </div>
            </div>

            {/* Interactive Reservations Table */}
            <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-bold text-white">Recent Reservations</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Confirm or Cancel።</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800/80 bg-[#111827]/50 text-[11px] uppercase tracking-wider text-slate-400">
                                <th className="py-3.5 px-6 font-semibold">Guest</th>
                                <th className="py-3.5 px-6 font-semibold">Room Type</th>
                                <th className="py-3.5 px-6 font-semibold">Dates</th>
                                <th className="py-3.5 px-6 font-semibold">Status</th>
                                <th className="py-3.5 px-6 font-semibold">Amount</th>
                                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-xs">
                            {bookings.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-800/30 transition">
                                    <td className="py-4 px-6 font-bold text-white">{item.guest}</td>
                                    <td className="py-4 px-6 text-slate-300">{item.room}</td>
                                    <td className="py-4 px-6 text-slate-400">{item.dates}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${item.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            item.status === 'PENDING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                item.status === 'CHECKED_IN' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                    'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 font-extrabold text-white">{item.amount}</td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {item.status === "PENDING" && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(item.id, "CONFIRMED")}
                                                        className="p-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition"
                                                        title="Confirm Booking"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(item.id, "CANCELLED")}
                                                        className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg transition"
                                                        title="Cancel Booking"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                            {item.status === "CONFIRMED" && (
                                                <button
                                                    onClick={() => handleStatusChange(item.id, "CANCELLED")}
                                                    className="text-xs text-rose-400 hover:underline font-semibold"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Room Modal Popup */}
            {isAddRoomOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl w-full max-w-md p-6 space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                            <h3 className="text-base font-bold text-white">Add New Room</h3>
                            <button onClick={() => setIsAddRoomOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddRoomSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-300">Room Number</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. 402"
                                    value={newRoom.number}
                                    onChange={(e) => setNewRoom({ ...newRoom, number: e.target.value })}
                                    className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-300">Room Type</label>
                                <select
                                    value={newRoom.type}
                                    onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                                    className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                >
                                    <option value="Deluxe Suite">Deluxe Suite</option>
                                    <option value="Executive Room">Executive Room</option>
                                    <option value="Standard King">Standard King</option>
                                    <option value="Penthouse Suite">Penthouse Suite</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-300">Price per Night ($)</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="e.g. 250"
                                    value={newRoom.price}
                                    onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                                    className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddRoomOpen(false)}
                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition"
                                >
                                    Save Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}