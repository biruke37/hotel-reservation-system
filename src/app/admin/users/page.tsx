import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
    // Fetch all registered users from the database, ordered by latest
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-6">Registered Users</h1>

            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase bg-slate-950/50">
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Joined Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-6 text-center text-slate-500">
                                    No registered users found.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => {
                                const roleStr = String(user.role);
                                return (
                                    <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition">
                                        <td className="p-4 font-medium text-slate-200">{user.name || "N/A"}</td>
                                        <td className="p-4 text-slate-300">{user.email}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${roleStr === "ADMIN"
                                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                                : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                                }`}>
                                                {roleStr}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-400 text-sm">
                                            {new Date(user.createdAt).toLocaleDateString()}
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