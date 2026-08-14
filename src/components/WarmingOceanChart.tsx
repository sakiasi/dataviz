import { useState } from "react";
import { useWarmingOceanAnalysis } from "../services/useWarningOceanAnalysis";
import ChartComponent from "./ChartComponent";
import { Switch } from "./ui/Switch";
import SlopeChart from "../services/SlopeChart";
import SelectCountryComponent from "./SelectCountryComponent";

const WarmingOceanChart = () => {
  const {
    lineData,
    chartData,
    countryList,
    selectedCountries,
    setSelectedCountries,
    slope,
  } = useWarmingOceanAnalysis();
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
            Sea surface temperature anomalies over time
          </h1>
          <p className="text-xs">Temperatures</p>
          <div className="h-100">
            <ChartComponent
              toolTipUnits="°C"
              chartData={chartData}
              lineData={lineData}
            />
          </div>
          <p className="text-xs text-center">Years</p>
          <p className="text-sm  mt-2">
            <span className="font-bold ">Fig 2.0 : </span>The X-axis represents
            the monitoring years, while the Y-axis tracks observed sea surface
            temperature anomalies relative to the baseline.
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

export default WarmingOceanChart;
