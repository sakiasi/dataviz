import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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

const SeaChart = () => {
  return (
    <div className="h-100 w-full space-y-5 pb-5">
      <h1>
        Rising Sea Surface Temperature Anomalies Over Time
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="oceanTempGradient" x1="0" y1="0" x2="0" y2="1">
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
  );
};

export default SeaChart;
