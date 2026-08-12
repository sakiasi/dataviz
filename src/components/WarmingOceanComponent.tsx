import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { handleSelectCountries } from "../services/handleSelectCountries";
import { useWarmingOceanAnalysis } from "../services/useWarningOceanAnalysis";
import WarmingOceanChart from "./WarmingOceanChart";
import { Switch } from "./ui/Switch";
import OceanCorrelationChart from "./OceanCorrelationChart";

const WarmingOceanComponent = () => {
  const [isCountrySelect, setIsCountrySelect] = useState(false);

  const { selectedCountries, setSelectedCountries, countryList } =
    useWarmingOceanAnalysis();

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight">
        Does surface heat warm the ocean ?
      </h1>

      <div className="border-b border-primary"></div>

      <div className=" leading-relaxed flex flex-col gap-5 max-w-3xl">
        <p>
          According to
          <a
            className="pl-1 hover:text-primary transition-colors underline decoration-primary underline-offset-2"
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

      <div>
        <WarmingOceanChart selectedCountries={selectedCountries} />
      </div>

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

      <div>
        <p>
          The data shows that sea surface temperatures across all of these
          Pacific island regions are steadily warming over time. While every
          area is experiencing an upward trend, Kiribati and Tokelau are seeing
          the most rapid increases in sea temperatures, whereas Palau and Nauru
          are experiencing the slowest warming rates.
        </p>
      </div>

      <div>
        <OceanCorrelationChart selectedCountries={selectedCountries} />
      </div>

      <p className="text-sm">
        <span className="font-bold">Note: </span>20 out of 21 nations clustering
        tightly in the top-right corner. French Polynesia sits uniquely lower as
        the region's only slow-warming outlier.
      </p>

      <div>
        <p>
          Data shows a powerful relationship between rising surface heat
          and ocean warming across the Pacific. In 20 out of 21 nations,
          atmospheric fluctuations closely match over 91% of marine heat
          trends—clustering tightly in a near-perfect, 1:1 thermal lockstep
          where every 1°C of air warming corresponds to roughly 1°C of sea
          warming. French Polynesia sits uniquely lower as the region's only
          slow-warming outlier, experiencing an ocean temperature increase of
          0.65°C per degree of air warming.
        </p>
      </div>
    </div>
  );
};

export default WarmingOceanComponent;
