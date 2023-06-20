"use client";

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

export default function Avatar({ src }: AvatarProps) {
  return (
    <Image
      width="30"
      height="30"
      className="rounded-full"
      alt="Avatar"
      src={src || "/images/placeholder.jpg"}
    />
  );
}
