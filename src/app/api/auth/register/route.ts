
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// export const dynamic = "force-dynamic";
// export const runtime = "nodejs";

// export async function POST(req: Request) {
//     try {
//         const { name, email, password, gender } = await req.json();

//         // 1. መሰረታዊ የሆኑትን ስሞች ብቻ ማረጋገጥ (gender ከሌለ በራሱ እንዲሞላ)
//         if (!name || !email || !password) {
//             return NextResponse.json(
//                 { error: "Name, email, and password are required" },
//                 { status: 400 }
//             );
//         }

//         // Check if email already exists
//         const existingUser = await prisma.user.findUnique({
//             where: { email },
//         });

//         if (existingUser) {
//             return NextResponse.json(
//                 { error: "User with this email already exists" },
//                 { status: 400 }
//             );
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // 2. gender ካልመጣ "Male" ብሎ በራሱ እንዲያስገባ ማድረግ
//         const userGender = gender || "Male";

//         // Create new user
//         const user = await prisma.user.create({
//             data: {
//                 name,
//                 email,
//                 password: hashedPassword,
//                 role: "guest",
//                 gender: userGender,
//             },
//         });

//         return NextResponse.json(
//             { message: "User registered successfully", userId: user.id },
//             { status: 201 }
//         );
//     } catch (error) {
//         console.error("Registration Error:", error);
//         return NextResponse.json(
//             { error: "Registration failed" },
//             { status: 500 }
//         );
//     }
// }
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const { name, email, password, gender } = await req.json();

        // 1. መሰረታዊ የሆኑትን መስፈርቶች ማረጋገጥ
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

        // 2. gender ካልመጣ "Male" ብሎ በራሱ እንዲያስገባ ማድረግ
        const userGender = gender || "Male";

        // Create new user (role የተባለውን የተሳሳተ string አጥፍተነዋል፣ በስኬማው default customer ይሆናል)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                gender: userGender,
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