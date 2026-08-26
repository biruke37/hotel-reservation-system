import { RoomCardSkeleton } from "@/components/ui/Skeleton";
export default function LoadingRooms() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <RoomCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}