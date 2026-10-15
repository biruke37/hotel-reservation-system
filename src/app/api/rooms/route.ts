import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const onlyAvailable = url.searchParams.get("available") === "true";
    const take = Number(url.searchParams.get("take") ?? 12);

    const where: any = {};
    if (onlyAvailable) where.isAvailable = true;

    const rooms = await prisma.room.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take,
      select: {
        id: true,
        roomNumber: true,
        title: true,
        type: true,
        pricePerNight: true,
        images: true,
        isAvailable: true,
        description: true,
        amenities: true,
      },
    });

    return NextResponse.json({ rooms }, { status: 200 });
  } catch (err) {
    console.error("GET /api/rooms error", err);
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // Only admin can create rooms
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
      amenities,
      isAvailable,
    } = body;

    const newRoom = await prisma.room.create({
      data: {
        title,
        description: description || "",
        pricePerNight: parseFloat(pricePerNight as any) || 0,
        category,
        images: images || [],
        roomNumber: roomNumber || `ROOM-${Date.now()}`,
        type: type || "Standard",
        amenities: Array.isArray(amenities) ? amenities.join(", ") : amenities || "",
        isAvailable: typeof isAvailable === "boolean" ? isAvailable : true,
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
