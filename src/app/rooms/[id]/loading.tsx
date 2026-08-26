import { RoomDetailSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#070b14] pb-24">
            <RoomDetailSkeleton />
        </div>
    );
}