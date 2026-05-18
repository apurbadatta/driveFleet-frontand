import Link from "next/link";
import { FaCar, FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center bg-slate-50 text-slate-800">
      <div className="relative mb-6">
        <h1 className="text-9xl font-extrabold text-slate-200 tracking-widest select-none">
          404
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <FaCar className="text-6xl text-blue-600 animate-bounce" />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
        Oops! You have Driven Off the Map
      </h2>
      <p className="text-slate-500 max-w-md mb-8 text-sm md:text-base">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable. Let's get you back on track!
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-base"
      >
        <FaHome />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
