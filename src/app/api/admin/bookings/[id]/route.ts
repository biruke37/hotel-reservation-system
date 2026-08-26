import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const { status } = await req.json();

        const booking = await prisma.booking.update({
            where: { id: params.id },
            data: { status }, // Confirmed | Cancelled | CheckedIn | CheckedOut
        });

        return NextResponse.json(booking);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update booking status" }, { status: 500 });
    }
}