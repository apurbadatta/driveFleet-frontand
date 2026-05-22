import AllCarPage from "../components/AllCarPage";
export const metadata = {
  title: "Explore Cars | DriveFleet",
  description: "Browse our extensive fleet of premium cars, sedans, SUVs, and luxury vehicles available for rent at the best prices.",
  keywords: ["browse cars", "SUV rental", "sedan rent", "affordable car hire"],
};
async function getCars() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching cars:", error);
    return []; 
  }
}

const CarsPage = async () => {
  const cars = await getCars();
  return <AllCarPage initialCars={cars} />;
};

export default CarsPage;