import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { handleSelectCountries } from "../services/handleSelectCountries";
import { useWarmingOceanAnalysis } from "../services/useWarningOceanAnalysis";
import WarmingOceanChart from "./WarmingOceanChart";
import { Switch } from "./ui/Switch";

const WarmingOceanComponent = () => {
  const [isCountrySelect, setIsCountrySelect] = useState(false);
  const { selectedCountries, setSelectedCountries, countryList } = useWarmingOceanAnalysis();

  return (
    <div className="chapter-layout">
      <div className="chapter-copy">
        <p className="section-eyebrow">02 · The ocean</p>
        <h2 className="chapter-title">The ocean carries the warming signal too.</h2>
        <p className="chapter-lead">
          Sea-surface temperatures show positive long-run trends across all 21 Pacific countries
          and territories in this dataset. From 1970 to 2025, the median trend is also about
          <strong> 0.16°C per decade</strong>.
        </p>
        <p>
          That pattern is consistent with the ocean’s role as a major reservoir for excess heat.
          In this dataset, the Federated States of Micronesia and Palau are among the faster
          sea-surface warming trends, while New Caledonia and Kiribati are slower.
        </p>
        <div className="finding-card">
          <p className="finding-label">Why the distinction matters</p>
          <p>
            Air and ocean temperatures both trend upward over time. A simple correlation between
            the two can therefore look very strong even when it does not isolate a causal effect.
            The story focuses on the observed trends instead of treating correlation as proof.
          </p>
        </div>
      </div>

      <div className="chapter-viz">
        <div className="chart-heading">
          <div>
            <p className="chart-label">Sea-surface temperature anomalies</p>
            <p className="chart-subtitle">Long-run warming across the Pacific</p>
          </div>
          <span className="chart-unit">°C</span>
        </div>

        <div className="relative mt-5">
          <div
            onMouseDown={() => setIsCountrySelect((prev) => !prev)}
            className="country-selector"
          >
            <p>Select country ({selectedCountries.length} selected)</p>
            {isCountrySelect ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          <div
            onMouseLeave={() => setIsCountrySelect(false)}
            className={isCountrySelect ? "country-menu" : "hidden"}
          >
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
          <WarmingOceanChart selectedCountries={selectedCountries} />
        </div>
        <p className="figure-note">
          <strong>Fig. 2.</strong> Annual sea-surface temperature anomalies. Headline regional
          summary uses all valid annual observations from 1970–2025.
        </p>
      </div>
    </div>
  );
};

export default WarmingOceanComponent;
