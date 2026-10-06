import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// አድሚኑ አፕሩቭ ወይም ሪጀክት ሲያደርግ (PATCH)
export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const paymentId = params.id;
        const { status, adminNotes } = await req.json(); // status: "APPROVED" ወይም "REJECTED"

        // 1. የክፍያውን ስቴተስ ማዘመን
        const updatedPayment = await prisma.payment.update({
            where: { id: paymentId },
            data: {
                status: status,
                adminNotes: adminNotes || null,
            },
            include: { booking: true },
        });

        // 2. የቦኪንግ ስቴተስንም እንደ አድሚኑ ውሳኔ መቀየር
        const newBookingStatus = status === "APPROVED" ? "CONFIRMED" : "REJECTED";
        await prisma.booking.update({
            where: { id: updatedPayment.bookingId },
            data: { status: newBookingStatus },
        });

        return NextResponse.json({
            success: true,
            message: `ክፍያው በተሳካ ሁኔታ ተስተካክሏል: ${status}`,
            updatedPayment,
        });
    } catch (error) {
        console.error("Admin action error:", error);
        return NextResponse.json(
            { success: false, message: "እርምጃውን መፈጸም አልተቻለም።" },
            { status: 500 }
        );
    }
}