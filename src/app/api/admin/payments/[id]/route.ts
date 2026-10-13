import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 403 }
            );
        }

        const bookingId = params.id;

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                },
                room: {
                    select: {
                        id: true,
                        roomNumber: true,
                        type: true,
                        pricePerNight: true,
                        description: true,
                        images: true,
                    },
                },
                payment: true,
            },
        });

        if (!booking) {
            return NextResponse.json(
                { success: false, message: "Booking not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: booking,
        });
    } catch (error) {
        console.error("Booking Fetch Error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch booking" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 403 }
            );
        }

        const bookingId = params.id;
        const data = await request.json();
        const { status, adminNotes } = data;

        // Validate status
        const validStatuses = ["PENDING_PAYMENT", "PENDING_APPROVAL", "CONFIRMED", "REJECTED"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, message: "Invalid status" },
                { status: 400 }
            );
        }

        // Check if booking exists
        const existingBooking = await prisma.booking.findUnique({
            where: { id: bookingId },
        });

        if (!existingBooking) {
            return NextResponse.json(
                { success: false, message: "Booking not found" },
                { status: 404 }
            );
        }

        // Update booking status
        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: {
                status,
                adminNotes: adminNotes || null,
            },
        });

        return NextResponse.json({
            success: true,
            message: `Booking ${status.toLowerCase()}ed successfully`,
            data: updatedBooking,
        });
    } catch (error) {
        console.error("Booking Update Error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update booking" },
            { status: 500 }
        );
    }
}