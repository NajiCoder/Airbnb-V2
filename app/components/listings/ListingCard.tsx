"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { Listing, Reservation, User } from "@prisma/client";

import useCountries from "@/app/hooks/useCountries";

import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
}

export default function ListingCard({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: ListingCardProps) {
  const router = useRouter();

  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue); // we only stored the locationValue in the database, so we need to get the full location object from the countries hook

  const handleCancel = useCallback(() => {
    // learn more about React.MouseEvent<HTMLButtonElement> here: https://fettblog.eu/typescript-react/events/
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    };
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return `$${reservation.totalPrice}`;
    }

    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="group col-span-1 cursor-pointer"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="relative aspect-square w-full  overflow-hidden rounded-xl">
          <Image
            alt="Listing image"
            src={data.imageSrc}
            fill
            className="w-full h-full object-cover group-hover:scale-110 transition"
          />
          <div className="absolue top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.catagory}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold ">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            label={actionLabel}
            small
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
