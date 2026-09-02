// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//     Calendar,
//     BedDouble,
//     Clock,
//     CheckCircle2,
//     XCircle,
//     AlertCircle,
//     Loader2,
//     ArrowRight,
//     DollarSign,
//     CreditCard
// } from "lucide-react";

// interface Room {
//     id: string;
//     roomNumber: string;
//     type: string;
//     pricePerNight: number;
// }

// interface Booking {
//     id: string;
//     roomId: string;
//     checkInDate: string;
//     checkOutDate: string;
//     totalPrice: number;
//     status: "Pending" | "Confirmed" | "Cancelled" | "CheckedIn" | "CheckedOut";
//     room: Room;
// }

// export default function UserDashboard() {
//     const { data: session, status: sessionStatus } = useSession();
//     const router = useRouter();
//     const [bookings, setBookings] = useState<Booking[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [actionId, setActionId] = useState<string | null>(null);

//     const fetchBookings = useCallback(async () => {
//         try {
//             // ከእርስዎ API ራውት ጋር ማስተካከል (예: /api/booking ወይም /api/bookings)
//             const res = await fetch("/api/booking");
//             if (res.ok) {
//                 const data = await res.json();
//                 // ዴታው አርሬይ ሆኖ መምጣቱን ማረጋገጥ
//                 setBookings(Array.isArray(data) ? data : data.bookings || []);
//             }
//         } catch (error) {
//             console.error("Failed to fetch bookings", error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         if (sessionStatus === "unauthenticated") {
//             router.push("/login");
//         }
//         if (sessionStatus === "authenticated") {
//             fetchBookings();
//         }
//     }, [sessionStatus, router, fetchBookings]);

//     // ቡኪንግን መሰረዝ (Cancel Booking)
//     const handleCancel = async (bookingId: string) => {
//         if (!confirm("Are you sure you want to cancel this reservation?")) return;
//         setActionId(bookingId);
//         try {
//             const res = await fetch(`/api/booking/${bookingId}`, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ status: "Cancelled" }),
//             });

//             if (res.ok) {
//                 fetchBookings();
//             } else {
//                 const errText = await res.text();
//                 alert(errText || "Failed to cancel booking");
//             }
//         } catch (error) {
//             console.error(error);
//             alert("An unexpected error occurred.");
//         } finally {
//             setActionId(null);
//         }
//     };

//     // ክፍያውን መቀጠል (Pay Now for Pending Bookings)
//     const handlePayNow = (bookingId: string) => {
//         router.push(`/checkout/${bookingId}`);
//     };

//     const getStatusBadge = (status: Booking["status"]) => {
//         const styles = {
//             Confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
//             Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
//             Cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/20",
//             CheckedIn: "bg-blue-500/10 text-blue-400 border-blue-500/20",
//             CheckedOut: "bg-slate-500/10 text-slate-400 border-slate-500/20",
//         };
//         return (
//             <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.Pending}`}>
//                 {status === "Confirmed" && <CheckCircle2 className="w-3.5 h-3.5" />}
//                 {status === "Cancelled" && <XCircle className="w-3.5 h-3.5" />}
//                 {status === "Pending" && <Clock className="w-3.5 h-3.5" />}
//                 {status}
//             </span>
//         );
//     };

//     if (loading || sessionStatus === "loading") {
//         return (
//             <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 bg-[#070b14] text-slate-100">
//                 <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
//                 <p className="text-slate-400 font-medium text-xs">Loading your dashboard...</p>
//             </div>
//         );
//     }

//     const activeBookingsCount = bookings.filter(b => b.status === "Confirmed" || b.status === "Pending" || b.status === "CheckedIn").length;
//     const totalSpent = bookings.filter(b => b.status !== "Cancelled").reduce((sum, b) => sum + (b.totalPrice || 0), 0);

//     return (
//         <div className="min-h-screen bg-[#070b14] text-slate-100 p-6 sm:p-10">
//             <div className="max-w-7xl mx-auto space-y-8">

//                 {/* Header Banner */}
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
//                     <div>
//                         <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
//                             Welcome back, {session?.user?.name || "Guest"} 👋
//                         </h1>
//                         <p className="text-slate-400 text-xs mt-1">
//                             Manage your hotel reservations, check statuses, and complete payments.
//                         </p>
//                     </div>
//                     <Link
//                         href="/rooms"
//                         className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200"
//                     >
//                         Book New Room
//                         <ArrowRight className="w-4 h-4" />
//                     </Link>
//                 </div>

//                 {/* Stats Summary Cards */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//                     <div className="bg-[#0d1322] border border-slate-800 p-6 rounded-2xl flex items-center gap-4 shadow-xl">
//                         <div className="p-3.5 bg-indigo-600/10 text-indigo-400 rounded-xl border border-indigo-500/20">
//                             <BedDouble className="w-6 h-6" />
//                         </div>
//                         <div>
//                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Reservations</p>
//                             <p className="text-2xl font-bold text-white mt-0.5">{bookings.length}</p>
//                         </div>
//                     </div>

//                     <div className="bg-[#0d1322] border border-slate-800 p-6 rounded-2xl flex items-center gap-4 shadow-xl">
//                         <div className="p-3.5 bg-emerald-600/10 text-emerald-400 rounded-xl border border-emerald-500/20">
//                             <Calendar className="w-6 h-6" />
//                         </div>
//                         <div>
//                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Stays</p>
//                             <p className="text-2xl font-bold text-white mt-0.5">{activeBookingsCount}</p>
//                         </div>
//                     </div>

//                     <div className="bg-[#0d1322] border border-slate-800 p-6 rounded-2xl flex items-center gap-4 shadow-xl">
//                         <div className="p-3.5 bg-purple-600/10 text-purple-400 rounded-xl border border-purple-500/20">
//                             <DollarSign className="w-6 h-6" />
//                         </div>
//                         <div>
//                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Invested</p>
//                             <p className="text-2xl font-bold text-white mt-0.5">ETB {totalSpent.toLocaleString()}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bookings Section */}
//                 {bookings.length === 0 ? (
//                     <div className="text-center py-20 bg-[#0d1322] rounded-3xl border border-dashed border-slate-800">
//                         <BedDouble className="w-12 h-12 text-slate-600 mx-auto mb-3" />
//                         <h3 className="text-base font-bold text-white">No bookings found</h3>
//                         <p className="text-slate-400 text-xs max-w-sm mx-auto mb-6 mt-1">
//                             You haven't made any hotel reservations yet. Explore our luxury rooms and plan your stay.
//                         </p>
//                         <Link
//                             href="/rooms"
//                             className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition"
//                         >
//                             Browse Rooms
//                         </Link>
//                     </div>
//                 ) : (
//                     <div className="bg-[#0d1322] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
//                         <div className="px-6 py-4 border-b border-slate-800 bg-[#131b2e]/50">
//                             <h2 className="font-bold text-slate-200 text-sm uppercase tracking-wider">Your Booking History</h2>
//                         </div>
//                         <div className="overflow-x-auto">
//                             <table className="w-full text-left border-collapse">
//                                 <thead>
//                                     <tr className="border-b border-slate-800 bg-[#131b2e]/30 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
//                                         <th className="px-6 py-4">Room Details</th>
//                                         <th className="px-6 py-4">Stay Dates</th>
//                                         <th className="px-6 py-4">Total Amount</th>
//                                         <th className="px-6 py-4">Status</th>
//                                         <th className="px-6 py-4 text-right">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-slate-800 text-xs">
//                                     {bookings.map((booking) => (
//                                         <tr key={booking.id} className="hover:bg-[#131b2e]/40 transition-colors">
//                                             <td className="px-6 py-4">
//                                                 <div className="font-bold text-white">{booking.room?.type || "Luxury Suite"}</div>
//                                                 <div className="text-[11px] text-slate-400 mt-0.5">Room #{booking.room?.roomNumber || "Standard"}</div>
//                                             </td>

//                                             <td className="px-6 py-4">
//                                                 <div className="text-slate-200 font-medium">
//                                                     {new Date(booking.checkInDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
//                                                 </div>
//                                                 <div className="text-[11px] text-slate-500 mt-0.5">
//                                                     to {new Date(booking.checkOutDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
//                                                 </div>
//                                             </td>

//                                             <td className="px-6 py-4 font-bold text-emerald-400">
//                                                 ETB {booking.totalPrice?.toLocaleString()}
//                                             </td>

//                                             <td className="px-6 py-4">
//                                                 {getStatusBadge(booking.status)}
//                                             </td>

//                                             <td className="px-6 py-4 text-right space-x-2">
//                                                 {booking.status === "Pending" && (
//                                                     <button
//                                                         onClick={() => handlePayNow(booking.id)}
//                                                         className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl transition"
//                                                     >
//                                                         <CreditCard className="w-3.5 h-3.5" />
//                                                         Pay Now
//                                                     </button>
//                                                 )}

//                                                 {(booking.status === "Pending" || booking.status === "Confirmed") ? (
//                                                     <button
//                                                         onClick={() => handleCancel(booking.id)}
//                                                         disabled={actionId === booking.id}
//                                                         className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition disabled:opacity-50"
//                                                     >
//                                                         {actionId === booking.id ? (
//                                                             <Loader2 className="w-3.5 h-3.5 animate-spin" />
//                                                         ) : (
//                                                             <AlertCircle className="w-3.5 h-3.5" />
//                                                         )}
//                                                         Cancel
//                                                     </button>
//                                                 ) : (
//                                                     <span className="text-[11px] text-slate-600 font-medium">No actions</span>
//                                                 )}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// }
"use client";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Calendar,
    BedDouble,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Loader2,
    ArrowRight,
    DollarSign,
    CreditCard,
    Filter
} from "lucide-react";

interface Room {
    id: string;
    roomNumber: string;
    type: string;
    pricePerNight: number;
}

interface Booking {
    id: string;
    roomId: string;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
    status: "Pending" | "Confirmed" | "Cancelled" | "CheckedIn" | "CheckedOut";
    room: Room;
}

export default function UserDashboard() {
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>("All");

    const fetchBookings = useCallback(async () => {
        try {
            const res = await fetch("/api/booking");
            if (res.ok) {
                const data = await res.json();
                setBookings(Array.isArray(data) ? data : data.bookings || []);
            }
        } catch (error) {
            console.error("Failed to fetch bookings", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (sessionStatus === "unauthenticated") {
            router.push("/login");
        }
        if (sessionStatus === "authenticated") {
            fetchBookings();
        }
    }, [sessionStatus, router, fetchBookings]);

    // ቡኪንግን መሰረዝ (Cancel Booking)
    const handleCancel = async (bookingId: string) => {
        if (!confirm("Are you sure you want to cancel this reservation?")) return;
        setActionId(bookingId);
        try {
            const res = await fetch(`/api/booking/${bookingId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Cancelled" }),
            });

            if (res.ok) {
                fetchBookings();
            } else {
                const errText = await res.text();
                alert(errText || "Failed to cancel booking");
            }
        } catch (error) {
            console.error(error);
            alert("An unexpected error occurred.");
        } finally {
            setActionId(null);
        }
    };

    // ክፍያውን መቀጠል
    const handlePayNow = (bookingId: string) => {
        router.push(`/checkout/${bookingId}`);
    };

    const getStatusBadge = (status: Booking["status"]) => {
        const styles = {
            Confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            Cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/20",
            CheckedIn: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            CheckedOut: "bg-slate-500/10 text-slate-400 border-slate-500/20",
        };
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.Pending}`}>
                {status === "Confirmed" && <CheckCircle2 className="w-3.5 h-3.5" />}
                {status === "Cancelled" && <XCircle className="w-3.5 h-3.5" />}
                {status === "Pending" && <Clock className="w-3.5 h-3.5" />}
                {status}
            </span>
        );
    };

    if (loading || sessionStatus === "loading") {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 bg-[#070b14] text-slate-100">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                <p className="text-slate-400 font-medium text-xs">Loading your dashboard...</p>
            </div>
        );
    }

    const activeBookingsCount = bookings.filter(b => b.status === "Confirmed" || b.status === "Pending" || b.status === "CheckedIn").length;
    const totalSpent = bookings.filter(b => b.status !== "Cancelled").reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    // የተጠቃሚውን ስም ከኢሜል (ምሳሌ aster@gmail.com) ቆርጦ ማውጣት ወይም ዩዘርናሙን መጠቀም
    const rawName = session?.user?.name || session?.user?.email || "Guest";
    const displayName = rawName.includes("@") ? rawName.split("@")[0] : rawName;
    const capitalizedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    // Filter bookings based on activeTab
    const filteredBookings = bookings.filter(b => {
        if (activeTab === "All") return true;
        if (activeTab === "Active") return ["Confirmed", "Pending", "CheckedIn"].includes(b.status);
        if (activeTab === "Completed") return b.status === "CheckedOut";
        if (activeTab === "Cancelled") return b.status === "Cancelled";
        return true;
    });

    return (
        <div className="min-h-screen bg-[#070b14] text-slate-100 p-6 sm:p-10">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                            Welcome back, {capitalizedName} 👋
                        </h1>
                        <p className="text-slate-400 text-xs mt-1">
                            Manage your hotel reservations, check statuses, and complete payments.
                        </p>
                    </div>
                    <Link
                        href="/rooms"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200"
                    >
                        Book New Room
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Stats Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-[#0d1322] border border-slate-800 p-6 rounded-2xl flex items-center gap-4 shadow-xl">
                        <div className="p-3.5 bg-indigo-600/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                            <BedDouble className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Reservations</p>
                            <p className="text-2xl font-bold text-white mt-0.5">{bookings.length}</p>
                        </div>
                    </div>

                    <div className="bg-[#0d1322] border border-slate-800 p-6 rounded-2xl flex items-center gap-4 shadow-xl">
                        <div className="p-3.5 bg-emerald-600/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Stays</p>
                            <p className="text-2xl font-bold text-white mt-0.5">{activeBookingsCount}</p>
                        </div>
                    </div>

                    <div className="bg-[#0d1322] border border-slate-800 p-6 rounded-2xl flex items-center gap-4 shadow-xl">
                        <div className="p-3.5 bg-purple-600/10 text-purple-400 rounded-xl border border-purple-500/20">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Invested</p>
                            <p className="text-2xl font-bold text-white mt-0.5">ETB {totalSpent.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                {bookings.length > 0 && (
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-4 overflow-x-auto">
                        <Filter className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                        {["All", "Active", "Completed", "Cancelled"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${activeTab === tab
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                                        : "bg-[#0d1322] text-slate-400 hover:text-white border border-slate-800"
                                    }`}
                            >
                                {tab} Bookings
                            </button>
                        ))}
                    </div>
                )}

                {/* Bookings Section */}
                {filteredBookings.length === 0 ? (
                    <div className="text-center py-20 bg-[#0d1322] rounded-3xl border border-dashed border-slate-800">
                        <BedDouble className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <h3 className="text-base font-bold text-white">No bookings found</h3>
                        <p className="text-slate-400 text-xs max-w-sm mx-auto mb-6 mt-1">
                            {bookings.length === 0
                                ? "You haven't made any hotel reservations yet. Explore our luxury rooms and plan your stay."
                                : `No bookings match the "${activeTab}" filter.`}
                        </p>
                        {bookings.length === 0 && (
                            <Link
                                href="/rooms"
                                className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition"
                            >
                                Browse Rooms
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="bg-[#0d1322] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-800 bg-[#131b2e]/50 flex justify-between items-center">
                            <h2 className="font-bold text-slate-200 text-sm uppercase tracking-wider">Your Booking History</h2>
                            <span className="text-xs text-slate-400">Showing {filteredBookings.length} results</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-800 bg-[#131b2e]/30 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        <th className="px-6 py-4">Room Details</th>
                                        <th className="px-6 py-4">Stay Dates</th>
                                        <th className="px-6 py-4">Total Amount</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800 text-xs">
                                    {filteredBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-[#131b2e]/40 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-white">{booking.room?.type || "Luxury "}</div>
                                                <div className="text-[11px] text-slate-400 mt-0.5">Room #{booking.room?.roomNumber || "Standard"}</div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="text-slate-200 font-medium">
                                                    {new Date(booking.checkInDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                </div>
                                                <div className="text-[11px] text-slate-500 mt-0.5">
                                                    to {new Date(booking.checkOutDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 font-bold text-emerald-400">
                                                ETB {booking.totalPrice?.toLocaleString()}
                                            </td>

                                            <td className="px-6 py-4">
                                                {getStatusBadge(booking.status)}
                                            </td>

                                            <td className="px-6 py-4 text-right space-x-2">
                                                {booking.status === "Pending" && (
                                                    <button
                                                        onClick={() => handlePayNow(booking.id)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl transition cursor-pointer"
                                                    >
                                                        <CreditCard className="w-3.5 h-3.5" />
                                                        Pay Now
                                                    </button>
                                                )}

                                                {(booking.status === "Pending" || booking.status === "Confirmed") ? (
                                                    <button
                                                        onClick={() => handleCancel(booking.id)}
                                                        disabled={actionId === booking.id}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition disabled:opacity-50 cursor-pointer"
                                                    >
                                                        {actionId === booking.id ? (
                                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                        ) : (
                                                            <AlertCircle className="w-3.5 h-3.5" />
                                                        )}
                                                        Cancel
                                                    </button>
                                                ) : (
                                                    <span className="text-[11px] text-slate-600 font-medium">No actions</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}