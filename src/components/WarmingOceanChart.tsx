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
import { useColors } from "../services/generateColors";
import { useWarmingOceanAnalysis } from "../services/useWarningOceanAnalysis";

const WarmingOceanChart = ({ selectedCountries }: { selectedCountries: string[] }) => {
  const { lineData, chartData } = useWarmingOceanAnalysis(selectedCountries);
  const { hashColor } = useColors(selectedCountries);

  return (
    <div className="h-100 w-full flex flex-col gap-5">
      <h1>Rising sea surface temperature anomalies over time</h1>
      <ResponsiveContainer className={"w-100, h-100"}>
        <p className="text-xs text-slate-600">Temperature</p>
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
            domain={[
              (dataMin: number) => dataMin - 0.06,
              (dataMax: number) => dataMax + 0.06,
            ]}
            stroke="#94a3b8"
            tick={{ fontSize: 11, fill: "#cbd5e1" }}
            tickFormatter={(value) => `${Number(value).toFixed(2)}°C`}
            
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

export default WarmingOceanChart;
