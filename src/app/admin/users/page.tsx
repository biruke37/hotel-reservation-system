"use client";

import { useEffect, useState } from "react";
import {
    Users,
    Search,
    ShieldCheck,
    UserCheck,
    Mail,
    Calendar,
    Trash2,
    ChevronDown,
    RefreshCw,
    UserPlus
} from "lucide-react";

interface UserType {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/users");
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
                setFilteredUsers(data);
            }
        } catch (err) {
            console.error("Failed to fetch users:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        let result = users;

        if (searchTerm.trim() !== "") {
            result = result.filter(
                (u) =>
                    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    u.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (roleFilter !== "all") {
            result = result.filter((u) => u.role === roleFilter);
        }

        setFilteredUsers(result);
    }, [searchTerm, roleFilter, users]);

    const handleRoleChange = async (userId: string, newRole: string) => {
        setUpdatingId(userId);
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });

            if (res.ok) {
                setUsers((prev) =>
                    prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
                );
            }
        } catch (err) {
            console.error("Failed to update role:", err);
        } finally {
            setUpdatingId(null);
        }
    };

    const totalAdmins = users.filter((u) => u.role === "admin").length;
    const totalGuests = users.filter((u) => u.role !== "admin").length;

    return (
        <div className="p-6 md:p-8 bg-[#070b14] min-h-screen text-slate-200 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            User Management
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">
                            Control user privileges, roles, and review registered accounts.
                        </p>
                    </div>
                    <button
                        onClick={fetchUsers}
                        className="self-start sm:self-auto flex items-center gap-2 bg-[#0d1322] hover:bg-slate-800/80 text-slate-300 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-800 transition cursor-pointer"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-indigo-400" : ""}`} />
                        <span>Refresh Data</span>
                    </button>
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#0d1322] border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Users</p>
                            <h3 className="text-2xl font-extrabold text-white mt-1">{loading ? "-" : users.length}</h3>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-[#0d1322] border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Administrators</p>
                            <h3 className="text-2xl font-extrabold text-amber-400 mt-1">{loading ? "-" : totalAdmins}</h3>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-[#0d1322] border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Guests / Clients</p>
                            <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">{loading ? "-" : totalGuests}</h3>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <UserCheck className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Filter Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0d1322] p-3.5 rounded-2xl border border-slate-800/80">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-xs bg-[#070b14] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-200 placeholder-slate-500"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <span className="text-xs text-slate-400 font-medium">Filter Role:</span>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="bg-[#070b14] border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin Only</option>
                            <option value="guest">Guest Only</option>
                        </select>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                    {loading ? (
                        <div className="p-6 space-y-4">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="h-12 bg-slate-800/40 animate-pulse rounded-xl w-full" />
                            ))}
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="p-12 text-center text-slate-500 text-xs">
                            No registered user accounts found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-900/60 border-b border-slate-800/80 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                                        <th className="py-3.5 px-6">User</th>
                                        <th className="py-3.5 px-6">Email</th>
                                        <th className="py-3.5 px-6">Role</th>
                                        <th className="py-3.5 px-6">Joined Date</th>
                                        <th className="py-3.5 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/40 text-xs">
                                    {filteredUsers.map((user) => {
                                        const isAdmin = user.role === "admin";
                                        return (
                                            <tr key={user.id} className="hover:bg-slate-800/20 transition">
                                                <td className="py-3.5 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs border ${isAdmin
                                                                ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                                                                : "bg-indigo-600/10 border-indigo-500/30 text-indigo-400"
                                                            }`}>
                                                            {user.name ? user.name[0].toUpperCase() : "U"}
                                                        </div>
                                                        <span className="font-semibold text-white">{user.name || "Unnamed User"}</span>
                                                    </div>
                                                </td>

                                                <td className="py-3.5 px-6 text-slate-300">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                                                        <span>{user.email}</span>
                                                    </div>
                                                </td>

                                                <td className="py-3.5 px-6">
                                                    <div className="relative inline-block">
                                                        <select
                                                            disabled={updatingId === user.id}
                                                            value={user.role}
                                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                            className={`appearance-none text-[10px] font-bold uppercase tracking-wider px-3 py-1 pr-7 rounded-xl border cursor-pointer focus:outline-none transition ${isAdmin
                                                                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                                                    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                                                }`}
                                                        >
                                                            <option value="guest" className="bg-[#0d1322] text-slate-200">GUEST</option>
                                                            <option value="admin" className="bg-[#0d1322] text-slate-200">ADMIN</option>
                                                        </select>
                                                        <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                                                    </div>
                                                </td>

                                                <td className="py-3.5 px-6 text-slate-400">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                                        <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </td>

                                                <td className="py-3.5 px-6 text-right">
                                                    <button
                                                        title="Delete User"
                                                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}