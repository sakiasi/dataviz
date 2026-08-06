import { useState } from "react";
import SeaChart from "./SeaChart";
import { ChevronUp, ChevronDown, CircleCheck } from "lucide-react";
import { handleSelectCountries } from "../services/handleSelectCountries";
import { useSeaAnalysis } from "../services/seaAnalysis";

export default function SeaComponent() {

  const [isCountrySelect, setIsCountrySelect] = useState(false);
  const { selectedCountries, setSelectedCountries, countryList } = useSeaAnalysis();

  return (
    <div className="text-slate-100 space-y-5">
      <h1 className="text-2xl font-bold text-white tracking-tight">
        Is Our Ocean Warming Up?
      </h1>

      <div className="border-b border-slate-800"></div>

      <div className="text-slate-300 leading-relaxed space-y-5 max-w-3xl">
        <p>
          According to
          <a
            className="text-xs pl-1 text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
            href="https://www.science.org/doi/10.1126/science.aav7619"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trenberth, K. E. (2019)
          </a>
          , The ocean acts as the Earth’s thermal buffer, absorbing the vast
          majority of excess atmospheric heat. Consequently, rising mean surface
          temperatures translate directly into warmer oceans, establishing a
          clear, ongoing trend in sea surface temperature anomalies.
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
              ? "absolute w-full top-16 h-96 overflow-y-auto z-10 flex-col border bg-slate-700 rounded-md border-slate-900 shadow-xl"
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

      <SeaChart selectedCountries={selectedCountries} />

      <p className="text-xs text-slate-400 italic">
        Data from Surface Temperature anomalies.csv and Sea Level Anomalies.csv
      </p>

      <div className="text-slate-300">
        Data shows annual temperature variations and thermal anomaly trends.
      </div>

    </div>
  );
}
