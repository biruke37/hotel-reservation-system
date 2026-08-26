
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import {
//     Search,
//     Calendar,
//     Users,
//     Bed,
//     ShieldCheck,
//     CreditCard,
//     Headphones,
//     ArrowRight,
//     Star,
//     Wifi,
//     Coffee,
//     Tv,
// } from "lucide-react";

// // Room Interface ለ TypeScript
// interface Room {
//     id: string;
//     title: string;
//     type: string;
//     price: number;
//     rating: string;
//     image: string;
// }

// // Sample Featured Rooms Data (በኋላ ከ PostgreSQL/Prisma የሚመጣ)
// const featuredRooms: Room[] = [
//     {
//         id: "1",
//         title: "Presidential Suite",
//         type: "Deluxe Suite",
//         price: 350,
//         rating: "4.9",
//         image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
//     },
//     {
//         id: "2",
//         title: "Executive Deluxe Room",
//         type: "Executive",
//         price: 220,
//         rating: "4.8",
//         image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1000",
//     },
//     {
//         id: "3",
//         title: "Standard King Suite",
//         type: "Standard Room",
//         price: 140,
//         rating: "4.7",
//         image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000",
//     },
// ];

// export default function HomePage() {
//     const router = useRouter();

//     // Search state
//     const [checkIn, setCheckIn] = useState("");
//     const [roomType, setRoomType] = useState("All Types");
//     const [guests, setGuests] = useState("1 Adult");

//     // Handle Search Submission
//     const handleSearch = (e: React.FormEvent) => {
//         e.preventDefault();
//         const queryParams = new URLSearchParams({
//             checkIn,
//             roomType,
//             guests,
//         }).toString();

//         // Navigate to Rooms Page with Search Filters
//         router.push(`/rooms?${queryParams}`);
//     };

//     return (
//         <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans">
//             {/* Hero Banner Section */}
//             <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//                 <div className="relative rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-[#0d1322] border border-slate-800/80 p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-2xl">
//                     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
//                         <span>✨ Experience Unmatched Luxury & Comfort</span>
//                     </div>
//                     <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
//                         Find Your Perfect Stay with <br />
//                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
//                             Ease & Confidence
//                         </span>
//                     </h1>
//                     <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
//                         Discover handpicked luxury rooms, instant bookings, and world-class hotelly tailored for business trips and unforgettable vacations.
//                     </p>

//                     {/* Interactive Search Bar Form */}
//                     <div className="mt-10 max-w-4xl mx-auto bg-[#111827]/90 border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
//                         <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
//                             {/* Check-In Date */}
//                             <div className="flex items-center gap-3 bg-[#0d1322] border border-slate-800 px-3.5 py-2.5 rounded-xl text-left">
//                                 <Calendar className="w-5 h-5 text-indigo-400 shrink-0" />
//                                 <div className="w-full">
//                                     <label className="block text-[10px] font-bold text-slate-400 uppercase">Check-In / Out</label>
//                                     <input
//                                         type="date"
//                                         value={checkIn}
//                                         onChange={(e) => setCheckIn(e.target.value)}
//                                         className="bg-transparent text-xs font-semibold text-white focus:outline-none w-full cursor-pointer"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Room Type */}
//                             <div className="flex items-center gap-3 bg-[#0d1322] border border-slate-800 px-3.5 py-2.5 rounded-xl text-left">
//                                 <Bed className="w-5 h-5 text-indigo-400 shrink-0" />
//                                 <div className="w-full">
//                                     <label className="block text-[10px] font-bold text-slate-400 uppercase">Room Type</label>
//                                     <select
//                                         value={roomType}
//                                         onChange={(e) => setRoomType(e.target.value)}
//                                         className="bg-transparent text-xs font-semibold text-white focus:outline-none w-full cursor-pointer"
//                                     >
//                                         <option className="bg-[#0d1322]">All Types</option>
//                                         <option className="bg-[#0d1322]">Deluxe</option>
//                                         <option className="bg-[#0d1322]">Executive</option>
//                                         <option className="bg-[#0d1322]">Standard Room</option>
//                                         <option className="bg-[#0d1322]">phenthouse</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             {/* Guests */}
//                             <div className="flex items-center gap-3 bg-[#0d1322] border border-slate-800 px-3.5 py-2.5 rounded-xl text-left">
//                                 <Users className="w-5 h-5 text-indigo-400 shrink-0" />
//                                 <div className="w-full">
//                                     <label className="block text-[10px] font-bold text-slate-400 uppercase">Guests</label>
//                                     <select
//                                         value={guests}
//                                         onChange={(e) => setGuests(e.target.value)}
//                                         className="bg-transparent text-xs font-semibold text-white focus:outline-none w-full cursor-pointer"
//                                     >
//                                         <option className="bg-[#0d1322]">1 Adult</option>
//                                         <option className="bg-[#0d1322]">2 Adults</option>
//                                         <option className="bg-[#0d1322]">Family (3-4)</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             {/* Action Button */}
//                             <button
//                                 type="submit"
//                                 className="w-full h-full min-h-[48px] bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition active:scale-95 cursor-pointer"
//                             >
//                                 <Search className="w-4 h-4" />
//                                 <span>Search Available</span>
//                             </button>
//                         </form>
//                     </div>
//                     {/* Badges */}
//                     <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-slate-400 border-t border-slate-800/60 pt-6">
//                         <div className="flex items-center gap-2">
//                             <ShieldCheck className="w-4 h-4 text-emerald-400" />
//                             <span>Guaranteed Reservation</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <CreditCard className="w-4 h-4 text-indigo-400" />
//                             <span>No Hidden Fees</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <Headphones className="w-4 h-4 text-cyan-400" />
//                             <span>24/7 Customer Support</span>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             {/* Featured Rooms Section */}
//             <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//                 <div className="flex items-center justify-between mb-8">
//                     <div>
//                         <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Top Selections</p>
//                         <h2 className="text-2xl font-black text-white mt-1">Featured Accommodations</h2>
//                     </div>
//                     <Link href="/rooms" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition">
//                         Explore all rooms <ArrowRight className="w-4 h-4" />
//                     </Link>
//                 </div>
//                 {/* Dynamic Rooms Grid with Real Images */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {featuredRooms.map((room) => (
//                         <div key={room.id} className="bg-[#0d1322] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition duration-300 group shadow-xl flex flex-col justify-between">
//                             <div>
//                                 {/* Real Image Container */}
//                                 <div className="h-56 relative overflow-hidden bg-slate-800">
//                                     <Image
//                                         src={room.image}
//                                         alt={room.title}
//                                         fill
//                                         sizes="(max-width: 768px) 100vw, 33vw"
//                                         className="object-cover group-hover:scale-105 transition duration-500"
//                                     />
//                                     <span className="absolute top-3 right-3 bg-[#070b14]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-emerald-400 border border-slate-700/60 shadow-md">
//                                         ${room.price} <span className="text-[10px] text-slate-400 font-normal">/ night</span>
//                                     </span>
//                                 </div>

//                                 {/* Details */}
//                                 <div className="p-5 space-y-3">
//                                     <div className="flex items-center justify-between">
//                                         <h3 className="font-bold text-white text-base group-hover:text-indigo-400 transition">
//                                             {room.title}
//                                         </h3>
//                                         <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
//                                             <Star className="w-3.5 h-3.5 fill-amber-400" />
//                                             <span>{room.rating}</span>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center gap-4 text-slate-400 text-xs py-2 border-y border-slate-800/60">
//                                         <span className="flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5 text-indigo-400" /> Wifi</span>
//                                         <span className="flex items-center gap-1.5"><Coffee className="w-3.5 h-3.5 text-indigo-400" /> Breakfast</span>
//                                         <span className="flex items-center gap-1.5"><Tv className="w-3.5 h-3.5 text-indigo-400" /> Smart TV</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* Action Button */}
//                             <div className="p-5 pt-0">
//                                 <Link href={`/rooms/${room.id}`}>
//                                     <button className="w-full bg-[#131b2e] hover:bg-indigo-600 text-slate-300 hover:text-white py-2.5 rounded-xl text-xs font-bold transition border border-slate-800 hover:border-indigo-500 cursor-pointer">
//                                         View Details & Book
//                                     </button>
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//         </div>
//     );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Calendar,
  Users,
  Bed,
  ShieldCheck,
  CreditCard,
  Headphones,
  ArrowRight,
  Star,
  Wifi,
  Coffee,
  Tv,
  UtensilsCrossed,
  Waves,
  Sparkles,
  Car,
} from "lucide-react";

// Room Interface ለ TypeScript
interface Room {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: string;
  reviewsCount: number;
  image: string;
}

// Sample Featured Rooms Data
const featuredRooms: Room[] = [
  {
    id: "1",
    title: "Presidential Suite",
    type: "Deluxe Suite",
    price: 350,
    rating: "4.9",
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "2",
    title: "Executive Deluxe Room",
    type: "Executive",
    price: 220,
    rating: "4.8",
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "3",
    title: "Standard King Suite",
    type: "Standard Room",
    price: 140,
    rating: "4.7",
    reviewsCount: 76,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000",
  },
];

// Hotel Amenities Data
const amenities = [
  {
    icon: Wifi,
    title: "High-Speed Wi-Fi",
    description: "Seamless fiber internet connection across all rooms & public areas.",
  },
  {
    icon: UtensilsCrossed,
    title: "Fine Dining & Bar",
    description: "Multi-cuisine gourmet restaurant with 24/7 room service options.",
  },
  {
    icon: Waves,
    title: "Infinity Pool",
    description: "Temperature-controlled swimming pool with panoramic city views.",
  },
  {
    icon: Sparkles,
    title: "Wellness & Spa",
    description: "Full-service spa, sauna, and modern fitness center for relaxation.",
  },
  {
    icon: Car,
    title: "Airport Shuttle",
    description: "Complimentary pickup and drop-off services for all our guests.",
  },
  {
    icon: Coffee,
    title: "Free Breakfast",
    description: "Delicious daily buffet breakfast included with premium suites.",
  },
];

export default function HomePage() {
  const router = useRouter();

  // Search state
  const [checkIn, setCheckIn] = useState("");
  const [roomType, setRoomType] = useState("All Types");
  const [guests, setGuests] = useState("1 Adult");

  // Handle Search Submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      checkIn,
      roomType,
      guests,
    }).toString();

    // Navigate to Rooms Page with Search Filters
    router.push(`/rooms?${queryParams}`);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans">
      {/* Hero Banner Section */}
      <section className="relative pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-[#0d1322] border border-slate-800/80 p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
            <span>✨ Experience Unmatched Luxury & Comfort</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Find Your Perfect Stay with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Ease & Confidence
            </span>
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Discover handpicked luxury rooms, instant bookings, and world-class hotels tailored for business trips and unforgettable vacations.
          </p>

          {/* Interactive Search Bar Form */}
          <div className="mt-10 max-w-4xl mx-auto bg-[#111827]/90 border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              {/* Check-In Date */}
              <div className="flex items-center gap-3 bg-[#0d1322] border border-slate-800 px-3.5 py-2.5 rounded-xl text-left">
                <Calendar className="w-5 h-5 text-indigo-400 shrink-0" />
                <div className="w-full">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Check-In / Out</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-white focus:outline-none w-full cursor-pointer"
                  />
                </div>
              </div>

              {/* Room Type */}
              <div className="flex items-center gap-3 bg-[#0d1322] border border-slate-800 px-3.5 py-2.5 rounded-xl text-left">
                <Bed className="w-5 h-5 text-indigo-400 shrink-0" />
                <div className="w-full">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Room Type</label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-white focus:outline-none w-full cursor-pointer"
                  >
                    <option className="bg-[#0d1322]">All Types</option>
                    <option className="bg-[#0d1322]">Deluxe Suite</option>
                    <option className="bg-[#0d1322]">Executive</option>
                    <option className="bg-[#0d1322]">Standard Room</option>
                    <option className="bg-[#0d1322]">Penthouse</option>
                  </select>
                </div>
              </div>

              {/* Guests */}
              <div className="flex items-center gap-3 bg-[#0d1322] border border-slate-800 px-3.5 py-2.5 rounded-xl text-left">
                <Users className="w-5 h-5 text-indigo-400 shrink-0" />
                <div className="w-full">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-white focus:outline-none w-full cursor-pointer"
                  >
                    <option className="bg-[#0d1322]">1 Adult</option>
                    <option className="bg-[#0d1322]">2 Adults</option>
                    <option className="bg-[#0d1322]">Family (3-4)</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full h-full min-h-[48px] bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition active:scale-95 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Available</span>
              </button>
            </form>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-slate-400 border-t border-slate-800/60 pt-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Guaranteed Reservation</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-400" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-cyan-400" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Top Selections</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Featured Accommodations</h2>
          </div>
          <Link href="/rooms" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition">
            Explore all rooms <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRooms.map((room) => (
            <div key={room.id} className="bg-[#0d1322] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition duration-300 group shadow-xl flex flex-col justify-between">
              <div>
                {/* Image Container */}
                <div className="h-56 relative overflow-hidden bg-slate-800">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-[#070b14]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-emerald-400 border border-slate-700/60 shadow-md">
                    ${room.price} <span className="text-[10px] text-slate-400 font-normal">/ night</span>
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base group-hover:text-indigo-400 transition">
                      {room.title}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{room.rating}</span>
                      <span className="text-slate-500 font-normal">({room.reviewsCount})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400 text-xs py-2 border-y border-slate-800/60">
                    <span className="flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5 text-indigo-400" /> Wifi</span>
                    <span className="flex items-center gap-1.5"><Coffee className="w-3.5 h-3.5 text-indigo-400" /> Breakfast</span>
                    <span className="flex items-center gap-1.5"><Tv className="w-3.5 h-3.5 text-indigo-400" /> Smart TV</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <Link href={`/rooms/${room.id}`}>
                  <button className="w-full bg-[#131b2e] hover:bg-indigo-600 text-slate-300 hover:text-white py-2.5 rounded-xl text-xs font-bold transition border border-slate-800 hover:border-indigo-500 cursor-pointer">
                    View Details & Book
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotel Amenities & Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">World-Class Experience</p>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Hotel Amenities & Services</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Everything you need for a luxurious stay, crafted for your convenience and ultimate relaxation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-[#0d1322] border border-slate-800/80 rounded-2xl p-6 hover:border-indigo-500/40 transition duration-300 shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}