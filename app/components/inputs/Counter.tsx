"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

export default function Counter({
  title,
  subtitle,
  value,
  onChange,
}: CounterProps) {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className=" font-light text-gray-500">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="flex items-center justify-center w-10 h-10 text-neutral-400 rounded-full border-[1px] border-neutral-400 cursor-pointer hover:opacity-80 transition "
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-xl text-neutral-800">{value}</div>
        <div
          onClick={onAdd}
          className="flex items-center justify-center w-10 h-10 text-neutral-400 rounded-full border-[1px] border-neutral-400 cursor-pointer hover:opacity-80 transition "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
}
