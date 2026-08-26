"use client";

import { useState } from "react";

export default function AdminBookingsTable({ initialBookings }: { initialBookings: any[] }) {
    const [bookings, setBookings] = useState(initialBookings);

    const handleStatusChange = async (bookingId: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/bookings/${bookingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                // Update local state without refetching everything
                setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {booking.user.name}<br />
                                <span className="text-gray-500 text-xs">{booking.user.email}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {booking.room.type} (#{booking.room.roomNumber})
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                ${booking.totalPrice}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <select
                                    value={booking.status}
                                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1.5 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="CheckedIn">Checked-in</option>
                                    <option value="CheckedOut">Checked-out</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}