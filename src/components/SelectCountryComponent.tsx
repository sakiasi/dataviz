import { ChevronUp, ChevronDown } from "lucide-react";
import { handleSelectCountries } from "../services/handleSelectCountries";
import type React from "react";
import {Switch} from '../components/ui/Switch'

type SelectCountryType = {
    setIsCountrySelect: React.Dispatch<React.SetStateAction<boolean>>,
    selectedCountries: string[],
    isCountrySelect: boolean,
    countryList: string[],
    setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>
}

const SelectCountryComponent = ({setSelectedCountries,countryList, isCountrySelect, setIsCountrySelect ,selectedCountries}:SelectCountryType) => {

  return (
    <div className="relative">
      <div
        onMouseDown={() => setIsCountrySelect((prev) => !prev)}
        className="flex justify-end p-2 ml-auto w-fit hover:text-secondary hover:cursor-pointer hover:bg-primary items-center border-primary border-b"
      >
        <p> Select Country ({selectedCountries.length} selected) </p>
        {isCountrySelect ? <ChevronUp /> : <ChevronDown />}
      </div>

      <div
        onMouseLeave={() => setIsCountrySelect(false)}
        className={`${
          isCountrySelect
            ? "absolute w-full top-10 h-96 overflow-y-auto z-10 flex-col border bg-primary-foreground rounded-md border-primary shadow-xl"
            : "hidden"
        }`}
      >
        {countryList
          .sort((a, b) => a.localeCompare(b))
          .map((d, index) => (
            <div
              key={index}
              className="hover:cursor-pointer bg-foreground text-accent hover:bg-accent-foreground p-2 border-b border-secondary flex items-center gap-5"
              onMouseDown={() => {
                handleSelectCountries(
                  d,
                  setSelectedCountries,
                  selectedCountries,
                );
              }}
            >
              <Switch checked={selectedCountries.includes(d)} />
              <p>{d}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectCountryComponent;
