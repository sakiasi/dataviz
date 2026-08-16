import { LandSlopeChart } from "./LandSlopeChart";

const LandComponent = () => {
  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight text-center md:text-start">
        Land Cover Index
      </h1>

      <div className="border-b border-primary"></div>

      <div className="leading-relaxed flex flex-col gap-5 max-w-3xl">
        <p>
          According to the
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
          The slope values show how much the Climate Altering Land Cover Index
          changed each year across Pacific islands from 1992 to 2022. The
          Solomon Islands (+39.3) and Palau (+35.2) experienced the fastest
          increases, showing significant land cover changes over time. In
          contrast, Vanuatu (-341.6) and Guam (-49.9) had the steepest annual
          decreases. Meanwhile, several places like Tokelau, Nauru, and Tuvalu
          had slopes near zero, showing almost no change at all across the
          entire 31-year period.
        </p>
      </div>
    </div>
  );
};

export default LandComponent;
