import React from "react";
import { FaShieldAlt, FaTags, FaHeadphones, FaSmile } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Our Core Values
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Why Choose DriveFleet?
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            We offer the perfect blend of premium luxury vehicles, affordable
            pricing, and elite customer service for an unmatched rental
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* কার্ড ১ */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <FaShieldAlt className="text-xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Fully Insured Rides
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Drive with absolute peace of mind. All our fleet premium cars come
              with comprehensive premium insurance coverage.
            </p>
          </div>

          {/* কার্ড ২ */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <FaTags className="text-xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              No Hidden Charges
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              What you see is what you pay. Transparent billing with fixed
              per-day rates and free instant cancellations.
            </p>
          </div>

          {/* কার্ড ৩ */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <FaHeadphones className="text-xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              24/7 Road Assistance
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Stuck anywhere anytime? Our elite support and mechanical team are
              always active to assist you on the road.
            </p>
          </div>

          {/* কার্ড ৪ */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <FaSmile className="text-xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Sanitized & Clean
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your health is our priority. Every car goes through deep
              professional cleaning and sanitization before delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
