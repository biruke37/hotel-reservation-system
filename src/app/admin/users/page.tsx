import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
    // Fetch all registered users from the database, ordered by latest
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    });

    // Calculate stats
    const totalUsers = users.length;
    const adminCount = users.filter(u => u.role === "ADMIN").length;

    // Format date helper
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
    };

    return (
        <div className="space-y-6">
            {/* Page Header Banner */}
            <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span>Admin Panel</span>
                </div>
                <h1 className="text-xl font-black text-white tracking-wide">Registered Users</h1>
                <p className="text-xs text-slate-400 mt-1">All accounts with their roles and join dates</p>
            </div>

            {/* User Stats Bar */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0d1322] border border-slate-800/80 rounded-xl p-3 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-indigo-400">{totalUsers}</span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Total Users</span>
                </div>
                <div className="bg-[#0d1322] border border-slate-800/80 rounded-xl p-3 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-amber-400">{adminCount}</span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Admins</span>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-[#0d1322] border border-slate-800/80 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#111827]/50">
                            <tr className="text-[11px] uppercase tracking-wider text-slate-400">
                                <th className="py-4 px-6 font-semibold">User</th>
                                <th className="py-4 px-6 font-semibold">Email</th>
                                <th className="py-4 px-6 font-semibold">Role</th>
                                <th className="py-4 px-6 font-semibold">Joined Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#131b2e] rounded-full mb-4">
                                            <span className="text-3xl">👤</span>
                                        </div>
                                        <h3 className="text-base font-bold text-white">No users found</h3>
                                        <p className="text-xs text-slate-400 mt-1">No registered users in the system.</p>
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => {
                                    const roleStr = String(user.role);
                                    const avatarInitial = (user.name || "U").charAt(0).toUpperCase();
                                    return (
                                        <tr key={user.id} className="hover:bg-slate-800/30 transition">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-xs font-bold">
                                                        {avatarInitial}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">{user.name || "N/A"}</p>
                                                        <p className="text-[10px] text-slate-500">{user.id.slice(0, 8)}...</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-slate-300">{user.email}</td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${roleStr === "ADMIN"
                                                    ? "bg-amber-500/20 text-amber-400 border-amber-500/20"
                                                    : "bg-indigo-500/20 text-indigo-400 border-indigo-500/20"
                                                    }`}>
                                                    {roleStr}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-slate-400">
                                                <span className="text-xs">{formatDate(user.createdAt)}</span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
