import React from 'react';
import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";


const HomePageCard = async ({cars}) => {
  

  if (cars.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 w-full col-span-full">
        <p className="text-lg font-medium">No cars available right now.</p>
        <p className="text-sm">Please ensure your Express server is running on port 8000.</p>
      </div>
    );
  }

  return (
   
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {cars.map((car) => (
        <div
          key={car._id}
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group"
        >
          
         
          <div className="relative h-48 md:h-52 w-full overflow-hidden bg-slate-100">
            <img
              src={car.image || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600"}
              alt={car.carName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span
              className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-sm border ${
                car.isAvailable
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : "bg-rose-100 text-rose-700 border border-rose-200"
              }`}
            >
              {car.isAvailable ? "Available" : "Rented Out"}
            </span>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            
         
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">
                {car.carType}
              </span>
              <div className="text-slate-900">
                <span className="text-xl font-extrabold">${car.pricePerDay}</span>
                <span className="text-xs text-slate-500">/day</span>
              </div>
            </div>

          
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {car.carName}
            </h3>

            <p className="text-slate-500 text-xs md:text-sm line-clamp-2 mb-4 leading-relaxed">
              {car.description}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-slate-600 text-xs md:text-sm mt-auto">
              <div className="flex items-center gap-2">
                <FaUsers className="text-blue-500 shrink-0" />
                <span>{car.seats} Seats</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500 shrink-0" />
                <span className="truncate">{car.location}</span>
              </div>
            </div>

            <button
              disabled={!car.isAvailable}
              className={`w-full mt-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                car.isAvailable
                  ? "bg-slate-900 hover:bg-blue-600 text-white hover:shadow-blue-500/10 active:scale-[0.98]"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {car.isAvailable ? "Book Now" : "Unavailable"}
            </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePageCard;