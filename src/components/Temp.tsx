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

// 1. Mock Data representing the trend described (Global Temperature Anomalies)
// In a real app, this would come from an API or CSV.
const data = [
  { year: "1850", temp: -0.2 },
  { year: "1875", temp: -0.15 },
  { year: "1900", temp: -0.05 },
  { year: "1925", temp: 0.0 },
  { year: "1950", temp: 0.1 },
  { year: "1975", temp: 0.2 },
  { year: "2000", temp: 0.4 },
  { year: "2010", temp: 0.5 },
  { year: "2011", temp: 0.7 }, // The break mentioned
  { year: "2015", temp: 0.9 },
  { year: "2020", temp: 1.1 },
  { year: "2023", temp: 1.3 },
  { year: "2025", temp: 1.5 }, // Projected/Recent data
];

// 2. Custom Tooltip styled to match the dark executive theme
const CustomTooltip = ({ active, payload, label }: any) => {
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
    // Matching container styles: dark background, padding
    <div className="bg-slate-900 text-slate-100 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-800 max-w-4xl mx-auto my-10">
      
      {/* Header Section matching timeline styling */}
      <div className="flex items-center justify-between mb-8 gap-4 border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Is the Temperature Actually Rising?
        </h1>
        <div className="h-1.5 w-16 bg-amber-500/40 rounded-full hidden sm:block" />
      </div>

      {/* Description text matching timeline font sizes/colors */}
      <div className="text-slate-300 text-sm leading-relaxed space-y-4 mb-10 max-w-3xl">
        <p>
          The data tells a clear story: our climate has moved into uncharted
          territory. For over 150 years—from 1850 to 2010—global temperatures
          remained relatively stable and predictable.
        </p>
        <p className="text-amber-100 font-medium">
          However, starting in 2011, we broke through that historical ceiling.
        </p>
        <p>
          We aren't just seeing a slight shift; we are seeing temperatures
          consistently push beyond the "normal" range we’ve relied on for
          generations, signaling that the warming trend is no longer a future
          prediction—it’s our current reality.
        </p>
      </div>

      {/* Chart Section */}
      <div className="h-[400px] w-full -ml-5"> {/* Negative margin aligns Y-axis ticks */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            
            {/* X-Axis (Years) styled in slate */}
            <XAxis 
              dataKey="year" 
              stroke="#94a3b8" 
              tick={{ fontSize: 12 }} 
              interval={2} // Show every 3rd year to avoid crowding
              tickLine={false}
            />
            
            {/* Y-Axis (Temperature) styled in slate */}
            <YAxis 
              stroke="#94a3b8" 
              tick={{ fontSize: 12 }} 
              domain={['auto', 'dataMax + 0.2']}
              tickFormatter={(value) => `${value}°C`}
              tickLine={false}
              axisLine={false}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f59e0b', strokeWidth: 1 }}/>
            
            {/* The Main Data Line colored in Amber to match theme */}
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#f59e0b" 
              strokeWidth={2}
              dot={false} // Hide dots for a cleaner professional look
              activeDot={{ r: 5, fill: "#f59e0b", stroke: "#fff" }}
            />

            {/* Optional: Reference line at 0 to highlight rise */}
            <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Citation styled */}
      <div className="mt-8 pt-5 border-t border-slate-800 text-right">
        <a
          href="https://berkeleyearth.org/global-temperature-report-for-2025/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
        >
          Source: Berkeley Earth. (2026)
        </a>
      </div>
    </div>
  );
}