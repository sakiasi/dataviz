import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import CropCountry from "./Crop";
import { useCrop } from "../services/getData";



const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; payload?: any }>;
  label?: string | number;
}) => {
  if (active && payload && payload.length) {
    // For scatter plots, payload[0].payload contains the full data object
    const dataPoint = payload[0].payload;
    const yearLabel = dataPoint?.TIME_PERIOD || dataPoint?.year || label;
    const yieldVal = dataPoint?.OBS_VALUE ?? dataPoint?.yieldKg;
    const tempVal = dataPoint?.temp;

    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs space-y-1">
        <p className="font-semibold text-white">Year: {yearLabel}</p>
        <p className="text-amber-400">
          Crop Yield:{" "}
          <span className="font-bold">
            {typeof yieldVal === "number"
              ? yieldVal.toLocaleString()
              : yieldVal}{" "}
            kg
          </span>
        </p>
        <p className="text-emerald-400">
          Temperature:{" "}
          <span className="font-bold">
            {tempVal > 0 ? `+${tempVal}` : tempVal}°C
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function CropYieldTemperatureComponent() {
  const { crop, yRange } = useCrop();

  return (
    <div className="text-slate-100 space-y-5 w-full overflow-hidden">
      <h1 className="text-2xl font-bold text-white tracking-tight">
        Does Temperature Affect Crop Yields ?
      </h1>

      <div className="border-b border-slate-800"></div>

      <div className="text-slate-300 leading-relaxed space-y-5 mb-10 max-w-3xl">
        <p>
          Every crop has an &quot;optimal&quot; temperature range for growth.
          When temperatures consistently exceed this—especially during sensitive
          reproductive stages like flowering—it can cause pollen to lose its
          vitality, leading to smaller harvests or total crop failure.
          <a
            className="text-xs pl-1 text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
            href="https://www.mdpi.com/2073-4433/13/1/140"
            target="_blank"
            rel="noopener noreferrer"
          >
            (Chaturvedi et al., 2021)
          </a>
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          Crop Yield vs. Temperature Anomalies Over Time
        </h2>
      </div>

      <div className="h-[400px] w-full pl-3 pr-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={crop}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              vertical={false}
            />
            <XAxis
              dataKey="TIME_PERIOD"
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              interval={1}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="#94a3b8"
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `${value}`}
              tickLine={false}
              axisLine={false}
              width={38}
              domain={yRange}
              allowDataOverflow={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#94a3b8"
              tick={{ fontSize: 10 }}
              domain={["auto", "dataMax + 0.2"]}
              tickFormatter={(value) => `${value}°`}
              tickLine={false}
              axisLine={false}
              width={22}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "rgba(148, 163, 184, 0.2)",
                strokeDasharray: "3 3",
              }}
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="OBS_VALUE"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 3, fill: "#f59e0b" }}
              activeDot={{ r: 5, fill: "#f59e0b", stroke: "#fff" }}
              isAnimationActive={false}
            />

            {/* <Line
              yAxisId="right"
              type="monotone"
              data={sortedCropData}
              dataKey="temp"
              stroke="#34d399"
              strokeWidth={2}
              dot={{ r: 2, fill: "#34d399" }}
              activeDot={{ r: 4, fill: "#34d399", stroke: "#fff" }}
              isAnimationActive={false}
            /> */}

            <ReferenceLine
              yAxisId="right"
              y={0}
              stroke="#94a3b8"
              strokeDasharray="3 3"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <CropCountry />

      <p className="text-xs text-slate-400 italic">
        Data from Crop yield - disaggregated.csv
      </p>

      <div className="text-slate-300">
        Data shows annual crop yield production alongside temperature anomaly
        trends. 32 crops
      </div>
    </div>
  );
}
