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
import { useEconomicLossAnalysis } from "../services/economicLossAnalysis";

const EconomicLossChart = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const { lineData, chartData } = useEconomicLossAnalysis(selectedCountries);
  const { hashColor } = useColors(selectedCountries);

  return (
    <div className="h-100 w-full flex flex-col gap-5">
      <h1>Cost of damages over time</h1>
      <p className="text-xs text-slate-700">USD</p>
      <ResponsiveContainer className={"w-100, h-100"}>
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
              (dataMin: number) => dataMin - 0.5,
              (dataMax: number) => dataMax + 0.5,
            ]}
            stroke="#94a3b8"
            tick={{ fontSize: 11, fill: "#cbd5e1" }}
            tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
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
              type="natural"
              dataKey={d.countryName}
              stroke={hashColor[i % hashColor.length]}
              strokeWidth={2}
              dot={{ fill: hashColor[i % hashColor.length], r: 4 }}
              activeDot={{ r: 6 }}
              connectNulls={true} // <-- Add this line
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-center text-slate-700">Year</p>
    </div>
  );
};

export default EconomicLossChart;
