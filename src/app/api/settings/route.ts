import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const setting = await prisma.setting.findFirst();
    return NextResponse.json({ setting });
  } catch (err) {
    console.error("GET /api/settings error", err);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { theme, hotelName, contactEmail } = body;

    const data: any = {};
    if (theme !== undefined) {
      if (!["dark", "light"].includes(theme)) {
        return NextResponse.json({ error: "Invalid theme" }, { status: 400 });
      }
      data.theme = theme;
    }
    if (hotelName !== undefined) data.hotelName = hotelName;
    if (contactEmail !== undefined) data.contactEmail = contactEmail;

    // update or create setting
    const existing = await prisma.setting.findFirst();
    let updated;
    if (existing) {
      updated = await prisma.setting.update({ where: { id: existing.id }, data });
    } else {
      updated = await prisma.setting.create({ data: { hotelName: hotelName || "Hotel", contactEmail: contactEmail || "", ...data } });
    }

    return NextResponse.json({ ok: true, setting: updated });
  } catch (err) {
    console.error("PUT /api/settings error", err);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
