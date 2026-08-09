import { useState } from "react";
import SeaChart from "./SeaLevelChart";
import { ChevronUp, ChevronDown, CircleCheck } from "lucide-react";
import { handleSelectCountries } from "../services/handleSelectCountries";
import { useSeaLevelAnalysis } from "../services/seaLevelAnalysis";

export default function SeaLevelComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);

  const { selectedCountries, setSelectedCountries, countryList } = useSeaLevelAnalysis();

  return (
    <div className=" flex flex-col gap-5">

      <h1 className="text-2xl font-bold tracking-tight">
        Is the sea level rising ?
      </h1>

      <div className="border-b border-slate-800"></div>

      <div className=" leading-relaxed max-w-3xl">
        
        <p>
          According to
          <a
            className="pl-1 hover:text-primary transition-colors underline decoration-primary underline-offset-2"
            href="https://doi.org/10.1111/sjtg.12021"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nunn, P. D. (2013)
          </a>
          , as the oceans absorb excess atmospheric heat, thermal expansion and
          melting ice drive sea levels steadily upward. For low-lying island
          communities, this creeping tide directly threatens coastal
          infrastructure, freshwater sources, and agricultural land—establishing
          the physical catalyst for the displacement and economic losses seen
          across the region.
        </p>

      </div>

      <div className="relative">
        <div
          onMouseDown={() => setIsCountrySelect((prev) => !prev)}
          className="flex justify-around md:w-3/6 p-2 rounded-md hover:cursor-pointer hover:bg-primary items-center border-primary border"
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

      <SeaChart selectedCountries={selectedCountries} />

      <p className="text-xs  italic">
        Data from Surface Temperature anomalies.csv and Sea Level Anomalies.csv
      </p>

      <div className="">
        Based on the data, the sea levels across all of these Pacific island
        regions are steadily going up over time. Some places are seeing a much
        faster climb than others: Papua New Guinea and the Solomon Islands are
        experiencing the most rapid increases, meaning their water levels are
        rising the quickest. On the other hand, places like Tokelau and the
        Northern Mariana Islands have the slowest rise, meaning their changes
        are happening at a much more gradual pace.
      </div>

    </div>
  );
}
