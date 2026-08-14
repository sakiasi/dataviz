import { useTemperature } from "../services/tempAnalysis";
import TempSlopeChart from "../services/TempSlopeChart";
import ChartComponent from "./ChartComponent";

export const TemperatureChart = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const { chartData, lineData, slope } = useTemperature(selectedCountries);

  return (
    <div className="h-full w-full flex flex-col gap-5">
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

      <div className="h-150">
        <TempSlopeChart slope={slope} />
      </div>
    </div>
  );
};
