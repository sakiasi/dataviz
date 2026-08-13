import { useState } from "react";
import { useImpactPersonAnalysis } from "../services/impactPersonAnalysis";
import ImpactPersonChart from "./ImpactPersonChart";
import SelectCountryComponent from "./SelectCountryComponent";

export default function ImpactPersonComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);

  const { selectedCountries, setSelectedCountries, countryList } =
    useImpactPersonAnalysis();

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight text-center md:text-start">
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
        <SelectCountryComponent
          countryList={countryList}
          isCountrySelect={isCountrySelect}
          selectedCountries={selectedCountries}
          setIsCountrySelect={setIsCountrySelect}
          setSelectedCountries={setSelectedCountries}
        />
      </div>

      <div>
        <ImpactPersonChart selectedCountries={selectedCountries} />
      </div>

      <p className="text-sm mt-2">
        <span className="font-bold">Fig 6.0 : </span>The X-axis represents the
        monitoring years, while the Y-axis tracks observed individuals affected
        by natural disaster.
      </p>

      <div>
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
