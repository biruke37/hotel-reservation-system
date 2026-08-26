import React from "react";

// Generic Base Skeleton Box
export function SkeletonBlock({ className }: { className?: string }) {
    return (
        <div
            className={`animate-pulse bg-slate-800/60 rounded-2xl ${className}`}
        />
    );
}

// 1. Room Details Lightbox/Gallery Skeleton
export function RoomGallerySkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden">
            <SkeletonBlock className="md:col-span-2 md:row-span-2 h-72 md:h-[420px]" />
            <SkeletonBlock className="h-36 md:h-[204px] hidden sm:block" />
            <SkeletonBlock className="h-36 md:h-[204px] hidden sm:block" />
            <SkeletonBlock className="h-36 md:h-[204px] hidden sm:block" />
            <SkeletonBlock className="h-36 md:h-[204px] hidden sm:block" />
        </div>
    );
}

// 2. Room Card Skeleton (ለ Lists/Grid Page)
export function RoomCardSkeleton() {
    return (
        <div className="bg-[#0d1322] border border-slate-800 rounded-3xl p-4 space-y-4">
            <SkeletonBlock className="h-48 w-full rounded-2xl" />
            <div className="space-y-2">
                <SkeletonBlock className="h-4 w-1/3" />
                <SkeletonBlock className="h-6 w-3/4" />
            </div>
            <div className="flex justify-between items-center pt-2">
                <SkeletonBlock className="h-6 w-20" />
                <SkeletonBlock className="h-9 w-28 rounded-xl" />
            </div>
        </div>
    );
}

// 3. Full Room Detail Page Skeleton
export function RoomDetailSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
            {/* Title Header Skeleton */}
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <SkeletonBlock className="h-5 w-24 rounded-full" />
                    <SkeletonBlock className="h-8 w-64 sm:w-96" />
                </div>
                <SkeletonBlock className="h-10 w-28 rounded-2xl" />
            </div>

            {/* Gallery Bento Grid Skeleton */}
            <RoomGallerySkeleton />

            {/* Content & Booking Sidebar Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
                <div className="lg:col-span-2 space-y-6">
                    <SkeletonBlock className="h-6 w-40" />
                    <SkeletonBlock className="h-20 w-full rounded-2xl" />
                    <SkeletonBlock className="h-32 w-full rounded-3xl" />
                </div>
                <div className="lg:col-span-1">
                    <SkeletonBlock className="h-64 w-full rounded-3xl" />
                </div>
            </div>
        </div>
    );
}