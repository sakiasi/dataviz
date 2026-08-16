import { useCropAnalysis } from "../services/cropAnalysis";
import CropCorrelationChart from "./CropCorrelationChart";

export default function CropComponent() {
  const { selectedCountries } = useCropAnalysis();

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight text-center md:text-start">
        Extreme Heat Takes a Heavy, Uneven Toll on Crops
      </h1>

      <div className="border-b border-primary"></div>

      <div className=" leading-relaxed  max-w-3xl">
        <p>
          Extreme heat is one of the biggest threats to the world's food supply
          because it damages how plants grow and reproduce, often making them
          sterile. When plants get too hot, important internal processes—like
          how they handle sugars, fats, and natural hormones—break down, which
          drastically lowers the amount of food they can produce.
          <a
            className=" pl-1 hover:text-primary transition-colors underline decoration-primary underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://doi.org/10.1111/pbi.13946"
          >
            (Khan et al., 2022)
          </a>
        </p>
      </div>

      <div>
        <CropCorrelationChart selectedCountries={selectedCountries} />
      </div>

      <p className="text-sm">
        <span className="font-bold">Fig 4.1: </span>Chart shows how much crop
        yield changes for every 1°C increase in surface temperature.
      </p>

      <p>
        Data shows a dramatic split in annual crop yield trends across the
        Pacific. In countries like the Marshall Islands, agricultural production
        sees a significant boost, yielding an extra 175 kilograms of crops per
        hectare each year. On the flip side, Micronesia faces a severe toll,
        where crop yields plummet by over 1,469 kilograms per hectare per year.
        Meanwhile, French Polynesia stands completely apart as a steady outlier,
        showing virtually zero change in crop yields over time (-2.3 kg/ha per
        year).
      </p>
    </div>
  );
}
