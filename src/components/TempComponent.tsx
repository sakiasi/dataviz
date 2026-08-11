import { ChevronDown, ChevronUp, CircleCheck } from "lucide-react";
import { useState } from "react";
import { useTemperature } from "../services/tempAnalysis";
import { handleSelectCountries } from "../services/handleSelectCountries";
import { TemperatureChart } from "./TempChart";

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
          above pre-industrial levels. Despite beginning and ending with a
          modest La Niña event, the year experienced continued extreme warmth
          driven by greenhouse gases, natural variability, and factors like
          reduced cloud cover and sulfur aerosols.
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
          className={`${
            isCountrySelect
              ? "absolute w-full top-16 h-90 overflow-y-auto z-10 flex-col border bg-primary-foreground rounded-md border-primary shadow-xl"
              : "hidden"
          }`}
        >
          {countryList
            .sort((a, b) => a.localeCompare(b))
            .map((d, index) => (
              <div
                key={index}
                className="hover:cursor-pointer hover:bg-primary p-2 border-b border-secondary flex items-center gap-5"
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

      <p
        style={{
          fontSize: "0.85rem",
          color: "#6c757d",
          fontStyle: "italic",
          marginTop: "8px",
          lineHeight: "1.4",
        }}
      >
        <strong>Note.</strong> Livestock yield data (Kg/Ha) spanning 1962–2022
        generated from <em>Surface Temperature anomalies.csv</em> and{" "}
        <em>Sea Level Anomalies.csv</em>.
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
