"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight, FaCar } from "react-icons/fa";

const BannerPage = () => {
  const images = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative bg-slate-950 text-white  overflow-hidden shadow-xl min-h-[65vh] sm:min-h-[70vh] md:min-h-[75vh] flex flex-col justify-between p-6 md:p-12">
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-40 scale-100"
                : "opacity-0 scale-105"
            } transform transition-transform duration-4000`}
            style={{ backgroundImage: `url('${img}')` }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-900/60 to-slate-950 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-3xl mx-auto my-auto pt-8">
        <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
          <FaCar /> Premium Car Rental Platform
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-white">
          Drive Your Dream with{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400 block sm:inline">
            DriveFleet
          </span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-xl mb-8 leading-relaxed">
          Experience the ultimate freedom of the road. Choose from our extensive
          fleet of luxury sedans, rugged SUVs, and eco-friendly hatchbacks.
          Affordable rates, flexible booking, and 24/7 support.
        </p>

        <Link
          href="/cars"
          className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-base"
        >
          <span>Explore Cars</span>
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="relative z-20 flex justify-center gap-3 mt-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-16 h-10 sm:w-20 sm:h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              index === currentIndex
                ? "border-blue-500 scale-105 shadow-md shadow-blue-500/30 opacity-100"
                : "border-slate-700 opacity-50 hover:opacity-80"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full height-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default BannerPage;
