"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Check, AlertCircle } from "lucide-react";

export default function AdminRoomManager({ initialRooms }: { initialRooms: any[] }) {
    const [rooms, setRooms] = useState(initialRooms);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<any | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        roomNumber: "",
        type: "Single",
        pricePerNight: "",
        description: "",
        images: "",
        amenities: "",
        isAvailable: true,
    });

    const openModal = (room: any = null) => {
        if (room) {
            setEditingRoom(room);
            setFormData({
                roomNumber: room.roomNumber,
                type: room.type,
                pricePerNight: room.pricePerNight.toString(),
                description: room.description,
                images: Array.isArray(room.images) ? room.images.join(", ") : "",
                amenities: Array.isArray(room.amenities) ? room.amenities.join(", ") : "",
                isAvailable: room.isAvailable,
            });
        } else {
            setEditingRoom(null);
            setFormData({
                roomNumber: "",
                type: "Single",
                pricePerNight: "",
                description: "",
                images: "",
                amenities: "",
                isAvailable: true,
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            pricePerNight: parseFloat(formData.pricePerNight),
            images: formData.images.split(",").map((s) => s.trim()).filter(Boolean),
            amenities: formData.amenities.split(",").map((s) => s.trim()).filter(Boolean),
        };

        try {
            if (editingRoom) {
                // UPDATE
                const res = await fetch(`/api/rooms/${editingRoom.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                if (res.ok) {
                    const updated = await res.json();
                    setRooms(rooms.map((r) => (r.id === updated.id ? updated : r)));
                }
            } else {
                // CREATE
                const res = await fetch("/api/rooms", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                if (res.ok) {
                    const newRoom = await res.json();
                    setRooms([newRoom, ...rooms]);
                }
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save room", error);
            alert("Failed to save room. Make sure Room Number is unique.");
        }
    };

    const handleDelete = async (roomId: string) => {
        if (!confirm("Are you sure you want to delete this room? All related bookings will also be deleted.")) return;

        try {
            const res = await fetch(`/api/rooms/${roomId}`, { method: "DELETE" });
            if (res.ok) {
                setRooms(rooms.filter((r) => r.id !== roomId));
            } else {
                alert("Failed to delete room.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Top Action Bar */}
            <div className="flex justify-end">
                <button
                    onClick={() => openModal()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    Add New Room
                </button>
            </div>

            {/* Table Container */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-800/50 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Room No.</th>
                                <th className="px-6 py-4 font-semibold">Type</th>
                                <th className="px-6 py-4 font-semibold">Price/Night</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                            {rooms.map((room) => (
                                <tr key={room.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{room.roomNumber}</td>
                                    <td className="px-6 py-4 text-slate-300">{room.type}</td>
                                    <td className="px-6 py-4 text-amber-400 font-semibold">${room.pricePerNight}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${room.isAvailable
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${room.isAvailable ? "bg-emerald-400" : "bg-rose-400"}`} />
                                            {room.isAvailable ? "Available" : "Unavailable"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => openModal(room)}
                                            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                                            title="Edit Room"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(room.id)}
                                            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                                            title="Delete Room"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {rooms.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No rooms found. Add your first room!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Create/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto text-slate-100">
                        <div className="flex justify-between items-center p-6 border-b border-slate-800">
                            <h2 className="text-xl font-bold text-white">
                                {editingRoom ? "Edit Room" : "Add New Room"}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Room Number</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.roomNumber}
                                        onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    >
                                        <option value="Single">Single</option>
                                        <option value="Deluxe">Double</option>
                                        <option value="Suite">Suite</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Price per Night ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    value={formData.pricePerNight}
                                    onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Image URLs (Comma separated)</label>
                                <input
                                    type="text"
                                    placeholder="https://img1.com, https://img2.com"
                                    value={formData.images}
                                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Amenities (Comma separated)</label>
                                <input
                                    type="text"
                                    placeholder="WiFi, AC, Pool, TV"
                                    value={formData.amenities}
                                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="isAvailable"
                                    checked={formData.isAvailable}
                                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                                    className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="isAvailable" className="text-sm font-medium text-slate-300">
                                    Available for Booking
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-indigo-600/20"
                                >
                                    {editingRoom ? "Update Room" : "Create Room"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}