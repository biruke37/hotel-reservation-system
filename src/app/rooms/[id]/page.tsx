"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  Star,
  Wifi,
  Coffee,
  Tv,
  Wind,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Grid,
  Send,
  UserCheck,
  Clock,
  ShieldCheck,
  Calendar,
  Users,
  Sparkles
} from "lucide-react";

// Mock Database of Rooms
const ROOMS_DATABASE: Record<string, any> = {
  "1": {
    id: "1",
    title: "Presidential Luxury Suite",
    type: "Deluxe Suite",
    pricePerNight: 350,
    capacity: 3,
    rating: 4.8,
    reviewsCount: 4,
    description:
      "Experience ultimate indulgence in our Presidential Luxury Suite. Features panoramic city views, a king-size plush bed, automated climate control, and a marble bathroom equipped with a Jacuzzi.",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200",
    ],
    amenities: [
      { name: "Free High-Speed Wi-Fi", icon: Wifi },
      { name: "Complimentary Breakfast", icon: Coffee },
      { name: "Smart UHD TV", icon: Tv },
      { name: "Climate Control / AC", icon: Wind },
    ],
    houseRules: [
      "Check-in: 2:00 PM - 10:00 PM",
      "Check-out: 11:00 AM",
      "No smoking allowed inside the room",
      "No pets allowed",
      "Quiet hours after 10:00 PM"
    ],
    cancellationPolicy:
      "Free cancellation up to 48 hours before check-in date. After that, cancellation fee equivalent to the first night applies."
  },
  "2": {
    id: "2",
    title: "Executive Deluxe Room",
    type: "Executive",
    pricePerNight: 220,
    capacity: 2,
    rating: 4.8,
    reviewsCount: 2,
    description:
      "Designed for business travelers and modern professionals. Features a dedicated ergonomic workspace, high-speed fiber internet, and city skyline views.",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200",
    ],
    amenities: [
      { name: "Free High-Speed Wi-Fi", icon: Wifi },
      { name: "Complimentary Breakfast", icon: Coffee },
      { name: "Climate Control / AC", icon: Wind },
    ],
    houseRules: [
      "Check-in: 2:00 PM - 10:00 PM",
      "Check-out: 11:00 AM",
      "No smoking inside",
    ],
    cancellationPolicy: "Free cancellation up to 24 hours before check-in."
  }
};

const INITIAL_REVIEWS = [
  {
    id: "r1",
    name: "Dawit Alemu",
    date: "August 12, 2026",
    rating: 5,
    comment: "Absolutely stunning view of the city! The room was spotless and the butler service made us feel like royalty.",
    verified: true,
  },
  {
    id: "r2",
    name: "Sara Tadesse",
    date: "July 28, 2026",
    rating: 5,
    comment: "The Jacuzzi and bed comfort exceeded expectations. Worth every penny for a relaxing weekend.",
    verified: true,
  },
];

interface PageProps {
  params: { id: string };
}

export default function RoomDetailPage({ params }: PageProps) {
  // Next.js 14 ስለሆነ params-ን በቀጥታ እንጠቀማለን (Promise አይደለም)
  const roomId = params.id;

  // Fetch Room Data based on ID
  const room = ROOMS_DATABASE[roomId];

  // States
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");

  // Booking Form State
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestsCount, setGuestsCount] = useState(1);

  // If room is not found
  if (!room) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <Sparkles className="w-12 h-12 text-indigo-400 animate-pulse" />
        <h1 className="text-2xl font-black">Room Not Found</h1>
        <p className="text-xs text-slate-400 max-w-sm">
          The room you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link
          href="/rooms"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-indigo-600/30"
        >
          Back to All Rooms
        </Link>
      </div>
    );
  }

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showNextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % room.images.length);
    }
  };

  const showPrevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + room.images.length) % room.images.length
      );
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("Please enter a review message before submitting.");
      return;
    }

    const createdReview = {
      id: Date.now().toString(),
      name: "Biruk Z.",
      date: "Just now",
      rating: newRating,
      comment: newComment,
      verified: true,
    };

    setReviews([createdReview, ...reviews]);
    setNewComment("");
    setNewRating(5);

    toast.success("Thank you! Your review has been published.", {
      description: "Your feedback helps other guests make better choices.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans pb-24 transition-colors duration-300">
      {/* Top Back Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Rooms</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-10">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/20">
              {room.type}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
              {room.title}
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-2xl w-fit shadow-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            {room.rating}
            <span className="text-xs text-slate-500 font-normal">
              ({reviews.length} reviews)
            </span>
          </div>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden relative group">
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-2 md:row-span-2 relative h-72 md:h-[420px] cursor-pointer overflow-hidden border border-slate-200 dark:border-slate-800/80 rounded-2xl"
          >
            <Image
              src={room.images[0]}
              alt={room.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition flex items-center justify-center">
              <Maximize2 className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
          </div>

          {room.images.slice(1, 5).map((img: string, idx: number) => (
            <div
              key={idx + 1}
              onClick={() => openLightbox(idx + 1)}
              className="relative h-36 md:h-[204px] cursor-pointer overflow-hidden border border-slate-200 dark:border-slate-800/80 rounded-2xl hidden sm:block"
            >
              <Image
                src={img}
                alt={`Room view ${idx + 2}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ))}

          <button
            onClick={() => openLightbox(0)}
            className="absolute bottom-4 right-4 bg-white/90 dark:bg-[#070b14]/90 hover:bg-white dark:hover:bg-black text-slate-900 dark:text-white text-xs font-bold px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 backdrop-blur-md flex items-center gap-2 transition cursor-pointer shadow-xl"
          >
            <Grid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Show all {room.images.length} photos</span>
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Description & Amenities */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                About this room
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                {room.description}
              </p>

              <div className="bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                  Included Amenities
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {room.amenities.map((item: any, idx: number) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-slate-50 dark:bg-[#131b2e] p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80"
                      >
                        <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* House Rules & Cancellation Policy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <Clock className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      House Rules
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {room.houseRules.map((rule: string, idx: number) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Cancellation Policy
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {room.cancellationPolicy}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews & Ratings Section */}
            <div className="border-t border-slate-200 dark:border-slate-800/80 pt-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Guest Reviews
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Real feedback from verified guests who stayed here
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-sm">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    {room.rating}
                  </span>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {reviews.length} Verified Ratings
                    </span>
                  </div>
                </div>
              </div>

              {/* Add Review Form */}
              <form
                onSubmit={handleAddReview}
                className="bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm"
              >
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Leave a Review
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Your Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 cursor-pointer transition transform hover:scale-110"
                      >
                        <Star
                          className={`w-5 h-5 ${star <= newRating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300 dark:text-slate-600"
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="How was your stay? Mention cleanliness, service, or location..."
                  className="w-full bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
                />

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition cursor-pointer active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800/90 rounded-3xl p-6 space-y-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-600/20 border border-indigo-100 dark:border-indigo-500/30 rounded-2xl flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                          {rev.name[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                              {rev.name}
                            </h4>
                            {rev.verified && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-md">
                                <UserCheck className="w-3 h-3" /> Verified Guest
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500">{rev.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 bg-slate-50 dark:bg-[#131b2e] px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white ml-1">
                          {rev.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Trigger Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-6 sticky top-6 shadow-xl">
              <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    ${room.pricePerNight}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400"> / night</span>
                </div>
              </div>

              {/* Booking Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" /> Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" /> Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    <Users className="w-3.5 h-3.5 inline mr-1" /> Guests
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  >
                    {[...Array(room.capacity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Guest{i > 0 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Link
                href={`/checkout/${room.id}?checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${guestsCount}`}
                className="block w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl text-xs text-center shadow-lg shadow-indigo-600/30 transition cursor-pointer active:scale-95"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 dark:bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8">
          <div className="w-full max-w-6xl flex justify-between items-center text-xs text-slate-400">
            <span>
              Image <strong className="text-white">{lightboxIndex + 1}</strong> of {room.images.length}
            </span>
            <button
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative w-full max-w-5xl h-[65vh] sm:h-[75vh] my-auto flex items-center justify-center">
            <button
              onClick={showPrevImage}
              className="absolute left-2 z-10 p-3 rounded-full bg-slate-900/80 border border-slate-800 text-white cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={room.images[lightboxIndex]}
                alt="Gallery"
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={showNextImage}
              className="absolute right-2 z-10 p-3 rounded-full bg-slate-900/80 border border-slate-800 text-white cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}