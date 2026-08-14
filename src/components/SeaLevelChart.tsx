import { useState } from "react";
import { useSeaLevelAnalysis } from "../services/seaLevelAnalysis";
import ChartComponent from "./ChartComponent";
import { Switch } from "./ui/Switch";

const SeaLevelChart = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const { lineData, chartData } = useSeaLevelAnalysis(selectedCountries);
  const [isChartFlip, setIsChartFlip] = useState(false);

  return (
    <div className="h-100 w-full flex flex-col gap-5">
      <div className="flex items-center gap-5 justify-end">
        <p className="text-sm">Timeseries</p>
        <Switch
          className={"hover:cursor-pointer"}
          onClick={() => setIsChartFlip((prev) => !prev)}
          checked={isChartFlip}
        />
      </div>
      <h1 className="text-center font-bold">Sea level anomalies over time</h1>
      <p className="text-xs">Meters</p>
      <ChartComponent
        toolTipUnits="m"
        chartData={chartData}
        lineData={lineData}
      />
      <p className="text-xs text-center">Years</p>
    </div>
  );
};

export default SeaLevelChart;
