import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        // gender የሚለውን እዚህ ጋር ጨምረን ተቀበልን
        const { name, email, password, gender } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user (gender ን እዚህ ጋር ጨመርነው)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "guest",
                gender: gender || null, // ጂንደሩ ካለ ያስገባል፣ ከሌለ ግን null አድርጎ ይቀመጣል
            },
        });

        return NextResponse.json(
            { message: "User registered successfully", userId: user.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json(
            { error: "Registration failed" },
            { status: 500 }
        );
    }
}