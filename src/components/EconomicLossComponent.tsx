import { useState } from "react";
import { useEconomicLossAnalysis } from "../services/economicLossAnalysis";
import EconomicLossChart from "./EconomicLossChart";
import SelectCountryComponent from "./SelectCountryComponent";

export default function EconomicLossComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);

  const { selectedCountries, setSelectedCountries, countryList } =
    useEconomicLossAnalysis();

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight text-center md:text-start">
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
        <SelectCountryComponent
          countryList={countryList}
          isCountrySelect={isCountrySelect}
          selectedCountries={selectedCountries}
          setIsCountrySelect={setIsCountrySelect}
          setSelectedCountries={setSelectedCountries}
        />
      </div>

      <EconomicLossChart selectedCountries={selectedCountries} />

      <p className="text-sm mt-2">
        <span className="font-bold">Fig 7.0 : </span>The X-axis
        represents the monitoring years, while the Y-axis tracks observed cost of damage from natural disasters.
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
