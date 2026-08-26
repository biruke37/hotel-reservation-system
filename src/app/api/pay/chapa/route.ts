import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { amount, email, firstName, lastName, phone, txRef, roomId } = body;

        const chapaPayload = {
            amount: amount.toString(),
            currency: "ETB",
            email: email || "customer@hotelhub.com",
            first_name: firstName,
            last_name: lastName,
            phone_number: phone,
            tx_ref: txRef,
            callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook/chapa`,
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?tx_ref=${txRef}&room=${roomId}`,
            customization: {
                title: "HotelHub Reservation",
                description: "Payment for hotel room booking",
            },
        };

        const response = await fetch("https://api.chapa.global/v2/payments/hosted", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(chapaPayload),
        });

        const data = await response.json();

        if (data.status === "success") {
            return NextResponse.json({ checkout_url: data.data.checkout_url });
        } else {
            return NextResponse.json(
                { error: data.message || "Failed to initialize Chapa payment" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Chapa Payment Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}