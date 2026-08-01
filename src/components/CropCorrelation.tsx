import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine,
} from "recharts";

interface CorrelationDataPoint {
  country: string;
  correlation: number;
}

const correlationData: CorrelationDataPoint[] = [
  { country: "Micronesia", correlation: -0.7392696823310754 },
  { country: "Niue", correlation: -0.6452468228672253 },
  { country: "Fiji", correlation: -0.36181928333198715 },
  { country: "French Polynesia", correlation: 0.005185611504572078 },
  { country: "Tonga", correlation: 0.028933023678946335 },
  { country: "Cook Islands", correlation: 0.04619510128601071 },
  { country: "Solomon Islands", correlation: 0.13221223872922036 },
  { country: "Samoa", correlation: 0.23097093978871686 },
  { country: "New Caledonia", correlation: 0.2362188060972142 },
  { country: "Vanuatu", correlation: 0.24649182563284616 },
  { country: "Kiribati", correlation: 0.3048956104022762 },
  { country: "Tuvalu", correlation: 0.362734884913201 },
  { country: "Marshall Islands", correlation: 0.484005678495537 },
  { country: "Nauru", correlation: 0.6031905668227201 },
  { country: "Papua New Guinea", correlation: 0.7871626380761595 },
].sort((a, b) => a.correlation - b.correlation);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 text-xs text-slate-100 rounded-lg shadow-xl space-y-1">
        <p className="font-bold text-amber-400 text-sm">{data.country}</p>
        <p className="text-slate-300">
          Temperature Correlation:{" "}
          <span className="font-semibold text-white">
            {data.correlation.toFixed(3)}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function CorrelationChart() {
  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Is the reduction in crop yield linked to temperature ?
        </h2>
      </div>

      <div className="h-[520px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={correlationData}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="yellowBarGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="redBarGradient" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              horizontal={false}
            />
            <XAxis
              type="number"
              domain={[-0.9, 0.9]}
              stroke="#64748b"
              tick={{ fontSize: 11 }}
              tickFormatter={(value) => `${value.toFixed(1)}`}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="country"
              stroke="#94a3b8"
              tick={{ fontSize: 11, fill: "#cbd5e1" }}
              width={120}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={CustomTooltip}
              cursor={{ fill: "rgba(255, 255, 255, 0.03)" }}
            />
            <ReferenceLine x={0} stroke="#64748b" strokeDasharray="3 3" />
            <Bar
              dataKey="correlation"
              radius={[6, 6, 6, 6]}
              barSize={16}
            >
              {correlationData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.correlation < 0 ? "url(#redBarGradient)" : "url(#yellowBarGradient)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        Papua New Guinea and Nauru show the strongest positive link between
        temperature and crop yields, meaning their harvests tend to increase
        during warmer periods, whereas Niue and Micronesia experience the
        sharpest negative impacts where higher temperatures sharply decrease
        their output. Meanwhile, countries like French Polynesia, Tonga, and
        the Cook Islands sit close to zero, meaning temperature changes have
        almost no impact on their harvest sizes.
      </div>
    </div>
  );
}