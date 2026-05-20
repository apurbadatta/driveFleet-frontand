import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import HomePageCard from "./HomePageCard";

async function getHomeCars() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${serverUrl}/cars?limit=6`, { cache: "no-store" });

  return res.json();
}

export default async function HomePage() {
  const cars = await getHomeCars();

  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
          <span className="text-blue-600 font-bold text-sm uppercase tracking-wider block mb-2">
            Hot Deals
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Our Available Fleet
          </h2>
        </div>
        <Link
          href="/cars"
          className="group flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition"
        >
          <span>See All Cars</span>
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <HomePageCard cars={cars}></HomePageCard>
    </section>
  );
}
