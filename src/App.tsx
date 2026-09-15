import ConclusionComponent from "./components/ConclusionComponent.tsx";
import CropComponent from "./components/CropComponent.tsx";
import EconomicLossComponent from "./components/EconomicLossComponent.tsx";
import ImpactPersonComponent from "./components/ImpactPersonComponent.tsx";
import { IntroComponent } from "./components/Intro.tsx";
import LightComponent from "./components/LightComponent.tsx";
import LiveStockComponent from "./components/LiveStockComponent.tsx";
import MethodologyComponent from "./components/MethodologyComponent.tsx";
import ReferenceComponent from "./components/ReferenceComponent.tsx";
import SeaLevelComponent from "./components/SeaLevelComponent.tsx";
import StoryOverview from "./components/StoryOverview.tsx";
import TempComponent from "./components/TempComponent.tsx";
import WarmingOceanComponent from "./components/WarmingOceanComponent.tsx";
import { ThemeProvider } from "./ThemeProvider.tsx";

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <LightComponent />
        <main>
          <IntroComponent />
          <StoryOverview />

          <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
            <div className="story-stack">
              <section id="signal" className="story-section scroll-mt-8">
                <TempComponent />
              </section>

              <section id="ocean" className="story-section scroll-mt-8">
                <WarmingOceanComponent />
              </section>

              <section id="sea-level" className="story-section scroll-mt-8">
                <SeaLevelComponent />
              </section>

              <section id="food" className="story-section scroll-mt-8">
                <CropComponent />
                <div className="story-divider" />
                <LiveStockComponent />
              </section>

              <section id="people" className="story-section scroll-mt-8">
                <ImpactPersonComponent />
                <div className="story-divider" />
                <EconomicLossComponent />
              </section>

              <section id="takeaway" className="story-section story-section-emphasis scroll-mt-8">
                <ConclusionComponent />
              </section>

              <section id="sources" className="story-section scroll-mt-8">
                <ReferenceComponent />
                <div className="story-divider" />
                <MethodologyComponent />
              </section>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
