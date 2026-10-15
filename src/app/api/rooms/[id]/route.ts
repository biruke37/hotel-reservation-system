import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const room = await prisma.room.findUnique({
      where: { id: params.id },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error("GET /api/rooms/[id] error", error);
    return NextResponse.json({ error: "Failed to fetch room details" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data: any = {};
    if (body.title !== undefined) data.title = body.title;
    if (body.description !== undefined) data.description = body.description;
    if (body.pricePerNight !== undefined) data.pricePerNight = parseFloat(body.pricePerNight);
    if (body.images !== undefined) data.images = Array.isArray(body.images) ? body.images : [];
    if (body.amenities !== undefined) data.amenities = Array.isArray(body.amenities) ? body.amenities.join(", ") : body.amenities;
    if (body.isAvailable !== undefined) data.isAvailable = body.isAvailable;
    if (body.type !== undefined) data.type = body.type;

    const updated = await prisma.room.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/rooms/[id] error", error);
    return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.room.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/rooms/[id] error", error);
    return NextResponse.json({ error: "Failed to delete room" }, { status: 500 });
  }
}
