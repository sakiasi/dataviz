
import { useEconomicLossAnalysis } from "../services/economicLossAnalysis";
import ChartComponent from "./ChartComponent";

const EconomicLossChart = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const { lineData, chartData } = useEconomicLossAnalysis(selectedCountries);

  return (
    <div className="h-100 w-full flex flex-col gap-5">
      <h1>Cost of damages over time</h1>
      <p className="text-xs text-slate-700">US Dollars</p>
      <ChartComponent toolTipUnits="USD" chartData={chartData} lineData={lineData} />
      <p className="text-xs text-center text-slate-700">Years</p>
    </div>
  );
};

export default EconomicLossChart;
