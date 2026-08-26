import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const booking = await prisma.booking.findUnique({
            where: { id: params.id },
            include: {
                room: true,
                user: { select: { name: true, email: true } },
            },
        });

        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        return NextResponse.json(booking);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
    }
}

// User side cancellation
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const updatedBooking = await prisma.booking.update({
            where: { id: params.id },
            data: { status: "Cancelled" },
        });

        return NextResponse.json(updatedBooking);
    } catch (error) {
        return NextResponse.json({ error: "Failed to cancel booking" }, { status: 500 });
    }
}