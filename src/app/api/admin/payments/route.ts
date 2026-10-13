import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const session = await auth();
        if (!session?.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 403 }
            );
        }
        const { searchParams } = new URL(request.url);
        const statusFilter = searchParams.get("status");
        const searchQuery = searchParams.get("search");
        // Build where clause
        const where: any = {};
        if (statusFilter && statusFilter !== "ALL") {
            where.status = statusFilter;
        }
        if (searchQuery) {
            where.OR = [
                {
                    user: {
                        name: { contains: searchQuery, mode: "insensitive" },
                    },
                },
                {
                    user: {
                        email: { contains: searchQuery, mode: "insensitive" },
                    },
                },
                {
                    room: {
                        roomNumber: { contains: searchQuery, mode: "insensitive" },
                    },
                },
            ];
        }

        const bookings = await prisma.booking.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                },
                room: {
                    select: {
                        id: true,
                        roomNumber: true,
                        type: true,
                        pricePerNight: true,
                    },
                },
                payment: true,
            },
            orderBy: { createdAt: "desc" },
        });
        // Calculate stats
        const stats = {
            total: bookings.length,
            pending: bookings.filter((b: any) => ["PENDING_PAYMENT", "PENDING_APPROVAL"].includes(b.status)).length,
            approved: bookings.filter((b: any) => b.status === "CONFIRMED").length,
            rejected: bookings.filter((b: any) => b.status === "REJECTED").length,
            totalAmount: bookings.reduce((sum: number, b: any) => sum + (Number(b.amount) || 0), 0),
        };
        return NextResponse.json({
            success: true,
            data: {
                bookings,
                stats,
            },
        });
    } catch (error) {
        console.error("Admin Payments Fetch Error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch payments" },
            { status: 500 }
        );
    }
}