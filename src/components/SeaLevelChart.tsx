
import { useSeaLevelAnalysis } from "../services/seaLevelAnalysis";
import ChartComponent from "./ChartComponent";

const SeaLevelChart = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const { lineData, chartData } = useSeaLevelAnalysis(selectedCountries);

  return (
    <div className="h-100 w-full flex flex-col gap-5">
      <h1 className="text-center font-bold">Sea level anomalies over time</h1>
      <p className="text-xs">Meters</p>
      <ChartComponent toolTipUnits="m" chartData={chartData} lineData={lineData} />
      <p className="text-xs text-center">Years</p>
    </div>
  );
};

export default SeaLevelChart;
