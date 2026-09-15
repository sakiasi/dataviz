import { ChevronDown, ChevronUp } from "lucide-react";
import type React from "react";
import { handleSelectCountries } from "../services/handleSelectCountries";
import { Switch } from "./ui/Switch";

type SelectCountryType = {
  setIsCountrySelect: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCountries: string[];
  isCountrySelect: boolean;
  countryList: string[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelectCountryComponent = ({
  setSelectedCountries,
  countryList,
  isCountrySelect,
  setIsCountrySelect,
  selectedCountries,
}: SelectCountryType) => {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsCountrySelect((prev) => !prev)}
        className="country-selector"
        aria-expanded={isCountrySelect}
      >
        <span>Select country ({selectedCountries.length} selected)</span>
        {isCountrySelect ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <div
        onMouseLeave={() => setIsCountrySelect(false)}
        className={isCountrySelect ? "country-menu" : "hidden"}
      >
        {countryList.sort((a, b) => a.localeCompare(b)).map((country) => (
          <button
            type="button"
            key={country}
            className="country-option"
            onClick={() => handleSelectCountries(country, setSelectedCountries, selectedCountries)}
          >
            <Switch checked={selectedCountries.includes(country)} />
            <span>{country}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectCountryComponent;
