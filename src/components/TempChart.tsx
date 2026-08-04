import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomToolTip } from "./CustomToolTip";
import { useTemperature } from "../services/tempAnalysis";
import { useColors } from "../services/generateColors";

export const TemperatureChart = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const { chartData, lineData } = useTemperature(selectedCountries);
  const {hashColor} = useColors(selectedCountries)

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <h1>Rising Mean Surface Temperature Over Time</h1>

      <ResponsiveContainer width="100%" height="100%">
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
            tickFormatter={(value) => `${value}°C`}
            width={60}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            content={<CustomToolTip />}
            cursor={{ fill: "rgba(255, 255, 255, 0.03)" }}
          />

          {lineData.map((d, i) => (
            <Line
              key={d.countryName}
              type="natural" // <-- Change from "monotone" to "natural" or "basis"
              dataKey={d.countryName}
              stroke={hashColor[i % hashColor.length]}
              strokeWidth={2}
              dot={{ fill: hashColor[i % hashColor.length], r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
