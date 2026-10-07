// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma"; // የፕሪስማ ኮኔክሽንዎ ያለበት ቦታ

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
//         const { title, description, price, category, images } = body;
//         // አዲስ ሩም በዳታቤዝ ውስጥ መፍጠር
//         const newRoom = await prisma.room.create({
//             data: {
    
//                 description,
//                 price: parseFloat(price),
//                 category,
//                 images,
//             },
//         });
//         return NextResponse.json({ success: true, room: newRoom }, { status: 201 });
//     } catch (error) {
//         return NextResponse.json({ success: false, error: "Failed to create room" }, { status: 500 });
//     }
// }