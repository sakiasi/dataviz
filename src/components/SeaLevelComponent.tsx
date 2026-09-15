import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { handleSelectCountries } from "../services/handleSelectCountries";
import { useSeaLevelAnalysis } from "../services/seaLevelAnalysis";
import SeaChart from "./SeaLevelChart";
import { Switch } from "./ui/Switch";

export default function SeaLevelComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);
  const { selectedCountries, setSelectedCountries, countryList } = useSeaLevelAnalysis();

  return (
    <div className="chapter-layout">
      <div className="chapter-copy">
        <p className="section-eyebrow">03 · Rising water</p>
        <h2 className="chapter-title">Sea level is rising everywhere in this dataset — at unequal rates.</h2>
        <p className="chapter-lead">
          Across 21 Pacific countries and territories, the median linear sea-level trend from
          1993 to 2023 is approximately <strong>4.3 mm per year</strong>.
        </p>
        <p>
          Papua New Guinea and Solomon Islands are at the faster end of the observed trends at
          roughly 5.4 and 5.1 mm per year. Tokelau is slower at roughly 3.2 mm per year.
        </p>
        <div className="finding-card">
          <p className="finding-label">One regional direction, many local rates</p>
          <p>
            Local ocean circulation, winds, land motion and measurement variability can change
            the rate seen at a particular island. Those differences do not erase the regional
            upward signal.
          </p>
        </div>
      </div>

      <div className="chapter-viz">
        <div className="chart-heading">
          <div>
            <p className="chart-label">Sea-level anomalies</p>
            <p className="chart-subtitle">Annual observations, 1993–2023</p>
          </div>
          <span className="chart-unit">m</span>
        </div>

        <div className="relative mt-5">
          <div onMouseDown={() => setIsCountrySelect((prev) => !prev)} className="country-selector">
            <p>Select country ({selectedCountries.length} selected)</p>
            {isCountrySelect ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          <div onMouseLeave={() => setIsCountrySelect(false)} className={isCountrySelect ? "country-menu" : "hidden"}>
            {countryList.sort((a, b) => a.localeCompare(b)).map((country) => (
              <div
                key={country}
                className="country-option"
                onMouseDown={() => handleSelectCountries(country, setSelectedCountries, selectedCountries)}
              >
                <Switch checked={selectedCountries.includes(country)} />
                <span>{country}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 h-[420px]">
          <SeaChart selectedCountries={selectedCountries} />
        </div>
        <p className="figure-note">
          <strong>Fig. 3.</strong> Sea-level anomalies by country or territory. The regional
          headline is the median of country-level linear trends, 1993–2023.
        </p>
      </div>
    </div>
  );
}
