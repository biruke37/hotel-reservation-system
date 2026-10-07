// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState } from "react";
// import {
//   ShieldCheck,
//   CheckCircle,
//   Upload,
//   Lock,
//   ArrowRight,
//   CreditCard,
//   Smartphone
// } from "lucide-react";
// import { toast } from "sonner";

// export default function ModernPaymentPage() {
//   const searchParams = useSearchParams();

//   const nights = searchParams.get("nights") || "1";
//   const totalPrice = searchParams.get("total") || "0";

//   const [selectedMethod, setSelectedMethod] = useState<"telebirr" | "cbe">("telebirr");
//   const [transactionId, setTransactionId] = useState("");
//   const [receiptImage, setReceiptImage] = useState<File | null>(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const trimmedId = transactionId.trim();

//     // 1. Validate Transaction ID
//     if (!trimmedId) {
//       toast.error("Please enter a valid Transaction ID / FT Number!");
//       return;
//     }

//     // 2. Validate Receipt Image
//     if (!receiptImage) {
//       toast.error("Please upload the payment receipt screenshot!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("transactionId", trimmedId);
//       formData.append("paymentMethod", selectedMethod);
//       formData.append("receipt", receiptImage);
//       formData.append("total", totalPrice);

//       // Example API call
//       // const res = await fetch('/api/payments/submit', { method: 'POST', body: formData });
//       // if (!res.ok) throw new Error("Failed to submit payment");

//       // Simulation delay
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       setLoading(false);
//       setIsSubmitted(true);
//       toast.success("Payment verification submitted successfully!");
//     } catch (error) {
//       setLoading(false);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white flex flex-col items-center justify-center p-6 text-center">
//         <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
//           <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
//             <CheckCircle className="w-10 h-10 text-emerald-400 animate-pulse" />
//           </div>
//           <div className="space-y-2">
//             <h1 className="text-2xl font-extrabold tracking-tight">Payment Received!</h1>
//             <p className="text-xs text-slate-400 leading-relaxed">
//               Your transaction ID and receipt have been securely logged. Your hotel booking will be verified and approved shortly.
//             </p>
//           </div>
//           <button
//             onClick={() => window.location.href = "/"}
//             className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-2xl text-xs transition shadow-lg shadow-indigo-600/30 cursor-pointer"
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 font-sans py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//       <div className="max-w-xl w-full space-y-6">

//         {/* Top Header Card */}
//         <div className="bg-slate-900/70 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
//           <div>
//             <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
//               <Lock className="w-4 h-4 text-indigo-400" /> Secure Payment Checkout
//             </h1>
//             <p className="text-xs text-slate-400 mt-1">
//               Stay Duration: <span className="text-indigo-400 font-bold">{nights} Night(s)</span>
//             </p>
//           </div>

//           <div className="bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-2xl text-right">
//             <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Amount</span>
//             <span className="text-lg font-black text-emerald-400">{Number(totalPrice).toLocaleString()} ETB</span>
//           </div>
//         </div>

//         {/* Main Content Card */}
//         <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">

//           {/* Payment Method Selector */}
//           <div className="space-y-3">
//             <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
//               Select Payment Method
//             </label>
//             <div className="grid grid-cols-2 gap-3">

//               {/* Telebirr Button */}
//               <button
//                 type="button"
//                 onClick={() => setSelectedMethod("telebirr")}
//                 className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer ${selectedMethod === "telebirr"
//                     ? "bg-gradient-to-r from-emerald-600/20 to-teal-600/10 border-emerald-500 text-white shadow-lg shadow-emerald-600/10 scale-[1.02]"
//                     : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
//                   }`}
//               >
//                 <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${selectedMethod === "telebirr" ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-400"
//                   }`}>
//                   <Smartphone className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <div className="text-xs font-bold text-white">Telebirr</div>
//                   <div className="text-[10px] text-emerald-400 font-medium">Merchant / Send Money</div>
//                 </div>
//               </button>

//               {/* CBE Button */}
//               <button
//                 type="button"
//                 onClick={() => setSelectedMethod("cbe")}
//                 className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer ${selectedMethod === "cbe"
//                     ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/10 border-purple-500 text-white shadow-lg shadow-purple-600/10 scale-[1.02]"
//                     : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
//                   }`}
//               >
//                 <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${selectedMethod === "cbe" ? "bg-purple-500/20 border-purple-500/40 text-purple-300" : "bg-slate-900 border-slate-800 text-slate-400"
//                   }`}>
//                   <CreditCard className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <div className="text-xs font-bold text-white">CBE Bank</div>
//                   <div className="text-[10px] text-purple-400 font-medium">Commercial Bank</div>
//                 </div>
//               </button>

//             </div>
//           </div>

//           {/* Account Details Box */}
//           <div className={`border rounded-2xl p-5 space-y-2 relative overflow-hidden transition-all duration-500 ${selectedMethod === "telebirr"
//               ? "bg-emerald-950/20 border-emerald-500/30 shadow-lg shadow-emerald-950/50"
//               : "bg-purple-950/20 border-purple-500/30 shadow-lg shadow-purple-950/50"
//             }`}>
//             <div className="flex justify-between items-center text-[11px] font-semibold uppercase tracking-wider">
//               <span className={selectedMethod === "telebirr" ? "text-emerald-400" : "text-purple-400"}>
//                 {selectedMethod === "telebirr" ? "Telebirr Merchant Account" : "CBE Bank Account"}
//               </span>
//               <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-slate-300 border border-slate-800">
//                 Account Number
//               </span>
//             </div>

//             <div className="flex items-baseline justify-between pt-1">
//               <div>
//                 <div className="text-2xl font-black text-white tracking-widest font-mono">
//                   {selectedMethod === "telebirr" ? "0946309932" : "1000123456789"}
//                 </div>
//                 <div className="text-[11px] text-slate-400 mt-0.5">
//                   Account Name: <span className="text-slate-200 font-semibold">Hotel Reservation System</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Form Section */}
//           <form onSubmit={handleSubmit} className="space-y-5">

//             {/* Transaction ID Input */}
//             <div>
//               <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
//                 <span>Transaction ID / FT Number <span className="text-rose-500">*</span></span>
//                 <span className="text-[10px] text-indigo-400 normal-case">e.g., FTR9XYZ...</span>
//               </label>
//               <input
//                 type="text"
//                 value={transactionId}
//                 onChange={(e) => setTransactionId(e.target.value)}
//                 placeholder="Enter your bank or telebirr transaction reference number..."
//                 className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition shadow-inner uppercase tracking-wider font-mono"
//               />
//             </div>

//             {/* File Upload Box */}
//             <div>
//               <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
//                 Receipt Screenshot <span className="text-rose-500">*</span>
//               </label>
//               <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-all group ${receiptImage ? "border-emerald-500/60 bg-emerald-500/5" : "border-slate-800 hover:border-indigo-500/50 bg-slate-950/40"
//                 }`}>
//                 <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all mb-2 ${receiptImage ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" : "bg-slate-900 border-slate-800 text-slate-400 group-hover:text-indigo-400 group-hover:scale-110"
//                   }`}>
//                   <Upload className="w-5 h-5" />
//                 </div>
//                 <span className={`text-xs font-semibold ${receiptImage ? "text-emerald-300" : "text-slate-300"}`}>
//                   {receiptImage ? `✓ Attached: ${receiptImage.name}` : "Click to upload receipt or drag and drop file here"}
//                 </span>
//                 <span className="text-[10px] text-slate-500 mt-1">PNG, JPG up to 10MB</span>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => {
//                     if (e.target.files && e.target.files[0]) {
//                       setReceiptImage(e.target.files[0]);
//                       toast.success("Receipt attached successfully!");
//                     }
//                   }}
//                 />
//               </label>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-bold py-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/25 transition-all cursor-pointer active:scale-98"
//             >
//               {loading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   <span>Submitting Payment...</span>
//                 </div>
//               ) : (
//                 <>
//                   <span>Submit Payment</span>
//                   <ArrowRight className="w-4 h-4" />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Security Banner */}
//           <div className="flex items-center gap-3 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">
//             <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-400" />
//             <span>Secured encryption. Your booking will be confirmed immediately after transaction verification.</span>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";

async function approveBooking(formData: FormData) {
  "use server";
  const bookingId = formData.get("bookingId") as string;

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "APPROVED" as any },
  });

  revalidatePath("/admin/payments");
}

export default async function AdminPaymentsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      user: true,
      room: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Payment Approvals & Receipts</h1>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase bg-slate-950/50">
              <th className="p-4">User</th>
              <th className="p-4">Room</th>
              <th className="p-4">Transaction / FT</th>
              <th className="p-4">Receipt</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-slate-500">
                  No payment records found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => {
                const statusStr = String(booking.status);
                return (
                  <tr key={booking.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition">
                    <td className="p-4">
                      <p className="font-medium text-slate-200">{booking.user?.name || "N/A"}</p>
                      <p className="text-xs text-slate-400">{booking.user?.email}</p>
                    </td>
                    <td className="p-4 text-slate-300">Room #{booking.room?.roomNumber || "N/A"}</td>
                    <td className="p-4 font-mono text-amber-400">
                      {(booking as any).ftNumber || (booking as any).paymentReference || "N/A"}
                    </td>
                    <td className="p-4">
                      {(booking as any).receiptUrl || (booking as any).receipt ? (
                        <a
                          href={(booking as any).receiptUrl || (booking as any).receipt}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline text-sm hover:text-blue-300 font-medium"
                        >
                          View Receipt
                        </a>
                      ) : (
                        <span className="text-slate-500 text-sm">No Receipt</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusStr === "APPROVED"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}>
                        {statusStr}
                      </span>
                    </td>
                    <td className="p-4">
                      {statusStr !== "APPROVED" && (
                        <form action={approveBooking}>
                          <input type="hidden" name="bookingId" value={booking.id} />
                          <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shadow-md"
                          >
                            Approve
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}