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
      <h1>Rising surface heat anomalies over time</h1>
      <p className="text-xs text-slate-600">Temperature</p>
      <ChartComponent chartData={chartData} lineData={lineData} />
      <p className="text-xs text-center text-slate-600">Year</p>
    </div>
  );
};
