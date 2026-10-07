import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const bookingId = formData.get("bookingId") as string;
        const paymentMethod = formData.get("paymentMethod") as string;
        const transactionId = formData.get("transactionId") as string;
        const receiptFile = formData.get("receipt") as File;

        if (!bookingId || !transactionId || !receiptFile) {
            return NextResponse.json(
                { success: false, message: "no full data።" },
                { status: 400 }
            );
        }

        // 1. የትራንዛክሽን ቁጥሩ ድጋሚ እንዳይገባ ማረጋገጥ
        const existingPayment = await prisma.payment.findUnique({
            where: { transactionId },
        });

        if (existingPayment) {
            return NextResponse.json(
                { success: false, message: "this receipt after seccess።" },
                { status: 400 }
            );
        }

        // 2. ፋይሉን (ስክሪንሾት) ወደ ሰርቨር public/uploads ፎልደር ማስቀመጥ
        const bytes = await receiptFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${receiptFile.name.replaceAll(" ", "_")}`;
        const uploadDir = path.join(process.cwd(), "public/uploads");

        await writeFile(path.join(uploadDir, filename), buffer);
        const receiptUrl = `/uploads/${filename}`;

        // 3. መረጃውን ዳታቤዝ ውስጥ ማስቀመጥ (Save to Database)
        const payment = await prisma.payment.create({
            data: {
                bookingId,
                paymentMethod: paymentMethod === "telebirr" ? "TELEBIRR" : "CBE",
                transactionId,
                receiptUrl,
                status: "PENDING",
            },
        });

        // የቦኪንግ ስቴተስን ማዘመን
        await prisma.booking.update({
            where: { id: bookingId },
            data: { status: "PENDING_APPROVAL" },
        });

        return NextResponse.json({
            success: true,
            message: "payment successfully!",
            payment,
        });

    } catch (error) {
        console.error("Payment save error:", error);
        return NextResponse.json(
            { success: false, message: "server error።" },
            { status: 500 }
        );
    }
}