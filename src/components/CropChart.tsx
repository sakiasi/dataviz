
import { useCropAnalysis } from "../services/cropAnalysis";
import ChartComponent from "./ChartComponent";

const CropChart = ({ selectedCountries }: { selectedCountries: string[] }) => {
  const { lineData, chartData } = useCropAnalysis(selectedCountries);

  return (
    <div className="h-100 w-full flex flex-col gap-5">
      <h1>Crop yield over time</h1>
      <p className="text-xs">Yield (Kg/ha)</p>
      <ChartComponent toolTipUnits="kg/ha" chartData={chartData} lineData={lineData} />
      <p className="text-xs text-center">Years</p>
    </div>
  );
};

export default CropChart;
