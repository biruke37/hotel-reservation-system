"use client";

import { useState } from "react";
import {
    CreditCard,
    Search,
    Download,
    DollarSign,
    Clock,
    XCircle,
    Sparkles,
    Plus,
    X,
    FileText
} from "lucide-react";

interface Payment {
    id: string;
    transactionId: string;
    guestName: string;
    room: string;
    amount: string;
    method: "Chapa" | "Telebirr" | "Credit Card" | "Cash"| "CBE";
    status: "COMPLETED" | "PENDING" | "REFUNDED";
    date: string;
}

const initialPayments: Payment[] = [
    {
        id: "1",
        transactionId: "TXN-88421",
        guestName: "Abebe Kebede",
        room: "301 (Deluxe Suite)",
        amount: "450.00",
        method: "Chapa",
        status: "COMPLETED",
        date: "Aug 18, 2026 - 10:30 AM",
    },
    {
        id: "2",
        transactionId: "TXN-88422",
        guestName: "Sara Tadesse",
        room: "204 (Executive)",
        amount: "280.00",
        method: "Telebirr",
        status: "PENDING",
        date: "Aug 19, 2026 - 08:15 AM",
    },
];

export default function AdminPaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>(initialPayments);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // New Payment Form State
    const [newPayment, setNewPayment] = useState({
        guestName: "",
        room: "",
        amount: "",
        method: "Cash" as Payment["method"],
        status: "COMPLETED" as Payment["status"],
    });

    // Handle Adding Manual Payment
    const handleAddPayment = (e: React.FormEvent) => {
        e.preventDefault();
        const created: Payment = {
            id: Date.now().toString(),
            transactionId: `TXN-MANUAL-${Math.floor(1000 + Math.random() * 9000)}`,
            guestName: newPayment.guestName,
            room: newPayment.room,
            amount: parseFloat(newPayment.amount).toFixed(2),
            method: newPayment.method,
            status: newPayment.status,
            date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }) + " - " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setPayments([created, ...payments]);
        setIsModalOpen(false);
        setNewPayment({ guestName: "", room: "", amount: "", method: "Cash", status: "COMPLETED" });
    };

    const filteredPayments = payments.filter((payment) => {
        const matchesSearch =
            payment.guestName.toLowerCase().includes(search.toLowerCase()) ||
            payment.transactionId.toLowerCase().includes(search.toLowerCase()) ||
            payment.method.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === "ALL" || payment.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Top Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d1322] border border-slate-800/80 p-6 rounded-2xl shadow-xl">
                <div>
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
                        <Sparkles className="w-4 h-4" />
                        <span>Financial Transactions</span>
                    </div>
                    <h1 className="text-xl font-black text-white tracking-wide">
                        Payments & Transactions
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Online and Physically (Manual/Cash) payments this manage and register::
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition active:scale-95 shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Record Payment</span>
                    </button>
                    <button
                        onClick={() => alert("payment report download!")}
                        className="flex items-center justify-center gap-2 bg-[#131b2e] hover:bg-slate-800 text-slate-300 border border-slate-800/80 px-4 py-2.5 rounded-xl text-xs font-bold transition shrink-0"
                    >
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                    </button>
                </div>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Revenue</p>
                        <h3 className="text-2xl font-black text-emerald-400 mt-1">
                            ${payments.reduce((sum, p) => p.status === "COMPLETED" ? sum + parseFloat(p.amount) : sum, 0).toFixed(2)}
                        </h3>
                    </div>
                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                        <DollarSign className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending</p>
                        <h3 className="text-2xl font-black text-amber-400 mt-1">
                            ${payments.reduce((sum, p) => p.status === "PENDING" ? sum + parseFloat(p.amount) : sum, 0).toFixed(2)}
                        </h3>
                    </div>
                    <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                        <Clock className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Transactions</p>
                        <h3 className="text-2xl font-black text-indigo-400 mt-1">{payments.length}</h3>
                    </div>
                    <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                        <CreditCard className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0d1322] border border-slate-800/80 p-4 rounded-2xl">
                <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search guest, TXN ID or method..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                    {["ALL", "COMPLETED", "PENDING", "REFUNDED"].map((st) => (
                        <button
                            key={st}
                            onClick={() => setStatusFilter(st)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${statusFilter === st
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                                : "bg-[#131b2e] text-slate-400 hover:text-white border border-slate-800/80"
                                }`}
                        >
                            {st}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800/80 bg-[#111827]/50 text-[11px] uppercase tracking-wider text-slate-400">
                                <th className="py-4 px-6 font-semibold">Transaction ID</th>
                                <th className="py-4 px-6 font-semibold">Guest & Room</th>
                                <th className="py-4 px-6 font-semibold">Amount</th>
                                <th className="py-4 px-6 font-semibold">Payment Method</th>
                                <th className="py-4 px-6 font-semibold">Date & Time</th>
                                <th className="py-4 px-6 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-xs">
                            {filteredPayments.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-800/30 transition">
                                    <td className="py-4 px-6 font-mono font-bold text-indigo-400">
                                        {item.transactionId}
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="font-bold text-white">{item.guestName}</p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">{item.room}</p>
                                    </td>
                                    <td className="py-4 px-6 font-black text-white text-sm">
                                        ${item.amount}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="px-2.5 py-1 rounded-lg bg-[#131b2e] border border-slate-800/80 text-slate-300 font-semibold text-[11px]">
                                            {item.method}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-slate-400 text-[11px]">
                                        {item.date}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${item.status === "COMPLETED"
                                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                : item.status === "PENDING"
                                                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Manual Payment Entry */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#0d1322] border border-slate-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                            <h3 className="text-sm font-bold text-white">Record Manual Payment</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-white transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddPayment} className="space-y-4 text-xs">
                            <div className="space-y-1">
                                <label className="text-slate-300 font-semibold">Guest Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Alamu Bekele"
                                    value={newPayment.guestName}
                                    onChange={(e) => setNewPayment({ ...newPayment, guestName: e.target.value })}
                                    className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-slate-300 font-semibold">Room No / Type</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. 102 (Standard)"
                                    value={newPayment.room}
                                    onChange={(e) => setNewPayment({ ...newPayment, room: e.target.value })}
                                    className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-slate-300 font-semibold">Amount ($)</label>
                                    <input
                                        type="number"
                                        required
                                        placeholder="250.00"
                                        value={newPayment.amount}
                                        onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-slate-300 font-semibold">Method</label>
                                    <select
                                        value={newPayment.method}
                                        onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value as any })}
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
                                    > 
                                        <option value="Cbe">CBE</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Telebirr">Telebirr</option>
                                        <option value="Chapa">Chapa</option>
                                        <option value="Credit Card">Credit Card</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-bold shadow-lg shadow-indigo-600/30 transition"
                                >
                                    Save Transaction
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
