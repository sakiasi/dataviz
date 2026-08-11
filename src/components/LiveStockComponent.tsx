import { ChevronDown, ChevronUp, CircleCheck } from "lucide-react";
import { useState } from "react";
import { handleSelectCountries } from "../services/handleSelectCountries";
import LiveStockChart from "./LivestockChart";
import { useLivestockAnalysis } from "../services/liveStockAnalysis";
import { cn } from "../lib/util";

export default function LiveStockComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);

  const { selectedCountries, setSelectedCountries, countryList } =
    useLivestockAnalysis();

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-2xl font-bold  tracking-tight">
        Does surface heat reduce livestock yield ?
      </h1>

      <div className="border-b border-primary"></div>

      <div className=" leading-relaxed  max-w-3xl">
        <p>
          Climate change hits livestock just as hard as it hits crops, primarily
          through direct heat stress and the decline of the food they rely on.
          When temperatures climb, animals struggle to maintain their core body
          temperature, which forces their bodies to shift energy away from
          growth, milk production, and reproduction just to survive. It’s not
          just the heat, either; erratic rainfall and drought dry up pastures
          and reduce the quality of forage, while warmer, wetter conditions
          create a perfect breeding ground for new pests and diseases that
          compromise animal health.
          <a
            className=" pl-1 hover:text-primary transition-colors underline decoration-primary underline-offset-2"
            href="https://www.mdpi.com/2073-4433/13/1/140"
            target="_blank"
            rel="noopener noreferrer"
          >
            (Cheng et al., 2022).
          </a>
        </p>
      </div>

      <div className="relative">
        <div
          onMouseDown={() => setIsCountrySelect((prev) => !prev)}
          className="flex hover:text-secondary justify-around md:w-3/6 p-2 hover:cursor-pointer hover:bg-primary items-center border-primary border-b"
        >
          <p> Select Country ({selectedCountries.length} selected) </p>
          {isCountrySelect ? <ChevronUp /> : <ChevronDown />}
        </div>

        <div
          onMouseLeave={()=>setIsCountrySelect(false)}
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

      <div>
        <LiveStockChart selectedCountries={selectedCountries} />
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

      <div className="">
        The data highlights a clear divergence in livestock trends across the
        Pacific region, with nations like Kiribati, Micronesia, and Niue
        experiencing positive growth trajectories over time. In contrast,
        countries such as Fiji, French Polynesia, the Cook Islands, and Tuvalu
        face steep downward slopes in their livestock metrics.
      </div>
    </div>
  );
}
