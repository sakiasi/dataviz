import { countryColor } from "../constants/colors";

interface DataPoint {
  country: string;
  dataPointsCount: number;
  slope: number;
  intercept: number;
  correlation: number;
  rSquared: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    color: string;
    name: string;
    payload: DataPoint;
  }>;
  label?: string;
  units?: string;
  isCorrelation?: boolean;
}

export const CustomToolTip = ({
  active,
  payload,
  units,
  isCorrelation,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-foreground text-background p-2">
        {isCorrelation && (
          <div className="flex items-center gap-2">
            <div
              style={{
                backgroundColor:
                  countryColor[payload[0].payload.country] || "#0284c7",
              }}
              className="w-3 h-3 rounded-full"
            ></div>
            <p className="text-primary font-bold">
              {payload[0].payload.country}
            </p>
          </div>
        )}

        {payload
          .sort((a, b) => b.value - a.value)
          .map((d, i) => {
            return (
              <div key={i} className="flex items-center gap-2 mt-1">
                <div className="text-sm flex gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: countryColor[d.name] }}
                    ></div>
                    {d.name} :
                  </div>
                  <span className="font-semibold">
                    {d.value.toLocaleString()}
                  </span>
                  {units}
                  {d.name.includes("Connection Strength") ? "%" : null}
                  {d.name.includes("Warming Rate") ? "°C" : null}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
  return null;
};
