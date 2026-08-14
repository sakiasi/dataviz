import { useState } from "react";
import { useImpactPersonAnalysis } from "../services/impactPersonAnalysis";
import ChartComponent from "./ChartComponent";
import { Switch } from "./ui/Switch";
import SlopeChart from "../services/SlopeChart";
import SelectCountryComponent from "./SelectCountryComponent";

const ImpactPersonChart = () => {
  const {
    countryList,
    selectedCountries,
    lineData,
    chartData,
    slope,
    setSelectedCountries,
  } = useImpactPersonAnalysis();
  const [isChartFlip, setIsChartFlip] = useState(false);
  const [isCountrySelect, setIsCountrySelect] = useState(false);

  return (
    <div className="h-full w-full flex flex-col gap-5">
      <div className="flex items-center gap-5 justify-end">
        <p className="text-sm">Timeseries</p>
        <Switch
          className={"hover:cursor-pointer"}
          onClick={() => setIsChartFlip((prev) => !prev)}
          checked={isChartFlip}
        />
      </div>
      {isChartFlip ? (
        <div className="flex flex-col gap-5">
          <div className="relative">
            <SelectCountryComponent
              countryList={countryList}
              isCountrySelect={isCountrySelect}
              selectedCountries={selectedCountries}
              setIsCountrySelect={setIsCountrySelect}
              setSelectedCountries={setSelectedCountries}
            />
          </div>
          <h1 className="text-center font-bold">
            Number of individuals affected by natural disaster over time
          </h1>
          <p className="text-xs">Person(s)</p>
          <div className="h-100">
            <ChartComponent
              toolTipUnits="Person(s)"
              chartData={chartData}
              lineData={lineData}
            />
          </div>
          <p className="text-xs text-center">Years</p>
          <p className="text-sm mt-2">
            <span className="font-bold">Fig 6.0 : </span>The X-axis represents
            the monitoring years, while the Y-axis tracks observed individuals
            affected by natural disaster.
          </p>
        </div>
      ) : (
        <div className="h-150">
          <SlopeChart slope={slope} />
        </div>
      )}
    </div>
  );
};

export default ImpactPersonChart;
