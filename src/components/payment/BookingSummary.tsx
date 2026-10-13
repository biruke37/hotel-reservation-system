"use client";

import { Calendar, Users, Moon, MapPin, Star, BedDouble } from "lucide-react";

interface BookingSummaryProps {
    room: {
        name: string;
        type: string;
        imageUrl?: string;
        pricePerNight: number;
    };
    checkIn: string;
    checkOut: string;
    guests: number;
    nights: number;
    total: number;
}

export default function BookingSummary({
    room,
    checkIn,
    checkOut,
    guests,
    nights,
    total,
}: BookingSummaryProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-indigo-400" />
                    Booking Summary
                </h3>
                <p className="text-xs text-slate-400 mt-1">Review your reservation details</p>
            </div>

            {/* Room Card */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl overflow-hidden">
                {/* Room Image */}
                <div className="h-32 bg-slate-800/50 relative">
                    {room.imageUrl ? (
                        <img
                            src={room.imageUrl}
                            alt={room.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                            <BedDouble className="w-12 h-12 opacity-30" />
                        </div>
                    )}
                    {/* Room Type Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                        {room.type}
                    </span>
                </div>

                {/* Room Details */}
                <div className="p-4 space-y-3">
                    <div>
                        <h4 className="font-bold text-white">{room.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-xs text-slate-400">4.9 (127 reviews)</span>
                        </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 space-y-2">
                        {/* Check-in/Check-out */}
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-indigo-400" />
                            <div className="flex-1 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-500">Check-in</p>
                                    <p className="text-xs font-semibold text-white">
                                        {formatDate(checkIn)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-500">Check-out</p>
                                    <p className="text-xs font-semibold text-white">
                                        {formatDate(checkOut)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Nights */}
                        <div className="flex items-center gap-2 text-sm">
                            <Moon className="w-4 h-4 text-indigo-400" />
                            <span className="text-xs text-slate-400">
                                {nights} {nights === 1 ? "night" : "nights"}
                            </span>
                        </div>

                        {/* Guests */}
                        <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-indigo-400" />
                            <span className="text-xs text-slate-400">
                                {guests} {guests === 1 ? "guest" : "guests"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-indigo-800/30 rounded-xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-white">Price Breakdown</h4>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-400">
                            ${room.pricePerNight.toFixed(2)} × {nights}{" "}
                            {nights === 1 ? "night" : "nights"}
                        </span>
                        <span className="font-semibold text-white">
                            ${(room.pricePerNight * nights).toFixed(2)}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-slate-400">Service fee</span>
                        <span className="font-semibold text-white">$0.00</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-slate-400">Taxes</span>
                        <span className="font-semibold text-white">Included</span>
                    </div>
                </div>

                <div className="pt-3 border-t-2 border-indigo-700/40 flex justify-between items-center">
                    <span className="text-white font-bold">Total (USD)</span>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                        ${total.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Cancellation Policy */}
            <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-xl space-y-2">
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Cancellation Policy
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                    Free cancellation up to 24 hours before check-in. After that, a
                    one-night charge applies.
                </p>
            </div>
        </div>
    );
}
