import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

interface DataPoint {
  year: string;
  yieldKg: number;
  temp: number;
}

const data: DataPoint[] = [
  { year: "2010", yieldKg: 310, temp: 0.45 },
  { year: "2011", yieldKg: 315, temp: 0.41 },
  { year: "2012", yieldKg: 290, temp: 0.53 },
  { year: "2013", yieldKg: 325, temp: 0.6 },
  { year: "2014", yieldKg: 340, temp: 0.75 },
  { year: "2015", yieldKg: 300, temp: 0.88 },
  { year: "2016", yieldKg: 280, temp: 0.99 },
  { year: "2017", yieldKg: 312, temp: 0.91 },
  { year: "2018", yieldKg: 318, temp: 0.95 },
  { year: "2019", yieldKg: 295, temp: 1.08 },
  { year: "2020", yieldKg: 285, temp: 1.12 },
  { year: "2021", yieldKg: 270, temp: 1.05 },
  { year: "2022", yieldKg: 278, temp: 1.18 },
  { year: "2023", yieldKg: 250, temp: 1.32 },
  { year: "2024", yieldKg: 240, temp: 1.4 },
  { year: "2025", yieldKg: 260, temp: 1.3 },
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
          Livestock Yield:{" "}
          <span className="font-bold">
            {payload
              .find((p) => p.dataKey === "yieldKg")
              ?.value.toLocaleString()}{" "}
            kg/animal
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

export default function LivestockYieldTemperatureComponent() {
  return (
    <div className="text-slate-100 space-y-5 w-full overflow-hidden">
      <h1 className="text-2xl font-bold text-white ">
        Does temperature affect Livestock Yields ?
      </h1>

      <div className="border-b border-slate-800"></div>

      <div className="text-slate-300 text-sm leading-relaxed space-y-5 mb-10">
        <p>
          Climate change hits livestock just as hard as it hits crops, primarily
          through direct heat stress and the decline of the food they rely on.
          When temperatures climb, animals struggle to maintain their core body
          temperature, which forces their bodies to shift energy away from
          growth, milk production, and reproduction just to survive. It’s not
          just the heat, either; erratic rainfall and drought dry up pastures
          and reduce the quality of forage, while warmer, wetter conditions
          create a perfect breeding ground for new pests and diseases that
          compromise animal health.
          <a
            className="text-xs pl-1 text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
            href="https://www.mdpi.com/2073-4433/13/1/140"
            target="_blank"
            rel="noopener noreferrer"
          >
            (Cheng et al., 2022).
          </a>
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          Data from Livestock
        </h2>
      </div>

      {/* Added pl-3 or a small left padding wrapper so the axis labels have breathing room without squeezing the chart area */}
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
              domain={[200, 380]}
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
              cursor={{ fill: "rgba(148, 163, 184, 0.05)" }}
            />
            <Bar
              yAxisId="left"
              dataKey="yieldKg"
              fill="#f59e0b"
              radius={[4, 4, 0, 0]}
              barSize={20}
              fillOpacity={0.85}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="temp"
              stroke="#34d399"
              strokeWidth={2}
              dot={{ r: 2, fill: "#34d399" }}
              activeDot={{ r: 4, fill: "#34d399", stroke: "#fff" }}
            />
            <ReferenceLine
              yAxisId="right"
              y={0}
              stroke="#94a3b8"
              strokeDasharray="3 3"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-slate-400 italic">
        Data from Livestock - disaggregated.csv
      </p>

      <div className="text-slate-300 text-sm">
        Data shows annual livestock yield production alongside temperature
        anomaly trends.
      </div>
    </div>
  );
}
