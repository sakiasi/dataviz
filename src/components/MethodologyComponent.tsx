const MethodologyComponent = () => {
  return (
    <div className="max-w-4xl">
      <p className="section-eyebrow">Methods & limitations</p>
      <h2 className="chapter-title">How the story was built</h2>

      <div className="methods-grid mt-8">
        <article>
          <h3>Trend method</h3>
          <p>
            Headline climate metrics use ordinary least-squares linear trends on all valid annual
            observations in each country or territory. The regional figure is the median of those
            country-level trends: 1970–2025 for surface and sea-surface temperature, and 1993–2023
            for sea level.
          </p>
        </article>
        <article>
          <h3>Interactive charts</h3>
          <p>
            Country filters change what is displayed, not the underlying source data. Charts show
            the available annual observations and preserve gaps rather than estimating missing values.
          </p>
        </article>
        <article>
          <h3>Association is not causation</h3>
          <p>
            Two variables can correlate simply because both trend over time. For that reason, the
            main narrative does not use raw temperature correlations to claim causal effects on sea
            level, agriculture, people or economic losses.
          </p>
        </article>
        <article>
          <h3>Coverage differs</h3>
          <p>
            Climate series are comparatively dense; disaster and economic-loss records are much
            sparser and event-driven. Zeros and missing observations may reflect reporting as well
            as real conditions, so they are interpreted cautiously.
          </p>
        </article>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
        <h3 className="font-semibold text-slate-900 dark:text-stone-100">Technology & authorship</h3>
        <p className="mt-2">
          Built with React, TypeScript, Vite, Tailwind CSS and Recharts. AI tools were used
          supportively for code review, narrative editing and visual refinement. Dataset selection,
          analytical interpretation, verification and final editorial judgement remain the author’s.
        </p>
        <p className="mt-3">
          Source code: <a className="story-link" href="https://github.com/sakiasi/dataviz" target="_blank" rel="noopener noreferrer">github.com/sakiasi/dataviz</a>
        </p>
      </div>
    </div>
  );
};

export default MethodologyComponent;
