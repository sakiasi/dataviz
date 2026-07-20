import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface DataPoint {
  country: string;
  affected: number;
}

const data: DataPoint[] = [
  { country: "Fiji", affected: 350000 },
  { country: "Vanuatu", affected: 280000 },
  { country: "Solomon Islands", affected: 210000 },
  { country: "Samoa", affected: 140000 },
  { country: "Tonga", affected: 95000 },
  { country: "Papua New Guinea", affected: 850000 },
];

const formatNumber = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
  }
  return value.toLocaleString();
};

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
        <p className="font-semibold text-white">Country / Territory: {label}</p>
        <p className="text-amber-400">
          Directly Affected:{" "}
          <span className="font-bold">
            {payload[0].value.toLocaleString()} persons
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ImpactPersonChart() {
  return (
    <div className="text-slate-100 pb-5 space-y-5">
      <div className="pb-5 border-b border-slate-800">
        <h1 className=" text-2xl font-bold text-white tracking-tight">
          How Is This Changing Our Daily Lives?
        </h1>
      </div>
        <div className="text-slate-300 text-sm leading-relaxed space-y-4 max-w-3xl">
          <p>
            Climate change is not just a global statistic—it is a personal
            reality. From the immediate destruction of homes by intensifying
            cyclones to the silent, creeping threat of rising sea levels and the
            subsequent surge in health crises, these impacts are fundamentally
            altering the daily lives, safety, and future of Pacific families.
          </p>
        </div>

      <div className="pt-2">
        <h2 className="text-lg font-semibold text-white mb-2">
          Directly Affected Persons by Disasters in the Region
        </h2>
      </div>

      <div className="h-[360px] w-full -ml-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              tickFormatter={formatNumber}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="country"
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={120}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(245, 158, 11, 0.08)" }}
            />
            <Bar
              dataKey="affected"
              fill="#f59e0b"
              radius={[0, 4, 4, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-slate-400 italic">
        Data from Number of directly affected persons attributed to disasters.csv
      </p>
    </div>
  );
}