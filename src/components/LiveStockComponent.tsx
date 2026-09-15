import { useState } from "react";
import { useLivestockAnalysis } from "../services/liveStockAnalysis";
import LiveStockChart from "./LivestockChart";
import SelectCountryComponent from "./SelectCountryComponent";

export default function LiveStockComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);
  const { selectedCountries, setSelectedCountries, countryList } = useLivestockAnalysis();

  return (
    <div className="chapter-layout">
      <div className="chapter-copy">
        <p className="section-eyebrow">04B · Livestock</p>
        <h2 className="chapter-title">The same uneven pattern appears in livestock productivity.</h2>
        <p className="chapter-lead">
          Livestock yields rise in some places and fall in others. Heat stress can reduce animal
          productivity, yet feed quality, breeds, disease, rainfall and farm management also shape
          the observed record.
        </p>
        <p>
          That makes the variation itself useful: it warns against turning a regional warming
          signal into a single regional estimate of agricultural damage.
        </p>
        <div className="finding-card">
          <p className="finding-label">What the data adds</p>
          <p>
            Climate risk is shared, but food-system sensitivity is local. Adaptation therefore
            needs local agricultural evidence alongside regional climate monitoring.
          </p>
        </div>
      </div>

      <div className="chapter-viz">
        <div className="chart-heading">
          <div>
            <p className="chart-label">Livestock yield</p>
            <p className="chart-subtitle">Observed kilograms per animal</p>
          </div>
          <span className="chart-unit">kg/animal</span>
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
          <LiveStockChart selectedCountries={selectedCountries} />
        </div>
        <p className="figure-note">
          <strong>Fig. 5.</strong> Livestock yield histories. The chart is descriptive and does
          not isolate temperature from other drivers of productivity.
        </p>
      </div>
    </div>
  );
}
