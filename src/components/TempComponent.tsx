import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { handleSelectCountries } from "../services/handleSelectCountries";
import { useTemperature } from "../services/tempAnalysis";
import { TemperatureChart } from "./TempChart";
import { Switch } from "./ui/Switch";

export default function TempComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);

  // Pass selectedCountries into the hook so it re-filters dynamically
  const { countryList, selectedCountries, setSelectedCountries } =
    useTemperature();

  return (
    <div className="text-foreground flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight normal-case">
        Is the surface heat rising ?
      </h1>

      <div className="border-b border-primary"></div>

      <div className="text-foreground leading-relaxed max-w-3xl">
        <p>
          {" "}
          According to{" "}
          <a
            className=" hover:text-primary transition-colors underline decoration-primary underline-offset-2"
            href="https://berkeleyearth.org/global-temperature-report-for-2025/"
          >
            Berkeley Earth's 2025 report
          </a>
          , 2025 was the third warmest year on record since 1850, trailing only
          2024 and 2023, with global annual averages reaching 1.44 ± 0.09 °C
          above pre-industrial levels.
        </p>
      </div>

      <div className="relative">
        <div
          onMouseDown={() => setIsCountrySelect((prev) => !prev)}
          className="flex justify-around md:w-3/6 p-2 hover:cursor-pointer hover:text-secondary hover:bg-primary items-center border-primary border-b"
        >
          <p> Select Country ({selectedCountries.length} selected) </p>
          {isCountrySelect ? <ChevronUp /> : <ChevronDown />}
        </div>

        <div
          onMouseLeave={() => setIsCountrySelect(false)}
          className={`${
            isCountrySelect
              ? "absolute w-full top-10 h-90 overflow-y-auto z-10 flex-col border bg-primary-foreground rounded-md border-primary shadow-xl"
              : "hidden"
          }`}
        >
          {countryList
            .sort((a, b) => a.localeCompare(b))
            .map((d, index) => (
              <div
                key={index}
                className="hover:cursor-pointer hover:bg-secondary p-2 border-b border-secondary flex items-center gap-5"
                onMouseDown={() => {
                  handleSelectCountries(
                    d,
                    setSelectedCountries,
                    selectedCountries,
                  );
                }}
              >
                <Switch checked={selectedCountries.includes(d)} />
                <span>{d}</span>
              </div>
            ))}
        </div>
      </div>

      <TemperatureChart selectedCountries={selectedCountries} />

      <p className="text-sm  mt-2">
        <span className="font-bold ">Fig 1.1 : </span>The X-axis represents the monitoring years,
        while the Y-axis tracks observed temperature anomalies relative to the
        baseline.
      </p>

      <p>
        Every Pacific Island territory and nation in the dataset shows
        continuous temperature increases year after year, confirming a
        widespread, regional warming trend without exception. French Polynesia,
        Tokelau, and Papua New Guinea are heating up at the fastest rates, while
        Pitcairn experiences the most gradual increase. The tight clustering of
        growth speeds across nearly all the other islands points to a systemic
        climate impact affecting the entire Pacific region rather than isolated
        local variations.
      </p>
    </div>
  );
}
