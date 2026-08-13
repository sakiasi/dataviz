
import { useLivestockAnalysis } from "../services/liveStockAnalysis";
import ChartComponent from "./ChartComponent";

const LiveStockChart = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const { lineData, chartData } = useLivestockAnalysis(selectedCountries);

  return (
    <div className="h-100 w-full flex flex-col gap-5">
      <h1>Livestock yield over time</h1>
        <p className="text-xs text-slate-500">Yield (Kg/Ha)</p>
      <ChartComponent toolTipUnits="kg/ha" chartData={chartData} lineData={lineData}  />
      <p className="text-xs text-center text-slate-500">Years</p>
    </div>
  );
};

export default LiveStockChart;
