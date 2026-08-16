import { useCropAnalysis } from "../services/cropAnalysis";
import OceanCorrelationChart from "./CropCorrelationChart";

export default function CropComponent() {
  const { selectedCountries, countryInfluence } = useCropAnalysis();

  // Find extreme outliers dynamically from temperature influence calculations
  const sortedInfluence = [...countryInfluence].sort((a, b) => b.slope - a.slope);
  const highestGain = sortedInfluence[0];
  const steepestLoss = sortedInfluence[sortedInfluence.length - 1];
  const steadyOutlier = sortedInfluence.find((d) => Math.abs(d.slope) < 5);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight text-center md:text-start">
        Extreme Heat Takes a Heavy, Uneven Toll on Crops
      </h1>

      <div className="border-b border-primary"></div>

      <div className="leading-relaxed max-w-3xl">
        <p>
          Extreme heat is one of the biggest threats to the world's food supply
          because it damages how plants grow and reproduce, often making them
          sterile. When plants get too hot, important internal processes—like
          how they handle sugars, fats, and natural hormones—break down, which
          drastically lowers the amount of food they can produce.{" "}
          <a
            className="pl-1 hover:text-primary transition-colors underline decoration-primary underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://doi.org/10.1111/pbi.13946"
          >
            (Khan et al., 2022)
          </a>
        </p>
      </div>

      <div>
        <OceanCorrelationChart selectedCountries={selectedCountries} />
      </div>

      <p className="text-sm">
        <span className="font-bold">Fig 4.1: </span>Chart shows how much crop
        yield changes for every 1°C increase in surface temperature.
      </p>

      <div>
        <p>
          Data shows a dramatic split in thermal crop yield sensitivity across the
          Pacific. In countries like{" "}
          {highestGain ? highestGain.country : "the Marshall Islands"}, agricultural
          production sees a positive response, yielding an extra{" "}
          {highestGain ? Math.round(highestGain.slope) : 175} kg/ha per 1°C rise in
          surface temperature. On the flip side,{" "}
          {steepestLoss ? steepestLoss.country : "Micronesia"} faces a severe toll,
          where crop yields drop by{" "}
          {steepestLoss ? Math.abs(Math.round(steepestLoss.slope)) : 1469} kg/ha per
          1°C warming. Meanwhile, territories like{" "}
          {steadyOutlier ? steadyOutlier.country : "French Polynesia"} show virtually
          zero thermal sensitivity (
          {steadyOutlier ? steadyOutlier.slope.toFixed(1) : "-2.3"} kg/ha per 1°C).
        </p>
      </div>
    </div>
  );
}