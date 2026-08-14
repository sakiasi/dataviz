import {
  Bar,
  ComposedChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomToolTip } from "../components/CustomToolTip";
import { countryColor } from "../constants/colors";
import type { ChartProps } from "../types";

const SlopeChartV2 = ({ units, toolTipUnits, slope }: ChartProps) => {
  return (
    <ResponsiveContainer className={"w-full h-150"}>
      <ComposedChart layout="vertical" data={slope} barCategoryGap={15}>
        <CartesianGrid
          stroke="var(--border)"
          strokeDasharray="3 3"
          horizontal={false}
        />

        <XAxis
          type="number"
          dataKey="slope"
          stroke="var(--muted-foreground)"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => {
            if (units === "°C" || units?.includes("°")) {
              return `${value} ${units ?? ""}`;
            }
            if (value >= 1_000_000 || value <= -1_000_000) {
              return `${(value / 1_000_000).toFixed(1)}M ${units ?? ""}`.trim();
            }
            if (value >= 1_000 || value <= -1_000) {
              return `${(value / 1_000).toFixed(0)}k ${units ?? ""}`.trim();
            }
            return `${value} ${units ?? ""}`.trim();
          }}
        />

        <YAxis
          type="category"
          dataKey="country"
          width={60}
          stroke="var(--muted-foreground)"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) =>
            value.includes("Micronesia") ? "Micronesia" : value
          }
        />

        <Tooltip
          content={<CustomToolTip units={toolTipUnits} />}
          cursor={{ fill: "rgba(255, 255, 255, 0.03)" }}
        />

        {/* The "Stem" of the lollipop (very thin bar) */}
        <Bar dataKey="slope" barSize={2} radius={[0, 4, 4, 0]}>
          {slope?.map((d) => (
            <Cell
              key={`bar-${d.country}`}
              fill={countryColor[d.country]}
              opacity={0.6}
            />
          ))}
        </Bar>

        {/* The "Candy" (dot at the end of the stem) */}
        <Scatter dataKey="slope">
          {slope?.map((d) => (
            <Cell key={`scatter-${d.country}`} fill={countryColor[d.country]} />
          ))}
        </Scatter>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default SlopeChartV2;
