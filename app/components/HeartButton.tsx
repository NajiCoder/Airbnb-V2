"use client";

import { User } from "@prisma/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

export default function HeartButton({
  listingId,
  currentUser,
}: HeartButtonProps) {
  const hasFavorited = false;

  const toggleFavorite = () => {};

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition-opacity cursor-pointer "
    >
      <AiOutlineHeart
        size={28}
        className="absolute -top-[1px] -right-[1px] fill-white"
      />
      <AiFillHeart
        size={28}
        className={`absolute -top-[1px] -right-[1px] ${
          hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"
        }`}
      />
    </div>
  );
}
