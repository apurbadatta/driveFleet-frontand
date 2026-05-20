"use client";

import React, { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { CircleInfo } from "@gravity-ui/icons";
import { FaTrashAlt } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function DeleteBookingModal({
  bookingId,
  carName,
  onDeleteSuccess,
}) {

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancelBooking = async () => {

    setLoading(true);

    try {

      // token 
      const tokenData = await authClient.token();

      const token = tokenData?.data?.token;

      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

      const res = await fetch(`${serverUrl}/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {

        setIsOpen(false);

        onDeleteSuccess(bookingId);

      } else {

        alert(data.message || "Failed to cancel booking.");

      }

    } catch (err) {

      console.error("Delete error:", err);

      alert("Something went wrong!");

    } finally {

      setLoading(false);

    }

  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-xl transition-colors"
        title="Cancel Booking"
      >
        <FaTrashAlt />
      </button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[380px]">

              <Modal.Header>
                <Modal.Icon className="bg-rose-50 text-rose-600 rounded-xl p-2">
                  <CircleInfo className="size-5" />
                </Modal.Icon>

                <Modal.Heading>
                  Cancel Booking
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Are you sure you want to cancel your rental booking for{" "}
                  <span className="font-bold text-slate-800">
                    {carName}
                  </span>
                  ?
                </p>
              </Modal.Body>

              <Modal.Footer>

                <Button
                  slot="close"
                  variant="secondary"
                  className="font-semibold rounded-xl"
                  disabled={loading}
                >
                  Keep Booking
                </Button>

                <Button
                  onClick={handleCancelBooking}
                  disabled={loading}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl"
                >
                  {
                    loading
                      ? "Cancelling..."
                      : "Yes, Cancel It"
                  }
                </Button>

              </Modal.Footer>

            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}