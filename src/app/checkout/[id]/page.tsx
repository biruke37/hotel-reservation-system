
// // "use client";

// // import { useEffect, useState } from "react";
// // import { useSession } from "next-auth/react";
// // import { useRouter } from "next/navigation";
// // import { Loader2, ShieldCheck, Smartphone, CreditCard, Building2 } from "lucide-react";

// // interface CheckoutProps {
// //     params: {
// //         id: string;
// //     };
// // }

// // export default function CheckoutPage({ params }: CheckoutProps) {
// //     const [bookingId, setBookingId] = useState<string>("");

// //     useEffect(() => {
// //         if (params?.id) {
// //             setBookingId(params.id);
// //         }
// //     }, [params]);

// //     const { data: session } = useSession();
// //     const router = useRouter();

// //     const [isProcessing, setIsProcessing] = useState(false);
// //     const [errorMessage, setErrorMessage] = useState("");
// //     const [paymentMethod, setPaymentMethod] = useState("telebirr"); // telebirr, cbe, chapa

// //     const [bookingDetails, setBookingDetails] = useState({
// //         roomType: "single",
// //         roomNumber: "101",
// //         checkInDate: "2026-09-10",
// //         checkOutDate: "2026-09-13",
// //         grandTotal: 1500,
// //     });

// //     const [firstName, setFirstName] = useState("");
// //     const [lastName, setLastName] = useState("");
// //     const [email, setEmail] = useState("");
// //     const [phone, setPhone] = useState("");

// //     // ዩዘሩ ሎጊን አድርጎ ከሆነ ስሙን እና ኢሜይሉን በአግባቡ መሙላት
// //     useEffect(() => {
// //         if (session?.user) {
// //             const rawName = session.user.name || session.user.email || "";

// //             if (rawName.includes("@")) {
// //                 const nameFromEmail = rawName.split("@")[0];
// //                 setFirstName(nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1));
// //                 setLastName("Guest");
// //             } else {
// //                 const nameParts = rawName.split(" ");
// //                 setFirstName(nameParts[0] || "");
// //                 setLastName(nameParts.slice(1).join(" ") || "Guest");
// //             }

// //             setEmail(session.user.email || "");
// //         }
// //     }, [session]);

// //     // የቡኪንግ መረጃዎችን ከባክኤንድ ማምጣት
// //     useEffect(() => {
// //         async function fetchBookingData(id: string) {
// //             try {
// //                 const res = await fetch(`/api/booking/${id}`);
// //                 if (res.ok) {
// //                     const data = await res.json();
// //                     setBookingDetails({
// //                         roomType: data.room?.type || "single",
// //                         roomNumber: data.room?.roomNumber || "101",
// //                         checkInDate: data.checkInDate ? data.checkInDate.split("T")[0] : "2026-09-10",
// //                         checkOutDate: data.checkOutDate ? data.checkOutDate.split("T")[0] : "2026-09-13",
// //                         grandTotal: data.totalPrice || 1500,
// //                     });
// //                 }
// //             } catch (error) {
// //                 console.error("Failed to load booking details", error);
// //             }
// //         }
// //         if (bookingId) {
// //             fetchBookingData(bookingId);
// //         }
// //     }, [bookingId]);

// //     const handleCheckout = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setIsProcessing(true);
// //         setErrorMessage("");

// //         // ለ Telebirr እና CBE Birr ስልክ ቁጥር ማስገባት ግዴታ ስለሆነ ማረጋገጥ
// //         if ((paymentMethod === "telebirr" || paymentMethod === "cbe") && (!phone || phone.length < 10)) {
// //             setErrorMessage(`Please enter a valid phone number for ${paymentMethod.toUpperCase()}`);
// //             setIsProcessing(false);
// //             return;
// //         }

// //         try {
// //             const response = await fetch("/api/payment/initialize", {
// //                 method: "POST",
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                 },
// //                 body: JSON.stringify({
// //                     bookingId,
// //                     totalPrice: bookingDetails.grandTotal,
// //                     paymentMethod,
// //                     firstName,
// //                     lastName,
// //                     email,
// //                     phone,
// //                 }),
// //             });

// //             const contentType = response.headers.get("content-type");
// //             if (!contentType || !contentType.includes("application/json")) {
// //                 throw new Error("Server returned an invalid response. Check API route.");
// //             }

// //             const data = await response.json();

// //             if (!response.ok) {
// //                 throw new Error(data.error || "Failed to process payment");
// //             }

// //             // ክፍያው ወደ ተመረጠው ጌትዌይ ዩአርኤል (Telebirr, CBE, ወይንም Chapa Checkout URL) እንዲዞር ማድረግ
// //             if (data.checkout_url) {
// //                 window.location.href = data.checkout_url;
// //             } else {
// //                 throw new Error("Payment checkout URL not found from gateway.");
// //             }

// //         } catch (error: any) {
// //             console.error("Checkout error:", error);

// //             // ኤረሩ የትኛውንም ዓይነት (Object, String, Error) ቢሆን ወደ ትክክለኛ ጽሁፍ መቀየር
// //             let finalMsg = "Something went wrong during payment.";

// //             const errData = error.response?.data;
// //             if (errData) {
// //                 if (typeof errData === 'string') {
// //                     finalMsg = errData;
// //                 } else if (errData.error) {
// //                     finalMsg = typeof errData.error === 'object' ? JSON.stringify(errData.error) : errData.error;
// //                 } else {
// //                     finalMsg = JSON.stringify(errData);
// //                 }
// //             } else if (error.message) {
// //                 finalMsg = error.message;
// //             }

// //             setErrorMessage(finalMsg);
// //             setIsProcessing(false);
// //         }
// //     };

// //     return (
// //         <div className="min-h-screen bg-[#070b14] text-slate-100 p-6 sm:p-10 flex items-center justify-center font-sans">
// //             <div className="max-w-4xl w-full bg-[#0d1322] border border-slate-800 rounded-3xl p-8 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8">

// //                 {/* ግራဘက် - የክፍያ ምርጫ እና ፎርም */}
// //                 <form onSubmit={handleCheckout} className="space-y-4">
// //                     <h2 className="text-xl font-bold mb-2">Checkout & Payment</h2>
// //                     <p className="text-xs text-slate-400 mb-4">Choose your preferred Ethiopian payment method.</p>

// //                     {errorMessage && (
// //                         <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-xl">
// //                             {errorMessage}
// //                         </div>
// //                     )}

// //                     {/* የክፍያ አማራጮች (Telebirr, CBE Birr, Chapa Card) */}
// //                     <div className="grid grid-cols-3 gap-2 mb-4">
// //                         <button
// //                             type="button"
// //                             onClick={() => setPaymentMethod("telebirr")}
// //                             className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition cursor-pointer ${paymentMethod === "telebirr"
// //                                 ? "bg-indigo-600/20 border-indigo-500 text-indigo-400"
// //                                 : "bg-[#131b2e] border-slate-800 text-slate-400 hover:border-slate-700"
// //                                 }`}
// //                         >
// //                             <Smartphone className="w-5 h-5 text-emerald-400" />
// //                             Telebirr
// //                         </button>

// //                         <button
// //                             type="button"
// //                             onClick={() => setPaymentMethod("cbe")}
// //                             className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition cursor-pointer ${paymentMethod === "cbe"
// //                                 ? "bg-indigo-600/20 border-indigo-500 text-indigo-400"
// //                                 : "bg-[#131b2e] border-slate-800 text-slate-400 hover:border-slate-700"
// //                                 }`}
// //                         >
// //                             <Building2 className="w-5 h-5 text-purple-400" />
// //                             CBE Birr
// //                         </button>

// //                         <button
// //                             type="button"
// //                             onClick={() => setPaymentMethod("chapa")}
// //                             className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition cursor-pointer ${paymentMethod === "chapa"
// //                                 ? "bg-indigo-600/20 border-indigo-500 text-indigo-400"
// //                                 : "bg-[#131b2e] border-slate-800 text-slate-400 hover:border-slate-700"
// //                                 }`}
// //                         >
// //                             <CreditCard className="w-5 h-5 text-blue-400" />
// //                             Card / Chapa
// //                         </button>
// //                     </div>

// //                     <div className="grid grid-cols-2 gap-3">
// //                         <div>
// //                             <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">First Name</label>
// //                             <input
// //                                 type="text"
// //                                 value={firstName}
// //                                 onChange={(e) => setFirstName(e.target.value)}
// //                                 className="w-full bg-[#131b2e] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
// //                                 required
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Last Name</label>
// //                             <input
// //                                 type="text"
// //                                 value={lastName}
// //                                 onChange={(e) => setLastName(e.target.value)}
// //                                 className="w-full bg-[#131b2e] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
// //                                 required
// //                             />
// //                         </div>
// //                     </div>

// //                     <div>
// //                         <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Email Address</label>
// //                         <input
// //                             type="email"
// //                             value={email}
// //                             onChange={(e) => setEmail(e.target.value)}
// //                             className="w-full bg-[#131b2e] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
// //                             required
// //                         />
// //                     </div>

// //                     {/* የስልክ ቁጥር ሳጥን: ለ Telebirr እና CBE ግዴታ ሲሆን, ለ Chapa ግን አማራጭ ይሆናል */}
// //                     <div>
// //                         <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
// //                             Phone Number {paymentMethod === "chapa" ? "(Optional for Card)" : `(For ${paymentMethod.toUpperCase()})`}
// //                         </label>
// //                         <input
// //                             type="tel"
// //                             placeholder="09xxxxxxxx / 07xxxxxxxx"
// //                             value={phone}
// //                             onChange={(e) => setPhone(e.target.value)}
// //                             className="w-full bg-[#131b2e] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
// //                             required={paymentMethod !== "chapa"}
// //                         />
// //                     </div>

// //                     <button
// //                         type="submit"
// //                         disabled={isProcessing}
// //                         className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-xs shadow-lg shadow-indigo-600/30"
// //                     >
// //                         {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
// //                         {isProcessing
// //                             ? "Connecting to Payment..."
// //                             : paymentMethod === "chapa"
// //                                 ? `Pay ETB ${bookingDetails.grandTotal} via Card (Chapa)`
// //                                 : `Pay ETB ${bookingDetails.grandTotal} via ${paymentMethod.toUpperCase()}`
// //                         }
// //                     </button>
// //                 </form>

// //                 {/* ቀኝဘက် - ማጠቃለያ ክፍል */}
// //                 <div className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4">
// //                     <div>
// //                         <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Booking Summary</h3>
// //                         <div className="space-y-3 text-xs text-slate-400">
// //                             <div className="flex justify-between border-b border-slate-800 pb-2">
// //                                 <span>Room:</span>
// //                                 <span className="text-white font-semibold">{bookingDetails.roomType} (#{bookingDetails.roomNumber})</span>
// //                             </div>
// //                             <div className="flex justify-between">
// //                                 <span>Check-in:</span>
// //                                 <span className="text-white font-semibold">{bookingDetails.checkInDate}</span>
// //                             </div>
// //                             <div className="flex justify-between">
// //                                 <span>Check-out:</span>
// //                                 <span className="text-white font-semibold">{bookingDetails.checkOutDate}</span>
// //                             </div>
// //                             <div className="flex justify-between border-t border-slate-800 pt-3 mt-2">
// //                                 <span className="text-white font-bold">Total Amount:</span>
// //                                 <span className="text-emerald-400 font-bold text-sm">ETB {bookingDetails.grandTotal.toLocaleString()}</span>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <div className="flex items-center gap-2 text-[11px] text-slate-500 border-t border-slate-800/80 pt-4">
// //                         <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
// //                         <span>Secured by Chapa Gateway (Telebirr & CBE Supported).</span>
// //                     </div>
// //                 </div>

// //             </div>
// //         </div>
// //     );
// // }
// "use client";

// import { useState, FormEvent, ChangeEvent } from "react";
// import { useRouter } from "next/navigation";
// import { CreditCard, Smartphone, Building, ShieldCheck, CheckCircle2, Lock } from "lucide-react";

// export default function CheckoutPage() {
//     const router = useRouter();

//     // Payment Method: 'telebirr' | 'cbe'
//     const [paymentMethod, setPaymentMethod] = useState<"telebirr" | "cbe">("telebirr");

//     // Form States
//     const [formData, setFormData] = useState({
//         fullName: "",
//         phone: "",
//         accountNumber: "",
//         transactionId: "",
//     });

//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [success, setSuccess] = useState(false);

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//         if (error) setError(null);
//     };

//     const handlePaymentSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         setError(null);

//         if (!formData.fullName.trim() || !formData.phone.trim()) {
//             setError("እባክዎ ሙሉ ስምዎን እና ስልክ ቁጥርዎን ያስገቡ።");
//             return;
//         }

//         if (paymentMethod === "cbe" && !formData.accountNumber.trim()) {
//             setError("እባክዎ የንግድ ባንክ (CBE) የሂሳብ ቁጥርዎን ያስገቡ።");
//             return;
//         }

//         if (!formData.transactionId.trim()) {
//             setError("እባክዎ የክፍያ ማረጋገጫ (Transaction ID / Receipt Number) ያስገቡ።");
//             return;
//         }

//         setIsLoading(true);

//         try {
//             // API call to process or save booking/payment verification
//             await new Promise((resolve) => setTimeout(resolve, 1500));

//             setSuccess(true);
//             setTimeout(() => {
//                 router.push("/bookings/success");
//             }, 2000);
//         } catch {
//             setError("ክፍያውን ማረጋገጥ አልተቻለም። እባክዎ እንደገና ይሞክሩ።");
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-[calc(100vh-64px)] bg-[#f8f7f4] py-12 px-4 sm:px-6 lg:px-8 font-sans">
//             <div className="max-w-3xl mx-auto">
//                 <div className="text-center mb-8">
//                     <h1 className="font-serif text-3xl font-bold text-gray-900">የክፍያ ማጠናቀቂያ (Secure Checkout)</h1>
//                     <p className="text-xs text-gray-500 mt-1">ክፍያዎን በ Telebirr ወይም በኢትዮጵያ ንግድ ባንክ (CBE) በደህና ይፈጽሙ</p>
//                 </div>

//                 {success ? (
//                     <div className="bg-white p-8 rounded-2xl shadow-xl text-center space-y-4">
//                         <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
//                             <CheckCircle2 className="w-8 h-8" />
//                         </div>
//                         <h2 className="font-serif text-2xl font-bold text-gray-900">ክፍያዎ በተሳካ ሁኔታ ተጠናቋል!</h2>
//                         <p className="text-xs text-gray-600">ቦታ ማስያዝዎ (Booking) ተረጋግጧል። ወደ መነሻ ገጽ በመውሰድ ላይ...</p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

//                         {/* Payment Summary / Info */}
//                         <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 md:col-span-1 space-y-4 h-fit">
//                             <h3 className="font-serif text-lg font-bold text-gray-900 border-b pb-3">የክፍያ ማጠቃለያ</h3>
//                             <div className="space-y-2 text-xs text-gray-600">
//                                 <div className="flex justify-between">
//                                     <span>የክፍል ዋጋ:</span>
//                                     <span className="font-semibold text-gray-900">4,500 ብር</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>service charge (15%):</span>
//                                     <span className="font-semibold text-gray-900">675 ብር</span>
//                                 </div>
//                                 <div className="border-t pt-2 flex justify-between text-sm font-bold text-gray-900">
//                                     <span>አጠቃላይ ድምር:</span>
//                                     <span className="text-[#c59a5b]">5,175 ብር</span>
//                                 </div>
//                             </div>
//                             <div className="bg-[#080d1a]/5 p-3 rounded-xl flex items-start gap-2 text-[11px] text-gray-600">
//                                 <ShieldCheck className="w-4 h-4 text-[#c59a5b] shrink-0 mt-0.5" />
//                                 <span>ክፍያዎ በኢትዮጵያ ህጋዊ የዲጂታል የክፍያ አማራጮች የተጠበቀ ነው።</span>
//                             </div>
//                         </div>

//                         {/* Payment Methods Form */}
//                         <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 md:col-span-2">
//                             {error && (
//                                 <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600">
//                                     {error}
//                                 </div>
//                             )}

//                             <label className="block text-xs font-semibold text-gray-700 mb-3">የክፍያ አማራጭ ይምረጡ</label>
//                             <div className="grid grid-cols-2 gap-4 mb-6">
//                                 <button
//                                     type="button"
//                                     onClick={() => setPaymentMethod("telebirr")}
//                                     className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition cursor-pointer ${paymentMethod === "telebirr"
//                                             ? "border-[#c59a5b] bg-[#c59a5b]/5 text-[#080d1a]"
//                                             : "border-gray-200 text-gray-600 hover:border-gray-300"
//                                         }`}
//                                 >
//                                     <Smartphone className="w-6 h-6 text-emerald-600" />
//                                     <span className="text-xs font-bold">Telebirr</span>
//                                 </button>

//                                 <button
//                                     type="button"
//                                     onClick={() => setPaymentMethod("cbe")}
//                                     className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition cursor-pointer ${paymentMethod === "cbe"
//                                             ? "border-[#c59a5b] bg-[#c59a5b]/5 text-[#080d1a]"
//                                             : "border-gray-200 text-gray-600 hover:border-gray-300"
//                                         }`}
//                                 >
//                                     <Building className="w-6 h-6 text-purple-700" />
//                                     <span className="text-xs font-bold">ኢትዮጵያ ንግድ ባንክ (CBE)</span>
//                                 </button>
//                             </div>

//                             {/* Instructions based on method */}
//                             <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 space-y-1.5">
//                                 {paymentMethod === "telebirr" ? (
//                                     <>
//                                         <p className="font-semibold text-gray-900">በ Telebirr ለመክፈል:</p>
//                                         <p>1. በ Telebirr ቁጥርዎ <strong>*127#</strong> ወይም አፕ በመጠቀም ገንዘቡን ያስተላልፉ።</p>
//                                         <p>የመርሃግብር/የሆቴል መለያ ቁጥር (Merchant/Account): <span className="font-bold text-[#c59a5b]">0912345678 (HotelHub)</span></p>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <p className="font-semibold text-gray-900">በኢትዮጵያ ንግድ ባንክ (CBE) ለመክፈል:</p>
//                                         <p>የባንክ አካውንት ቁጥር: <span className="font-bold text-purple-700">1000123456789 (HotelHub PLC)</span></p>
//                                         <p>በ CBE Birr ወይም በቤተክርስቲያን/ቅርንጫፍ ገቢ በማድረግ Transaction ID ይውሰዱ።</p>
//                                     </>
//                                 )}
//                             </div>

//                             <form onSubmit={handlePaymentSubmit} className="space-y-4">
//                                 <div>
//                                     <label className="block text-xs font-medium text-gray-700 mb-1">ሙሉ ስም (FullName)</label>
//                                     <input
//                                         type="text"
//                                         name="fullName"
//                                         required
//                                         value={formData.fullName}
//                                         onChange={handleChange}
//                                         placeholder="ስምዎ እና የአባት ስም"
//                                         className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#080d1a]"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-xs font-medium text-gray-700 mb-1">የስልክ ቁጥር (Phone Number)</label>
//                                     <input
//                                         type="text"
//                                         name="phone"
//                                         required
//                                         value={formData.phone}
//                                         onChange={handleChange}
//                                         placeholder="09... ወይም +2519..."
//                                         className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#080d1a]"
//                                     />
//                                 </div>

//                                 {paymentMethod === "cbe" && (
//                                     <div>
//                                         <label className="block text-xs font-medium text-gray-700 mb-1">የእርስዎ የ CBE አካውንት ቁጥር (Account Number)</label>
//                                         <input
//                                             type="text"
//                                             name="accountNumber"
//                                             value={formData.accountNumber}
//                                             onChange={handleChange}
//                                             placeholder="1000..."
//                                             className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#080d1a]"
//                                         />
//                                     </div>
//                                 )}

//                                 <div>
//                                     <label className="block text-xs font-medium text-gray-700 mb-1">የክፍያ ማረጋገጫ ቁጥር (Transaction ID / Receipt No)</label>
//                                     <input
//                                         type="text"
//                                         name="transactionId"
//                                         required
//                                         value={formData.transactionId}
//                                         onChange={handleChange}
//                                         placeholder="ለምሳሌ፡ FT23456789 ወይም Telebirr Txn ID"
//                                         className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#080d1a]"
//                                     />
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     disabled={isLoading}
//                                     className="w-full py-3 px-4 bg-[#080d1a] hover:bg-[#121c38] text-white font-semibold text-xs rounded-lg transition shadow-md disabled:opacity-50 mt-4 flex items-center justify-center gap-2 cursor-pointer"
//                                 >
//                                     <Lock className="w-3.5 h-3.5 text-[#c59a5b]" />
//                                     {isLoading ? "ክፍያ በማረጋገጥ ላይ..." : "ክፍያውን አጠናቅ (Complete Payment)"}
//                                 </button>
//                             </form>
//                         </div>

//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
"use client";

import React, { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Loader2, Upload, CheckCircle2, Building2, Smartphone } from "lucide-react";

export default function CheckoutPaymentPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const bookingId = params?.id || searchParams.get("bookingId");
  const totalAmount = searchParams.get("total") || "0";
  const nights = searchParams.get("nights") || "1";

  const [selectedMethod, setSelectedMethod] = useState<"telebirr" | "cbe">("telebirr");
  const [transactionId, setTransactionId] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const companyAccounts = {
    telebirr: {
      accountName: "Company Official Telebirr",
      accountNumber: "0946309932",
      type: "Commercial / Merchant",
    },
    cbe: {
      accountName: "Company Commercial Bank of Ethiopia",
      accountNumber: "1000467736232",
      type: "Commercial Bank",
    },
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      setErrorMsg("please Transaction Number(Transaction ID) input።");
      return;
    }
    if (!receiptFile) {
      setErrorMsg("payment screenshot(Receipt) upload");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("bookingId", String(bookingId || ""));
      formData.append("paymentMethod", selectedMethod);
      formData.append("transactionId", transactionId);
      formData.append("amount", totalAmount);
      formData.append("receipt", receiptFile);

      const response = await fetch("/api/payments/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        router.push(`/bookings/pending?bookingId=${bookingId}`);
      } else {
        setErrorMsg(data.message || "payment not send።");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setErrorMsg("connection error።");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center border-b pb-6 mb-6">
          <div>
            <h1 className="font-serif text-xl font-bold text-gray-900">payment varification add</h1>
            <p className="text-xs text-gray-500 mt-1">wait: {nights} night • varify payment to company</p>
          </div>
          <div className="text-right bg-gray-50 px-4 py-2 rounded-xl border">
            <span className="text-xs text-gray-400 block">total totalPrice</span>
            <span className="font-serif font-bold text-lg text-[#080d1a]">
              {Number(totalAmount).toLocaleString()} ETB
            </span>
          </div>
        </div>

        {/* የክፍያ ዘዴ መምረጫ (Tabs) */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setSelectedMethod("telebirr")}
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${selectedMethod === "telebirr"
                ? "border-[#c59a5b] bg-[#c59a5b]/5 text-[#080d1a] font-semibold"
                : "border-gray-200 text-gray-600"
              }`}
          >
            <Smartphone className="w-5 h-5 text-[#c59a5b]" />
           Telebirr (Tel)
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod("cbe")}
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${selectedMethod === "cbe"
                ? "border-[#c59a5b] bg-[#c59a5b]/5 text-[#080d1a] font-semibold"
                : "border-gray-200 text-gray-600"
              }`}
          >
            <Building2 className="w-5 h-5 text-[#c59a5b]" />
           Commercial Bank of Ethiopian(CBE)
          </button>
        </div>

        {/* የኩባንያው አካውንት ማሳያ */}
        <div className="bg-[#080d1a] text-white p-5 rounded-2xl mb-6 shadow-md">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">send money company account</p>
          <div className="flex justify-between items-end mt-2">
            <div>
              <p className="text-sm font-medium text-gray-300">{companyAccounts[selectedMethod].accountName}</p>
              <p className="text-2xl font-mono font-bold tracking-wider text-[#c59a5b] mt-1">
                {companyAccounts[selectedMethod].accountNumber}
              </p>
            </div>
            <span className="text-xs bg-white/10 px-2.5 py-1 rounded-md text-gray-300">
              {companyAccounts[selectedMethod].type}
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmitPayment} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Transaction Number(Transaction ID / Ref Number)
            </label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="FTR12345678"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c59a5b] text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
             payment approved screenshot (Screenshot / Receipt)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#c59a5b] transition-colors relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && setReceiptFile(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-xs text-gray-600 font-medium">
                  {receiptFile ? receiptFile.name : "ፋይል ለመምረጥ እዚህ ይጫኑ"}
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 bg-[#080d1a] text-white py-3.5 rounded-xl font-medium hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#c59a5b]" />
               incoming now...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-[#c59a5b]" />
                Submit Payment
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}