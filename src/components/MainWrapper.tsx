"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");

    // Admin Route ከሆነ Navbar እና Footer ሳይኖሩ Children-ን ብቻ ያሳያል
    if (isAdminRoute) {
        return <>{children}</>;
    }

    // Regular Page (User Page) ከሆነ Navbar እና Footer ያሳያል
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}