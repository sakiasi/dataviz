import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { tempFn } from "../services/cropAnalysis";

interface CropDataPoint {
  year: string;
  yieldKg: number;
  temp: number;
}

const data: CropDataPoint[] = [
  { year: "2015", yieldKg: 3850, temp: 0.88 },
  { year: "2017", yieldKg: 3720, temp: 0.91 },
  { year: "2019", yieldKg: 3590, temp: 1.08 },
  { year: "2021", yieldKg: 3410, temp: 1.05 },
  { year: "2023", yieldKg: 3250, temp: 1.32 },
  { year: "2025", yieldKg: 3100, temp: 1.3 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string | number;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs space-y-1">
        <p className="font-semibold text-white">Year: {label}</p>
        <p className="text-amber-400">
          Crop Yield:
          <span className="font-bold">
            {payload
              .find((p) => p.dataKey === "yieldKg")
              ?.value.toLocaleString()}{" "}
            KG/HA
          </span>
        </p>
        <p className="text-emerald-400">
          Temperature:{" "}
          <span className="font-bold">
            +{payload.find((p) => p.dataKey === "temp")?.value}°C
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function Crop() {
  tempFn()
  return (
    <div className="text-slate-100 space-y-5 w-full overflow-hidden">
      <h1 className="text-2xl font-bold text-white tracking-tight">
        How is Heat Stress Impacting Crop Yields?
      </h1>

      <div className="border-b border-slate-800"></div>

      <div className="text-slate-300 leading-relaxed space-y-5 mb-10 max-w-3xl">
        <p>
          Extreme heat is one of the biggest threats to the world's food supply
          because it damages how plants grow and reproduce, often making them
          sterile. When plants get too hot, important internal processes—like
          how they handle sugars, fats, and natural hormones—break down, which
          drastically lowers the amount of food they can produce.
          <a
            className="text-xs pl-1 text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://doi.org/10.1111/pbi.13946"
          >
            ( Jin, S. & Zhang, X. , 2022 )
          </a>
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          Vanuatu Crop Yield and Temperature Anomaly Over Time
        </h2>
      </div>

      <div className="h-[400px] w-full pl-3 pr-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              interval={0}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="#94a3b8"
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `${value}`}
              tickLine={false}
              axisLine={false}
              width={42}
              domain={[2800, 4200]}
              allowDataOverflow={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#94a3b8"
              tick={{ fontSize: 10 }}
              domain={[0, 2]}
              tickFormatter={(value) => `${value}°`}
              tickLine={false}
              axisLine={false}
              width={24}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(148, 163, 184, 0.05)" }}
            />
            <Bar
              yAxisId="left"
              dataKey="yieldKg"
              fill="#f59e0b"
              radius={[4, 4, 0, 0]}
              barSize={24}
              fillOpacity={0.85}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="temp"
              stroke="#34d399"
              strokeWidth={2}
              dot={{ r: 3, fill: "#34d399" }}
              activeDot={{ r: 5, fill: "#34d399", stroke: "#fff" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-slate-400 italic">
        Data from Crop yield - disaggregated.csv (SPC Climate Change indicators
        - Vanuatu)
      </p>

      <div className="text-slate-300">
        Our linear regression analysis reveals a significant, strong negative
        association between mean surface temperature and crop yield,
        demonstrating that rising temperatures reliably correspond with
        declining agricultural output. Specifically, the model indicates that
        for every 1°C increase in mean surface temperature, crop yield decreases
        by [Insert Number] [Insert Unit, e.g., tons per hectare]. While this
        clear downward trend provides a highly reliable indicator for
        forecasting environmental heat stress on crops, it is important to note
        that this model analyzes temperature in isolation; it maps a broader
        environmental association rather than absolute causation, as it does not
        control for unmeasured compounding seasonal variables such as rainfall
        or soil moisture.
      </div>
    </div>
  );
}
