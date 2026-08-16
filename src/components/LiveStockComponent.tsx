import { useLivestockAnalysis } from "../services/liveStockAnalysis";
import LivestockCorrelationChart from "./LivestockCorrelationChart";

export default function LiveStockComponent() {
  const { selectedCountries } = useLivestockAnalysis();

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-2xl font-bold  tracking-tight text-center md:text-start">
        Livestock Production Plummets Under Thermal Stress
      </h1>

      <div className="border-b border-primary"></div>

      <div className=" leading-relaxed  max-w-3xl">
        <p>
          When temperatures climb, animals struggle to maintain their core body
          temperature, which forces their bodies to shift energy away from
          growth, milk production, and reproduction just to survive.
          <a
            className=" pl-1 hover:text-primary transition-colors underline decoration-primary underline-offset-2"
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
        Data reveals a sharp divide in livestock productivity across the
        Pacific, with most nations seeing steady annual drops while a few buck
        the trend. Leading the gains, Micronesia and Kiribati expand their
        livestock yield by roughly 23 to 24 kilograms per animal each year. On
        the flip side, Fiji and French Polynesia suffer the heaviest losses,
        plunging by over 43 to 45 kilograms per animal annually. Meanwhile,
        countries like Papua New Guinea and New Caledonia remain virtually
        untouched by these shifts, holding flat with almost zero annual change.
      </p>
    </div>
  );
}
