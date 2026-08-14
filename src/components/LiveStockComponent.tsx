import { useLivestockAnalysis } from "../services/liveStockAnalysis";
import LiveStockChart from "./LivestockChart";
import LivestockCorrelationChart from "./LivestockCorrelationChart";

export default function LiveStockComponent() {
  const { selectedCountries } = useLivestockAnalysis();

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-2xl font-bold  tracking-tight text-center md:text-start">
        Does surface heat reduce livestock yield ?
      </h1>

      <div className="border-b border-primary"></div>

      <div className=" leading-relaxed  max-w-3xl">
        <p>
          Climate change hits livestock just as hard as it hits crops, primarily
          through direct heat stress and the decline of the food they rely on.
          When temperatures climb, animals struggle to maintain their core body
          temperature, which forces their bodies to shift energy away from
          growth, milk production, and reproduction just to survive. It’s not
          just the heat, either; erratic rainfall and drought dry up pastures
          and reduce the quality of forage, while warmer, wetter conditions
          create a perfect breeding ground for new pests and diseases that
          compromise animal health.
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

      <div>
        <LiveStockChart />
      </div>

      <p className="text-sm mt-2">
        <span className="font-bold">Fig 5.0 : </span>The X-axis represents the
        monitoring years, while the Y-axis tracks observed livestock yield in
        kilograms per animal.
      </p>

      <div className="">
        The data highlights a clear divergence in livestock trends across the
        Pacific region, with nations like Kiribati, Micronesia, and Niue
        experiencing positive growth trajectories over time. In contrast,
        countries such as Fiji, French Polynesia, the Cook Islands, and Tuvalu
        face steep downward slopes in their livestock metrics.
      </div>

      <LivestockCorrelationChart selectedCountries={selectedCountries} />
      <p className="text-sm">
        <span className="font-bold">Fig 5.1: </span>The X-axis measures the
        ratio of livestock yield change relative to surface heat change.
        Expressed in kilograms per animal per degree Celsius ((kg/animal)/°C),
        it indicates how much the livestock yield changes for every unit
        increase in surface heat.
      </p>
      <p>
        Data shows a varied pattern in how rising temperatures affect livestock
        yield across the Pacific. In Micronesia, warmer weather is tied to a
        sharp increase in livestock yield, adding about 839 kg per animal for
        every degree of temperature rise. On the other hand, countries like
        Fiji, Cook Islands, and Tuvalu face significant drops, with yields
        plunging by 1,200 to over 1,500 kg per animal per degree of warming.
        Meanwhile, places like Papua New Guinea show practically no change at
        all, remaining steady regardless of temperature shifts.
      </p>
    </div>
  );
}
