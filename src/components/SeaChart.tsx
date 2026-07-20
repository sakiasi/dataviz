import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

interface DataPoint {
  year: string;
  temp: number;
}

const data: DataPoint[] = [
  { year: "2010", temp: 0.45 },
  { year: "2011", temp: 0.41 },
  { year: "2012", temp: 0.53 },
  { year: "2013", temp: 0.6 },
  { year: "2014", temp: 0.75 },
  { year: "2015", temp: 0.88 },
  { year: "2016", temp: 0.99 },
  { year: "2017", temp: 0.91 },
  { year: "2018", temp: 0.95 },
  { year: "2019", temp: 1.08 },
  { year: "2020", temp: 1.12 },
  { year: "2021", temp: 1.05 },
  { year: "2022", temp: 1.18 },
  { year: "2023", temp: 1.32 },
  { year: "2024", temp: 1.4 },
  { year: "2025", temp: 1.3 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string | number;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs space-y-1">
        <p className="font-semibold text-white">Year: {label}</p>
        <p className="text-amber-400">
          Temperature Anomaly:{" "}
          <span className="font-bold">{payload[0].value}°C</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function OceanWarmingComponent() {
  return (
    <div className="text-slate-100 space-y-5">
      <div className="flex items-center justify-between mb-8 gap-4 border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          
          Is Our Ocean Warming Up?
        </h1>
        <div className="h-1.5 w-16 rounded-full hidden sm:block" />
      </div>

      <div className="text-slate-300 text-sm leading-relaxed space-y-5 mb-10 max-w-3xl">
        <p>
          According to
          <a
            className="text-xs pl-1 text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
            href="https://www.science.org/doi/10.1126/science.aav7619"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trenberth, K. E. (2019)
          </a>
          , The ocean acts as the Earth’s thermal buffer, absorbing the vast
          majority of excess atmospheric heat. Consequently, rising mean surface
          temperatures translate directly into warmer oceans, establishing a
          clear, ongoing trend in sea surface temperature anomalies.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          Sea Surface Temperature Anomalies Over Time
        </h2>
      </div>

      <div className="h-[400px] w-full -ml-5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient
                id="oceanTempGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              interval={2}
              tickLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              domain={["auto", "dataMax + 0.2"]}
              tickFormatter={(value) => `${value}°C`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#f59e0b", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#f59e0b"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#oceanTempGradient)"
              activeDot={{ r: 5, fill: "#f59e0b", stroke: "#fff" }}
            />
            <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-slate-400 italic">
        Data from Surface Temperature anomalies.csv and Sea Level Anomalies.csv
      </p>

      <div className="text-slate-300 text-sm">
        Data shows annual temperature variations and thermal anomaly trends.
      </div>
    </div>
  );
}