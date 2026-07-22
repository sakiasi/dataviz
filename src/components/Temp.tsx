import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import CropComponent from "./Crop";

interface TemperatureDataPoint {
  year: string;
  temp: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const data: TemperatureDataPoint[] = [
  { year: "1850", temp: -0.2 },
  { year: "1875", temp: -0.15 },
  { year: "1900", temp: -0.05 },
  { year: "1925", temp: 0.0 },
  { year: "1950", temp: 0.1 },
  { year: "1975", temp: 0.2 },
  { year: "2000", temp: 0.4 },
  { year: "2010", temp: 0.5 },
  { year: "2011", temp: 0.7 },
  { year: "2015", temp: 0.9 },
  { year: "2020", temp: 1.1 },
  { year: "2023", temp: 1.3 },
  { year: "2025", temp: 1.5 },
];

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-amber-500/50 p-3 rounded shadow-xl">
        <p className="text-amber-400 font-bold">Year: {label}</p>
        <p className="text-white text-sm">
          Anomaly: <span className="font-semibold">+{payload[0].value}°C</span>
        </p>
        <p className="text-slate-400 text-xs mt-1">vs pre-industrial</p>
      </div>
    );
  }
  return null;
};

export default function TemperatureGraph() {
  return (
    <div className=" text-slate-100 space-y-5">
      <h1 className="text-2xl font-bold text-white tracking-tight">
        Is the Temperature Actually Rising?
      </h1>

      <div className="border-b border-slate-800"></div>

      <div className="text-slate-300 text-sm leading-relaxed space-y-5 mb-10 max-w-3xl">
        <p>
          <a
            className="text-xs text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
            href="https://berkeleyearth.org/global-temperature-report-for-2025/"
          >
            According to Berkeley Earth's 2025 report
          </a>
          , 2025 was the third warmest year on record since 1850, trailing only
          2024 and 2023, with global annual averages reaching 1.44 ± 0.09 °C
          above pre-industrial levels. Despite beginning and ending with a
          modest La Niña event, the year experienced continued extreme warmth
          driven by greenhouse gases, natural variability, and factors like
          reduced cloud cover and sulfur aerosols.
        </p>
      </div>

      <div>
        <h1>
          Top 5 most increased temperature in the pacific island countries
        </h1>
      </div>

      <div className="h-[400px] w-full -ml-5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
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
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: "#f59e0b", stroke: "#fff" }}
            />
            <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <CropComponent />

      <div className="text-slate-300">
        Data shows the mean surface temperature for the pacific islands. Click
        each country to view them individually. data shows...
      </div>
    </div>
  );
}
