
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useSession, signOut } from "next-auth/react";
// import { Building2, Calendar, Home, Hotel, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";

// export default function Navbar() {
//   const pathname = usePathname();
//   const { data: session, status } = useSession();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // NextAuth Session መረጃዎች
//   const isLoggedIn = status === "authenticated";
//   const userRole = (session?.user as any)?.role;
//   const isAdmin = userRole === "admin";

//   const navLinks = [
//     { name: "Home", href: "/", icon: Home },
//     { name: "All Rooms", href: "/rooms", icon: Hotel },
//     { name: "My Bookings", href: "/my-bookings", icon: Calendar },
//   ];

//   return (
//     <header className="sticky top-0 z-50 bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

//         {/* Brand Logo */}
//         <Link href="/" className="flex items-center gap-2.5 group">
//           <div className="bg-indigo-600/20 p-2 rounded-xl border border-indigo-500/30 group-hover:bg-indigo-600/30 transition">
//             <Building2 className="w-5 h-5 text-indigo-400" />
//           </div>
//           <div>
//             <span className="text-base font-black text-white tracking-wide block leading-none">
//               Hotel<span className="text-indigo-400">Hub</span>
//             </span>
//             <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">
//               Luxury Reservations
//             </span>
//           </div>
//         </Link>

//         {/* Navigation Links */}
//         <nav className="hidden sm:flex items-center gap-1 sm:gap-2">
//           {navLinks.map((link) => {
//             const Icon = link.icon;
//             const isActive = pathname === link.href;

//             return (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${isActive
//                     ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
//                     : "text-slate-400 hover:text-white hover:bg-slate-800/60"
//                   }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 <span>{link.name}</span>
//               </Link>
//             );
//           })}
//         </nav>

//         {/* User Auth Section */}
//         <div className="flex items-center gap-3">
//           {isLoggedIn ? (
//             <div className="relative">
//               <button
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="flex items-center gap-2 bg-[#0d1322] border border-slate-800 p-1.5 pr-3 rounded-2xl hover:border-slate-700 transition cursor-pointer"
//               >
//                 <div className="w-7 h-7 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xs text-white uppercase">
//                   {session?.user?.name ? session.user.name[0] : "U"}
//                 </div>
//                 <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
//               </button>

//               {/* Profile Dropdown Menu */}
//               {isDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-52 bg-[#0d1322] border border-slate-800 rounded-2xl shadow-2xl p-2 space-y-1 z-50">
//                   <div className="px-3 py-2 border-b border-slate-800/80">
//                     <p className="text-xs font-bold text-white truncate">
//                       {session?.user?.name || "User"}
//                     </p>
//                     <p className="text-[10px] text-slate-400 truncate">
//                       {session?.user?.email}
//                     </p>
//                   </div>

//                   {/* Admin Dashboard (ተጠቃሚው Admin ከሆነ ብቻ የሚታይ) */}
//                   {isAdmin && (
//                     <Link
//                       href="/admin"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center gap-2 px-3 py-2 text-xs text-indigo-400 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 rounded-xl transition font-semibold"
//                     >
//                       <LayoutDashboard className="w-4 h-4" />
//                       <span>Admin Dashboard</span>
//                     </Link>
//                   )}

//                   <Link
//                     href="/bookings"
//                     onClick={() => setIsDropdownOpen(false)}
//                     className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/60 rounded-xl transition"
//                   >
//                     <Calendar className="w-4 h-4 text-indigo-400" />
//                     <span>My Bookings</span>
//                   </Link>

//                   {/* Real Sign Out Action */}
//                   <button
//                     onClick={() => {
//                       setIsDropdownOpen(false);
//                       signOut({ callbackUrl: "/login" });
//                     }}
//                     className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Sign Out</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Link
//                 href="/login"
//                 className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl transition"
//               >
//                 Sign In
//               </Link>
//               <Link
//                 href="/register"
//                 className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/30 transition"
//               >
//                 Register
//               </Link>
//             </div>
//           )}
//         </div>

//       </div>
//     </header>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Hotel,
  Home,
  BedDouble,
  BookmarkCheck,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = status === "authenticated";
  const userRole = (session?.user as any)?.role;
  const isAdmin = userRole === "admin";

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Rooms", href: "/rooms", icon: BedDouble },
    { name: "My Bookings", href: "/my-bookings", icon: BookmarkCheck },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    /* 
      - አዲስ ፕሪሚየም የሆቴል ውስጠ-መሳሪያ/ሎቢ ኤችዲ ምስል ከበስተጀርባ ተደረገ
      - የጽሁፍ ንባብ ጥራት እንዲጠበቅ ጥቁር ግራዲየንት ኦቨርሌይ (Dark Gradient Overlay) ተካቷል
    */
    <header className="sticky top-0 z-50 w-full bg-[url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center border-b border-indigo-500/30 shadow-2xl shadow-black">
      {/* Dark Gradient Overlay for perfect readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070b14f0] via-[#0f172ae6] to-[#070b14f0] backdrop-blur-md"></div>

      <div className="relative w-full px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between">

        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-center text-indigo-300 group-hover:bg-indigo-600/50 transition duration-300 shadow-md">
            <Hotel className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
              HotelHub <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            </span>
            <span className="text-[9px] font-semibold text-indigo-200 tracking-wider uppercase block">
              Luxury Reservations
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#070a14]/90 p-1.5 rounded-xl border border-indigo-500/25 shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition duration-200 ${isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 border border-indigo-400/40"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/80"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-indigo-400"}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Auth Section & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 bg-[#070a14]/90 border border-indigo-500/25 p-1.5 pr-3 rounded-xl hover:border-indigo-500/60 transition cursor-pointer shadow-md"
              >
                <div className="w-8 h-8 bg-indigo-600 border border-indigo-400/50 rounded-lg flex items-center justify-center font-bold text-xs text-white uppercase shadow-sm">
                  {session?.user?.name ? session.user.name[0] : "U"}
                </div>
                <div className="hidden sm:block text-left">
                  <span className="block text-xs font-bold text-slate-100 truncate max-w-[120px]">
                    {session?.user?.name || "User"}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-200 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[#131a2b] border border-indigo-500/30 rounded-2xl shadow-2xl p-2 space-y-1 z-50">
                  <div className="px-3 py-2.5 border-b border-indigo-500/20">
                    <p className="text-xs font-bold text-white truncate">
                      {session?.user?.name || "User"}
                    </p>
                    <p className="text-[10px] text-indigo-300 truncate">
                      {session?.user?.email}
                    </p>
                  </div>

                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-indigo-400 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 rounded-xl transition font-semibold"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}

                  <Link
                    href="/my-bookings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-slate-800/80 rounded-xl transition font-medium"
                  >
                    <BookmarkCheck className="w-4 h-4 text-indigo-400" />
                    <span>My Bookings</span>
                  </Link>

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      signOut({ callbackUrl: "/login" });
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/20 rounded-xl transition cursor-pointer font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/login"
                className="text-xs font-bold text-slate-200 hover:text-white px-4 py-2.5 rounded-xl transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/40 transition border border-indigo-400/40"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-[#070a14]/90 border border-indigo-500/25 text-slate-200 hover:text-white transition cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="relative md:hidden bg-[#131a2b]/95 border-t border-indigo-500/25 px-6 py-4 space-y-2 backdrop-blur-xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800/80"
          >
            <Home className="w-4 h-4 text-indigo-400" /> Home
          </Link>
          <Link
            href="/rooms"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800/80"
          >
            <BedDouble className="w-4 h-4 text-indigo-400" /> All Rooms
          </Link>
          <Link
            href="/my-bookings"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800/80"
          >
            <BookmarkCheck className="w-4 h-4 text-indigo-400" /> My Bookings
          </Link>

          {!isLoggedIn && (
            <div className="pt-3 border-t border-indigo-500/20 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800/60"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}