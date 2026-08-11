import { ChevronDown, ChevronUp, CircleCheck } from "lucide-react";
import { useState } from "react";
import { useEconomicLossAnalysis } from "../services/economicLossAnalysis";
import { handleSelectCountries } from "../services/handleSelectCountries";
import EconomicLossChart from "./EconomicLossChart";

export default function EconomicLossComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);

  const { selectedCountries, setSelectedCountries, countryList } =
    useEconomicLossAnalysis();

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight">
        What is the cost of surface heat ?
      </h1>

      <div className="border-b border-primary"></div>

      <div className=" leading-relaxed max-w-3xl">
        <p>
          According to
          <a
            className=" pl-1 hover:text-primary transition-colors underline decoration-primary underline-offset-2"
            href="https://www.undrr.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            United Nations Office for Disaster Risk Reduction (2021)
          </a>
          , recurring climate-driven extremes take a heavy financial toll on
          Pacific communities. Under Sustainable Development Goal indicator
          11.5.2, direct disaster economic losses measure the destruction of
          physical infrastructure, housing, and productive assets—turning
          environmental vulnerability into severe, quantifiable fiscal burdens
          for island economies.
        </p>
      </div>

      <div className="relative">
        <div
          onMouseDown={() => setIsCountrySelect((prev) => !prev)}
          className="flex justify-around md:w-3/6 p-2 hover:text-secondary hover:cursor-pointer hover:bg-primary items-center border-primary border-b"
        >
          <p> Select Country ({selectedCountries.length} selected) </p>
          {isCountrySelect ? <ChevronUp /> : <ChevronDown />}
        </div>

        <div
          className={`${
            isCountrySelect
              ? "absolute w-full top-16 h-96 overflow-y-auto z-10 flex-col border bg-primary-foreground rounded-md border-primary shadow-xl"
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

      <EconomicLossChart selectedCountries={selectedCountries} />

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
        generated from <em className="underline decoration-primary">Surface Temperature anomalies.csv</em> and{" "}
        <em>Sea Level Anomalies.csv</em>.
      </p>

      <div className="">
        The financial data reveals massive differences in how much disasters
        cost different Pacific islands over time: nations like Vanuatu and Fiji
        are facing skyrocketing costs with multi-million dollar upward spikes in
        damage, whereas countries like Micronesia and the Marshall Islands show
        a downward trend with lower recorded losses, while places like Kiribati,
        Samoa, French Polynesia, and New Caledonia report flat or zero change.
      </div>
    </div>
  );
}
