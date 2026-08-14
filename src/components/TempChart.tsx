import { useState } from "react";
import SlopeChart from "../services/SlopeChart";
import { useTemperature } from "../services/tempAnalysis";
import ChartComponent from "./ChartComponent";
import SelectCountryComponent from "./SelectCountryComponent";
import { Switch } from "./ui/Switch";

export const TemperatureChart = () => {
  const [isChartFlip, setIsChartFlip] = useState(false);
  const [isCountrySelect, setIsCountrySelect] = useState(false);
  const {
    countryList,
    selectedCountries,
    lineData,
    chartData,
    slope,
    setSelectedCountries,
  } = useTemperature();

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
            Surface temperature anomalies over time
          </h1>
          <p className="text-xs">Temperature</p>
          <div className="h-100">
            <ChartComponent
              chartData={chartData}
              toolTipUnits="°C"
              lineData={lineData}
            />
          </div>
          <p className="text-xs text-center">Year</p>
          <p className="text-sm  mt-2">
            <span className="font-bold ">Fig 1.1 : </span>The X-axis represents
            the monitoring years, while the Y-axis tracks observed temperature
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
