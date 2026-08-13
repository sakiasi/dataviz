import ConclusionComponent from "./components/ConclusionComponent.tsx";
import CropComponent from "./components/CropComponent.tsx";
import EconomicLossComponent from "./components/EconomicLossComponent.tsx";
import ImpactPersonChart from "./components/ImpactPersonComponent.tsx";
import { IntroComponent } from "./components/Intro.tsx";
import LightComponent from "./components/LightComponent.tsx";
import LiveStockComponent from "./components/LiveStockComponent.tsx";
import MethodologyComponent from "./components/MethodologyComponent.tsx";
import ReferenceComponent from "./components/ReferenceComponent.tsx";
import SeaLevelComponent from "./components/SeaLevelComponent.tsx";
import TempComponent from "./components/TempComponent.tsx";
import WarmingOceanComponent from "./components/WarmingOceanComponent.tsx";
import { ThemeProvider } from "./ThemeProvider.tsx";

const App = () => {

  return (
    <ThemeProvider>
      <div className="mx-auto max-w-prose mt-5 mb-10 p-2 flex flex-col gap-5 ">
        <LightComponent />
        <div>
          <IntroComponent />
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

        <div>
          <ConclusionComponent />
        </div>

        <div>
          <ReferenceComponent />
        </div>

        <div>
          <MethodologyComponent />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
