"use client";

import { DollarSign, CreditCard, CheckCircle2, XCircle, Search, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface Booking {
  id: string;
  userId: string;
  roomId: string;
  hotelName: string;
  nights: number;
  amount: number;
  status: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
    role: string;
  };
  room: {
    id: string;
    roomNumber: string;
    type: string;
    pricePerNight: number;
  };
}

interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  totalAmount: number;
}

export default function AdminPaymentsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [error, setError] = useState<string | null>(null);

  // Fetch bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const url = new URL("/api/admin/payments", window.location.origin);
        if (statusFilter !== "ALL") url.searchParams.set("status", statusFilter);
        if (searchQuery) url.searchParams.set("search", searchQuery);

        const response = await fetch(url.toString());
        const data = await response.json();

        if (data.success) {
          setBookings(data.data.bookings);
          setStats(data.data.stats);
        } else {
          setError(data.message || "Failed to fetch bookings");
        }
      } catch (err) {
        setError("Failed to connect to server");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [statusFilter, searchQuery]);

  // Filter Logic
  const filteredBookings = bookings.filter((booking) => {
    const statusStr = String(booking.status);
    const matchesStatus = statusFilter === "ALL" || statusStr === statusFilter || (statusFilter === "PENDING" && (statusStr === "PENDING_PAYMENT" || statusStr === "PENDING_APPROVAL"));
    const matchesSearch =
      (booking.user?.name && booking.user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (booking.user?.email && booking.user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (booking.room?.roomNumber && booking.room.roomNumber.includes(searchQuery));
    return matchesStatus && matchesSearch;
  });

  // Handle approve booking
  const handleApprove = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/admin/payments/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CONFIRMED" }),
      });
      const data = await response.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: "CONFIRMED" } : b))
        );
        // Update stats
        setStats((prev) => ({
          ...prev,
          pending: prev.pending - 1,
          approved: prev.approved + 1,
        }));
      }
    } catch (err) {
      console.error("Approve error:", err);
      setError("Failed to approve booking");
    }
  };

  // Handle reject booking
  const handleReject = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/admin/payments/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "REJECTED" }),
      });
      const data = await response.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: "REJECTED" } : b))
        );
        // Update stats
        setStats((prev) => ({
          ...prev,
          pending: prev.pending - 1,
          rejected: prev.rejected + 1,
        }));
      }
    } catch (err) {
      console.error("Reject error:", err);
      setError("Failed to reject booking");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d1322] border border-slate-800/80 p-6 rounded-2xl shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
            <DollarSign className="w-4 h-4" />
            <span>Payment Management System</span>
          </div>
          <h1 className="text-xl font-black text-white tracking-wide">Payment Approvals</h1>
          <p className="text-xs text-slate-400 mt-1">Review and approve payment receipts</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-400">Total Payments</span>
          </div>
          <p className="text-2xl font-black text-white">{stats.total}</p>
          <p className="text-[10px] text-slate-500 mt-1">All payment requests</p>
        </div>

        <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 hover:border-amber-500/40 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-400">Pending</span>
          </div>
          <p className="text-2xl font-black text-white">{stats.pending}</p>
          <p className="text-[10px] text-slate-500 mt-1">Awaiting review</p>
        </div>

        <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-400">Approved</span>
          </div>
          <p className="text-2xl font-black text-white">{stats.approved}</p>
          <p className="text-[10px] text-slate-500 mt-1">Approved payments</p>
        </div>

        <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 hover:border-rose-500/40 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
              <XCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-400">Rejected</span>
          </div>
          <p className="text-2xl font-black text-white">{stats.rejected}</p>
          <p className="text-[10px] text-slate-500 mt-1">Rejected payments</p>
        </div>

        <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-400">Total Amount</span>
          </div>
          <p className="text-2xl font-black text-white">${stats.totalAmount.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 mt-1">Approved payments total</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by user, room, or transaction..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d1322] border border-slate-800/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {["ALL", "PENDING_PAYMENT", "PENDING_APPROVAL", "CONFIRMED", "REJECTED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${statusFilter === st
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-[#0d1322] text-slate-400 hover:text-white hover:bg-slate-800/50 border border-slate-800/80"
                }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
            <h3 className="text-base font-bold text-white">Loading payments...</h3>
            <p className="text-xs text-slate-400 mt-1">Please wait while we fetch the data</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="text-base font-bold text-white">Error</h3>
            <p className="text-xs text-rose-400 mt-1">{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-[#111827]/50 text-[11px] uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-6 font-semibold">Booking</th>
                  <th className="py-4 px-6 font-semibold">User</th>
                  <th className="py-4 px-6 font-semibold">Room</th>
                  <th className="py-4 px-6 font-semibold">Amount</th>
                  <th className="py-4 px-6 font-semibold">Transaction</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center">
                      <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-500" />
                      </div>
                      <h3 className="text-base font-bold text-white">No payments found</h3>
                      <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => {
                    const statusStr = String(booking.status);
                    return (
                      <tr key={booking.id} className="hover:bg-slate-800/30 transition-all duration-200 group">
                        <td className="py-4 px-6">
                          <div className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-lg border border-indigo-500/20">
                            {booking.id}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                              {booking.user?.name ? booking.user.name.charAt(0).toUpperCase() : "U"}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                                {booking.user?.name || "N/A"}
                              </p>
                              <p className="text-[10px] text-slate-500">{booking.user?.email || "N/A"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-xs text-slate-300">Room #{booking.room?.roomNumber || "N/A"}</p>
                          <p className="text-[10px] text-slate-500">
                            {booking.nights} night{booking.nights > 1 ? 's' : ''}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-xs font-bold text-white">${Number(booking.amount || 0).toLocaleString()}</p>
                          <p className="text-[10px] text-slate-500">
                            Total
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-xs text-slate-300 font-mono">
                            {(booking as any).paymentReference || (booking as any).transactionId || "N/A"}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {(booking as any).paymentMethod || "N/A"}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${statusStr === 'CONFIRMED'
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : statusStr === 'PENDING_PAYMENT' || statusStr === 'PENDING_APPROVAL'
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : statusStr === 'REJECTED'
                                ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                            }`}>
                            {statusStr}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          {statusStr === "PENDING_PAYMENT" || statusStr === "PENDING_APPROVAL" ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleApprove(booking.id)}
                                className="p-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-lg transition-all"
                                title="Approve Payment"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleReject(booking.id)}
                                className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-all"
                                title="Reject Payment"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          ) : statusStr === "CONFIRMED" ? (
                            <span className="text-xs text-emerald-400 font-medium px-3 py-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                              Verified
                            </span>
                          ) : statusStr === "REJECTED" ? (
                            <span className="text-xs text-rose-400 font-medium px-3 py-1.5 bg-rose-500/10 rounded-lg border border-rose-500/20">
                              Rejected
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}