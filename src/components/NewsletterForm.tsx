"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function NewsletterForm({ dark = true }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <p className={`mt-6 flex items-center gap-2 text-sm ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
        <CheckCircle2 className="h-4 w-4" />
        {message}
      </p>
    );
  }

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <label
        htmlFor="newsletter-email"
        className={`text-sm font-medium ${dark ? "text-white" : "text-slate-900"}`}
      >
        Exclusive deals, straight to your inbox
      </label>

      <div
        className={`mt-2.5 flex overflow-hidden rounded-lg border transition-colors ${dark
            ? "border-white/10 bg-white/5 focus-within:border-blue-500"
            : "border-slate-300 bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10"
          }`}
      >
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={`w-full bg-transparent px-4 py-2.5 text-sm outline-none ${dark
              ? "text-white placeholder:text-slate-500"
              : "text-slate-900 placeholder:text-slate-400"
            }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
          className="shrink-0 bg-blue-600 px-4 text-white transition-colors hover:bg-blue-500 disabled:opacity-60"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {status === "error" && (
        <p className="mt-2 text-xs text-red-500">{message}</p>
      )}
    </form>
  );
}