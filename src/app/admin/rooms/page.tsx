"use client";

import { useState } from "react";
import {
    Plus,
    Edit2,
    Trash2,
    BedDouble,
    Search,
    X,
    Check,
    Sparkles,
    Wifi,
    Tv,
    Coffee
} from "lucide-react";

interface Room {
    id: string;
    number: string;
    type: string;
    price: string;
    status: "Available" | "Occupied" | "Maintenance";
    floor: string;
}

const initialRooms: Room[] = [
    { id: "1", number: "101", type: "Standard King", price: "120", status: "Available", floor: "1st Floor" },
    { id: "2", number: "204", type: "Executive Room", price: "180", status: "Occupied", floor: "2nd Floor" },
    { id: "3", number: "301", type: "Deluxe Suite", price: "250", status: "Available", floor: "3rd Floor" },
    { id: "4", number: "501", type: "Penthouse Suite", price: "500", status: "Maintenance", floor: "5th Floor" },
];

export default function AdminRoomsPage() {
    const [rooms, setRooms] = useState<Room[]>(initialRooms);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        number: "",
        type: "Standard King",
        price: "",
        status: "Available" as "Available" | "Occupied" | "Maintenance",
        floor: "1st Floor"
    });

    // Filter Logic
    const filteredRooms = rooms.filter((room) => {
        const matchesSearch =
            room.number.includes(search) ||
            room.type.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "ALL" || room.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Open Modal for Add
    const handleOpenAdd = () => {
        setEditingRoom(null);
        setFormData({ number: "", type: "Standard King", price: "", status: "Available", floor: "1st Floor" });
        setIsModalOpen(true);
    };

    // Open Modal for Edit
    const handleOpenEdit = (room: Room) => {
        setEditingRoom(room);
        setFormData({
            number: room.number,
            type: room.type,
            price: room.price,
            status: room.status,
            floor: room.floor
        });
        setIsModalOpen(true);
    };

    // Delete Handler
    const handleDelete = (id: string) => {
        if (confirm("are you sure delete this room?")) {
            setRooms((prev) => prev.filter((r) => r.id !== id));
        }
    };

    // Save / Update Handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingRoom) {
            // Update
            setRooms((prev) =>
                prev.map((r) => (r.id === editingRoom.id ? { ...r, ...formData } : r))
            );
        } else {
            // Add
            const newRoomItem: Room = {
                id: Date.now().toString(),
                ...formData
            };
            setRooms((prev) => [newRoomItem, ...prev]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d1322] border border-slate-800/80 p-6 rounded-2xl shadow-xl">
                <div>
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
                        <Sparkles className="w-4 h-4" />
                        <span>Room Management System</span>
                    </div>
                    <h1 className="text-xl font-black text-white tracking-wide">Rooms Catalog</h1>
                    <p className="text-xs text-slate-400 mt-1">
                       Hotel rooms price፣ new room register and manage።
                    </p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-95 shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Room</span>
                </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0d1322] border border-slate-800/80 p-4 rounded-2xl">
                <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search room number or type..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                </div>

                {/* Status Pills */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                    {["ALL", "Available", "Occupied", "Maintenance"].map((st) => (
                        <button
                            key={st}
                            onClick={() => setStatusFilter(st)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${statusFilter === st
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                                    : "bg-[#131b2e] text-slate-400 hover:text-white border border-slate-800/80"
                                }`}
                        >
                            {st}
                        </button>
                    ))}
                </div>
            </div>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredRooms.map((room) => (
                    <div
                        key={room.id}
                        className="bg-[#0d1322] border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all duration-300 group hover:shadow-xl hover:shadow-indigo-500/5"
                    >
                        <div>
                            {/* Status Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2.5 bg-indigo-600/10 text-indigo-400 rounded-xl border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    <BedDouble className="w-5 h-5" />
                                </div>
                                <span
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${room.status === "Available"
                                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                            : room.status === "Occupied"
                                                ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                        }`}
                                >
                                    {room.status}
                                </span>
                            </div>

                            {/* Room Details */}
                            <h3 className="text-lg font-black text-white group-hover:text-indigo-300 transition">
                                Room #{room.number}
                            </h3>
                            <p className="text-xs font-medium text-slate-400 mt-0.5">{room.type}</p>
                            <p className="text-[11px] text-slate-500 mt-1">{room.floor}</p>

                            {/* Mini Icons Features */}
                            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-800/60 text-slate-500">
                                <Wifi className="w-3.5 h-3.5" />
                                <Tv className="w-3.5 h-3.5" />
                                <Coffee className="w-3.5 h-3.5" />
                            </div>
                        </div>

                        {/* Bottom Controls */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                            <div>
                                <span className="text-xl font-black text-white">${room.price}</span>
                                <span className="text-[10px] text-slate-400">/night</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => handleOpenEdit(room)}
                                    className="p-2 bg-[#131b2e] hover:bg-indigo-600 hover:text-white text-slate-300 rounded-xl border border-slate-800/80 transition"
                                    title="Edit Room"
                                >
                                    <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(room.id)}
                                    className="p-2 bg-[#131b2e] hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 rounded-xl border border-slate-800/80 transition"
                                    title="Delete Room"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create / Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                            <h3 className="text-base font-bold text-white">
                                {editingRoom ? `Edit Room #${editingRoom.number}` : "Add New Room"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-300">Room Number</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. 102"
                                        value={formData.number}
                                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-300">Price ($/night)</label>
                                    <input
                                        type="number"
                                        required
                                        placeholder="e.g. 200"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-300">Room Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                >
                                    <option value="Standard King">Standard King</option>
                                    <option value="Executive Room">Executive Room</option>
                                    <option value="Deluxe Suite">Deluxe Suite</option>
                                    <option value="Penthouse Suite">Penthouse Suite</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-300">Floor</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 2nd Floor"
                                        value={formData.floor}
                                        onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-300">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                status: e.target.value as "Available" | "Occupied" | "Maintenance",
                                            })
                                        }
                                        className="w-full bg-[#131b2e] border border-slate-800/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Occupied">Occupied</option>
                                        <option value="Maintenance">Maintenance</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-3 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition flex items-center gap-1.5"
                                >
                                    <Check className="w-4 h-4" />
                                    <span>{editingRoom ? "Save Changes" : "Create Room"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}