import { ChevronDown, ChevronUp, CircleCheck } from "lucide-react";
import { useState } from "react";
import { useTemperature } from "../services/tempAnalysis";
import { handleSelectCountries } from "../services/handleSelectCountries";
import { TemperatureChart } from "./TempChart";

export default function TempComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);

  // Pass selectedCountries into the hook so it re-filters dynamically
  const { countryList, selectedCountries, setSelectedCountries } = useTemperature();

  return (
    <div className="text-slate-100 space-y-5">
      <h1 className="text-2xl font-bold text-white tracking-tight">
        Is the Temperature Actually Rising?
      </h1>

      <div className="border-b border-slate-800"></div>
      <div className="text-slate-300 leading-relaxed space-y-5 mb-10 max-w-3xl">
        <p>
          <a
            className="text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
            href="https://berkeleyearth.org/global-temperature-report-for-2025/"
          >
            According to Berkeley Earth's 2025 report
          </a>
          , 2025 was the third warmest year on record since 1850, trailing only
          2024 and 2023, with global annual averages reaching 1.44 ± 0.09 °C
          above pre-industrial levels. Despite beginning and ending with a
          modest La Niña event, the year experienced continued extreme warmth
          driven by greenhouse gases, natural variability, and factors like
          reduced cloud cover and sulfur aerosols.
        </p>
      </div>

      <div className="relative">
        <div
          onMouseDown={() => setIsCountrySelect((prev) => !prev)}
          className="flex justify-around md:w-3/6 p-2 rounded-md hover:cursor-pointer hover:bg-slate-800 items-center border-slate-800 border-2"
        >
          <p> Select Country ({selectedCountries.length} selected) </p>
          {isCountrySelect ? <ChevronUp /> : <ChevronDown />}
        </div>

        <div
          className={`${
            isCountrySelect
              ? "absolute w-full top-16 h-90 overflow-y-auto z-10 flex-col border bg-slate-700 rounded-md border-slate-900 shadow-xl"
              : "hidden"
          }`}
        >
          {countryList
            .sort((a, b) => a.localeCompare(b))
            .map((d, index) => (
              <div
                key={index}
                className="hover:cursor-pointer hover:bg-slate-900 p-2 border-b border-slate-900 flex items-center gap-5"
                onMouseDown={() => {
                  handleSelectCountries(
                    d,
                    setSelectedCountries,
                    selectedCountries,
                  );
                }}
              >
                {selectedCountries.includes(d) && <CircleCheck color="green" />}
                <span>{d}</span>
              </div>
            ))}
        </div>
      </div>

      <TemperatureChart selectedCountries={selectedCountries} />

      <p>
        The slope for all pacific island countries is positive, which means
        their mean surface temperature is showing an upward trend. Papua New
        Guinea shows the steepest slope of 0.0069, meaning the temperature is
        rising faster and more aggressively over time. Meanwhile, Nauru shows
        the least steep slope of 0.0031 among all Pacific Island countries.
      </p>

    </div>
  );
}
