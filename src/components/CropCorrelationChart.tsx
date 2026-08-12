import {
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { countryColor } from "../constants/colors";
import { CustomToolTip } from "./CustomToolTip";
import { cn } from "../lib/util";
import { useCropAnalysis } from "../services/cropAnalysis";

interface ScatterChartProps {
  selectedCountries: string[];
}

// Clean compact number formatter (e.g., -65k, 50k, 0) without cluttering ticks with units
const formatCompactNumber = (value: number) => {
  if (value === 0) return "0";
  return `${(value / 1000).toFixed(0)}k`;
};

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
      <ResponsiveContainer className={cn("w-full h-full min-h-[350px]")}>
        <ScatterChart margin={{ top: 15, right: 15, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          
          <XAxis
            type="number"
            dataKey="slope"
            name="Yield Change Rate"
            stroke="#64748b"
            tick={{ fontSize: 11, fill: cn("text-primary") }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatCompactNumber}
          />

          <YAxis
            type="number"
            dataKey="rSquared"
            name="Connection Strength"
            domain={[0, 100]}
            stroke="#94a3b8"
            tick={{ fontSize: 11, fill: cn("text-primary") }}
            tickFormatter={(value) => `${value}`}
            width={40}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            content={<CustomToolTip />}
            cursor={{ fill: "rgba(255, 255, 255, 0.03)" }}
          />

          <Scatter
            name="Pacific Island Nations"
            data={chartData}
            shape="circle"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={countryColor[entry.country] || "#0284c7"}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <p className="text-sm text-center">Kg/Ha per 1°C</p>
    </div>
  );
};

export default OceanCorrelationChart;