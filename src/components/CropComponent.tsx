import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useCropAnalysis } from "../services/cropAnalysis";
import { handleSelectCountries } from "../services/handleSelectCountries";
import CropChart from "./CropChart";
import { Switch } from "./ui/Switch";
import CropCorrelationChart from "./CropCorrelationChart";

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
        <div
          onMouseDown={() => setIsCountrySelect((prev) => !prev)}
          className="flex justify-around md:w-3/6 p-2 hover:text-secondary hover:cursor-pointer hover:bg-primary items-center border-primary border-b"
        >
          <p> Select Country ({selectedCountries.length} selected) </p>
          {isCountrySelect ? <ChevronUp /> : <ChevronDown />}
        </div>

        <div
          onMouseLeave={() => setIsCountrySelect(false)}
          className={`${
            isCountrySelect
              ? "absolute w-full top-10 h-96 overflow-y-auto z-10 flex-col border bg-primary-foreground rounded-md border-primary shadow-xl"
              : "hidden"
          }`}
        >
          {countryList
            .sort((a, b) => a.localeCompare(b))
            .map((d, index) => (
              <div
                key={index}
                className="hover:cursor-pointer hover:bg-secondary p-2 border-b border-secondary flex items-center gap-5"
                onMouseDown={() => {
                  handleSelectCountries(
                    d,
                    setSelectedCountries,
                    selectedCountries,
                  );
                }}
              >
                <Switch checked={selectedCountries.includes(d)} />
                <span>{d}</span>
              </div>
            ))}
        </div>
      </div>

      <div>
        <CropChart selectedCountries={selectedCountries} />
      </div>

      <p className="text-sm text-slate-600 mt-2">
        <span className="font-bold text-slate-800">Fig 4.0 : </span>The X-axis
        represents the monitoring years, while the Y-axis tracks observed crop
        yield in kilograms per hectare. 
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
