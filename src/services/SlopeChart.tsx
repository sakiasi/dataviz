import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomToolTip } from "../components/CustomToolTip";
import { countryColor } from "../constants/colors";
import type { ChartProps } from "../types";
import { cn } from "../lib/util";

const SlopeChart = ({ units, toolTipUnits, slope }: ChartProps) => {
  return (
    <ResponsiveContainer className={"w-full h-150"}>
      <BarChart barCategoryGap={"10"} layout="vertical" data={slope}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />

        <XAxis
          type="number"
          dataKey="slope"
          stroke="var(--muted-foreground)"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => {
            // Skip formatting if it's temperature or small values
            if (units === "°C" || units?.includes("°")) {
              return `${value} ${units ?? ""}`;
            }

            // Format large numbers into thousands (k) or millions (M)
            if (value >= 1_000_000) {
              return `${(value / 1_000_000).toFixed(1)} ${units ?? ""}`.trim();
            }

            if (value >= 1_000) {
              return `${(value / 1_000).toFixed(0)}k ${units ?? ""}`.trim();
            }

            return `${value} ${units ?? ""}`.trim();
          }}
        />

        <YAxis
          width={10}
          type="category"
          dataKey={"country"}
          domain={["auto", "auto"]}
          stroke="var(--muted-foreground)"
          //   tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          tick={false}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          content={<CustomToolTip units={toolTipUnits} />}
          cursor={{ fill: "rgba(255, 255, 255, 0.03)" }}
        />

        <Bar dataKey="slope" strokeWidth={1}>
          {slope?.map((d) => (
            <Cell key={d.country} fill={countryColor[d.country]} />
          ))}
          <LabelList
            dataKey="country"
            position="insideLeft"
            content={(props: any) => {
              const { x, y, height, value } = props;
              return (
                <foreignObject
                  x={x + 5}
                  y={y + height / 1 - 10}
                  width={200}
                  height={15}
                  className=" flex"
                >
                  <div className="flex items-center h-full">
                    <div
                      className={cn(
                        "inline-flex items-center px-1.5 py-0.5 rounded text-[11px]  bg-background/80",
                      )}
                    >
                      {value.includes("Micronesia") ? "Micronesia" : value}
                    </div>
                  </div>
                </foreignObject>
              );
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SlopeChart;
