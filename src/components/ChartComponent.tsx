import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { countryColor } from "../constants/colors";
import { CustomToolTip } from "./CustomToolTip";

interface ChartProps {
  lineData: { countryName: string }[];
  chartData: Record<string, any>[];
  units?: string;
  toolTipUnits?: string;
}

const ChartComponent = ({ chartData, lineData, units, toolTipUnits }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 12, right: 18, left: 4, bottom: 8 }}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          type="category"
          dataKey="year"
          stroke="var(--muted-foreground)"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          minTickGap={24}
        />
        <YAxis
          type="number"
          domain={["auto", "auto"]}
          stroke="var(--muted-foreground)"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickFormatter={(value) => {
            if (units === "°C" || units?.includes("°")) return `${value} ${units ?? ""}`;
            if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
            if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(0)}k`;
            return `${value}`;
          }}
          width={52}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomToolTip units={toolTipUnits} />} cursor={{ stroke: "var(--border)" }} />
        <Legend
          verticalAlign="top"
          align="left"
          iconType="plainline"
          wrapperStyle={{ fontSize: 11, paddingBottom: 16 }}
        />
        {lineData.map((d) => (
          <Line
            key={d.countryName}
            type="linear"
            dataKey={d.countryName}
            name={d.countryName}
            stroke={countryColor[d.countryName] ?? "var(--primary)"}
            strokeWidth={2.25}
            dot={false}
            activeDot={{ r: 5 }}
            connectNulls={false}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
