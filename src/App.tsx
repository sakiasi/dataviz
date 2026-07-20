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
        <div className=" pb-5">
          <h1 className="pb-5 text-2xl">The Energy Source is the Sun</h1>
          <p>
            The heat in our climate system originally comes from the Sun. Solar
            energy travels to Earth as short-wave radiation (like visible light).
            Most of this energy passes right through the atmosphere and hits the
            ground, warming the Earth's surface.
          </p>
        </div>
        
        <div className=" pb-5">
          <h1 className="pb-5 text-2xl">The Conversion to Heat</h1>
          <p>
            Once the ground absorbs this solar energy, it warms up and re-emits
            that energy as long-wave infrared radiation (what we feel as heat).
            This is the same way a hot stove or a radiator releases energy.
          </p>
        </div>
        <div className=" pb-5">
          <h1 className="pb-5 text-2xl">The "Trapping" Mechanism</h1>
          <p>
            This is where greenhouse gases (like CO2, methane, and water vapor)
            come in:
          </p>
        </div>
        <div className=" pb-5">
          <h1 className="pb-5 text-2xl">Absorption</h1>
          <p>
            Unlike nitrogen and oxygen (which make up most of the atmosphere and
            don't interact much with infrared radiation), GHG molecules have a
            complex structure that allows them to absorb this rising infrared
            heat.
          </p>
        </div>
        <div className=" pb-5">
          <h1 className="pb-5 text-2xl">Re-radiation</h1>
          <p>
            Once they absorb this heat, they don't hold it forever. They vibrate
            and re-radiate that energy in all directions—including back down
            toward the Earth's surface.
          </p>
        </div>
        <div className=" pb-5">
          <h1 className="pb-5 text-2xl">The Accumulation</h1>
          <p>
            Because some of this heat is sent back to the surface instead of
            escaping into space, it builds up in the lower atmosphere and the
            oceans, leading to global warming.
          </p>
        </div>
      </div>

      <div>
        <EnergyTimeline/>
      </div>

      <div className=" pb-5">
        <h1 className="pb-5 text-2xl">Is the Temperature Actually Rising?</h1>
        <p>
          The data tells a clear story: our climate has moved into uncharted
          territory. For over 150 years—from 1850 to 2010—global temperatures
          remained relatively stable and predictable. However, starting in 2011,
          we broke through that historical ceiling. We aren't just seeing a
          slight shift; we are seeing temperatures consistently push beyond the
          "normal" range we’ve relied on for generations, signaling that the
          warming trend is no longer a future prediction—it’s our current
          reality.
        </p>
        <a
          href="https://berkeleyearth.org/global-temperature-report-for-2025/"
          target="_blank"
        >
          Berkeley Earth. (2026)
        </a>
      </div>
      <div className=" pb-5">
        <h1 className="pb-5 text-2xl">Is Our Ocean Warming Up?</h1>
        <p>
          The ocean acts as the Earth’s thermal buffer, absorbing the vast
          majority of excess atmospheric heat. Consequently, rising mean surface
          temperatures translate directly into warmer oceans, establishing a
          clear, ongoing trend in sea surface temperature anomalies.
        </p>
        <a
          href="https://www.science.org/doi/10.1126/science.aav7619"
          target="_blank"
        >
          Trenberth, K. E. (2019).
        </a>
        <p>
          Data from Surface Temperature anomalies.csv and Sea Level
          Anomalies.csv
        </p>
      </div>

      <div className=" pb-5">
        <h1 className="pb-5 text-2xl">How Is This Changing Our Daily Lives?</h1>
        <p>
          Climate change is not just a global statistic—it is a personal
          reality. From the immediate destruction of homes by intensifying
          cyclones to the silent, creeping threat of rising sea levels and the
          subsequent surge in health crises, these impacts are fundamentally
          altering the daily lives, safety, and future of Pacific families.
        </p>
        <p>
          Data from Number of directly affected persons attributed to
          disasters.csv
        </p>
      </div>

      <div className=" pb-5">
        <h1 className="pb-5 text-2xl">Why Are Our Crop Yields Dropping?</h1>
        <p>
          Every crop has an "optimal" temperature range for growth. When
          temperatures consistently exceed this—especially during sensitive
          reproductive stages like flowering—it can cause pollen to lose its
          vitality, leading to smaller harvests or total crop failure.
        </p>
        <a href="https://www.mdpi.com/2073-4433/13/1/140" target="_blank">
          (Chaturvedi et al., 2021).
        </a>
        <p>Data from Crop yield - disaggregated.csv</p>
      </div>

      <div className=" pb-5">
        <h1 className="pb-5 text-2xl">
          Why Our Livestock Yields Are Declining
        </h1>
        <p>
          Climate change hits livestock just as hard as it hits crops, primarily
          through direct heat stress and the decline of the food they rely on.
          When temperatures climb, animals struggle to maintain their core body
          temperature, which forces their bodies to shift energy away from
          growth, milk production, and reproduction just to survive. It’s not
          just the heat, either; erratic rainfall and drought dry up pastures
          and reduce the quality of forage, while warmer, wetter conditions
          create a perfect breeding ground for new pests and diseases that
          compromise animal health.
        </p>
        <a href="https://www.mdpi.com/2073-4433/13/1/140" target="_blank">
          (Cheng et al., 2022).
        </a>
        <p>Data from </p>
      </div>

      <div className=" pb-5">
        <h1 className="pb-5 text-2xl">At what cost ?</h1>
        <p>
          Because oceans absorb most of the excess heat trapped by greenhouse
          gases, we are seeing more intense storms and rising sea levels. Today,
          immense financial resources are being deployed to mitigate these
          severe climate impacts.
        </p>
        <p>Data from Direct disaster economic loss, average annual loss.csv</p>
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
