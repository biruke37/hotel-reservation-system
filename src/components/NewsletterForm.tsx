"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Loader2, AlertCircle } from "lucide-react";

export default function NewsletterForm({ dark = true }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setStatus("success");
      setMessage(data.message || "Successfully subscribed!");
      setEmail("");

      // Auto-reset after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");

      // Auto-reset error after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }
  }

  if (status === "success") {
    return (
      <div className={`mt-6 flex items-start gap-3 p-4 rounded-xl border ${dark
          ? "bg-emerald-500/10 border-emerald-500/20"
          : "bg-emerald-50 border-emerald-200"
        }`}>
        <CheckCircle2 className={`h-5 w-5 shrink-0 mt-0.5 ${dark ? "text-emerald-400" : "text-emerald-600"
          }`} />
        <div className="space-y-1">
          <p className={`text-sm font-semibold ${dark ? "text-emerald-400" : "text-emerald-700"
            }`}>
            You're all set!
          </p>
          <p className={`text-xs ${dark ? "text-emerald-300/80" : "text-emerald-600"
            }`}>
            {message || "Check your inbox for exclusive deals and offers."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
      <label
        htmlFor="newsletter-email"
        className={`text-sm font-semibold flex items-center gap-2 ${dark ? "text-white" : "text-slate-900"
          }`}
      >
        <Mail className={`h-4 w-4 ${dark ? "text-amber-400" : "text-indigo-600"}`} />
        Subscribe for exclusive deals
      </label>

      <div
        className={`flex overflow-hidden rounded-xl border transition-all shadow-sm ${dark
            ? "border-white/15 bg-black/40 focus-within:border-amber-400/80 focus-within:ring-1 focus-within:ring-amber-400/80"
            : "border-slate-300 bg-white focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/10"
          }`}
      >
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          disabled={status === "loading"}
          className={`w-full bg-transparent px-4 py-3 text-sm outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed ${dark
              ? "text-white placeholder:text-slate-500"
              : "text-slate-900 placeholder:text-slate-400"
            }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
          className={`shrink-0 px-5 font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center ${dark
              ? "bg-amber-400 hover:bg-amber-300 text-slate-950"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </button>
      </div>

      {status === "error" && (
        <div className={`flex items-start gap-2 p-3 rounded-lg border text-xs ${dark
            ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
            : "bg-rose-50 border-rose-200 text-rose-600"
          }`}>
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>{message}</p>
        </div>
      )}

      <p className={`text-xs ${dark ? "text-slate-500" : "text-slate-600"
        }`}>
        By subscribing, you agree to our Privacy Policy and consent to receive updates.
      </p>
    </form>
  );
}