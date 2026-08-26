"use client";

import { useState } from "react";
import {
    Search,
    UserPlus,
    Mail,
    Phone,
    Calendar,
    Trash2,
    Edit,
    Users,
    UserCheck,
    UserX,
    X,
    Check,
    Sparkles,
} from "lucide-react";

interface Guest {
    id: string;
    name: string;
    email: string;
    phone: string;
    room: string;
    checkIn: string;
    status: "ACTIVE" | "CHECKED_OUT";
}

const initialGuests: Guest[] = [
    {
        id: "1",
        name: "Abebe Kebede",
        email: "abebe@gmail.com",
        phone: "+251 911 223 344",
        room: "301 (Deluxe Suite)",
        checkIn: "Aug 18, 2026",
        status: "ACTIVE",
    },
    {
        id: "2",
        name: "Sara Tadesse",
        email: "sara.t@gmail.com",
        phone: "+251 922 334 455",
        room: "204 (Executive)",
        checkIn: "Aug 19, 2026",
        status: "ACTIVE",
    },
    {
        id: "3",
        name: "Dawit Alamu",
        email: "dawit@gmail.com",
        phone: "+251 933 445 566",
        room: "105 (Standard)",
        checkIn: "Aug 15, 2026",
        status: "CHECKED_OUT",
    },
];

export default function AdminGuestsPage() {
    const [guests, setGuests] = useState<Guest[]>(initialGuests);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGuest, setEditingGuest] = useState<Guest | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        room: "",
        checkIn: new Date().toISOString().split("T")[0],
        status: "ACTIVE" as "ACTIVE" | "CHECKED_OUT",
    });

    // Filter Logic
    const filteredGuests = guests.filter((guest) => {
        const matchesSearch =
            guest.name.toLowerCase().includes(search.toLowerCase()) ||
            guest.email.toLowerCase().includes(search.toLowerCase()) ||
            guest.phone.includes(search);
        const matchesStatus =
            statusFilter === "ALL" || guest.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Stats Calculations
    const totalGuests = guests.length;
    const activeGuests = guests.filter((g) => g.status === "ACTIVE").length;
    const checkedOutGuests = guests.filter((g) => g.status === "CHECKED_OUT").length;

    // Handlers
    const handleOpenAdd = () => {
        setEditingGuest(null);
        setFormData({
            name: "",
            email: "",
            phone: "",
            room: "",
            checkIn: new Date().toISOString().split("T")[0],
            status: "ACTIVE",
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (guest: Guest) => {
        setEditingGuest(guest);
        setFormData({
            name: guest.name,
            email: guest.email,
            phone: guest.phone,
            room: guest.room,
            checkIn: guest.checkIn,
            status: guest.status,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("are you sure this client information delete?")) {
            setGuests((prev) => prev.filter((g) => g.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingGuest) {
            setGuests((prev) =>
                prev.map((g) => (g.id === editingGuest.id ? { ...g, ...formData } : g))
            );
        } else {
            const newGuest: Guest = {
                id: Date.now().toString(),
                ...formData,
            };
            setGuests((prev) => [newGuest, ...prev]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            {/* Top Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d1322] border border-slate-800/80 p-6 rounded-2xl shadow-xl">
                <div>
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
                        <Sparkles className="w-4 h-4" />
                        <span>Guest Management System</span>
                    </div>
                    <h1 className="text-xl font-black text-white tracking-wide">
                        Guests Directory
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        All person Hotel recently information Management
                    </p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-95 shrink-0"
                >
                    <UserPlus className="w-4 h-4" />
                    <span>Add New Guest</span>
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Guests</p>
                        <h3 className="text-2xl font-black text-white mt-1">{totalGuests}</h3>
                    </div>
                    <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                        <Users className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">In-House Guests</p>
                        <h3 className="text-2xl font-black text-emerald-400 mt-1">{activeGuests}</h3>
                    </div>
                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                        <UserCheck className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Checked Out</p>
                        <h3 className="text-2xl font-black text-slate-400 mt-1">{checkedOutGuests}</h3>
                    </div>
                    <div className="p-3 bg-slate-500/10 text-slate-400 rounded-xl border border-slate-500/20">
                        <UserX className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0d1322] border border-slate-800/80 p-4 rounded-2xl">
                <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search guest by name, email or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                    {["ALL", "ACTIVE", "CHECKED_OUT"].map((st) => (
                        <button
                            key={st}
                            onClick={() => setStatusFilter(st)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${statusFilter === st
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                                    : "bg-[#131b2e] text-slate-400 hover:text-white border border-slate-800/80"
                                }`}
                        >
                            {st === "CHECKED_OUT" ? "Checked Out" : st === "ACTIVE" ? "In-House" : "All Guests"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Guests Table */}
            <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800/80 bg-[#111827]/50 text-[11px] uppercase tracking-wider text-slate-400">
                                <th className="py-4 px-6 font-semibold">Guest Name</th>
                                <th className="py-4 px-6 font-semibold">Contact Info</th>
                                <th className="py-4 px-6 font-semibold">Assigned Room</th>
                                <th className="py-4 px-6 font-semibold">Check-in Date</th>
                                <th className="py-4 px-6 font-semibold">Status</th>
                                <th className="py-4 px-6 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-xs">
                            {filteredGuests.map((guest) => (
                                <tr key={guest.id} className="hover:bg-slate-800/30 transition">
                                    <td className="py-4 px-6 font-bold text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-bold flex items-center justify-center shrink-0">
                                            {guest.name.charAt(0)}
                                        </div>
                                        <span>{guest.name}</span>
                                    </td>
                                    <td className="py-4 px-6 text-slate-300">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-slate-300">
                                                <Mail className="w-3.5 h-3.5 text-slate-500" />
                                                <span>{guest.email}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                                                <Phone className="w-3.5 h-3.5 text-slate-500" />
                                                <span>{guest.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-slate-200 font-medium">{guest.room}</td>
                                    <td className="py-4 px-6 text-slate-400">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                            <span>{guest.checkIn}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${guest.status === "ACTIVE"
                                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                    : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                                                }`}
                                        >
                                            {guest.status === "ACTIVE" ? "IN-HOUSE" : "CHECKED OUT"}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenEdit(guest)}
                                                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition"
                                                title="Edit Guest"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(guest.id)}
                                                className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition"
                                                title="Delete Guest"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Popup */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                            <h3 className="text-base font-bold text-white">
                                {editingGuest ? `Edit Guest: ${editingGuest.name}` : "Add New Guest"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-300">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Abebe Kebede"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-300">Email</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="guest@gmail.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-300">Phone</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="+251 9..."
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-300">Assigned Room</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. 301 (Deluxe)"
                                        value={formData.room}
                                        onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-300">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                status: e.target.value as "ACTIVE" | "CHECKED_OUT",
                                            })
                                        }
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="ACTIVE">In-House (Active)</option>
                                        <option value="CHECKED_OUT">Checked Out</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-3 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition flex items-center gap-1.5"
                                >
                                    <Check className="w-4 h-4" />
                                    <span>{editingGuest ? "Save Changes" : "Register Guest"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}