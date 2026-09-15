import { useState } from "react";
import { useCropAnalysis } from "../services/cropAnalysis";
import CropChart from "./CropChart";
import SelectCountryComponent from "./SelectCountryComponent";

export default function CropComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);
  const { selectedCountries, setSelectedCountries, countryList } = useCropAnalysis();

  return (
    <div className="chapter-layout">
      <div className="chapter-copy">
        <p className="section-eyebrow">04 · Food systems</p>
        <h2 className="chapter-title">Crop outcomes do not move in one Pacific-wide direction.</h2>
        <p className="chapter-lead">
          The crop-yield record is mixed. Some countries show rising yields over time, while
          others decline or fluctuate. That contrast is as important as the climate trend itself.
        </p>
        <p>
          Agricultural output responds to temperature, rainfall and extreme events, but also to
          crop mix, land use, technology, pests, markets and changes in farming practice. A simple
          temperature-to-yield regression cannot separate those influences.
        </p>
        <div className="finding-card">
          <p className="finding-label">The responsible reading</p>
          <p>
            Use this chart to compare observed yield histories — not to claim that one degree of
            warming mechanically produces a fixed gain or loss in every country.
          </p>
        </div>
      </div>

      <div className="chapter-viz">
        <div className="chart-heading">
          <div>
            <p className="chart-label">Crop yield</p>
            <p className="chart-subtitle">Observed kilograms per hectare</p>
          </div>
          <span className="chart-unit">kg/ha</span>
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
          <CropChart selectedCountries={selectedCountries} />
        </div>
        <p className="figure-note">
          <strong>Fig. 4.</strong> Crop yields from the Pacific Data Hub. Coverage and production
          systems differ by country, so cross-country comparisons should be interpreted with care.
        </p>
      </div>
    </div>
  );
}
