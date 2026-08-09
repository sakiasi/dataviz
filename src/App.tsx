import CropComponent from "./components/CropComponent.tsx";
import EconomicLossComponent from "./components/EconomicLossComponent.tsx";
import ImpactPersonChart from "./components/ImpactPersonComponent.tsx";
import { IntroComponent } from "./components/Intro.tsx";
import LiveStockComponent from "./components/LiveStockComponent.tsx";
import SeaLevelComponent from "./components/SeaLevelComponent.tsx";
import TempComponent from "./components/TempComponent.tsx";
import EnergyTimeline from "./components/TimeLine";
import WarmingOceanComponent from "./components/WarmingOceanComponent.tsx";

const App = () => {
  return (
    <div className="mx-auto max-w-prose mt-5 flex flex-col gap-5 ">
      <div>
        <IntroComponent />
      </div>

      <div>
        <EnergyTimeline />
      </div>

      <div>
        <TempComponent />
      </div>

      <div>
        <WarmingOceanComponent />
      </div>

      <div>
        <SeaLevelComponent />
      </div>

      <div>
        <CropComponent />
      </div>

      <div>
        <LiveStockComponent />
      </div>

      <div>
        <ImpactPersonChart />
      </div>

      <div>
        <EconomicLossComponent />
      </div>

      <div className="space-y-5 max-w-3xl">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Conclusion
        </h1>

        <div className="border-b border-slate-800"></div>

        <p className="text-slate-300 leading-relaxed">
          The trends across the Pacific show that rising temperatures and
          climbing sea levels do not impact every island equally, and physical
          geography alone cannot explain the widening disparities in
          agricultural decline and disaster recovery costs. Economic loss and
          environmental vulnerability vary wildly by territory, proving that
          localized infrastructure and administrative response systems play a
          larger role in community resilience than climate exposure alone.
          Addressing these regional divides requires moving past passive
          monitoring toward active, system-level engineering and real-time
          operational intervention.
        </p>
      </div>

      <div className="space-y-5 max-w-3xl">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          References
        </h1>
        <div className="border-b border-slate-800"></div>

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
          <li>
            Nunn, P.D. (2013), The end of the Pacific? Effects of sea level rise
            on Pacific Island livelihoods. Singap J Trop Geogr, 34: 143-171.
            <a
              className="text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
              href="https://doi.org/10.1126/science.aav7619"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://doi.org/10.1111/sjtg.12021
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
          <li>
            Cheng, M., McCarl, B., & Fei, C. (2022). Climate Change and
            Livestock Production: A Literature Review. Atmosphere, 13(1), 140.
            <a
              className="text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
              href="https://doi.org/10.3390/atmos13010140"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://doi.org/10.3390/atmos13010140
            </a>
          </li>
          <li>
            United Nations Office for Disaster Risk Reduction. (2023).{" "}
            <p className="italic">
              Thematic Report on Climate and Disaster-Resilient Infrastructure
              in the Pacific
            </p>
            <a
              className="text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
              href="https://www.undrr.org/media/89310/download?startDownload=20260809"
            >
              [PDF/Report].
            </a>
          </li>
          <li className="pl-4 -indent-4">
            United Nations Office for Disaster Risk Reduction. (2021).{" "}
            <em>
              Thematic report on climate and disaster-resilient infrastructure
              in the Pacific
            </em>
            .
            <a
              className="text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30 underline-offset-2"
              href="https://www.undrr.org/media/89310/download"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.undrr.org/media/89310/download
            </a>
          </li>
        </ul>
      </div>

      <div className=" space-y-5 max-w-3xl">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Methodology
        </h1>

        <div className="border-b border-slate-800"></div>

        <div className="space-y-5 text-slate-300 text-sm leading-relaxed">
          <div>
            <h3 className="font-semibold text-white">1. Data Sources</h3>
            <ul className="list-disc pl-5 space-y-1 mt-1">
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
        </div>
      </div>
    </div>
  );
};

export default App;
