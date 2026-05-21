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

  const getToken = async () => {
    try {
      const tokenData = await authClient.getToken?.();
      return tokenData?.token || null;
    } catch (err) {
      console.log("Token error:", err);
      return null;
    }
  };

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

    try {
      const token = await getToken();

      if (!token) {
        toast.error("Authentication failed. Please login again.");
        return;
      }

      const bookingData = {
        carId: car._id,
        carName: car.carName,
        carImage: car.image,
        carModel: car.carType,
        totalPrice: car.pricePerDay,

        bookedByName: user.name,
        bookedByEmail: user.email,
        bookedByUserImage: user.image,

        bookingDate: new Date().toLocaleDateString(),
        status: "Confirmed",
      };

      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

      console.log("Sending request to:", serverUrl);

      const res = await fetch(`${serverUrl}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.log("Server error:", errorText);
        toast.error("Booking failed on server!");
        return;
      }

      const data = await res.json();

      toast.success("Car Booked Successfully!");
    } catch (error) {
      console.error("Network error:", error);
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
        className={`w-full py-4 rounded-2xl font-bold mt-4 ${
          car.isAvailable
            ? "bg-blue-600 text-white"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {loading
          ? "Processing..."
          : car.isAvailable
          ? "Proceed to Booking"
          : "Unavailable"}
      </button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Icon>
                  <CircleInfo className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Confirm Booking</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <p>Book {car.carName}?</p>
              </Modal.Body>

              <Modal.Footer>
                <Button slot="close">Cancel</Button>
                <Button onClick={handleBookingConfirm}>
                  <CircleCheck className="size-4 mr-1" />
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}