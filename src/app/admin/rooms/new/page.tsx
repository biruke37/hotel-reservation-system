"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddRoomPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "STANDARD ROOM",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/rooms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Failed to add room");

            toast.success("Room added successfully!");
            router.push("/rooms"); // ተጨማሮ ወደ ሩሞች ዝርዝር ገጽ ይመልሰዋል
            router.refresh(); // አዲሱ ዴታ ወዲያውኑ እንዲያሳይ ሪፍሬሽ ያደርጋል
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-slate-900 rounded-3xl text-white mt-10">
            <h1 className="text-xl font-bold mb-4">Add New Room</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Room Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800"
                />
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800"
                />
                <input
                    type="number"
                    placeholder="Price per night"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 p-3 rounded-xl font-bold"
                >
                    {loading ? "Adding..." : "Save Room"}
                </button>
            </form>
        </div>
    );
}