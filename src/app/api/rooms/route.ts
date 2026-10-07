import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            title,
            description,
            pricePerNight,
            category,
            images,
            roomNumber,
            type,
            amenities
        } = body;

        // new room create from database with all required schema fields
        const newRoom = await prisma.room.create({
            data: {
                title,
                description,
                pricePerNight: parseFloat(pricePerNight),
                category,
                images: images || [],
                roomNumber: roomNumber || `ROOM-${Date.now()}`, // ካልተሰጠ አውቶማቲክ ኑበር መስጠት
                type: type || "Standard",
                amenities: amenities || "WiFi, TV",
            },
        });

        return NextResponse.json({ success: true, room: newRoom }, { status: 201 });
    } catch (error: any) {
        console.error("Create Room Error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to create room" },
            { status: 500 }
        );
    }
}