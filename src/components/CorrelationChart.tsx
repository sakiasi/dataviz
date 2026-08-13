import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Scatter, Cell, ScatterChart } from "recharts"
import { countryColor } from "../constants/colors"
import { cn } from "../lib/util"
import { CustomToolTip } from "./CustomToolTip"
import type { chartData } from "../types"

// Smart compact number formatter (handles small decimals & thousands like -65k, 50k, 0)
const formatCompactNumber = (value: number) => {
  if (value === 0) return "0";
  if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
  }
  if (Math.abs(value) < 10) {
    return Number(value).toFixed(2);
  }
  return value.toString();
};

const CorrelationChart = ({ chartData }: { chartData: chartData[] }) => {
  return (
    <ResponsiveContainer className={cn("w-full h-full min-h-[350px]")}>
      <ScatterChart margin={{ top: 15, right: 15, bottom: 5, left: 5 }}>
        <CartesianGrid
          stroke="var(--border)"
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          type="number"
          dataKey="slope"
          name="Value Rate"
          domain={["auto", "auto"]} // Auto-scales to fit thousands or decimals perfectly
          stroke="var(--muted-foreground)"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={formatCompactNumber}
        />

        <YAxis
          type="number"
          dataKey="rSquared"
          name="Connection Strength"
          domain={[0, 100]}
          stroke="var(--muted-foreground)"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickFormatter={(value) => `${value}`}
          width={40}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          content={<CustomToolTip isCorrelation />}
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
  )
}

export default CorrelationChart;