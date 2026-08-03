import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface CountryDataPoint {
  country: string;
  avgValue: number;
}

const countryData: CountryDataPoint[] = [
  { country: "Niue", avgValue: 1683.62 },
  { country: "Tuvalu", avgValue: 1754.26 },
  { country: "Marshall Islands", avgValue: 4039.55 },
  { country: "Kiribati", avgValue: 4399.7 },
  { country: "Vanuatu", avgValue: 4540.32 },
  { country: "Samoa", avgValue: 5169.73 },
  { country: "Cook Islands", avgValue: 5394.19 },
  { country: "New Caledonia", avgValue: 5674.24 },
  { name: "French Polynesia", country: "French Polynesia", avgValue: 6172.7 },
  { country: "Nauru", avgValue: 6576.18 },
  { country: "Tonga", avgValue: 7342.3 },
  { country: "Papua New Guinea", avgValue: 7676.01 },
  { country: "Solomon Islands", avgValue: 7794.27 },
  { country: "Micronesia", avgValue: 12048.85 },
  { country: "Fiji", avgValue: 37501.82 },
].sort((a, b) => a.avgValue - b.avgValue); // Sorted from lowest to highest so the highest is at the top and lowest is at the bottom

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 text-xs text-slate-100 rounded-lg shadow-xl space-y-1">
        <p className="font-bold text-amber-400 text-sm">{label}</p>
        <p className="text-slate-300">
          Crop Yield Output:{" "}
          <span className="font-semibold text-white">
            {payload[0].value.toLocaleString()}
          </span>{" "}
          KG/HA
        </p>
      </div>
    );
  }
  return null;
};

export default function CountryChart() {
  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Which country is experiencing low crop yield ?
        </h2>
      </div>

      <div className="h-[520px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={countryData}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="#64748b"
              tick={{ fontSize: 11 }}
              tickFormatter={(value) => `${value.toLocaleString()}`}
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
            <Bar
              dataKey="avgValue"
              fill="url(#barGradient)"
              radius={[0, 6, 6, 0]}
              barSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        Niue records the lowest amount of crops harvested relative to land area
        in the region at 1,683.62 KG/HA, closely followed by Tuvalu at 1,754.26
        KG/HA. The majority of Pacific nations—such as the Marshall Islands,
        Vanuatu, Samoa, Tonga, and the Solomon Islands—form a steady progression
        ranging between roughly 4,000 and 7,800 KG/HA. Meanwhile, Micronesia
        stands out in the upper tier at 12,048.85 KG/HA, and Fiji dramatically
        outpaces every other territory in the dataset with an exceptionally high
        average of 37,501.82 KG/HA.
      </div>
    </div>
  );
}


