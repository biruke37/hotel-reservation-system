// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//     function middleware(req) {
//         const token = req.nextauth.token;
//         const isAccessingAdmin = req.nextUrl.pathname.startsWith("/admin");

//         // If trying to access /admin but user is not an admin, redirect to homepage
//         if (isAccessingAdmin && token?.role !== "admin") {
//             return NextResponse.redirect(new URL("/", req.url));
//         }
//     },
//     {
//         callbacks: {
//             // Ensures the user is logged in before entering the middleware function
//             authorized: ({ token }) => !!token,
//         },
//     }
// );

// // Matcher to protect all routes under /admin
// export const config = {
//     matcher: ["/admin/:path*"],
// };
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

        // Token ወይም user role እኩል ከ "admin" ካልሆነ ወደ home ገጽ redirect አድርገው
        if (isAdminRoute && token?.role !== "admin") {
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