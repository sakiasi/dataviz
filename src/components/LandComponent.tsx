import { useLandAnalysis } from "../services/landAnalysis";
import { LandSlopeChart } from "./LandSlopeChart";

const LandComponent = () => {
  const { slope } = useLandAnalysis();

  // Extract top positive and negative countries dynamically
  const topIncreases = slope.slice(0, 2);
  const topDecreases = [...slope].reverse().slice(0, 2);
  const nearZero = slope.filter((d) => Math.abs(d.slope) < 0.1);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight text-center md:text-start">
        Land Cover Index
      </h1>

      <div className="border-b border-primary"></div>

      <div className="leading-relaxed flex flex-col gap-5 max-w-3xl">
        <p>
          According to the{" "}
          <a
            className="pl-1 hover:text-primary transition-colors underline decoration-primary underline-offset-2"
            href="https://www.ipcc.ch/srccl/"
            target="_blank"
            rel="noopener noreferrer"
          >
            IPCC (2019)
          </a>
          , tracking changes in land cover is essential for assessing ecosystem
          degradation, evaluating climate resilience, and understanding how
          land-use shifts impact vulnerable island environments.
        </p>
      </div>

      <div>
        <LandSlopeChart />
      </div>

      <p className="text-sm">
        <span className="font-bold">Fig 6.1 : </span> This chart shows the
        annual rate of change (slope) in the Climate Altering Land Cover Index
        (CALCI) across Pacific island nations (1992–2022).
      </p>

      <div>
        <p>
          The slope values show the average annual change in the Climate
          Altering Land Cover Index across Pacific islands from 1992 to 2022.{" "}
          {topIncreases[0]?.country} ({topIncreases[0]?.slope > 0 ? "+" : ""}
          {topIncreases[0]?.slope.toFixed(2)}/yr) and {topIncreases[1]?.country}{" "}
          ({topIncreases[1]?.slope > 0 ? "+" : ""}
          {topIncreases[1]?.slope.toFixed(2)}/yr) experienced the fastest annual
          increases. In contrast, {topDecreases[0]?.country} (
          {topDecreases[0]?.slope.toFixed(2)}/yr) and {topDecreases[1]?.country}{" "}
          ({topDecreases[1]?.slope.toFixed(2)}/yr) had the steepest annual
          decreases. Meanwhile, several territories like{" "}
          {nearZero.map((d) => d.country).slice(0, 3).join(", ")} had annual
          slopes near zero, indicating minimal land cover shift over the 31-year period.
        </p>
      </div>
    </div>
  );
};

export default LandComponent;