import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const payments = await prisma.booking.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({
            success: true,
            payments,
        });
    } catch (error) {
        console.error("Admin Payments Fetch Error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch payments." },
            { status: 500 }
        );
    }
}