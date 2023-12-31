"use client";

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  disabledDates: Date[];
  disabled?: boolean;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
}

export default function ListingReservation({
  price,
  totalPrice,
  dateRange,
  disabledDates,
  disabled,
  onChangeDate,
  onSubmit,
}: ListingReservationProps) {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2x font-semibold">$ {price}</div>
        <div className="text-neutral-600 font-light">per night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className=" p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="flex flex-row items-center justify-between p-4 font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
}
