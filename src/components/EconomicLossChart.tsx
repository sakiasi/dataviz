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
import { useEconomicLossAnalysis } from "../services/economicLossAnalysis";
import { CustomToolTip } from "./CustomToolTip";

const EconomicLossChart = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const { lineData, chartData } = useEconomicLossAnalysis(selectedCountries);

  return (
    <div className="h-100 w-full flex flex-col gap-5">
      <h1>Cost of damages over time</h1>
      <p className="text-xs text-slate-700">US Dollars</p>
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

          {lineData.map((d) => (
            <Line
              key={d.countryName}
              type="natural"
              dataKey={d.countryName}
              stroke={countryColor[d.countryName]}
              strokeWidth={2}
              dot={{ fill: countryColor[d.countryName], r: 4 }}
              activeDot={{ r: 6 }}
              connectNulls={true} // <-- Add this line
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-center text-slate-700">Years</p>
    </div>
  );
};

export default EconomicLossChart;
