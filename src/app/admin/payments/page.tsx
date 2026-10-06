// "use client";

// import { useState } from "react";
// import {
//     CreditCard,
//     Search,
//     Download,
//     DollarSign,
//     Clock,
//     XCircle,
//     Sparkles,
//     Plus,
//     X,
//     FileText
// } from "lucide-react";

// interface Payment {
//     id: string;
//     transactionId: string;
//     guestName: string;
//     room: string;
//     amount: string;
//     method: "Chapa" | "Telebirr" | "Credit Card" | "Cash"| "CBE";
//     status: "COMPLETED" | "PENDING" | "REFUNDED";
//     date: string;
// }

// const initialPayments: Payment[] = [
//     {
//         id: "1",
//         transactionId: "TXN-88421",
//         guestName: "Abebe Kebede",
//         room: "301 (Deluxe Suite)",
//         amount: "450.00",
//         method: "Chapa",
//         status: "COMPLETED",
//         date: "Aug 18, 2026 - 10:30 AM",
//     },
//     {
//         id: "2",
//         transactionId: "TXN-88422",
//         guestName: "Sara Tadesse",
//         room: "204 (Executive)",
//         amount: "280.00",
//         method: "Telebirr",
//         status: "PENDING",
//         date: "Aug 19, 2026 - 08:15 AM",
//     },
// ];

// export default function AdminPaymentsPage() {
//     const [payments, setPayments] = useState<Payment[]>(initialPayments);
//     const [search, setSearch] = useState("");
//     const [statusFilter, setStatusFilter] = useState("ALL");
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // New Payment Form State
//     const [newPayment, setNewPayment] = useState({
//         guestName: "",
//         room: "",
//         amount: "",
//         method: "Cash" as Payment["method"],
//         status: "COMPLETED" as Payment["status"],
//     });

//     // Handle Adding Manual Payment
//     const handleAddPayment = (e: React.FormEvent) => {
//         e.preventDefault();
//         const created: Payment = {
//             id: Date.now().toString(),
//             transactionId: `TXN-MANUAL-${Math.floor(1000 + Math.random() * 9000)}`,
//             guestName: newPayment.guestName,
//             room: newPayment.room,
//             amount: parseFloat(newPayment.amount).toFixed(2),
//             method: newPayment.method,
//             status: newPayment.status,
//             date: new Date().toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//                 year: "numeric",
//             }) + " - " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         };

//         setPayments([created, ...payments]);
//         setIsModalOpen(false);
//         setNewPayment({ guestName: "", room: "", amount: "", method: "Cash", status: "COMPLETED" });
//     };

//     const filteredPayments = payments.filter((payment) => {
//         const matchesSearch =
//             payment.guestName.toLowerCase().includes(search.toLowerCase()) ||
//             payment.transactionId.toLowerCase().includes(search.toLowerCase()) ||
//             payment.method.toLowerCase().includes(search.toLowerCase());
//         const matchesStatus =
//             statusFilter === "ALL" || payment.status === statusFilter;
//         return matchesSearch && matchesStatus;
//     });

//     return (
//         <div className="space-y-6">
//             {/* Top Banner */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d1322] border border-slate-800/80 p-6 rounded-2xl shadow-xl">
//                 <div>
//                     <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
//                         <Sparkles className="w-4 h-4" />
//                         <span>Financial Transactions</span>
//                     </div>
//                     <h1 className="text-xl font-black text-white tracking-wide">
//                         Payments & Transactions
//                     </h1>
//                     <p className="text-xs text-slate-400 mt-1">
//                         Online and Physically (Manual/Cash) payments this manage and register::
//                     </p>
//                 </div>

//                 <div className="flex items-center gap-3">
//                     <button
//                         onClick={() => setIsModalOpen(true)}
//                         className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition active:scale-95 shrink-0"
//                     >
//                         <Plus className="w-4 h-4" />
//                         <span>Record Payment</span>
//                     </button>
//                     <button
//                         onClick={() => alert("payment report download!")}
//                         className="flex items-center justify-center gap-2 bg-[#131b2e] hover:bg-slate-800 text-slate-300 border border-slate-800/80 px-4 py-2.5 rounded-xl text-xs font-bold transition shrink-0"
//                     >
//                         <Download className="w-4 h-4" />
//                         <span>Export</span>
//                     </button>
//                 </div>
//             </div>
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//                 <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between">
//                     <div>
//                         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Revenue</p>
//                         <h3 className="text-2xl font-black text-emerald-400 mt-1">
//                             ${payments.reduce((sum, p) => p.status === "COMPLETED" ? sum + parseFloat(p.amount) : sum, 0).toFixed(2)}
//                         </h3>
//                     </div>
//                     <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
//                         <DollarSign className="w-5 h-5" />
//                     </div>
//                 </div>

//                 <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between">
//                     <div>
//                         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending</p>
//                         <h3 className="text-2xl font-black text-amber-400 mt-1">
//                             ${payments.reduce((sum, p) => p.status === "PENDING" ? sum + parseFloat(p.amount) : sum, 0).toFixed(2)}
//                         </h3>
//                     </div>
//                     <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
//                         <Clock className="w-5 h-5" />
//                     </div>
//                 </div>

//                 <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between">
//                     <div>
//                         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Transactions</p>
//                         <h3 className="text-2xl font-black text-indigo-400 mt-1">{payments.length}</h3>
//                     </div>
//                     <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
//                         <CreditCard className="w-5 h-5" />
//                     </div>
//                 </div>
//             </div>

//             {/* Search and Filters */}
//             <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0d1322] border border-slate-800/80 p-4 rounded-2xl">
//                 <div className="relative w-full md:w-80">
//                     <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
//                     <input
//                         type="text"
//                         placeholder="Search guest, TXN ID or method..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition"
//                     />
//                 </div>

//                 <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
//                     {["ALL", "COMPLETED", "PENDING", "REFUNDED"].map((st) => (
//                         <button
//                             key={st}
//                             onClick={() => setStatusFilter(st)}
//                             className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${statusFilter === st
//                                 ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
//                                 : "bg-[#131b2e] text-slate-400 hover:text-white border border-slate-800/80"
//                                 }`}
//                         >
//                             {st}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="border-b border-slate-800/80 bg-[#111827]/50 text-[11px] uppercase tracking-wider text-slate-400">
//                                 <th className="py-4 px-6 font-semibold">Transaction ID</th>
//                                 <th className="py-4 px-6 font-semibold">Guest & Room</th>
//                                 <th className="py-4 px-6 font-semibold">Amount</th>
//                                 <th className="py-4 px-6 font-semibold">Payment Method</th>
//                                 <th className="py-4 px-6 font-semibold">Date & Time</th>
//                                 <th className="py-4 px-6 font-semibold">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-800/60 text-xs">
//                             {filteredPayments.map((item) => (
//                                 <tr key={item.id} className="hover:bg-slate-800/30 transition">
//                                     <td className="py-4 px-6 font-mono font-bold text-indigo-400">
//                                         {item.transactionId}
//                                     </td>
//                                     <td className="py-4 px-6">
//                                         <p className="font-bold text-white">{item.guestName}</p>
//                                         <p className="text-[11px] text-slate-400 mt-0.5">{item.room}</p>
//                                     </td>
//                                     <td className="py-4 px-6 font-black text-white text-sm">
//                                         ${item.amount}
//                                     </td>
//                                     <td className="py-4 px-6">
//                                         <span className="px-2.5 py-1 rounded-lg bg-[#131b2e] border border-slate-800/80 text-slate-300 font-semibold text-[11px]">
//                                             {item.method}
//                                         </span>
//                                     </td>
//                                     <td className="py-4 px-6 text-slate-400 text-[11px]">
//                                         {item.date}
//                                     </td>
//                                     <td className="py-4 px-6">
//                                         <span
//                                             className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${item.status === "COMPLETED"
//                                                 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
//                                                 : item.status === "PENDING"
//                                                     ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
//                                                     : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
//                                                 }`}
//                                         >
//                                             {item.status}
//                                         </span>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Modal for Manual Payment Entry */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
//                     <div className="bg-[#0d1322] border border-slate-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative">
//                         <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
//                             <h3 className="text-sm font-bold text-white">Record Manual Payment</h3>
//                             <button
//                                 onClick={() => setIsModalOpen(false)}
//                                 className="text-slate-400 hover:text-white transition"
//                             >
//                                 <X className="w-5 h-5" />
//                             </button>
//                         </div>

//                         <form onSubmit={handleAddPayment} className="space-y-4 text-xs">
//                             <div className="space-y-1">
//                                 <label className="text-slate-300 font-semibold">Guest Name</label>
//                                 <input
//                                     type="text"
//                                     required
//                                     placeholder="e.g. Alamu Bekele"
//                                     value={newPayment.guestName}
//                                     onChange={(e) => setNewPayment({ ...newPayment, guestName: e.target.value })}
//                                     className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
//                                 />
//                             </div>

//                             <div className="space-y-1">
//                                 <label className="text-slate-300 font-semibold">Room No / Type</label>
//                                 <input
//                                     type="text"
//                                     required
//                                     placeholder="e.g. 102 (Standard)"
//                                     value={newPayment.room}
//                                     onChange={(e) => setNewPayment({ ...newPayment, room: e.target.value })}
//                                     className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
//                                 />
//                             </div>

//                             <div className="grid grid-cols-2 gap-3">
//                                 <div className="space-y-1">
//                                     <label className="text-slate-300 font-semibold">Amount ($)</label>
//                                     <input
//                                         type="number"
//                                         required
//                                         placeholder="250.00"
//                                         value={newPayment.amount}
//                                         onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
//                                         className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
//                                     />
//                                 </div>

//                                 <div className="space-y-1">
//                                     <label className="text-slate-300 font-semibold">Method</label>
//                                     <select
//                                         value={newPayment.method}
//                                         onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value as any })}
//                                         className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
//                                     > 
//                                         <option value="Cbe">CBE</option>
//                                         <option value="Cash">Cash</option>
//                                         <option value="Telebirr">Telebirr</option>
//                                         <option value="Chapa">Chapa</option>
//                                         <option value="Credit Card">Credit Card</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             <div className="pt-2 flex items-center justify-end gap-2">
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsModalOpen(false)}
//                                     className="px-4 py-2 rounded-xl text-slate-400 hover:text-white transition"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-bold shadow-lg shadow-indigo-600/30 transition"
//                                 >
//                                     Save Transaction
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
"use client";

import React, { useState, useEffect } from "react";
import { Loader2, CheckCircle2, XCircle, Clock, CreditCard } from "lucide-react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("ALL"); // ALL, PENDING_VERIFICATION, CONFIRMED, REJECTED

  // Fetch bookings/payments from API
  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/admin/payments");
      const data = await res.json();
      if (data.success) {
        setPayments(data.payments);
      }
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Handle Approve / Reject action
  const handleAction = async (bookingId: string, action: "APPROVE" | "REJECT") => {
    try {
      const res = await fetch(`/api/admin/payments/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh the list
        fetchPayments();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Action error:", error);
    }
  };

  // Filter payments based on tabs
  const filteredPayments = payments.filter((item) => {
    if (filter === "ALL") return true;
    return item.status === filter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a]">
        <Loader2 className="w-8 h-8 animate-spin text-[#c59a5b]" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#080d1a] min-h-screen text-white font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-serif font-bold">Payments & Transactions</h1>
          <p className="text-sm text-gray-400">Manage manual bank transfers (CBE & Telebirr) and approvals.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 border-b border-gray-800 pb-4">
          {["ALL", "PENDING_VERIFICATION", "CONFIRMED", "REJECTED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                filter === tab
                  ? "bg-[#c59a5b] text-black font-bold"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-gray-400 uppercase bg-gray-900/80">
                <th className="p-4">Transaction Ref</th>
                <th className="p-4">Guest & Hotel</th>
                <th className="p-4">Method</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-900/40 transition-colors">
                    <td className="p-4 font-mono text-[#c59a5b]">
                      {item.transactionRef || "N/A"}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-white">{item.hotelName}</div>
                      <div className="text-xs text-gray-400">{item.roomType} • {item.nights} nights</div>
                    </td>
                    <td className="p-4 uppercase text-xs font-semibold text-gray-300">
                      {item.paymentMethod || "N/A"}
                    </td>
                    <td className="p-4 font-bold text-white">
                      {item.amount?.toLocaleString()} ETB
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === "CONFIRMED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : item.status === "REJECTED"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {item.status === "PENDING_VERIFICATION" ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleAction(item.id, "APPROVE")}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => handleAction(item.id, "REJECT")}
                            className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500 italic">Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}