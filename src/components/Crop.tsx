import { useState } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { cropAnalysis, getAvailableCountries } from "../services/cropAnalysis";

const availableCountries = getAvailableCountries();

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs space-y-1">
        <p className="font-semibold text-white">
          {data.country} ({data.year})
        </p>
        <p className="text-amber-400">
          Crop Yield:{" "}
          <span className="font-bold">{data.crop_value.toLocaleString()} KG/HA</span>
        </p>
        <p className="text-emerald-400">
          Temperature Anomaly:{" "}
          <span className="font-bold">
            {data.temp_value > 0 ? `+${data.temp_value}` : data.temp_value}°C
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function Crop() {
  const [selectedCountry, setSelectedCountry] = useState("Vanuatu");
  const { scatterData, trendLineData, slope } = cropAnalysis(selectedCountry);

  const isNegative = slope < 0;
  const actionWord = isNegative ? "decreases" : "increases";

  return (
    <div className="text-slate-100 space-y-5 w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          How is Heat Stress Impacting Crop Yields?
        </h1>

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-amber-500"
        >
          {availableCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="border-b border-slate-800"></div>

      <div className="text-slate-300 leading-relaxed space-y-5 mb-10 max-w-3xl">
        <p>
          Extreme heat is one of the biggest threats to agricultural productivity
          because it disrupts plant growth, pollination, and natural internal processes,
          ultimately lowering total crop yield.
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
          {selectedCountry}: Temperature Anomaly vs. Crop Yield Correlation
        </h2>
      </div>

      <div className="h-[400px] w-full pl-3 pr-0">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              type="number"
              dataKey="temp_value"
              name="Temperature Anomaly"
              unit="°C"
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              domain={["auto", "auto"]}
            />
            <YAxis
              type="number"
              dataKey="crop_value"
              name="Crop Yield"
              unit=" KG/HA"
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              domain={["auto", "auto"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter name={selectedCountry} data={scatterData} fill="#f59e0b" />
            <Line
              type="monotone"
              dataKey="crop_value"
              data={trendLineData}
              stroke="#34d399"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-slate-400 italic">
        Data from Crop yield - disaggregated.csv (SPC Climate Change indicators)
      </p>

      <div className="text-slate-300">
        The data for {selectedCountry} shows a linear relationship between surface temperature
        anomalies and agricultural yields. Every 1°C increase in surface temperature, average crop
        yield {actionWord} by {Math.abs(slope).toFixed(2)} kilograms per hectare.
      </div>
    </div>
  );
}