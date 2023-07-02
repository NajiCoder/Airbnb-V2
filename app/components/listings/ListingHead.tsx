"use client";

import { User } from "@prisma/client";
import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  id: string;
  locationValue: string;
  imageSrc: string;
  title: string;
  currentUser?: User | null;
}

export default function ListingHead({
  id,
  locationValue,
  imageSrc,
  title,
  currentUser,
}: ListingHeadProps) {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subTitle={`${location?.region} , ${location?.label}`}
      />
      <div className="relative w-full h-[60vh] overflow-hidden rounded-xl">
        <Image
          alt="Listing image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
      </div>
      <div className="absolute top-[200px]">
        <HeartButton listingId={id} currentUser={currentUser} />
      </div>
    </>
  );
}
