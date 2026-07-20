import { ResponsiveContainer, Treemap, Tooltip } from "recharts";

// Define the interface based on your specific column names
interface DisasterDataPoint {
  country: string;
  year: string;
  value: number;
  // Adding an optional color property to customize tile appearance if needed
  fill?: string;
}

const data: DisasterDataPoint[] = [
  { country: "United States", year: "2023", value: 45000000000 },
  { country: "China", year: "2023", value: 38000000000 },
  { country: "Japan", year: "2023", value: 22000000000 },
  { country: "India", year: "2023", value: 19000000000 },
  { country: "Germany", year: "2023", value: 12000000000 },
  { country: "Philippines", year: "2023", value: 9500000000 },
  { country: "France", year: "2023", value: 8200000000 },
  { country: "Brazil", year: "2023", value: 6800000000 },
  { country: "Italy", year: "2023", value: 5500000000 },
  { country: "Australia", year: "2023", value: 4800000000 },
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: DisasterDataPoint }>;
}) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs space-y-1">
        <p className="font-semibold text-white">Country: {item.country}</p>
        <p className="text-slate-400">Year: {item.year}</p>
        <p className="text-amber-400">
          Economic Loss: <span className="font-bold">${(item.value / 1000000000).toFixed(2)} Billion</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomizedContent = (props: any) => {
  const { x, y, width, height, country, value, fill } = props;

  // Defined colors matching your theme for contrast
  const bgColor = fill || "#f59e0b"; // Default amber
  const textColor = "#020617"; // slate-950 for high contrast against yellow

  if (width < 40 || height < 30) {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: bgColor,
            stroke: "#1e293b", // slate-800
            strokeWidth: 2,
            fillOpacity: 0.9,
          }}
          className="transition-opacity hover:opacity-100 cursor-pointer"
        />
      </g>
    );
  }

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: bgColor,
          stroke: "#1e293b", // slate-800
          strokeWidth: 2,
          fillOpacity: 0.9,
        }}
        className="transition-opacity hover:opacity-100 cursor-pointer"
      />
      <text
        x={x + 8}
        y={y + 20}
        fill={textColor} // Changed to dark color for visibility
        fontSize={12}
        fontWeight={600}
        className="pointer-events-none select-none"
      >
        {country}
      </text>
      <text
        x={x + 8}
        y={y + 36}
        fill={textColor} // Changed to dark color for visibility
        fontSize={10}
        fillOpacity={0.9}
        className="pointer-events-none select-none"
      >
        ${(value / 1000000000).toFixed(1)}B
      </text>
    </g>
  );
};

export default function DisasterEconomicLossComponent() {
  return (
    <div className="text-slate-100 pb-5 space-y-5 w-full overflow-hidden">
      <div className="flex items-center justify-between mb-8 gap-4 border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          At what cost ?
        </h1>
        <div className="h-1.5 w-16 rounded-full hidden sm:block " />
      </div>

      <div className="text-slate-300 text-sm leading-relaxed space-y-4 mb-10 max-w-3xl">
        <p>
          Because oceans absorb most of the excess heat trapped by greenhouse
          gases, we are seeing more intense storms and rising sea levels. Today,
          immense financial resources are being deployed to mitigate these
          severe climate impacts.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          Direct Disaster Economic Loss by Country
        </h2>
      </div>

      <div className="h-[400px] w-full pl-3 pr-0">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="value"
            aspectRatio={4 / 3}
            stroke="#1e293b"
            content={<CustomizedContent />}
            // Optionally add a gradient or background fill to the main container
            style={{ backgroundColor: '#0f172a' }} 
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-slate-400 italic">
        Data from Direct disaster economic loss, average annual loss.csv
      </p>

      <div className="text-slate-300 text-sm">
        Data shows country, year, and value (dollar USD) details for direct disaster economic losses.
      </div>
    </div>
  );
}