import { useTemperature } from "../services/tempAnalysis";
import ChartComponent from "./ChartComponent";

export const TemperatureChart = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {

  const { chartData, lineData } = useTemperature(selectedCountries);

  return (
    <div className="h-100 w-full flex flex-col gap-5">
      <h1 className="text-center font-bold">Surface temperature anomalies over time</h1>
      <p className="text-xs">Temperature</p>
      <ChartComponent chartData={chartData} toolTipUnits="°C" lineData={lineData} />
      <p className="text-xs text-center">Year</p>
    </div>
  );
};
