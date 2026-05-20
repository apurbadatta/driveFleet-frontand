"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AddCarPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    carName: "",
    carType: "SUV",
    pricePerDay: "",
    seats: "5",
    location: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      // token 
      const tokenData = await authClient.token();

      const token = tokenData?.data?.token;

      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

      const res = await fetch(`${serverUrl}/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Something went wrong!");
      }

      toast.success("Car added successfully! 🏎️");

      router.push("/cars");

    } catch (error) {

      console.error(error);

      toast.error(error.message || "Failed to add car!");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl min-h-[85vh]">

      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-3">
            Add a New Car
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            Fill in the details to add a premium vehicle to the Fleet.
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">
                Car Name
              </label>

              <input
                type="text"
                name="carName"
                required
                value={formData.carName}
                onChange={handleChange}
                placeholder="e.g., Tesla Model X"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800 transition"
              />

            </div>

            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">
                Car Type
              </label>

              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800 transition"
              >
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
                <option value="Sedan">Sedan</option>
                <option value="Electric">Electric</option>
                <option value="Sports">Sports</option>
              </select>

            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">
                Price Per Day ($)
              </label>

              <input
                type="number"
                name="pricePerDay"
                required
                min="1"
                value={formData.pricePerDay}
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800 transition"
              />

            </div>

            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">
                Seats Capacity
              </label>

              <input
                type="number"
                name="seats"
                required
                min="2"
                max="20"
                value={formData.seats}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800 transition"
              />

            </div>

          </div>

          <div>

            <label className="block text-sm font-bold text-slate-700 mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Dhaka, Bangladesh"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800 transition"
            />

          </div>

          <div>

            <label className="block text-sm font-bold text-slate-700 mb-2">
              Image URL
            </label>

            <input
              type="url"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/car-image.jpg"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800 transition"
            />

          </div>

          <div>

            <label className="block text-sm font-bold text-slate-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800 transition resize-none"
            ></textarea>

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-300 shadow-md ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/20 active:scale-[0.99]"
            }`}
          >
            {loading ? "Adding Car..." : "Add Vehicle to Fleet"}
          </button>

        </form>

      </div>

    </div>
  );
}