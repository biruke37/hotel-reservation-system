import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import MainWrapper from "@/components/MainWrapper";
import { prisma } from "@/lib/prisma";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HotelHub — Luxury Hotel Reservations",
  description: "Book premium stays, manage reservations, and enjoy exclusive member benefits with HotelHub.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // read site setting for default theme
  const setting = await prisma.setting.findFirst();
  const defaultTheme = setting?.theme === "light" ? "light" : "dark";

  return (
    <html lang="en" className={`${inter.variable} ${defaultTheme === "dark" ? "dark" : ""}`} suppressHydrationWarning>
      <body
        className={`${inter.className} font-sans bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased min-h-screen flex flex-col m-0 p-0 overflow-x-hidden`}
      >
        <Providers>
          <MainWrapper>{children}</MainWrapper>
        </Providers>
      </body>
    </html>
  );
}
