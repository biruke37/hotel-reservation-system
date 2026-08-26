import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { bookingId, email, firstName, lastName, phone, amount } = body;

        if (!bookingId || !email || !amount) {
            return NextResponse.json({ error: "Missing required payment details" }, { status: 400 });
        }

        const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY; // በ .env ፋይል ውስጥ የሚቀመጥ ኪይ
        const tx_ref = `booking-${bookingId}-${Date.now()}`;

        // 1. የ Chapa API  रिक्वेस्ट ማዘጋጀት
        const response = await fetch("https://api.chapa.co/v1/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: amount.toString(),
                currency: "ETB", // ወይም USD እንደ ሲስተምዎ
                email,
                first_name: firstName || "Guest",
                last_name: lastName || "User",
                phone_number: phone || "0911000000",
                tx_ref,
                callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/verify?tx_ref=${tx_ref}&bookingId=${bookingId}`,
                return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
                "customization[title]": "Hotel Room Reservation",
                "customization[description]": "Payment for hotel room booking",
            }),
        });

        const data = await response.json();

        if (data.status !== "success") {
            return NextResponse.json({ error: data.message || "Failed to initialize Chapa payment" }, { status: 400 });
        }

        // 2. tx_ref ን በ Database ውስጥ ከቡኪንግ ጋር ማስቀመጥ (ለማረጋገጫ ይጠቅማል)
        await prisma.booking.update({
            where: { id: bookingId },
            data: {
                // እንደ Prisma Schema-ዎ fieldname ሊለያይ ይችላል (ለምሳሌ: paymentRef: tx_ref)
            }
        });

        // 3. የ Chapa checkout_url ን ለ Frontend መመለስ
        return NextResponse.json({ checkout_url: data.data.checkout_url });

    } catch (error) {
        console.error("Chapa error:", error);
        return NextResponse.json({ error: "Internal server error during payment" }, { status: 500 });
    }
}