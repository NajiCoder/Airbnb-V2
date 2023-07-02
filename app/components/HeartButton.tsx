"use client";

import { User } from "@prisma/client";

import useFavorite from "../hooks/useFavorite";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

export default function HeartButton({
  listingId,
  currentUser,
}: HeartButtonProps) {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition-opacity cursor-pointer "
    >
      <AiOutlineHeart
        size={28}
        className="absolute top-2 left-[164px] fill-white"
      />
      <AiFillHeart
        size={28}
        className={`absolute top-2 left-[164px] ${
          hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"
        }`}
      />
    </div>
  );
}
