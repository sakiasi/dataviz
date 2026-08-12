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
import {cn} from '../lib/util'

interface ChartProps {
  lineData: { countryName: string }[];
  chartData: Record<string, any>[];
  units?: string;
  toolTipUnits?: string
}

const ChartComponent = ({ chartData, lineData, units, toolTipUnits }: ChartProps) => {
  return (
    <ResponsiveContainer className={"w-100, h-full"}>
      <LineChart data={chartData}>
        <CartesianGrid
          strokeDasharray="3 3"
          // stroke="#1e293b"
          vertical={false}
        />

        <XAxis
          type="category"
          dataKey="year"
          stroke="#64748b"
          tick={{ fontSize: 11, fill: cn('text-primary') }}
          axisLine={false}
          tickLine={false}
        />  

        <YAxis
          type="number"
          domain={["auto", "auto"]}
          stroke="#94a3b8"
          tick={{ fontSize: 11, fill: cn('text-primary') }}
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

        {lineData.map((d) => (
          <Line
            key={d.countryName}
            type="linear" // <-- Change from "monotone" to "natural" or "basis"
            dataKey={d.countryName}
            stroke={countryColor[d.countryName]}
            strokeWidth={1}
            // dot={{ fill: countryColor[d.countryName], r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
