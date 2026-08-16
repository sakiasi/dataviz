import { useLandAnalysis } from "../services/landAnalysis";
import SlopeChartV2 from "../services/SlopeChartV2";

export const LandSlopeChart = () => {
  const { slope } = useLandAnalysis();

  return (
    <div className="h-full w-full flex flex-col gap-5">

      <div className="h-150">
        <SlopeChartV2 slope={slope} />
      </div>
    </div>
  );
};
