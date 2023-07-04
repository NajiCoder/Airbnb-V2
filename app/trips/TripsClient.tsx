"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";

import { Reservation, User } from "@prisma/client";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  reservations: Reservation[];
  currentUser?: User | null;
}

export default function TripsClient({
  reservations,
  currentUser,
}: TripsClientProps) {
  const router = useRouter();

  const [deleteReservationId, setDeleteReservationId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeleteReservationId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation Canceled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeleteReservationId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subTitle="Whare have you been and where are you going?"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-10">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            // @ts-ignore
            data={reservation.listing} // I can't figure out how to get the types to work here, so I'm just ignoring the error
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deleteReservationId === reservation.id}
            actionLabel="Cancel Reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
