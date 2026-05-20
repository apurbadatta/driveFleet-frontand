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
    if (!isPending && user?.email) {
      fetch(`http://localhost:8000/bookings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching bookings:", err);
          toast.error("Failed to load your bookings");
          setLoading(false);
        });
    } 
  }, [user, isPending]);

  const handleDeleteBooking = async (id, carName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to cancel your booking for ${carName}?`,
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8000/bookings/${id}`, {
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
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl transition shadow-md"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-[80vh]">
      {/* হেডার সেকশন */}
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
          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline text-sm bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 self-start md:self-auto"
        >
          <FaArrowLeft className="text-xs" /> Rent Another Car
        </Link>
      </div>

      
      {bookings.length === 0 ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center space-y-5">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <FaCar className="text-2xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              No Bookings Found
            </h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1">
              You haven't booked any luxury vehicles yet. Check out our fleet
              today!
            </p>
          </div>
          <Link
            href="/cars"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl transition shadow-md text-sm"
          >
            Explore Available Cars
          </Link>
        </div>
      ) : (
        // 📊 প্রফেশনাল ও ক্লিন রেসপন্সিভ টেবিল লেআউট
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Car Info
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Booking Date
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={booking.carImage}
                          alt={booking.carName}
                          className="w-16 h-12 object-cover rounded-xl bg-slate-100 border border-slate-200"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm md:text-base">
                            {booking.carName}
                          </h4>
                          <p className="text-xs text-slate-400">
                            Model: {booking.carModel}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <FaCalendarAlt className="text-slate-400" />
                        <span>{booking.bookingDate}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 font-extrabold text-slate-900 text-sm md:text-base">
                        <FaMoneyBillWave className="text-emerald-500 text-sm" />
                        <span>${booking.totalPrice}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 capitalize">
                        ● {booking.status || "Confirmed"}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          handleDeleteBooking(booking._id, booking.carName)
                        }
                        className="p-2.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition duration-200 border border-transparent hover:border-red-100 bg-transparent inline-flex items-center justify-center shadow-none"
                        title="Cancel Booking"
                      >
                        <FaTrashAlt className="text-sm" />
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
