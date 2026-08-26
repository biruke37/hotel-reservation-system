import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
    // 1. Create Demo Admin User
    const hashedPassword = await bcrypt.hash("password123", 10);

    const admin = await prisma.user.upsert({
        where: { email: "Biruk@hotelhub.com" },
        update: {},
        create: {
            email: "admin@gmail.com",
            name: "Hotel Admin",
            password: hashedPassword,
            role: Role.admin,
        },
    });
    // 2. Create Demo Room
    const room1 = await prisma.room.upsert({
        where: { roomNumber: "501" },
        update: {},
        create: {
            roomNumber: "501",
            type: "Presidential Suite",
            pricePerNight: 500,
            description: "Top tier luxury suite with breathtaking view",
            images: [
                https://www.gettyimages.com/detail/photo/receptionist-working-at-hotel-desk-providing-royalty-free-image/2268419814?slot=1,
            ],
            amenities: ["WiFi", "Pool View", "King Bed", "Jacuzzi"],
            isAvailable: true,
        },
    });

    console.log("Seeding completed successfully!");
    console.log({ admin, room1 });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });