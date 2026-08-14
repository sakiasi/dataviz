import { useState } from "react";
import { useCropAnalysis } from "../services/cropAnalysis";
import ChartComponent from "./ChartComponent";
import { Switch } from "./ui/Switch";
import SlopeChart from "../services/SlopeChart";
import SelectCountryComponent from "./SelectCountryComponent";

const CropChart = () => {
  const {
    countryList,
    selectedCountries,
    lineData,
    chartData,
    slope,
    setSelectedCountries,
  } = useCropAnalysis();
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
          <h1 className="text-center font-bold">Crop yield over time</h1>
          <p className="text-xs">Yield (Kg/ha)</p>
          <div className="h-100">
            <ChartComponent
              toolTipUnits="kg/ha"
              chartData={chartData}
              lineData={lineData}
            />
          </div>
          <p className="text-xs text-center">Years</p>
          <p className="text-sm mt-2">
            <span className="font-bold">Fig 4.0 : </span>The X-axis represents
            the monitoring years, while the Y-axis tracks observed crop yield in
            kilograms per hectare.
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

export default CropChart;
