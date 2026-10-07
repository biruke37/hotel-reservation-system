import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, gender } = body;

        // 1. Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        // 2. Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        // 3. Hash password safely
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user in database
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                gender: gender || "Male",
                role: "CUSTOMER", // በ schema ላይ እንዳለው
            },
        });

        return NextResponse.json(
            { message: "User registered successfully", userId: newUser.id },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Registration Error:", error);
        return NextResponse.json(
            { error: error.message || "Registration failed" },
            { status: 500 }
        );
    }
}