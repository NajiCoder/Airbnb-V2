"use client";

import qs from "query-string";
import { formatISO } from "date-fns";

import dynamic from "next/dynamic";
import { Range } from "react-date-range";
import { useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";

import Heading from "../Heading";
import Counter from "../inputs/Counter";
import Calendar from "../inputs/Calendar";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export default function SearchModal() {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomsCount, setBathroomsCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuerry = {};

    if (params) {
      currentQuerry = qs.parse(params.toString());
    }

    const updatedQuerry: any = {
      ...currentQuerry,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomsCount,
    };

    if (dateRange.startDate) {
      updatedQuerry.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuerry.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuerry,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    location,
    guestCount,
    roomCount,
    bathroomsCount,
    dateRange,
    searchModal,
    router,
    params,
    onNext,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return "undefined";
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subTitle="find the perfect place to stay"
      />
      <CountrySelect
        // @ts-ignore
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subTitle="Making plans ahead?"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More info"
          subTitle="Let us know more about your stay"
        />
        <Counter
          title="Guests"
          subtitle="How many guests?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many Bathrooms do you need ?"
          value={bathroomsCount}
          onChange={(value) => setBathroomsCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
    />
  );
}
