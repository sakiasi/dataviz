
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
      <h1 className="text-center font-bold">Cost of damages over time</h1>
      <p className="text-xs">US Dollars</p>
      <ChartComponent toolTipUnits="USD" chartData={chartData} lineData={lineData} />
      <p className="text-xs text-center">Years</p>
    </div>
  );
};

export default EconomicLossChart;
