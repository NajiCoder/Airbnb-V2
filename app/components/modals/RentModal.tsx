"use client";

import axios from "axios";

import { toast } from "react-hot-toast";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

import dynamic from "next/dynamic";

import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";

import Heading from "../Heading";

import Input from "../inputs/Input";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import CatogoryInput from "../inputs/CatogoryInput";
import CountrySelect from "../inputs/CountrySelect";

import { catagories } from "../navbar/Catagories";

enum STEPS {
  CATAGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function RentModal() {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATAGORY);
  const [isLoading, setIsLoading] = useState(false);

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
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created successfully");
        router.refresh();
        reset();
        setStep(STEPS.CATAGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some details about your place"
          subTitle="What ameneties do you have"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add some photos of your place"
          subTitle="Showcase your place to guests"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subTitle="Write a short description"
        />
        <Input
          id="title"
          label="Title"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How much do you want to charge?"
          subTitle="Set a price per night"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          register={register}
          disabled={isLoading}
          errors={errors}
          required
        />
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
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={<div>Footer</div>}
    />
  );
}
