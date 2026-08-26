import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { bookingId, totalPrice, paymentMethod, firstName, lastName, email, phone } = body;

        if (!bookingId || !totalPrice || !email) {
            return NextResponse.json(
                { error: "Missing required payment fields" },
                { status: 400 }
            );
        }

        if ((paymentMethod === "telebirr" || paymentMethod === "cbe") && !phone) {
            return NextResponse.json(
                { error: `Phone number is required for ${paymentMethod.toUpperCase()}` },
                { status: 400 }
            );
        }

        const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;

        if (!CHAPA_SECRET_KEY) {
            return NextResponse.json(
                { error: "Chapa Secret Key is not configured in server environment." },
                { status: 500 }
            );
        }

        const tx_ref = `hotel-booking-${bookingId}-${Date.now()}`;

        const chapaPayload = {
            amount: totalPrice.toString(),
            currency: "ETB",
            email: email,
            first_name: firstName,
            last_name: lastName,
            phone_number: phone || "",
            tx_ref: tx_ref,
            callback_url: `${process.env.NEXTAUTH_URL}/api/payment/verify?tx_ref=${tx_ref}`,
            return_url: `${process.env.NEXTAUTH_URL}/my-bookings?payment=success`,
            customization: {
                title: "Hotel Booking", // ከ 16 ፊደል በታች የሆነ ርዕስ (13 ፊደል ብቻ)
                description: `Room Payment`, // ልዩ ምልክቶችን (যেমন #) ያላካተተ ቀላል መግለጫ
            },
        };

        const chapaResponse = await fetch("https://api.chapa.co/v1/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(chapaPayload),
        });

        const chapaData = await chapaResponse.json();

        // ቻፓ ስህተት ከሰጠ የትኛውን መልእክት መላክ እንዳለበት ማረጋገጥ
        if (!chapaResponse.ok || chapaData.status !== "success") {
            const errorMsg = chapaData.message || "Failed to initialize payment with Chapa";
            return NextResponse.json(
                { error: typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg) },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            checkout_url: chapaData.data.checkout_url,
        });

    } catch (error: any) {
        console.error("Payment Initialization Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error during payment processing" },
            { status: 500 }
        );
    }
}