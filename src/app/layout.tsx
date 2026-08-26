import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import MainWrapper from "@/components/MainWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HotelHub — Luxury Hotel Reservations",
  description: "Book premium stays, manage reservations, and enjoy exclusive member benefits with HotelHub.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* 1. suppressHydrationWarning እና dark class እዚህ ተጨምሯል */
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      {/* 2. flex flex-col እና dark:bg-slate-950 ተጨምሯል */}
      <body
        className={`${inter.className} font-sans bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased min-h-screen flex flex-col m-0 p-0 overflow-x-hidden`}
      >
        <Providers>
          {/* MainWrapper flex-1 እንዲሆን ማረጋገጥ ገፁ አጭር ቢሆንም Footerን ወደ ታች ይገፋዋል */}
          <MainWrapper>{children}</MainWrapper>
        </Providers>
      </body>
    </html>
  );
}