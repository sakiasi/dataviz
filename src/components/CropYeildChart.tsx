import {
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import CropCountry from "./Crop";
import { useCrop } from "../services/getData";

interface DataPoint {
  year: string;
  yieldKg: number;
  temp: number;
}

// Fallback data sample if the hook data structure maps to OBS_VALUE / TIME_PERIOD
const data: DataPoint[] = [
  { year: "2010", yieldKg: 2400, temp: 0.45 },
  { year: "2011", yieldKg: 2500, temp: 0.41 },
  { year: "2012", yieldKg: 2200, temp: 0.53 },
  { year: "2013", yieldKg: 2600, temp: 0.6 },
  { year: "2014", yieldKg: 2750, temp: 0.75 },
  { year: "2015", yieldKg: 2300, temp: 0.88 },
  { year: "2016", yieldKg: 2100, temp: 0.99 },
  { year: "2017", yieldKg: 2450, temp: 0.91 },
  { year: "2018", yieldKg: 2550, temp: 0.95 },
  { year: "2019", yieldKg: 2350, temp: 1.08 },
  { year: "2020", yieldKg: 2200, temp: 1.12 },
  { year: "2021", yieldKg: 2050, temp: 1.05 },
  { year: "2022", yieldKg: 2150, temp: 1.18 },
  { year: "2023", yieldKg: 1900, temp: 1.32 },
  { year: "2024", yieldKg: 1850, temp: 1.4 },
  { year: "2025", yieldKg: 1950, temp: 1.3 },
];

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
            {typeof yieldVal === 'number' ? yieldVal.toLocaleString() : yieldVal} kg
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
              cursor={{ stroke: "rgba(148, 163, 184, 0.2)", strokeDasharray: "3 3" }}
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