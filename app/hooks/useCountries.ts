import countries from "world-countries";

const formatCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

export default function useCountries() {
  function getAllCountries() {
    return formatCountries;
  }

  function getByValue(value: string) {
    return formatCountries.find((country) => country.value === value);
  }

  return {
    getAllCountries,
    getByValue,
  };
}
