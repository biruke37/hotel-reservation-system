"use client";

import { useEffect, useState } from "react";
import RoomCard from "@/components/RoomCard";

export default function RoomsGrid({ take = 6 }: { take?: number }) {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`/api/rooms?available=true&take=${take}`);
        const json = await res.json();
        if (mounted) setRooms(json.rooms || []);
      } catch (err) {
        console.error("Failed to load rooms", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [take]);

  if (loading) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((r) => (
        <RoomCard
          key={r.id}
          id={r.id}
          title={r.title || r.roomNumber}
          type={r.type}
          pricePerNight={r.pricePerNight}
          images={r.images}
          isAvailable={r.isAvailable}
        />
      ))}
    </div>
  );
}
