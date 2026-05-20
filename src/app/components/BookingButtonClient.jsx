"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function BookingButtonClient({ car }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login first to book a car!");
      return;
    }

    setLoading(false);
    const confirmBooking = window.confirm(`Are you sure you want to book ${car.carName}?`);
    if (!confirmBooking) return;

    setLoading(true);

    
    const bookingData = {
      carId: car._id,
      carName: car.carName,
      carImage: car.image || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000",
      carModel: car.carType,
      totalPrice: car.pricePerDay,
      
    
      bookedByName: user.name,
      bookedByEmail: user.email,
      bookedByUserImage: user.image,
      bookingDate: new Date().toLocaleDateString(),
      status: "Confirmed"
    };

    try {
      const res = await fetch("http://localhost:8000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Car Booked Successfully!");
      } else {
        toast.error(data.message || "Failed to book car.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server connection failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      disabled={!car.isAvailable || loading}
      onClick={handleBooking}
      className={`w-full py-4 rounded-2xl font-bold text-base shadow-md transition-all duration-300 mt-4 ${
        car.isAvailable 
          ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-600/20 active:scale-[0.99]" 
          : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none"
      }`}
    >
      {loading ? "Processing..." : car.isAvailable ? "Proceed to Booking" : "Currently Unavailable"}
    </button>
  );
}