import { useState } from "react";
import { useTemperature } from "../services/tempAnalysis";
import SelectCountryComponent from "./SelectCountryComponent";
import { TemperatureChart } from "./TempChart";

export default function TempComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);
  const { countryList, selectedCountries, setSelectedCountries } = useTemperature();

  return (
    <div className="chapter-layout">
      <div className="chapter-copy">
        <p className="section-eyebrow">01 · The signal</p>
        <h2 className="chapter-title">Every territory in the dataset is warming over the long run.</h2>
        <p className="chapter-lead">
          Across 22 Pacific Island countries and territories, the linear surface-temperature
          trend from 1970 to 2025 is positive. The median trend is about
          <strong> 0.16°C per decade</strong>.
        </p>
        <div className="finding-card">
          <p className="finding-label">What stands out</p>
          <p>
            The Federated States of Micronesia, Palau and Solomon Islands sit toward the faster
            end of the observed trends, while Pitcairn is slower. The direction, however, is
            consistent across the regional dataset.
          </p>
        </div>
        <p className="chapter-caveat">
          This is a long-run trend, not a claim that every individual year was hotter than the
          year before it. Annual anomalies still move up and down.
        </p>
      </div>

      <div className="chapter-viz">
        <div className="chart-heading">
          <div>
            <p className="chart-label">Surface temperature anomalies</p>
            <p className="chart-subtitle">Explore individual Pacific countries and territories</p>
          </div>
          <span className="chart-unit">°C</span>
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
          <TemperatureChart selectedCountries={selectedCountries} />
        </div>
        <p className="figure-note">
          <strong>Fig. 1.</strong> Annual surface temperature anomalies. Country selection changes
          the display only; the headline trend above uses all valid annual observations from
          1970–2025.
        </p>
      </div>
    </div>
  );
}
