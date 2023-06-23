"use client";

import { useState, useMemo } from "react";
import { FieldValues, set, useForm } from "react-hook-form";

import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";

import Heading from "../Heading";
import { catagories } from "../navbar/Catagories";
import CatogoryInput from "../inputs/CatogoryInput";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";

enum STEPS {
  CATAGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function RentModal() {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATAGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      catagory: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const catagory = watch("catagory"); // use watch to monitor catagory value change and update the form accordingly (e.g. show location input if catagory is selected)
  const location = watch("location");

  // we have to use useMemo to dynamically import the map component because (not sure yet but maybe "it uses the window object which is not available on the server")
  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  function setCustomValue(id: string, value: any) {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  function onNext() {
    setStep((prev) => prev + 1);
  }

  function onBack() {
    setStep((prev) => prev - 1);
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATAGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subTitle="Pick a catagory"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {catagories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CatogoryInput
              label={item.label}
              icon={item.icon}
              onClick={(catagory) => {
                setCustomValue("catagory", catagory);
              }}
              selected={catagory === item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subTitle="help guests find your place"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Rent"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATAGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      body={bodyContent}
      footer={<div>Footer</div>}
    />
  );
}
