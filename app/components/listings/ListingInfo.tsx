"use client";

import { User } from "@prisma/client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons/lib";

import useCountries from "@/app/hooks/useCountries";

import Avatar from "../Avatar";
import ListingCatogory from "./ListingCatogory";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingInfoProps {
  user: User;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  catagory:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}

export default function ListingInfo({
  user,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
  catagory,
}: ListingInfoProps) {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <div className="">Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 text-neutral-500 font-light">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {catagory && (
        <ListingCatogory
          icon={catagory.icon}
          label={catagory.label}
          description={catagory.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
}
