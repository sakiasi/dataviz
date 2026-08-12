import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { handleSelectCountries } from "../services/handleSelectCountries";
import { useSeaLevelAnalysis } from "../services/seaLevelAnalysis";
import SeaChart from "./SeaLevelChart";
import { Switch } from "./ui/Switch";
import SeaCorrelationChart from "./SeaCorrelationChart";

export default function SeaLevelComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);

  const { selectedCountries, setSelectedCountries, countryList } =
    useSeaLevelAnalysis();

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight">
        Is the sea level rising ?
      </h1>

      <div className="border-b border-primary"></div>

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
          className="flex justify-around md:w-3/6 p-2 hover:text-secondary hover:cursor-pointer hover:bg-primary items-center border-primary border-b"
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

      <SeaChart selectedCountries={selectedCountries} />

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

      <div className="">
        Based on the data, the sea levels across all of these Pacific island
        regions are steadily going up over time. Some places are seeing a much
        faster climb than others: Papua New Guinea and the Solomon Islands are
        experiencing the most rapid increases, meaning their water levels are
        rising the quickest. On the other hand, places like Tokelau and the
        Northern Mariana Islands have the slowest rise, meaning their changes
        are happening at a much more gradual pace.
      </div>

      <div>
        <SeaCorrelationChart selectedCountries={selectedCountries} />
      </div>

      <p className="text-sm">
        <span className="font-bold">Note: </span>We used statistical
        calculations on sea level and temperature data to determine the warming
        rates and connection strengths for each island nation.
      </p>

      <div>
        <p>
          Data shows that rising surface heat are closely tied to sea level
          increases across most of the Pacific, with surface heat and sea level
          changes matching up to 50% of the time in the hardest-hit areas.
          Islands like Micronesia and Palau see the strongest impact, where
          temperature shifts account for nearly half of their sea level changes.
          On the flip side, the Marshall Islands is a major exception, showing
          virtually no connection (0.1%) between temperature and sea level
          shifts, proving that local ocean conditions play a massive role there.
        </p>
      </div>
    </div>
  );
}
