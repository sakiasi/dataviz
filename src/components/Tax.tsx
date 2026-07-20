import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface TaxDataPoint {
  year: string;
  energy: number;
  transport: number;
  pollution: number;
  resources: number;
  environment: number;
}

const data: TaxDataPoint[] = [
  { year: "2010", energy: 2.1, transport: 1.2, pollution: 0.5, resources: 0.3, environment: 0.2 },
  { year: "2011", energy: 2.2, transport: 1.3, pollution: 0.5, resources: 0.3, environment: 0.2 },
  { year: "2012", energy: 2.0, transport: 1.1, pollution: 0.4, resources: 0.2, environment: 0.1 },
  { year: "2013", energy: 2.3, transport: 1.4, pollution: 0.6, resources: 0.3, environment: 0.2 },
  { year: "2014", energy: 2.4, transport: 1.4, pollution: 0.6, resources: 0.4, environment: 0.2 },
  { year: "2015", energy: 2.2, transport: 1.3, pollution: 0.5, resources: 0.3, environment: 0.2 },
  { year: "2016", energy: 2.1, transport: 1.2, pollution: 0.5, resources: 0.3, environment: 0.2 },
  { year: "2017", energy: 2.3, transport: 1.4, pollution: 0.6, resources: 0.4, environment: 0.2 },
  { year: "2018", energy: 2.5, transport: 1.5, pollution: 0.7, resources: 0.4, environment: 0.3 },
  { year: "2019", energy: 2.4, transport: 1.4, pollution: 0.6, resources: 0.4, environment: 0.2 },
  { year: "2020", energy: 2.2, transport: 1.2, pollution: 0.5, resources: 0.3, environment: 0.2 },
  { year: "2021", energy: 2.6, transport: 1.6, pollution: 0.8, resources: 0.5, environment: 0.3 },
  { year: "2022", energy: 2.9, transport: 1.8, pollution: 0.9, resources: 0.5, environment: 0.4 },
  { year: "2023", energy: 3.1, transport: 1.9, pollution: 1.0, resources: 0.6, environment: 0.4 },
  { year: "2024", energy: 3.3, transport: 2.0, pollution: 1.1, resources: 0.7, environment: 0.5 },
  { year: "2025", energy: 3.5, transport: 2.1, pollution: 1.2, resources: 0.8, environment: 0.5 },
];

const TAX_CATEGORIES = [
  { key: "energy", name: "Energy", color: "#f59e0b" },
  { key: "transport", name: "Transport", color: "#0ea5e9" },
  { key: "pollution", name: "Pollution", color: "#a855f7" },
  { key: "resources", name: "Resources", color: "#f97316" },
  { key: "environment", name: "Environment", color: "#10b981" },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string; name: string }>;
  label?: string | number;
}) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum, entry) => sum + entry.value, 0);
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs space-y-1">
        <p className="font-semibold text-white">Year: {label}</p>
        {payload.map((entry) => (
          <p key={entry.dataKey} style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value}%</span>
          </p>
        ))}
        <div className="border-t border-slate-700 pt-1 mt-1 font-semibold text-slate-200">
          Total Tax Share: <span className="font-bold">{total.toFixed(1)}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function EnvironmentTaxesComponent() {
  return (
    <div className="text-slate-100 space-y-5 w-full overflow-hidden">
      <div className="flex items-center justify-between mb-8 gap-4 border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Can Taxes Save Our Future?
        </h1>
        <div className="h-1.5 w-16 rounded-full hidden sm:block " />
      </div>

      <div className="text-slate-300 text-sm leading-relaxed space-y-5 mb-10 max-w-3xl">
        <p>
          We know from our data that climate change is already causing massive
          <strong>annual economic losses</strong>. These taxes are our way of
          fighting back. By taxing <strong>energy</strong>,
          <strong>transport</strong>, and <strong>pollution</strong>, we are
          directly linking the &quot;cost of destroying&quot; the environment to the very
          economic losses we are trying to stop. Essentially, we are making it
          cheaper to protect our future than to pay for the disasters that
          climate change creates.
          <a
            className="text-xs pl-1 text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
            href="https://www.oecd.org/tax/tax-policy/environmental-tax-revenues.htm"
            target="_blank"
            rel="noopener noreferrer"
          >
            (OECD, 2024)
          </a>
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          Environmental Tax Breakdown Over Time
        </h2>
      </div>

      <div className="h-[400px] w-full pl-3 pr-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
              stroke="#94a3b8"
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              axisLine={false}
              width={38}
              domain={[0, 10]}
              allowDataOverflow={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(148, 163, 184, 0.05)" }}
            />
            <Bar
              dataKey="energy"
              name="Energy"
              stackId="tax"
              fill="#f59e0b"
              barSize={20}
              fillOpacity={0.85}
            />
            <Bar
              dataKey="transport"
              name="Transport"
              stackId="tax"
              fill="#0ea5e9"
              fillOpacity={0.85}
            />
            <Bar
              dataKey="pollution"
              name="Pollution"
              stackId="tax"
              fill="#a855f7"
              fillOpacity={0.85}
            />
            <Bar
              dataKey="resources"
              name="Resources"
              stackId="tax"
              fill="#f97316"
              fillOpacity={0.85}
            />
            <Bar
              dataKey="environment"
              name="Environment"
              stackId="tax"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              fillOpacity={0.85}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Color Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2 pb-1 border-t border-slate-800">
        {TAX_CATEGORIES.map((cat) => (
          <div key={cat.key} className="flex items-center space-x-2 text-xs">
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{ backgroundColor: cat.color }}
            />
            <span className="text-slate-300 font-medium">{cat.name}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 italic">
        Data from Environmental tax revenue and types.csv
      </p>

      <div className="text-slate-300 text-sm">
        Data shows annual breakdown of environmental tax types as a percentage share.
      </div>
    </div>
  );
}