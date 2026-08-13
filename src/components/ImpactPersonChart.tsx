
import { useImpactPersonAnalysis } from "../services/impactPersonAnalysis";
import ChartComponent from "./ChartComponent";

const ImpactPersonChart = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const { lineData, chartData } = useImpactPersonAnalysis(selectedCountries);

  return (
    <div className="h-100 w-full flex flex-col gap-5">
      <h1 className="normal-case">Number of individuals affected by natural disaster over time</h1>
      <p className="text-xs">Person(s)</p>
      <ChartComponent toolTipUnits="Person(s)" chartData={chartData} lineData={lineData} />
      <p className="text-xs text-center">Years</p>
    </div>
  );
};

export default ImpactPersonChart;
