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

interface ChartProps {
  lineData: { countryName: string }[];
  chartData: Record<string, any>[];
  units?: string;
}

const ChartComponent = ({ chartData, lineData, units }: ChartProps) => {
  return (
    <ResponsiveContainer className={"w-100, h-full"}>
      <LineChart data={chartData}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#1e293b"
          vertical={false}
        />

        <XAxis
          type="category"
          dataKey="year"
          stroke="#64748b"
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          type="number"
          domain={["auto", "auto"]}
          stroke="#94a3b8"
          tick={{ fontSize: 11, fill: "#cbd5e1" }}
          tickFormatter={(value) => `${value} ${units ?? ""}`}
          width={60}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          content={<CustomToolTip units="°C" />}
          cursor={{ fill: "rgba(255, 255, 255, 0.03)" }}
        />

        {lineData.map((d) => (
          <Line
            key={d.countryName}
            type="monotone" // <-- Change from "monotone" to "natural" or "basis"
            dataKey={d.countryName}
            stroke={countryColor[d.countryName]}
            strokeWidth={2}
            // dot={{ fill: countryColor[d.countryName], r: 4 }}
            // activeDot={{ r: 6 }}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
