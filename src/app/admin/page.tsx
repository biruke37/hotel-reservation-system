import AdminRoomManager from "@/components/AdminManager";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <h2 className="text-xl font-semibold">Access Denied</h2>
        <p className="text-sm text-slate-400">You must be an administrator to view this page.</p>
      </div>
    );
  }

  const rooms = await prisma.room.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rooms Management</h1>
      {/* AdminRoomManager is a client component that accepts initialRooms */}
      {/* @ts-expect-error Server -> Client prop serializable */}
      <AdminRoomManager initialRooms={rooms} />
    </div>
  );
}
