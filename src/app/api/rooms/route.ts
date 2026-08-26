import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const rooms = await prisma.room.findMany({
            where: { isAvailable: true }, // የሚገኙትን ብቻ ለማውጣት
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(rooms);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
    }
}