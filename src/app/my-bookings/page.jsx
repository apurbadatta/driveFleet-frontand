"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import {
  FaCar,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaArrowLeft,
} from "react-icons/fa";
import Link from "next/link";
import DeleteBookingModal from "../components/DeleteBookingModal";

const MyBookingsPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    fetch(`${serverUrl}/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, [user, isPending]);

  const handleBookingDeleted = (id) => {
    setBookings(bookings.filter((booking) => booking._id !== id));
    toast.success("Booking cancelled successfully!");
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
          <FaArrowLeft className="text-xs" /> Rent Another Car
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-slate-50 border rounded-3xl p-16 text-center">
          <h3 className="text-lg font-bold">No Bookings Found</h3>
          <p className="text-slate-500 mt-2">
            You have not booked any cars yet.
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
                <tr className="bg-slate-50 text-left">
                  <th className="p-4">Car</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-t">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={booking.carImage}
                        alt={booking.carName}
                        className="w-16 h-12 object-cover rounded border"
                      />
                      <div>
                        <h4 className="font-bold text-slate-800">
                          {booking.carName}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {booking.carModel}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <FaCalendarAlt className="inline mr-2 text-slate-400" />
                      {booking.bookingDate}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      <FaMoneyBillWave className="inline mr-2 text-green-500" />
                      ${booking.totalPrice}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">
                        ● {booking.status || "Confirmed"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <DeleteBookingModal
                        bookingId={booking._id}
                        carName={booking.carName}
                        onDeleteSuccess={handleBookingDeleted}
                      />
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
