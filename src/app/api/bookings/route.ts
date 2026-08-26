import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, roomId, checkInDate, checkOutDate, totalPrice, paymentMethod, email, firstName, lastName, phone } = body;

        if (!userId || !roomId || !checkInDate || !checkOutDate || !totalPrice || !paymentMethod) {
            return NextResponse.json({ error: "Missing required booking or payment details" }, { status: 400 });
        }

        // 1. ቡኪንጉን በዳታቤዝ ውስጥ Pending በሚል ስቴተስ ማስቀመጥ
        const booking = await prisma.booking.create({
            data: {
                userId,
                roomId,
                checkInDate: new Date(checkInDate),
                checkOutDate: new Date(checkOutDate),
                totalPrice: parseFloat(totalPrice),
                status: "Pending",
            },
        });

        const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
        const tx_ref = `HOTEL-${paymentMethod.toUpperCase()}-${booking.id}-${Date.now()}`;

        // 2. Chapa API በመጠቀም ክፍያውን ማዘጋጀት (Chapa Telebirr እና CBE Birrን ይደግፋል)
        const chapaResponse = await fetch("https://api.chapa.co/v1/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: totalPrice.toString(),
                currency: "ETB",
                email: email || "customer@hotel.com",
                first_name: firstName || "Biruk",
                last_name: lastName || "Zele",
                phone_number: phone || "0911223344",
                tx_ref,
                callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/verify?bookingId=${booking.id}`,
                return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
                "customization[title]": `Hotel Booking via ${paymentMethod}`,
                "customization[description]": `Payment using ${paymentMethod}`,
            }),
        });

        const chapaData = await chapaResponse.json();

        if (chapaData.status !== "success") {
            return NextResponse.json({ error: chapaData.message || "Payment initialization failed" }, { status: 400 });
        }

        return NextResponse.json({ 
            success: true, 
            booking, 
            checkout_url: chapaData.data.checkout_url 
        }, { status: 201 });

    } catch (error) {
        console.error("Booking & Payment Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}