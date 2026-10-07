import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

        // "admin" የሚለውን ወደ "ADMIN" መቀየር
        if (isAdminRoute && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        secret: process.env.NEXTAUTH_SECRET,
    }
);

export const config = {
    matcher: ["/admin/:path*"],
};