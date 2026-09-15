import { useState } from "react";
import { useEconomicLossAnalysis } from "../services/economicLossAnalysis";
import EconomicLossChart from "./EconomicLossChart";
import SelectCountryComponent from "./SelectCountryComponent";

export default function EconomicLossComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);
  const { selectedCountries, setSelectedCountries, countryList } = useEconomicLossAnalysis();

  return (
    <div className="chapter-layout">
      <div className="chapter-copy">
        <p className="section-eyebrow">05B · Cost</p>
        <h2 className="chapter-title">Recorded losses reveal the price of exposure — but the record is sparse.</h2>
        <p className="chapter-lead">
          Direct disaster losses can be enormous relative to small island economies, yet the
          available economic-loss series contains only a limited number of observations.
        </p>
        <p>
          Treat these values as documented losses for reported events, not a complete annual bill
          for climate change. Differences can reflect hazard severity, asset exposure, valuation
          methods and reporting coverage as well as resilience.
        </p>
        <div className="finding-card">
          <p className="finding-label">The data gap is part of the story</p>
          <p>
            Better and more consistent loss reporting would make it easier to compare risk,
            identify recurring vulnerabilities and measure whether adaptation is working.
          </p>
        </div>
      </div>

      <div className="chapter-viz">
        <div className="chart-heading">
          <div>
            <p className="chart-label">Direct disaster economic loss</p>
            <p className="chart-subtitle">Recorded values in US dollars</p>
          </div>
          <span className="chart-unit">USD</span>
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
          <EconomicLossChart selectedCountries={selectedCountries} />
        </div>
        <p className="figure-note">
          <strong>Fig. 7.</strong> Direct disaster economic losses in the available Pacific Data
          Hub records. The series is sparse and should not be read as a complete time series.
        </p>
      </div>
    </div>
  );
}
