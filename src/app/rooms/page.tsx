
"use client";
export const dynamic = 'force-dynamic';
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Search,
    SlidersHorizontal,
    Star,
    ArrowRight,
    RotateCcw,
    Sparkles
} from "lucide-react";

interface Room {
    id: string;
    title: string;
    type: string;
    price: number;
    rating: number;
    reviewsCount: number;
    imageUrl: string;
    description: string;
    amenities: string[];
}

const ALL_ROOMS: Room[] = [
    {
        id: "1",
        title: "Presidential  Suite",
        type: "Deluxe Suite",
        price: 350,
        rating: 4.9,
        reviewsCount: 128,
        imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1000",
        description: "Breathtaking views, king-size bed, private marble bathroom, and 24/7 dedicated butler service.",
        amenities: ["Free Wi-Fi", "Free Breakfast", "Balcony", "Ocean View", "Mini Bar"],
    },
    {
        id: "2",
        title: "Executive Deluxe Room",
        type: "Executive",
        price: 220,
        rating: 4.8,
        reviewsCount: 94,
        imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000",
        description: "Designed for business travelers. Features ergonomic workspace and high-speed fiber internet.",
        amenities: ["Free Wi-Fi", "Free Breakfast", "Air Conditioning"],
    },
    {
        id: "3",
        title: "Standard King Suite",
        type: "Standard Room",
        price: 140,
        rating: 4.7,
        reviewsCount: 62,
        imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000",
        description: "Cozy and elegant room equipped with essential modern amenities for a peaceful stay.",
        amenities: ["Free Wi-Fi", "Air Conditioning"],
    },
    {
        id: "4",
        title: "Ocean View Haven",
        type: "Deluxe Suite",
        price: 450,
        rating: 5.0,
        reviewsCount: 210,
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
        description: "Panoramic ocean front views, spacious private balcony, jacuzzi, and complimentary champagne.",
        amenities: ["Free Wi-Fi", "Free Breakfast", "Balcony", "Ocean View", "Mini Bar"],
    },
    {
        id: "5",
        title: "Modern Minimalist Studio",
        type: "Standard Room",
        price: 110,
        rating: 4.5,
        reviewsCount: 45,
        imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1000",
        description: "Clean modern design with smart home integration and comfortable queen bedding.",
        amenities: ["Free Wi-Fi", "Air Conditioning"],
    },
    {
        id: "6",
        title: "Penthouse Sky Villa",
        type: "Penthouse",
        price: 750,
        rating: 4.95,
        reviewsCount: 88,
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
        description: "Ultimate luxury with rooftop terrace, private heated pool, and full skyline vista.",
        amenities: ["Free Wi-Fi", "Free Breakfast", "Balcony", "Ocean View", "Mini Bar", "Air Conditioning"],
    },
];
const ALL_AMENITIES = ["Free Wi-Fi", "Free Breakfast", "Balcony", "Ocean View", "Mini Bar", "Air Conditioning"];
const ROOM_TYPES = ["All Types", "Deluxe Suite", "Executive", "Standard Room", "Penthouse"];

export default function RoomsPage() {
    // Filter & Search States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("All Types");
    const [maxPrice, setMaxPrice] = useState<number>(800);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");

    // Toggle Amenity Checkbox
    const toggleAmenity = (amenity: string) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
        );
    };

    // Reset Filters
    const handleResetFilters = () => {
        setSearchQuery("");
        setSelectedType("All Types");
        setMaxPrice(800);
        setSelectedAmenities([]);
        setSortBy("featured");
    };

    // Filter and Sort Logic with Safe Null Handling
    const filteredAndSortedRooms = useMemo(() => {
        return ALL_ROOMS.filter((room) => {
            const title = room.title?.toLowerCase() || '';
            const description = room.description?.toLowerCase() || '';
            const query = searchQuery?.toLowerCase() || '';
            // Search Query Filter
            const matchesSearch = title.includes(query) || description.includes(query);
            // Type Filter
            const matchesType = selectedType === "All Types" || room.type === selectedType;
            // Price Filter
            const matchesPrice = room.price <= maxPrice;
            // Amenity Filter
            const matchesAmenities = selectedAmenities.every((amenity) =>
                room.amenities?.includes(amenity)
            );
            return matchesSearch && matchesType && matchesPrice && matchesAmenities;
        }).sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "rating") return b.rating - a.rating;
            return 0; // Default featured
        });
    }, [searchQuery, selectedType, maxPrice, selectedAmenities, sortBy]);
    return (
        <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-24">

            {/* Header Banner */}
            <div className="bg-gradient-to-b from-[#0d1322] to-[#070b14] border-b border-slate-800/80 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                        Luxury Hotel Stays
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                        Explore Available Rooms
                    </h1>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
                        Find the perfect accommodation tailored to your budget, preference, and lifestyle with our real-time reservation system.
                    </p>
                </div>
            </div>

            {/* Main Grid: Filters Sidebar + Room Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar Filters */}
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-[#0d1322] border border-slate-800/90 rounded-3xl p-6 space-y-6 sticky top-6 shadow-2xl">

                            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
                                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">Filters</h2>
                                </div>
                                <button
                                    onClick={handleResetFilters}
                                    className="text-[11px] font-semibold text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition cursor-pointer"
                                >
                                    <RotateCcw className="w-3 h-3" /> Reset
                                </button>
                            </div>

                            {/* Search Bar */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Search Keywords</label>
                                <div className="relative">
                                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search suite, view, king..."
                                        className="w-full bg-[#131b2e] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                                    />
                                </div>
                            </div>

                            {/* Room Category */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Room Category</label>
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full bg-[#131b2e] border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition cursor-pointer"
                                >
                                    {ROOM_TYPES.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range Slider */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Max Price</label>
                                    <span className="font-bold text-emerald-400">${maxPrice} / night</span>
                                </div>
                                <input
                                    type="range"
                                    min="100"
                                    max="1000"
                                    step="25"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="w-full accent-indigo-500 cursor-pointer"
                                />
                                <div className="flex justify-between text-[10px] text-slate-500">
                                    <span>$100</span>
                                    <span>$1,000</span>
                                </div>
                            </div>

                            {/* Amenity Checkboxes */}
                            <div className="space-y-3 border-t border-slate-800/80 pt-4">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Amenities</label>
                                <div className="space-y-2">
                                    {ALL_AMENITIES.map((amenity) => {
                                        const isChecked = selectedAmenities.includes(amenity);
                                        return (
                                            <label
                                                key={amenity}
                                                className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => toggleAmenity(amenity)}
                                                    className="w-4 h-4 rounded border-slate-700 bg-[#131b2e] text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                                                />
                                                <span>{amenity}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* Room Display Grid */}
                    <main className="lg:col-span-3 space-y-6">

                        {/* Sorting Header */}
                        <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                            <span className="text-xs text-slate-400 font-medium">
                                Showing <strong className="text-white">{filteredAndSortedRooms.length}</strong> available rooms
                            </span>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <span className="text-xs text-slate-400">Sort By:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="bg-[#131b2e] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition cursor-pointer"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>
                        </div>

                        {/* Room Cards List */}
                        {filteredAndSortedRooms.length === 0 ? (
                            <div className="bg-[#0d1322]/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
                                <Sparkles className="w-12 h-12 text-slate-600 mx-auto" />
                                <h3 className="text-lg font-bold text-white">No rooms matched your criteria</h3>
                                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                                    Try adjusting your price filter, search terms, or clearing selected amenities.
                                </p>
                                <button
                                    onClick={handleResetFilters}
                                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-indigo-600/30"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredAndSortedRooms.map((room) => (
                                    <div
                                        key={room.id}
                                        className="bg-[#0d1322] border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-slate-700 transition flex flex-col justify-between group"
                                    >
                                        <div>
                                            {/* Image */}
                                            <div className="relative h-52 w-full bg-slate-800 overflow-hidden">
                                                <Image
                                                    src={room.imageUrl}
                                                    alt={room.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    className="object-cover group-hover:scale-105 transition duration-500"
                                                />
                                                <div className="absolute top-3 right-3 bg-[#070b14]/80 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-emerald-400 border border-slate-700">
                                                    ${room.price} <span className="text-[10px] text-slate-400 font-normal">/ night</span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                                                        {room.type}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-xs font-bold text-white">
                                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                        {room.rating}
                                                        <span className="text-[10px] text-slate-500 font-normal">({room.reviewsCount})</span>
                                                    </div>
                                                </div>

                                                <h3 className="text-base font-bold text-white">{room.title}</h3>
                                                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{room.description}</p>

                                                {/* Amenity Badges */}
                                                <div className="flex flex-wrap gap-1.5 pt-2">
                                                    {room.amenities?.map((amenity) => (
                                                        <span
                                                            key={amenity}
                                                            className="text-[10px] text-slate-300 bg-[#131b2e] px-2 py-1 rounded-md border border-slate-800"
                                                        >
                                                            {amenity}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Footer Action */}
                                        <div className="p-5 pt-0">
                                            <Link
                                                href={`/rooms/${room.id}`}
                                                className="w-full bg-[#131b2e] hover:bg-indigo-600 text-slate-300 hover:text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-slate-800 transition shadow-md"
                                            >
                                                <span>View Details</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </main>

                </div>
            </div>

        </div>
    );
}