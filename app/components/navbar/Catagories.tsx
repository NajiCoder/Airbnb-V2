"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";

import CatogoryBox from "../CatogoryBox";

export const catagories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This prperty is close to the beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This prperty has Windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This prperty is modern",
  },
  {
    label: "CountrySide",
    icon: TbMountain,
    description: "This prperty is in the countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This prperty has a pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This prperty is on an island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This prperty is close to a lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This prperty has skiing activities",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This prperty is in a castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This prperty has camping activities",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This prperty is in the arctic",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This prperty is close to a cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This prperty is in the desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This prperty is in a barn",
  },
  {
    label: "Luxury",
    icon: IoDiamond,
    description: "This prperty is luxurious",
  },
];

export default function Catagories() {
  const params = useSearchParams();
  const catagory = params?.get("catagory");
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  if (!isHomePage) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
      {catagories.map((item) => (
        <CatogoryBox
          key={item.label}
          label={item.label}
          icon={item.icon}
          selected={catagory === item.label} // if the catagory in the query is the same as the catagory we are currently mapping, then we want to set the selected prop to true
        />
      ))}
    </div>
  );
}
