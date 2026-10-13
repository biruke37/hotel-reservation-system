import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/app/api/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 403 }
            );
        }

        const settings = await prisma.setting.findFirst();

        return NextResponse.json({
            success: true,
            data: settings || {
                hotelName: "HotelHub Luxury",
                contactEmail: "biru@gmail.com",
                phone: "+251946309932",
                address: "Desse , Addis Ababa, Woldia",
                currency: "ETB",
                checkInTime: "14:00",
                checkOutTime: "11:00",
                taxRate: 15,
                cancellationPolicy: "24_hours",
                autoConfirm: false,
                emailAlerts: true,
                newBookingNotify: true,
                cancellationNotify: true,
                dailyReports: false,
            },
        });
    } catch (error) {
        console.error("Settings Fetch Error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch settings" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const session = await auth();

        if (!session?.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 403 }
            );
        }

        const data = await request.json();
        const {
            hotelName,
            contactEmail,
            phone,
            address,
            currency,
            checkInTime,
            checkOutTime,
            taxRate,
            cancellationPolicy,
            autoConfirm,
            emailAlerts,
            newBookingNotify,
            cancellationNotify,
            dailyReports,
        } = data;

        // Validation
        if (!hotelName || !contactEmail) {
            return NextResponse.json(
                { success: false, message: "Hotel name and contact email are required" },
                { status: 400 }
            );
        }

        // Check if email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contactEmail)) {
            return NextResponse.json(
                { success: false, message: "Invalid email format" },
                { status: 400 }
            );
        }

        // Check if taxRate is a valid number
        if (isNaN(Number(taxRate)) || Number(taxRate) < 0 || Number(taxRate) > 100) {
            return NextResponse.json(
                { success: false, message: "Invalid tax rate (must be 0-100)" },
                { status: 400 }
            );
        }

        const settings = await prisma.setting.findFirst();

        let updatedSettings;
        if (settings) {
            updatedSettings = await prisma.setting.update({
                where: { id: settings.id },
                data: {
                    hotelName,
                    contactEmail,
                    phone,
                    address,
                    currency,
                    checkInTime,
                    checkOutTime,
                    taxRate: Number(taxRate),
                    cancellationPolicy,
                    autoConfirm: Boolean(autoConfirm),
                    emailAlerts: Boolean(emailAlerts),
                    newBookingNotify: Boolean(newBookingNotify),
                    cancellationNotify: Boolean(cancellationNotify),
                    dailyReports: Boolean(dailyReports),
                },
            });
        } else {
            updatedSettings = await prisma.setting.create({
                data: {
                    hotelName,
                    contactEmail,
                    phone,
                    address,
                    currency,
                    checkInTime,
                    checkOutTime,
                    taxRate: Number(taxRate),
                    cancellationPolicy,
                    autoConfirm: Boolean(autoConfirm),
                    emailAlerts: Boolean(emailAlerts),
                    newBookingNotify: Boolean(newBookingNotify),
                    cancellationNotify: Boolean(cancellationNotify),
                    dailyReports: Boolean(dailyReports),
                },
            });
        }

        return NextResponse.json({
            success: true,
            message: "Settings updated successfully",
            data: updatedSettings,
        });
    } catch (error) {
        console.error("Settings Update Error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update settings" },
            { status: 500 }
        );
    }
}
