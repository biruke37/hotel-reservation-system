
// import Link from "next/link";
// import type { ReactNode } from "react";
// import {
//     Hotel,
//     Phone,
//     Mail,
//     MapPin,
//     Clock,
//     ShieldCheck,
//     CreditCard,
//     Headphones,
//     ArrowRight,
// } from "lucide-react";

// /* ─────────────────── Social Icons ─────────────────── */
// function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
//     return (
//         <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
//             <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
//         </svg>
//     );
// }

// function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
//     return (
//         <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
//             <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//         </svg>
//     );
// }

// function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
//     return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//             <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
//             <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
//             <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
//         </svg>
//     );
// }

// function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
//     return (
//         <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
//             <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
//         </svg>
//     );
// }

// /* ─────────────────── Payment Icons ─────────────────── */
// function VisaIcon(props: React.SVGProps<SVGSVGElement>) {
//     return (
//         <svg viewBox="0 0 36 24" width="36" height="24" fill="none" {...props}>
//             <rect width="36" height="24" rx="4" fill="#1434CB" />
//             <path d="M13.54 16.5h-2.18l1.36-8.44h2.18l-1.36 8.44zm7.65-8.24c-.43-.17-1.1-.35-1.93-.35-2.13 0-3.63 1.13-3.64 2.74-.02 1.2 1.07 1.87 1.89 2.27.84.41 1.13.67 1.12 1.04-.01.56-.67.81-1.29.81-.86 0-1.32-.13-2.02-.44l-.28-.13-.3 1.87c.51.23 1.44.43 2.41.44 2.27 0 3.75-1.12 3.77-2.86.01-.95-.57-1.68-1.82-2.28-.76-.39-1.22-.65-1.21-1.05 0-.35.39-.72 1.24-.72.7 0 1.22.15 1.62.32l.2.09.32-1.82zm5.72 8.24h1.9l-1.66-8.44h-1.75c-.39 0-.73.23-.88.58l-3.1 7.86h2.29l.46-1.26h2.8l.26 1.26zm-2.43-2.92l1.15-3.16.66 3.16h-1.81zM11.23 8.06L9.15 13.82l-.22-1.11c-.39-1.32-1.6-2.75-2.96-3.47l1.92 7.26h2.32l3.45-8.44h-2.43z" fill="#FFFFFF" />
//         </svg>
//     );
// }

// function MastercardIcon(props: React.SVGProps<SVGSVGElement>) {
//     return (
//         <svg viewBox="0 0 36 24" width="36" height="24" fill="none" {...props}>
//             <rect width="36" height="24" rx="4" fill="#252525" />
//             <circle cx="14" cy="12" r="7" fill="#EB001B" />
//             <circle cx="22" cy="12" r="7" fill="#F79E1B" fillOpacity="0.9" />
//         </svg>
//     );
// }

// function PaypalIcon(props: React.SVGProps<SVGSVGElement>) {
//     return (
//         <svg viewBox="0 0 36 24" width="36" height="24" fill="none" {...props}>
//             <rect width="36" height="24" rx="4" fill="#003087" />
//             <path d="M22.3 8.3c-.4 1.8-1.7 2.8-3.6 2.8h-1.8l-.9 5.7h-2.3l1.7-10.7h4.1c1.8 0 2.9.8 2.8 2.2zm-3.3 0c0-.6-.5-.9-1.2-.9h-1.2l-.6 3.6h1.2c.8 0 1.5-.3 1.8-1.1.2-.5.1-1.1 0-1.6z" fill="#0079C1" />
//             <path d="M20.2 10.1c-.4 1.8-1.7 2.8-3.6 2.8h-1.8l-.9 5.7h-2.3l1.7-10.7h4.1c1.8 0 2.9.8 2.8 2.2zm-3.3 0c0-.6-.5-.9-1.2-.9h-1.2l-.6 3.6h1.2c.8 0 1.5-.3 1.8-1.1.2-.5.1-1.1 0-1.6z" fill="#00457C" />
//         </svg>
//     );
// }

// function CbeIcon(props: React.SVGProps<SVGSVGElement>) {
//     return (
//         <svg viewBox="0 0 36 24" width="36" height="24" fill="none" {...props}>
//             <rect width="36" height="24" rx="4" fill="#6B21A8" />
//             <path d="M12 6h12v3H12zm0 4.5h12v3H12zm0 4.5h12v3H12z" fill="#FACC15" />
//             <circle cx="8" cy="12" r="2.5" fill="#FACC15" />
//         </svg>
//     );
// }

// function TelebirrIcon(props: React.SVGProps<SVGSVGElement>) {
//     return (
//         <svg viewBox="0 0 36 24" width="36" height="24" fill="none" {...props}>
//             <rect width="36" height="24" rx="4" fill="#0080FF" />
//             <path d="M10 8h16v2.5H19.5V17H16.5V10.5H10V8z" fill="#FFFFFF" />
//             <path d="M23 12.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" fill="#7C3AED" />
//         </svg>
//     );
// }

// /* ────────────────────────── Footer Data ────────────────────────── */
// const trustBadges = [
//     { icon: ShieldCheck, title: "Guaranteed Reservation", desc: "Instant confirmation, 100% secure" },
//     { icon: CreditCard, title: "No Hidden Fees", desc: "Transparent, all-inclusive pricing" },
//     { icon: Headphones, title: "24/7 Customer Service", desc: "Real people, whenever you need" },
// ];

// const quickLinks = [
//     { name: "Rooms & Suites", href: "/rooms" },
//     { name: "My Bookings", href: "/bookings" },
//     { name: "About Us", href: "/about" },
//     { name: "Contact Us", href: "/contact" },
// ];

// const supportLinks = [
//     { name: "Help Center", href: "/help" },
//     { name: "Cancellation Policy", href: "/cancellation" },
//     { name: "Privacy Policy", href: "/privacy" },
//     { name: "Terms of Service", href: "/terms" },
// ];

// const contactInfo = [
//     { icon: Phone, label: "Phone", value: "+251 995 886 777" },
//     { icon: Mail, label: "Email", value: "reserve@gmail.com" },
//     { icon: MapPin, label: "Address", value: "Addis Ababa, Ethiopia" },
//     { icon: Clock, label: "Front Desk", value: "Check-in 2 PM · Check-out 11 AM" },
// ];

// const socials = [
//     { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
//     { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
//     { icon: TwitterIcon, label: "Twitter", href: "https://twitter.com" },
//     { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com" },
// ];

// const paymentMethods = [
//     { name: "Visa", icon: VisaIcon, href: "/cancellation#payment-methods" },
//     { name: "MasterCard", icon: MastercardIcon, href: "/cancellation#payment-methods" },
//     { name: "PayPal", icon: PaypalIcon, href: "/cancellation#payment-methods" },
//     { name: "CBE Birr", icon: CbeIcon, href: "/cancellation#payment-methods" },
//     { name: "Telebirr", icon: TelebirrIcon, href: "/cancellation#payment-methods" },
// ];

// /* ────────────────────────── Section Heading ────────────────────── */
// function SectionHeading({ children }: { children: ReactNode }) {
//     return (
//         <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white">
//             <span className="h-0.5 w-6 rounded-full bg-blue-500" aria-hidden="true" />
//             {children}
//         </h3>
//     );
// }

// /* ───────────────────────────── Footer Component ──────────────────────────── */
// export default function Footer() {
//     const year = new Date().getFullYear();

//     return (
//         /* Professional Dark Navy Background (bg-slate-900) */
//         <footer className="w-full bg-slate-900 text-slate-300">
//             {/* ── Trust Badges Strip ── */}
//             <div className="border-b border-slate-800">
//                 <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                     <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
//                         {trustBadges.map(({ icon: Icon, title, desc }) => (
//                             <div key={title} className="flex items-center gap-3">
//                                 <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
//                                     <Icon className="h-5 w-5" />
//                                 </span>
//                                 <div>
//                                     <p className="text-sm font-semibold text-white">{title}</p>
//                                     <p className="text-xs text-slate-400">{desc}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* ── Main Footer Body ── */}
//             <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
//                 <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
//                     {/* Brand Info */}
//                     <div className="lg:col-span-4">
//                         <Link href="/" className="group flex items-center gap-2.5">
//                             <span className="rounded-xl bg-blue-600 p-2 text-white transition-colors group-hover:bg-blue-500">
//                                 <Hotel className="h-5 w-5" />
//                             </span>
//                             <span className="text-xl font-bold tracking-tight text-white">
//                                 HotelHub
//                             </span>
//                         </Link>

//                         <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
//                             Find and book your perfect stay — guaranteed reservations,
//                             transparent pricing and round-the-clock support.
//                         </p>

//                         <div className="mt-6 flex items-center gap-3">
//                             {socials.map(({ icon: Icon, label, href }) => (
//                                 <a
//                                     key={label}
//                                     href={href}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     aria-label={label}
//                                     className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-800/50 text-slate-400 transition-all hover:border-blue-500 hover:bg-blue-600 hover:text-white"
//                                 >
//                                     <Icon className="h-4 w-4" />
//                                 </a>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Explore Links */}
//                     <div className="lg:col-span-2">
//                         <SectionHeading>Explore</SectionHeading>
//                         <ul className="mt-5 space-y-3">
//                             {quickLinks.map((link) => (
//                                 <li key={link.name}>
//                                     <Link
//                                         href={link.href}
//                                         className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
//                                     >
//                                         <span className="h-1.5 w-1.5 rounded-full bg-blue-500 transition-colors group-hover:bg-blue-400" />
//                                         {link.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Support Links */}
//                     <div className="lg:col-span-2">
//                         <SectionHeading>Support</SectionHeading>
//                         <ul className="mt-5 space-y-3">
//                             {supportLinks.map((link) => (
//                                 <li key={link.name}>
//                                     <Link
//                                         href={link.href}
//                                         className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
//                                     >
//                                         <span className="h-1.5 w-1.5 rounded-full bg-blue-500 transition-colors group-hover:bg-blue-400" />
//                                         {link.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Contact & Newsletter */}
//                     <div className="lg:col-span-4">
//                         <SectionHeading>Get in Touch</SectionHeading>
//                         <ul className="mt-5 space-y-4">
//                             {contactInfo.map(({ icon: Icon, label, value }) => (
//                                 <li key={label} className="flex items-center gap-3">
//                                     <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-800/50 text-blue-400">
//                                         <Icon className="h-4 w-4" />
//                                     </span>
//                                     <div>
//                                         <p className="text-xs text-slate-400">{label}</p>
//                                         <p className="text-sm font-medium text-white">{value}</p>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>

//                         <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
//                             <label
//                                 htmlFor="newsletter-email"
//                                 className="text-sm font-medium text-white"
//                             >
//                                 Exclusive deals, straight to your inbox
//                             </label>
//                             <div className="mt-2.5 flex overflow-hidden rounded-lg border border-slate-800 bg-slate-800/50 transition-colors focus-within:border-blue-500">
//                                 <input
//                                     id="newsletter-email"
//                                     type="email"
//                                     required
//                                     placeholder="you@example.com"
//                                     className="w-full bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500"
//                                 />
//                                 <button
//                                     type="submit"
//                                     aria-label="Subscribe"
//                                     className="shrink-0 bg-blue-600 px-4 text-white transition-colors hover:bg-blue-500"
//                                 >
//                                     <ArrowRight className="h-4 w-4" />
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>

//             {/* ── Bottom Bar ── */}
//             <div className="border-t border-slate-800 bg-slate-950/40">
//                 <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                     <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
//                         <p className="text-xs text-slate-400">
//                             © {year}{" "}
//                             <span className="font-semibold text-white">HotelHub</span>. All
//                             rights reserved.
//                         </p>

//                         <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
//                             <nav className="flex items-center gap-6 text-xs text-slate-400">
//                                 <Link href="/privacy" className="transition-colors hover:text-white">
//                                     Privacy
//                                 </Link>
//                                 <Link href="/terms" className="transition-colors hover:text-white">
//                                     Terms
//                                 </Link>
//                                 <Link href="/contact" className="transition-colors hover:text-white">
//                                     Support
//                                 </Link>
//                             </nav>

//                             <span
//                                 className="hidden h-4 w-px bg-slate-800 sm:block"
//                                 aria-hidden="true"
//                             />

//                             {/* Payment Methods Badges */}
//                             <div className="flex items-center gap-2">
//                                 {paymentMethods.map(({ name, icon: Icon, href }) => (
//                                     <Link
//                                         key={name}
//                                         href={href}
//                                         title={`Accepted Payment: ${name}`}
//                                         className="transition-transform hover:scale-105 opacity-80 hover:opacity-100"
//                                     >
//                                         <Icon className="h-6 w-auto" />
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// }
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
    Hotel,
    Phone,
    Mail,
    MapPin,
    Clock,
    ShieldCheck,
    CreditCard,
    Headphones,
    ArrowRight,
} from "lucide-react";

/* ─────────────────── Social Icons ─────────────────── */
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
    );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
    );
}

/* ─────────────────── Payment Icons ─────────────────── */
function VisaIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 36 24" width="36" height="24" fill="none" {...props}>
            <rect width="36" height="24" rx="4" fill="#1434CB" />
            <path d="M13.54 16.5h-2.18l1.36-8.44h2.18l-1.36 8.44zm7.65-8.24c-.43-.17-1.1-.35-1.93-.35-2.13 0-3.63 1.13-3.64 2.74-.02 1.2 1.07 1.87 1.89 2.27.84.41 1.13.67 1.12 1.04-.01.56-.67.81-1.29.81-.86 0-1.32-.13-2.02-.44l-.28-.13-.3 1.87c.51.23 1.44.43 2.41.44 2.27 0 3.75-1.12 3.77-2.86.01-.95-.57-1.68-1.82-2.28-.76-.39-1.22-.65-1.21-1.05 0-.35.39-.72 1.24-.72.7 0 1.22.15 1.62.32l.2.09.32-1.82zm5.72 8.24h1.9l-1.66-8.44h-1.75c-.39 0-.73.23-.88.58l-3.1 7.86h2.29l.46-1.26h2.8l.26 1.26zm-2.43-2.92l1.15-3.16.66 3.16h-1.81zM11.23 8.06L9.15 13.82l-.22-1.11c-.39-1.32-1.6-2.75-2.96-3.47l1.92 7.26h2.32l3.45-8.44h-2.43z" fill="#FFFFFF" />
        </svg>
    );
}

function MastercardIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 36 24" width="36" height="24" fill="none" {...props}>
            <rect width="36" height="24" rx="4" fill="#252525" />
            <circle cx="14" cy="12" r="7" fill="#EB001B" />
            <circle cx="22" cy="12" r="7" fill="#F79E1B" fillOpacity="0.9" />
        </svg>
    );
}

function PaypalIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 36 24" width="36" height="24" fill="none" {...props}>
            <rect width="36" height="24" rx="4" fill="#003087" />
            <path d="M22.3 8.3c-.4 1.8-1.7 2.8-3.6 2.8h-1.8l-.9 5.7h-2.3l1.7-10.7h4.1c1.8 0 2.9.8 2.8 2.2zm-3.3 0c0-.6-.5-.9-1.2-.9h-1.2l-.6 3.6h1.2c.8 0 1.5-.3 1.8-1.1.2-.5.1-1.1 0-1.6z" fill="#0079C1" />
            <path d="M20.2 10.1c-.4 1.8-1.7 2.8-3.6 2.8h-1.8l-.9 5.7h-2.3l1.7-10.7h4.1c1.8 0 2.9.8 2.8 2.2zm-3.3 0c0-.6-.5-.9-1.2-.9h-1.2l-.6 3.6h1.2c.8 0 1.5-.3 1.8-1.1.2-.5.1-1.1 0-1.6z" fill="#00457C" />
        </svg>
    );
}

function CbeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 36 24" width="36" height="24" fill="none" {...props}>
            <rect width="36" height="24" rx="4" fill="#6B21A8" />
            <path d="M12 6h12v3H12zm0 4.5h12v3H12zm0 4.5h12v3H12z" fill="#FACC15" />
            <circle cx="8" cy="12" r="2.5" fill="#FACC15" />
        </svg>
    );
}

function TelebirrIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 36 24" width="36" height="24" fill="none" {...props}>
            <rect width="36" height="24" rx="4" fill="#0080FF" />
            <path d="M10 8h16v2.5H19.5V17H16.5V10.5H10V8z" fill="#FFFFFF" />
            <path d="M23 12.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" fill="#7C3AED" />
        </svg>
    );
}

/* ────────────────────────── Footer Data ────────────────────────── */
const trustBadges = [
    { icon: ShieldCheck, title: "Guaranteed Reservation", desc: "Instant confirmation, 100% secure" },
    { icon: CreditCard, title: "No Hidden Fees", desc: "Transparent, all-inclusive pricing" },
    { icon: Headphones, title: "24/7 Customer Service", desc: "Real people, whenever you need" },
];

const quickLinks = [
    { name: "Rooms & Suites", href: "/rooms" },
    { name: "My Bookings", href: "/bookings" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
];

const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Cancellation Policy", href: "/cancellation" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
];

const contactInfo = [
    { icon: Phone, label: "Phone", value: "+251 995 886 777" },
    { icon: Mail, label: "Email", value: "reserve@gmail.com" },
    { icon: MapPin, label: "Address", value: "Addis Ababa, Ethiopia" },
    { icon: Clock, label: "Front Desk", value: "Check-in 2 PM · Check-out 11 AM" },
];

const socials = [
    { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
    { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
    { icon: TwitterIcon, label: "Twitter", href: "https://twitter.com" },
    { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com" },
];

const paymentMethods = [
    { name: "Visa", icon: VisaIcon, href: "/cancellation#payment-methods" },
    { name: "MasterCard", icon: MastercardIcon, href: "/cancellation#payment-methods" },
    { name: "PayPal", icon: PaypalIcon, href: "/cancellation#payment-methods" },
    { name: "CBE Birr", icon: CbeIcon, href: "/cancellation#payment-methods" },
    { name: "Telebirr", icon: TelebirrIcon, href: "/cancellation#payment-methods" },
];

/* ────────────────────────── Section Heading ────────────────────── */
function SectionHeading({ children }: { children: ReactNode }) {
    return (
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400/90">
            <span className="h-1 w-4 rounded-full bg-amber-400" aria-hidden="true" />
            {children}
        </h3>
    );
}

/* ───────────────────────────── Footer Component ──────────────────────────── */
export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative w-full bg-[url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center text-slate-300">
            {/* Rich Luxury Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950/95 to-slate-950/85 backdrop-blur-sm"></div>

            {/* Content wrapper */}
            <div className="relative z-10">
                
                {/* ── Trust Badges Strip (Centered & Perfectly Balanced) ── */}
                <div className="border-b border-white/10 bg-white/[0.02]">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {trustBadges.map(({ icon: Icon, title, desc }) => (
                                <div key={title} className="flex items-center gap-4 justify-center md:justify-start group bg-white/[0.02] md:bg-transparent p-4 md:p-0 rounded-2xl border border-white/5 md:border-0">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-amber-400 group-hover:text-slate-950 shadow-lg">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-bold text-white tracking-wide">{title}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Main Footer Body (Unboxed & Spaciously Organized) ── */}
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                        
                        {/* Brand Info */}
                        <div className="lg:col-span-4 space-y-6">
                            <Link href="/" className="group inline-flex items-center gap-3">
                                <span className="rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-3 text-slate-950 shadow-xl shadow-amber-500/10">
                                    <Hotel className="h-6 w-6" />
                                </span>
                                <div>
                                    <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                                        HotelHub <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                                    </span>
                                    <span className="text-[10px] font-bold text-amber-400/80 tracking-widest uppercase block">
                                        Luxury Reservations
                                    </span>
                                </div>
                            </Link>

                            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
                                Experience uncompromised comfort and elegance. Book your stay with guaranteed reservations, transparent pricing, and 24/7 dedicated support.
                            </p>

                            <div className="flex items-center gap-3 pt-2">
                                {socials.map(({ icon: Icon, label, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:border-amber-400/50 hover:bg-amber-400 hover:text-slate-950 hover:scale-105 shadow-md"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Explore Links */}
                        <div className="lg:col-span-2 space-y-6">
                            <SectionHeading>Explore</SectionHeading>
                            <ul className="space-y-3.5">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-all hover:text-amber-400 hover:translate-x-1"
                                        >
                                            <span className="h-1 w-1 rounded-full bg-slate-600 transition-colors group-hover:bg-amber-400" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div className="lg:col-span-2 space-y-6">
                            <SectionHeading>Support</SectionHeading>
                            <ul className="space-y-3.5">
                                {supportLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-all hover:text-amber-400 hover:translate-x-1"
                                        >
                                            <span className="h-1 w-1 rounded-full bg-slate-600 transition-colors group-hover:bg-amber-400" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact & Newsletter */}
                        <div className="lg:col-span-4 space-y-6">
                            <SectionHeading>Get in Touch</SectionHeading>
                            <ul className="space-y-3.5">
                                {contactInfo.map(({ icon: Icon, label, value }) => (
                                    <li key={label} className="flex items-center gap-3">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-amber-400 border border-white/10">
                                            <Icon className="h-3.5 w-3.5" />
                                        </span>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
                                            <p className="text-xs font-semibold text-slate-200">{value}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <form className="pt-2" onSubmit={(e) => e.preventDefault()}>
                                <label
                                    htmlFor="newsletter-email"
                                    className="text-xs font-medium text-slate-300 block mb-2"
                                >
                                    Subscribe for exclusive member offers
                                </label>
                                <div className="flex overflow-hidden rounded-xl border border-white/15 bg-black/40 shadow-inner transition-all focus-within:border-amber-400/80 focus-within:ring-1 focus-within:ring-amber-400/80">
                                    <input
                                        id="newsletter-email"
                                        type="email"
                                        required
                                        placeholder="Enter your email address"
                                        className="w-full bg-transparent px-4 py-3 text-xs text-white outline-none placeholder:text-slate-500"
                                    />
                                    <button
                                        type="submit"
                                        aria-label="Subscribe"
                                        className="shrink-0 bg-amber-400 hover:bg-amber-300 px-5 text-slate-950 font-bold transition-all cursor-pointer flex items-center justify-center shadow-md"
                                    >
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

                {/* ── Bottom Bar ── */}
                <div className="border-t border-white/10 bg-black/60">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
                            <p className="text-xs text-slate-500">
                                © {year}{" "}
                                <span className="font-semibold text-slate-300">HotelHub</span>. All
                                rights reserved.
                            </p>

                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                                <nav className="flex items-center gap-6 text-xs text-slate-400">
                                    <Link href="/privacy" className="transition-colors hover:text-amber-400">
                                        Privacy Policy
                                    </Link>
                                    <Link href="/terms" className="transition-colors hover:text-amber-400">
                                        Terms of Service
                                    </Link>
                                    <Link href="/contact" className="transition-colors hover:text-amber-400">
                                        Support
                                    </Link>
                                </nav>

                                <span
                                    className="hidden h-4 w-px bg-white/10 sm:block"
                                    aria-hidden="true"
                                />

                                {/* Payment Methods Badges */}
                                <div className="flex items-center gap-2.5">
                                    {paymentMethods.map(({ name, icon: Icon, href }) => (
                                        <Link
                                            key={name}
                                            href={href}
                                            title={`Accepted Payment: ${name}`}
                                            className="transition-transform hover:scale-105 opacity-70 hover:opacity-100"
                                        >
                                            <Icon className="h-6 w-auto rounded shadow-sm" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}