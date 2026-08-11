import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { handleSelectCountries } from "../services/handleSelectCountries";
import { useImpactPersonAnalysis } from "../services/impactPersonAnalysis";
import ImpactPersonChart from "./ImpactPersonChart";
import { Switch } from "./ui/Switch";

export default function ImpactPersonComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);

  const { selectedCountries, setSelectedCountries, countryList } =
    useImpactPersonAnalysis();

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight">
        Does surface heat impact human lives ?
      </h1>

      <div className="border-b border-primary"></div>

      <div className=" leading-relaxed max-w-3xl">
        <p>
          According to
          <a
            className=" pl-1 hover:text-primary transition-colors underline decoration-primary underline-offset-2"
            href="https://www.undrr.org/media/89310/download"
            target="_blank"
            rel="noopener noreferrer"
          >
            United Nations Office for Disaster Risk Reduction [UNDRR] (2023)
          </a>
          , intensifying climate hazards translate directly into frequent
          extreme weather events across the Pacific. As rising seas and changing
          climatic patterns destabilize vulnerable communities, a growing number
          of island residents face immediate displacement, property destruction,
          and disruption to livelihoods—highlighting the critical human cost of
          environmental change in the region.
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
        <ImpactPersonChart selectedCountries={selectedCountries} />
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
        The data highlights sharp contrasts in the human impact of disasters
        across the Pacific: nations like Fiji, the Solomon Islands, and Tonga
        experience massive, steeply rising numbers of directly affected
        individuals over time, whereas countries like Papua New Guinea show a
        downward slope, and several territories report minimal or flat trend
        lines.
      </div>
    </div>
  );
}
