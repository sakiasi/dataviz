
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

export const CustomToolTip = ({ active, payload, label }: CustomTooltipProps) => {
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