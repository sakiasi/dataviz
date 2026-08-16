import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { countryColor } from "../constants/colors";
import { CustomToolTip } from "./CustomToolTip";
import type { ChartProps } from "../types";


const ChartComponent = ({ chartData, lineData, units, toolTipUnits }: ChartProps) => {
  return (
    <ResponsiveContainer className={"w-full h-full"}>
      <LineChart data={chartData}>
        <CartesianGrid
          stroke="var(--border)"
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          type="category"
          dataKey="year"
          stroke="var(--muted-foreground)"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />  

        <YAxis
          type="number"
          domain={["auto", "auto"]}
          stroke="var(--muted-foreground)"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickFormatter={(value) => {
            // Skip formatting if it's temperature or small values
            if (units === "°C" || units?.includes("°")) {
              return `${value} ${units ?? ""}`;
            }

            // Format large numbers into thousands (k) or millions (M)
            if (value >= 1_000_000) {
              return `${(value / 1_000_000).toFixed(1)} ${units ?? ""}`.trim();
            }
            
            if (value >= 1_000) {
              return `${(value / 1_000).toFixed(0)}k ${units ?? ""}`.trim();
            }

            return `${value} ${units ?? ""}`.trim();
          }}
          width={40}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          content={<CustomToolTip units={toolTipUnits} />}
          cursor={{ fill: "rgba(255, 255, 255, 0.03)" }}
        />

        {lineData?.map((d) => (
          <Line
            key={d.countryName}
            type="linear"
            dataKey={d.countryName}
            stroke={countryColor[d.countryName]}
            strokeWidth={1}
            activeDot={{ r: 6 }}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;