import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const tx_ref = searchParams.get("tx_ref");

        if (!tx_ref) {
            return NextResponse.json({ success: false, message: "Transaction reference is missing" }, { status: 400 });
        }

        const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;

        if (!CHAPA_SECRET_KEY) {
            return NextResponse.json({ success: false, message: "Server configuration error: Chapa key missing" }, { status: 500 });
        }

        // Chapa Verify API Call
        const response = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.status === "success" || data.data?.status === "success") {
            // ክፍያው በትክክል ተሰጥቷል! 
            // እዚህ ጋር የፈለጉትን የዴታቤዝ (Prisma) ማስተካከያ ማድረግ ይችላሉ (ለምሳሌ: status = 'Confirmed')
            return NextResponse.json({ success: true, data: data.data });
        } else {
            return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}