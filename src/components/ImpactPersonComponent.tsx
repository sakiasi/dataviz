import { useState } from "react";
import { useImpactPersonAnalysis } from "../services/impactPersonAnalysis";
import ImpactPersonChart from "./ImpactPersonChart";
import SelectCountryComponent from "./SelectCountryComponent";

export default function ImpactPersonComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);
  const { selectedCountries, setSelectedCountries, countryList } = useImpactPersonAnalysis();

  return (
    <div className="chapter-layout">
      <div className="chapter-copy">
        <p className="section-eyebrow">05 · People</p>
        <h2 className="chapter-title">Climate pressure becomes human impact through disasters and exposure.</h2>
        <p className="chapter-lead">
          The number of people directly affected by disasters is not a smooth climate indicator.
          It arrives in sharp event-driven spikes — and those spikes can dominate a country’s record.
        </p>
        <p>
          A cyclone, flood or other hazard becomes a disaster through the interaction of the
          event with where people live, the assets exposed and the capacity to prepare and recover.
          Reporting coverage also differs across places and years.
        </p>
        <div className="finding-card">
          <p className="finding-label">Read spikes, not a straight line</p>
          <p>
            This view is most useful for seeing the scale and timing of recorded impacts. A simple
            long-run slope can hide the episodic nature of disasters.
          </p>
        </div>
      </div>

      <div className="chapter-viz">
        <div className="chart-heading">
          <div>
            <p className="chart-label">People directly affected by disasters</p>
            <p className="chart-subtitle">Recorded annual counts</p>
          </div>
          <span className="chart-unit">people</span>
        </div>
        <div className="relative mt-5">
          <SelectCountryComponent
            countryList={countryList}
            isCountrySelect={isCountrySelect}
            selectedCountries={selectedCountries}
            setIsCountrySelect={setIsCountrySelect}
            setSelectedCountries={setSelectedCountries}
          />
        </div>
        <div className="mt-6 h-[420px]">
          <ImpactPersonChart selectedCountries={selectedCountries} />
        </div>
        <p className="figure-note">
          <strong>Fig. 6.</strong> Recorded people directly affected by disasters. Missing or zero
          values should not automatically be interpreted as proof that no impact occurred.
        </p>
      </div>
    </div>
  );
}
