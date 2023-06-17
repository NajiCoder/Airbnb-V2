"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();

  return (
    <Image
      src="/images/airbnb-logo.png"
      alt="airbnb logo"
      width={100}
      height={100}
      className="hidden md:block cursor-pointer"
    />
  );
}
