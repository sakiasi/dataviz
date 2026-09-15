const ConclusionComponent = () => {
  return (
    <div className="max-w-4xl">
      <p className="section-eyebrow">What the evidence adds up to</p>
      <h2 className="chapter-title text-balance">One regional climate signal. Unequal local consequences.</h2>
      <p className="mt-6 text-xl leading-8 text-slate-700 dark:text-stone-200">
        The physical indicators in this story point in the same direction: the Pacific is warming,
        the surrounding ocean is warming, and sea level is rising. But agriculture, disaster impacts
        and economic losses vary sharply from place to place.
      </p>

      <div className="conclusion-grid mt-10">
        <article>
          <span>01</span>
          <h3>Monitor the common signal</h3>
          <p>Regional climate observations reveal shared pressure that no island can interpret in isolation.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Plan for local vulnerability</h3>
          <p>Exposure, infrastructure, livelihoods, geography and resilience determine how that pressure is felt.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Improve the impact record</h3>
          <p>Consistent disaster and loss reporting is essential for learning which adaptation investments actually work.</p>
        </article>
      </div>

      <p className="mt-10 border-l-4 border-cyan-500 pl-5 text-base leading-7 text-slate-700 dark:text-stone-200">
        The Pacific does not need one story of climate risk. It needs a shared evidence base strong
        enough to reveal where the risks diverge — and where action must be tailored.
      </p>
    </div>
  );
};

export default ConclusionComponent;
