
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