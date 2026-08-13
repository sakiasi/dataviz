import { useWarmingOceanAnalysis } from "../services/useWarningOceanAnalysis";
import ChartComponent from "./ChartComponent";

const WarmingOceanChart = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const { lineData, chartData } = useWarmingOceanAnalysis(selectedCountries);

  return (
    <div className="h-100 w-full flex flex-col gap-5">
      <h1 className="text-center font-bold">Sea surface temperature anomalies over time</h1>
      <p className="text-xs">Temperatures</p>
      <ChartComponent toolTipUnits="°C" chartData={chartData} lineData={lineData} />
      <p className="text-xs text-center">Years</p>
    </div>
  );
};

export default WarmingOceanChart;
