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
import { useWarmingOceanAnalysis } from "../services/useWarningOceanAnalysis";

interface ScatterChartProps {
  selectedCountries: string[];
}

const OceanInfluenceChart = ({ selectedCountries }: ScatterChartProps) => {
  // Pull data from your actual hook containing the 21 country stats log
  const { countryInfluence: rawData } =
    useWarmingOceanAnalysis(selectedCountries);
  const toolTipUnits = "%";

  // FIX: Scale raw decimals (0.795) into percentages (79.5%) so they sit inside your [75, 100] grid
  const chartData =
    rawData?.map((d) => ({
      ...d,
      // If the value is a raw decimal ratio, multiply it by 100. Otherwise, leave it as is.
      rSquared: d.rSquared <= 1 ? d.rSquared * 100 : d.rSquared,
    })) || [];

  // Guard clause to prevent engine load failures if array is completely empty
  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 border border-dashed rounded-md text-muted-foreground">
        Select a country above to view the influence scatter plot
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h1>Relationship between surface heat and ocean warming</h1>
      <p className="text-xs">Strength</p>
      <ResponsiveContainer className={cn("w-full h-full min-h-[350px]")}>
        <ScatterChart margin={{ top: 15, right: 15, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            type="number"
            dataKey="slope"
            name="Warming Rate"
            domain={[0.6, 1.1]}
            stroke="#64748b"
            tick={{ fontSize: 11, fill: cn("text-primary") }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}°C`}
          />

          <YAxis
            type="number"
            dataKey="rSquared"
            name="Connection Strength"
            domain={[75, 100]} // This now lines up perfectly with values like 79.5 and 99.6
            stroke="#94a3b8"
            tick={{ fontSize: 11, fill: cn("text-primary") }}
            tickFormatter={(value) => `${value}${toolTipUnits}`}
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
      <p className="text-sm text-center">Warming Rate</p>
    </div>
  );
};

export default OceanInfluenceChart;
