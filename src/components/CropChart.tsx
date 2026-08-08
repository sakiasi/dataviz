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
import { useCropAnalysis } from "../services/cropAnalysis";

const CropChart = ({ selectedCountries }: { selectedCountries: string[] }) => {
  const { lineData, chartData } = useCropAnalysis(selectedCountries);
  const { hashColor } = useColors(selectedCountries);

  return (
    <div className="h-100 w-full space-y-5 pb-5">
      <h1>Crop yield over time</h1>
      <ResponsiveContainer className={"w-100, h-100"}>
      <p className="text-xs text-slate-500">Kg/Hectare</p>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 25 }}
        >
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
            domain={[0, "auto"]}
            padding={{ bottom: 30 }}
            stroke="#94a3b8"
            tick={{ fontSize: 11, fill: "#cbd5e1" }}
            tickFormatter={(value) => `${Math.ceil(value)}`}
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

export default CropChart;
