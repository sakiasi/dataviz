import CropYieldChart from "./components/CropYeildChart";
import DisasterEconomicLossComponent from "./components/DisasterEconomic";
import ImpactPersonChart from "./components/ImpactPersonChart";
import LivestockCropTemperatureComponent from "./components/LivestockCropTemperatureComponent";
import OceanWarmingComponent from "./components/SeaChart";
import EnvironmentTaxesComponent from "./components/Tax";
import TemperatureGraph from "./components/Temp";
import EnergyTimeline from "./components/TimeLine";

const App = () => {
  return (
    <div className="mx-auto space-y-10 max-w-prose mt-5 mb-5 p-5">
      <div className=" pb-5 space-y-5">
        <h2>About This Story</h2>
        <p>
          This visualization explores the mechanics of climate change and its
          impact on our communities. While our narrative draws on established
          climate data, it is important to note:
        </p>
        <ul>
          <li>
            <strong>Scope:</strong> This story focuses on the link between
            physical climate shifts and their socio-economic consequences.
          </li>
          <li>
            <strong>Limitations:</strong> Climate systems are influenced by
            countless variables; the datasets used here represent snapshots of
            observed trends rather than exhaustive global models.
          </li>
          <li>
            <strong>Purpose:</strong> Our goal is to translate technical data
            into an actionable roadmap for spatial-temporal innovation and
            localized resilience.
          </li>
        </ul>
      </div>

      <div>
        <EnergyTimeline />
      </div>

      <div>
        <TemperatureGraph />
      </div>

      <div>
        <OceanWarmingComponent />
      </div>

      <div>
        <ImpactPersonChart />
      </div>

      <div>
        <CropYieldChart />
      </div>

      <div>
        <LivestockCropTemperatureComponent />
      </div>

      <div>
        <DisasterEconomicLossComponent />
      </div>

      <div>
        <EnvironmentTaxesComponent />
      </div>

      <div className=" pb-5 space-y-5 max-w-3xl">
        <h1 className="pb-5 text-2xl font-bold text-white tracking-tight">
          From Awareness to Action
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          The data confirms that climate change is already re-shaping our
          economic and physical landscapes. However, this is not just a reason
          for concern—it is a directive for innovation. To protect our future,
          we must move beyond observation. Our next phase of research must focus
          on <strong>spatial-temporal adaptive strategies</strong>: utilizing
          real-time tracking, predictive modeling for crop resilience, and
          precise economic intervention. We have the data; now, we must engineer
          the solutions that prioritize the safety and stability of our
          communities. The path forward requires a fusion of rigorous data
          collection and immediate, localized implementation.
        </p>
      </div>

      <div className="space-y-5 max-w-3xl">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          References
        </h1>
        <ul className="text-slate-300  text-xs leading-relaxed space-y-5 list-none pl-0">
          <li className="pl-4 -indent-4">
            Berkeley Earth. (2026). <em>Global temperature report for 2025</em>.{" "}
            <a
              className="text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
              href="https://berkeleyearth.org/global-temperature-report-for-2025/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://berkeleyearth.org/global-temperature-report-for-2025/
            </a>
          </li>
          <li className="pl-4 -indent-4">
            Cheng, L., Abraham, J., Hausfather, Z., & Trenberth, K. E. (2019).
            How fast are the oceans warming? <em>Science</em>, 363(6423),
            128–129.{" "}
            <a
              className="text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
              href="https://doi.org/10.1126/science.aav7619"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://doi.org/10.1126/science.aav7619
            </a>
          </li>
          <li className="pl-4 -indent-4">
            Khan, A. H., Min, L., Ma, Y., Zeeshan, M., Jin, S., & Zhang, X.
            (2022). High‐temperature stress in crops: Male sterility, yield loss
            and potential remedy approaches.{" "}
            <em>Plant Biotechnology Journal</em>, 21(3), 680–697.{" "}
            <a
              className="text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
              href="https://doi.org/10.1111/pbi.13946"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://doi.org/10.1111/pbi.13946
            </a>
          </li>
          <li className="pl-4 -indent-4">
            Cheng, M., McCarl, B., & Fei, C. (2022). Climate change and
            livestock production: A literature review. <em>Atmosphere</em>,
            13(1), 140.{" "}
            <a
              className="text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
              href="https://doi.org/10.3390/atmos13010140"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://doi.org/10.3390/atmos13010140
            </a>
          </li>
        </ul>
      </div>

      <div className=" pb-5 space-y-5 max-w-3xl">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Methodology
        </h2>

        <div className="space-y-5 text-slate-300 text-sm leading-relaxed">
          <div>
            <h3 className="font-semibold text-white">1. Data Sources</h3>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li>
                <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_ENV_TAXES&df[ag]=SPC&df[vs]=1.0&av=true&dq=A..&pd=,&to[TIME_PERIOD]=false">
                  <strong>Environmental taxes - disaggregated</strong>
                </a>
              </li>
              <li>
                <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_AGRICULTURAL_PRODUCTION&df[ag]=SPC&df[vs]=1.0&av=true&dq=A...&pd=,&to[TIME_PERIOD]=false">
                  <strong>Crop yield - disaggregated</strong>
                </a>
              </li>
              <li>
                <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_AGRICULTURAL_PRODUCTION&df[ag]=SPC&df[vs]=1.0&av=true&dq=A...&pd=,&to[TIME_PERIOD]=false">
                  <strong>Livestock yield - disaggregated</strong>
                </a>
              </li>
              <li>
                <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_CLIMATE_CHANGE&df[ag]=SPC&df[vs]=1.0&av=true&dq=A.SST_ANOM.&pd=,&to[TIME_PERIOD]=false">
                  <strong>Mean sea surface temperature anomalies</strong>
                </a>
              </li>
              <li>
                <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_CLIMATE_CHANGE&df[ag]=SPC&df[vs]=1.0&av=true&dq=A.ST_ANOM.&pd=,&to[TIME_PERIOD]=false">
                  <strong>Mean surface temperature anomalies</strong>
                </a>
              </li>
              <li>
                <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=ds%3ASPC2&df[id]=DF_SDG_11&df[ag]=SPC&df[vs]=3.0&dq=A.VC_DSR_AFFCT.........&pd=,&to[TIME_PERIOD]=false&lb=bt">
                  <strong>
                    Number of directly affected persons attributed to disasters
                  </strong>
                </a>
              </li>
              <li>
                <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=ds%3ASPC2&df[id]=DF_SDG_11&df[ag]=SPC&df[vs]=3.0&dq=A.VC_DSR_AALT...._T.....&pd=,&to[TIME_PERIOD]=false">
                  <strong>Direct disaster economic loss</strong>
                </a>
              </li>
              <li>
                <a href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_CLIMATE_CHANGE&df[ag]=SPC&df[vs]=1.0&av=true&dq=A.RAIN_ANOM.&pd=,&to[TIME_PERIOD]=false">
                  <strong>Rainfall anomalies</strong>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">2. Technology Stack</h3>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li>
                <strong>Development:</strong> React, Vite, Tailwind CSS, and
                shadcn/ui components.
              </li>
              <li>
                <strong>Visualizations:</strong> Recharts for rendering
                interactive graphs and charts.
              </li>
              <li>
                <strong>Source Code:</strong> Available on GitHub at{" "}
                <a
                  className="text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
                  href="https://github.com/sakiasi/dataviz.git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/sakiasi/dataviz.git
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              3. Analytical Approach & Narrative Design
            </h3>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li>
                Placed different metrics side-by-side (like temperatures, crop
                yields, and taxes) to highlight trends visually rather than
                running complex statistical correlations.
              </li>
              <li>
                <strong>Narrative Design:</strong> Built as a step-by-step
                story: starting with the basics of climate science, moving to
                regional impacts on crop and animal yields as well as direct
                impacts on individuals, and concluding with economic solutions
                and future action.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
