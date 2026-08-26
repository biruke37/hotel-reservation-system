import { NextResponse } from "next/server";
// (ማስታወሻ: የፕሪዝማ (Prisma) ክትትል ካለዎት እዚህ ጋር ማስገባት ይቻላል፣ 
//  ለምሳሌ: import { db } from "@/lib/db"; )

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const tx_ref = searchParams.get("tx_ref");

        if (!tx_ref) {
            return NextResponse.redirect(new URL("/my-bookings?payment=failed", req.url));
        }

        const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;

        if (!CHAPA_SECRET_KEY) {
            throw new Error("Chapa Secret Key is not configured.");
        }

        // 1. Chapa APIን በማነጋገር የትራንዛክሽኑን ትክክለኛነት (Verification) ማረጋገጥ
        const verifyResponse = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
            },
        });

        const verifyData = await verifyResponse.json();

        if (verifyResponse.ok && verifyData.status === "success") {
            // ክፍያው ተሳክቷል! 
            // እዚህ ጋር የቦታ ማስያዣውን (Booking) ስታተስ በዳታቤዝ ውስጥ ወደ "PAID" ወይም "CONFIRMED" መቀየር ይቻላል።
            // ምሳሌ:
            // const bookingId = tx_ref.split("-")[2]; // ከ tx_ref ላይ bookingId ማውጣት
            // await db.booking.update({ where: { id: bookingId }, data: { status: "PAID" } });

            // ተጠቃሚው ወደሚፈልገው ገጽ (My Bookings) በስኬት እንዲመለስ ማድረግ
            return NextResponse.redirect(new URL("/my-bookings?payment=success", req.url));
        } else {
            // ክፍያው ሳይሳካ ቀርቷል ወይም ተቋርጧል
            return NextResponse.redirect(new URL("/my-bookings?payment=failed", req.url));
        }

    } catch (error: any) {
        console.error("Payment Verification Error:", error);
        return NextResponse.redirect(new URL("/my-bookings?payment=error", req.url));
    }
}