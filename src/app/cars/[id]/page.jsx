import React from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaUsers, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import BookingButtonClient from '@/app/components/BookingButtonClient';


async function getCarDetails(id) {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000';
    const res = await fetch(`${serverUrl}/cars/${id}`, { cache: "no-store" }); 
    if (!res.ok) {
      throw new Error("Failed to fetch car details");
    }
    return res.json();
}

const CarDetailsPage = async ({ params }) => {
  const { id } = await params;
  const car = await getCarDetails(id);

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Car details not found!</h2>
        <Link href="/cars" className="text-blue-600 font-semibold inline-flex items-center gap-2 hover:underline">
          <FaArrowLeft /> Back to Explore Cars
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-[80vh]">
      
      <Link 
        href="/cars" 
        className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition mb-8 group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Fleet</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden shadow-md border border-slate-200">
          <img 
            src={car.image || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000"} 
            alt={car.carName}
            className="w-full h-auto object-cover max-h-[450px]"
          />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              {car.carType}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              car.isAvailable 
                ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                : "bg-rose-50 text-rose-700 border-rose-200"
            }`}>
              {car.isAvailable ? "● Available for Rent" : "● Currently Rented Out"}
            </span>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              {car.carName}
            </h1>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-3xl font-black text-blue-600">${car.pricePerDay}</span>
              <span className="text-slate-500 font-medium">/ per day</span>
            </div>
          </div>

          <hr className="border-slate-200" />

          <div>
            <h3 className="text-slate-900 font-bold mb-2 text-lg">Overview</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {car.description || "No specific overview provided for this premium vehicle. Experience ultimate comfort and superior performance with our carefully inspected fleet."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3 p-2">
              <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm">
                <FaUsers className="text-lg" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Capacity</p>
                <p className="text-sm font-bold text-slate-800">{car.seats} Seats</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm">
                <FaMapMarkerAlt className="text-lg" />
              </div>
              <div className="max-w-[120px]">
                <p className="text-xs text-slate-400 font-medium">Location</p>
                <p className="text-sm font-bold text-slate-800 truncate">{car.location}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Rental Includes</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
              <span className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500 shrink-0" /> Free Cancellation</span>
              <span className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500 shrink-0" /> Full Tank Fuel Option</span>
              <span className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500 shrink-0" /> 24/7 Roadside Assistance</span>
              <span className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500 shrink-0" /> Clean & Sanitized Interior</span>
            </div>
          </div>

      
          <BookingButtonClient car={car} />

        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;