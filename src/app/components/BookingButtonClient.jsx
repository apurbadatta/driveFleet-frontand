"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { Button, Modal } from "@heroui/react";
import { CircleCheck, CircleInfo } from "@gravity-ui/icons";

export default function BookingButtonClient({ car }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    if (!user) {
      toast.error("Please login first to book a car!");
      return;
    }
    setIsOpen(true);
  };

  const handleBookingConfirm = async () => {
    setIsOpen(false);
    setLoading(true);

    const bookingData = {
      carId: car._id,
      carName: car.carName,
      carImage:
        car.image ||
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000",
      carModel: car.carType,
      totalPrice: car.pricePerDay,

      bookedByName: user.name,
      bookedByEmail: user.email,
      bookedByUserImage: user.image,
      bookingDate: new Date().toLocaleDateString(),
      status: "Confirmed",
    };

    try {
      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";
      const res = await fetch(`${serverUrl}/bookings`, {
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
    <>
      <button
        disabled={!car.isAvailable || loading}
        onClick={handleOpenModal}
        className={`w-full py-4 rounded-2xl font-bold text-base shadow-md transition-all duration-300 mt-4 ${
          car.isAvailable
            ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-600/20 active:scale-[0.99]"
            : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none"
        }`}
      >
        {loading
          ? "Processing..."
          : car.isAvailable
            ? "Proceed to Booking"
            : "Currently Unavailable"}
      </button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[400px]">
              <Modal.Header>
                <Modal.Icon className="bg-blue-50 text-blue-600 rounded-xl p-2">
                  <CircleInfo className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Confirm Your Booking</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-slate-500">
                    Are you sure you want to book{" "}
                    <span className="font-bold text-slate-800">
                      {car.carName}
                    </span>
                    ? Review the rental summary below.
                  </p>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        {car.carName}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Type: {car.carType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Total Price</p>
                      <p className="font-black text-blue-600 text-base">
                        ${car.pricePerDay}
                      </p>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  slot="close"
                  variant="secondary"
                  className="font-semibold rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBookingConfirm}
                  className="bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700"
                >
                  <CircleCheck className="size-4 mr-1" /> Confirm
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
