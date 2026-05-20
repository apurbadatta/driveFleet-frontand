"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import {
  FaCar,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTrashAlt,
  FaArrowLeft,
} from "react-icons/fa";
import Link from "next/link";

const MyBookingsPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${serverUrl}/bookings?email=${user.email}`
        );

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        toast.error("Failed to load your bookings");
      } finally {
        setLoading(false);
      }
    };

    if (!isPending) {
      fetchBookings();
    }
  }, [user, isPending]);

  const handleDeleteBooking = async (id, carName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to cancel your booking for ${carName}?`
    );

    if (!confirmDelete) return;

    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      const res = await fetch(`${serverUrl}/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setBookings(bookings.filter((booking) => booking._id !== id));
        toast.success("Booking cancelled successfully!");
      } else {
        toast.error(data.message || "Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong with the server!");
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="w-10 h-10 rounded-full border-4 border-t-transparent border-blue-600 animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Please sign in first
        </h2>
        <p className="text-slate-500">
          You need to be logged in to view your booked cars.
        </p>
        <Link
          href="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-[80vh]">
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <FaCar className="text-blue-600" /> My Booked Cars
          </h1>
          <p className="text-slate-500 mt-1">
            Hello {user.name}, view or manage your premium car rentals.
          </p>
        </div>

        <Link
          href="/cars"
          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline text-sm bg-blue-50 px-4 py-2 rounded-xl"
        >
          <FaArrowLeft className="text-xs" />
          Rent Another Car
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-slate-50 border rounded-3xl p-16 text-center">
          <h3 className="text-lg font-bold">No Bookings Found</h3>
          <p className="text-slate-500 mt-2">
            You haven't booked any cars yet.
          </p>
          <Link
            href="/cars"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Explore Cars
          </Link>
        </div>
      ) : (
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-4">Car</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-t">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={booking.carImage}
                        alt={booking.carName}
                        className="w-16 h-12 rounded"
                      />
                      <div>
                        <h4>{booking.carName}</h4>
                        <p className="text-sm text-gray-500">
                          {booking.carModel}
                        </p>
                      </div>
                    </td>

                    <td className="p-4">
                      <FaCalendarAlt className="inline mr-2" />
                      {booking.bookingDate}
                    </td>

                    <td className="p-4">
                      <FaMoneyBillWave className="inline mr-2 text-green-500" />
                      ${booking.totalPrice}
                    </td>

                    <td className="p-4">
                      {booking.status || "Confirmed"}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          handleDeleteBooking(
                            booking._id,
                            booking.carName
                          )
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;