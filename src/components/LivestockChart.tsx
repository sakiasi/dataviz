
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
      <h1 className="text-center font-bold">Livestock yield over time</h1>
        <p className="text-xs">Yield (Kg/animal)</p>
      <ChartComponent toolTipUnits="kg/ha" chartData={chartData} lineData={lineData}  />
      <p className="text-xs text-center">Years</p>
    </div>
  );
};

export default LiveStockChart;
