"use client";

import Select from "react-select";

import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  value: string;
  label: string;
  latlng: number[];
  region: string;
  flag: string;
};

interface CountrySelectProps {
  value: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  const { getAllCountries } = useCountries();

  return (
    <div>
      <Select
        placeholder="Select Country"
        isClearable
        options={getAllCountries()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        // this is how you can customize the styles of the select component
        classNames={{
          control: () => "p-3 border-2",
          option: () => "text-lg",
          input: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "balck",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
}
