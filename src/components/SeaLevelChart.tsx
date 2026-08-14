import { useState } from "react";
import { useSeaLevelAnalysis } from "../services/seaLevelAnalysis";
import ChartComponent from "./ChartComponent";
import { Switch } from "./ui/Switch";
import SelectCountryComponent from "./SelectCountryComponent";
import SlopeChart from "../services/SlopeChart";

const SeaLevelChart = () => {
  const [isCountrySelect, setIsCountrySelect] = useState(false);
  const {
    lineData,
    chartData,
    slope,
    countryList,
    selectedCountries,
    setSelectedCountries,
  } = useSeaLevelAnalysis();
  const [isChartFlip, setIsChartFlip] = useState(false);

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
            Sea level anomalies over time
          </h1>
          <p className="text-xs">Meters</p>
          <div className="h-100">
            <ChartComponent
              toolTipUnits="m"
              chartData={chartData}
              lineData={lineData}
            />
          </div>
          <p className="text-xs text-center">Years</p>
          <p className="text-sm mt-2">
            <span className="font-bold">Fig 3.0 : </span>The X-axis represents
            the monitoring years, while the Y-axis tracks observed sea level
            anomalies relative to the baseline.
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

export default SeaLevelChart;
