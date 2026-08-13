import { useState } from "react";
import { useCropAnalysis } from "../services/cropAnalysis";
import CropChart from "./CropChart";
import CropCorrelationChart from "./CropCorrelationChart";
import SelectCountryComponent from "./SelectCountryComponent";

export default function CropComponent() {
  const [isCountrySelect, setIsCountrySelect] = useState(false);

  const { selectedCountries, setSelectedCountries, countryList } =
    useCropAnalysis();

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight">
        Does surface heat reduce crop yield ?
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
            ( Jin, S. & Zhang, X. , 2022 )
          </a>
        </p>
      </div>

      <div className="relative">
        <SelectCountryComponent
          countryList={countryList}
          isCountrySelect={isCountrySelect}
          selectedCountries={selectedCountries}
          setIsCountrySelect={setIsCountrySelect}
          setSelectedCountries={setSelectedCountries}
        />
      </div>

      <div>
        <CropChart selectedCountries={selectedCountries} />
      </div>

      <p className="text-sm mt-2">
        <span className="font-bold">Fig 4.0 : </span>The X-axis represents the
        monitoring years, while the Y-axis tracks observed crop yield in
        kilograms per hectare.
      </p>

      <div className="">
        The data reveals striking disparities in agricultural productivity
        trends across the Pacific region: nations like the Marshall Islands,
        Kiribati, and Papua New Guinea are experiencing the fastest-growing crop
        yields per hectare, whereas Micronesia and Fiji face severe, sharp
        declines in harvest efficiency over time.
      </div>

      <div>
        <CropCorrelationChart selectedCountries={selectedCountries} />
      </div>

      <p className="text-sm">
        <span className="font-bold">Fig 4.1: </span>The X-axis measures the
        ratio of crop yield change relative to surface heat change. Expressed in
        kilograms per hectare per degree Celsius ((kg/ha)/°C), it indicates how
        much the crop yield changes for every unit increase in surface heat.
      </p>

      <p>
        Data shows a dramatic split in how rising temperatures affect crop
        yields across the Pacific. In countries like Papua New Guinea, warmer
        weather brings a significant boost, yielding an extra 3,795 kilograms of
        crops per hectare for every degree of temperature increase. On the flip
        side, Micronesia faces a severe toll, where crops plummet by over 64,800
        kilograms per hectare per degree of warming. Meanwhile, French Polynesia
        stands completely apart as a steady outlier, showing virtually zero
        change in crop yields no matter how much the temperature shifts.
      </p>
    </div>
  );
}
