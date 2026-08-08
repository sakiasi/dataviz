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
import { useCropAnalysis } from "../services/cropAnalysis";
import { CustomToolTip } from "./CustomToolTip";

const CropChart = ({ selectedCountries }: { selectedCountries: string[] }) => {
  const { lineData, chartData } = useCropAnalysis(selectedCountries);

  return (
    <div className="h-100 w-full flex flex-col gap-5">
      <h1>Crop yield over time</h1>
      <p className="text-xs text-slate-500">Kg/Ha</p>
      <ResponsiveContainer className={"w-100, h-100"}>
        <LineChart
          data={chartData}
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

          {lineData.map((d) => (
            <Line
              key={d.countryName}
              type="natural" // <-- Change from "monotone" to "natural" or "basis"
              dataKey={d.countryName}
              stroke={countryColor[d.countryName]}
              strokeWidth={2}
              dot={{ fill: countryColor[d.countryName], r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-center text-slate-500">Years</p>
    </div>
  );
};

export default CropChart;
