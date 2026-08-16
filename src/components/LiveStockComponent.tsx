import { useLivestockAnalysis } from "../services/liveStockAnalysis";
import LivestockCorrelationChart from "./LivestockCorrelationChart";

export default function LiveStockComponent() {
  const { selectedCountries, countryInfluence } = useLivestockAnalysis();

  // Find extreme outliers dynamically from temperature influence calculations
  const sortedInfluence = [...countryInfluence].sort((a, b) => b.slope - a.slope);
  const highestGain = sortedInfluence[0];
  const steepestLoss = sortedInfluence[sortedInfluence.length - 1];
  const flatOutlier = sortedInfluence.find((d) => Math.abs(d.slope) < 2);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight text-center md:text-start">
        Livestock Production Plummets Under Thermal Stress
      </h1>

      <div className="border-b border-primary"></div>

      <div className="leading-relaxed max-w-3xl">
        <p>
          When temperatures climb, animals struggle to maintain their core body
          temperature, which forces their bodies to shift energy away from
          growth, milk production, and reproduction just to survive.{" "}
          <a
            className="pl-1 hover:text-primary transition-colors underline decoration-primary underline-offset-2"
            href="https://www.mdpi.com/2073-4433/13/1/140"
            target="_blank"
            rel="noopener noreferrer"
          >
            (Cheng et al., 2022).
          </a>
        </p>
      </div>

      <LivestockCorrelationChart selectedCountries={selectedCountries} />

      <p className="text-sm">
        <span className="font-bold">Fig 5.1: </span>The X-axis measures the
        ratio of livestock yield change relative to surface heat change.
        Expressed in kilograms per animal per degree Celsius (kg/animal per °C),
        it indicates how much livestock yield changes for every 1°C increase in
        surface temperature.
      </p>

      <p>
        Data reveals a sharp divide in livestock thermal sensitivity across the
        Pacific, with most nations seeing productivity drops under warming
        while a few maintain positive responses. Leading the gains,{" "}
        {highestGain ? highestGain.country : "Micronesia and Kiribati"}{" "}
        expand their livestock yield by roughly{" "}
        {highestGain ? Math.round(highestGain.slope) : 23} kg/animal per 1°C
        increase in surface temperature. On the flip side,{" "}
        {steepestLoss ? steepestLoss.country : "Fiji and French Polynesia"}{" "}
        suffer the heaviest losses, plunging by over{" "}
        {steepestLoss ? Math.abs(Math.round(steepestLoss.slope)) : 43} kg/animal
        per 1°C warming. Meanwhile, countries like{" "}
        {flatOutlier ? flatOutlier.country : "Papua New Guinea and New Caledonia"}{" "}
        remain virtually untouched by these shifts, holding flat with near-zero
        thermal sensitivity.
      </p>
    </div>
  );
}