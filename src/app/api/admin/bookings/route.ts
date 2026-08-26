import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const { status } = await req.json(); // e.g. "CONFIRMED" | "CANCELLED"
        const booking = await prisma.booking.update({
            where: { id: params.id },
            data: { status },
        });
        return NextResponse.json(booking);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update booking status" }, { status: 500 });
    }
}