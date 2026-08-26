import Image from "next/image";
import Link from "next/link";
import { Wifi, Tv, Coffee, ArrowRight, Star } from "lucide-react";

interface RoomProps {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    type: string;
}

export default function RoomCard({ room }: { room: RoomProps }) {
    return (
        <div className="bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition duration-300 group shadow-lg dark:shadow-xl flex flex-col justify-between">
            <div>
                {/* Room Image Container */}
                <div className="h-52 bg-slate-100 dark:bg-slate-800/50 relative overflow-hidden flex items-center justify-center">
                    {room.imageUrl ? (
                        <Image
                            src={room.imageUrl}
                            alt={room.name}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500"
                        />
                    ) : (
                        <div className="text-slate-400 dark:text-slate-500 text-xs flex flex-col items-center gap-2">
                            <span className="p-3 bg-slate-200 dark:bg-slate-800 rounded-full border border-slate-300 dark:border-slate-700/50">
                                🏨
                            </span>
                            <span>No Image Available</span>
                        </div>
                    )}

                    {/* Badge */}
                    <span className="absolute top-3 left-3 bg-white/80 dark:bg-[#070b14]/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700/60 uppercase tracking-wider shadow-sm">
                        {room.type}
                    </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg capitalize group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                            {room.name}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />
                            <span>4.9</span>
                        </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {room.description ||
                            "Experience top-tier hospitality with elegant furnishings and premium amenities."}
                    </p>

                    {/* Amenities Quick Icons */}
                    <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-xs py-2.5 border-y border-slate-100 dark:border-slate-800/60">
                        <span className="flex items-center gap-1.5">
                            <Wifi className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Free Wifi
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Tv className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Smart TV
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Coffee className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Breakfast
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer / Price & Action */}
            <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-3">
                <div>
                    <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                        ${room.price}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                        {" "}/ night
                    </span>
                </div>

                <Link href={`/rooms/${room.id}`}>
                    <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </Link>
            </div>
        </div>
    );
}