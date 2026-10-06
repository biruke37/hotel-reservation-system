import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const bookingId = params.id;

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
        });

        if (!booking) {
            return NextResponse.json(
                { success: false, message: "ቦኪንግ አልተገኘም" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            booking,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "መረጃውን ማምጣት አልተቻለም" },
            { status: 500 }
        );
    }
}