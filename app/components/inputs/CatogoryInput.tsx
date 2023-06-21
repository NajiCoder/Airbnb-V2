"use client";

import { IconType } from "react-icons/lib";

interface CatogoryInputProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (value: string) => void;
}

export default function CatogoryInput({
  label,
  icon: Icon,
  selected,
  onClick,
}: CatogoryInputProps) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col gap-3 border-2 rounded-xl p-4 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200  "
      } `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
}
