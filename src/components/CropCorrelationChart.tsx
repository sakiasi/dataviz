
import { useCropAnalysis } from "../services/cropAnalysis";
import CorrelationChart from "./CorrelationChart";

interface ScatterChartProps {
  selectedCountries: string[];
}


const OceanCorrelationChart = ({ selectedCountries }: ScatterChartProps) => {
  const { countryInfluence: rawData } = useCropAnalysis(selectedCountries);

  // Safely scale decimals to percentages and cap at 100% max
  const chartData =
    rawData?.map((d) => {
      const rawVal = d.rSquared <= 1 ? d.rSquared * 100 : d.rSquared;
      return {
        ...d,
        rSquared: Math.min(Math.max(rawVal, 0), 100), // Keeps values strictly between 0 and 100
      };
    }) || [];

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 border border-dashed rounded-md text-muted-foreground">
        Select a country above to view the influence scatter plot
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h1>Crop yield response to surface heat by country</h1>
      <p className="text-xs">Strength (%)</p>
      <CorrelationChart chartData={chartData} />
      <p className="text-xs text-center">Kg/Ha per 1°C</p>
    </div>
  );
};

export default OceanCorrelationChart;