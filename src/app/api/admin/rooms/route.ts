import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get all rooms for admin
export async function GET() {
    try {
        const rooms = await prisma.room.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(rooms);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
    }
}

// Create new room
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { roomNumber, type, pricePerNight, description, images, amenities, isAvailable } = body;

        if (!roomNumber || !type || !pricePerNight) {
            return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
        }

        const room = await prisma.room.create({
            data: {
                roomNumber,
                type,
                pricePerNight: parseFloat(pricePerNight),
                description: description || "",
                images: images || [],
                amenities: amenities || [],
                isAvailable: isAvailable ?? true,
            },
        });

        return NextResponse.json(room, { status: 201 });
    } catch (error) {
        console.error("Create room error:", error);
        return NextResponse.json({ error: "Failed to create room" }, { status: 500 });
    }
}