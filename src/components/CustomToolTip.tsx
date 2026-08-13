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
    payload: DataPoint; // This contains your full original country object
  }>;
  label?: string;
  units?: string;
}

export const CustomToolTip = ({
  active,
  payload,
  label,
  units,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primary-foreground border border-primary p-3 rounded shadow-xl">
        <div className="flex items-center gap-2">
          <div
            style={{
              backgroundColor:
                countryColor[payload[0].payload.country] || "#0284c7",
            }}
            className="w-3 h-3 rounded-full"
          ></div>
          <p className="text-primary font-bold">{payload[0].payload.country}</p>
        </div>

        {payload
          .sort((a, b) => b.value - a.value)
          .map((d, i) => {
            return (
              <div key={i} className="flex items-center gap-2 mt-1">
                <p className="text-sm">
                  {d.name} :{" "}
                  <span className="font-semibold">
                    {d.value.toLocaleString()}
                  </span>{" "}
                  {units}
                  {d.name.includes("Connection Strength") ? "%" : null}
                  {d.name.includes("Warming Rate") ? "°C" : null}
                </p>
              </div>
            );
          })}
      </div>
    );
  }
  return null;
};
