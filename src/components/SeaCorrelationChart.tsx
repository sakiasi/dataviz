
import { useSeaLevelAnalysis } from "../services/seaLevelAnalysis";
import CorrelationChart from "./CorrelationChart";

interface ScatterChartProps {
  selectedCountries: string[];
}

const SeaCorrelationChart = ({ selectedCountries }: ScatterChartProps) => {
  const { countryInfluence: rawData } = useSeaLevelAnalysis(selectedCountries);

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
      <h1>Sea level response to surface heat by country</h1>
      <p className="text-xs">Strength (%)</p>
      <CorrelationChart chartData={chartData} />
      <p className="text-xs text-center">Meters per °C</p>
    </div>
  );
};

export default SeaCorrelationChart;
