"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons/lib";
import qs from "query-string";

interface CatogoryBoxProps {
  label: string;
  icon: IconType;
  selected: boolean;
}

export default function CatogoryBox({
  label,
  icon: Icon,
  selected,
}: CatogoryBoxProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleCatagoryClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      catagory: label, // this is the label of the catagory that we clicked
    };

    // if we clicked on the same catagory again, we want to remove it from the query
    if (params?.get("catagory") === label) {
      delete updatedQuery.catagory;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleCatagoryClick}
      className={`flex flex-col items-center justify-center gap-2 border-b-2 p-3 hover:text-neutral-800 transition cursor-pointer
        ${selected ? "broder-b-neutral-800" : "border-transparent"} ${
        selected ? "text-rose-600" : "text-neutral-500"
      }
       `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
}
