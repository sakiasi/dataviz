import ConclusionComponent from "./components/ConclusionComponent.tsx";
import CropComponent from "./components/CropComponent.tsx";
import { IntroComponent } from "./components/Intro.tsx";
import LandComponent from "./components/LandComponent.tsx";
import LightComponent from "./components/LightComponent.tsx";
import LiveStockComponent from "./components/LiveStockComponent.tsx";
import MethodologyComponent from "./components/MethodologyComponent.tsx";
import ReferenceComponent from "./components/ReferenceComponent.tsx";
import TempComponent from "./components/TempComponent.tsx";
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
          <CropComponent />
        </div>

        <div>
          <LiveStockComponent />
        </div>

        <div>
          <LandComponent/>
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
