"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";

import { Listing, User } from "@prisma/client";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

export default function PropertiesCLient({
  listings,
  currentUser,
}: TripsClientProps) {
  const router = useRouter();

  const [deleteListingId, setDeleteListingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeleteListingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeleteListingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subTitle="List of your properties" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-10">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            // @ts-ignore
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deleteListingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
