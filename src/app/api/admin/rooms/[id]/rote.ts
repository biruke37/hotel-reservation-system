import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const updatedRoom = await prisma.room.update({
            where: { id: params.id },
            data: {
                ...body,
                pricePerNight: body.pricePerNight ? parseFloat(body.pricePerNight) : undefined,
            },
        });
        return NextResponse.json(updatedRoom);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.room.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: "Room deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete room" }, { status: 500 });
    }
}