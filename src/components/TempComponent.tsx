import { TemperatureChart } from "./TempChart";

export default function TempComponent() {
  return (
    <div className="text-foreground flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight normal-case text-center md:text-start">
        Continuous Warming Across Every Pacific Territory
      </h1>

      <div className="border-b border-primary"></div>

      <div className="text-foreground leading-relaxed max-w-3xl">
        <p>
          {" "}
          According to{" "}
          <a
            className=" hover:text-primary transition-colors underline decoration-primary underline-offset-2"
            href="https://berkeleyearth.org/global-temperature-report-for-2025/"
          >
            Berkeley Earth's 2025 report
          </a>
          , 2025 was the third warmest year on record since 1850, trailing only
          2024 and 2023, with global annual averages reaching 1.44 ± 0.09 °C
          above pre-industrial levels.
        </p>
      </div>

      <TemperatureChart />

      <p>
        Every Pacific Island territory and nation in the dataset shows
        continuous temperature increases year after year, confirming a
        widespread, regional warming trend without exception.{" "}
      </p>
      <p>
        French Polynesia, Tokelau, Vanuatu, and the Marshall Islands are heating
        up at the fastest rates, while Pitcairn experiences the most gradual
        increase. The tight clustering of growth speeds across nearly all the
        other islands points to a systemic climate impact affecting the entire
        Pacific region rather than isolated local variations.
      </p>
    </div>
  );
}
