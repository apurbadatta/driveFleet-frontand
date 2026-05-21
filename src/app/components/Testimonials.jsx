import React from "react";
import { FaStar } from "react-icons/fa";

const TestimonialsPage = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            What Our Clients Say
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            Don't just take our word for it. Explore the live rental experiences
            from our satisfied premium clients worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-500 text-sm">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic">
                "The car booking process was exceptionally smooth! The BMW M4 I
                rented was in pristine condition, spotless, and drove like an
                absolute dream. Highly recommended!"
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                AD
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Apurba Datta</h4>
                <p className="text-xs text-slate-400">Premium Member</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-500 text-sm">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic">
                "Incredible customer service! I needed to change my booking date
                via the dashboard at the last minute, and their dynamic instant
                cancellation system handled it flawlessly without extra fees."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                SR
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  Sajid Rahman
                </h4>
                <p className="text-xs text-slate-400">Business Traveler</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-500 text-sm">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic">
                "Affordable luxury rides with full transparency. No hidden
                charges at all. The automated email tracking and instant
                confirmation features make it so reliable."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                NH
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  Nadia Hasan
                </h4>
                <p className="text-xs text-slate-400">Regular Client</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPage;
