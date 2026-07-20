import CropYieldChart from "./components/CropYeildChart";
import DisasterEconomicLossComponent from "./components/DisasterEconomic";
import ImpactPersonChart from "./components/ImpactPersonChart";
import LivestockCropTemperatureComponent from "./components/LivestockCropTemperatureComponent";
import OceanWarmingComponent from "./components/SeaChart";
import TemperatureGraph from "./components/Temp";
import EnergyTimeline from "./components/TimeLine";

const App = () => {
  return (
    <div className="mx-auto max-w-prose mt-5 mb-5 p-5">
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
        <EnergyTimeline/>
      </div>

      <div>
        <TemperatureGraph/>
      </div>

      <div>
        <OceanWarmingComponent/>
      </div>

      <div>
        <ImpactPersonChart/>
      </div>

      <div>
        <CropYieldChart/>
      </div>

      <div>
        <LivestockCropTemperatureComponent/>
      </div>

      <div>
        <DisasterEconomicLossComponent/>
      </div>

      <div className=" pb-5">
        <h1 className="pb-5 text-2xl">Can Taxes Save Our Future?</h1>
        <p>
          We know from our data that climate change is already causing massive
          <strong> annual economic losses</strong>. These taxes are our way of
          fighting back. By taxing <strong>energy</strong>,
          <strong>transport</strong>, and <strong>pollution</strong>, we are
          directly linking the "cost of destroying" the environment to the very
          economic losses we are trying to stop. Essentially, we are making it
          cheaper to protect our future than to pay for the disasters that
          climate change creates.
        </p>
      </div>

      <div className=" pb-5">
        <h1 className="pb-5 text-2xl">From Awareness to Action</h1>
        <p>
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

      <div className=" pb-5">
        <h1 className="pb-5 text-2xl">Reference</h1>
        <ol className="space-y-5">
          <li>
            Berkeley Earth. (2026). Global temperature report for 2025.
            https://berkeleyearth.org/global-temperature-report-for-2025/
          </li>
          <li>
            Cheng, L., Abraham, J., Hausfather, Z., & Trenberth, K. E. (2019).
            How fast are the oceans warming? Science, 363(6423), 128–129.
            https://doi.org/10.1126/science.aav7619
          </li>
          <li>
            Khan, A. H., Min, L., Ma, Y., Zeeshan, M., Jin, S., & Zhang, X.
            (2022). High‐temperature stress in crops: Male sterility, yield loss
            and potential remedy approaches. Plant Biotechnology Journal, 21(3),
            680–697. https://doi.org/10.1111/pbi.13946 Cited by: 111
          </li>
          <li>
            Cheng, M., McCarl, B., & Fei, C. (2022). Climate change and
            livestock production: A literature review. Atmosphere, 13(1), 140.
            https://doi.org/10.3390/atmos13010140 Cited by: 658
          </li>
        </ol>
      </div>
    </div>
  );
};

export default App;
