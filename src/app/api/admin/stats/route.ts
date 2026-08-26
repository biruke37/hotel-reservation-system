import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const [totalRooms, totalUsers, totalBookings, revenue] = await Promise.all([
            prisma.room.count(),
            prisma.user.count(),
            prisma.booking.count(),
            prisma.booking.aggregate({
                _sum: { totalPrice: true },
                where: { status: "Confirmed" }, // ከ schemaህ BookingStatus ጋር exact match ያደርጋል
            }),
        ]);

        const recentBookings = await prisma.booking.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { name: true, email: true } },
                room: { select: { roomNumber: true, type: true } }, // title ፈንታ roomNumber እና type
            },
        });

        return NextResponse.json({
            stats: {
                totalRooms,
                totalUsers,
                totalBookings,
                totalRevenue: revenue._sum.totalPrice || 0,
            },
            recentBookings,
        });
    } catch (error) {
        console.error("Admin stats error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}