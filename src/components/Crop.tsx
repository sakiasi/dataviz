import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCropAnalysis } from "../services/cropAnalysis";

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
              .find((p) => p.dataKey === "cropValue")
              ?.value.toLocaleString()}{" "}
            KG/HA
          </span>
        </p>
        <p className="text-emerald-400">
          Temperature:{" "}
          <span className="font-bold">
            +{payload.find((p) => p.dataKey === "tempValue")?.value}°C
          </span>
        </p>
      </div>
    );
  }
  return null;
};

// User should be able to see temp line chart
// User should be able to see crop yield chart
// User should be able to select each country

export default function Crop() {

  const [isCropSelectCountry, setIsCropSelectCountry] = useState(false);
  const { cropYield, countryList, setSelectCountry } = useCropAnalysis();

  useEffect(() => {
    console.log("CROP YIELD:", cropYield);
    console.log("COUNTRIES:", countryList);
  }, [cropYield, countryList]);

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
          Crop Yield Declines at Least 50 kg/Hectare Annually
        </h2>
      </div>

      <div className="relative">
        <div
          onMouseDown={()=>setIsCropSelectCountry(prev => !prev)}
          className="flex justify-around md:w-3/6 p-2 rounded-md hover:cursor-pointer hover:bg-slate-800 items-center border-slate-800 border-2"
        >
          <p> Select Country ({countryList.length}) </p>
          {isCropSelectCountry ? <ChevronDown /> : <ChevronUp />}
        </div>

        <div className={`${isCropSelectCountry ? 'absolute w-full top-15 h-90 overflow-y-auto z-10 flex-col border bg-slate-700 rounded-md border-slate-900 ' : 'hidden'}`}>
          {countryList.sort((a,b) => a.localeCompare(b) ).map((d, index) => (
            <ul key={index} onMouseDown={()=>{setIsCropSelectCountry(false); setSelectCountry(d)}} className="hover:cursor-pointer hover:bg-slate-900 p-2 border-b border-slate-900 ">
              <li>{d}</li>
            </ul>
          ))}
        </div>
      </div>

      <div className="h-[400px] w-full pl-3 pr-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={cropYield}
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
              interval={10}
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
              width={30}
              dataKey={'tempValue'}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(148, 163, 184, 0.05)" }}
            />
            <Bar
              yAxisId="left"
              dataKey="cropValue"
              fill="#f59e0b"
              radius={[4, 4, 0, 0]}
              barSize={24}
              fillOpacity={0.85}
            />
            <Line
              yAxisId="right"
              dataKey="tempValue"
              type="monotone"
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
        The data shows a decline of crop yield across all countries and
        territories in the pacific annually. Tonga shows the least decline of 50
        kg/hectare while fiji shows the highest decline of 90 kg/hectare.
      </div>
    </div>
  );
}
